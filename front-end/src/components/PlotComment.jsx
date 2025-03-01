import { useState } from "react";
import "../styles/plotComment.css";
function PlotComment() {
  const [comment, setComment] = useState("");

  const handleComment = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  return (
    <div id="plotDetailComment">
      <div id="commentTitle" className="headline_2 ft_gray_2">
        작성한 코멘트 <span id="commentCount">2</span>개
      </div>
      <div id="commentList">
        <PlotCommentBox></PlotCommentBox>
        <PlotCommentBox></PlotCommentBox>
      </div>
      <div id="commmentLength" className="label_1 ft_gray_94">
        {comment.length}/1000자
      </div>
      <textarea
        id="commentTextArea"
        value={comment}
        className="body_1 ft_gray_4"
        onChange={handleComment}
      ></textarea>
      <div id="commentButton" className="headline_2">
        <button>등록하기</button>
      </div>
    </div>
  );
}

function PlotCommentBox() {
  return (
    <div className="plotCommentBox">
      <div className="commentBody body_1 ft_gray_4">
        생각보다 너무 답답하네, 수정하자
      </div>
      <div className="commentfooter">
        <div className="commentDate body_2 ft_gray_94">2024.12.24</div>
        <div className="commentDelete bg_gray_a">
          <img src="/close.png" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

export default PlotComment;
