<template>
  <!-- 登录首页 -->
  <div class="login_nr">
    <div class="nr_header">
      <div class="nr_header_left">
        <div><img src="../../assets/LOGO.svg" /></div>
        <div class="nr_header_left_title">备考猫创作中心</div>
      </div>
      <div class="nr_header_right">
        <p class="ljzc" @click="zhuce(1)">立即注册</p>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chuangzuozhongxin"></use>
          </svg>
          创作百科
        </div>
      </div>
    </div>
    <div class="nr_bottom">
      <div class="nr_bottom_dl">
        <div class="nr_bottom_dl_left">
          <img src="../../assets/images/dl.svg" />
        </div>
        <div class="nr_bottom_dl_right">
          <div class="nr_bottom_denglu">
            <div class="nr_bottom_denglu_title">短信登录</div>
            <div class="nr_bottom_denglu_nr">
              <el-form @keydown.enter.native="denglu()">
                <div class="nr_bottom_denglu_nr_sr">
                  <div class="nr_bottom_denglu_nr_sr_nr">
                    <el-input
                      class="inp1"
                      v-model="input"
                      @keyup.enter.native="keyupClick"
                      placeholder="请输入手机号"
                    ></el-input>
                  </div>
                  <div class="nr_bottom_denglu_nr_sr_nr">
                    <el-input
                      class="inp1"
                      ref="yzm"
                      placeholder="请输入验证码"
                      v-model="input1"
                      @input="input2"
                    >
                      <svg slot="suffix" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenge"></use>
                      </svg>
                      <el-button
                        slot="suffix"
                        type="text"
                        v-if="show"
                        style="font-size: 12px; color: #3c52e0"
                        :disabled="disabled"
                        @click="fasong()"
                        >发送验证码
                      </el-button>
                      <el-button
                        slot="suffix"
                        type="text"
                        v-if="!show"
                        style="font-size: 12px; color: #7384f3"
                        :disabled="disabled"
                      >
                        {{ count }}秒后重新获取
                      </el-button>
                    </el-input>
                  </div>
                </div>
                <div class="nr_bottom_denglu_nr_anniu">
                  <el-button style="width: 100%" v-if="dl" disabled="disabled"
                    >登 &nbsp;&nbsp;&nbsp; 录
                  </el-button>
                  <el-button
                    style="width: 100%"
                    ref="dl1"
                    id="dl1"
                    v-if="!dl"
                    @click="denglu()"
                    >登 &nbsp;&nbsp;&nbsp; 录
                  </el-button>
                </div>
              </el-form>
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
            <div>
              <a href="https://bkm.heyhui.com/#/about" target="_blank"
                >关于我们</a
              >
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenge"></use>
            </svg>
            <div>
              <a href="https://bkm.heyhui.com/#/agreement" target="_blank"
                >服务协议</a
              >
            </div>
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
import { requestLogin } from "@/network/request/requestLogin";
import { clearInterval, setInterval } from "timers";
import dragVerifyImg from "@/components/drag/dragVerifyImg.vue";
export default {
  name: "index",
  data() {
    return {
      input: "", //手机号
      input1: "", //验证码
      show: true, //发送验证码切换
      count: 0, //倒计时
      disabled: false, //按钮禁用
      dl: true, //按钮切换
      dragDialog: false, //是否开启-滑块验证
      t3: require("../../assets/images/jndx.jpg"), //验证图片
      isPassing: false, //滑块验证状态
    };
  },
  // /zhuce/zcbz1
  methods: {
    // 跳转到注册
    zhuce(id) {
      let { href } = this.$router.resolve({
        path: `/zhuce/zcbz${id}`,
      });
      window.open(href, "_blank");
    },
    //1. 开启滑块验证
    fasong() {
      this.dragDialog = true;
    },
    //1-1滑块验证
    handleFail() {
      if (this.value) {
        setTimeout(() => {
          this.$refs.dragVerify.reset();
        }, 500);
      }
    },
    dragClosed() {
      this.$refs.dragVerify.reset();
    },
    // 滑块验证成功后发送验证码
    pass() {
      let reg_tel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(this.input)) {
        this.$message.error("请输入正确的手机号格式");
      } else {
        request({
          url: "login/getSms",
          data: {
            mobile: this.input,
          },
        }).then((res) => {
          if (res.data.st == 1) {
            this.$message.success("验证码已成功发送");
            // 获取返回验证码
            this.input1Code = res.data.code;
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  // 60秒后验证码失效返回默认状态
                  this.input1Code = 0;
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          }
        });
      }
      setTimeout(() => {
        this.dragDialog = false;
      }, 500);
    },
    keyupClick() {
      this.$refs.yzm.focus();
    },
    // 3. 控制登录按钮是否可选
    input2() {
      if (this.input1.length == 4) {
        this.dl = false;
      } else {
        this.dl = true;
      }
    },
    // 4. 注册跳转
    open() {
      this.$confirm("未查找到您的账号信息,是否立即去注册？", "账号为空", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("跳转到注册页");
          this.zhuce(1);
        })
        .catch(() => {
          console.log("用户取消");
        });
    },
    //--2.登录验证账号正确性--
    denglu() {
      requestLogin({
        url: "login/login",
        data: {
          mobile: this.input,
          code: this.input1,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.st == 1) {
          let { id, token } = res.data.user;
          localStorage.setItem("user", JSON.stringify({ id, token }));
          this.$router.push({
            path: "/shouye",
          });
        } else if (res.data.st == -1) {
          console.log("该账号不存在去注册页面");
          this.open();
        } else if (res.data.st == -2) {
          // 跳转到审核中页面
          let { id, token } = res.data.data;
          let loginUser = { id, token };
          sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
          console.log("正在审核中");
          this.$router.push({
            name: "useraudit",
          });
        } else if (res.data.st == -3) {
          // 跳转到对应步骤页面
          console.log("信息已填写，查看当前进度");
          let { id, token } = res.data.data;
          let loginUser = { id, token };
          sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
          this.zhuce(2);
        } else if (res.data.st == -10000) {
          this.$message.error("登录失败请检查您的手机号和验证码!");
        }
      });
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
/* ------------------- */
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

.nr_bottom_denglu_nr {
  padding: 5%;
  height: 329px;
  background-color: #ffffff;
  border-radius: 0 0 20px 20px;
}

.nr_bottom_denglu_nr_sr_nr {
  margin-top: 20px;
}

/*.el-input__inner{*/
/*    background-color: #FAFAFC!important;*/
/*}*/
/* .nr_bottom_denglu_nr_anniu {
} */

#dl1 {
  border-radius: 27px !important;
  background-color: #ff6246 !important;
  color: #ffffff !important;
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
.nr_bottom_footer_top a {
  text-decoration: none;
  color: #9e9ea6;
}
.nr_bottom_footer_top a:hover {
  color: #3c52e0;
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
  font-family: PingFang SC;
  color: #9e9ea6;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
}

.nr_bottom_dl_left img {
  width: 100%;
}

.nr_bottom_denglu_nr_sr {
  margin-left: 8%;
}

.ts {
  margin-top: 10px;
}

.xy {
  color: #3c52e0;
}
</style>
