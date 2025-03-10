import "../../styles/modal/MyPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MyPage() {
  const [step, setStep] = useState("default");
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  return (
    <div id="myPageBackground">
      <div id="myPageModal">
        <div className="header">
          <img src="close.png"></img>
        </div>
        {step === "default" ? (
          <DefaultMyPage setStep={setStep} userInfo={userInfo}></DefaultMyPage>
        ) : step === "logout" ? (
          <LogoutPage setStep={setStep} navigate={navigate}></LogoutPage>
        ) : (
          <WithdrawPage setStep={setStep} navigate={navigate}></WithdrawPage>
        )}
      </div>
    </div>
  );
}

function DefaultMyPage({ setStep, userInfo }) {
  return (
    <div id="defaultMyPage">
      <div className="body">
        <img src="https://png.pngtree.com/png-clipart/20220112/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4154232.png" />
        <span className="heading_2 ft_white">{userInfo.nickname}</span>
        <span className="body_2 ft_white">Lv.1 플롯 메이커</span>
      </div>
      <div className="footer">
        <div
          className="button black headline_2 ft_white"
          onClick={() => setStep("logout")}
        >
          로그아웃
        </div>
        <div className="label_2 ft_gray_a" onClick={() => setStep("withdraw")}>
          회원 탈퇴하기
        </div>
      </div>
    </div>
  );
}

function LogoutPage({ setStep, navigate }) {
  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div id="logoutMyPage">
      <div className="body">
        <span className="title_2 ft_gray_e">로그아웃하시겠습니까?</span>
        <span className="body_1 ft_gray_e">
          저장하지 않은 작업이 취소될 수 있습니다.
        </span>
      </div>
      <div className="footer">
        <div
          className="button black headline_2 ft_white"
          onClick={handleLogout}
        >
          로그아웃
        </div>
        <div
          className="button white heading_2 ft_gray_1"
          onClick={() => setStep("default")}
        >
          취소하기
        </div>
      </div>
    </div>
  );
}

function WithdrawPage({ setStep, navigate }) {
  const handleWithdraw = () => {
    sessionStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div id="withdrawMyPage">
      <div className="body">
        <span className="title_2 ft_gray_e">
          플롯메이커에서 탈퇴하시겠습니까?
        </span>
        <span className="body_1 ft_gray_e">
          지금까지 작성한 모든 작품이 삭제되고, 복구할 수 없습니다.
        </span>
      </div>
      <div className="footer">
        <div
          className="button red headline_2 ft_white"
          onClick={handleWithdraw}
        >
          네. 탈퇴하겠습니다.
        </div>
        <div
          className="button white heading_2 ft_gray_1"
          onClick={() => setStep("default")}
        >
          취소하기
        </div>
      </div>
    </div>
  );
}
