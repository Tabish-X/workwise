import { Navigate } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import SetProfile from "./Pages/Create Profile/SetProfile";
import Login from "./Pages/Login/Login";
import Layout from "./Layouts/Layout";
import Loading from "./Components/Loading";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Jobs from "./Pages/Jobs";
import NotAvailable from "./Pages/NotAvailable";

const routes = (isLoggedIn, isProfile, isLoading) => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: isLoading ? (
          <Loading />
        ) : !isLoggedIn ? (
          <Navigate to="/login" />
        ) : isProfile ? (
          <Home />
        ) : (
          <Navigate to="/profile/create" />
        ),
      },
      {
        path: "/login",
        element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Layout />,

    children: [
      {
        path: "main",
        element: isLoading ? (
          <Loading />
        ) : isLoggedIn && isProfile ? (
          <Profile />
        ) : !isProfile ? (
          <Navigate to="/profile/create" />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "create",
        element: isLoading ? (
          <Loading />
        ) : isLoggedIn && !isProfile ? (
          <SetProfile />
        ) : isProfile ? (
          <Navigate to="/profile/main" />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "search/:username",
        element: isLoading ? (
          <Loading />
        ) : isLoggedIn && isProfile ? (
          <Profile />
        ) : !isProfile ? (
          <Navigate to="/profile/create" />
        ) : (
          <Navigate to="/login" />
        ),
      },
    ],
  },

  {
    path: "/projects",
    element: <Layout />,
    children: [
      {
        path: "",
        element: isLoading ? (
          <Loading />
        ) : !isLoggedIn ? (
          <Navigate to="/login" />
        ) : (
          <Projects />
        ),
      },
    ],
  },
  {
    path: "/jobs",
    element: <Layout />,
    children: [
      {
        path: "",
        element: isLoading ? (
          <Loading />
        ) : !isLoggedIn ? (
          <Navigate to="/login" />
        ) : (
          <Jobs />
        ),
      },
    ],
  },
  {
    path: "/not-available",
    element: <NotAvailable />,
  },
];

export default routes;
