<template>
  <div>
    <el-dialog
      title="提现"
      :visible.sync="showDeposit"
      width="580px"
      @open="isOpen()"
      @close="isClose()"
    >
      <div class="div_withdraw">
        <div v-if="step == 0">
          <div class="div_top">
            <div class="div_top_title">
              当前可提现金额 <b>{{ maxMoney }}</b> 元
              <span @click="inputVal = maxMoney">全部提现</span>
            </div>
            <h3>提现金额</h3>
            <div class="div_top_input">
              <h1>￥</h1>
              <input
                type="text"
                v-model="inputVal"
                @input="inputMoney($event)"
                maxlength="7"
                @keyup="inputVal = inputVal.replace(/[^\d.]/g, '')"
              />
            </div>
          </div>
          <div style="position: relative">
            <p class="p_tishi">每半个月可提现一次，每次提现的额度需大于100元</p>
            <p class="p_color" v-show="inputDecide < 6">
              {{ inputDecide > 1 ? "超出可提现金额" : "提现金额不足100元" }}
            </p>
          </div>
          <div class="div_userMessage">
            <p class="left">到账账户</p>
            <div class="div_useryhk">
              <b>{{ userTitle() }}</b>
              <span>{{ userMsg.khh }}</span>
              <p>预计24小时内到账，请注意查收</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="div_bankBeing">
            <div class="div_bakBeingTop">
              <i class="iconfont">&#xe612;</i>
              <h3>{{ step == 1 ? "银行处理中" : "未到提现时间" }}</h3>
              <p class="p1" v-show="step == 1">预计24小时内到账，请注意查收</p>
              <p class="p2" v-show="step == 2">
                半个月可提现一次，下次提现时间为{{ nextTime }}
              </p>
            </div>
            <ul class="ul_bakBeingBot" v-show="step == 1">
              <li class="li_bakBeingBo" v-for="(val, inde) in bill" :key="inde">
                <div class="left">{{ val }}</div>
                <div class="right">{{ billmsg[inde] }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="clickWithdrawDeposit()"
          :loading="butDeposIsloading"
          >{{ step == 0 ? "确认提现" : "确认" }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { request } from "@/network/request/request";
export default {
  name: "",
  data() {
    return {
      bill: ["提现金额", "服务费", "到账银行卡", "提现时间", "流水号"],
      showDeposit: false,
      inputVal: null, //提现金额输入框
      inputDecide: 10, // 10默认 1低于100 2超出最大额度 6成功
      butDeposIsloading: false, //加载中
      billmsg: [], //账单信息
      nextTime: "", //下一次提现
    };
  },
  props: ["step", "maxMoney", "userMsg", "billMsgArr"],
  watch: {
    inputVal: function (nv) {
      let money = nv * 1;
      // 低于多少金额可提现
      if (money < 0) {
        this.inputDecide = 1;
        this.$emit("change-depos", false);
      } else if (money > this.maxMoney) {
        this.inputDecide = 2;
        this.$emit("change-depos", false);
      } else {
        this.inputDecide = 6;
        this.$emit("change-depos", true);
      }
    },
  },
  methods: {
    isOpen() {
      if (this.step == 1) this.setbillMsg(this.billMsgArr);
      if (this.step == 2) this.nextTime = this.billMsgArr.xc_time;
    },
    // 获取账单信息
    setbillMsg(obj) {
      let m = "￥" + obj.money;
      let tm = "￥" + Math.floor(obj.money * 0.006);
      let bank = this.userTitle();
      let time = obj.add_time;
      let lius = obj.sn;
      this.billmsg = [m, tm, bank, time, lius];
    },
    //银行卡信息过滤
    userTitle() {
      if (this.userMsg.yh_account) {
        let { name, yh_account } = this.userMsg;
        let length = yh_account.length;
        let newStrAccount = yh_account.slice(length - 4, length);
        return `${name}(**** **** **** ${newStrAccount})`;
      }
    },
    // 限制不可输入
    inputMoney(e) {
      this.inputVal = e.target.value
        .toString()
        .replace(/\.{2,}/g, ".")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只能输入一个小数点
    },
    // 提现-确认
    clickWithdrawDeposit() {
      // this.$emit("change-step", 1);
      switch (this.step) {
        case 0: //提现状态
          if (this.inputDecide == 6) {
            console.log("可以提现");
            // 开启加载
            this.butDeposIsloading = true;
            // 开始提现
            request({
              url: "withdrawal/withdrawalPost",
              data: {
                czz_id: JSON.parse(localStorage.getItem("user")).id,
                money: this.inputVal,
              },
            }).then((res) => {
              if (res.data.st == 1) {
                this.$message.success("已成功发送提现请求!");
                this.butDeposIsloading = false;
                this.showDeposit = false;
                this.$emit("change-step");
              } else {
                this.$message.error(
                  "提现失败!请仔细检查您的输入问题或网络环境"
                );
                this.butDeposIsloading = false;
              }
            });
          } else {
            this.$message.error("请输入正确的提现金额(。_。)");
          }
          break;
        default:
          this.showDeposit = false;
          break;
      }
    },
    // 关闭的操作
    isClose() {
      this.inputDecide = 10;
      this.inputVal = null;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../icon/iconfont.css";
.div_withdraw {
  font-family: PingFang SC;
  .div_top {
    padding: 0px 30px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5fa;
    .div_top_title {
      line-height: 28px;
      color: #68686f;
      margin-bottom: 30px;
      b {
        font-size: 18px;
        font-weight: 600;
        color: black;
      }
      span {
        font-size: 12px;
        color: #23a86e;
        font-weight: 600;
        margin-left: 20px;
        user-select: none;
        cursor: pointer;
      }
    }
    > h3 {
      font-weight: 500;
      color: #9e9ea6;
    }
    .div_top_input {
      display: flex;
      line-height: 40px;
      margin-top: 28px;
      > h1 {
        font-weight: 600;
        font-size: 28px;
        margin-right: 8px;
      }
      > input {
        font-size: 28px;
        border: none;
        color: #23a86e;
      }
    }
  }
  .p_color {
    top: 100%;
    left: 0px;
    position: absolute;
    font-size: 13px;
    line-height: 20px;
    color: #f23c42;
    padding: 0px 30px;
    margin-top: 2px;
  }
  .p_tishi {
    font-size: 13px;
    color: #9e9ea6;
    padding: 0px 30px;
    margin-top: 15px;
  }
  .div_userMessage {
    width: 100%;
    font-family: PingFang SC;
    height: 112px;
    background: #f5f5fa;
    // opacity: 0.5;
    border-radius: 0px 0px 10px 10px;
    margin-top: 40px;
    padding: 24px 24px 32px;
    box-sizing: border-box;
    font-size: 14px;
    color: #9e9ea6;
    display: flex;
    line-height: 20px;
    .left {
      margin-right: 20px;
    }
    .div_useryhk {
      > b {
        color: #333333;
        margin-right: 12px;
        font-weight: 600;
      }
      > span {
        font-size: 12px;
        color: #37373b;
      }
      > p {
        margin-top: 16px;
      }
    }
  }
  .div_bankBeing {
    font-family: PingFang SC;
    .div_bakBeingTop {
      text-align: center;
      padding-bottom: 64px;
      border-bottom: 1px solid #f5f5fa;
      > i {
        font-size: 48px;
        color: #40da97;
      }
      > h3 {
        color: #37373b;
        font-weight: 600;
        margin-top: 12px;
      }
      .p1 {
        font-size: 14px;
        color: #9e9ea6;
        margin-top: 12px;
      }
      .p2 {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #37373b;
        margin-top: 25px;
      }
    }
    .ul_bakBeingBot {
      padding: 24px 30px 0px;
      font-size: 13px;
      .li_bakBeingBo {
        display: flex;
        line-height: 18px;
        margin-bottom: 12px;
        .left {
          width: 65px;
          margin-right: 20px;
          color: #9e9ea6;
        }
        right: {
          color: #37373b;
        }
      }
    }
  }
}
</style>