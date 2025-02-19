import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/common/UI/LoadingScreen";

const HomePage = lazy(() => import("../pages/home"));
const LoginPage = lazy(() => import("../pages/signin"));
const ErrorPage = lazy(() => import("../pages/404"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen status="pending" />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingScreen status="pending" />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
