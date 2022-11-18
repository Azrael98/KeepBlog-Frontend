import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";

function User() {
  axios.defaults.withCredentials = true;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setInputs({
      username: currentUser.name,
      password: currentUser.password,
      email: currentUser.email,
    });
  }, []);



  const handleChange = (e) => {
    setInputs((prev) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://creepy-bonnet-cod.cyclic.app/api/users/", inputs);
      alert("update successfully");
      setCurrentUser((prev) => ({ ...currentUser, username: inputs.username }));
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={inputs.username}
                />
              </div>
              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="email"
                  name="email"
                  value={inputs.email}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  name="password"
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default User;
