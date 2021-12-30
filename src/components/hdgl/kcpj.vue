<template>
  <div class="nr">
    <div class="nr_top">
      <div class="nr_top_title">课程评价</div>
      <div class="nr_top_cha">
        <el-input
          placeholder="搜索已发布课程"
          suffix-icon="el-icon-search"
          id="input1"
          v-model="inputSearch"
          @input="searchAppraise()"
        >
        </el-input>
      </div>
    </div>
    <div class="nr_bottom">
      <el-form style="background-color: #ffffff" @submit.native.prevent>
        <div class="nr_top_bg">
          <div class="div_nr_button">
            <button
              v-for="(item, index) in buttonOptions"
              :key="index"
              @click="quan(index)"
              :class="activeName == index ? 'nr_button_click' : ''"
            >
              {{ item }}
            </button>
          </div>
          <div>
            <el-select
              v-model="valueTime"
              class="xz"
              placeholder="请选择"
              @change="GetPageList()"
              style="width: 124px !important"
            >
              <el-option
                v-for="item in optionsTime"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="courseValue"
              class="xz"
              placeholder="请选择"
              @change="GetPageList()"
              style="width: 176px !important; margin-right: 0px"
            >
              <el-option
                v-for="item in courseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 评论展示 -->
        <div class="nr_beijing" v-if="tabledata.length != 0">
          <div v-for="(item, index1) in tabledata" :key="index1">
            <div class="nr_top_nr" slot="reference">
              <div class="nr_top_nr_left">
                <div class="nr_top_nr_left_tx">
                  <el-avatar :src="item.himg"></el-avatar>
                </div>
                <div class="nr_top_nr_left_pj">
                  <div class="nr_top_nr_left_pj_top">
                    <div class="nr_top_nr_left_pj_top_name">
                      {{ item.nickname }}
                    </div>
                    <div
                      class="nr_top_nr_left_pj_top_pf"
                      style="margin-left: 16px"
                    >
                      <el-rate
                        v-model="item.branch"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}分"
                      >
                      </el-rate>
                    </div>
                  </div>
                  <!-- 用户评论 -->
                  <div class="nr_top_nr_left_pj_center">
                    {{
                      item.pinglun ? item.content : cutOutComment(item.content)
                    }}
                    <div
                      class="div_unfold_pj"
                      v-show="
                        cutOutComment(item.content).length < item.content.length
                      "
                      @click="item.pinglun = !item.pinglun"
                    >
                      {{ item.pinglun ? "收起评论" : "展开评论" }}
                      <i class="el-icon-arrow-down" v-show="!item.pinglun"></i>
                      <i class="el-icon-arrow-up" v-show="item.pinglun"></i>
                    </div>
                  </div>
                  <!-- 评论选项 -->
                  <div class="di">
                    <div class="nr_top_nr_left_pj_bottom">
                      <div class="nr_top_nr_left_pj_bottom_time">
                        {{ item.add_time }}
                      </div>
                      <div
                        class="nr_top_nr_left_pj_bottom_hf"
                        style="margin-left: 24px"
                        @click.stop="clickReplyMessage(item.id)"
                      >
                        回复
                      </div>
                      <div
                        class="nr_top_nr_left_pj_bottom_hf pj_hover_show"
                        style="margin-left: 20px"
                        @click="clickDeleteMessage(item.id)"
                      >
                        删除
                      </div>
                      <div
                        class="nr_top_nr_left_pj_bottom_hf pj_hover_show"
                        style="margin-left: 20px"
                        @click="clickReportMessage(item.id)"
                      >
                        举报
                      </div>
                    </div>
                  </div>
                  <!-- 添加回复评论 -->
                  <div
                    class="hfnr"
                    v-show="nowReply == item.id"
                    @click.stop="setClickId(item.id)"
                  >
                    <el-input
                      class="textarea"
                      type="textarea"
                      v-model="replyText"
                      maxlength="500"
                      ref="reply"
                      resize="none"
                      show-word-limit
                    >
                    </el-input>
                    <button
                      class="hfnr_div_button"
                      @click.prevent="submitMessage(item.id)"
                    >
                      提交评论
                    </button>
                  </div>
                  <!-- 回复评论列表 -->
                  <div class="div_reply" v-if="item.is_hf == 1">
                    <div
                      class="hui"
                      v-for="(a, index) in item.hf"
                      :key="a.id"
                      v-show="item.showReplyList ? index >= 0 : index == 0"
                    >
                      <div class="wdhf">我的回复:</div>
                      <div
                        class="wdhf_text"
                        :style="
                          index == 0 ? ' border-top: 1px solid transparent' : ''
                        "
                      >
                        <p class="div_reply_hfnr">
                          {{ a.content }}
                        </p>
                        <div class="wdhf_div_timeAndDelate">
                          <span class="wdhf_span_time">{{ a.add_time }}</span>
                          <span
                            class="wdhf_span_delate"
                            @click="
                              clickDelateTeacherReply(index1, a.id, index)
                            "
                            >删除</span
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="lookMoreReply"
                      v-show="item.hf.length >= 2"
                      @click="item.showReplyList = !item.showReplyList"
                    >
                      {{ item.showReplyList ? "收起回复" : "查看更多" }}
                      <i
                        class="el-icon-arrow-down"
                        v-show="!item.showReplyList"
                      ></i>
                      <i
                        class="el-icon-arrow-up"
                        v-show="item.showReplyList"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nr_top_nr_right">
                <div class="nr_top_nr_right_left">
                  <div class="nr_top_nr_right_left_top">{{ item.title }}</div>
                  <div class="nr_top_nr_right_left_center">
                    {{
                      item.url_count > 1
                        ? "共" + item.url_count + "讲"
                        : item.time
                    }}
                  </div>
                  <div class="nr_top_nr_right_left_bottom">
                    {{ item.url_title }}
                  </div>
                </div>
                <div class="nr_top_nr_right_right">
                  <el-image
                    :src="item.img"
                    style="width: 116px; height: 71px; border-radius: 4px"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>

          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="this.currentpage"
            :page-size="this.pagesize"
            layout="total, prev, pager, next"
            :total="TotalRows"
            style="margin-top: 1%"
            class="fy"
          >
          </el-pagination>
        </div>
        <!-- 空图 -->
        <div class="nr_noWait" v-else>
          <img src="../../assets/images/placewait.png" alt="" />
          <p>暂时没有评价，不要着急，优秀的作品终会被人关注～</p>
        </div>
        <!-- 删除弹框-评论 -->
        <el-dialog
          title="删除提醒"
          :visible.sync="showDeleteDialog"
          width="560px"
        >
          <div class="div_isbody">删除后无法恢复，确定删除被选中的评论吗？</div>
          <span slot="footer" class="dialog-footer">
            <div class="div_isOK_button">
              <span class="spNo" @click="showDeleteDialog = false">取消</span>
              <span class="spOk" @click="isDeleteMessage()">确定</span>
            </div>
          </span>
        </el-dialog>
        <!-- 删除弹框-回复 -->
        <el-dialog
          title="删除提醒"
          :visible.sync="showDeleteReply"
          width="560px"
        >
          <div class="div_isbody">删除后无法恢复，确定删除被选中的回复吗？</div>
          <span slot="footer" class="dialog-footer">
            <div class="div_isOK_button">
              <span class="spNo" @click="showDeleteReply = false">取消</span>
              <span class="spOk" @click="isDeleteReply()">确定</span>
            </div>
          </span>
        </el-dialog>
        <!-- 举报弹框 -->
        <el-dialog
          title="请选择举报理由"
          :visible.sync="showReportDialog"
          width="560px"
          @close="closeReport()"
        >
          <div class="div_isbody">
            <el-radio
              v-for="(val, inde) in reportsArr"
              v-model="reportCheckList"
              :label="val"
              :key="inde"
              style="margin: 10px 20px"
              >{{ val }}</el-radio
            >
            <!-- 输入框 -->
            <el-input
              v-show="reportCheckList == '其他'"
              class="textarea"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              v-model="reportDescribe"
              ref="reply"
              resize="none"
              show-word-limit
              placeholder="请填写详细理由"
            >
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <div class="div_isOK_button">
              <span class="spNo" @click="showReportDialog = false">取消</span>
              <span class="spOk" @click="isReportMessage()">确定</span>
            </div>
          </span>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request/request";
