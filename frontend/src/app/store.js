import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import taskReducer from '../features/tasks/taskSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    tasks: taskReducer,
  },
});
