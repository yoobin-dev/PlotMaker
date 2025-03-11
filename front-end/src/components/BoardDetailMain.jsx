import "../styles/boardDetailMain.css";
import { useNavigate } from "react-router-dom";
import { toggleLike } from "../api/boardApi";
import { useEffect, useState } from "react";

function BoardDetailMain({ plot, setPlot, liked, setLiked }) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const handleLikeToggle = () => {
    const toggle = async () => {
      const result = await toggleLike(userInfo.socialId, plot.promptSeq);
      setLiked(result.message === "좋아요 등록");
    };
    toggle();
  };

  return (
    <div id="boardDetailMain">
      <div id="boardDetailCard">
        <div id="boardDetailBody" className="no_scroll">
          <div id="backToList" onClick={() => navigate(-1)}>
            <img src="/arrow_back.png"></img>
          </div>
          <div id="plotDetailTitle" className="title_3">
            {plot.title}
          </div>
          <div id="plotAuthor" className="headline_2">
            {plot.nickname}
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
              <span>{plot.view}</span>
            </div>
            <div>
              <img src="likes.png" />
              <span>{plot.likes}</span>
            </div>
            <div>
              <span>{plot.createAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="toggleLikeButton"
        className={`${liked ? "black" : "white"}`}
        onClick={handleLikeToggle}
      >
        <img src="likes.png"></img>
        <span className={`${liked ? "black" : "white"}`}>{`${
          liked ? "좋아요" : "취소"
        }`}</span>
      </div>
    </div>
  );
}

export default BoardDetailMain;
