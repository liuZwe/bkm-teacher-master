<template>
  <div class="template">
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header :data="tabledata">
        <div class="header_title">
          <img src="../assets/LOGO.svg" style="margin-right: 10px" />
          备考猫创作中心
        </div>
        <!-- 右侧用户信息 -->
        <div class="yhm">
          <!-- 消息显隐切换 xx-->
          <div class="yhm_message" @click.stop="xiaoxi()">
            <img v-if="xx" src="../assets/images/homeImgs/inform2.svg" />
            <img v-else src="../assets/images/homeImgs/inform1.svg" />
            <img
              src="../assets/images/homeImgs/informRed.svg"
              class="yhm_message_red"
              v-show="xiao"
            />
          </div>
          <!-- 昵称 -->
          <div
            class="yhm_title"
            @mouseenter="userEnter"
            @mouseleave="userLeave"
          >
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom" v-show="userisQuit"></i>
            <i class="el-icon-caret-top" v-show="!userisQuit"></i>
            <!-- quit系统 -->
            <div class="yhm_userlist" v-show="userisQuit">
              <div class="yhm_userlist_li">
                <span
                  ><router-link :to="{ name: 'jcxx' }"
                    >基础信息</router-link
                  ></span
                >
              </div>
              <div class="yhm_userlist_li" @click="isquit">
                <span>退出登录</span>
              </div>
            </div>
          </div>
          <!-- 头像  -->
          <div class="yhm_userHeader">
            <img v-lazy="himg" class="yhm_userHeader_img" />
          </div>
          <!-- 消息通知内容页面 -->
          <div v-if="xx" class="xiaoxi" @click.stop="xx = true">
            <div class="xiaoxibox">
              <!-- 头部消息类型 -->
              <div class="xiaoxi_header">
                <button
                  class="button active1"
                  v-for="(val, inde) in list"
                  :key="inde"
                >
                  {{ val }}
                </button>
              </div>
              <!-- 消息列表显示 -->
              <Messages :messageArr="userMessages"></Messages>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 内容区外层容器 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside>
          <!-- :collapse="true" -->
          <el-menu
            :default-openeds="['1', '2', '3', '5', '6']"
            default-active="2"
            class="el-menu-vertical-demo"
            active-background-color="#F5F5FA"
            text-color="#606072"
            active-text-color="#F66246"
            :unique-opened="true"
          >
            <el-button class="but_cztg" @click="pushPage('/cztg')">
              <i class="iconfont">&#xe61a;</i>
              创作投稿
            </el-button>
            <el-menu-item
              index="1"
              @click="pushPage('/shouye')"
              style="padding-left: 30px !important"
              :class="nowRouter == '/shouye' ? 'lishou nowPath' : 'lishou'"
            >
              <!-- 切换logo sy -->
              <svg
                class="icon"
                aria-hidden="true"
                style="width: 15px; height: 15px"
                v-if="sy"
              >
                <use xlink:href="#icon-a-zu-1"></use>
              </svg>
              <svg
                class="icon"
                aria-hidden="true"
                style="width: 15px; height: 15px"
                v-else
              >
                <use xlink:href="#icon-a-zu335"></use>
              </svg>
              <span
                slot="title"
                style="
                  margin-left: 20px;
                  font-family: PingFang SC, PingFang SC-Medium;
                "
                >首页</span
              >
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="width: 15px; height: 15px"
                >
                  <use xlink:href="#icon-a-zu336"></use>
                </svg>
                <span
                  style="
                    margin-left: 20px;
                    font-family: PingFang SC, PingFang SC-Medium;
                  "
                  >创作管理</span
                >
              </template>
              <el-menu-item
                index="2-1"
                @click="pushPage('/drafts')"
                :class="nowRouter == '/drafts' ? 'nowPath' : ''"
                >草稿箱</el-menu-item
              >
              <el-menu-item
                index="2-2"
                @click="pushPage('/spkgl')"
                :class="nowRouter == '/spkgl' ? 'nowPath' : ''"
                >视频课管理</el-menu-item
              >
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="width: 15px; height: 15px"
                >
                  <use xlink:href="#icon-a-zu337"></use>
                </svg>
                <span
                  style="
                    margin-left: 20px;
                    font-family: PingFang SC, PingFang SC-Medium;
                  "
                  >互动管理</span
                >
              </template>
              <el-menu-item
                index="3-1"
                @click="pushPage('/kcpj')"
                :class="nowRouter == '/kcpj' ? 'nowPath' : ''"
              >
                课程评价
                <el-badge class="mark" :value="pingjia" />
              </el-menu-item>
              <!-- <el-menu-item
                index="3-2"
                @click="kcplhf()"
                :class="nowRouter == '/kcplhf' ? 'nowPath' : ''"
              >
                课程评论/回复
                <el-badge class="mark" :value="pinglun" />
              </el-menu-item> -->
            </el-submenu>
            <!-- <el-submenu index="4">
              <template slot="title">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="width: 15px; height: 15px"
                >
                  <use xlink:href="#icon-a-lujing342"></use>
                </svg>
                <span style="margin-left: 10px">服务管理</span>
              </template>
              <el-menu-item index="4-1" @click="zygl()">作业管理</el-menu-item>
            </el-submenu> -->
            <el-submenu index="5">
              <template slot="title">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="width: 15px; height: 15px"
                >
                  <use xlink:href="#icon-a-zu338"></use>
                </svg>
                <span
                  style="
                    margin-left: 20px;
                    font-family: PingFang SC, PingFang SC-Medium;
                  "
                  >数据中心</span
                >
              </template>
              <el-menu-item
                index="5-1"
                @click="pushPage('/fsgl')"
                :class="nowRouter == '/fsgl' ? 'nowPath' : ''"
                >粉丝管理</el-menu-item
              >
              <el-menu-item
                index="5-2"
                @click="pushPage('/kcsjtj')"
                :class="nowRouter == '/kcsjtj' ? 'nowPath' : ''"
                >课程数据统计</el-menu-item
              >
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="width: 15px; height: 15px"
                >
                  <use xlink:href="#icon-a-shezhi1"></use>
                </svg>
                <span
                  style="
                    margin-left: 20px;
                    font-family: PingFang SC, PingFang SC-Medium;
                  "
                  >账号管理</span
                >
              </template>
              <el-menu-item
                index="6-1"
                @click="pushPage('/jcxx')"
                :class="nowRouter == '/jcxx' ? 'nowPath' : ''"
                >基础信息</el-menu-item
              >
              <el-menu-item
                index="6-2"
                @click="pushPage('/czsy')"
                :class="nowRouter == '/czsy' ? 'nowPath' : ''"
                >创作收益</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 路由展示区 -->
        <el-main>
          <div class="nr">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import iconfont from "../icon/iconfont";
