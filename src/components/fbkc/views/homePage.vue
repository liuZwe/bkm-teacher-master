<template>
  <div class="homePage_html">
    <!-- 创作选择 -->
    <div class="div_homePageTop">
      <h3>新的创作</h3>
      <ul class="ul_typeSelection">
        <li>
          <i class="iconfont">&#xe619;</i>
          <p>发布动态</p>
          <span>前往空间社区发布动态</span>
        </li>
        <li @click="clickOpenType('specol')">
          <i class="iconfont">&#xe617;</i>
          <p>创建考点专栏</p>
          <span>点击即可创建系列考点专栏</span>
        </li>
        <li @click="clickOpenType('kcfb')">
          <i class="iconfont">&#xe618;</i>
          <p>视频课</p>
          <span>点击上传视频课程</span>
        </li>
        <li>
          <i class="iconfont">&#xe616;</i>
          <p>创建练习卷</p>
          <span>可导入EXCEL格式的试题库</span>
        </li>
        <li @click="clickOpenType('graphic')">
          <i class="iconfont">&#xe61c;</i>
          <p>图文创作</p>
          <span>文章创作，适合资讯或知识拓展</span>
        </li>
      </ul>
    </div>
    <!-- 底部草稿展示 -->
    <div class="div_homePageBot">
      <div class="bot_draft">
        <ul class="ul_type_name">
          <li
            v-for="(v, i) in draftArr"
            :key="i"
            :class="i == nowDraft && 'licolor'"
            @click="clickChangeDraft(i)"
          >
            {{ v }}
          </li>
        </ul>
        <button>全部草稿</button>
      </div>
      <ul class="bot_bodyList">
        <li>
          <div class="bodylist_left">
            <div class="left_img"></div>
            <div class="left_title">
              <h3>拆真题07→以”设计分析可视化”为内容的设计考研快题要素拆解</h3>
              <p>国内考试必考的内容，超高频知识点精编</p>
              <span>星期六 22:33</span>
            </div>
          </div>
          <div class="bodylist_right">
            <button><i class="iconfont">&#xe60a;</i>继续编辑</button>
            <div class="div_del_but">
              <i class="iconfont">&#xe60d;</i>
            </div>
          </div>
        </li>
        <li>
          <div class="bodylist_left">
            <div class="left_img"></div>
            <div class="left_title">
              <h3>拆真题07→以”设计分析可视化”为内容的设计考研快题要素拆解</h3>
              <p>国内考试必考的内容，超高频知识点精编</p>
              <span>星期六 22:33</span>
            </div>
          </div>
          <div class="bodylist_right">
            <button><i class="iconfont">&#xe60a;</i>继续编辑</button>
            <div class="div_del_but">
              <i class="iconfont">&#xe60d;</i>
            </div>
          </div>
        </li>
        <li>
          <div class="bodylist_left">
            <div class="left_img"></div>
            <div class="left_title">
              <h3>拆真题07→以”设计分析可视化”为内容的设计考研快题要素拆解</h3>
              <p>国内考试必考的内容，超高频知识点精编</p>
              <span>星期六 22:33</span>
            </div>
          </div>
          <div class="bodylist_right">
            <button class="icon_but">
              <i class="iconfont">&#xe60a;</i>继续编辑
            </button>
            <div class="div_del_but">
              <i class="iconfont">&#xe60d;</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      draftArr: ["图文草稿", "专栏草稿", "练习题草稿", "视频课草稿"],
      nowDraft: 0,
    };
  },
  methods: {
    // 点击创作专栏
    clickOpenType(urlName) {
      this.$router.push({ name: urlName });
    },
    // 点击草稿头部
    clickChangeDraft(inde) {
      this.nowDraft = inde;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/icon.css";
.homePage_html {
  width: 100%;
  padding: 12px 70px;
  box-sizing: border-box;
  font-family: PingFang SC;
  > div {
    width: 100%;
    background-color: white;
    border-radius: 5px;
  }
  .div_homePageTop {
    box-sizing: border-box;
    padding: 20px 32px;
    > h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
    }
    .ul_typeSelection {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      li {
        width: 256px;
        height: 158px;
        padding: 10px;
        box-sizing: border-box;

        background: #ffffff;
        border: 1px dotted #e7e7eb;
        opacity: 1;
        border-radius: 0px;
        text-align: center;
        user-select: none;
        cursor: pointer;
        i {
          display: inline-block;
          font-size: 36px;
          color: #4c4d4e;
          margin: 28px 0px 12px;
        }
        p {
          font-size: 16px;
          color: #242424;
          margin-bottom: 10px;
          color: #242424;
        }
        span {
          font-size: 13px;
          color: #bcbcbc;
        }
      }
      li:hover {
        border-color: #ff6f6f;
      }
    }
  }
  .div_homePageBot {
    margin-top: 20px;
    .bot_draft {
      width: 100%;
      height: 90px;
      padding: 0px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #f4f4f4;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .ul_type_name {
        display: flex;
        li {
          line-height: 28px;
          font-size: 18px;
          font-weight: 500;
          color: #999999;
          margin-right: 50px;
          user-select: none;
          cursor: pointer;
        }
        .licolor {
          color: #333333;
          font-weight: 600;
        }
      }
      > button {
        width: 92px;
        height: 40px;
        background: #f6f7f8;
        border-radius: 5px;
        line-height: 40px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
      }
    }
    .bot_bodyList {
      width: 100%;
      height: 569px;
      padding: 12px 32px 0px;
      box-sizing: border-box;
      > li {
        width: 100%;
        height: 100px;
        padding: 18px 0px 32px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f4f4f4;

        align-items: center;
        .bodylist_left {
          display: flex;
          align-items: center;
          .left_img {
            width: 180px;
            height: 103px;
            border-radius: 7px;
            background: #ff6f6f;
          }
          .left_title {
            margin-left: 26px;
            > h3 {
              // width: 400px;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
              line-height: 25px;
              font-size: 18px;
              font-weight: 500;
              color: #212121;
            }
            p {
              line-height: 22px;
              font-size: 16px;
              color: #90969f;
              margin: 6px 0px 15px;
            }
            span {
              line-height: 22px;
              font-size: 16px;
              font-weight: 500;
              color: #90969f;
            }
          }
        }
        .bodylist_right {
          display: flex;
          > button {
            cursor: pointer;
            text-align: center;
            width: 96px;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            background: #ffffff;
            border: 1px solid #e7e7e7;
            border-radius: 2px;
            color: #505050;
            > i {
              font-size: 12px;
              margin-right: 8px;
            }
          }
          > button:hover {
            background-color: #ff8c79;
            color: white;
          }
          .div_del_but {
            width: 40px;
            cursor: pointer;
            height: 40px;
            background: #ffffff;
            color: #bfbfbf;
            border: 1px solid #e7e7e7;
            border-radius: 2px;
            text-align: center;
            line-height: 40px;
            margin-left: 16px;
            i {
              font-size: 16px;
              line-height: 40px;
            }
          }
          .div_del_but:hover {
            background-color: #ff8c79;
            color: white;
          }
        }
      }
    }
  }
}
</style>