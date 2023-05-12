import React from "react";
import loading from "../img/Spinner-1s-200px.svg";

const Loading = () => {
  return (
    <img
      src={loading}
      alt=""
      style={{
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "45%",
      }}
    />
  );
};

export default Loading;
