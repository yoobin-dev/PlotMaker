import "../../styles/modal/needLoginModal.css";
import LoginButton from "../LoginButton";
import NaverLoginButton from "../NaverLoginButton";
// needLogin={needLogin}
//         setNeedLogin={setNeedLogin}
//         isLoginModalOpen={isLoginModalOpen}
//         setIsLoginModalOpen={setIsLoginModalOpen}
//         onClose={() => setNeedLogin(false)}
function NeedLoginModal({
  needLogin,
  setNeedLogin,
  isLoginModalOpen,
  setIsLoginModalOpen,
  onClose,
}) {
  return (
    <>
      <div
        id="needLoginModalBackground"
        className={`ft_white ${needLogin ? "" : "d-none"}`}
      >
        <div id="needLoginModal">
          <div className="header">
            <span className="title_1">로그인이 필요해요!</span>
            <span className="body_1">
              비회원으로 이용 시 해당 기능을 사용할 수 없습니다.
            </span>
          </div>
          <div className="body">
            <LoginButton
              title="이메일로 이용하기"
              onClick={() => {
                setIsLoginModalOpen(true);
                setNeedLogin(false);
              }}
            ></LoginButton>
            <NaverLoginButton></NaverLoginButton>
          </div>
          <div className="footer label_1">
            <span onClick={onClose}>취소하기</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NeedLoginModal;
