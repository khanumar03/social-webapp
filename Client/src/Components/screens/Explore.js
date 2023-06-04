import React from "react";
import { useSelector } from "react-redux";

const Explore = () => {
  const { postData, User } = useSelector((state) => state);

  return (
    <div className="explore_center">
      <div className="ex_top">
        <div className="img_P_C">
          <img
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src="https://c4.wallpaperflare.com/wallpaper/651/33/290/mercedes-benz-mercedes-amg-car-reflection-wallpaper-preview.jpg"
            alt="img"
          />
        </div>
        <div className="PFF_F">
          <div className="PFF">
            <div className="P">
              <span className="block_l">Post</span>
              {postData?.length}
            </div>
            <div className="P">
              <span className="block_l">Follow</span>0
            </div>
            <div className="P">
              <span className="block_l">Following</span>0
            </div>
          </div>
          {/* <button className='F_btn'>Follow</button> */}
        </div>
      </div>
      <div className="ex_bottom">
        <div className="ex_btm_center">
          {postData.map((x, xi) => (
            <div className="btm_profile_feed" key={xi}>
              <img
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={x.imgsrc}
                alt="img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
