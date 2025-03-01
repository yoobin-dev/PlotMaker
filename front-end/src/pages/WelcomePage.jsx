import "../styles/common.css";
import "../styles/welcomePage.css";

import Profile from "../components/Profile";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    const welcome = document.getElementById("welcomBackround");

    setTimeout(() => {
      const children = welcome.querySelectorAll("*");
      welcome.classList.add("fade-out");
      children.forEach((child) => child.classList.add("fade-out"));
    }, 2000);

    setTimeout(() => {
      // navigate("/prompt", { state: { nickname: nickname } }); // 페이드아웃 후 페이지 이동
      navigate("/prompt"); // 페이드아웃 후 페이지 이동
    }, 3000);
  }, [navigate]);

  return (
    <div id="welcomBackround">
      <div id="welcomeTop" className="w-100">
        <div id="welcomeMessage" className="display_2 ft_white">
          <div>
            <span
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "10px",
              }}
            >
              {userInfo.nickname}
            </span>
            작가님
          </div>
          <div>환영해요!</div>
        </div>
        <Profile nickname={userInfo.nickname}></Profile>
      </div>
      <div id="questMessage">
        <div className="headling_1 ft_gray_a">Lv.1 업적 달성!</div>
        <div className="body_1 ft_gray_a">(최초 로그인 하기)</div>
      </div>
    </div>
  );
};

const WelcomePage2 = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nickname = userInfo.nickname;
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    /* 전환효과 수정해야 함 */
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const timer = setTimeout(() => {
      navigate("/prompt", { state: { fadeIn: true } });
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      className={`h-100 w-100 bg_black fade-container ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <div className="display_2 ft_white">
        <div>
          <span id="spanNickname">{nickname}&nbsp;</span>
          <span>작가님</span>
        </div>
        <div>환영해요!</div>
      </div>
      <Profile name={nickname} />
    </div>
  );
};

export default WelcomePage;
