<template>
  <div class="nr">
    <!-- 头部 -->
    <el-row :gutter="20">
      <!-- 昨日结算 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card>
            <div class="box-card">
              <div class="card-left">
                <p class="dayMoney" style="margin-top: 4px">昨日待结算</p>
                <p>
                  <span style="color: #37373b; font-size: 18px">￥</span
                  ><span class="span_lastDayMoney">{{
                    day_moneyDatas.day_income
                  }}</span>
                </p>
              </div>
              <div class="card-right">
                <div class="margin-bottom-8">
                  <div class="moreText" style="color: #c8c8d3">周同比</div>
                  <div
                    class="green"
                    style="padding-left: 10px; font-size: 12px"
                  >
                    0%-
                  </div>
                </div>
                <div style="height: 8px"></div>
                <div class="margin-bottom-8">
                  <div class="moreText" style="color: #c8c8d3">日同比</div>
                  <div class="red" style="padding-left: 10px; font-size: 12px">
                    0%-
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 可提现金额 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card>
            <div class="box-card1">
              <div class="card-left">
                <div class="card-left_divdjs">
                  可提现金额
                  <div class="show_tishi">
                    <img
                      src="../../assets/images/jcxx/question.svg"
                      class="img_question"
                    />
                    <div class="show_tishi_box">
                      <div class="zi_shan"></div>
                      <div class="slot_zi">
                        每半个月可提现一次，每次提现的额度需大于 100元
                      </div>
                    </div>
                  </div>
                </div>
                <div class="div_isOkMoney">
                  <p>
                    <span style="color: rgb(55, 55, 59); font-size: 18px"
                      >￥</span
                    ><span
                      style="
                        margin-left: 10px;
                        color: rgb(55, 55, 59);
                        font-size: 36px;
                        font-family: 'PingFang SC';
                        font-weight: 600;
                      "
                      >{{ day_moneyDatas.withdrawal }}</span
                    >
                  </p>
                  <div @click="clickWithDrawDeposit()">提现></div>
                </div>
              </div>
              <div class="card-right_tx" @click="clickOpenWithDrawal()">
                提现记录 >
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 待结算金额 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card>
            <div class="card-left">
              <div class="card-left_divdjs">
                待结算金额
                <div class="show_tishi">
                  <img
                    src="../../assets/images/jcxx/question.svg"
                    class="img_question"
                  />
                  <div class="show_tishi_box">
                    <div class="zi_shan"></div>
                    <div class="slot_zi">
                      每天收益间隔15天结算一次，1号的收益16号结
                      算，2号的收益17号结算，以此类推
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 18px">
                <span class="moreText" style="color: #37373b">￥</span
                ><span
                  style="
                    color: #37373b;
                    font-size: 36px;
                    font-family: PingFang SC;
                    font-weight: 600;
                  "
                  >{{ day_moneyDatas.djs_income }}</span
                >
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 内容 -->
    <el-row :gutter="20" style="margin-top: 10px; display: flex">
      <!-- 数据表格 -->
      <el-col :xl="16" :lg="14">
        <div class="grid-content bg-purple">
          <el-card id="el-card">
            <div class="card_nr">
              <div class="card_nr_top">
                <div class="card_nr_left">收益趋势</div>
                <el-select
                  v-model="earningsTableValue"
                  placeholder="请选择"
                  @change="qushi()"
                  class="qushi_select"
                >
                  <el-option
                    v-for="item in earningsTableOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div id="box1" style="width: 100%; height: 300px"></div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 提现账户 -->
      <el-col :xl="8" :lg="10">
        <div class="grid-content bg-purple bind">
          <el-card id="el-card1" style="padding: 0">
            <div class="card-left1">
              <div class="card-left1_top">提现账户</div>
              <!-- 银行卡 -->
              <div
                v-if="bankMsg.id"
                class="card-left1_center"
                @click="clickBankCard()"
              >
                <h3>···· ···· ···· {{ lastBankCard() }}</h3>
                <div class="card-left1_userTitle">
                  <div class="user_title">
                    <p>持有者</p>
                    <p>{{ bankMsg.name }}</p>
                  </div>
                  <div class="user_title">
                    <p>所属行</p>
                    <p>{{ bankMsg.khh }}</p>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="card-left1_centerNone"
                @click="clickBankCard()"
              >
                <h3>点击绑定银行卡</h3>
              </div>
              <div class="ghyhk" @click="ghyhk()">更换银行卡</div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 底部-收益明细 -->
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="height: 100%">
          <el-card id="el-card2">
            <div class="box-card2">
              <div class="box-card2_top">收益明细</div>
              <!-- 表格筛选控件 -->
              <div class="box-card2_center">
                <!-- 日期选择 -->
                <div class="riqi box-card2_centerTop_left">
                  <ul class="box-card2_tableType">
                    <li
                      v-for="(val, index) in bot_TabtypeArr"
                      :key="index"
                      :class="bottomTableType_liColor == index ? 'liColor' : ''"
                    >
                      {{ val }}
                    </li>
                  </ul>
                  <div class="box-card2_center_selectTime">日期选择</div>
                  <!-- 1time -->
                  <div class="riqi_slect">
                    <el-select
                      v-model="bottomTableValue"
                      placeholder="请选择"
                      @change="changeBotTablSelect()"
                    >
                      <el-option
                        v-for="item in bottomTableOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <!-- 2time -->
                  <el-date-picker
                    type="date"
                    placeholder="年-月-日"
                    v-model="bottomTable_timeLeft"
                    :picker-options="bottomTableLeft_pickerOptions"
                    style="height: 40px"
                    @change="changeBotTimePicker()"
                  ></el-date-picker>
                  <span class="box-card2_center_spango">至</span>
                  <el-date-picker
                    placeholder="年-月-日"
                    v-model="bottomTable_timeRight"
                    :picker-options="bottomTableRight_pickerOptions"
                    style="height: 40px"
                    @change="changeBotTimePicker()"
                  ></el-date-picker>
                </div>

                <div
                  style="font-size: 16px; margin-left: 55px"
                  class="daochu"
                  @click="exportExcel()"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-lujing255"></use>
                  </svg>
                  <span
                    style="
                      margin-top: -5px;
                      font-size: 16px;
                      font-family: PingFang SC;
                      font-weight: 400;
                      line-height: 22px;
                      color: #3c52e0;
                      margin-right: 66px;
                      opacity: 1;
                    "
                    >导出EXCEL</span
                  >
                </div>
              </div>
              <!-- 表格 -->
              <div class="box-card2_bot">
                <el-table
                  :data="tableData"
                  :header-cell-style="{
                    background: '#F5F5FA',
                    color: '#68686F',
                  }"
                  style="width: 100%"
                >
                  <el-table-column prop="add_time" label="日期" min-width="10%">
                  </el-table-column>
                  <el-table-column prop="title" label="名称" min-width="15%">
                  </el-table-column>
                  <el-table-column
                    prop="fwl"
                    label="新增VIP观看数"
                    min-width="10%"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="收入(元)"
                    min-width="10%"
                  >
                    <p class="green" slot-scope="{ row }">
                      <span style="margin-right: 3px">+</span>
                      <span style="margin-right: 3px">¥</span>
                      <span>{{ row.money }}</span>
                    </p>
                  </el-table-column>
                  <el-table-column prop="sn" label="收益编号" min-width="15%">
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="car2_bot_paging">
                  <div
                    :class="[
                      'point',
                      'tablePage',
                      currentpage !== 1 ? 'yellow' : '',
                    ]"
                    @click="goPage(-1, currentpage !== 1)"
                  >
                    上一页
                  </div>
                  <el-pagination
                    background
                    :current-page="this.currentpage"
                    :page-size="10"
                    layout="pager"
                    :total="TotalRows"
                  >
                  </el-pagination>
                  <div
                    :class="[
                      'point',
                      'tablePage',
                      currentpage < Math.ceil(TotalRows / 10) ? 'yellow' : '',
                    ]"
                    @click="
                      goPage(1, currentpage !== Math.ceil(TotalRows / 10))
                    "
                  >
                    下一页
                  </div>
                  <p>共{{ currentpage }}/{{ Math.ceil(TotalRows / 10) }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 1* 提醒绑定银行卡弹框 -->
    <el-dialog
      :visible.sync="showNoBankCard"
      width="30%"
      :show-close="false"
      custom-class="dialog"
    >
      <p class="text" v-show="!bankMsg.id">
        亲爱的，你还没有绑定银行卡，暂时无法操作哦!
      </p>
      <p class="text" v-show="bankMsg.id">确定要更改已绑定的银行卡吗？</p>
      <div class="div_noBankBut">
        <div class="footer_button isokBut" @click="bindBankCard()">
          {{ bankMsg.id ? "重新绑定" : "去绑定" }}
        </div>
        <div class="footer_button isnoBut" @click="showNoBankCard = false">
          取 消
        </div>
      </div>
    </el-dialog>
    <!-- 2* 填写绑定银行卡基本信息 -->
    <Bankform
      ref="refBankform"
      :userBankMsg="bankMsg"
      :userTitle="userAllMsg"
    ></Bankform>
    <!-- 3* 提现弹框 -->
    <BankcardWithdraw
      ref="refwithDraw"
      :step="withdrawDepositStep"
      :userMsg="bankMsg"
      :billMsgArr="setbillmessage"
      :maxMoney="day_moneyDatas.withdrawal"
      @change-step="GetPageList"
    ></BankcardWithdraw>
    <!-- 4*提现记录-弹框 -->
    <el-dialog
      class="drawMoney"
      :visible.sync="showWithdrawalRecord"
      width="82.2%"
    >
      <span slot="title" class="drawHistory">提现记录</span>
      <div class="txjl">
        <div class="txjl_top">
          <!-- 提现记录
             -->
          <div class="drawBox">
            <!-- <span class="drawStatus">提现状态</span> -->
            <el-select
              v-model="WithdrawalRecord_stateSelection"
              class="statusSelect"
              placeholder="请选择"
              @change="requestTableData()"
            >
              <el-option
                v-for="item in WithdrawalRecord_options"
                :key="item.value"
                :label="item.labe"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="txjl_bottom">
          <el-table
            :data="withdrawTableData"
            style="width: 100%; margin-top: 36px"
          >
            <el-table-column prop="add_time" label="申请时间" min-width="10%">
            </el-table-column>
            <el-table-column prop="money" label="金额(元)" min-width="10%">
              <template slot-scope="{ row: { money } }">
                <span class="green">{{ money | local }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yhk" label="到账银行" min-width="10%">
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="20%">
              <template slot-scope="{ row: { status } }">
                <span>{{ status == 0 ? "提现申请中" : "提现成功" }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="bz1" label="附加信息" min-width="20%">
              <template slot-scope="{ row: { bz1 } }">
                <span>{{ bz1 || "无" }}</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="name" label="操作人" min-width="30%">
            </el-table-column>
            <el-table-column prop="sn" label="账单编号|流水号" min-width="20%">
            </el-table-column>
          </el-table>
          <div
            style="
              margin-top: 33px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <div
              :class="[
                'point',
                'tablePage',
                withdrawTableCurrentpage != 1 ? 'yellow' : '',
              ]"
              @click="clickPageChange(-1)"
            >
              上一页
            </div>
            <el-pagination
              background
              @current-change="requestTableData()"
              :current-page="this.withdrawTableCurrentpage"
              :page-size="10"
              layout="pager"
              :total="withdrawTableTotalRows"
            >
            </el-pagination>
            <div
              :class="[
                'point',
                'tablePage',
                withdrawTableCurrentpage <
                Math.ceil(withdrawTableTotalRows / 10)
                  ? 'yellow'
                  : '',
              ]"
              @click="clickPageChange(1)"
            >
              下一页
            </div>
            <p
              style="
                margin-left: 50px;
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 18px;
                color: #9e9ea6;
                opacity: 1;
              "
            >
              共{{ withdrawTableCurrentpage }}/{{
                Math.ceil(withdrawTableTotalRows / 10)
              }}
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 5*手机手机校检 -->
    <Verification
      ref="refverification"
      @verifyCallback="returnCode"
      :userTitle="userAllMsg"
    ></Verification>
  </div>
</template>

<script>
import echarts from "echarts";
import { request } from "@/network/request/request";
import BankcardWithdraw from "./components/bankcardWithdraw.vue";
import Bankform from "./components/bankform.vue";
import Verification from "./components/verification.vue";
// import  from ""
export default {
  name: "czsy",
  data() {
    return {
      day_moneyDatas: {}, //顶部数据金额
      bankMsg: {}, //user银行卡信息
      userAllMsg: {}, //用户个人信息
      //提现记录弹框数据
      WithdrawalRecord_stateSelection: -1, //提现记录筛选
      WithdrawalRecord_options: [
        {
          value: 1,
          labe: "近3个月",
        },
        {
          value: 2,
          labe: "近半年",
        },
        {
          value: 3,
          labe: "近一年",
        },
        {
          value: -1,
          labe: "全部",
        },
      ],
      withdrawTableCurrentpage: 1, //提现记录页数
      withdrawTableTotalRows: 0, //当前数据总量
      withdrawTableData: [], //提现表格数据
      //弹出框显隐控制
      showWithdrawalRecord: false, //提现记录显示隐藏
      showNoBankCard: false, //未绑定银行卡显隐
      //图表日期选择
      earningsTableValue: "7day",
      earningsTableOptions: [
        {
          value: "7day",
          label: "近7天",
        },
        {
          value: "30day",
          label: "近30天",
        },
        {
          value: "year",
          label: "近一年",
        },
      ],
      //底部表格日期/类型选择
      bottomTable_timeLeft: null,
      bottomTable_timeRight: null,
      bottomTableLeft_pickerOptions: {
        disabledDate: (time) => {
          if (this.bottomTable_timeRight) {
            return time.getTime() >= this.bottomTable_timeRight.valueOf();
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      bottomTableRight_pickerOptions: {
        disabledDate: (time) => {
          if (this.bottomTable_timeLeft) {
            return time.getTime() <= this.bottomTable_timeLeft.valueOf();
          }
        },
      },
      bottomTableValue: false,
      bottomTableOptions: [
        { value: false, label: "自定义" },
        { value: 1, label: "昨天" },
        { value: 7, label: "最近7天" },
        { value: 30, label: "最近30天" },
      ],
      bottomTableType_liColor: 0,
      bot_TabtypeArr: ["视频课程", "专栏", "模拟考卷"],
      // 底部表格数据
      tableData: [],
      TotalRows: 0, //底部数据条数
      currentpage: 1, //底部页数
      //提现弹框
      withdrawDepositStep: 0, //0-提现 1-处理中 2-未到提现时间
      setbillmessage: null, //提现信息90
      qushidata: [], //趋势图数据
    };
  },
  created() {
    //头部基础数据与用户信息
    this.GetPageList();
    request({
      url: "user/userView",
      data: {
        czz_id: JSON.parse(localStorage.getItem("user")).id,
      },
    }).then((res) => {
      this.userAllMsg = res.data.data;
    });
  },
  mounted() {
    // 底部表格数据
    this.pushBotTable();
    // 数据图表
    this.qushi();
  },
  filters: {
    local(v) {
      return `¥ ${(+v).toLocaleString()}`;
    },
  },
  methods: {
    //截取卡号
    lastBankCard() {
      if (this.bankMsg.yh_account) {
        let length = this.bankMsg.yh_account.length;
        let newStrAccount = this.bankMsg.yh_account.slice(length - 4, length);
        return newStrAccount;
      }
    },
    //1-1.请求基本数据
    GetPageList(pages) {
      this.currentpage = pages ? pages : 1;
      request({
        url: "withdrawal/incomeMsg",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
        },
      }).then((res) => {
        let { day_income, djs_income, withdrawal, tx_state, withdrawalinfo } =
          res.data;
        this.day_moneyDatas = { day_income, djs_income, withdrawal };
        this.bankMsg = res.data.data;
        this.withdrawDepositStep = tx_state;
        this.setbillmessage = withdrawalinfo;
      });
    },
    //-----1-2.提现记录----
    // 提现记录-数据表格请求
    requestTableData() {
      request({
        url: "withdrawal/withdrawalLog",
        data: {
          page: this.withdrawTableCurrentpage,
          limit: 10,
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: this.WithdrawalRecord_stateSelection, //时间段
        },
      }).then((res) => {
        this.withdrawTableData = res.data.data;
        this.withdrawTableTotalRows = res.data.count;
      });
    },
    //打开提现记录
    clickOpenWithDrawal() {
      this.showWithdrawalRecord = true;
      this.requestTableData();
    },
    // 分页变化
    clickPageChange(num) {
      let page = this.withdrawTableCurrentpage + num;
      if (0 < page && page <= Math.ceil(this.withdrawTableTotalRows / 10)) {
        this.withdrawTableCurrentpage = page;
        this.requestTableData();
      }
    },
    //---1-3.点击提现---
    clickWithDrawDeposit() {
      if (this.bankMsg.id) {
        // 开启提现
        this.$refs.refwithDraw.showDeposit = true;
      } else {
        // 开启绑定银行卡
        this.showNoBankCard = true;
      }
    },
    //---2.点击银行卡----------!-?-!---
    //打开验证弹框
    openAuthCode(tf) {
      this.$refs.refverification.showVerification = tf;
    },
    //打开绑定弹框
    openBankCard(tf) {
      this.$refs.refBankform.showBindBankCard = tf;
    },
    // 验证码后返回
    returnCode() {
      console.log("第一成");
      this.openAuthCode(false);
      this.openBankCard(true);
    },
    //确认-选择绑定银行卡
    bindBankCard() {
      if (this.bankMsg.id) {
        this.openAuthCode(true);
      } else {
        this.openBankCard(true);
      }
      Promise.resolve().then((_) => {
        this.showNoBankCard = false;
      });
    },
    // 更换银行卡
    ghyhk() {
      this.showNoBankCard = true;
    },
    //点击银行卡
    clickBankCard() {
      if (this.bankMsg.id) {
        this.$message.info("已绑定过银行卡");
        return;
      }
      console.log(this.$refs.refBankform.showBindBankCard);
      // this.$refs.refBankform.showBindBankCard = true;
      // 开始绑定流程
      this.openBankCard(true);
    },
    //---3.底部表格选项---
    // 请求底部表格数据
    pushBotTable() {
      request({
        url: "withdrawal/allIncome",
        data: {
          page: this.currentpage,
          limit: 10,
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          time_start: this.bottomTable_timeLeft,
          time_end: this.bottomTable_timeRight,
        },
      }).then((res) => {
        this.TotalRows = res.data.count;
        this.tableData = res.data.data;
      });
    },
    //底部表格条件切换
    changeBotTablSelect() {
      if (this.bottomTableValue) {
        let date = new Date(new Date().toLocaleDateString());
        console.log(date.valueOf());
        let oldDate = new Date(
          date.getTime() - 3600 * 1000 * 24 * this.bottomTableValue
        );
        this.bottomTable_timeLeft = oldDate;
        this.bottomTable_timeRight = date;
        //请求表格数据
        this.pushBotTable();
      }
    },
    changeBotTimePicker() {
      this.bottomTableValue = false;
      let isOK = false;
      if (
        this.bottomTable_timeLeft == null &&
        this.bottomTable_timeRight == null
      )
        isOK = true;
      if (this.bottomTable_timeLeft && this.bottomTable_timeRight) isOK = true;
      if (isOK) {
        // 发送请求
        this.pushBotTable();
      }
    },
    goPage(num, status) {
      if (status) {
        this.currentpage += num;
        // 数据请求
        this.pushBotTable();
      }
    },
    exportExcel() {
      if (this.tableData.length > 0) {
        window.location.href =
          "https://bkmcsapi.heyhui.com/teacher/Withdrawal/expole?limit=" +
          10 +
          "&page=" +
          this.currentpage +
          "&czz_id=JSON.parse(localStorage.getItem('user')).id";
      } else {
        this.$message.error("当前表格数据为空，不可导出");
      }
    },
    //收益趋势-图表
    qushi() {
      this.qushidata = [];
      request({
        url: "Withdrawal/inCome_icon",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          day: this.earningsTableValue,
        },
      }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          var arr = [res.data.data[i].date, res.data.data[i].data];
          this.qushidata.push(arr);
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("box1"));
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#C8C8D3", //更改坐标轴文字颜色
                fontSize: 14, //更改坐标轴文字大小
              },
            },
            axisLine: {
              lineStyle: {
                color: "#F5F5FA", //更改坐标轴颜色
              },
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#C8C8D3", //更改坐标轴文字颜色
                fontSize: 14, //更改坐标轴文字大小
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#F5F5FA", //更改坐标轴颜色
              },
            },
          },
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 0,
                lt: 8,
                color: "#FF6246",
              },
            ],
          },
          //数据设置
          series: [
            {
              showSymbol: false,
              lineWidth: 2,
              type: "line",
              smooth: true, // 是否显示平滑曲线
              symbol: "emptyCircle", // 拐点设置为实心圆点
              lineStyle: {
                //折线设置，颜色与线宽
                color: "#FF6246",
                width: 3,
              },
              markLine: {
                symbol: ["none", "none"],
                label: { show: true },
              },
              borderWidth: 1,
              areaStyle: {
                normal: {
                  //右，下，左，上
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#FF6246",
                      },
                      {
                        offset: 1,
                        color: "#ffffff",
                      },
                    ],
                    false
                  ),
                },
              },
              data: this.qushidata,
            },
          ],
          tooltip: {
            show: true,
            trigger: "axis", //触发表格类型
            axisPointer: {
              // 坐标轴指示器配置项。
              type: "line", // 'line' 直线指示器
              axis: "auto", // 指示器的坐标轴。
              snap: true, // 坐标轴指示器是否自动吸附到点上
              //指示线设置
              lineStyle: {
                color: "#CECECE",
                width: 1,
                // type: "line",
                type: "dashed",
              },
            },
            renderMode: "html",
            // backgroundColor: "#9E9EA6", //背景颜色
            padding: 5, // 提示框浮层内边距，
            // extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);", // 额外附加到浮层的 css 样式
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
            formatter: function (params) {
              return `<p style="font-size:12px;">${params[0].data[0]}</p>¥${params[0].data[1]}`;
            },
            position: "top",
          },
        });
      });
    },
  },
  components: { BankcardWithdraw, Bankform, Verification },
};
</script>

