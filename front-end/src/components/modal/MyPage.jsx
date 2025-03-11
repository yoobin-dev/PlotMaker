import "../../styles/modal/MyPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLeave, postLeavePw } from "../../api/user";

export default function MyPage({ myPageOn, setMyPageOn }) {
  const [step, setStep] = useState("default");
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handleClose = () => {
    setMyPageOn(false);
    setStep("default");
  };

  return (
    <div id="myPageBackground" className={`${myPageOn ? "" : "d-none"}`}>
      <div id="myPageModal">
        <div className="header">
          <img src="close.png" onClick={handleClose}></img>
        </div>
        {step === "default" ? (
          <DefaultMyPage setStep={setStep} userInfo={userInfo}></DefaultMyPage>
        ) : step === "logout" ? (
          <LogoutPage setStep={setStep} navigate={navigate}></LogoutPage>
        ) : step === "withdraw" ? (
          <WithdrawPage setStep={setStep} navigate={navigate}></WithdrawPage>
        ) : step === "download" ? (
          <WithdrawDownloadPage
            setStep={setStep}
            navigate={navigate}
            userInfo={userInfo}
          ></WithdrawDownloadPage>
        ) : (
          <WithdrawCompletePage navigate={navigate}></WithdrawCompletePage>
        )}
      </div>
    </div>
  );
}

function DefaultMyPage({ setStep, userInfo }) {
  return (
    <div id="defaultMyPage">
      <div className="body">
        <img src="profile_default.png" />
        <span className="heading_2 ft_white">
          {userInfo?.nickname ? userInfo.nickname : "무명 작가"}
        </span>
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
    sessionStorage.setItem("userInfo", null);
    navigate("/", {replace: true});
  }

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
          onClick={() => setStep("download")}
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

function WithdrawDownloadPage({ setStep, navigate, userInfo }) {
  const [userPw, setUserPw] = useState('');
  
  const handleCheckPw = async () => {
    const result = await postLeavePw(userInfo?.socialId, userPw);
    if(result.success){
      const leave = await postLeave(userInfo?.socialId);
      if(leave.success){
        setStep("complete");
      } else {
        alert('회원탈퇴 실패: 관리자에게 문의하세요.');
      }
    } else {
      alert(result.message);
    }
  }

  return (
    <div id="downloadMyPage">
      <div className="body body_1 ft_gray_e">
        <div>
          <span className="title_2">{userInfo.nickname}</span>
          <span className=""> 작가님은</span>
        </div>
        <div>
          <span className="body_1">
            대단한 작품들을 작품을 플롯메이커와 만들었어요.
          </span>
          <br />
          <span className="body_1">
            떠나시기 전에 플롯메이커와의 추억을 보관해주세요.
          </span>
        </div>
        <div
          className="downloadButton body_2"
          onClick={() => alert("서비스 준비중입니다.")}
        >
          작성한 모든 작품 파일로 내보내기
        </div>
        <div className="password">
          <span className="headline_2 ft_white">
            탈퇴를 위해 비밀번호를 입력해주세요.
          </span>
          <input
            type="password"
            name="userPw"
            className="loginInput label_2 ft_gray_6"
            placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>
      </div>
      <div className="footer">
        <div
          className="button red headline_2 ft_white"
          onClick={handleCheckPw}
        >
          탈퇴하기
        </div>
      </div>
    </div>
  );
}
function WithdrawCompletePage({ navigate }) {
  useEffect(() => {
    setTimeout(() => {
      sessionStorage.removeItem("userInfo");
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div id="withdrawCompleteMyPage">
      <div className="body main_1 ft_gray_e">탈퇴가 완료되었습니다.</div>
      <div className="footer body_1 ft_gray_e">언제든 다시 찾아주세요!</div>
    </div>
  );
}
