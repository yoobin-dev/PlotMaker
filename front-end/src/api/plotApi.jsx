import axios from "axios";

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
