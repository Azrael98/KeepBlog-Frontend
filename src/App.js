import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./style.scss";
import User from "./pages/User";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const currentUser = JSON.parse(localStorage.getItem("user")) || null;
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
        element: currentUser === null ? <Home /> : <Write />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    path: "/register",
    element: currentUser === null ? <Register /> : <Layout />,
  },
  {
    path: "/login",
    element: currentUser === null ? <Login /> : <Layout />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
