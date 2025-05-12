import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/taskSlice";

function ProjectDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch, id]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return alert("Both title and description are required.");
    }

    dispatch(createTask({ title, description, projectId: id }));
    setTitle("");
    setDescription("");
  };

  const handleDelete = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, data: { status: newStatus } }));
  };

  const handleSaveEdit = (taskId) => {
    if (!editTitle.trim() || !editDescription.trim()) {
      return alert("Title and description cannot be empty.");
    }

    dispatch(updateTask({ id: taskId, data: { title: editTitle, description: editDescription } }))
      .then(() => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
        dispatch(fetchTasks(id)); // Optional: Refresh after update
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>

      <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {loading && <p className="text-blue-600">Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available. Create one above.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {editingTaskId === task._id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-1 rounded mb-1 w-full text-sm"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border p-1 rounded w-full text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-sm text-gray-700">{task.description}</p>
                    </>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Status: {task.status}</p>
                  <p className="text-xs text-gray-500 mt-1">Created: {task.createdAt}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  {editingTaskId === task._id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(task._id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingTaskId(null);
                          setEditTitle("");
                          setEditDescription("");
                        }}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        ✖ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setEditTitle(task.title);
                        setEditDescription(task.description);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ✎ Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectDetail;
