import React, { useState, useEffect } from "react";

import { useTokenVerification } from "@/hooks/useTokenVerification";
import Loader from "@/components/animations/Loader.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading: tokenLoading } = useTokenVerification();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!tokenLoading) {
      const timer = setTimeout(async () => {
        setShowLoader(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [tokenLoading]);

  if (tokenLoading || showLoader) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
