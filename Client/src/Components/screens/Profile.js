import React, { useState } from "react";
import Explore from "./Explore";
import SavedPost from "./SavedPost";
import "./Style4.css";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useSelector } from "react-redux";

const Profile = () => {
  const { postData, User } = useSelector((state) => state);
  const [Tab, setTab] = useState({
    explore: true,
  });
  return (
    <div className="profile">
      <div className="profile_navbar">
        <div className="_pro_center">
          <span
            className={
              Tab.explore ? "slider_P_nav lef_P_nav" : "slider_P_nav rig_P_nav "
            }
          ></span>
          <div className="explore" onClick={() => setTab({ explore: true })}>
            <ExploreOutlinedIcon className="icon_Pro" fontSize="30px" />
            {/* {User?.userName} */}
            Explore
          </div>
          <div className="saved_u_P" onClick={() => setTab({ explore: false })}>
            <BookmarkAddedIcon className="icon_Pro" fontSize="30px" />
            Saved
          </div>
        </div>
      </div>
      <div className="profile_nav_tab">
        {Tab.explore ? <Explore /> : <SavedPost />}
      </div>
    </div>
  );
};

export default Profile;
