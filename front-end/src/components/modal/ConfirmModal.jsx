import "../../styles/modal/confirmModal.css";
import { useNavigate } from "react-router-dom";

function ConfirmModal({ message, onClick, params }) {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/prompt", { state: params });
  };

  const handleCancel = () => {
    const modal = document.getElementById("confirmModalBackground");
    modal.classList.add("d-none");
  };

  return (
    <div id="confirmModalBackground" className={`d-none`}>
      <div id="confirmModal">
        <div id="message">
          <div className="title_2 ft_gray_2">{message}</div>
        </div>
        <div className="footer">
          <button className="blackBtn" onClick={handleOk}>
            확인
          </button>
          <button className="whiteBtn" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
