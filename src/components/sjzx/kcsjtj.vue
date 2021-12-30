<template>
  <div class="nr" style="border-radius: 10px">
    <div class="nr_top">
      <div class="nr_top_title">
        <div class="title_nr">课程数据统计</div>
        <div
          style="
            padding-right: 2%;
            padding-top: 2%;
            font-size: 14px;
            color: #a5a5a5;
          "
        >
          <svg class="icon" aria-hidden="true" style="margin-right: 3px">
            <use xlink:href="#icon-tixing1"></use>
          </svg>
          每日中午12点更新昨日数据
        </div>
      </div>
      <el-row :gutter="20" :data="tableData">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <div class="box-card">
                <div class="card-left">
                  <p class="mingcheng">总播放量</p>
                  <p class="sl">{{ all_bfl }}</p>
                  <p class="huizong">昨天，有{{ yesterday_bfl }}人关注</p>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <div class="card-left">
                <p class="mingcheng">学习人数</p>
                <p class="sl">{{ people }}</p>
                <p class="huizong">
                  昨天，有{{ yesterday_people }}人学习你的课程
                </p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div class="kcsjqs">课程数据趋势</div>
      <div class="tj">
        <div>
          <el-button
            class="ann"
            v-for="(item, index) in btn"
            :key="index"
            @click="quan(item, index)"
            :class="[{ actives: activeName == index }]"
            >{{ item }}</el-button
          >
        </div>
        <div>
          <el-select v-model="value" placeholder="请选择" @change="xuanze()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="box"></div>
    </div>
    <!--        <div class="nr_center">-->
    <!--      -->
    <!--        </div>-->
    <div class="nr_bottom">
      <div class="nr_bottom_top">
        <div class="nr_bottom_top_title">课程热度排行</div>
        <div>
          <el-select v-model="value1" placeholder="请选择" @change="kecheng()">
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
      <div class="nr_bottom_center">
        <!--                <div class="nr_bottom_center">-->
        <!--                    <div style="background-color: #FFEAE2;color: #FF6246;font-size: 12px;padding: 10px;font-weight: 600;letter-spacing: 2px">全部课程</div>-->
        <!--                </div>-->
      </div>
      <div class="nr_bottom_bottom">
        <div class="nr_bottom_bottom_kc" v-for="(xh, id) in xunhuan" :key="id">
          <div class="nr_bottom_bottom_kc_left">
            <div style="width: 40px">
              <img :src="imgimg[id]" v-if="id <= 2" />
              <span v-else>{{ id + 1 }}</span>
            </div>
            <div style="padding-left: 3%; position: relative">
              <img :src="xh.img" class="tp" />
              <div class="ts" v-if="kc">{{ xh.url_count }}讲</div>
              <div class="ts" v-else>{{ xh.course_time }}</div>
            </div>
            <div class="nr_bottom_bottom_kc_left_js">
              <div class="nr_bottom_bottom_kc_left_js_top">{{ xh.title }}</div>
              <div>
                <div class="nr_bottom_bottom_kc_left_js_center">
                  <span>{{ xh.courseadd_time }}</span>
                </div>
              </div>
              <div class="nr_bottom_bottom_kc_left_js_cz">
                <div class="nr_bottom_bottom_kc_left_js_cz_bq">
                  #{{ xh.bq[0] }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                  </svg>
                  {{ xh.bfl }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-dianzan3"></use>
                  </svg>
                  {{ xh.zan_num }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-shoucang2"></use>
                  </svg>
                  {{ xh.shoucang }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-fenxiang3"></use>
                  </svg>
                  {{ xh.fenxiang }}
                </div>
              </div>
            </div>
          </div>
          <div class="nr_bottom_bottom_kc_right">
            <div class="nr_bottom_bottom_kc_right_nr">
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-huo"></use>
                </svg>
                <span style="font-size: 14px; color: #333333; margin-left: 10px"
                  >热度{{ xh.renqi }}</span
                >
              </div>
              <!--                            <div style="margin-left: 20px">-->
              <!--                                <span style="font-size: 14px;color: #333333;">学习次数8769</span></div>-->
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
  </div>
</template>
<script>
import echarts from "echarts";
import { request } from "../../network/request/request";

export default {
  name: "kcsjtj",
  data() {
    return {
      options: [
        {
          value: "7day",
          label: "最近7天",
        },
        {
          value: "30day",
          label: "最近30天",
        },
      ],
      options1: [
        {
          value1: "yesterday",
          label1: "昨天",
        },
        {
          value1: "7day",
          label1: "最近7天",
        },
        {
          value1: "30day",
          label1: "最近30天",
        },
      ],
      value: "7day",
      value1: "yesterday",
      vid: "http://zb2020.wxeic.com/Upload/d95cf018319b8a903b614f86c9678756162709154063201627091568.mp4",
      currentpage: 1,
      pagesize: 5,
      TotalRows: 4,
      tableData: [],
      btn: ["播放量", "学习人次"],
      activeName: 0,
      type: 0,
      day: "7day",
      day1: "yesterday",
      all_bfl: "",
      yesterday_bfl: "",
      people: "",
      yesterday_people: "",
      bfl_date: [],
      bfl_data: [],
      xx_date: [],
      xx_data: [],
      xunhuan: [],
      kc: true,
      imgimg: [
        require("@/icon/one.svg"),
        require("@/icon/two.svg"),
        require("@/icon/three.svg"),
      ],
    };
  },
  created() {
    this.kecheng();
    // this.quan();
    this.xuanze();
  },
  mounted() {},
  methods: {
    // zhu(){
    //     request({
    //         url:'datatj/DataPage',
    //         data:{
    //             czz_id:6,
    //             day:this.day,
    //             type:this.activeName,
    //         }
    //     }).then(res=>{
    //         this.all_bfl=res.data.all_bfl;
    //         this.yesterday_bfl=res.data.yesterday_bfl;
    //         this.people=res.data.people;
    //         this.yesterday_people=res.data.yesterday_people;
    //         for (let i = 0; i < res.data.bfl_date.length; i++) {
    //             this.bfl_date.push(res.data.bfl_date[i].date);
    //             this.bfl_data.push(res.data.bfl_date[i].data);
    //         }
    //         // 基于准备好的dom，初始化echarts实例
    //         let myChart = this.$echarts.init(document.getElementById('box'))
    //         // 绘制图表
    //         myChart.setOption({
    //             xAxis: {
    //                 type: 'category',
    //                 data:this.xx_date,
    //             },
    //             yAxis: {
    //                 type: 'value'
    //             },
    //             series: [{
    //                 name:'￥',
    //                 data: this.xx_data,
    //                 type: 'line',
    //                 lineStyle: {
    //                     color: '#FF6246',
    //                     width: 1
    //                 },
    //             }],
    //             tooltip: {
    //                 trigger: 'axis',
    //                 axisPointer: {
    //                     type: 'cross',
    //                     label: {
    //                         backgroundColor: '#6a7985'
    //                     }
    //                 }
    //             },
    //         });
    //     })
    // },
    quan(item, index) {
      if (index == undefined) {
        index = 0;
      }
      this.activeName = index;
      console.log(this.value);
      console.log(this.activeName);
      request({
        url: "datatj/DataPage",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: this.activeName,
          day: this.value,
        },
      }).then((res) => {
        this.all_bfl = res.data.all_bfl;
        this.yesterday_bfl = res.data.yesterday_bfl;
        this.people = res.data.people;
        this.yesterday_people = res.data.yesterday_people;
        if (this.activeName == 0) {
          if (this.value == "7day") {
            const date = [];
            const data = [];
            res.data.bfl_date.forEach((e) => {
              date.push(e.date);
              data.push(e.data);
            });
            this.bfl_date = date;
            this.bfl_data = data;
          } else if (this.value == "30day") {
            const date30 = [];
            const data30 = [];
            res.data.bfl_month.forEach((e) => {
              date30.push(e.date);
              data30.push(e.data);
            });
            this.bfl_date = date30;
            this.bfl_data = data30;
          }
          console.log(this.bfl_data, "this.bfl_data", res.data);
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("box"));
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: "category",
              data: this.bfl_date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "￥",
                data: this.bfl_data,
                type: "line",
                lineStyle: {
                  color: "#FF6246",
                  width: 1,
                },
              },
            ],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
          });
        } else if (this.activeName == 1) {
          if (this.value == "7day") {
            const study_date = [],
              study_data = [];
            res.data.study_date.forEach((e) => {
              study_date.push(e.date);
              study_data.push(e.data);
            });
            this.xx_date = study_date;
            this.xx_data = study_data;
          } else if (this.value == "30day") {
            const study_date30 = [],
              study_data30 = [];
            res.data.study_month.forEach((e) => {
              study_date30.push(e.date);
              study_data30.push(e.data);
            });
            this.xx_date = study_date30;
            this.xx_data = study_data30;
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("box"));
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: "category",
              data: this.xx_date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "￥",
                data: this.xx_data,
                type: "line",
                lineStyle: {
                  color: "#FF6246",
                  width: 1,
                },
              },
            ],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
          });
        }
      });
    },
    xuanze() {
      this.type = this.activeName;
      if (this.type == undefined) {
        this.type = 0;
      }

      request({
        url: "datatj/DataPage",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          day: this.value,
          type: this.type,
        },
      }).then((res) => {
        this.all_bfl = res.data.all_bfl;
        this.yesterday_bfl = res.data.yesterday_bfl;
        this.people = res.data.people;
        this.yesterday_people = res.data.yesterday_people;
        if (this.type == 0) {
          if (this.value == "7day") {
            const date = [];
            const data = [];
            res.data.bfl_date.forEach((e) => {
              date.push(e.date);
              data.push(e.data);
            });
            this.bfl_date = date;
            this.bfl_data = data;
          } else if (this.value == "30day") {
            const date30 = [];
            const data30 = [];
            res.data.bfl_month.forEach((e) => {
              date30.push(e.date);
              data30.push(e.data);
            });
            this.bfl_date = date30;
            this.bfl_data = data30;
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("box"));
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: "category",
              data: this.bfl_date,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "￥",
                data: this.bfl_data,
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
            },
          });
        } else if (this.type == 1) {
          this.xx_date = [];
          this.xx_data = [];
          if (this.value == "7day") {
            for (let c = 0; c < res.data.study_date.length; c++) {
              this.xx_date.push(res.data.study_date[c].date);
              this.xx_data.push(res.data.study_date[c].data);
            }
          } else if (this.value == "30day") {
            this.xx_date = [];
            this.xx_data = [];
            console.log(res.data.study_month);
            for (let d = 0; d < res.data.study_month.length; d++) {
              this.xx_date.push(res.data.study_month[d].date);
              this.xx_data.push(res.data.study_month[d].data);
            }
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("box"));
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
            series: [
              {
                name: "￥",
                data: this.xx_data,
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
            },
          });
        }
      });
    },
    kecheng() {
      request({
        url: "datatj/hotCourse",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          page: this.currentpage,
          limit: this.pagesize,
          day: this.value1,
        },
      }).then((res) => {
        this.xunhuan = res.data.data;
        this.TotalRows = res.data.count;
        if (res.data.st == 500) {
          this.$message.warning("登录已过期，请重新登录");
          this.$router.push({ path: "/index" });
        }
        for (let i = 0; i < this.xunhuan.length; i++) {
          if (this.xunhuan[i].url_count > 1) {
            this.kc = true;
          }
        }
      });
    },
    handleCurrentChange(e) {
      this.GetPageList(e);
    },
  },
};
</script>

