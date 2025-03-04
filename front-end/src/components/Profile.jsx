import { useState, useEffect } from "react";
import "../styles/profile.css";
function Profile({ img = "", nickname = "플롯메이커" }) {
  return (
    <div id="userProfile" className="bg_gray_4">
      <div id="profileImg">
        <img
          className="h-100 w-100"
          src="https://png.pngtree.com/png-clipart/20220112/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4154232.png"
        ></img>
      </div>
      <div id="profileText">
        <span className="headline2 ft_white">{nickname}</span> <br />
        <span className="body_2 ft_gray_b">Lv.1 플롯 메이커</span>
      </div>
    </div>
  );
}

export default Profile;
