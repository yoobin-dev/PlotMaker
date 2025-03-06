import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NaverLoginButton from "../components/NaverLoginButton";
import LoginButton from "../components/LoginButton";
import GuestModal from "../components/modal/GuestModal";

import "../styles/loginPage.css";
import "../styles/common.css";
import LoginModal from "../components/modal/LoginModal";
import { plotmakerLogin } from "../api/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = async (id, pw) => {
    try {
      const result = await plotmakerLogin(id, pw);
      const userData = result.data;
      sessionStorage.setItem("userInfo", JSON.stringify(userData));
      if (userData.nickname == null) {
        navigate("/login/nickname");
      } else {
        navigate("/prompt");
      }
    } catch (error) {
      // 수정사항: 에러처리 해줄 것
      console.log("err!: ", error);
    }
  };

  return (
    <>
      <div className="" id="loginBackground">
        <GuestModal
          isOpen={isGuestModalOpen}
          onClose={() => setIsGuestModalOpen(false)}
          onConfirm={() => {
            setIsGuestModalOpen(false);
            navigate("/prompt");
          }}
        />
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        <div id="loginTop">
          <div id="title" className="ft_white">
            <div className="main_1">이야기가 필요한 순간,</div>
            <div className="main_2">
              <span>당신을 위한 보조작가</span>
              <span className="main_3" style={{ color: "#FC3A89" }}>
                플롯 메이커
              </span>
            </div>
          </div>

          <LoginButton
            onClick={() => setIsLoginModalOpen(true)}
            title={"이메일로 이용하기"}
          />
          <NaverLoginButton />

          <div
            id="guest"
            className="label_1 ft_gray_9"
            onClick={() => setIsGuestModalOpen(true)}
          >
            비회원으로 이용하기
          </div>
        </div>
        <div id="clova">
          <img src="/logo_clova.png" />
        </div>
        <img id="login_1" src="/login_1.png"></img>
        <img id="login_2" src="/login_2.png"></img>
        <img id="login_3" src="/login_3.png"></img>
        <img id="login_4" src="/login_4.png"></img>
        <img id="login_5" src="/login_5.png"></img>
      </div>
    </>
  );
};

export default LoginPage;
