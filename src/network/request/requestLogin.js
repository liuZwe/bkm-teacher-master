import axios from "axios";
// 不需要专门处理无需token的请求
export function requestLogin(config) {
  let newVar = axios.create({
    baseURL: "https://bkmcsapi.heyhui.com/teacher/",
    method: "post",
    timeout: 60000,
  });
  return newVar(config);
}