import { EvaluateDelPing, EvaluateHfEvaluate } from "@/http/home/home";

export default {
  name: "kcpj",
  data() {
    return {
      tabledata: null, //评论总数据
      inputSearch: null, //当前搜索字段
      buttonOptions: ["全部评价", "已回复", "未回复"],
      activeName: 0, //当前切换按钮
      optionsTime: [
        {
          value: "",
          label: "全部时间",
        },
        {
          value: "day",
          label: "最近1天",
        },
        {
          value: "7day",
          label: "最近7天",
        },
        {
          value: "year",
          label: "最近1年",
        },
      ],
      valueTime: "", //当前选择时间
      courseOptions: [
        {
          value: "",
          label: "全部课程",
        },
      ],
      courseValue: "", //当前选择课程
      replyText: "", //回复文本
      nowReply: -1, //当前回复显示-隐藏
      replyId: 0, //当前操作的id
      showDeleteDialog: false, //删除弹框显隐
      showReportDialog: false, //举报弹框显隐
      showDeleteReply: false, //删除回复显隐
      delReplyObj: { bi: null, id: null, index: null }, //当前删除的回复消息
      reportCheckList: "", //选中的举报框
      reportsArr: [
        "广告",
        "色情",
        "诈骗",
        "政治",
        "刷屏",
        "引战",
        "人身攻击",
        "视频无关",
        "其他",
      ],
      reportDescribe: "", //举报输入文本
      img: "",
      currentpage: 1,
      pagesize: 10,
      TotalRows: 3,
      himg: "",
      nickname: "",
      content: "",
      add_time: "",
      url_title: "",
    };
  },
  created() {
    //加载评论数量
    this.anniu();
    //获取用户全部评论
    this.GetPageList();
    // 获取当前课程
    this.getCourse();
  },
  mounted() {
    document.addEventListener("click", () => {
      if (this.nowReply) this.nowReply = -1;
    });
  },
  methods: {
    // 截取评论
    cutOutComment(string, textWidth) {
      //获取字符串长度
      let newString = "";
      let amount = string.length;
      //容器宽
      let width = 600;
      if (textWidth) width = textWidth;
      //第几行省略
      let line = 2;
      //字体大小
      let fontsize = 14;
      let cutOutNumber = Math.floor((width * (line - 0.4)) / fontsize);
      if (amount <= cutOutNumber) {
        newString = string;
      } else {
        newString += string.slice(0, cutOutNumber) + "...";
      }
      return newString;
    },
    //点击固定区域，input不隐藏
    setClickId(id) {
      this.nowReply = id;
    },
    // ##获取请求##
    //评论请求
    GetPageList() {
      request({
        url: "Evaluate/allEvaluate",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          limit: this.pagesize,
          page: this.currentpage,
          is_hf: this.activeName == 0 ? -1 : this.activeName == 1 ? 1 : 0,
          keyword: this.inputSearch,
          id: this.courseValue,
          time: this.value,
        },
      }).then((res) => {
        let resArr = res.data.data || [];
        resArr.forEach((val) => {
          val.showReplyList = false;
        });
        this.tabledata = resArr;
        this.TotalRows = res.data.count;
        this.anniu();
      });
    },
    // 课程请求
    getCourse() {
      request({
        url: "Evaluate/get_Course",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
        },
      }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          var obj = {
            value: res.data.data[i].id,
            label: res.data.data[i].title,
          };
          this.courseOptions.push(obj);
        }
      });
    },
    //评价-显示数量
    anniu() {
      request({
        url: "evaluate/evaluate_num",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
        },
      }).then((res) => {
        let arr = ["全部评价", "已回复", "未回复"];
        this.$set(
          this.buttonOptions,
          0,
          res.data.all_count > 0 ? arr[0] + res.data.all_count : arr[0]
        );
        this.$set(
          this.buttonOptions,
          1,
          res.data.all_count > 0 ? arr[1] + res.data.yhf_count : arr[1]
        );
        this.$set(
          this.buttonOptions,
          2,
          res.data.all_count > 0 ? arr[2] + res.data.whf_count : arr[2]
        );
        // this.buttonOptions[0] =
        //   res.data.all_count > 0 ? arr[0] + res.data.all_count : arr[0];
        // this.buttonOptions[1] =
        //   res.data.all_count > 0 ? arr[1] + res.data.yhf_count : arr[1];
        // this.buttonOptions[2] =
        //   res.data.all_count > 0 ? arr[2] + res.data.whf_count : arr[2];
      });
    },
    // ##动态切换##
    //按钮切换
    quan(index) {
      this.activeName = index;
      this.GetPageList();
    },
    //评论查询
    searchAppraise() {
      if (this.inputSearch == "") this.inputSearch = null;
      this.GetPageList();
    },
    //提交评论
    async submitMessage(id) {
      if (this.replyText == "") {
        this.$message.error("回复不能为空");
        return;
      }
      const _ = await EvaluateHfEvaluate(id, this.replyText);
      if (_.st == 1) {
        this.GetPageList();
        this.$message.success("回复成功");
        this.replyText = "";
        this.nowReply = -1;
      }
    },
    //回复评论
    clickReplyMessage(id) {
      this.replyText = "";
      this.nowReply = id;
      this.$nextTick(() => {
        let input = document.querySelector(".hfnr textarea");
        input.focus();
      });
    },
    //删除评论
    clickDeleteMessage(id) {
      this.replyId = id;
      this.showDeleteDialog = true;
    },
    async isDeleteMessage() {
      const _ = await EvaluateDelPing(this.replyId);
      if (_.st == 1) {
        this.$message.success("删除成功");
        this.tabledata = this.tabledata.filter((_) => _.id != this.replyId);
        this.showDeleteDialog = false;
      }
    },
    //举报评论
    clickReportMessage(id) {
      this.replyId = id;
      this.showReportDialog = true;
    },
    isReportMessage() {
      console.log("确认举报-当前举报id为", this.replyId);
      if (this.reportCheckList.length == 0) {
        this.$message.warning("请选择举报理由!");
      } else if (
        this.reportCheckList == "其他" &&
        this.reportDescribe.length == 0
      ) {
        this.$message.warning("举报内容不得为空");
      } else {
        this.$message.success("举报成功!");
        this.showReportDialog = false;
      }
    },
    closeReport() {
      this.reportCheckList = "";
      this.reportDescribe = "";
    },
    // 删除老师回复的评论
    clickDelateTeacherReply(bi, id, index) {
      this.delReplyObj.bi = bi;
      this.delReplyObj.id = id;
      this.delReplyObj.index = index;
      this.showDeleteReply = true;
    },
    isDeleteReply() {
      let { bi, id, index } = this.delReplyObj;
      request({
        url: "Evaluate/delhf",
        data: {
          id,
        },
      }).then((res) => {
        if (res.data.st == 1) {
          this.$delete(this.tabledata[bi].hf, index);
          this.GetPageList();
          this.$message.success("回复已删除!");
          this.showDeleteReply = false;
        }
      });
    },
    //分页
    handleCurrentChange(e) {
      this.GetPageList(e);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-textarea .el-input__count {
  color: #767676;
}
.nr_noWait {
  width: 392px;
  height: 367px;
  margin: 64px auto;
  position: relative;
  text-align: center;
}
.nr_noWait > img {
  width: 100%;
  height: 100%;
}
.nr_noWait > p {
  position: absolute;
  bottom: 40px;
  left: 50%;
  white-space: nowrap;
  color: #999999;
  font-size: 18px;
  font-weight: 500;
  transform: translate(-50%, 0%);
}
.nr {
  width: 100%;
  font-family: PingFang SC;
}
.nr_top {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffffff;
}
.nr_top_title {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  justify-content: flex-start;
  padding-left: 2%;
  font-family: PingFang SC-Medium;
}
.nr_top_cha {
  padding-right: 2%;
  width: 303px;
}
.nr_bottom {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 1px !important;
  padding: 0 !important;
}
.nr_top_bg {
  height: 5%;
  padding: 1% 2%;
  display: flex;
  justify-content: space-between;
}
.div_nr_button > button {
  padding: 10px 14px;
  border-radius: 2px;
  background: #f5f5fa;
  color: #717377;
  cursor: pointer;
  font-size: 14px;
  margin-right: 24px;
}
.div_nr_button > button:hover {
  color: white;
  background: #ff7e67;
}
.nr_button_click {
  color: #ffffff !important;
  background: #ff7e67 !important;
}
.nr_beijing {
  width: 96%;
  padding: 1% 2%;
}
.nr_beijing > div:first-child {
  border-top: 1px solid #f4f4f4;
}
.nr_top_nr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 0px;
  border-bottom: 1px solid #f4f4f4;
}
.nr_top_nr:hover .pj_hover_show {
  opacity: 1;
}
.nr_top_nr_left {
  /* width: 80%; */
  height: 100%;
  display: flex !important;
  align-items: flex-start !important;
}
.nr_top_nr_left_tx {
  margin-top: 2px;
  height: 100%;
}
.nr_top_nr_left_pj {
  padding-left: 20px;
  width: 600px;
}

