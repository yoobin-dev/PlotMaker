import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}`;

// 플롯 만들기
export const makePlot = async (promptObj) => {
  try {
    const res = await axios.post(`${prefix}/plot/make`, promptObj);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
// 플롯 저장하기
export const savePlot = async (socialId, promptObj) => {
  try {
    const res = await axios.post(`${prefix}/plot/${socialId}/save`, promptObj);

    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 플롯 가져오기
export const getPlotList = async (
  socialId,
  isPublic,
  sortBy = "createAt",
  sortOrder = "desc"
) => {
  let url = `${prefix}/plot/${socialId}?sortBy=${sortBy}&sortOrder=${sortOrder}`;

  if (isPublic !== "All") {
    url += `&isPublic=${isPublic}`;
  }

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

// 플롯 검색
export const searchPlotList = async (socialId, title) => {
  let url = `${prefix}/plot/${socialId}/search`;
  try {
    const res = await axios.get(url, { params: { title: title } });
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 프롬프트 코드 가져오기
export const getPromptCode = async () => {
  try {
    const response = await axios.get(`${prefix}/code`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("프롬프트 코드 불러오기 실패 : ", error);
    throw error;
  }
};

// 공개 비공개 설정
export const updatePlotPublic = async (promptSeq, isPublic) => {
  try {
    const res = await axios.post(`${prefix}/prompt/${promptSeq}/status`, {
      isPublic,
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

// 제목 설정
export const updatePlotTitle = async (promptSeq, title) => {
  try {
    const res = await axios.post(`${prefix}/prompt/${promptSeq}/title`, {
      title,
    });
    console.log(res.data.data);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
// 플롯 삭제
export const deletePlot = async (promptSeq) => {
  try {
    const res = await axios.post(`${prefix}/prompt/${promptSeq}/delete`);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("시스템 오류가 발생했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
