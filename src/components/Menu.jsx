import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return show ? (
    <Loading />
  ) : (
    <div
      className="menu"
      style={{
        paddingLeft: "10px",
      }}
    >
      <h1>Other Posts You may like</h1>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <img src={post.img} alt="" />
          <h2>{post.title}</h2>
          <button
            onClick={() => {
              navigate(`/post/${post._id}`);
            }}
          >
            Read more
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
