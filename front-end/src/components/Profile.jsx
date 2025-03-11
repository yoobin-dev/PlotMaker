import { useState, useEffect } from "react";
import "../styles/profile.css";

function Profile({ setMyPageOn }) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const handleMyPage = () => {
    if (userInfo?.socialId) {
      setMyPageOn(true);
    }
  };

  return (
    <div id="userProfile" className="bg_gray_4" onClick={handleMyPage}>
      <div id="profileImg">
        <img className="h-100 w-100" src="profile_default.png"></img>
      </div>
      <div id="profileText">
        <span className="headline2 ft_white">
          {userInfo?.nickname ? userInfo?.nickname : "무명 작가"}
        </span>{" "}
        <br />
        <span className="body_2 ft_gray_b">Lv.1 플롯 메이커</span>
      </div>
    </div>
  );
}

export default Profile;
