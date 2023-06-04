import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import Navbar from "./Navbar";
import "./Style2.css";
import { baseURL } from "../../auth/axios";
import Profile from "./Profile";
import MainFeed from "./MainFeed";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [modal, setModal] = useState(false);
  const { postData, User } = useSelector((state) => state);
  const dispatch = useDispatch();
  const toast = useToast();

  // console.log(User)


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

  useEffect(() => {
    const res = baseURL({
      method: "get",
      url: "/currentuser",
      headers: {
        authorization: "Bearer " + localStorage.getItem("user_Token"),
      },
    })
      .then((saved) => {
        dispatch({
          type: "USER_TOKEN",
          payload: saved.data.message._doc,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [savedPost]);

  useEffect(() => {
    if (User) {
      document.title = "@" + User.userName + " - " + "InstaBook";
    } else {
      document.title = "Instabook";
    }
  }, [User]);

  const renderpost = async () => {
    const res = await baseURL({
      method: "get",
      url: "/currentuserpost",
      headers: {
        authorization: "Bearer " + localStorage.getItem("user_Token"),
      },
    }).then((post) => {
      dispatch({
        type: "POST_DATA",
        Data: post.data.saved,
      });
    });
  };

  useEffect(() => {
    renderpost();
  }, []);

  useEffect(() => {
    renderpost()
  },[postData])
  

  return (
    <div className="home">
      <div
        className={modal ? "modal_p" : "modal_p hidden"}
        onClick={(e) =>
          e.target.classList.value === "modal_p" ? setModal(false) : ""
        }
      >
        <PostModal modal={setModal} />
      </div>
      <div className="nav_header">
        <Navbar modal={setModal} m={modal} />
      </div>
      <div className="main">
        {
          <Routes>
            <Route path="/home" element={<MainFeed s={savedPost} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        }
      </div>
    </div>
  );
};

export default Home;
