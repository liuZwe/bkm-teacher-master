<template>
  <div>
    <el-dialog
      :visible.sync="showBindBankCard"
      width="800px"
      :show-close="false"
      custom-class="my-dialog"
      @close="isClose()"
      @open="isOpen()"
    >
      <!--  银行卡注册 -->
      <div class="div_bankform_body" v-if="process == 0">
        <div class="div_form_top">
          <b>{{ userBankMsg.id ? "更换银行卡" : "绑定银行卡" }}</b>
          <span>（请填写以下信息，用于账户提现功能）</span>
        </div>
        <ul class="ul_form_center">
          <li>
            <span class="sp_left">真实姓名</span>
            <div class="div_input">{{ bankform.userName }}</div>
          </li>
          <li>
            <span class="sp_left">身份证号</span>
            <div class="div_input">{{ bankform.userID }}</div>
          </li>
          <li>
            <span class="sp_left">银行卡号</span>
            <div>
              <div class="div_input2">
                <input
                  type="text"
                  v-model="bankform.card"
                  @change="getBankMsg()"
                />
                <img
                  v-show="nowBankLogo"
                  :src="nowBankLogo"
                  class="bank_logo"
                />
              </div>
              <!-- 银行卡不能为空 请输入正确的银行卡 -->
              <p class="is_error" v-show="formIsok.bank < 6">
                {{
                  formIsok.bank == 0 ? "银行卡不能为空" : "请输入正确的银行卡"
                }}
              </p>
              <p class="p_hint">请输入银行储蓄卡账号，输入后会智能识别银行</p>
            </div>
          </li>
          <li>
            <span class="sp_left">手机号码</span>
            <div>
              <div class="div_input2">
                <input
                  type="text"
                  v-model="bankform.number"
                  @input="yzNumber()"
                />
              </div>
              <p class="is_error" v-show="formIsok.number < 6">
                {{
                  formIsok.number == 0
                    ? "手机号码不能为空"
                    : "请输入正确的手机号码"
                }}
              </p>
              <p class="p_hint">
                请输入银行预留手机号，以验证银行卡是否属于你本人
              </p>
            </div>
          </li>
        </ul>
        <div class="div_form_bottom">
          <span
            class="span_button"
            @click="submitBankMsg()"
            :class="
              formIsok.bank == 6 && formIsok.number == 6 ? 'span_butColor' : ''
            "
            >同意协议并确认</span
          >
          <br />
          <a href="https://bkm.heyhui.com/#/agreement" target="_blank"
            >《备考猫创作中心提现服务协议》</a
          >
        </div>
      </div>
      <!-- 银行卡网络认证 -->
      <div class="div_bankform_body" v-else>
        <div class="div_form_top">
          <b>绑定银行卡</b>
        </div>
        <!-- 失败 -->
        <div class="div_verify_center" v-show="process == -1">
          <i class="iconfont icon" style="color: #f66246">&#xe610;</i>
          <span>此银行账户不存在</span>
          <div class="div_back" style="width: 152px" @click="process = 0">
            返回重新填写
          </div>
        </div>
        <!-- 成功 -->
        <div class="div_verify_center" v-show="process == 1">
          <i class="iconfont icon" style="color: #0dc05f">&#xe676;</i>
          <span>银行卡绑定成功!</span>
          <div
            class="div_back"
            style="width: 80px"
            @click="showBindBankCard = false"
          >
            完成
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 5*手机手机校检 -->
    <Verification
      ref="refverification"
      @verifyCallback="returnCode"
    ></Verification>
  </div>