<style scoped lang="scss">
.drawMoney {
  min-width: 1200px;
  ::v-deep .el-dialog {
    border-radius: 12px;
  }
  .drawHistory {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 33px;
    color: #37373b;
    opacity: 1;
    margin-left: 3%;
  }

  ::v-deep .el-dialog__header {
    padding-top: 40px !important;
    border-bottom: 1px solid #f5f5fa;
    padding-bottom: 26px !important;
  }

  ::v-deep .el-dialog__headerbtn {
    top: 40px;
  }

  ::v-deep .el-dialog__body {
    padding-top: 30px;
    padding-left: 3%;
    padding-right: 3%;
  }

  .picker {
    width: 148px !important;
    border-radius: 8px !important;
  }

  .drawBox {
    display: flex;
    align-items: center;

    .drawStatus {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: #9e9ea6;
      white-space: nowrap;
      opacity: 1;
      margin: 0 24px 0 40px;
    }

    .statusSelect {
      width: 178px;
      height: 45px;
      margin-right: 40px;
    }
  }

  ::v-deep thead tr th {
    background: #f5f5fa;
    opacity: 1;
    height: 71px;
    // text-align: center;
  }

  ::v-deep .cell {
    font-size: 14px;
    font-family: PingFang PingFang SC-Regular;
    font-weight: 400;
    line-height: 20px;
    color: #68686f;
    opacity: 1;
  }
}

