import axios from "axios";
// 正常的请求方式
import { getHeader } from "./header";
export function request(config) {
  let newVar = axios.create({
    baseURL: "https://bkmcsapi.heyhui.com/teacher/",
    method: "post",
    timeout: 60000,
    headers: getHeader(),
  });
  return newVar(config);
}
