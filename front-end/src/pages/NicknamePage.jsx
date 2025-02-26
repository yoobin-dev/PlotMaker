import { useRef, useState } from "react";

import { postSetNickname } from "../api/user";

import "../styles/common.css";
import "../styles/NicknamePage.css";
import { useNavigate } from "react-router-dom";

const NicknamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleInput = (e) => {
    setNickname(e.target.value);
  };

  const handleConfirm = async () => {
    if (!nickname.trim()) {
      alert("필명을 입력해주세요.");
      return;
    }

    try {
      // 로그인 백단 구현 시 주석 해제
      // const userData = await postSetNickname(userInfo.socialId, nickname);
      // localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/welcome");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div id="nickNameBackround">
      <div className="display_2 ft_white">
        플롯메이커에서 사용할 필명을 입력해 주세요.
      </div>
      <div id="nicknameInputBox">
        <input
          id="nicknameInput"
          value={nickname}
          className="headline_2"
          maxLength={10}
          autoComplete="off"
          onInput={handleInput}
        ></input>
      </div>
      <div id="btnConfirm" className="title_3 ft_white" onClick={handleConfirm}>
        완료
      </div>
    </div>
  );
};

export default NicknamePage;
