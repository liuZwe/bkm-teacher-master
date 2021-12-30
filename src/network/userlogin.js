import axios from "axios";
// 未知
export function userlogin() {
  const getUserlogin = axios.create({
    baseURL: "https://bkmcsapi.heyhui.com/teacher/",
    method: "post",
    timeout: 60000,
    headers: getHeader(),
  });
}
