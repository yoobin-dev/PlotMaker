import "../../styles/modal/duplicateModal.css";

function DuplicateModal({ isDupl, setIsDupl }) {
  return (
    <div id="modal" className={`${isDupl ? "" : "d-none"}`}>
      <div id="alert">
        <div className="title_2 ft_gray_2">중복된 필명입니다.</div>
        <div className="body_1 ft_gray_9">
          필명은 중복으로 사용할 수 없습니다.
        </div>
      </div>
      <div id="buttons">
        <button onClick={() => setIsDupl(false)}>이전</button>
      </div>
    </div>
  );
}

export default DuplicateModal;
