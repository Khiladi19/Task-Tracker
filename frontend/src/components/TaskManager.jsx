
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
} from '../features/tasks/taskSlice';

export default function TaskManagerPage({ projectId }) {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasks(projectId));
    }
  }, [dispatch, projectId]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    dispatch(createTask({ projectId, title, description: desc, status: 'pending' }));
    setTitle('');
    setDesc('');
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTask({ id, data: { status } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
    {/* <div className="max-w-6xl mx-auto px-4 py-8"> */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tasks for Project</h1>

      <form
        onSubmit={handleCreate}
        className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>

      {loading && <p className="text-gray-500 mb-4">Loading tasks...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">Status: {task.status}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
