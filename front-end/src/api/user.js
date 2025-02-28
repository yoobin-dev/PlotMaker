import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}/user`;

export const postSetNickname = async (socialId = "naver", nickname) => {
  try {
    const response = await axios.post(`${prefix}/${socialId}/nickname`, null, {
      params: { nickname },
    });
    return response.data;
    // if (response.data.success) {
    //   return response.data.data;
    // } else {
    //   throw new Error(response.data.message);
    // }
  } catch (error) {
    console.error("닉네임 변경 실패: ", error);
    return error;
  }
};
