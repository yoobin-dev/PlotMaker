import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}`;

// 플롯 가져오기
export const getPlotList = async (socialId, isPublic) => {
  let url = `${prefix}/plot/${socialId}`;
  if (isPublic !== "All") {
    url += `?isPublic=${isPublic}`;
  }
  console.log(url);
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("플롯 조회에 실패했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

// 프롬프트 코드 가져오기
export const getPromptCode = async (socialId) => {
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
export const updatePlotPublic = async (promptSeq) => {
  try {
    const res = await axios.post(`${prefix}/prompt/${promptSeq}/status`);
    console.log(res);
    if (res.status === 200) {
      return res.data.data;
    } else {
      alert("플롯 조회에 실패했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};
