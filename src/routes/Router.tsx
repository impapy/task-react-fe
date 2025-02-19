import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";
import AuthWrapper from "../components/AuthWrapper";

const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    children: routes,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
