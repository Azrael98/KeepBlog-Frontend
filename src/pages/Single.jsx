import React, { useEffect, useState } from "react";
import Edit from "../img/edit2.png";
import Delete from "../img/delete2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://creepy-bonnet-cod.cyclic.app/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [postId]);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    await fetch(`https://creepy-bonnet-cod.cyclic.app/api/posts/${postId}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        auth: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).catch((err) => console.log(err));

    setTimeout(() => {
      navigate("/");
    }, 3000);
    toast.success("Post Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
      <div className="container mx-auto flex flex-wrap py-6">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <article className="flex flex-col shadow my-4">
            <Link to="" className="hover:opacity-75">
              <img src={post.img} alt="" id="single-img" />
            </Link>
            <div className="bg-white flex flex-col justify-start p-6">
              <Link
                to=""
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                {post.cat}
              </Link>
              <Link
                to=""
                className="text-3xl font-bold hover:text-gray-700 pb-4"
              >
                {post.title}
              </Link>
              <div className="edit flex">
                <p href="#" className="text-sm pb-8">
                  Posted {moment(post.date).fromNow()}
                </p>
                {currentUser?.username === post?.username && (
                  <>
                    <Link to={`/write?edit=2`} state={post}>
                      <img
                        src={Edit}
                        alt=""
                        className="w-6 h-6 gap-5 border-solid"
                      />
                    </Link>
                    <img
                      onClick={handleDelete}
                      src={Delete}
                      alt=""
                      className="w-6 h-6 cursor-pointer gap-5 border-solid"
                    />
                  </>
                )}
              </div>

              <p
                className="pb-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            </div>
          </article>
        </section>
        <Menu cat={post.cat} />
      </div>
    </>
  );
};

export default Single;
