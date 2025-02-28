import { useRef, useState } from "react";

import { postSetNickname } from "../api/user";

import "../styles/common.css";
import "../styles/NicknamePage.css";
import { useNavigate } from "react-router-dom";
import { length } from "../../node_modules/stylis/src/Tokenizer";

const NicknamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleInput = (e) => {
    const length = e.target.value.length;
    if (length < 11) {
      setNickname(e.target.value);
    }
  };

  const handleConfirm = async () => {
    if (!nickname.trim()) {
      alert("필명을 입력해주세요.");
      return;
    }

    const response = await postSetNickname(userInfo.socialId, nickname);
    if(response.success){
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/welcome");
    } else {
      // 수정사항: 중복닉네임 모달 
      console.log('err:', response.response.data.message);
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
          className="display_2"
          maxLength={10}
          autoComplete="off"
          onChange={handleInput}
          placeholder="최대 10자"
        ></input>
      </div>
      <div id="btnConfirm" className="title_3 ft_white" onClick={handleConfirm}>
        완료
      </div>
    </div>
  );
};

export default NicknamePage;
