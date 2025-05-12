// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Routes, Route } from "react-router-dom";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import { setToken, logout, setUser, rehydrate,setLoadingUser } from "./features/auth/authSlice";
// import axios from "./api/axios.js";
// import Layout from "./components/Layout";
// import ProjectDetail from "./pages/ProjectDetails.jsx";

// const API_URL = "/user";

// function App() {
//   const dispatch = useDispatch();
//   const loadingUser = useSelector((state) => state.auth.loadingUser);

//   useEffect(() => {
//     dispatch(rehydrate()); // 🌟 Rehydrate Redux state from localStorage

//     const savedToken = localStorage.getItem("token");

//     if (savedToken) {
//       axios
//         .get(`${API_URL}/profile`, {
//           headers: {
//             Authorization: `Bearer ${savedToken}`,
//           },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data.user)); // 🟢 Update user in Redux
//         })
//         .catch((err) => {
//           console.log("Token error:", err.response?.data?.message || err.message);
//           dispatch(logout()); // 🔴 If invalid token, log out
//         })
//         .finally(() => {
//           setLoadingUser(false);
//         });
//     } else {
//       setLoadingUser(false);
//     }
//   }, [dispatch]);

//   if (loadingUser) {
//     return <div className="p-6 text-center text-gray-600">Loading user session...</div>;
//   }

//   return (
//     <Routes>
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/login" element={<LoginPage />} />

//       <Route element={<PrivateRoute />}>
//         <Route element={<Layout />}>
//           <Route path="/" element={<DashboardPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/project/:id" element={<ProjectDetail />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<LoginPage />} />
//     </Routes>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { setToken, logout, setUser, rehydrate, setLoadingUser } from "./features/auth/authSlice";
import axios from "./api/axios.js";
import Layout from "./components/Layout";
import ProjectDetail from "./pages/ProjectDetails.jsx";

const API_URL = "/user";

function App() {
  const dispatch = useDispatch();
  const loadingUser = useSelector((state) => state.auth.loadingUser);

  useEffect(() => {
    dispatch(rehydrate());
    dispatch(setLoadingUser(true));

    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      dispatch(setToken(savedToken));

      axios
        .get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data.user));
          dispatch(setLoadingUser(false));
        })
        .catch((err) => {
          console.log("Token error:", err.response?.data?.message || err.message);
          dispatch(logout());
          dispatch(setLoadingUser(false));
        });
    } else {
      dispatch(setLoadingUser(false));
    }
  }, [dispatch]);

  if (loadingUser) {
    return <div className="p-6 text-center text-gray-600">Loading user session...</div>;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
