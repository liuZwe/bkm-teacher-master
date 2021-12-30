<template>
  <div class="sjfx">
    <div class="nr" :data="tableData1">
      <div class="sjfx_title">
        <span class="sjfx_title_name" @click="spk()">视频课管理</span
        ><span class="sjfx_title_jx">> 机械基础的核心知识讲解</span>
      </div>
      <div class="sjfx_center">
        <div class="sjfx_center_title">数据分析</div>
        <div class="sjfx_center_center">
          <div class="sjfx_center_center_left">
            <el-image
              :src="img"
              style="width: 100%; height: 180px; border-radius: 7px"
            ></el-image>
          </div>
          <div class="sjfx_center_center_right">
            <div class="sjfx_center_center_right_left">
              <div class="sjfx_center_center_right_left_one">
                视频课：{{ title }} <span class="xilie">系列课</span>
              </div>
              <div class="sjfx_center_center_right_left_two">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofangliang"></use>
                </svg>
                {{ bfl }}
                <svg class="icon" aria-hidden="true" style="margin-left: 40px">
                  <use xlink:href="#icon-a-zan-1"></use>
                </svg>
                {{ zan_num }}
                <svg class="icon" aria-hidden="true" style="margin-left: 40px">
                  <use xlink:href="#icon-daojishishijian"></use>
                </svg>
                {{ add_time }}
              </div>
              <div class="sjfx_center_center_right_left_three">
                <span>综合评分：</span>
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}分"
                >
                </el-rate>
              </div>
              <div class="sjfx_center_center_right_left_four">
                <div class="sjfx_center_center_right_left_four_left">
                  <div>课程标签:</div>
                  <span v-for="a in bq" :key="a">#{{ a }}</span>
                </div>
                <div class="sjfx_center_center_right_left_four_right">
                  <div>课程范围:</div>
                  <div>#{{ kc_fw }}</div>
                </div>
              </div>
            </div>
            <div class="sjfx_center_center_right_right">
              <el-button
                style="background-color: #f5f5fa; width: 98px; height: 36px"
                >查看课程</el-button
              >
            </div>
          </div>
        </div>
        <div class="sjfx_center_bottom">
          <div>
            <p>{{ bfl }}</p>
            <p>播放</p>
          </div>
          <div>
            <p>{{ zan_num }}</p>
            <p>点赞</p>
          </div>
          <div>
            <p>{{ shoucang }}</p>
            <p>收藏</p>
          </div>
          <div>
            <p>189</p>
            <p>评价</p>
          </div>
          <div>
            <p>287</p>
            <p>交作业数</p>
          </div>
        </div>
      </div>
      <div class="sjfx_bottom">
        <div class="sjfx_bottom_title">
          <div class="sjfx_bottom_title_title">评价列表</div>
          <div class="sjfx_bottom_title_sou">
            <el-input
              placeholder="搜索评论"
              suffix-icon="el-icon-search"
              v-model="input"
              @keydown.enter.native="cha()"
              id="input2"
              style="width: 303px"
            >
            </el-input>
          </div>
        </div>
        <div class="sjfx_bottom_xuan">
          <div>
            <el-button @click="quan()">全部评价</el-button>
            <el-button @click="fei(5)">非常棒</el-button>
            <el-button @click="fei(4)">推荐</el-button>
            <el-button @click="fei(3)">一般般</el-button>
            <el-button @click="fei(2)">较差</el-button>
            <el-button @click="fei(1)">很差</el-button>
          </div>
          <div>
            <el-select
              v-model="value1"
              clearable
              placeholder="请选择"
              @change="change()"
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
        <div
          class="sjfx_bottom_nr"
          v-for="item2 in tableData2"
          :key="item2.himg"
        >
          <div class="sjfx_bottom_nr_left">
            <el-avatar :src="item2.himg"></el-avatar>
          </div>
          <div class="sjfx_bottom_nr_right">
            <div class="sjfx_bottom_nr_right_top">
              <div class="sjfx_bottom_nr_right_name">{{ item2.nickname }}</div>
              <div class="rate">
                <el-rate
                  v-model="item2.branch"
                  disabled
                  show-score
                  text-color="#505050"
                  score-template="{value}分"
                >
                </el-rate>
              </div>
            </div>
            <div class="sjfx_bottom_nr_right_center">{{ item2.content }}</div>
            <div class="sjfx_bottom_nr_right_bottom">{{ item2.add_time }}</div>
          </div>
        </div>
        <div class="fy">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="this.currentpage"
            :page-size="this.pagesize"
            layout="total, prev, pager, next, jumper"
            :total="TotalRows"
            class="fy"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request/request.js";
