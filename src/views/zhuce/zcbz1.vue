<template>
  <div class="login_nr">
    <div class="nr_header">
      <div class="nr_header_left">
        <div><img src="../../assets/LOGO.svg" /></div>
        <div class="nr_header_left_title">备考猫创作中心</div>
      </div>
      <!-- <div class="nr_header_right"></div> -->
    </div>
    <div class="nr_bottom">
      <div class="nr_bottom_dl">
        <div class="nr_bottom_dl_left">
          <img src="../../assets/images/dl.svg" />
        </div>
        <div class="nr_bottom_dl_right">
          <div class="nr_bottom_denglu">
            <div class="nr_bottom_denglu_title">注册创作者号</div>
            <!-- 注册区域内容 -->
            <div class="nr_bottom_zhuche_body">
              <!-- 手机输入框 -->
              <div class="zhuche_body_sj" ref="zcsj">
                <span>+86</span>
                <input
                  v-model="phonenumber"
                  @focus="sjFocus"
                  @blur="sjBlur"
                  type="text"
                  class="zhuche_sj_input"
                  placeholder="输入手机号"
                />
                <div class="sj_warning" v-if="sjwarning == 1">
                  请输入完整手机号
                </div>
                <div class="sj_warning" v-else-if="sjwarning == 2">
                  手机号格式错误
                </div>
                <div class="sj_warning" v-else-if="sjwarning == 3">
                  手机号已被使用，去
                  <router-link to="/index">登录</router-link>
                </div>
              </div>
              <!-- 验证码输入框 -->
              <div class="zhuche_body_yzm" ref="zcyzm">
                <input
                  type="text"
                  @focus="yzmFocus"
                  @blur="yzmBlur"
                  @input="yzmInput"
                  v-model="yzmnumber"
                  placeholder="输入验证码"
                />
                <span @click="clickCode">{{
                  isSendCode
                    ? "重新发送&nbsp;(" + countDown + ")"
                    : "发送验证码"
                }}</span>
                <div class="yzm_warning" v-show="yzmwarning == 1">
                  验证码格式错误
                </div>
              </div>
              <!-- button -->
              <div class="zhuche_body_but" ref="zhucheBut" @click="userZhuCe">
                注&nbsp;&nbsp;&nbsp;册
              </div>
              <div class="ts">
                <div>
                  登录即视为同意 <a href="#" class="xy">用户协议、</a
                  ><a href="#" class="xy">隐私协议</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nr_bottom_footer">
        <div class="nr_bottom_footer_nr">
          <div class="nr_bottom_footer_top">
            <div>关于我们</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenge"></use>
            </svg>
            <div>服务协议</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenge"></use>
            </svg>
            <div>客服中心</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenge"></use>
            </svg>
            <div>侵权投诉</div>
          </div>
          <div class="nr_bottom_footer_center">
            Copyright @ 2021
            备考猫（BKMAO）版权所有品牌、课程和网页设计版权归无锡达猫教育科技有限公司所有，未经本公司允许，请勿建立镜像及其他用途
          </div>
          <div class="nr_bottom_footer_bottom">苏ICP备18061007号-5</div>
        </div>
      </div>
    </div>
    <!-- 验证码弹框 -->
    <el-dialog
      title="滑块验证"
      :visible.sync="dragDialog"
      width="466px"
      center
      @close="dragClosed()"
    >
      <div class="div_huakuai">
        <drag-verify-img
          ref="dragVerify"
          :width="416"
          :imgsrc="t3"
          radius="4px"
          :isPassing.sync="isPassing"
          :showRefresh="true"
          text="请按住滑块拖动"
          :showTips="true"
          successText="验证通过"
          failTip="验证失败，拖动滑块将悬浮图像正确合并"
          handlerIcon="el-icon-d-arrow-right"
          successIcon="el-icon-circle-check"
          @passcallback="pass"
          @passfail="handleFail"
        >
        </drag-verify-img>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request/request";
