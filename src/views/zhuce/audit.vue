<template>
  <div class="div_audit_html">
    <!-- 头部 -->
    <div class="au_header">
      <div class="nr_header_left">
        <div><img src="../../assets/LOGO.svg" /></div>
        <div class="nr_header_left_title">备考猫创作中心</div>
      </div>
    </div>
    <!-- <div style="height: 70px"></div> -->
    <div class="au_body">
      <State :user-state="stateid" />
      <div class="au_bot">
        <img src="../../assets/images/bkmCode.svg" alt="" />
        <h3>备考猫创作者顾问</h3>
        <!-- <p>扫描以下二维码添加备考猫创作顾问微信，获取进一步支持。</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import State from "./components/audit-state.vue";
import { request } from "@/network/request/request";
export default {
  data() {
    return {
      stateid: null, //提交成功0 审核中1 失败2
    };
  },
  created() {
    let longinUser = sessionStorage.getItem("loginUser");
    if (longinUser) {
      let userMessage = JSON.parse(longinUser);
      this.userid = userMessage.id;
      //1. 查询当前用户信息
      request({
        url: "/user/userView",
        data: {
          czz_id: userMessage.id,
        },
      }).then((data) => {
        console.log(data);
        let { jindu, status } = data.data.data;
        //2. 根据token判断用户是否正确
        let token1 = data.data.data.token;
        if (token1 == userMessage.token) {
          //获取跳转时传递的参数
          switch (status) {
            case "0": //待审核
              this.stateid = 1;
              break;
            case "1": //已通过
              this.stateid = 0;
              this.$message.success("您已通过注册，请直接登录！");
              this.$router.push({ name: "index" });
              break;
            case "2": //失败
              this.stateid = 2;
              break;
            default:
              this.$message.error("请填写完整您的个人信息！");
              this.$router.push({ name: "zhuce2" });
              break;
          }
        } else {
          this.$message.error("您的注册信息有误！请先登录");
          this.$router.push({ name: "index" });
        }
      });
    } else {
      this.$message.error("您的注册信息有误！请先登录");
      this.$router.push({ name: "index" });
    }
  },
  components: {
    State,
  },
};
</script>

<style lang="scss" scoped>
.div_audit_html {
  width: 100vw;
  height: 100vh;
  min-width: 1260px;
  background-color: #fafafa;
  .au_header {
    width: 100%;
    min-width: 1260px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0px 6px 15px rgba(211, 211, 211, 0.16);
    position: absolute;
    z-index: 10086;
    .nr_header_left {
      margin-left: 5%;
      display: flex;
      align-items: center;
      .nr_header_left_title {
        margin-left: 10px;
        font-size: 24px;
        font-family: PingFang TC, PingFang TC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #37373b;
      }
    }
  }
  .au_body {
    width: 1240px;
    height: 100vh;
    background: #ffffff;
    border-radius: 0px;
    margin: 0px auto;
    padding: 230px 0px 0px;
    box-sizing: border-box;
  }
  .au_bot {
    width: 500px;
    margin: 0px auto;
    text-align: center;
    > h3 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #9597a1;
      margin-top: 10px;
    }
    > p {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 35px;
      color: #9597a1;
    }
  }
}
</style>
