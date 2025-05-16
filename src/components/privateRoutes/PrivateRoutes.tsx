import { useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";

interface IPrivateRoutesProps {
  children: React.ReactNode;
}

export const PrivateRoutes = ({ children }: IPrivateRoutesProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <> {children}</> : <Navigate to="/" replace />;
};
