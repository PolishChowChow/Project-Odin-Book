import { createBrowserRouter, Outlet } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <div>
        siema <Outlet />{" "}
      </div>
    ),
    children: [
      {
        path: "users/:userId",
        element: <div>User Profile page</div>,
      },
      {
        path: "users",
        element: <div>Users Page</div>,
      },
      {
        path: "index",
        element: <div>index page</div>,
      },
      {
        path: "profile",
        element: <div>Profile page</div>,
      },
    ],
  },
]);
export default router;