import { request } from "../network/request/request";
import Messages from "../components/homecoms/messages";
export default {
  data() {
    return {
      sy: false,
      nowRouter: "/shouye",
      pingjia: "", //新消息-评价数量显示
      pinglun: "",
      tabledata: [],
      tableData: [],
      sh: 1,
      type: 0,
      sh_count: "",
      tx_count: 0,
      xt_count: 0,
      xx: false, //消息栏展示与隐藏
      xiao: false, //是否有最新消息
      name: "",
      himg: "",
      list: ["审核通知"], // "提现通知", "系统通知"
      userMessages: null, //消息通知数组
      userisQuit: false, //右上角退出系统
    };
  },
  // 1. 导航栏优化与token验证
  created() {
    if (this.$route.fullPath != "/shouye") this.sy = true;
    else this.sy = false;
    let nowPathStr = {
      path: this.$route.fullPath,
      sy: this.sy,
    };
    this.nowRouter = nowPathStr.path;
    this.sy = nowPathStr.sy;
    sessionStorage.setItem("nowPath", JSON.stringify(nowPathStr));
    // 获取用户登录信息
    this.user();
    request({
      url: "index/ping_num",
      data: {
        czz_id: JSON.parse(localStorage.getItem("user")).id,
      },
    }).then((res) => {
      if (res.data.st == 500) {
        this.$message.warning("登录已过期，请重新登录");
        this.$router.push({ path: "/index" });
      }
      if (res.data.num == 0) {
        res.data.num = "";
      }
      this.pingjia = res.data.num;
    });
  },
  mounted() {
    this.shenhe();
    document.addEventListener("click", () => {
      if (this.xx) this.xx = false;
    });
  },
  methods: {
    //头像移入移出
    userEnter() {
      this.userisQuit = true;
    },
    userLeave() {
      this.userisQuit = false;
    },
    isquit() {
      //清除缓存退出登录
      localStorage.removeItem("user");
      sessionStorage.removeItem("nowPath");
      this.$router.push("/index");
    },
    //2. 获取用户登录信息
    user(types) {
      request({
        url: "index/indexPage",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: types,
        },
      }).then((res) => {
        // console.log(res);
        this.tabledata = res.data.user;
        this.name = res.data.user.nickname;
        this.himg = res.data.user.himg;
      });
    },
    // 3. 消息栏打开关闭-图标切换
    xiaoxi() {
      this.xx = !this.xx;
      if (this.xx) this.shenhe(11);
    },
    // 4. 获取消息通知- types=11表示用户已查看消息
    shenhe(types) {
      request({
        url: "index/getMsg",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: types,
        },
      }).then((res) => {
        // console.log("请求数据--", res);
        let { isread, data } = res.data;
        // 查看是否有最新消息
        if (isread > 0) this.xiao = true;
        else this.xiao = false;
        // console.log(this.xiao);
        // 接受消息
        this.userMessages = data;
      });
    },
    //5. 页面跳转
    pushPage(url) {
      this.$router.push({ path: url });
    },
    // 已废弃方法
    tixian() {
      request({
        url: "index/getMsg",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: 1,
        },
      }).then((res) => {
        this.tx_count = res.data.tx_count;
        this.xt_count = res.data.xt_count;
        if (this.tx_count == 0) {
          this.tx_count = "";
        }
        if (this.xt_count == 0) {
          this.xt_count = "";
        }
        this.type = res.data.type;
        this.tableData1 = res.data.data;
        // console.log("-------------------------------");
        // console.log(this.tableData);
        // console.log("-------------------------------");
      });
    },
    xitong() {
      request({
        url: "index/getMsg",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: 2,
        },
      }).then((res) => {
        this.tx_count = res.data.tx_count;
        this.xt_count = res.data.xt_count;
        if (this.tx_count == 0) {
          this.tx_count = "";
        }
        if (this.xt_count == 0) {
          this.xt_count = "";
        }
        this.type = res.data.type;
        this.tableData2 = res.data.data;
        // console.log("-------------------------------");
        // console.log(this.tableData);
        // console.log("-------------------------------");
      });
    },
  },
  components: {
    Messages,
  },
  //5.导航栏样式切换
  beforeRouteUpdate(to, from, next) {
    // console.log(to, from);
    this.nowRouter = to.path;
    if (to.path != "/shouye") this.sy = true;
    else this.sy = false;
    let nowPathStr = JSON.stringify({
      path: to.path,
      sy: this.sy,
    });
    this.shenhe();
    sessionStorage.setItem("nowPath", nowPathStr);
    next();
  },
};
</script>

