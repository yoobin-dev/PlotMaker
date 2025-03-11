import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}`;

// 전체 글 가져오기
export const getTotalList = async (
  categoryCode,
  page,
  socialId,
  sortBy = "createAt",
  sortOrder = "desc"
) => {
  let url = `${prefix}/board?categoryCode=${categoryCode}&page=${page}&socialId=${socialId}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  // /api/board?categoryCode=카테고리코드&page=페이지&socialId=소셜아이디&sortBy=정렬기준&sortOrder=정렬순서
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
export const getSearchTotalList = async (
  socialId,
  categoryCode,
  page = "1",
  title
) => {
  let url = `${prefix}/board/search?socialId=${socialId}&categoryCode=${categoryCode}&page=${page}&title=${title}`;
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
