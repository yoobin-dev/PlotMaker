import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import NaverLoginButton from "../components/NaverLoginButton";
import GuestModal from "../components/GuestModal";

import "../styles/loginPage.css";
import "../styles/common.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  return (
    <>
      <div className="" id="loginBackground">
        <GuestModal
          isOpen={isGuestModalOpen}
          onClose={() => setIsGuestModalOpen(false)}
          onConfirm={() => {
            setIsGuestModalOpen(false);
            console.log("비회원이용");
            navigate("/prompt");
          }}
        />
        <div id="loginTop">
          <div id="title" className="ft_white">
            <div className="main_1">이야기가 필요한 순간,</div>
            <div className="main_2">
              <span>당신을 위한 보조작가</span>
              <span className="main_3" style={{ color: "#17E991" }}>
                {" "}
                플롯 메이커
              </span>
            </div>
          </div>

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
      </div>
    </>
  );
};

export default LoginPage;
