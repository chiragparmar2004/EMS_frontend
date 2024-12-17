import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout, { ProtectedLayout } from "./components/layout";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ErrorPage from "./components/ErrorPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import EmployeePage from "./pages/EmployeePage";
import AddEmployeePage from "./pages/AddEmployeePage";
import ViewOrUpdatePage from "./pages/ViewOrUpdatePage";
import PasswordCreationPage from "./pages/PasswordCreationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TokenInvalidPage from "./pages/TokenInvalidPage";
import { useSelector } from "react-redux";
import AdminLeavePage from "./pages/AdminLeavePage";
import EmployeeLeavePage from "./pages/EmployeeLeavePage";
import AddLeavePage from "./pages/AddLeavePage";
import ViewOrUpdateLeavePage from "./pages/ViewOrUpdateLeavePage";
import AllEmployeeSalaryPage from "./pages/AllEmployeeSalaryPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const userRole = useSelector((state) => state.user.user?.data?.role);

  // Role-based dashboard
  const getDashboardPage = () => {
    if (userRole === "admin") {
      return <AdminDashboardPage />;
    } else if (userRole === "employee") {
      return <EmployeeDashboardPage />;
    } else {
      return <ErrorPage message="Unauthorized" />;
    }
  };

  // Role-based dashboard
  const getLeavePage = () => {
    if (userRole === "admin") {
      return <AdminLeavePage />;
    } else if (userRole === "employee") {
      return <EmployeeLeavePage />;
    } else {
      return <ErrorPage message="Unauthorized" />;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/create-password", element: <PasswordCreationPage /> },
        { path: "/forgot-password", element: <ForgotPasswordPage /> },
        {
          path: "/create-password-token-invalid",
          element: <TokenInvalidPage />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/dashboard", element: getDashboardPage() },
        { path: "/employees", element: <EmployeePage /> },
        { path: "/leaves", element: getLeavePage() },
        { path: "/change-password", element: <PasswordCreationPage /> },
        { path: "/add-leave", element: <AddLeavePage /> },
        { path: "/request-leave", element: <AddLeavePage /> },
        { path: "/add-employee", element: <AddEmployeePage /> },
        { path: "/all-emp-salary", element: <AllEmployeeSalaryPage /> },
        { path: "/view-update-employee/:id", element: <ViewOrUpdatePage /> },
        { path: "/profile", element: <ProfilePage /> },

        { path: "/view-update-leave/:id", element: <ViewOrUpdateLeavePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
