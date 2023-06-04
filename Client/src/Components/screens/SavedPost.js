import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../auth/axios";
import SavedFeedComponents from "./SavedFeedComponents";
import { useToast } from "@chakra-ui/react";

const SavedPost = () => {
  const { postData, User } = useSelector((state) => state);
  const [cModal, setCModal] = useState(false);
  const [coData, setCodata] = useState();
  const [spin, setSpin] = useState(false);
  const [commentM, setCommentM] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  if (cModal) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = (e) => {
      window.onpopstate = () => {};
      // console.log(e)
      window.history.back();
      setCModal(false);
    };
  }

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

  const Comment = (id) => {
    if (commentM.length >= 1) {
      const res = baseURL({
        method: "POST",
        url: "/comment",
        headers: {
          authorization: "Bearer " + localStorage.getItem("user_Token"),
        },
        data: { commentM, id },
      })
        .then((saved) => {
          if (saved) {
            setCommentM("");
            const commentUpdate = postData.map((x) =>
              x._id === saved.data.message._id ? saved.data.message : x
            );
            dispatch({
              type: "POST_DATA",
              Data: commentUpdate,
            });
            toast({
              description: "Comment added",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            // console.log(saved);
          }
        })
        .catch((err) => {
          if (err) {
            toast({
              description: "Something went wrong, try again",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
          // console.log(err);
        });
    }

    if (commentM.length < 1) {
      toast({
        description: "Please write something",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const openC = async (id) => {
    const cData = await postData.filter((x) => x._id === id);
    if (cData) {
      setCodata(cData[0]);
      setCModal(true);
    }
  };
  return (
    <div className="savedPost_feed">
      {postData?.length >= 1
        ? postData.map((x, xi) => {
            const { _id, imgsrc, description, Like } = x;
            return (
              <SavedFeedComponents
                key={xi}
                openC={openC}
                comment={Comment}
                likeunLike={likeAndunLikePost}
                com={commentM}
                sCom={setCommentM}
                pID={_id}
                likes={Like}
                postsrc={imgsrc}
                description={description}
              />
            );
          })
        : "No saved Post"}
    </div>
  );
};

export default SavedPost;
