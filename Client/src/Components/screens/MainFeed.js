import React from "react";
import Left from "./Left";
import Right from "./Right";

const MainFeed = (props) => {
  return (
    <>
      <div className="main_center">
        <div className="left_main">
          <Left sT={props.s}/>
        </div>
        <div className="right_main">
          <Right />
        </div>
      </div>
    </>
  );
};

export default MainFeed;
