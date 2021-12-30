<template>
  <div class="verification_html">
    <el-dialog
      title="手机校检"
      :visible.sync="showVerification"
      width="800px"
      top="10vh"
      @open="isOpnen()"
    >
      <div class="div_veri_body">
        <div class="div_sendMsg">
          <div class="Msg_top">
            <i class="iconfont icon" style="color: #0767d6">&#xe66f;</i>
            <span
              >我们向您的手机{{
                cutOutNumber
              }}发送了一条短信校检码，查收后填写，不要泄漏哦</span
            >
            <div class="div_input_yzm">
              <input
                ref="isOk"
                type="text"
                v-model="inputvals"
                placeholder="请输入校检码"
              />
              <button
                v-if="countDown == 0"
                class="but_yzm"
                @click="clickSendCode()"
              >
                重新发送
              </button>
              <button v-else class="but_yzm" style="color: #9597a1">
                {{ countDown }}秒
              </button>
            </div>
          </div>
          <!-- Msg_bot -->
          <div
            :class="inputvals.length == 4 ? 'Msg_bot Msg_botColor' : 'Msg_bot'"
            @click="goChangBank()"
          >
            确认
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request/request";
export default {
  data() {
    return {
      showVerification: false,
      countDown: 60, //倒计时
      inputvals: "",
      userNumber: null,
    };
  },
  props: ["userTitle"],
  created() {},
  computed: {
    cutOutNumber() {
      if (this.userNumber) {
        let num = this.userNumber;
        let s1 = num.slice(0, 3);
        let s2 = num.slice(7);
        return `${s1}****${s2}`;
      }
    },
  },
  methods: {
    // 开启弹框
    isOpnen() {
      this.userNumber = this.userTitle.mobile;
      if (this.countDown == 60) {
        this.clickSendCode();
      }
      this.inputvals = "";
    },
    // 定时器
    setInter() {
      this.countDown = 60;
      this.countDown--;
      let time = setInterval(() => {
        this.countDown--;
        if (this.countDown == 0) {
          clearInterval(time);
          time = null;
        }
      }, 1000);
    },
    // 发送验证码
    clickSendCode() {
      this.setInter();
      request({
        url: "login/getSms",
        data: {
          mobile: this.userNumber,
        },
      }).then((res) => {
        if (res.data.st == -1) {
          this.$message.error("发送失败请稍后再试!");
        }
      });
    },
    //点击确认
    goChangBank() {
      console.log("111");
      request({
        url: "user/operation_verification",
        data: {
          mobile: this.userNumber,
          code: this.inputvals,
        },
      }).then((res) => {
        if (res.data.st == 1) {
          // 触发父级事件
          this.$emit("verifyCallback");
          this.showVerification = false;
        } else {
          this.$message.error("请输入正确的验证码!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../../icon/iconfont.css");
.div_veri_body {
  width: 100%;
  padding-bottom: 220px;
  .div_sendMsg {
    margin-top: 140px;
    text-align: center;
    .Msg_top {
      .icon {
        font-size: 24px !important;
        vertical-align: middle;
        margin-right: 8px;
      }
      > span {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
      }
      .div_input_yzm {
        display: flex;
        justify-content: center;
        margin-top: 26px;
        > input {
          width: 160px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          outline: none;
          padding: 0px 12px;
          box-sizing: border-box;
          margin-right: 12px;
        }
        .but_yzm {
          width: 80px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          color: #455ae1;
          cursor: pointer;
        }
      }
    }
    .Msg_bot {
      width: 152px;
      height: 40px;
      background: #c8c8d3;
      border-radius: 4px;
      line-height: 40px;
      margin: 40px auto 0px;
      user-select: none;
      cursor: pointer;
      color: white;
    }
    .Msg_botColor {
      background: #ff6246;
    }
  }
}
</style>