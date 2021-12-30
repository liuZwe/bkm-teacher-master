<template>
  <div class="au_body_shenghe">
    <div class="shenghe_top">
      <div>
        <i :class="iconClass[userState]"></i>
      </div>
      <h3
        :class="
          userState > 0 ? (userState > 1 ? 'h3_lose' : 'h3_await') : 'h3_succee'
        "
      >
        {{ ptitle[userState].title }}
      </h3>
    </div>
    <ul class="user_isnot" v-if="userState == 2">
      <li>很抱歉，您的创作者身份审核未能通过，具体原因如下:</li>
      <li>1. 资质认证资料不够详细，无法确认您的具体信息;</li>
      <li>2. 资料内容模糊，阅读困难，需提交更高清晰度的材料;</li>
      <li class="list_a">
        <!-- 重新提交注册信息回到第几部 -->
        <router-link to="/zhuce/zcbz2"> 重新提交注册信息</router-link>
      </li>
    </ul>
    <p class="shenghe_bot">{{ ptitle[userState].content }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ptitle: [
        {
          title: "提交成功！24小时内将完成审核",
          content:
            "审核结果将通过短信通知您，同时您也可以通过备考猫APP系统消息通知获知审核结果。扫描以下二维码添加备考猫创作顾问微信，获取进一步支持。",
        },
        {
          title: "账号审核中···",
          content:
            "审核结果将通过短信通知您，同时您也可以通过备考猫APP系统消息通知获知审核结果。扫描以下二维码添加备考猫创作顾问微信，获取进一步支持。",
        },
        {
          title: "审核未通过",
          content: "",
        },
      ],
      iconClass: [
        "el-icon-circle-check",
        "el-icon-time",
        "el-icon-circle-close",
      ],
    };
  },
  created() {},
  props: ["userState"],
};
</script>
<style scoped lang="scss">
.au_body_shenghe {
  width: 624px;
  margin: 0px auto;
  padding-bottom: 32px;
  .shenghe_top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 60px;
    box-sizing: border-box;
    > div {
      width: 60px;
      height: 60px;
      color: white;
      margin-right: 30px;
      i {
        width: 100%;
        height: 100%;
        font-size: 60px;
        text-align: center;
        line-height: 60px;
      }
    }
    .el-icon-circle-check {
      color: #40da97;
    }
    .el-icon-time {
      color: #008df0;
    }
    .el-icon-circle-close {
      color: #ff432b;
    }

    h3 {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #40da97;
    }
    .h3_succee {
      color: #40da97;
    }
    .h3_await {
      color: #008df0;
    }
    .h3_lose {
      color: #ff432b;
    }
  }
  .user_isnot {
    width: 400px;
    list-style: none;
    margin: 0 auto;
    font-family: PingFang SC;
    line-height: 35px;
    color: #000000;
    text-align: left;
    margin-top: 32px;
    .list_a {
      width: 100%;
      height: 25px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 35px;
      text-decoration: underline;
      text-align: center;
      margin-top: 32px;
      > a {
        color: #3c52e0;
      }
    }
  }
  .shenghe_bot {
    width: 100%;
    font-size: 16px;
    text-align: center;
    font-family: PingFang SC;
    line-height: 35px;
    color: #9597a1;
    margin-top: 20px;
  }
}
</style>