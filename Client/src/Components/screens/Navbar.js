import React from "react";
import "./Style2.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector, useDispatch } from "react-redux";

const Navbar = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history("/Authentication", { replace: true });
  };

  if (props.m) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = (e) => {
      window.onpopstate = () => {};
      // console.log(e)
      window.history.back();
      props.modal(false);
    };
  }

  return (
    <div className="navbar">
      <div className="nav_center">
        <div className="logo">
          <span>Instabook</span>
        </div>
        <div className="search_bar">
          <span>
            <SearchIcon color="black" />
          </span>
          <input type="text" placeholder="Search" />
        </div>
        <div className="nav_link">
          <ul className="link_list">
            <Link to="/home">
              <li className="list_1 lef">
                <HomeRoundedIcon className="icon" fontSize="25px" />
              </li>
            </Link>
            <li
              className="list_4 lef"
              onClick={() => {
                // window.history.pushState(null,null,"/home/createpost")
                props.modal(true);
              }}
            >
              <AddBoxOutlinedIcon className="icon" fontSize="25px" />
            </li>
            <li className="list_2 lef" onClick={() => logOut()}>
              <FavoriteBorderIcon className="icon" fontSize="25px" />
            </li>
            <Link to="/profile">
              <li className="list_3 lef">
                <AccountCircleRoundedIcon className="icon" fontSize="25px" />
              </li>
            </Link>
            <li className="list_4 lef">
              <SettingsIcon className="icon" fontSize="25px" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
