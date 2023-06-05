import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(inputs),
      }
    );
    if (response.status !== 200) {
      setCurrentUser(null);
    } else {
      const res = await response.json();
      setCurrentUser(res);
    }
    return response.status;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
