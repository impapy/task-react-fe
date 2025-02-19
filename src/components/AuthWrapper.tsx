import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { checkAuth } from "../store/auth/login";
import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
    
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, location, navigate]);

  return <Outlet />; // This renders child routes
};

export default AuthWrapper;