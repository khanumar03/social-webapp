import React, { useState } from "react";
import "./Style3.css";

const MoreModal = (props) => {
  const delPost = (id) => {
    props.func(id);
  };
  return (
    <div className="moremodal" onClick={() => delPost(props.idD)}>
      {props.spin ? (
        <>
          {" "}
          Deleting post <span className="spin"></span>
        </>
      ) : (
        "Delete post"
      )}
    </div>
  );
};

export default MoreModal;
