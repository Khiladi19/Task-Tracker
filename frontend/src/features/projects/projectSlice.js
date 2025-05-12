import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const API_URL = "/projects";

// create Project
export const createProject = createAsyncThunk(
  "project/create",
  async (projectData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/`, projectData);
      console.log("res :-", res);
      return res.data.project;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// fetch Projects
export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      // console.log("resfectc:-",res)
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// delete Prjects
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${projectId}`);
      return projectId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
// update Prjects
export const updateProject = createAsyncThunk(
  "project/update",
  async ({ id, name }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { name });
      return res.data.project;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchProjectsById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.projects = action.payload;
      // });
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
