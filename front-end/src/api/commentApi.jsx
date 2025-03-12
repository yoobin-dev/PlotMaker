import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}`;

// 코멘트 가져오기
export const getCommentList = async (promptSeq) => {
  let url = `${prefix}/comment/${promptSeq}`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 코멘트 등록하기
export const saveComment = async (promptSeq, commentContent) => {
  try {
    const res = await axios.post(`${prefix}/comment/${promptSeq}`, {
      commentContent,
    });
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 코멘트 삭제
export const deleteComment = async (commentSeq) => {
  try {
    const res = await axios.post(`${prefix}/comment/${commentSeq}/delete`);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
