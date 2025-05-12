import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const API_URL = "/user";

/* ─────────────────  async thunks ───────────────── */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, userData);
      return res.data; // { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, userData);
      console.log("res :-", res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* ───────────────── slice ───────────────── */

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  loadingUser: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    rehydrate: (state) => {
      const token = localStorage.getItem("token");
      const userLS = localStorage.getItem("user");

      if (token) state.token = token;

      if (userLS && userLS !== "undefined") {
        try {
          state.user = JSON.parse(userLS);
        } catch (e) {
          console.error("Invalid user data in localStorage:", userLS);
          localStorage.removeItem("user"); // clean up corrupted data
        }
      }
    },
    setLoadingUser: (state, action) => {
      state.loadingUser = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.loadingUser = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // add this
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.loadingUser = false;
      localStorage.removeItem("visited");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setToken, rehydrate, setUser, setLoadingUser } =
  authSlice.actions;
export default authSlice.reducer;
