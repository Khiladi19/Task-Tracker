// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const { token, user } = useSelector((state) => state.auth);

//   if (!token) {
//     return <Navigate to="/login" />;
//   }
//   return <Outlet />;
// };

// export default PrivateRoute;


import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    const isFirstVisit = !localStorage.getItem("visited");

    if (isFirstVisit) {
      localStorage.setItem("visited", "true"); 
      return <Navigate to="/signup" />;
    }

    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