<style>
@import "../assets/css/icon.css";
.el-header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  /*min-width: 1920px!important;*/
}
.but_cztg {
  width: 75% !important;
  margin: 10% !important;
  background-color: #ff6246 !important;
  color: #ffffff !important;
  border: none !important;
}
.header_title {
  font-size: 24px;
  color: #37373b;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-family: PingFang SC, PingFang SC-Medium;
}
.yhm {
  display: flex;
  align-items: center;
  font-family: PingFang SC;
}
.yhm_message {
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.yhm_message_red {
  width: 8px;
  height: 8px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.yhm_title {
  height: 60px;
  color: #9e9ea6;
  font-size: 16px;
  margin: 0px 10px;
  text-align: center;
  line-height: 60px;
  user-select: none;
  cursor: pointer;
  position: relative;
}
.yhm_title > span {
  margin-right: 3px;
}
.yhm_userlist {
  width: 154px;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  top: 80%;
  right: 0px;
  background-color: #ffffff;
  z-index: 10086;
  padding: 8px 0px;
}
.yhm_userlist_li {
  width: 100%;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  user-select: none;
  padding: 0px 10px;
  box-sizing: border-box;

  color: #333333;
}
.yhm_userlist_li a {
  text-decoration: none;
  color: #333333;
}
.yhm_userlist_li:hover {
  background: #f6f7f8;
}
.el-aside {
  padding-top: 20px;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 11% !important;
  background-color: #ffffff;
  min-width: 280px !important;
}
.el-menu-item {
  padding-left: 65px !important;
  font-family: PingFang SC-Regular !important;
  color: rgb(96, 96, 114) !important;
}
.el-submenu__title {
  padding-left: 30px !important;
}
.el-submenu__icon-arrow {
  right: 40px !important;
}
/*.el-submenu .el-menu .el-menu-item{*/
/*    display: flex;*/
/*    align-items: center;*/
/*    justify-content: left;*/
/*}*/
.el-main {
  background-color: #fafafa;
  padding: 10px;
  position: absolute;
  left: 280px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  /*min-width:1640px!important;*/
}
.nr {
  background-color: #f9f9fc;
  width: 100%;
  height: 100%;
}
.mark .el-badge__content {
  margin-bottom: 5px;
}
.xiaoxi {
  position: absolute;
  z-index: 9999;
  top: 100%;
  right: 2%;
  width: 404px;
  height: 70vh;
  min-height: 435px;
  overflow: auto;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
}
.xiaoxibox {
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 0.7rem;
  font-family: "\5FAE\8F6F\96C5\9ED1", Helvetica, "黑体", Arial, Tahoma;
  height: 100%;
}
/*滚动条样式*/
.xiaoxibox::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.xiaoxibox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.xiaoxibox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.xiaoxi_header {
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: space-around;
}
.xiaoxi_header button {
  background-color: #f7f7f7;
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  color: #999999;
  cursor: pointer;
}
.xiaoxi_header button:hover,
.xiaoxi_header button:focus,
.xiaoxi_header button:active {
  color: #333333 !important;
  background-color: transparent !important;
}

@media screen and (max-width: 1280px) {
  .el-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-width: 1280px !important;
  }
  .el-aside {
    padding-top: 20px;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    width: 200px !important;
    background-color: #ffffff;
    min-width: 200px !important;
  }
  .el-main {
    background-color: #fafafa;
    padding: 10px;
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    min-width: 1080px !important;
  }
}
.button:hover,
.button:focus,
.button:active {
  color: #333333 !important;
  background-color: transparent !important;
}
/*.button:active //这种方式不支持*/
.active1 {
  color: #333333 !important;
}
.nowPath {
  color: rgb(246, 98, 70) !important;
  background-color: #f5f5fa !important;
}
/* 头像 */
.yhm_userHeader {
  width: 40px;
  height: 40px;
  user-select: none;
  /* border-radius: 50%; */
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
}
.yhm_userHeader_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9e9ea6;
  overflow: hidden;
}
</style>