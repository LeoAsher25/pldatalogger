import { createBrowserRouter } from "react-router-dom";
import MainLayout from "src/components/layout/MainLayout";
import AuthGuard from "src/guards/AuthGuard";
import Dashboard from "src/pages/Dashboard";
import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import ERoutePath from "src/types/routes.enum";

const mainRouter = createBrowserRouter([
  {
    path: ERoutePath.LOGIN,
    element: <Login />,
  },
  {
    path: ERoutePath.HOME_PAGE,
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ERoutePath.HOME_PAGE,
        element: <HomePage />,
      },
      {
        path: ERoutePath.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
]);

export default mainRouter;
