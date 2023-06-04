import React, { useEffect, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { baseURL } from "../../auth/axios";
import { useSelector } from "react-redux";

const Right = () => {
  const { postData, User } = useSelector((state) => state);

  return (
    <div className="right_compo">
      <div className="center_c_n">
        <div className="P_img">
          <AccountCircleRoundedIcon
            className="_i"
            color="gray"
            fontSize="30px"
          />
        </div>
        <span className="_userName">{User ? User.userName : ""}</span>
      </div>
    </div>
  );
};

export default Right;
