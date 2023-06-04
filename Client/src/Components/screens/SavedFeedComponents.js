import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useToast } from "@chakra-ui/react";
import { baseURL } from "../../auth/axios";
import { useDispatch, useSelector } from "react-redux";
import "./Style4.css"
// import "./Style2.css"

function SavedFeedComponents(props) {
  const { postData, User } = useSelector((state) => state);
  const dispatch = useDispatch();
  const toast = useToast();

  const savedPost = async (id) => {
    const res = await baseURL({
      method: "post",
      url: "/findpostandAdd",
      headers: {
        authorization: "Bearer " + localStorage.getItem("user_Token"),
      },
      data: { id: id },
    })
      .then((saved) => {
        if (saved) {
            toast({
            description: saved.data.msg,
            status: "info",
            duration: 2000,
            isClosable: true,
          });
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
          // console.log(err)
        }
      });
  };

  return (
    <div className="savedFeedCom">
     
    </div>
  );
}

export default SavedFeedComponents;
