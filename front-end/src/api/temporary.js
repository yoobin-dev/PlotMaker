import axios from "axios";
import { API_SERVER } from "./apiSetting";

const prefix = `${API_SERVER}/plot`;

export const downloadPdf = async(promptSeq) => {
  const response = await axios.get(`${prefix}/${promptSeq}/exportPdf`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/pdf"}));
  window.open(url, "_blank");
}