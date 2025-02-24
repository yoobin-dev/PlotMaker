import "../styles/common.css";
import "../styles/welcomePage.css";

import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nickname = userInfo.nickname;
  const navigate = useNavigate();

  return (
    <div className="h-100 w-100 bg_black">
      <div className="display_2 ft_white">
        <div>
          <span id="spanNickname">{nickname}&nbsp;</span>
          <span>작가님</span>
        </div>
        <div>
          환영해요!
        </div>
      </div>
      <Profile name={nickname} onClick={() => {navigate("/prompt")}} />
    </div>
  )
}

export default WelcomePage;