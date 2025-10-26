import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Project, Task, CreateTaskDto, UpdateTaskDto } from '../types';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (err) {
      console.error('Failed to fetch project', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/projects/${id}/tasks`);
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const dto: CreateTaskDto = {
        title,
        dueDate: dueDate || undefined,
      };
      await api.post(`/projects/${id}/tasks`, dto);
      setTitle('');
      setDueDate('');
      setShowForm(false);
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const dto: UpdateTaskDto = { isCompleted: !task.isCompleted };
      await api.put(`/tasks/${task.id}`, dto);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  if (!project) return <div className="container"><div className="empty-state">Loading...</div></div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn back-button">
        ← Back to Dashboard
      </button>

      <div className="project-details">
        <h2>{project.title}</h2>
        {project.description && <p>{project.description}</p>}
      </div>

      <hr className="divider" />

      <div className="tasks-section">
        <h3>Tasks</h3>
        <div className="action-bar">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-new">
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h3>Create New Task</h3>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label>Due Date (optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </form>
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add your first task!</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleComplete(task)}
                    className="task-checkbox"
                  />
                  <div>
                    <span className={`task-title ${task.isCompleted ? 'completed' : ''}`}>
                      {task.title}
                    </span>
                    {task.dueDate && (
                      <small className="task-due-date">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
