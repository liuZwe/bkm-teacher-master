<template>
  <div class="nr">
    <div class="nr_top">
      <div class="nr_top_title">
        <div class="fs">粉丝概览</div>
        <div class="nr_shuju_top_gx">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tixing1"></use>
          </svg>
          <span class="nr_shuju_top_gx_text">每日中午12点更新昨日数据</span>
        </div>
      </div>
      <el-row :gutter="20" class="fsnr">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <div class="box-card">
                <div class="card-left">
                  <p class="mingcheng">粉丝总数</p>
                  <p class="sl">{{ z_count }}</p>
                  <p class="huizong">近{{ date }}天，有{{ data }}人关注</p>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <div class="card-left">
                <p class="mingcheng">研学卡粉丝</p>
                <p class="sl">{{ vip_count }}</p>
                <p class="huizong">近{{ date }}天，有{{ data }}人关注</p>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <div class="card-left">
                <p class="mingcheng">活跃粉丝数</p>
                <p class="sl">0</p>
                <p class="huizong">近30天，--</p>
              </div>
            </el-card>
          </div>
        </el-col>
        <!--                <el-col :span="6">-->
        <!--                    <div class="grid-content bg-purple">-->
        <!--                        <el-card>-->
        <!--                            <div class="card-left">-->
        <!--                                <p class="mingcheng">提交作业数</p>-->
        <!--                                <p class="sl">0</p>-->
        <!--                                <p class="huizong">近30天，&#45;&#45;</p>-->
        <!--                            </div>-->
        <!--                        </el-card>-->
        <!--                    </div>-->
        <!--                </el-col>-->
      </el-row>
    </div>
    <div class="nr_bottom">
      <div class="nr_bottom_qs">关注趋势</div>
      <div class="tj">
        <div>
          <!--                    <el-button @click="xinzeng()" autofocus="autofocus">新增关注</el-button>-->
          <!--                    <el-button @click="quxiao()">取消关注</el-button>-->
          <el-button
            v-for="(item, index) in btn"
            :key="index"
            @click="quan(item, index)"
            :class="[{ actives: activeName == item }]"
            >{{ item }}</el-button
          >
        </div>
        <div>
          <el-select v-model="value" placeholder="请选择" @change="change1">
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
  </div>
</template>
<script>
import echarts from "echarts";
import { request } from "@/network/request/request";

