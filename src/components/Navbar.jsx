import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo2.png";
import { catClass, ulClass } from "./tailwind-component";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <nav className="w-full py-4 bg-blue-800 shadow sticky top-0 z-10">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className={ulClass}>
              <li>
                <Link
                  className="hover:text-gray-200 hover:underline px-4"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li>
                    <Link
                      className="hover:text-gray-200 hover:underline px-4"
                      to="/write"
                    >
                      Write
                    </Link>
                  </li>
                  <li>
                    <span
                      className="hover:text-gray-200 hover:underline px-4 cursor-pointer"
                      onClick={() => {
                        toast.info("Logged Out", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        logout();
                      }}
                    >
                      Logout
                    </span>
                  </li>

                  <li>
                    <Link
                      className="hover:text-gray-200 hover:underline px-4 cursor-pointer"
                      to="/user"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    className="hover:text-gray-200 hover:underline px-4"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center text-lg no-underline text-white pr-6">
            <Link className="" to="/?cat=cinema">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link className="pl-6" to="/?cat=cinema">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className="pl-6" to="/?cat=cinema">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="pl-6" to="/?cat=cinema">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </nav>

      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <Link
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            to="/"
          >
            <img src={Logo} alt="" />
          </Link>
          <p className="text-lg text-gray-600">KEEP BLOG</p>
        </div>
      </header>

      <nav
        className="w-full py-4 border-t border-b bg-gray-100"
        x-data="{ open: false }"
      >
        <div className="block sm:hidden">
          <Link
            to="/?cat=cinema"
            className="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          >
            Topics
            <i className="fas ml-2"></i>
          </Link>
        </div>
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto ">
          <div className={catClass}>
            <Link
              to="/?cat=art"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Art
            </Link>
            <Link
              to="/?cat=cinema"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Cinema
            </Link>
            <Link
              to="/?cat=science"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Science
            </Link>
            <Link
              to="/?cat=politics"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Politics
            </Link>
            <Link
              to="/?cat=culture"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Culture
            </Link>
            <Link
              to="/?cat=sports"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Sports
            </Link>
            <Link
              to="/?cat=design"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Design
            </Link>
            <Link
              to="/?cat=food"
              className="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Food
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
