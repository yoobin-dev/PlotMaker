import { useRef, useState } from "react";

import { postSetNickname } from "../api/user";

import "../styles/common.css";
import "../styles/NicknamePage.css"
import { useNavigate } from "react-router-dom";

const NicknamePage = () => {
  const navigate = useNavigate();
  const [ nickname, setNickname ] = useState("");
  const divRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleInput = (e) => {
    setNickname(e.currentTarget.textContent);
  }

  const handleConfirm = async() => {
    if(!nickname.trim()){
      alert('미입력 임시');
      return;
    }

    try {
      const userData = await postSetNickname(userInfo.socialId, nickname);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/welcome");
    } catch(error){
      console.error("error", error);
    }
  }
  
  return (
    <div>
      <div className="display_2">
        플롯메이커에서 사용할 필명을 입력해 주세요.
      </div>
      <div id="nicknameInput"
        contentEditable="true"
        suppressContentEditableWarning={true}
        ref={divRef}
        onInput={handleInput}
      >
      </div>
      <div id="btnConfirm"
        className="title_3 ft_white"
        onClick={handleConfirm}
      >
        완료
      </div>
    </div>
  )
}

export default NicknamePage;