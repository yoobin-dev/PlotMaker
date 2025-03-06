import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}/login`;

export const naverLogin = async (code, state) => {
  try {
    const response = await axios.post(`${prefix}/naver`, {code, state});
    if(response.data.success){
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch(error){
    console.error("네이버 로그인 실패: ", error);
    throw error;
  }
}

export const plotmakerLogin = async (socialId, userPw) => {
  const response = await axios.post(`${prefix}/pm`, {socialId, userPw});
  console.log('res: ', response.data);
  return response.data;
}