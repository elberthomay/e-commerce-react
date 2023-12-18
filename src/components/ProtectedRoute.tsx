import React, { useEffect } from "react";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, error, isAuthenticated } = useGetCurrentUser();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !error && !isAuthenticated) {
      navigate({
        pathname: "/login/",
        search: `?loginRedirect=${encodeURIComponent(pathname)}`,
      });
      //   searchParams.set("loginRedirect", pathname);
      //   setSearchParams(searchParams);
    }
  }, [
    isLoading,
    error,
    isAuthenticated,
    navigate,
    pathname,
    searchParams,
    setSearchParams,
  ]);
  return <>{!isLoading && !error && isAuthenticated && children}</>;
}

export default ProtectedRoute;
