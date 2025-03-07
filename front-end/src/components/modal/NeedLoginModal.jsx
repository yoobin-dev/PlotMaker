import "../../styles/modal/NeedLoginModal";

function NeedLoginModal() {
  return (
    <>
      <div id="NeedLoginModalBackground">
        <div className="header">
          <span>로그인이 필요해요!</span>
        </div>
        <div className="body"></div>
        <div className="footer"></div>
      </div>
    </>
  );
}

export default NeedLoginModal;