<style scoped>
.nr {
  width: 100%;
  border-radius: 10px;
  height: 1516px;
}
.nr_top {
  width: 100%;
  height: 40%;
  background-color: #ffffff;
}
.nr_top_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
}
.title_nr {
  padding-top: 2%;
  padding-left: 2%;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  font-family: PingFang SC, PingFang SC-Semibold;
}
.el-row {
  padding-left: 2%;
  padding-top: 1%;
}
.el-card {
  background-color: #fafafa;
  box-shadow: none !important;
}
.nr_center {
  width: 100%;
  height: 35%;
  background-color: #ffffff;
}
.tj {
  padding-top: 1%;
  padding-left: 2%;
  padding-right: 2%;
  display: flex;
  justify-content: space-between;
}
#box {
  width: 100%;
  height: 300px;
}
.nr_bottom {
  width: 96%;
  height: 60%;
  margin-top: 5px !important;
  background-color: #ffffff;
  padding: 2% 2%;
}
.nr_bottom_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nr_bottom_top_title {
  color: #1b1c1d;
  font-size: 18px;
  font-weight: 600;
  font-family: PingFang SC, PingFang SC-Medium;
}
.nr_bottom_center {
  display: flex;
  justify-content: flex-end;
  padding-left: 1%;
}
.nr_bottom_bottom {
  width: 100%;
  padding-top: 10px;
  padding-left: 2%;
}
.nr_bottom_bottom_kc {
  width: 100%;
  border-bottom: 1px solid #f4f4f4;
  margin-top: 24px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
}
.nr_bottom_bottom_kc_left {
  width: 100%;
  display: flex;
  align-items: center;
}
.nr_bottom_bottom_kc_left_js {
  margin-left: 2%;
  line-height: 2em;
}
.nr_bottom_bottom_kc_left_js_top {
  font-size: 18px;
  font-weight: 500;
  line-height: 2em;
  color: #212121;
  font-family: PingFang SC, PingFang SC-Medium;
}
.nr_bottom_bottom_kc_left_js_center {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 2em;
  color: #505050;
}
.nr_bottom_bottom_kc_left_js_cz {
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 2em;
}
.nr_bottom_bottom_kc_left_js_cz_bq {
  font-family: PingFang SC, PingFang SC-Medium;
  color: #505050;
  font-size: 14px;
}
.nr_bottom_bottom_kc_left_js_cz_nr {
  margin-left: 20px;
  font-size: 12px;
  color: #99a2aa;
  line-height: 17px;
  font-family: PingFang SC;
}
.nr_bottom_bottom_kc_right {
  width: 20%;
  display: flex;
  align-items: center;
}
.nr_bottom_bottom_kc_right_nr {
  width: 100%;
  display: flex;
  align-items: center;
}
.ts {
  width: 43px;
  height: 18px;
  line-height: 18px;
  background-color: #000000;
  opacity: 0.56;
  border-radius: 3px;
  position: absolute;
  top: 70%;
  left: 70%;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
}
.kcsjqs {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #1b1c1d;
  padding-top: 2%;
  padding-left: 2%;
}
.el-select {
  width: 130px;
}
.sl {
  font-size: 28px !important;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  color: #000000;
  line-height: 60px;
}
.mingcheng {
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #1b1c1d;
}
.huizong {
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #757575;
}
.tp {
  width: 156px;
  height: 100px;
  border-radius: 8px;
}
.sj {
  margin-left: 10px;
}
.fy {
  display: flex;
  justify-content: flex-end;
  /*padding-right: 2%;*/
}
.actives {
  background-color: #ffeae2 !important;
  color: #ff6246 !important;
  border: 1px solid transparent !important;
}
.ann:hover,
.ann:active,
.ann:focus {
  color: #ff6246 !important;
  background-color: #ffeae2 !important;
  border: 1px solid transparent !important;
}
</style>