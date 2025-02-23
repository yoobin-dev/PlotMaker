import "../styles/common.css"

const GuestModal = ({ isOpen, onClose, onConfirm }) => {
  if(!isOpen) return null;

  return (
    <div>
      <div className="title_2 ft_gray_c">
        비회원으로 이용하시겠습니까?
      </div>
      <div className="body_1 ft_gray_c">
        비회원으로 이용 시 일부 기능을 사용할 수 없습니다.
      </div>
      <div>
        <button
          onClick={onConfirm}
        >
          확인
        </button>
        <button
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default GuestModal;