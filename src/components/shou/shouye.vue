<template>
  <div class="nr">
    <!-- 用户信息 -->
    <div class="nr_header">
      <div class="nr_header_left">
        <img
          v-lazy="userMessage.himg"
          style="width: 80px; height: 80px; border-radius: 50%"
        />
      </div>
      <div class="nr_header_right">
        <div class="nr_header_body">
          <div class="nr_head_body_usermessage">
            <b>{{ userMessage.nickname }}</b>
          </div>
          <div class="nr_header_body_userdata">
            <div class="nr_header_userdata_left">
              <section>
                <b>{{ userMessage.course_count }}</b
                >课程
              </section>
              <section>
                <b>{{ userMessage.fs }}</b
                >粉丝
              </section>
              <section>
                <b>{{ userMessage.gz }}</b
                >关注
              </section>
            </div>
            <p></p>
            <span>猫爪号：{{ userMessage.account }}</span>
          </div>
          <div class="nr_header_body_usergxqm">
            {{ userMessage.gxqm }}
          </div>
        </div>
      </div>
    </div>
    <!-- 数据概览- -->
    <div class="nr_shuju">
      <div class="nr_shuju_top">
        <div class="nr_shuju_top_sj">数据概览</div>
        <div class="nr_shuju_top_gx">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tixing1"></use>
          </svg>
          每日中午12点更新昨日数据
        </div>
      </div>
      <div class="nr_shuju_bottom">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-card>
                <div class="box-card">
                  <div class="card-left">
                    <p class="card_title">发布的课时数</p>
                    <p class="card_sl">
                      <span class="sl">{{ userMessage.course_count }}</span>
                    </p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-card>
                <div class="box-card">
                  <div class="card-left">
                    <p class="card_title">综合好评率</p>
                    <p class="card_sl">
                      <span class="sl">{{ goods_ping }}%</span>
                    </p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-card>
                <div class="box-card">
                  <div class="card-left">
                    <p class="card_title">昨日粉丝增长</p>
                    <p class="card_sl"></p>
                    <p class="card_sl">
                      <span class="sl">{{ yesterday_fs }}</span>
                    </p>
                  </div>
                  <div
                    class="card-right"
                    style="font-size: 12px; color: #999999"
                    v-show="fs_daybi != 0"
                  >
                    <span
                      style="
                        margin-bottom: 10px;
                        font-family: PingFang SC, PingFang SC-Regular;
                      "
                      >日同比</span
                    >
                    <!-- color: #f21e37; margin-bottom: 5px -->
                    <span :style="up ? 'color: #f21e37' : 'color: #21B384'">
                      <span v-if="jia">+</span>{{ fs_daybi }}%
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size: 12px"
                        v-if="up"
                      >
                        <use xlink:href="#icon-a-lujing144"></use>
                      </svg>
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size: 12px"
                        v-else
                      >
                        <use xlink:href="#icon-a-lujing143"></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-card>
                <div class="box-card">
                  <div class="card-left">
                    <p class="card_title">昨日待结算</p>
                    <p class="card_sl">
                      <span class="fh">￥</span
                      ><span class="sl">{{ yesterday_income }}</span>
                    </p>
                  </div>
                  <div
                    class="card-right"
                    style="font-size: 12px; color: #999999"
                    v-show="money_daybi != 0"
                  >
                    <span
                      style="
                        margin-bottom: 10px;
                        font-family: PingFang SC, PingFang SC-Regular;
                      "
                      >日同比</span
                    >
                    <span :style="up ? 'color: #f21e37' : 'color: #21B384'">
                      <span v-if="zheng">+</span>{{ money_daybi }}%
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size: 12px"
                        v-if="up1"
                      >
                        <use xlink:href="#icon-a-lujing144"></use>
                      </svg>
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size: 12px"
                        v-else
                      >
                        <use xlink:href="#icon-a-lujing143"></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 最新视频数据 -->
    <div class="nr_pj" v-if="courseMessage.img">
      <div class="nr_pj_top">
        <div class="nr_pj_top_title">最新视频播放数据</div>
        <div class="nr_pj_top_ck">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tixing1"></use>
          </svg>
          每日中午12点更新昨日数据
        </div>
      </div>
      <div class="nr_pj_bottom">
        <div class="nr_pj_bottom_left">
          <img
            style="width: 249px; height: 140px; border-radius: 8px"
            :src="courseMessage.img"
          />
          <div class="ts">
            {{
              courseMessage.url_count > 1
                ? courseMessage.url_count
                : courseMessage.course_time
            }}
          </div>
        </div>
        <div class="nr_pj_bottom_right">
          <div class="nr_pj_bottom_right_top">{{ courseMessage.title }}</div>
          <div class="nr_pj_bottom_right_center">
            <div class="shijian">{{ courseMessage.add_time }}</div>
            <div class="bq">#{{ courseMessage.bq[0] }}</div>
          </div>
          <div class="nr_pj_bottom_right_bottom">
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">播放量</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.bfl }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">VIP观看量</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.vip_bfl }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">点赞数</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.zan_num }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">收藏</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.shoucang }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">下载缓存</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.xiazai_num }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">分享</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.fenxiang }}
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">好评率</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.goods_ping }}%
              </div>
            </div>
            <div class="nr_pj_bottom_right_bottom_nr">
              <div class="nr_pj_bottom_right_bottom_nr_top">课程收益</div>
              <div class="nr_pj_bottom_right_bottom_nr_bottom">
                {{ courseMessage.money }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 课程排行榜单 -->
    <div class="nr_footer">
      <div class="nr_footer_top">
        <div class="nr_footer_top_ph">课程热度排行</div>
        <div class="nr_footer_top_ck" @click="chakan('/kcsjtj', 'kecheng')">
          查看更多 >
        </div>
      </div>
      <div class="nr_footer_bottom">
        <div
          class="nr_bottom_bottom_kc"
          v-for="(item, index) in tableData1"
          :key="index + 1"
        >
          <div class="nr_bottom_bottom_kc_left">
            <div style="width: 40px">
              <img :src="imgimg[index]" v-if="index <= 2" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div style="padding-left: 3%; position: relative">
              <img
                :src="item.img"
                style="width: 156px; height: 100px; border-radius: 8px"
              />
              <div class="ts">
                {{ item.url_count > 1 ? item.url_count : item.course_time }}
              </div>
              <!-- <div class="ts" v-else>{{ item.course_time }}</div> -->
            </div>
            <div class="nr_bottom_bottom_kc_left_js">
              <div class="nr_bottom_bottom_kc_left_js_top">
                {{ item.title }}
              </div>
              <div>
                <div class="nr_bottom_bottom_kc_left_js_center">
                  <span>{{ item.add_time }}</span>
                </div>
              </div>
              <div class="nr_bottom_bottom_kc_left_js_cz">
                <div
                  style="
                    margin-right: 10px;
                    color: #505050;
                    font-family: PingFang SC, PingFang SC-Medium;
                    font-size: 14px;
                  "
                >
                  #{{ item.bq[0] }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                  </svg>
                  {{ item.bfl }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-dianzan3"></use>
                  </svg>
                  {{ item.zan_num }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-shoucang2"></use>
                  </svg>
                  {{ item.shoucang }}
                </div>
                <div class="nr_bottom_bottom_kc_left_js_cz_nr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-fenxiang3"></use>
                  </svg>
                  {{ item.fenxiang }}
                </div>
              </div>
            </div>
          </div>
          <div class="nr_bottom_bottom_kc_right">
            <div class="nr_bottom_bottom_kc_right_nr">
              <div class="nr_bottom_bottom_kc_right_nr_rd">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-huo"></use>
                </svg>
                <span style="font-size: 14px; color: #333333; margin-left: 10px"
                  >热度{{ item.renqi }}</span
                >
              </div>
              <!--                            <div style="margin-left: 20px">-->
              <!--                                <span style="font-size: 14px;color: #333333;">学习次数8769</span></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request/request";
export default {
  //   name: "shouye",
  data() {
    return {
      //用户基本信息
      userMessage: {},
      //课程基本信息
      courseMessage: {},
      //热度排行榜
      tableData1: [],
      course_count: "", //课程数量
      goods_ping: "", //综合好评率
      yesterday_fs: "", // 昨日增加粉丝数量
      fs_daybi: 0, //粉丝增长百分比
      up: false, //粉丝增长T与下降F箭头
      jia: false, //百分比显示隐藏,增长T与下降F
      yesterday_income: "", //昨日待结算收益
      money_daybi: 0, //收益增长百分比
      up1: true, //收益增长T与下降F箭头
      zheng: true, //百分比显示隐藏,增长T与下降F
      imgimg: [
        require("@/icon/one.svg"),
        require("@/icon/two.svg"),
        require("@/icon/three.svg"),
      ],
    };
  },
  created() {
    this.Get();
  },
  methods: {
    Get() {
      request({
        url: "index/indexPage",
        data: {
          czz_id: JSON.parse(localStorage.getItem("user")).id,
        },
      }).then((res) => {
        console.log("请求的数据", res);
        // 错误跳转
        if (res.data.st == 500) {
          this.$message.warning("登录已过期，请重新登录");
          this.$router.push({ path: "/index" });
        }
        this.userMessage = res.data.user;
        this.courseMessage = res.data.course;
        this.tableData1 = res.data.hotCourse;

        // this.course_count = res.data.course_count;
        // 好评率
        this.goods_ping = res.data.goods_ping * 100;
        // 昨日增加粉丝数量
        this.yesterday_fs = res.data.yesterday_fs;
        // 昨日待结算
        this.yesterday_income = res.data.yesterday_income;
        // 粉丝 日同比
        this.fs_daybi = res.data.fs_daybi * 100;
        // 如果粉丝同日比上涨
        if (this.fs_daybi > 0) {
          this.up = true;
          this.jia = true;
        } else {
          this.up = false;
          this.jia = false;
        }
        // 金额日同比
        this.money_daybi = res.data.money_daybi * 100;
        // 如果金额日同比上涨
        if (this.money_daybi >= 0) {
          this.up1 = true;
          this.zheng = true;
        } else {
          this.up1 = false;
          this.zheng = false;
        }
      });
    },
    chakan(path, id) {
      let Id = id;
      localStorage.setItem("toId", Id);
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.nr {
  width: 100%;
  height: 100%;
}
.nr_header {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 10px;
}
.nr_header_left {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1%;
}
.nr_header_right {
  width: 90%;
  /* border: 1px solid red; */
}
.nr_header_body {
  width: 100%;
  font-family: PingFang SC;
}
.nr_head_body_usermessage {
  line-height: 28px;
  margin-top: 5px;
}
.nr_head_body_usermessage > b {
  font-size: 20px;
  color: #333333;
  vertical-align: middle;
  font-weight: 600;
  margin-right: 16px;
}
.nr_head_body_usermessage > span {
  font-size: 14px;
  color: #888888;
  vertical-align: middle;
}
.nr_header_body_userdata {
  font-size: 14px;
  display: flex;
  align-items: center;
  line-height: 20px;
  margin: 12px 0px;
}
.nr_header_userdata_left {
  display: flex;
}
.nr_header_body_userdata section {
  color: #8d8d8d;
  margin-right: 24px;
}
.nr_header_body_userdata b {
  font-weight: 600;
  margin-right: 5px;
  color: #333333;
}
.nr_header_body_userdata > span {
  font-size: 14px;
  color: #888888;
}
.nr_header_body_userdata > p {
  width: 1px;
  height: 14px;
  background-color: #e0e0e0;
  margin-right: 24px;
}
.nr_header_body_usergxqm {
  width: 60%;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  line-height: 20px;
  font-size: 14px;
  color: #8c8c8c;
}
.nr_shuju {
  margin-top: 16px;
  border-radius: 10px;
  padding: 2%;
  background-color: #ffffff;
}
.nr_shuju_top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.nr_shuju_top_sj {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.nr_shuju_top_gx {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
}
.nr_shuju_bottom {
  margin-top: 20px;
  margin-bottom: 1%;
}
.el-card {
  background-color: #fff8f7;
  height: 120px;
  border: none;
  border-radius: 10px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.box-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.nr_pj {
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 16px;
  padding: 2%;
}
.nr_pj_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nr_pj_top_title {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #000000;
  font-weight: 600;
}
.nr_pj_top_ck {
  font-size: 14px;
  color: #a5a5a5;
  font-weight: 400;
  font-family: PingFang SC;
}
.nr_pj_bottom {
  display: flex;
  align-items: center;
  margin-top: 1%;
}
.nr_pj_bottom_left {
  width: 250px;
  height: 140px;
  position: relative;
}
.nr_pj_bottom_left > img {
  width: 100%;
  height: 100%;
}
.ts {
  padding: 4px 6px;
  background-color: #000000;
  opacity: 0.6;
  border-radius: 3px;
  position: absolute;
  font-family: PingFang SC;
  right: 8px;
  bottom: 10px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
}
.nr_pj_bottom_right {
  width: 80%;
  margin-left: 3%;
}
.nr_pj_bottom_right_top {
  margin-left: 1%;
  line-height: 2em;
  font-size: 16px;
  color: #2d2d2d;
  font-weight: bold;
  font-family: PingFang SC, PingFang SC-Medium;
}
.nr_pj_bottom_right_center {
  margin-left: 1%;
  margin-bottom: 1%;
  line-height: 2em;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #505050;
}
.nr_pj_bottom_right_bottom {
  display: flex;
  align-items: center;
  line-height: 2em;
  padding-bottom: 1%;
}
.nr_pj_bottom_right_bottom_nr {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  width: 100px;
  height: 70px;
  text-align: left;
  margin-left: 1%;
}
.nr_pj_bottom_right_bottom_nr div {
  line-height: 35px;
  padding-left: 15%;
}
.nr_pj_bottom_right_bottom_nr_top {
  color: #888888;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular !important;
}
.nr_pj_bottom_right_bottom_nr_bottom {
  color: #2d2d2d;
  font-size: 18px;
  font-weight: 500;
  font-family: PingFang SC, PingFang SC-Medium !important;
}
.nr_footer {
  height: 540px;
  width: 100%;
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 10px;
}
.nr_footer_top {
  padding: 2% 2% 0 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nr_footer_top_ph {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #1b1c1d;
  font-weight: 600;
}
.nr_footer_top_ck {
  font-size: 14px;
  color: #a5a5a5;
  font-weight: 400;
  font-family: PingFang SC, PingFang SC-Regular;
  cursor: pointer;
}
.nr_footer_bottom {
  padding: 0 2% !important;
}
.nr_bottom_bottom_kc {
  width: 100%;
  /*border-bottom: 1px solid #F4F4F4;*/
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.nr_bottom_bottom_kc_left {
  width: 100%;
  padding-left: 1%;
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
  padding-right: 5%;
}
.nr_bottom_bottom_kc_right_nr {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.sj {
  margin-left: 10px;
}
.card-left {
  margin-top: -10px;
}
.card_title {
  font-size: 14px;
  line-height: 50px;
  font-family: PingFang SC, PingFang SC-Medium;
}
/* #ts1 {
  width: 43px;
  height: 18px;
  line-height: 18px;
  background-color: #000000;
  opacity: 0.56;
  border-radius: 3px;
  position: absolute;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  top: 75% !important;
  left: 85% !important;
} */
.bq {
  margin-left: 1%;
  margin-top: 0 !important;
  color: #505050 !important;
  font-family: PingFang SC, PingFang SC-Regular !important;
}
.shijian {
  font-family: PingFang SC, PingFang SC-Regular !important;
}
.sl {
  font-size: 36px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #37373b;
}
.fh {
  font-size: 18px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #37373b;
}
.sz {
  font-weight: 600;
  margin-right: 5px;
}
@media (min-width: 1441px) and (max-width: 1680px) {
  /*.nr_pj_bottom_right{*/
  /*    width: 86% !important;*/
  /*    margin-left: 0px!important;*/
  /*    padding-left: 8% !important;*/
  /*}*/
  .nr_pj_bottom_right_bottom_nr {
    width: 80px !important;
  }
}
@media (min-width: 1281px) and (max-width: 1440px) {
  .nr_pj_bottom_right_bottom_nr {
    width: 80px !important;
  }
}
@media screen and (max-width: 1280px) {
  .nr_pj_bottom_right_bottom_nr {
    width: 80px !important;
  }
}
</style>