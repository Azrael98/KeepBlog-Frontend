import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { AuthContext } from "../context/authContext";


const Comments = ({ pid }) => {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  const [render, setRender] = useState(0);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState({
    id: null,
    show: false,
  });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/comments/${pid}`
      );
      setComments(res.data);
    };
    fetchComments();
  }, [render, pid]);


  const uid = currentUser?.user._id;
  const token = currentUser?.token;

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/comments`,
        {
          comment,
          uid,
          pid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRender(render + 1);
      }
    } catch (error) {
      toast.error(
        currentUser === null
          ? "You need to be logged in."
          : "Unable to Post Comment",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setEdit({ id: 0, show: false });
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/comments/${id}`,
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRender(render + 1);
      }
    } catch (error) {
      toast.error(
        currentUser === null
          ? "You need to be logged in."
          : "Unable to Edit Comment",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/comments/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            auth: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Comment Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRender(render + 1);
      }
    } catch (error) {
      toast.error(
        currentUser === null
          ? "You need to be logged in."
          : "Unable to Post Comment",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log(error);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900">
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
      <div className="px-4 w-3/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments?.length})
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required=""
              defaultValue={""}
              name="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Unable to Post Comment</span>
            </div>
          )}
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            onClick={handlePost}
          >
            Post comment
          </button>
        </form>
        {comments?.map((com) => (
          <article
            className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-indigo-600"
            key={com._id}
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={
                      com.img === undefined
                        ? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        : com.img
                    }
                    alt="icon"
                  />
                  {com.uid.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {/* {moment(com?.date).calendar()} */}
                  {moment(com.updatedAt).fromNow()}
                </p>
              </div>
            </footer>
            {edit.show && edit.id === com._id ? (
              <>
                <textarea
                  id="chat"
                  rows="1"
                  className="block my-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={() => handleEdit(com._id)}
                >
                  Edit comment
                </button>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">{com.comment}</p>
            )}
            {com.uid._id === uid && (
              <div
                style={{
                  marginTop: "15px",
                }}
              >
                <span
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    paddingRight: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEdit({ id: com._id, show: !edit.show });
                    setComment(com.comment);
                  }}
                >
                  Edit
                </span>
                <span
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(com._id)}
                >
                  Delete
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;
