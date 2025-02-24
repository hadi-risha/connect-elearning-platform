import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store"; 

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userToken = useAppSelector(
    (state) => state.login?.token || state.otp.token  || localStorage.getItem('token')  // Get token from Redux
  );
  const isBlocked = useAppSelector(
    (state) => localStorage.getItem('isBlocked') === "true" || state.login?.isBlocked // Get isBlocked from Redux
  ); 
  
  const adminToken = localStorage.getItem('adminToken'); // Check for admin token from localStorage
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if current route is an admin route  

  if (isAdminRoute) {
    return adminToken ? children : <Navigate to="/admin/login" replace />;
  } else {
    return userToken && (!isBlocked) ?  children : <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
