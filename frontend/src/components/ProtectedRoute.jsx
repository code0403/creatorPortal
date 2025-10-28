import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