import dragVerifyImg from "@/components/drag/dragVerifyImg.vue";
export default {
  name: "index",
  data() {
    return {
      phonenumber: "", //手机号
      yzmnumber: "", //验证码
      sjwarning: 0, //手机号验证: 0 正常 1:不完整 2:格式 3.已使用 6成功!
      yzmwarning: 0, //0:默认 1:错误 6:正确
      isSendCode: false, //验证码切换
      countDown: 60, //倒计时
      dragDialog: false, //是否开启-滑块验证
      t3: require("../../assets/images/jndx.jpg"), //验证图片
      isPassing: false, //滑块验证状态
    };
  },
  methods: {
    // 1. 手机号聚焦-失焦事件
    sjFocus() {
      // console.log("进入焦点");
      this.sjwarning = 0;
      this.$refs.zcsj.style = "border:2px solid #40DA97";
    },
    sjBlur() {
      // console.log("失去焦点");
      let reg_tel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (this.phonenumber.length != 11) {
        this.sjwarning = 1;
        this.$refs.zcsj.style = "border:2px solid #FF6246";
      } else if (!reg_tel.test(this.phonenumber)) {
        this.sjwarning = 2;
        this.$refs.zcsj.style = "border:2px solid #FF6246";
      } else {
        // -----可继续填写------
        this.sjwarning = 6;
        this.$refs.zcsj.style = "border:2px solid transparent";
      }
      // console.log(this.sjwarning);
    },
    // 2. 验证码聚焦-失焦事件
    yzmFocus() {
      this.yzmwarning = 0;
      this.$refs.zcyzm.style = "border:2px solid #40DA97";
    },
    yzmBlur() {
      if (this.yzmnumber.length != 4) {
        this.$refs.zcyzm.style = "border:2px solid #FF6246";
        this.yzmwarning = 1;
      } else {
        this.yzmwarning = 6;
        this.$refs.zcyzm.style = "border:2px solid transparent";
      }
    },
    // 3.开启弹框验证
    clickCode() {
      this.dragDialog = true;
    },
    dragClosed() {
      this.$refs.dragVerify.reset();
    },
    // 3-0 滑块验证
    handleFail() {
      if (this.value) {
        setTimeout(() => {
          this.$refs.dragVerify.reset();
        }, 800);
      }
    },
    // 滑块验证成功后发送验证码
    pass() {
      // 3-1 判断手机号是否正确
      if (this.sjwarning == 6) {
        // 3-2 判断当前状态可否发送
        if (!this.isSendCode) {
          //3-3 发送验证码
          request({
            url: "/login/getSms",
            data: {
              mobile: this.phonenumber,
            },
          }).then((data) => {
            let { st } = data.data;
            if (st == 1) {
              this.$message.success("发送成功!");
              // 页面显示
              this.countDown = 60;
              this.countDown--;
              this.isSendCode = true;
              let yzmInter = setInterval(() => {
                this.countDown--;
                if (this.countDown < 1) {
                  this.isSendCode = false;
                  clearInterval(yzmInter);
                  yzmInter = null;
                }
              }, 1000);
            } else {
              this.$message.error("发送失败,请检测您的手机号是否正确");
            }
          });
        } else {
          console.log("等待倒计时结束后,方可继续发送");
        }
      } else {
        this.$message.warning("请填写您的手机号");
      }
      setTimeout(() => {
        this.dragDialog = false;
      }, 1000);
    },
    // 4. 注册按钮是否可以点击
    yzmInput() {
      if (this.yzmnumber.length == 4) {
        this.$refs.zhucheBut.style = "background-color:#FF6246;cursor:pointer;";
      } else {
        this.$refs.zhucheBut.style = "background-color:#c8c8d3;cursor:no-drop;";
      }
    },
    // 5. 用户注册-流程
    userZhuCe() {
      if (this.sjwarning == 6 && this.yzmwarning == 6) {
        request({
          url: "/Login/reg",
          data: {
            mobile: this.phonenumber,
            code: this.yzmnumber,
          },
        }).then((data) => {
          let { st, user } = data.data;
          console.log(data);
          switch (st) {
            case 1: // 用户注册成功
              //临时保存到本地
              sessionStorage.setItem("loginUser", JSON.stringify(user));
              this.$router.push({
                name: "zhuce2",
              });
              break;
            case -1: // 已创建该用户
              this.sjwarning = 3;
              this.$message.warning("手机号已被注册");
              break;
            case -2: //正在审核中
              this.$router.push({
                name: "useraudit",
              });
              break;
            case -3: // 该手机号已填写过信息,根据进度跳转
              this.$message.success("注册成功!");
              // 临时保存
              sessionStorage.setItem("loginUser", JSON.stringify(user));
              this.$router.push({
                name: `zhuce2`,
              });
              break;
            default:
              this.yzmwarning = 1;
              this.$message.error("验证码错误!");
              break;
          }
        });
      }
    },
  },
  components: {
    dragVerifyImg,
  },
};
</script>

<style scoped>
/* 滑块验证样式 */
.div_huakuai {
  width: 416px;
  user-select: none;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}
