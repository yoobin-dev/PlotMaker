import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}/api/plot`;

// 플롯 가져오기
export const getPlotList = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    if (res.status === 200) {
      return res.data;
    } else {
      alert("플롯 조회에 실패했습니다.");
    }
  } catch (e) {
    console.error(e);
  }
};

export const getPromptCode = async (socialId) => {
  try {
    const response = await axios.get(`${prefix}`, { socialId });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("네이버 로그인 실패: ", error);
    throw error;
  }
};
