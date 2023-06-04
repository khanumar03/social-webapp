import React, { useRef, useEffect, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Feed from "./Feed";

const Left = (props) => {
  const [leftHide, setLeftHide] = useState(false);
  const [rightHide, setRightHide] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    const sWidth = scroll.current.scrollWidth;
    const cWidth = scroll.current.clientWidth;
    if (sWidth <= cWidth) {
       setLeftHide(true)
       setRightHide(true)
    }
  }, [scroll]);

  const btn1 = () => {
    scroll.current.scrollLeft -= 250;
  };

  const btn2 = () => {
    scroll.current.scrollLeft += 250;
  };

  return (
    <div className="left_compo">
      <div
        className={
          leftHide
            ? "btn_slider left_arrow_btn lHide"
            : "btn_slider left_arrow_btn"
        }
        onClick={btn1}
      >
        <ArrowCircleLeftIcon fontSize="30px" />
      </div>
      <div
        className={
          rightHide
            ? "btn_slider right_arrow_btn rHide"
            : "btn_slider right_arrow_btn"
        }
        onClick={btn2}
      >
        <ArrowCircleRightIcon fontSize="30px" />
      </div>
      <div ref={scroll} className="story_slider">
        <div className="slider_rail">
          <div className="c_s">
            <div className="c">
              <AccountCircleRoundedIcon
                className="icon_p_s"
                fontSize="10px"
                color="#fff"
              />
            </div>
            <span className="name_s">never Dead</span>
          </div>
          <div className="c_s">
            <div className="c">
              <AccountCircleRoundedIcon
                className="icon_p_s"
                fontSize="10px"
                color="#fff"
              />
            </div>
            <span className="name_s">never Dead</span>
          </div>
        </div>
      </div>
      <div className="main_feed">
        <Feed sTH={props.sT} />
      </div>
    </div>
  );
};

export default Left;