.green {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #1fcd81;
  opacity: 1;
}

.nr {
  width: 100%;
  height: 100%;
  font-family: PingFang SC;
}

.el-card {
  height: 150px;
  border-radius: 10px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  border: none;
}

.box-card {
  width: 100%;
  height: 100%;
  display: flex;
  // margin-top: 12px;
  justify-content: space-between;
  //align-items: center;
}

.box-card1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .card-right_tx {
    color: #9e9ea6;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
  }
}
.card-left {
  width: 70%;
  height: 100%;
}
.span_lastDayMoney {
  margin-left: 10px;
  color: #37373b;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 600;
}
.card-left_divdjs {
  font-size: 14px;
  color: #9e9ea6;
  display: flex;
  margin: 12px 0px 18px;
  line-height: 20px;
  align-items: center;
  .show_tishi {
    cursor: pointer;
    position: relative;
    line-height: 20px;
    .img_question {
      width: 14px;
      margin-top: 4px;
      margin-left: 8px;
    }
    .show_tishi_box {
      display: none;
      position: absolute;
      top: 100%;
      left: 0%;
      .slot_zi {
        width: 10vw;
        min-width: 50px;
        padding: 10px 12px;
        line-height: 20px;
        box-shadow: 0px 0px 6px rgba(190, 190, 190, 0.4);
        color: #707070;
        background-color: white;

        font-size: 12px;
      }
      .zi_shan {
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom: 10px solid #f5f5f5;
        margin-left: 7px;
        margin-top: -10px;
        position: relative;
      }
      .zi_shan::after {
        content: "";
        position: absolute;
        border: 8px solid transparent;
        border-bottom: 8px solid white;
        z-index: 16;
        top: -5px;
        left: -8px;
      }
    }
  }
  .show_tishi:hover .show_tishi_box {
    display: block;
  }
}
.card-right {
  // width: 30%;
  height: 100%;
}
.card-right div {
  display: flex;
  align-items: center;
}
.div_isOkMoney {
  display: flex;
  align-items: center;
  > div {
    color: #ff7e67;
    font-weight: 600;
    font-size: 16px;
    margin-left: 20px;
    user-select: none;
    cursor: pointer;
  }
}
#el-card {
  width: 100%;
  height: 410px;
}

