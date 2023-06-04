import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../auth/axios";
import FeedComponents from "./FeedComponents";
import "./Style2.css";

const Feed = (props) => {
  const { postData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const likeAndunLikePost = async (id) => {
    const res = await baseURL({
      method: "POST",
      url: "/likeUnlike",
      headers: {
        authorization: "Bearer " + localStorage.getItem("user_Token"),
      },
      data: { id: id },
    })
      .then((saved) => {
        if (saved) {
          const LikeUpdate = postData.map((x) =>
            x._id === saved.data.message._id ? saved.data.message : x
          );
          dispatch({
            type: "POST_DATA",
            Data: LikeUpdate,
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="feed">
      {postData?.length >= 1
        ? postData.map((x, xI) => {
            const { _id, imgsrc, description, Like } = x;
            return (
              <FeedComponents
                key={xI}
                src={imgsrc}
                postsrc={imgsrc}
                description={description}
                id={xI}
                pID={_id}
                likes={Like}
                likeAndunLikePost={likeAndunLikePost}
                sF={props.sTH}
              />
            );
          })
        : "No post"}
    </div>
  );
};

export default Feed;
