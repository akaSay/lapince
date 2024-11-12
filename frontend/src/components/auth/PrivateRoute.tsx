import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { getToken, initAuth } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      if (getToken()) {
        const isAuthenticated = await initAuth();
        setIsValid(isAuthenticated);
      }
      setIsLoading(false);
    };

    validateAuth();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>; // Ou votre composant de loading
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