.card_nr {
  width: 100%;
  height: 100%;
  .card_nr_top {
    display: flex;
    justify-content: space-between;
    .card_nr_left {
      font-size: 20px;
      color: #373738;
      font-weight: bold;
      margin: 4px 12px;
    }
    .qushi_select {
      width: 120px;
      margin: 4px 12px;
    }
  }
}

#el-card1 {
  width: 100%;
  min-width: 410px;
  height: 410px;
}
.card-left1 {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .card-left1_top {
    width: 100%;
    text-indent: 10px;
    color: #333333;
    font-size: 20px;
    font-weight: bold;
  }
  .card-left1_center {
    width: 100%;
    max-width: 385px;
    font-family: PingFang SC;
    height: 243px;
    background: url("~@/assets/yhkbj.png") no-repeat;
    background-size: 100% 100%;
    margin: 20px auto 0px;
    cursor: pointer;
    text-align: center;
    position: relative;
    h3 {
      font-size: 30px;
      font-weight: 600;
      color: #ffffff;
      margin-top: calc(120px - 15px);
    }
    .card-left1_userTitle {
      display: flex;
      text-align: left;
      font-size: 14px;
      position: absolute;
      white-space: nowrap;
      left: 65px;
      bottom: 40px;
      .user_title {
        margin-right: 40px;
        color: white;
        > p:nth-child(1) {
          line-height: 20px;
          opacity: 0.6;
        }
        > p:nth-child(2) {
          line-height: 20px;
          font-weight: 600;
        }
      }
    }
  }
  .card-left1_centerNone {
    width: 100%;
    max-width: 385px;
    font-family: PingFang SC;
    height: 243px;
    background: url("~@/assets/weitianjia.png") no-repeat;
    background-size: 100% 100%;
    margin: 20px auto 0px;
    cursor: pointer;
    text-align: center;
    user-select: none;

    line-height: 243px;
    > h3 {
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
    }
  }
}

