import { useEffect, useState } from "react";
import { getCommentList, saveComment, deleteComment } from "../api/commentApi";
import "../styles/plotComment.css";

function PlotComment(plot) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSave = async () => {
    const newComment = await saveComment(plot.plot.promptSeq, comment);
    setCommentList((prev) => [...prev, newComment]);
    setComment("");
  };

  const handleDelete = async (comment) => {
    const result = await deleteComment(comment.commentSeq);
    // 삭제된 댓글을 제외한 새로운 배열로 상태 업데이트
    setCommentList((prev) =>
      prev.filter((c) => c.commentSeq !== comment.commentSeq)
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCommentList(plot.plot.promptSeq);
      setCommentList(data);
    };

    getData();
  }, []);

  return (
    <div id="plotDetailComment">
      <div id="commentTitle" className="headline_2 ft_gray_2">
        작성한 코멘트 <span id="commentCount">{commentList.length}</span>개
      </div>
      <div id="commentList">
        {commentList.map((comment, i) => (
          <PlotCommentBox
            key={i}
            comment={comment}
            handleDelete={handleDelete}
          />
        ))}
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
        <button onClick={handleSave}>등록하기</button>
      </div>
    </div>
  );
}

function PlotCommentBox({ comment, handleDelete }) {
  return (
    <div className="plotCommentBox">
      <div className="commentBody body_1 ft_gray_4">
        {comment.commentContent}
      </div>
      <div className="commentfooter">
        <div className="commentDate body_2 ft_gray_94">{comment.createAt}</div>
        <div
          className="commentDelete bg_gray_a"
          onClick={() => {
            handleDelete(comment);
          }}
        >
          <img src="/close.png" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

export default PlotComment;
