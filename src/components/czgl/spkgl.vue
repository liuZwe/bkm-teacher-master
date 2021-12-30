<template>
  <div class="nr">
    <div class="nr_bottom">
      <div class="nr_top">
        <div class="nr_top_title">视频课管理</div>
        <div class="nr_top_sou">
          <el-input
            placeholder="搜索已发布课程"
            suffix-icon="el-icon-search"
            id="input1"
            v-model="input"
            @input="cha()"
          >
          </el-input>
        </div>
      </div>
      <div class="nr_bottom_top">
        <div class="nr_bottom_top_left">
          <el-button
            v-for="(item, index) in btn"
            :key="index"
            @click="quan(index)"
            :class="[{ actives: activeName == index }]"
            >{{ item }}</el-button
          >
        </div>
        <div class="nr_bottom_top_right">
          <!-- 联级选择器 -->
          <el-cascader
            v-model="classValue"
            :options="classOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange()"
          ></el-cascader>

          <el-select
            v-model="value1"
            placeholder="请选择"
            @change="handleChange()"
          >
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-if="tableData.length != 0">
        <div class="nr_bottom_bottom" v-for="(item, i) in tableData" :key="i">
          <div class="nr_bottom_bottom_nr">
            <div class="nr_bottom_bottom_nr_left">
              <div class="nr_bottom_bottom_nr_left_left">
                <img :src="item.img" />
                <div class="ts" style="top: 70%" v-if="item.url_count == 1">
                  {{ item.course_time }}
                </div>
                <div class="ts" style="top: 70%" v-if="item.url_count > 1">
                  {{ item.url_count }}讲
                </div>
              </div>
              <div class="nr_bottom_bottom_nr_left_right">
                <!-- 标题 -->
                <div class="nr_bottom_bottom_nr_left_right_top">
                  {{ item.title }}
                </div>
                <div class="nr_bottom_bottom_nr_left_right_center">
                  <span v-for="(val, inde) in item.bq" :key="inde">{{
                    val
                  }}</span>
                </div>
                <div class="nr_bottom_bottom_nr_left_right_bottom">
                  <div class="nr_bottom_bottom_nr_left_right_bottom_title">
                    {{ item.add_time }}
                  </div>
                  <div class="nr_bottom_bottom_nr_left_right_bottom_tb">
                    <i class="iconfont">&#xe627;</i>
                    <span class="bot_number"> {{ item.bfl }}</span>
                  </div>
                  <div class="nr_bottom_bottom_nr_left_right_bottom_tb">
                    <i class="iconfont">&#xe637;</i>
                    <span class="bot_number"> {{ item.zan_num }}</span>
                  </div>
                  <div class="nr_bottom_bottom_nr_left_right_bottom_tb">
                    <i class="iconfont">&#xe670;</i>
                    <span class="bot_number"> {{ item.shoucang }}</span>
                  </div>
                  <div class="nr_bottom_bottom_nr_left_right_bottom_tb">
                    <i class="iconfont">&#xe674;</i>
                    <span class="bot_number"> {{ item.xiazai }}</span>
                  </div>
                  <div class="nr_bottom_bottom_nr_left_right_bottom_tb">
                    <i class="iconfont">&#xe633;</i>
                    <span class="bot_number"> {{ item.fenxiang }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="nr_bottom_bottom_nr_right">
              <!-- 错误提示 -->
              <span style="color: #12a2d7" v-if="item.status == 0">
                <img
                  src="../../assets/images/spkglImgs/audit.png"
                  style="
                    width: 14px;
                    height: 14px;
                    vertical-align: middle;
                    margin-right: 9px;
                  "
                />
                <span style="vertical-align: middle">审核中</span>
              </span>
              <span class="wtg" style="color: #ff6246" v-if="item.status == 2">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tixing"></use>
                </svg>
                未通过，稿件中存在问题，
                <el-popover
                  placement="bottom"
                  width="265"
                  trigger="hover"
                  :open-delay="200"
                  @show="isworing(item.id)"
                >
                  <div class="div_lockMore_hover">
                    <p>课程被退回原因如下:</p>
                    <!-- 回退原因 -->
                    <div
                      class="lockMore_list"
                      v-for="(vrea, irea) in reasonsForRejection"
                      :key="irea"
                    >
                      <div class="lockMore_body">
                        <i></i>
                        <p>{{ vrea.title }}</p>
                      </div>
                      <p>{{ vrea.jue_val }}</p>
                    </div>
                  </div>
                  <b style="color: #ff6246" slot="reference" class="wtg_a_more">
                    查看详情
                  </b>
                </el-popover>
              </span>
              <!-- 1.审核中 -->
              <div v-if="item.status == 0" class="nr_right_functions">
                <!-- 编辑课程 -->
                <!-- <div @click="jixu(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe60a;</i>
                  <span>编辑课程</span>
                </div> -->
              </div>
              <!-- 2.已通过审核 -->
              <div v-if="item.status == 1" class="nr_right_functions">
                <!-- 课程评价 -->
                <div @click="pingjia()" class="functions_button">
                  <i class="iconfont funicon">&#xe60e;</i>
                  <span>课程评价</span>
                </div>
                <!-- 课程数据 -->
                <div @click="shuju(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe605;</i>
                  <span>课程数据</span>
                </div>
                <!-- 编辑课程 -->
                <div @click="jixu(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe60a;</i>
                  <span>编辑课程</span>
                </div>
                <!-- 下架显示 -->
                <div class="functions_xiajia">
                  <i class="iconfont funicon">&#xe60f;</i>
                  <div style="height: 110%"></div>
                  <!-- 下架标签 -->
                  <div
                    class="div_xiajia"
                    @click="beginOut(item.id, item.title)"
                  >
                    <i class="iconfont funicon">&#xe608;</i>
                    <span>下架课程</span>
                  </div>
                </div>
              </div>
              <!-- 3.未通过审核 -->
              <div v-if="item.status == 2" class="nr_right_functions">
                <!-- 编辑课程 -->
                <div @click="jixu(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe60a;</i>
                  <span>重新编辑</span>
                </div>
                <!-- 删除课程 -->
                <div
                  v-show="item.statustype == '0'"
                  class="functions_button"
                  @click="beginDel(item.id)"
                >
                  <i class="iconfont funicon">&#xe60d;</i>
                  <span>删除课程</span>
                </div>
              </div>
              <!-- 4.草稿箱 -->
              <div v-if="item.status == 3" class="nr_right_functions">
                <!-- 编辑课程 -->
                <div @click="jixu(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe60a;</i>
                  <span>继续编辑</span>
                </div>
                <!-- 删除课程 -->
                <div
                  class="functions_button"
                  @click="beginDel(item.id)"
                  v-show="item.statustype == '0'"
                >
                  <i class="iconfont funicon">&#xe60d;</i>
                  <span>删除课程</span>
                </div>
              </div>
              <!-- 5.已下架item.status == 4 -->
              <div v-if="item.status == 4" class="nr_right_functions">
                <div class="functions_button" @click="repush(item.id)">
                  <i class="iconfont funicon">&#xe603;</i>
                  <span>重新发布</span>
                </div>
                <!-- 编辑课程 -->
                <div @click="jixu(item.id)" class="functions_button">
                  <i class="iconfont funicon">&#xe60a;</i>
                  <span>编辑课程</span>
                </div>
                <!-- 删除课程 -->
                <div class="functions_button" @click="beginDel(item.id)">
                  <i class="iconfont funicon">&#xe60d;</i>
                  <span>删除课程</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="this.currentpage"
          :page-size="this.pagesize"
          layout="total, prev, pager, next, jumper"
          :total="TotalRows"
          style="margin-top: 1%"
          class="fy"
        >
        </el-pagination>
      </div>
      <div v-else class="nr_noWait" v-show="!tabledata">
        <img src="../../assets/images/placewait.png" alt="" />
        <p>暂时还没有内容哦～</p>
      </div>
    </div>
    <!-- 下架弹框 -->
    <el-dialog title="下架提醒" :visible.sync="isXiaJia" width="560px">
      <div class="div_isbody">
        课程下架后将无法被更多用户搜索观看，不能再产生收益。确定要下架《{{
          nowOutvideo.title
        }}》？
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="div_isOK_button">
          <span class="spOk" @click="outVideo()">确定</span>
          <span class="spNo" @click="isXiaJia = false">取消</span>
        </div>
      </span>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog title="删除提醒" :visible.sync="isShanChu" width="560px">
      <div class="div_isbody">删除后无法恢复，确定删除视频课程吗？</div>
      <span slot="footer" class="dialog-footer">
        <div class="div_isOK_button">
          <span class="spOk" @click="delVideo()">确定</span>
          <span class="spNo" @click="isShanChu = false">取消</span>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../network/request/request.js";
import "../../assets/css/icon.css";
export default {
  name: "spkgl",
  data() {
    return {
      isXiaJia: false, //下架显示
      isShanChu: false, //删除显示
      //当前修改的视频信息
      nowOutvideo: {
        title: "",
        id: null,
      },
      input: "", //当前搜索框文字
      classOptions: [
        {
          value: "",
          label: "全部分类",
        },
      ],
      options1: [
        {
          value1: "",
          label1: "排序筛选",
        },
        {
          value1: "add_time",
          label1: "时间排序",
        },
        {
          value1: "bfl",
          label1: "播放量排序",
        },
        {
          value1: "shoucang",
          label1: "收藏数排序",
        },
        {
          value1: "zan_num",
          label1: "点赞数排序",
        },
      ],
      classValue: [""], //类型
      value1: "", //排序
      currentpage: 1, //页码
      pagesize: 10, //每页显示的数量
      TotalRows: 4, //总数据量
      reasonsForRejection: null, //拒绝理由
      tableData: [],
      title: "",
      add_time: "",
      bq: [],
      bfl: "",
      zan_num: "",
      shoucang: "",
      xiazai: "",
      fenxiang: "",
      url_count: "",
      course_time: "",
      img: "",
      data: "",
      jue_val: "",
      idid: "",
      btn: [],
      activeName: 0,
    };
  },
  created() {
    this.fenlei();
  },
  mounted() {
    this.pushAllCourse();
  },
  methods: {
    // A-通用改变请求数据
    pushAllCourse(obj) {
      let data = {
        czz_id: JSON.parse(localStorage.getItem("user")).id,
        limit: this.pagesize,
        page: this.currentpage,
        status: this.activeName,
        class: this.classType,
        order: this.value1,
        keyword: this.input,
        ...obj,
      };
      request({
        url: "course/allCourse",
        data,
      }).then((res) => {
        this.tableData = res.data.data; //请求的数据
        this.TotalRows = res.data.count; //数据条数
        let arr = [];
        arr[0] = res.data.tj.count != 0 ? "全部 " + res.data.tj.count : "全部";
        arr[1] =
          res.data.tj.shz_count != 0
            ? "审核中 " + res.data.tj.shz_count
            : "审核中";
        arr[2] =
          res.data.tj.tg_count != 0
            ? "已过审 " + res.data.tj.tg_count
            : "已过审";
        arr[3] =
          res.data.tj.wtg_count != 0
            ? "未过审 " + res.data.tj.wtg_count
            : "未过审";
        arr[4] =
          res.data.tj.cgx_count != 0
            ? "草稿箱 " + res.data.tj.cgx_count
            : "草稿箱";
        arr[5] =
          res.data.tj.xj_count != 0
            ? "已下架 " + res.data.tj.xj_count
            : "已下架";
        this.btn = arr;
      });
    },
    // B-请求分类数据
    fenlei() {
      request({
        url: "course/getcoursecate",
      }).then((res) => {
        let arr = res.data.data;
        this.classOptions = [...this.classOptions, ...arr];
      });
    },
    // C-分类变化
    handleChange() {
      this.pushAllCourse();
    },
    // 1-0 开始收集下架信息
    beginOut(id, val) {
      this.nowOutvideo.id = id;
      this.nowOutvideo.title = val;
      this.isXiaJia = true;
    },
    //1-1 确认-下架视频
    outVideo() {
      // 开始下架步骤
      console.log("当前视频信息:", this.nowOutvideo);
      request({
        url: "course/delCourse",
        data: {
          id: this.nowOutvideo.id,
          status: 4,
        },
      }).then((res) => {
        console.log(res, "下架");
        this.pushAllCourse();
        this.isXiaJia = false;
        this.$message.success("下架成功!");
      });
    },
    // 2-0 开始收集删除信息
    beginDel(id) {
      this.nowOutvideo.id = id;
      this.isShanChu = true;
    },
    // 2-1  确认-删除视频
    delVideo() {
      console.log("当前删除视频", this.nowOutvideo.id);
      request({
        url: "course/delCourse",
        data: {
          id: this.nowOutvideo.id,
          status: -1,
        },
      }).then((res) => {
        console.log(res, "删除");
        this.pushAllCourse();
        this.isShanChu = false;
        this.$message.success("课程删除成功!");
      });
    },
    // 3-0 重新发布
    repush(id) {
      request({
        url: "course/delCourse",
        data: {
          id: id,
          status: 1,
        },
      }).then((res) => {
        console.log(res, "上架");
        this.pushAllCourse();
        this.$message.success("上架成功!");
      });
    },
    // 4-0 按钮切换显示课程
    quan(index) {
      this.activeName = index;
      this.currentpage = 1;
      this.pushAllCourse();
    },
    //5-0跳转下一页
    handleCurrentChange(e) {
      this.currentpage = e;
      this.pushAllCourse();
    },
    //6-0 视频稿件错误原因-请求
    isworing(id) {
      // console.log("当前错误id", id);
      request({
        url: "course/juView",
        data: {
          id,
        },
      }).then((res) => {
        // console.log(res.data.data);
        this.reasonsForRejection = res.data.data;
      });
    },
    //7-0 查询当前用户输入字段
    cha() {
      //获取当前标题
      this.pushAllCourse();
    },
    shuju(id) {
      this.$router.push({ path: "/sjfx", query: { id } });
    },
    jixu(id) {
      this.$router.push({ name: "kcfb", query: { id } });
    },
    pingjia() {
      this.$router.push({ path: "/kcpj" });
    },
  },
  computed: {
    classType() {
      return this.classValue[this.classValue.length - 1];
    },
  },
};
</script>

<style scoped>
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
.funicon {
  margin-right: 2px;
}
.nr {
  width: 100%;
}

.nr_bottom {
  width: 96%;
  /* height: 100%; */
  border-radius: 10px;
  /* margin-top: 16px; */
  background-color: white;
  padding: 1% 2%;
}
.nr_top {
  width: 96%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  border-bottom: 1px solid #f4f4f4;
}
.nr_top_title {
  font-size: 18px !important;
  font-family: PingFang SC-medium;
  font-weight: 600;
  line-height: 70px;
  color: #000000;
  display: flex;
  justify-content: left;
}

.nr_top_sou {
  width: 303px;
  padding-right: 1%;
}
.nr_bottom_top {
  min-width: 930px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nr_bottom_top_left {
  padding: 2% 0;
}

.nr_bottom_top_right {
  padding: 2% 0;
}

/*.nr_bottom_bottom {*/
/*    padding:0 2%;*/
/*}*/

.nr_bottom_bottom_nr {
  position: relative;
  margin-top: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 25px;
  border-bottom: 1px solid #f4f4f4;
}

.nr_bottom_bottom_nr_left {
  display: flex;
}

.nr_bottom_bottom_nr_left_left {
  width: 156px;
  height: 88px;
  border-radius: 7px;
  position: relative;
}
.nr_bottom_bottom_nr_left_left > img {
  width: 156px;
  height: 88px;
  border-radius: 7px;
}

.nr_bottom_bottom_nr_left_right {
  margin-left: 7%;
}

.nr_bottom_bottom_nr_left_right_top {
  line-height: 2em;
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 600;
  color: #212121;
  /*max-width: 200px;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
}

.nr_bottom_bottom_nr_left_right_center {
  line-height: 3em;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #505050;
  width: 360px;
  /* display: flex; */
}
.nr_bottom_bottom_nr_left_right_center > span {
  background: #f7f7f7;
  line-height: 25px;
  height: 25px;
  border-radius: 13px;
  margin-right: 12px;
  padding: 4px 8px;
  user-select: none;
  white-space: nowrap;
}

.nr_bottom_bottom_nr_left_right_bottom {
  /* width: 320px; */
  display: flex;
  align-items: center;
  line-height: 2em;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #99a2aa;
}
.nr_bottom_bottom_nr_left_right_bottom_title {
  /* max-width: 160px; */
  font-size: 12px;
  white-space: nowrap;
  margin-right: 10px;
  color: #2d2d2d;
}
.nr_bottom_bottom_nr_left_right_bottom_tb {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  /* margin-left: 25px; */
  /* text-align: center; */
}
.nr_bottom_bottom_nr_left_right_bottom_tb i {
  font-size: 12px;
  vertical-align: middle;
}
.nr_bottom_bottom_nr_left_right_bottom_tb span {
  font-size: 12px;
  vertical-align: middle;
}
.bot_number {
  padding-left: 4px;
}
.ts {
  height: 18px;
  line-height: 18px;
  padding: 0px 5px;
  background-color: #000000;
  opacity: 0.56;
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
}
.fy {
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  padding-bottom: 50px;
}
.el-select {
  width: 130px;
  margin: 5px;
}
.nr_bottom_bottom_nr_right {
  display: flex;
  align-items: center;
}
.nr_bottom_bottom_nr_right > span {
  white-space: nowrap;
  margin-right: 12px;
  font-size: 14px;
}
.nr_right_functions {
  display: flex;
}
.functions_button {
  height: 32px;
  font-family: PingFang SC;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  font-size: 13px;
  color: #666666;
  line-height: 32px;
  padding: 0px 12px;
  user-select: none;
  cursor: pointer;
  margin: 0px 0px 0px 12px;
  display: flex;
  align-items: center;
}
.functions_button:hover {
  background: #ffa07b;
  color: #ffffff;
  border: 1px solid transparent;
}
.functions_button span {
  display: inline-block;
  white-space: nowrap;
  font-size: 13px;
  /* vertical-align: middle; */
}
.functions_button img {
  width: 14px;
  height: 14px;
  /* vertical-align: middle; */
  margin-right: 6px;
}
.functions_xiajia {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin-left: 24px;
}
.functions_xiajia > i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.functions_xiajia:hover {
  color: white;
  background: #ffa07b;
  border: 1px solid #ff6246;
}
.functions_xiajia:hover .div_xiajia {
  display: block;
}
.div_xiajia {
  color: #666666;
  position: absolute;
  width: 150px;
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(88, 88, 88, 0.16);
  border-radius: 4px;
  top: 110%;
  right: 0px;
  display: none;
  text-align: center;
  line-height: 40px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-family: PingFang SC;
  font-size: 12px;
}

.div_xiajia:hover {
  color: #ff6246;
}

.nr_bottom_bottom_nr_right div .el-button {
  margin: 5px;
}
.nr_bottom_top_left .el-button {
  background-color: #f5f5fa;
  border: none;
}
.active_btn {
  background-color: #ff7e67;
  color: white;
}
.wtg.el-popover {
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 400;
  background-color: #e5e5e5 !important;
}
.wtg_a_more {
  position: relative;
  font-family: PingFang SC;
  cursor: pointer;
  text-decoration: underline;
  user-select: none;
}
.div_lockMore_hover {
  font-family: PingFang SC;
  border-radius: 4px;
}
.div_lockMore_hover > p {
  line-height: 20px;
  color: #666666;
  height: 20px;
  font-size: 14px;
  user-select: none;
}
.lockMore_list {
  width: 100%;
  margin: 8px 0px;
}
.lockMore_body {
  display: flex;
  align-items: center;
}
.lockMore_body > i {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #f66246;
  border-radius: 50%;
  margin-right: 8px;
}
.lockMore_body > p {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 20px;
  color: #505050;
}
.lockMore_list > p {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  text-align: left;
  padding-left: 14px;
  line-height: 20px;
  box-sizing: border-box;
  color: #f66246;
  overflow-wrap: break-word !important;
  flex-wrap: wrap !important;
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
.div_isbody {
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 24px;
  color: #000000;
}
.div_isOK_button span {
  width: 72px;
  height: 32px;
  border-radius: 2px;
  margin: 0px 12px;
  cursor: pointer;
}
.spOk {
  border: 1px solid #e7e7e7;
  background: #ffffff;
}
.spNo {
  border: 1px solid #e7e7e7;
  background: #ffffff;
}
.spOk:hover {
  background: #ff7e67;
  border: 1px solid transparent;
  color: #ffffff;
}
.spNo:hover {
  background: #ff7e67;
  border: 1px solid transparent;
  color: #ffffff;
}
</style>