.card-left1_center_yhk {
  width: 100%;
  opacity: 1;
  border-radius: 12px;
}

.card-left1_center_nr {
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 20%;
  font-size: 29px;
}

.card-left1_center_xx_ckr {
  position: absolute;
  top: 65%;
  left: 20%;
  line-height: 1.5em;
}

.card-left1_center_xx_ssh {
  position: absolute;
  top: 65%;
  left: 40%;
  line-height: 1.5em;
}

.ghyhk {
  width: 100%;
  max-width: 360px;
  height: 46px;
  border-radius: 12px;
  background: #f7f7f7;
  margin: 10px auto 0px;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
}

#el-card2 {
  width: 100%;
  height: 100%;
  ::v-deep .el-card__body {
    padding: 0 !important;
  }
}

.box-card2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  .box-card2_top {
    padding-left: 48px;
    height: 74px;
    line-height: 74px;
    font-size: 20px;
    margin-bottom: 20px;
    color: #373738;
    font-weight: bold;
    border-bottom: 1px solid #f5f5fa;
  }
  .box-card2_center {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 48px;
    .box-card2_centerTop_left {
      display: flex;
      align-items: center;
      .box-card2_tableType {
        display: flex;
        border-radius: 4px;
        overflow: hidden;
        li {
          width: 112px;
          height: 40px;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          color: #717377;
          background: #f5f5fa;
          user-select: none;
          cursor: pointer;
        }
        .liColor {
          background: #ff6246;
          color: white;
        }
      }
      .box-card2_center_selectTime {
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: #9e9ea6;
        margin-left: 64px;
      }
      .riqi_slect {
        width: 140px;
        height: 40px;
        margin: 0px 24px;
      }
      .box-card2_center_spango {
        margin: 0 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: #9e9ea6;
        opacity: 1;
      }
    }
  }
  .box-card2_bot {
    padding-top: 10px;
    width: calc(100% - 100px);
    margin-left: 48px;
    .car2_bot_paging {
      margin-top: 29px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > p {
        margin-left: 32px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 18px;
        color: #9e9ea6;
        opacity: 1;
      }
    }
  }
}
.tablePage {
  width: 80px;
  height: 40px;
  border: 1px solid #e7e7e7;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  font-size: 14px;
  color: #505050;
  user-select: none;
}
.jine .el-input__inner {
  border-top: none !important;
  border-left: none;
  border-right: none;
}

