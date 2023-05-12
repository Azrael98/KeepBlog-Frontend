import React, { useEffect, useRef, useState } from "react";
import Edit from "../img/edit2.png";
import Delete from "../img/delete2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Comments from "../components/Comments";
import Loading from "../components/Loading";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  const [show, setShow] = useState(true);

  useEffect(() => {
    // show &&
    //   ref.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //     inline: "nearest",
    //   });
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setShow(false);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          auth: "Bearer " + currentUser?.token,
        },
      }
    );
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

  return show ? (
    <Loading />
  ) : (
    <div className="flex flex-col" ref={ref}>
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
      <div className="container flex flex-wrap py-6">
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
                  Posted {moment(post.updatedAt).fromNow()}
                </p>
                {currentUser?.user?._id === post?.uid && (
                  <>
                    <Link to={`/write?edit=2`} state={post}>
                      <img
                        src={Edit}
                        alt=""
                        className="w-6 h-6 gap-5 border-solid ml-2 border border-solid hover:border-black"
                      />
                    </Link>
                    <img
                      onClick={handleDelete}
                      src={Delete}
                      alt=""
                      className="w-6 h-6 cursor-pointer gap-5 border-solid ml-2 border border-solid hover:border-black"
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
      <div className="relative">
        <Comments pid={postId} className="absolute bottom-0 left-0 h-16 w-16" />
      </div>
    </div>
  );
};

export default Single;
