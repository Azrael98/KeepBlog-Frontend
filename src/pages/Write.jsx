import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import "../css/write.css";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const { currentUser } = useContext(AuthContext);

  const [header, setHeader] = useState();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [url, setUrl] = useState("");

  const imgUrl = state?.img;

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) navigate("/");
    else setHeader("Bearer " + currentUser.token);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    state
      ? await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${state._id}`,
          {
            title,
            desc: value,
            cat,
            img: imgUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
              auth: header,
            },
          }
        )
      : await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/posts`,
          {
            title,
            desc: value,
            cat,
            img: url,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              auth: header,
            },
          }
        );
    navigate("/");
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   if (file !== null) {
  //     const name = new Date().getTime() + file.name;
  //     const storageRef = ref(storage, name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {},
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           try {
  //             state
  //               ? await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${state.id}`, {
  //                   method: "PUT",
  //                   mode: "cors",
  //                   cache: "no-cache",
  //                   credentials: "same-origin",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                     auth: header,
  //                   },
  //                   redirect: "follow",
  //                   referrerPolicy: "no-referrer",
  //                   body: JSON.stringify({
  //                     title,
  //                     desc: value,
  //                     cat,
  //                     img: file ? downloadURL : imgUrl,
  //                   }),
  //                 })
  //               : await fetch("${process.env.REACT_APP_SERVER_URL}/api/posts", {
  //                   method: "POST",
  //                   mode: "cors",
  //                   cache: "no-cache",
  //                   credentials: "same-origin",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                     auth: header,
  //                   },
  //                   redirect: "follow",
  //                   referrerPolicy: "no-referrer",
  //                   body: JSON.stringify({
  //                     title,
  //                     desc: value,
  //                     cat,
  //                     img: file ? downloadURL : "",
  //                     date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //                   }),
  //                 });
  //             navigate("/");
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         });
  //       }
  //     );
  //   }
  //   state
  //     ? await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${state.id}`, {
  //         method: "PUT",
  //         mode: "cors",
  //         cache: "no-cache",
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //           auth: header,
  //         },
  //         redirect: "follow",
  //         referrerPolicy: "no-referrer",
  //         body: JSON.stringify({
  //           title,
  //           desc: value,
  //           cat,
  //           img: imgUrl,
  //         }),
  //       })
  //     : await fetch("${process.env.REACT_APP_SERVER_URL}/api/posts", {
  //         method: "POST",
  //         mode: "cors",
  //         cache: "no-cache",
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //           auth: header,
  //         },
  //         redirect: "follow",
  //         referrerPolicy: "no-referrer",
  //         body: JSON.stringify({
  //           title,
  //           desc: value,
  //           cat,
  //           img: "",
  //           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //         }),
  //       });
  //   navigate("/");
  // };

  return (
    <div className="add m-25">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          {/* <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          /> */}
          Image URL
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            style={{
              border: "1px solid black",
              marginBottom: "5px",
            }}
          />
          {/* <label className="file" htmlFor="file">
            Upload Image
          </label> */}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "Politics"}
              name="cat"
              value="Politics"
              id="Politics"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Politics</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "culture"}
              name="cat"
              value="culture"
              id="culture"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Culture</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sports"}
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Sports</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