export default {
  name: "sjfx",
  data() {
    return {
      img: "",
      value: 3.7,
      input: "",
      options1: [
        {
          value1: "day",
          label1: "今天",
        },
        {
          value1: "yesterday",
          label1: "昨天",
        },
        {
          value1: "7day",
          label1: "近7天",
        },
        {
          value1: "30day",
          label1: "近30天",
        },
      ],
      value1: "",
      branch: 5,
      currentpage: 2,
      pagesize: 2,
      TotalRows: 4,
      tableData1: [],
      tableData2: [],
      title: "",
      zan_num: "",
      bfl: "",
      add_time: "",
      bq: [],
      kc_fw: "手绘快题",
      shoucang: "",
      himg: "",
      nickname: "",
      content: "",
    };
  },
  created() {
    this.Get();
  },
  methods: {
    Get(pages, re) {
      this.currentpage = pages ? pages : 1;
      request({
        url: "course/courseInfo",
        data: {
          id: this.$route.query.id,
          limit: this.pagesize,
          page: this.currentpage,
        },
      }).then((res) => {
        if (re != undefined) {
          res = re;
        }
        if (res.data.st == 500) {
          this.$message.warning("登录已过期，请重新登录");
          this.$router.push({ path: "/index" });
        }
        this.tableData1 = res.data.course;
        this.tableData2 = res.data.data;
        this.TotalRows = res.data.count;
        this.img = res.data.course.img;
        this.title = res.data.course.title;
        this.zan_num = res.data.course.zan_num;
        this.bfl = res.data.course.bfl;
        this.add_time = res.data.course.add_time;
        this.shoucang = res.data.course.shoucang;
        this.bq = res.data.course.bq;
        this.tableData2.himg = res.data.data.himg;
        this.tableData2.nickname = res.data.data.nickname;
        this.tableData2.branch = res.data.data.branch;
        this.tableData2.content = res.data.data.content;
        this.tableData2.add_time = res.data.data.add_time;
        console.log(this.tableData2);
      });
    },
    // 下拉选择
    change() {
      request({
        url: "course/courseInfo",
        data: {
          page: this.currentpage,
          limit: this.pagesize,
          id: this.$route.query.id,
          day: this.value1,
        },
      }).then((res) => {
        console.log(res.data.data);
        // 赶快渲染

        this.tableData1 = res.data.course;
        this.tableData2 = res.data.data;
        this.TotalRows = res.data.count;
        this.img = res.data.course.img;
        this.title = res.data.course.title;
        this.zan_num = res.data.course.zan_num;
        this.bfl = res.data.course.bfl;
        this.add_time = res.data.course.add_time;
        this.shoucang = res.data.course.shoucang;
        this.bq = res.data.course.bq;
        this.tableData2.himg = res.data.data.himg;
        this.tableData2.nickname = res.data.data.nickname;
        this.tableData2.branch = res.data.data.branch;
        this.tableData2.content = res.data.data.content;
        this.tableData2.add_time = res.data.data.add_time;
      });
    },
    cha() {
      request({
        url: "course/courseInfo",
        data: {
          keyword: this.input,
          page: this.currentpage,
          limit: this.pagesize,
          id: this.$route.query.id,
          // id:1,
        },
      }).then((res) => {
        this.tableData2 = res.data.data;
        this.TotalRows = res.data.count;
      });
    },
    handleCurrentChange(e) {
      this.Get(e);
    },
    quan() {
      this.Get();
    },
    fei(fei) {
      request({
        url: "course/courseInfo",
        data: {
          page: this.currentpage,
          limit: this.pagesize,
          id: this.$route.query.id,
          grade: fei,
        },
      }).then((res) => {
        console.log(res.data.data);
        // 赶快渲染

        this.tableData1 = res.data.course;
        this.tableData2 = res.data.data;
        this.TotalRows = res.data.count;
        this.img = res.data.course.img;
        this.title = res.data.course.title;
        this.zan_num = res.data.course.zan_num;
        this.bfl = res.data.course.bfl;
        this.add_time = res.data.course.add_time;
        this.shoucang = res.data.course.shoucang;
        this.bq = res.data.course.bq;
        this.tableData2.himg = res.data.data.himg;
        this.tableData2.nickname = res.data.data.nickname;
        this.tableData2.branch = res.data.data.branch;
        this.tableData2.content = res.data.data.content;
        this.tableData2.add_time = res.data.data.add_time;
      });
    },
    spk() {
      this.$router.push({ path: "/spkgl" });
    },
  },
};
</script>

