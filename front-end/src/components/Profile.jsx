import { useState, useEffect } from "react";
import "../styles/profile.css";
function Profile({ img = "", name = "" }) {
  return (
    <div id="userProfile">
      <div id="profileImg">
        <img
          className="h-100 w-100"
          src="https://png.pngtree.com/png-clipart/20220112/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4154232.png"
          style={{ borderRadius: "13px" }}
        ></img>
      </div>
      <div id="profileText">
        <span
          className="fw-600"
          style={{ color: "#fff", fontSize: "17px", lineHeight: "24px" }}
        >
          {name}
        </span>{" "}
        <br />
        <span
          className="fw-400"
          style={{
            color: "#BBB",
            fontSize: "15px",
            lineHeight: "22px",
            letterSpacing: "0.142px",
          }}
        >
          Lv.1 플롯 메이커
        </span>
      </div>
    </div>
  );
}

export default Profile;
