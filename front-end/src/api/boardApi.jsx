import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}`;

// 전체 글 가져오기
export const getTotalList = async (categoryCode, page) => {
  let url = `${prefix}/board?categoryCode=${categoryCode}&page=${page}`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 전체 글 제목 검색
export const getSearchTotalList = async (categoryCode, page) => {
  let url = `${prefix}/board?categoryCode=${categoryCode}&page=${page}`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 베스트 가져오기
export const getBestList = async (categoryCode, criteria) => {
  let url = `${prefix}/board/best?categoryCode=${categoryCode}&criteria=${criteria}`;
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

// promptSeq로 가져오기
export const getPrompt = async (socialId, promptSeq) => {
  let url = `${prefix}/board/${promptSeq}?socialId=${socialId}`;
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

// 좋아요 토글
export const toggleLike = async (socialId, promptSeq) => {
  try {
    const res = await axios.post(`${prefix}/board/likes/toggle`, {
      socialId,
      promptSeq,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 조회수 증가
export const addBoardView = async (promptSeq) => {
  console.log(promptSeq);
  try {
    const res = await axios.post(`${prefix}/board/view`, { promptSeq });
    if (res.status === 200) {
      return res.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
