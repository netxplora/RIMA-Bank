
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  requiredRole?: string[];
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, loading, userRoles, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // If it's an admin route, redirect to the custom admin login
    if (requiredRole?.some(role => role.includes("admin"))) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && requiredRole.length > 0) {
    // If admin is required and user is admin, allow
    if (requiredRole.includes("admin") && isAdmin) {
      return <Outlet />;
    }

    // Check for specific roles
    const hasRequiredRole = requiredRole.some(role => userRoles.includes(role));
    if (!hasRequiredRole && !isAdmin) { // Admins can access everything usually, or adjust logic
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
};
