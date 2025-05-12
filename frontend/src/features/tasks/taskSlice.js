import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const API_URL = '/tasks';

// Create Task
export const createTask = createAsyncThunk('task/create', async (taskData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/add`, taskData);
    console.log("res:-", res);
    return res.data.task; // contains: { message, task }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Get Tasks by Project ID
export const fetchTasks = createAsyncThunk('task/fetch', async (projectId, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/project/${projectId}`);
    // console.log("fetchTasks:-", res);
    return res.data; // contains: { message, tasks }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Update Task
export const updateTask = createAsyncThunk('task/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Delete Task
export const deleteTask = createAsyncThunk('task/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // ✅ extract `task` from response
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks; // ✅ extract `tasks` from response
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
