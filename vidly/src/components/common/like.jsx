import React from "react";

//Input: liked: boolean
//Output: onClick event

const Like = props => {
  const { liked } = props;
  let className = "fa fa-heart";
  if (!liked) {
    className += "-o";
  }
  return (
    <i
      onClick={props.onClick}
      className={className}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
