import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Landing from "./features/interview/pages/Landing.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "../src/features/interview/pages/Interview.jsx";
import AllReports from "./features/interview/pages/AllReports.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/home",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/interview/:interviewId",
    element: <Protected><Interview /></Protected>
  },
  {
    path: "/reports",
    element: <Protected><AllReports /></Protected>
  }
]);