.txjl_top {
  display: flex;
  align-items: center;
  //   justify-content: space-between;
}

@import url("./czsy.scss");
.input ::v-deep input {
  background: #f5f5fa;
  border-radius: 5px;
  border: none;
}

.upload2 {
  margin-left: 14px;
}

.daochu {
  color: #3c52e0;
  cursor: pointer;
}

.daochu:hover {
  color: #7384f3;
}

.daochu:focus {
  color: #2439c5 !important;
}

::v-deep .el-select,
.el-date-editor {
  width: 100%;
  height: 45px;
}

::v-deep .el-date-editor input {
  padding-left: 20px;
}

::v-deep .el-date-editor {
  width: 148px !important;
}

::v-deep .el-input__prefix {
  left: 80% !important;
}
::v-deep .el-table__header {
  border-radius: 11px 11px 0px 0px;
  overflow: hidden;
}

::v-deep .el-pager li {
  width: 40px;
  height: 40px;
  background: #ffeae2;
  opacity: 1;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
}

.yellow {
  color: white !important;
  background: #ff6246 !important;
}

.point {
  cursor: pointer;
}

.active {
  background: #3c52e0 !important;
  color: #fff !important;
}

::v-deep .el-button {
  &:hover {
    background: none;
  }
}

::v-deep .echart-tooltip-wrap {
  background-color: #0a3f54;
  padding: 12px/0.833;
  display: inline-block;
  transform: scale(0.833);
  transform-origin: 0% 0%;
}
::v-deep .el-icon-plus {
  margin-bottom: 0 !important;
  font-size: 55px !important;
}

.gray {
  background: #c8c8d3;
  color: white;
}

.dis {
  ::v-deep .el-button:focus,
  .el-button:hover {
    background: #c8c8d3 !important;
    border: none !important;
  }
}

.banMsk {
  span {
    display: block;
    line-height: "" !important;
    margin-top: 30px;
  }
}
.div_noBankBut {
  width: 100%;
  display: flex;
  margin-top: 40px;
  justify-content: center;
}
.isokBut {
  background-color: #ff6246;
  color: white;
}
.isnoBut {
  border: 1px solid #e1e3e9;
}
.isnoBut:hover {
  color: white;
  border: 1px solid #ff6246;
  background-color: #ff6246;
}
.footer_button {
  width: 120px;
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  margin: 0px 10px;
}
@media screen and (max-width: 1640px) {
  .riqi {
    margin: 0px !important;
  }
  .daochu {
    margin-left: 0px !important;
  }
}
</style>
