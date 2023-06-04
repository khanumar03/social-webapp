import React, { useEffect, useRef, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { baseURL } from "../../auth/axios";
import { useDispatch, useSelector } from "react-redux";
import MoreModal from "./MoreModal";
import { useToast } from "@chakra-ui/react";
import ComBox from "./ComBox";

export const FeedComponents = (props) => {
  const { postData, User } = useSelector((state) => state);
  const [cModal, setCModal] = useState(false);
  const [coData, setCodata] = useState();
  const [spin, setSpin] = useState(false);
  const [modalT, setModalT] = useState(false);
  const [commentM, setCommentM] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  if (cModal) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = (e) => {
      window.onpopstate = () => {};
      // console.log(e)
      window.history.back();
      setCModal(false);
    };
  }

  const filterDeletePost = (id) => {
    setSpin(true);
    postData.map(async (x, xi) => {
      if (x._id === id) {
        const res = await baseURL({
          method: "post",
          url: "/postdelete",
          headers: {
            authorization: "Bearer " + localStorage.getItem("user_Token"),
          },
          data: { id },
        })
          .then((del) => {
            if (del) {
              setModalT(false);
              setSpin(false);
              toast({
                description: "Post Deleted",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }
            if (!del) {
              setModalT(false);
              setSpin(false);
              toast({
                description: "Please try again",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
          })
          .catch((err) => {
            if (err) {
              setModalT(false);
              setSpin(false);
              toast({
                description: "Something went wrong, try again",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
          });
      }
    });
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
    <div className="_feedCompo">
      {cModal ? (
        <div
          className="comment_s"
          onClick={(e) =>
            e.target.classList.value === "comment_s" ? setCModal(false) : ""
          }
        >
          <div className="comment_s_c">
            {coData.Comment.map((x, xi) => (
              <ComBox name={x.commentBy} com={x.comment} key={xi} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className={modalT ? "modal_m" : "modal_m hidden"}
        onClick={(e) =>
          e.target.classList.value === "modal_m" ? setModalT(false) : ""
        }
      >
        <MoreModal func={filterDeletePost} idD={props.pID} spin={spin} />
      </div>
      <div className="feedtitle">
        <div className="feedProfileimg">
          <div className="_fpi">
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={props.src}
              alt="img"
            />
          </div>
          <span
            className="user_name_feed"
            style={{
              fontSize: "17px",
            }}
          >
            {User ? User.userName : ""}
          </span>
        </div>
        <div className="more" onClick={() => setModalT(true)}>
          <MoreHorizIcon />
        </div>
      </div>
      <div
        className="feedpostimg"
        onDoubleClick={() => props.likeAndunLikePost(props.pID)}
      >
        <div className="_imgpost">
          <img
            className="__img"
            src={props.postsrc}
            alt="img"
          />
        </div>
      </div>
      <div className="LCS_S">
        <div className="lcs_s_header">
          <div className="lcs">
            {postData
              .filter((x) => x._id === props.pID)
              .map((x, xI) =>
                x.Like?.includes(User?._id) ? (
                  <FavoriteIcon
                    key={xI}
                    className="icon_lcs h"
                    fontSize="25px"
                  />
                ) : (
                  <FavoriteBorderIcon
                    key={xI}
                    className="icon_lcs"
                    fontSize="25px"
                  />
                )
              )}
            <ModeCommentOutlinedIcon
              onClick={() => openC(props.pID)}
              className="icon_lcs"
              fontSize="25px"
            />
            <SendOutlinedIcon className="icon_lcs" fontSize="25px" />
          </div>
          <div className="_save" onClick={() => props.sF(props.pID)}>
            {User?.savedID?.includes(props.pID) ? (
              <BookmarkAddedIcon className="icon_s" fontSize="30px" />
            ) : (
              <BookmarkAddOutlinedIcon className="icon_s" fontSize="30px" />
            )}
          </div>
        </div>
        <div className="description">
          <div className="allPostLike">{props.likes?.length} likes</div>
          <div className="user_des">
            <span className="_user_name">
              @{User ? User.userName : ""} : {props.description}{" "}
            </span>
            <div className="post_COM">
              {postData
                .filter((x) => x._id === props.pID)
                .map((x, xI) =>
                  x.Comment?.length >= 1 ? (
                    <span key={xI}>
                      @
                      {User ? User.userName + " : " + x.Comment[0].comment : ""}
                    </span>
                  ) : (
                    ""
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="addComment">
        <div className="commentField">
          <input
            className="addC"
            placeholder="Add a comment..."
            type="text"
            onChange={(e) => {
              setCommentM(e.target.value);
            }}
            value={commentM}
          />
        </div>
        <div className="post_btn" onClick={() => Comment(props.pID)}>
          Post
        </div>
      </div>
    </div>
  );
};

export default FeedComponents;
