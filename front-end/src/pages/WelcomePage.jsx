import "../styles/common.css";
import "../styles/welcomePage.css";

import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nickname = userInfo.nickname;
  const navigate = useNavigate();
  const [ fadeOut, setFadeOut ] = useState(false);

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
    }
  }, [navigate]);

  return (
    <div className={`h-100 w-100 bg_black fade-container ${fadeOut? "fade-out" : ""}`}>
      <div className="display_2 ft_white">
        <div>
          <span id="spanNickname">{nickname}&nbsp;</span>
          <span>작가님</span>
        </div>
        <div>
          환영해요!
        </div>
      </div>
      <Profile name={nickname} />
    </div>
  )
}

export default WelcomePage;