.drag-verify-container > div {
  margin: 0px auto !important;
}
.el-dialog--center .el-dialog__body {
  padding: 0px 0px !important;
}
.tips.danger {
  background: rgba(0, 0, 0, 0.2) !important;
  color: yellow;
}
/* --------------- */
.login_nr {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9fc;
  min-width: 1000px;
}

.nr_header {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
}

.nr_header_left {
  margin-left: 5%;
  display: flex;
  align-items: center;
}

.nr_header_left_title {
  margin-left: 10px;
  font-size: 24px;
  font-family: PingFang TC, PingFang TC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #37373b;
}

.nr_header_right {
  padding-right: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #9e9ea6;
}

.nr_bottom {
  width: 100%;
  height: 90%;
  background-color: #f9f9fc;
}

.nr_bottom_dl {
  margin-left: 3%;
  margin-top: 5%;
  display: flex;
  align-items: center;
}

.nr_bottom_dl_left {
  width: 58%;
}

.nr_bottom_dl_right {
  width: 42%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.nr_bottom_denglu {
  width: 446px;
}

.nr_bottom_denglu_title {
  width: 100%;
  line-height: 85px;
  font-size: 20px;
  font-weight: 600;
  height: 85px;
  text-align: center;
  background-color: #ff6246;
  color: #ffffff;
  border-radius: 20px 20px 0px 0px;
  font-family: PingFang SC-Medium;
}

.nr_bottom_zhuche_body {
  padding: 50px;
  /* height: 329px; */
  background-color: #ffffff;
  border-radius: 0 0 20px 20px;
}
.zhuche_body_sj {
  width: 100%;
  height: 53px;
  border: 2px solid transparent;
  background-color: #fafafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
}
.zhuche_body_sj > span {
  width: 77px;
  font-size: 16px;
  display: inline-block;
  font-family: PingFang SC;
  border-right: 1px solid #c8c8d3;
  text-align: center;
  color: #9e9ea6;
}
.sj_warning {
  position: absolute;
  font-family: PingFang SC;
  font-size: 12px;
  left: 0px;
  top: calc(100% + 4px);
  color: #ff6246;
}
.zhuche_sj_input {
  width: 268px;
  height: 22px;
  border: none;
  outline: none;
  padding: 0px 18px;
  background-color: #fafafc;
  caret-color: #40da97;
}
.zhuche_body_yzm {
  width: 100%;
  height: 53px;
  background-color: #fafafc;
  border: 2px solid transparent;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0px 60px 0px;
  padding: 0px 24px;
  box-sizing: border-box;
  position: relative;
}
.zhuche_body_yzm > input {
  width: 122px;
  height: 22px;
  border: none;
  outline: none;
  caret-color: #40da97;
  background-color: #fafafc;
}
.zhuche_body_yzm > span {
  height: 22px;
  font-size: 16px;
  padding-left: 16px;
  border-left: 1px solid #c8c8d3;
  line-height: 22px;
  font-family: PingFang SC;
  color: #4e62e3;
  user-select: none;
}
.yzm_warning {
  position: absolute;
  font-family: PingFang SC;
  font-size: 12px;
  left: 0px;
  top: calc(100% + 4px);
  color: #ff6246;
}
.zhuche_body_yzm > span:hover {
  cursor: pointer;
}
.zhuche_body_but {
  width: 100%;
  height: 53px;
  background-color: #c8c8d3;
  border-radius: 32px;
  color: #ffffff;
  text-align: center;
  line-height: 53px;
  font-size: 20px;
  font-family: PingFang SC;
  user-select: none;
  cursor: no-drop;
}

.ts {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 2em;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #c8c8d3;
}

.ts a {
  text-decoration: none;
}

.nr_bottom_footer {
  width: 100%;
  margin-top: 5%;
  display: flex;
  justify-content: center;
}

.nr_bottom_footer_nr {
  text-align: center;
}

.nr_bottom_footer_top {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #9e9ea6;
  line-height: 30px;
}

.nr_bottom_footer_top div {
  margin: 0 10px;
}

.nr_bottom_footer_center {
  opacity: 0.75;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #c8c8d3;
  line-height: 30px;
}

.nr_bottom_footer_bottom {
  opacity: 0.75;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #c8c8d3;
  line-height: 30px;
}

.ljzc {
  margin-right: 30px;
}

.nr_bottom_dl_left img {
  width: 100%;
}

.ts {
  margin-top: 10px;
}

.xy {
  color: #3c52e0;
}
</style>
