import React, { Suspense } from "react";
import Loading from "./components/Loading";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./style.scss";
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Write = React.lazy(() => import("./pages/Write"));
const Single = React.lazy(() => import("./pages/Single"));
const Home = React.lazy(() => import("./pages/Home"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));
const User = React.lazy(() => import("./pages/User"));

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
