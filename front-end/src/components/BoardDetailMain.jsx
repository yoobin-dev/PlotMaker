import "../styles/boardDetailMain.css";
import { useNavigate } from "react-router-dom";

function BoardDetailMain({ plot }) {
  const navigate = useNavigate();
  return (
    <div id="boardDetailMain">
      <div id="boardDetailCard">
        <div id="boardDetailBody">
          <div id="backToList" onClick={() => navigate(-1)}>
            <img src="/arrow_back.png"></img>
          </div>
          <div id="plotDetailTitle" className="title_3">
            {plot.title}
          </div>
          <div id="plotAuthor" className="headline_2">
            {plot.nickname ? "" : "무명 작가"}
          </div>
          <div id="plotDetailContents" className="body_main">
            {plot.plotContent}
          </div>
        </div>
        <div id="boardDetailFooter">
          <div className="headline_2">{plot.genre}</div>
          <div id="extraInfo" className="body_1">
            <div>
              <img src="view.png" />
              <span>{plot.views ? plot.views : 1234}</span>
            </div>
            <div>
              <img src="likes.png" />
              <span>{plot.likes ? plot.likes : 1234}</span>
            </div>
            <div>
              <span>{plot.createAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="toggleLikeButton"
        className={`${plot.isLike === "Y" ? "black" : "white"}`}
      >
        <img src="likes.png"></img>
        <span className={`${plot.isLike === "Y" ? "black" : "white"}`}>{`${
          plot.isLike === "Y" ? "좋아요" : "취소"
        }`}</span>
      </div>
    </div>
  );
}

export default BoardDetailMain;