<style scoped>
.nr {
  background-color: #ffffff;
}
.sjfx_title {
  display: flex;
  align-items: center;
  padding: 2%;
}
.sjfx_title_name {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #000000;
  cursor: pointer;
}
.sjfx_title_jx {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #d0d0d0;
}
.sjfx_center {
  padding: 0 2%;
}
.sjfx_center_title {
  font-size: 20px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #000000;
}
.sjfx_center_center {
  margin-top: 1%;
  display: flex;
  align-items: center;
}
.sjfx_center_center_left {
  width: 20%;
}
.sjfx_center_center_right {
  margin-left: 3%;
  width: 80%;
  display: flex;
  align-items: self-start;
  justify-content: space-between;
}
.sjfx_center_center_right_left_one {
  font-size: 20px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #333333;
  line-height: 40px;
}
.xilie {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ff6246;
  background-color: #ffeae2;
  margin-left: 10px;
  padding: 5px;
}
.sjfx_center_center_right_left_two {
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #666666;
  line-height: 40px;
}
.sjfx_center_center_right_left_two svg {
  margin-left: 3%;
}
.sjfx_center_center_right_left_two svg:first-child {
  margin-left: 0% !important;
}
.sjfx_center_center_right_left_three {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #666666;
  line-height: 40px;
}
.sjfx_center_center_right_left_four {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #666666;
  line-height: 40px;
}
.sjfx_center_center_right_left_four_right {
  margin-left: 20px;
}
.sjfx_center_bottom {
  margin-top: 1%;
  display: flex;
  align-items: center;
  border: 1px solid #767676;
}
.sjfx_center_bottom div {
  line-height: 50px;
  width: 20%;
  text-align: center;
}
.sjfx_center_bottom div p:first-child {
  font-size: 26px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: center;
  color: #000000;
}
.sjfx_center_bottom div p:last-child {
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  color: #000000;
}
.sjfx_bottom {
  padding: 2%;
}
.sjfx_bottom_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sjfx_bottom_title_title {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #333333;
}
.sjfx_bottom_xuan {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1%;
}
.sjfx_bottom_nr {
  display: flex;
  align-items: center;
  margin-top: 1%;
}
.sjfx_bottom_nr_left {
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sjfx_bottom_nr_right_top {
  display: flex;
  align-items: center;
}
.sjfx_bottom_nr_right_center {
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #333435;
}
.sjfx_bottom_nr_right_name {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  color: #505050;
}
.sjfx_bottom_nr_right_bottom {
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #a5a6a7;
}

.rate {
  margin-left: 10px;
}
.fy {
  margin-top: 1%;
}
.sjfx_center_center_right_left {
  width: 500px;
}
.sjfx_center_center_right_left_four_left {
  display: flex;
}
.sjfx_center_center_right_left_four_right {
  display: flex;
}
.el-select {
  width: 104px;
}
.sjfx_bottom_title_sou {
  width: 303px;
}
.fy {
  display: flex;
  justify-content: flex-end;
}
p {
  line-height: 1.7em;
}
</style>