.nr_top_nr_left_pj_top {
  /* line-height: 2em; */
  display: flex;
  align-items: center;
}
.nr_top_nr_left_pj_top_name {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: #505050;
  opacity: 1;
}
.nr_top_nr_left_pj_center {
  width: 100%;
  /* height: 40px; */
  font-size: 14px;
  font-family: PingFang SC;
  color: #333435;
  line-height: 20px;
  padding: 10px 0px 10px;
  /* position: relative; */
}
.div_unfold_pj {
  /* position: absolute; */
  text-align: right;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #a8acbe;
  /* right: 0px; */
  /* bottom: -10px; */
  /* z-index: 12; */
  cursor: pointer;
  user-select: none;
}
.div_unfold_pj:hover {
  color: #7a83b9;
}

.nr_top_nr_left_pj_bottom {
  display: flex;
  align-items: center;
  line-height: 2em;
}

.nr_top_nr_right {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
}

.nr_top_nr_right_left {
  width: 60%;
}
.nr_top_nr_right_left_top {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 2em;
  color: #242424;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nr_top_nr_right_left_center {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 2em;
  color: #767676;
}

.nr_top_nr_right_left_bottom {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 2em;
  color: #767676;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nr_top_nr_left_pj_bottom_time {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #a5a6a7;
}
.nr_top_nr_left_pj_bottom_hf {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 17px;
  color: #a8acbe;
  cursor: pointer;
}
.nr_top_nr_left_pj_bottom_hf:hover {
  color: #7a83b9;
}
.pj_hover_show {
  opacity: 0;
  transition: all 0.3s;
}
.nr_top_nr_right_right {
  width: 40%;
  height: 67px;
  display: flex;
  justify-content: flex-end;
}
.hfnr {
  width: 100%;
  margin: 12px 0px;
  text-align: right;
}
.hfnr_div_button {
  padding: 4px 12px;
  border-radius: 2px;
  color: #ffffff;
  background: #f66246;
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px;
}
.hfnr_div_button:hover {
  background-color: #ff7e67;
}
.el-input__inner {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  color: #7a83b9;
  padding-left: 2%;
}
.textarea {
  color: #7a83b9;
}
.tijiao {
  background-color: #f66246;
  border: none;
  color: #ffffff;
  display: flex;
}
.di {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.div_reply {
  width: 100%;
  margin-top: 16px;
  text-align: center;
  position: relative;
}

.hui {
  text-align: left;
  font-family: PingFang SC;
  width: 100%;
  background-color: #fafafa;
  padding: 0px 12px 0px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
}
.wdhf {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  padding-top: 12px;
  margin-right: 5px;
}
.wdhf_text {
  padding: 11px 0px 16px;
  width: 100%;
  border-top: 1px solid #f4f4f4;
}
.div_reply_hfnr {
  font-size: 14px;
  line-height: 20px;
}
.wdhf_div_timeAndDelate {
  color: #a5a6a7;
  font-weight: 500;
  font-size: 12px;
  margin-top: 6px;
}
.wdhf_span_time {
  margin-right: 18px;
}
.wdhf_span_delate {
  cursor: pointer;
  user-select: none;
}
.wdhf_span_delate:hover {
  color: #7a83b9;
}
.lookMoreReply {
  position: absolute;
  font-size: 12px;
  font-family: PingFang SC;
  color: #a8acbe;
  right: 18px;
  bottom: 16px;
  cursor: pointer;
  user-select: none;
}
.lookMoreReply:hover {
  color: #ff6246;
}
.div_unfold_reply {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #a8acbe;
  text-align: right;
  cursor: pointer;
  user-select: none;
}
.fy {
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
}
.el-select {
  width: 130px !important;
  margin: 5px;
}

.xz .el-input--suffix {
  border-radius: 4px !important;
}
.div_isbody {
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 24px;
  color: #000000;
}
.div_isOK_button {
  user-select: none;
  white-space: unset !important;
  display: flex;
  justify-content: right;
  font-size: 14px;
  font-family: PingFang SC;
  text-align: center;
  line-height: 32px;
}
.div_isOK_button > span {
  width: 72px;
  height: 32px;
  border-radius: 2px;
  margin: 0px 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.div_isOK_button > .spOk {
  border: 1px solid #e7e7e7;
  background: #ffffff;
}
.div_isOK_button > .spNo {
  border: 1px solid #e7e7e7;
  background: #ffffff;
}
.div_isOK_button > .spOk:hover {
  background: #ff7e67;
  border: 1px solid transparent;
  color: #ffffff;
}
.div_isOK_button > .spNo:hover {
  background: #ff7e67;
  border: 1px solid transparent;
  color: #ffffff;
}
</style>