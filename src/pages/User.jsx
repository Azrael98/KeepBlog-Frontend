import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordModal from "../components/ChangePasswordModal";
import Loading from "../components/Loading";

export default function User() {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const [show, setShow] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = user?.token;

  const handleDelete = async (postId) => {
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          auth: "Bearer " + token,
        },
      }
    );
    if (res.status === 200) navigate("/user");
  };

  useEffect(() => {
    if (currentUser === null) navigate("/");
    const getDetails = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/all`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            auth: "Bearer " + token,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );
      const res = await response.json();
      setData(res);
      setUserData({
        username: res?.profile.username,
        email: res?.profile.email,
      });
      setShow(false);
    };
    getDetails();
  }, [currentUser, token, navigate]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/users/editUser`,
      { userData },
      {
        headers: {
          auth: "Bearer " + token,
        },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      const { password, ...other } = res.data;
      localStorage.setItem("user", JSON.stringify({ user: other, token }));
      toast.success("Profile Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Some Error Occured", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  return show ? (
    <Loading />
  ) : (
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
      <div className="profile">
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Your Profile</h1>

          <div>
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={data?.profile.username}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Email Adress
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder={data?.profile.email}
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none disabled:opacity-25"
                disabled={
                  userData.username === data?.profile.username &&
                  userData.email === data?.profile.email
                }
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </button>
              <button
                className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none disabled:opacity-25"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(!showModal);
                }}
              >
                Change password
              </button>
              <ChangePasswordModal
                isOpen={showModal}
                onClose={setShowModal}
                token={token}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 rounded border border-gray-200 mt-8 space-y-6">
        <h1 className="font-medium text-3xl">Your Posts</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.posts.map((post) => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={post?._id}>
                  <Link to={`/post/${post._id}`}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {post.title}
                    </th>
                  </Link>
                  <td className="px-6 py-4">{capitalize(post.cat)}</td>
                  <td className="px-6 py-4">
                    {moment(post.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(post.updatedAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/write?edit=2`}
                      state={post}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(post._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// import React from 'react'
// import SingleBlogPost from '../components/SingleBlogPost'

// const User = () => {
//   return (
//     <SingleBlogPost/>
//   )
// }

// export default User
