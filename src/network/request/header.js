import $md5 from "js-md5";
export function getHeader(url, code) {
  let timestamp = new Date() * 1;
  // 1. 获取当前用户登录token
  let userStro = JSON.parse(localStorage.getItem("user"));
  if (userStro) {
    let token = userStro.token;
    let source = "web";
    let sign = $md5(source + url + code + timestamp + token);
    return {
      "Content-Type": "application/json; charset=UTF-8",
      token: token,
    };
  } else {
    return {};
  }
}

// sessionStorage.setItem('user_token', '111222');
// console.log(sessionStorage.getItem('user_token'));取
// sessionStorage.removeItem('user_token')删
