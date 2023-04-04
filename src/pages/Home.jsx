import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return posts.filter((item) => {
      return item.desc.toLowerCase().includes(query?.toLowerCase());
    });
  }, [posts, query]);

  const cat = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${cat}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return short(doc.body.textContent);
  };

  const short = (str) => {
    return str.substr(0, 200);
  };

  return (
    <div className="home">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What are you looking for?"
        />
      </div>
      <div className="container mx-auto flex flex-wrap py-6">
        {filteredItems.length === 0 && (
          <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
              <div className="max-w-md text-center">
                <p className="text-2xl font-semibold md:text-3xl">
                  Sorry, we couldn't find what you're looking for.
                </p>
                <p className="mt-4 mb-8 dark:text-gray-400">
                  But dont worry, you can find plenty of other things on our
                  homepage.
                </p>
              </div>
            </div>
          </section>
        )}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          {filteredItems.map((post) => (
            <article className="flex flex-col shadow my-4" key={post._id}>
              <div className="hover:opacity-75">
                <img src={post.img} alt="" id="home-img" />
              </div>
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
                <p className="text-sm pb-3">
                  Posted {moment(post.updatedAt).fromNow()}
                </p>
                <Link to="" className="pb-6">
                  {getText(post.desc)}...
                </Link>
                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="uppercase text-gray-800 hover:text-black"
                >
                  Continue Reading <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">About Us</p>
            <p className="pb-2">
              Keep your thoughts alive! Create your own blog with KeepBlog and
              share with the world. From travel to tech, food to fitness,
              KeepBlog has something for everyone. Get started today and join
              the ever-growing community of bloggers who are telling their
              stories, engaging in lively discussions & learning from each
              other. With KeepBlog, you can give your thoughts a voice - change
              the world one blog post at a time!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
