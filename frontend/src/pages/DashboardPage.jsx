import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProject,
  fetchProjects,
  deleteProject,
} from "../features/projects/projectSlice";
import Spinner from "../components/Spinner";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.project);

  const { user, loadingUser } = useSelector((state) => state.auth);
  // console.log("user :-",user)
  const token = useSelector((state) => state.auth.token);



  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (token) dispatch(fetchProjects());
  }, [dispatch, token]);

  if (loadingUser) {
  return <div className="p-4 text-center text-gray-600">Loading dashboard...</div>;
}


  const handleCreate = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return alert("Project name is required");
    if (projects.length >= 4) return alert("Max 4 projects allowed");

    try {
      await dispatch(createProject({ name: projectName })).unwrap();
      dispatch(fetchProjects());
      setProjectName("");
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <form
        onSubmit={handleCreate}
        className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="New Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>

      {loading && <Spinner/>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!loading && projects.length === 0 && (
        <p className="text-gray-500 text-center">
          No projects yet. Create one!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
            className="bg-white cursor-pointer p-5 border rounded-lg shadow-sm hover:shadow-lg transition relative"
          >
            <h2 className="text-xl font-semibold text-blue-700">
              {project.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Tasks: {project.tasks?.length || 0}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const confirmDelete = window.confirm(
                  `Are you sure you want to delete "${project.name}"?`
                );
                if (confirmDelete) {
                  dispatch(deleteProject(project._id));
                }
              }}
              className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200 hover:text-red-700 transition"
              title="Delete Project"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
