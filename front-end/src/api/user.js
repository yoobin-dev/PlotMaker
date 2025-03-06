import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}/user`;

export const postSetNickname = async (socialId, nickname) => {
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


export const getEmailCheck = async (email) => {
  try {
    const response = await axios.get(`${prefix}/email/check`, {
      params: { email },
    });
    return response.data;
  } catch(error) {
    return error;
  }
};

export const postAddUser = async (form) => {
  const response = await axios.post(`${prefix}`, form);
  return response.data;
}