export default {
  name: "fsgl",
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
      value: "",
      z_count: "",
      vip_count: "",
      date: "30",
      data: "197",
      gz_date: [],
      gz_data: [],
      cancelgz_date: [],
      cancelgz_data: [],
      // autofocus:true,
      btn: ["新增关注", "取消关注"],
      activeName: "新增关注",
    };
  },
  mounted() {
    this.zhu();
  },
  methods: {
    zhu(value) {
      this.value = value;
      if (this.value == undefined) {
        this.value = "7day";
      }
      request({
        url: "follow/followPage",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
          type: 0,
          day: this.value,
        },
      }).then((res) => {
        this.z_count = res.data.z_count;
        this.vip_count = res.data.vip_count;
        if (res.data.st == 500) {
          this.$message.warning("登录已过期，请重新登录");
          this.$router.push({ path: "/index" });
        }
        // this.date=res.data.cancelgz_date.date;
        // 基于准备好的dom，初始化echarts实例
        if (this.value == "7day") {
          for (let i = 0; i < res.data.gz_date.length; i++) {
            this.gz_date.push(res.data.gz_date[i].date);
            this.gz_data.push(res.data.gz_date[i].data);
          }
        } else if (this.value == "30day") {
          console.log(res.data.gz_month);
          for (let j = 0; j < res.data.gz_month.length; j++) {
            this.gz_date.push(res.data.gz_month[j].date);
            this.gz_data.push(res.data.gz_month[j].data);
          }
        }
        let myChart = this.$echarts.init(document.getElementById("box"));
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: "category",
            data: this.gz_date,
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
              showSymbol: false,
              lineWidth: 2,
              type: "line",
              smooth: true, // 是否显示平滑曲线
              borderWidth: 1,
              name: "￥",
              data: this.gz_data,
              lineStyle: {
                //折线设置，颜色与线宽
                color: "#FF6246",
                width: 3,
              },
              markLine: {
                symbol: ["none", "none"],
                label: { show: true },
              },
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
            trigger: "axis",
            axisPointer: {
              type: "line",
              axis: "auto", // 指示器的坐标轴。
              snap: true, // 坐标轴指示器是否自动吸附到点上
              //指示线设置
              lineStyle: {
                color: "#CECECE",
                width: 1,
                // type: "line",
                type: "dashed",
              },
              confine: true, // 是否将 tooltip 框限制在图表的区域内。
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
        });
      });
    },
    change1() {
      this.gz_date = [];
      this.gz_data = [];
      this.cancelgz_date = [];
      this.cancelgz_data = [];
      this.zhu(this.value);
    },
    quan(item, index) {
      this.activeName = item;
      request({
        url: "follow/followPage",
        data: {
          czz_id: JSON.parse(sessionStorage.getItem("user")).id,
          day: this.value,
          type: index,
        },
      }).then((res) => {
        this.tabledata = res.data.data;
        this.TotalRows = res.data.count;
        // if(res.data.data.)
      });
    },
    xinzeng() {
      this.zhu();
      this.gz_date = [];
      this.gz_data = [];
      this.cancelgz_date = [];
      this.cancelgz_data = [];
    },
    quxiao(value) {
      this.value = value;
      this.gz_date = [];
      this.gz_data = [];
      this.cancelgz_date = [];
      this.cancelgz_data = [];
      if (this.value == undefined) {
        this.value = "7day";
      }
      request({
        url: "follow/followPage",
        data: {
          czz_id: JSON.parse(sessionStorage.getItem("user")).id,
          day: this.value,
        },
      }).then((res) => {
        this.z_count = res.data.z_count;
        this.vip_count = res.data.vip_count;
        // this.date=res.data.cancelgz_date.date;
        // 基于准备好的dom，初始化echarts实例
        if (this.value == "7day") {
          for (let i = 0; i < res.data.cancelgz_date.length; i++) {
            this.cancelgz_date.push(res.data.cancelgz_date[i].date);
            this.cancelgz_data.push(res.data.cancelgz_date[i].data);
          }
        } else if (this.value == "30day") {
          for (let i = 0; i < res.data.cancelgz_month.length; i++) {
            this.cancelgz_date.push(res.data.cancelgz_month[i].date);
            this.cancelgz_data.push(res.data.cancelgz_month[i].data);
          }
        }
        let myChart = this.$echarts.init(document.getElementById("box"));
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: "category",
            data: this.cancelgz_date,
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
          series: [
            {
              name: "￥",
              data: this.cancelgz_data,
              type: "line",
              lineStyle: {
                color: "#FF6246",
                width: 1,
              },
            },
          ],
          grid: {
            // top:"0px",

            left: "70px",

            // right:"5px",

            bottom: "50px",

            // backgroundColor: '#fff',

            width: "auto", //图例宽度

            height: "100%", //图例高度
          },
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
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  background-color: #fafafa;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.nr {
  overflow: hidden;
}
.nr_top {
  height: 25%;
  width: 98%;
  padding: 0 1%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffffff;
}
.nr_top_title {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fs {
  font-size: 18px;
  font-weight: 600;
  padding-top: 1%;
  font-family: PingFang SC-Medium;
  color: #000000;
}
.nr_shuju_top_gx_text {
  font-size: 14px;
  color: #a5a5a5;
  margin-left: 5px;
}
.fsnr {
  margin-top: 1%;
}
.nr_bottom {
  /*margin-top: 16px;*/
  width: 100%;
  height: 80%;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 !important;
  background-color: #ffffff;
}
.nr_bottom_qs {
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  font-family: PingFang SC-Medium;
}
.tj {
  padding: 1% 1%;
  display: flex;
  justify-content: space-between;
}
#box {
  width: 100%;
  height: 300px;
  margin-right: 30px;
  margin-top: 28px;
}
.el-select {
  width: 130px !important;
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

.el-button:focus,
.el-button:hover {
  border: 1px solid transparent !important;
  color: #ff7e67 !important;
  background-color: #feeae2 !important;
}
.actives {
  border: 1px solid transparent !important;
  background-color: #feeae2 !important;
  color: #ff7e67 !important;
}
@media (min-width: 1280px) and (max-width: 1600px) {
  .nr_top {
    height: 35%;
    padding-bottom: 1%;
  }
}
</style>