</template>
<script>
import axios from "axios";
import { request } from "@/network/request/request";
import getBankName from "../ghyhk/abc.js";
import Verification from "./verification.vue";
export default {
  data() {
    return {
      showBindBankCard: false, //绑定银行卡流程显隐
      userMessage: {},
      //银行卡绑定表单
      bankform: {
        number: "", //电话
        userID: "", //身份证id
        userName: "", //姓名
        card: "", //银行卡号
        banckName: "", //银行卡名称
      },
      formIsok: {
        // 10 默认 0为空 1错误 6正确
        bank: 10,
        number: 10,
      },
      nowBankLogo: "",
      process: 0, //当前流程 0-未注册 1成功 -1 失败
    };
  },
  props: ["userBankMsg", "userTitle"],
  created() {},
  computed: {
    showUserid() {
      let userid = this.bankform.userID;
      return userid[0] + "****************" + userid[userid.length - 1];
    },
  },
  methods: {
    isOpen() {
      this.bankform.userID = this.userTitle.teacher_info.card_id;
      this.bankform.userName = this.userTitle.name;
    },
    // 查询银行卡信息
    getBankMsg() {
      if (this.bankform.card == "") {
        this.formIsok.bank = 0;
      } else {
        axios({
          url: `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${this.bankform.card}&cardBinCheck=true`,
        }).then((res) => {
          let { validated, bank } = res.data; //验证银行卡是否正确
          console.log(res);
          if (validated) {
            this.bankform.banckName = getBankName(bank);
            this.formIsok.bank = 6;
            this.nowBankLogo = `https://apimg.alipay.com/combo.png?d=cashier&t=${res.data.bank}`;
          } else {
            this.formIsok.bank = 1;
          }
        });
      }
    },
    // 手机号简单验证
    yzNumber() {
      if (this.bankform.number == "") {
        this.formIsok.number = 0;
      } else {
        let reg_tel =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg_tel.test(this.bankform.number)) {
          this.formIsok.number = 1;
        } else {
          // -----可继续填写------
          this.formIsok.number = 6;
        }
      }
    },
    // 提交银行卡信息
    submitBankMsg() {
      //检测用户是否输入
      for (const key in this.formIsok) {
        if (this.formIsok[key] == 10) this.formIsok[key] = 0;
      }
      // 开启提交流程
      if (this.formIsok.bank == 6 && this.formIsok.number == 6) {
        // 绑定银行卡
        request({
          url: "withdrawal/bindBank",
          data: {
            czz_id: JSON.parse(localStorage.getItem("user")).id,
            yh_account: this.bankform.card,
            name: this.bankform.userName,
            idcard: this.bankform.userID,
            mobile: this.bankform.number,
            khh: this.bankform.banckName,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.st == 1) {
            // 查看是绑定还是更换
            if (this.userBankMsg.id) this.process = 1;
            else this.$refs.refverification.showVerification = true;
          } else {
            //绑定失败
            this.process = -1;
          }
        });
        // 关闭本页面
        // this.showBindBankCard = false;
      } else {
        this.$message.error("请填写完全部信息后再操作!");
      }
    },
    //短信验证返回
    returnCode() {
      this.process = 1;
    },
    // 关闭
    isClose() {
      this.bankform = {};
      this.formIsok = {};
      this.nowBankLogo = "";
      if (this.process == 1) this.$router.go(0);
      this.process = 0;
    },
  },
  components: { Verification },
};
</script>

<style scoped lang="scss">
@import url("../../../icon/iconfont.css");
input {
  border: none;
  outline: none;
}
.span_butColor {
  color: #ffffff;
  background: #ff6246 !important;
}
.div_bankform_body {
  width: 100%;
  padding: 30px 28px 0px;
  box-sizing: border-box;
  font-family: PingFang SC;
  .div_form_top {
    > b {
      font-size: 18px;
      font-weight: 600;
      color: #37373b;
    }
    > span {
      font-size: 13px;
      color: #9597a1;
    }
  }
  .ul_form_center {
    width: 426px;
    font-size: 14px;
    margin: 48px auto 0px;
    li {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      .sp_left {
        line-height: 40px;
        color: #37373b;
      }
      .div_input {
        width: 343px;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0px 16px;
        box-sizing: border-box;
        user-select: none;
      }
      .div_input2 {
        width: 343px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > input {
          width: 200px;
          height: 40px;
          padding-left: 12px;
        }
        > img {
          width: 126px;
          height: 36px;
        }
      }
      .p_hint {
        line-height: 20px;
        font-size: 12px;
        color: #9597a1;
      }
      .is_error {
        line-height: 20px;
        font-size: 12px;
        color: #f23c42;
      }
    }
  }
  .div_form_bottom {
    text-align: center;
    margin-top: 40px;
    .span_button {
      display: inline-block;
      padding: 10px 20px;
      background: #c8c8d3;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
    }
    a {
      display: inline-block;
      font-size: 14px;
      color: #3c52e0;
      margin-top: 16px;
    }
  }
  .div_verify_center {
    margin: 140px auto 200px;
    text-align: center;
    .icon {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }
    span {
      vertical-align: middle;
    }
    .div_back {
      color: white;
      height: 40px;
      line-height: 40px;
      background: #ff6246;
      border-radius: 4px;
      margin: 30px auto 0px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>