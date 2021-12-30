<template>
  <div class="zcbzHtml_two">
    <!-- 头部 -->
    <div class="nr_header">
      <div class="nr_header_left">
        <div><img src="../../assets/LOGO.svg" /></div>
        <div class="nr_header_left_title">备考猫创作中心</div>
      </div>
    </div>
    <div style="height: 70px"></div>
    <!-- 内容页面 -->
    <div class="zc2_div_body">
      <!-- 步骤条 -->
      <div class="zc_topSchedule">
        <p class="p_xian" style="background: #fd6246"></p>
        <p class="p_xian"></p>
        <div class="schedule_formerly">
          <span>1</span>
        </div>
        <div class="schedule_now">
          <span>2</span>
        </div>
        <div class="schedule_future">
          <span>3</span>
        </div>
      </div>
      <ul class="zc2_ul_form">
        <li class="form_list">
          <div class="formList_name">账号名称</div>
          <div class="formList_box">
            <div class="formList_input" ref="uninput">
              <input
                type="text"
                class="input_name"
                v-model="userform.username"
                @input="inputName()"
                @focus="focusName()"
                @blur="blurName()"
              />
              <p>{{ userform.username.length }}/15</p>
            </div>
            <div class="form_error" v-show="warning.un > 0 && warning.un < 6">
              {{ warning.un > 1 ? "账号名不符合命名规则" : "账号名不得为空" }}
            </div>
            <div class="form_tis">
              <span
                >长度2-15个字，中英文不限，请勿使用含有特殊符号和推广意图明显的账号名称</span
              >
              <Tooltip>
                <img
                  src="../../assets/images/jcxx/question.svg"
                  class="img_question"
                />
                <template v-slot:body>
                  <div class="tooltip_p">
                    备考猫创作者账号名称中含有以下内容，将不予通过:<br /><br />
                    1. 色情、反动、血腥及上级主管机关明令禁止的其他内容;<br />
                    2.特殊符号、空格、火星文;<br />
                    3.含有QQ、微信、微博、网址、邮箱、手机号等联系方式;<br />
                    4.冒用他人、社会公众人物、明星、企业及组织的名称;<br />
                    5.单独以国家城市省份命名的名称;<br />
                    6.包含但不限于中考、高考等K12教育性质的名称;<br />
                  </div>
                </template>
              </Tooltip>
            </div>
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">账号简介</div>
          <div class="formList_box">
            <div class="formList_input" style="height: 120px" ref="jianjie">
              <textarea
                class="form_textarea"
                @focus="focusJianjie"
                @blur="blurJianjie"
                v-model="userform.idtitle"
              ></textarea>
              <p style="top: calc(100% - 23px)">
                {{ userform.idtitle.length }}/120
              </p>
            </div>
            <div class="form_error" v-show="warning.it > 0 && warning.it < 6">
              {{
                warning.it > 1
                  ? "不可出现电话、微信、广告营销等信息"
                  : "账号简介不得为空，且最大字数不得超过120个"
              }}
            </div>
            <span
              >可填写帐号的定位、作者简介、作者身份或影响力等信息，简介将显示在帐号主页，请勿发布手机号、邮箱、广告营销等信息，请勿超过120个字</span
            >
          </div>
        </li>
        <!-- <li class="form_list">
          <div class="formList_name">账号标签</div>
          <div class="formList_box">
            <div class="formList_input_select" ref="zhbq">
              <el-select
                class="tagSelect"
                :value="userform.userlabel"
                multiple
                filterable
                closable
                allow-create
                remote
                default-first-option
                @change="bqChange"
              >
              </el-select>
            </div>
            <div class="form_error" v-show="warning.ul > 0 && warning.ul < 6">
              {{ warning.ul > 1 ? "标签个数超过上限" : "标签个数不得为空" }}
            </div>
            <span
              >可填写帐号的内容定位、创作者专注的领域等信息，最多5个关键词，按回车键enter创建</span
            >
          </div>
        </li> -->
        <li class="form_list">
          <div class="formList_name">账号头像</div>
          <div class="formList_uploader_box">
            <div class="formList_uploader">
              <el-upload
                class="avatar-uploader"
                action
                :auto-upload="false"
                :show-file-list="false"
                accept="image/png,image/jpeg,image/jpg"
                :on-change="changeUpload"
              >
                <img
                  v-if="userform.imageUrl"
                  :src="userform.imageUrl"
                  class="formList_uploader_img"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="form_error" v-show="warning.iu > 0 && warning.iu < 6">
              {{ warning.iu > 1 ? "请上传正确格式的图像" : "上传图像不得为空" }}
            </div>
            <span
              >能代表个人品牌形象，请勿使用二维码和侵权头像，图片建议尺寸不低于200*200像素，大小不超过5M，支持jpg、jpeg和png格式</span
            >
          </div>
        </li>
        <li class="form_list">
          <div class="div_input_consent">
            <input type="checkbox" v-model="userform.isConsent" />
            <div class="div_consent_agreement">
              <span>我已阅读并同意</span>
              <a href="https://bkm.heyhui.com/#/agreement" target="_blank"
                >《备考猫内容创作平台协议》</a
              >
            </div>
          </div>
        </li>
      </ul>
      <div
        class="zc2_div_next"
        :style="
          userform.isConsent
            ? 'background-color:#FF6246;cursor: pointer;'
            : 'background-color:#C8C8D3;cursor: no-drop;'
        "
        @click="userNext()"
      >
        下一步
      </div>
    </div>
    <!-- 裁剪弹框 -->
    <el-dialog
      title="上传账号头像"
      :visible.sync="centerDialogVisible"
      width="720px"
    >
      <div class="zc2_div_copper">
        <VueCropper
          ref="cropper"
          style="width: 280px; height: 180px"
          :img="posterURL"
          :autoCrop="true"
          :original="false"
          centerBox
          fixed
          :full="false"
          :fixedNumber="[1, 1]"
          canMoveBox
          :infoTrue="true"
          :outputSize="1"
          :height="true"
          outputType="png"
          @realTime="realTime"
        >
        </VueCropper>
        <div class="zc2_div_headimg">
          <p>预览</p>
          <div class="zc2_img_show">
            <div class="zc2_img_showLeft">
              <div :style="previewStyle">
                <div :style="previews.div">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
            </div>
            <div class="zc2_img_showRight">
              <div :style="previewStyle">
                <div :style="previews.div">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmImg">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { request } from "@/network/request/request";
import { requestLogin } from "@/network/request/requestLogin";
import Tooltip from "../../components/zhgl/components/tooltip.vue";
export default {
  data() {
    return {
      userid: null, //用户id
      active: 1, //步骤0 1 2
      userform: {
        username: "", //姓名
        idtitle: "", //简介
        // userlabel: [], //标签
        imageUrl: null, //展示头像url
        uploadImg: null, //上传头像url
        isConsent: false, //是否同意协议
      },
      warning: { un: 0, it: 0, iu: 0 }, //警告监听 0默认 1为空 2错误 6正确
      posterURL: "", //本地提交的图片链接
      centerDialogVisible: false, //开关弹框
      imageZoom: 0, //图片缩放比例
      previews: {}, //截图文件
      previewStyle: "", //截图样式
    };
  },
  created() {
    let longinUser = sessionStorage.getItem("loginUser");
    if (longinUser) {
      let userMessage = JSON.parse(longinUser);
      this.userid = userMessage.id;
      //1. 查询当前用户信息
      request({
        url: "/user/userView",
        data: {
          czz_id: userMessage.id,
        },
      }).then((data) => {
        console.log(data);
        //2. 根据token判断用户是否正确
        let token1 = data.data.data.token;
        if (token1 == userMessage.token) {
          //3. 继承后台用户信息
          console.log("重新继承数据", data.data.data);
          let { nickname, summary, himg, showhimg } = data.data.data;
          this.warning.un = this.strIsnull(nickname);
          this.userform.username = nickname;
          this.warning.it = this.strIsnull(summary);
          this.userform.idtitle = summary;
          // this.warning.ul = this.strIsnull(biaoqian);
          // if (biaoqian.length != 0) {
          //   this.userform.userlabel = JSON.parse(biaoqian);
          // }
          this.userform.imageUrl = showhimg;
          this.warning.iu = this.strIsnull(showhimg);
          this.userform.uploadImg = himg;
          this.userform.isConsent = true;
        } else {
          this.$message.error("您的注册信息有误！请重新注册");
          this.$router.push({ name: "zhuce1" });
        }
      });
    } else {
      this.$message.error("您的注册信息有误！请重新注册");
      this.$router.push({ name: "zhuce1" });
    }
  },
  methods: {
    strIsnull(val) {
      let warn = 6;
      if (val.length == 0) warn = 0;
      return warn;
    },
    // 姓名
    inputName() {
      let unlength = this.userform.username.length;
      let yzusname = /^[\u4e00-\u9fa5a-zA-Z]+$/;
      if (unlength == 0) {
        this.warning.un = 1;
        this.$refs.uninput.style = "border: 1px solid #F23C42";
      } else if (!yzusname.test(this.userform.username)) {
        this.warning.un = 2;
        this.$refs.uninput.style = "border: 1px solid #F23C42;";
      } else if (unlength < 2 || unlength > 15) {
        this.warning.un = 2;
        this.$refs.uninput.style = "border: 1px solid #F23C42;";
      } else {
        this.warning.un = 6;
        this.$refs.uninput.style = "border: 1px solid #dcdfe6;";
      }
    },
    focusName() {
      this.$refs.uninput.style = "border: 1px solid #dcdfe6;";
    },
    blurName() {
      if (this.userform.username.length == 0) {
        this.warning.un = 1;
        this.$refs.uninput.style = "border: 1px solid #F23C42;";
      }
    },
    // 课程简介
    focusJianjie() {
      this.$refs.jianjie.style = "border: 1px solid #dcdfe6";
    },
    blurJianjie() {
      let idstr = this.userform.idtitle;
      let length = this.userform.idtitle.length;
      // 手机号:/(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}/g
      // 网址: /((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      // 邮箱:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g
      let yznumber =
        /(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}/g;
      let yzurl =
        /((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
      let yzemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
      console.log(yznumber.test(idstr), yzurl.test(idstr), yzemail.test(idstr));
      if (length == 0) {
        this.warning.it = 1;
        this.$refs.jianjie.style = "border: 1px solid #F23C42";
      } else if (
        yznumber.test(idstr) ||
        yzurl.test(idstr) ||
        yzemail.test(idstr)
      ) {
        this.warning.it = 2;
        this.$refs.jianjie.style = "border: 1px solid #F23C42";
      } else if (length > 120) {
        this.warning.it = 1;
        this.$refs.jianjie.style = "border: 1px solid #F23C42";
      } else {
        this.warning.it = 6;
        this.$refs.jianjie.style = "border: 1px solid #dcdfe6";
      }
    },
    //账号标签
    // bqChange(data) {
    //   if (data.length > 5) {
    //     this.warning.ul = 2;
    //     this.$refs.zhbq.style = "border: 1px solid #F23C42";
    //   } else {
    //     this.warning.ul = 6;
    //     this.$refs.zhbq.style = "border: 1px solid #dcdfe6";
    //   }
    //   this.userform.userlabel = data;
    // },
    // 上传文件
    // 1.选取文件时触发
    changeUpload(file) {
      // 判断文件大小与格式
      let { size, type } = file.raw;
      let typearr = ["image/png", "image/jpeg", "image/jpg"];
      if (size / 1024 / 1024 < 5 && typearr.indexOf(type) != -1) {
        // 获取上传图片的url(本地)
        this.posterURL = URL.createObjectURL(file.raw);
        this.centerDialogVisible = true;
      } else {
        this.$message.error("请选择正确格式的图片");
      }
    },
    // 2. 截图预览
    realTime(data) {
      let previews = data;
      this.previewStyle = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 108 / previews.h,
      };
      this.previews = data;
    },
    // 3. 确认截取-只有确认时才修改当前图片
    confirmImg() {
      // 4. 获取截图的blob数据
      this.$refs.cropper.getCropBlob((imgfile) => {
        let formData = new FormData();
        formData.append("file", imgfile);
        //5. 上传图片
        requestLogin({
          baseURL: "https://bkmcsapi.heyhui.com",
          url: "/page/upload/uploadImgs",
          data: {
            file: formData,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [
            function () {
              return formData;
            },
          ],
        })
          .then((data) => {
            if (data.data.status) {
              this.userform.imageUrl = data.data.showurl;
              this.userform.uploadImg = data.data.url;
              this.warning.iu = 6;
            } else {
              this.$message.error("上传失败请稍后再试!");
            }
            this.centerDialogVisible = false;
          })
          .catch((err) => {
            console.log("请求错误");
            this.centerDialogVisible = false;
          });
      });
    },
    //最终流程 提交
    userNext() {
      // 1. 用户已同意
      if (this.userform.isConsent) {
        // 2. 检查输入状态
        let { un, it, iu } = this.warning;
        console.log(this.warning);
        let isOk = un == 6 && it == 6 && iu == 6;
        // 3. 开始提交
        if (isOk) {
          console.log(this.userform); //userform： 当前用户输入信息
          //4. 提交至服务器
          request({
            url: "/login/setaccount",
            data: {
              user_id: this.userid,
              nickname: this.userform.username,
              summary: this.userform.idtitle,
              himg: this.userform.uploadImg,
              biaoqian: "",
            },
          }).then((data) => {
            console.log("提交信息", data);
            // 成功进入下一步
            if (data.data.st == 1) {
              this.$router.replace({
                name: "zhuce3",
              });
            } else {
              this.$message.error("提交失败！请稍后再试");
            }
          });
        } else {
          this.$message.error("请将表单填写完成后再操作");
        }
      }
    },
  },
  components: {
    VueCropper,
    Tooltip,
  },
};
</script>
<style scoped  lang="scss">
.tooltip_p {
  line-height: 20px;
  font-size: 12px;
  font-family: PingFang SC;
  line-height: 20px;
  color: #707070;
}
.img_question {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.zcbzHtml_two {
  width: 100vw;
  height: 100%;
  font-family: PingFang SC;
  overflow: hidden;
  background-color: #fafafa;
  overflow: hidden;
}
.nr_header {
  width: 100vw;
  min-width: 1260px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 6px 15px rgba(211, 211, 211, 0.16);
  position: absolute;
  z-index: 10086;
}
.nr_header_left {
  margin-left: 5%;
  display: flex;
  align-items: center;
}
.nr_header_left_title {
  margin-left: 10px;
  font-size: 24px;
  font-family: PingFang TC, PingFang TC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #37373b;
}
.zc2_div_body {
  width: 1204px;
  padding: 80px 260px 70px;
  box-sizing: border-box;
  /* border: 1px solid red; */
  background-color: #ffffff;
  margin: 0 auto;
  .zc_topSchedule {
    width: 684px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-family: PingFang SC;
    .p_xian {
      width: 50%;
      height: 2px;
      background: #888b96;
    }
    > div {
      text-align: center;
    }
    span {
      display: inline-block;
      border-radius: 50%;
      position: relative;
      font-weight: 500;
    }
    .schedule_formerly {
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(0%, -50%);
      > span {
        line-height: 32px;
        width: 32px;
        height: 32px;
        background: #ffffff;
        border: 2px solid #fd6246;
        color: #fd6246;
      }
      > span::before {
        content: "注册账号";
        font-size: 14px;
        position: absolute;
        display: inline-block;
        white-space: nowrap;
        top: 100%;
        left: 50%;
        color: #000000;
        transform: translate(-50%, 0%);
      }
    }
    .schedule_now {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > span {
        width: 48px;
        height: 48px;
        background: #fd6246;
        line-height: 48px;
        font-size: 28px;
        color: white;
      }
      > span::before {
        content: "填写账号信息";
        position: absolute;
        display: inline-block;
        font-size: 16px;
        white-space: nowrap;
        top: 100%;
        left: 50%;
        color: #fd6246;
        transform: translate(-50%, 0%);
      }
    }
    .schedule_future {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translate(0%, -50%);
      > span {
        line-height: 32px;
        width: 32px;
        height: 32px;
        background: #ffffff;
        border: 2px solid #888b96;
        color: #888b96;
      }
      > span::before {
        content: "填写申请人信息";
        font-size: 14px;
        position: absolute;
        display: inline-block;
        white-space: nowrap;
        top: 100%;
        left: 50%;
        color: #888b96;
        transform: translate(-50%, 0%);
      }
    }
  }
}
.zc2_ul_form {
  width: 100%;
  list-style: none;
  margin-top: 140px;
}
.form_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.formList_name {
  font-size: 14px;
  color: #37373b;
  position: relative;
  margin-top: 10px;
}
.formList_name::before {
  content: "*";
  width: 8px;
  height: 8px;
  text-align: center;
  line-height: 8px;
  display: inline-block;
  color: #fd6246;
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: -16px;
}
.formList_box {
  width: 560px;
  margin-bottom: 40px;
}
.formList_box > span {
  display: inline-block;
  width: 100%;
  color: #9597a1;
  line-height: 16px;
  font-size: 13px;
  margin-top: 8px;
}
.form_error {
  height: 18px;
  line-height: 18px;
  font-size: 13px;
  color: #f23c42;
}
.form_tis {
  display: flex;
  margin-top: 8px;
  > span {
    display: inline-block;
    color: #9597a1;
    line-height: 16px;
    font-size: 13px;
    margin-right: 8px;
  }
  align-items: center;
}
.formList_input {
  width: 560px;
  border: 1px solid #dcdfe6;
  position: relative;
}
.input_name {
  width: 90%;
  height: 40px;
  border: none;
  outline: none;
  padding: 0px 10px;
}
.formList_input > p {
  color: #9597a1;
  font-size: 14px;
  position: absolute;
  top: calc(50% - 6px);
  right: 10px;
}

.form_textarea {
  width: 100%;
  height: 120px;
  border: none;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
  color: #080808;
  font-size: 14px;
  font-family: PingFang SC;
}
.formList_uploader_box {
  width: 560px;
  margin-bottom: 86px;
}
.formList_uploader_box > span {
  display: inline-block;
  width: 100%;
  color: #9597a1;
  line-height: 16px;
  font-size: 13px;
  margin-top: 8px;
}

.formList_uploader {
  width: 104px;
  height: 104px;
  border: 1px dashed #e5e7ec;
  background-color: #fafafa;
  position: relative;
}
.formList_uploader_img {
  width: 100%;
  height: 100%;
}
/* element上传样式 */
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 104px;
  height: 104px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 104px;
  height: 104px;
  display: block;
}

.div_input_consent {
  width: 100%;
  height: 24px;
  /* border: 1px solid rebeccapurple; */
  display: flex;
  align-items: center;
}
.div_input_consent > input {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
.div_consent_agreement > span {
  font-size: 14px;
  color: #37373b;
}
a {
  text-decoration: none;
  color: #3c52e0;
  font-size: 14px;
  font-family: PingFang SC;
}
.zc2_div_next {
  width: 108px;
  height: 40px;
  background: #c8c8d3;
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 2px;
  margin: 50px auto 64px;
  user-select: none;
  cursor: no-drop;
}
.formList_input_select {
  width: 560px;
  border: 1px solid #dcdfe6;
  position: relative;
}

.tagSelect {
  width: 100%;
  // position: absolute;
  left: 0;
  ::v-deep .el-select__input {
    /*text-indent: 16px;*/
    padding-left: 15px;
  }
  ::v-deep .el-input__prefix {
    left: 92%;
  }
  // ::v-deep .el-input {
  //   // border: 1px solid #dcdfe6;
  // }
  ::v-deep .el-input input {
    padding-left: 15px !important;
    // text-indent: 15px;
    border: none;
  }
  ::v-deep .el-select__tags {
    padding-left: 15px !important;
  }
  ::v-deep .el-select__input {
    padding-left: 0px !important;
  }
  ::v-deep .el-tag {
    /*width: 109px;*/
    height: 30px;
    background: #ffeae2;
    opacity: 1;
    border: none;
    border-radius: 8px;
    line-height: 30px;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ff6246;
    .el-select__tags-text {
      font-size: 14px;
      font-weight: bold;
      margin-left: 3px;
    }
    .el-tag__close {
      color: #fd6243;
      margin-right: 5px;
      background: none;
      font-size: 15px;
      font-weight: 900;
      line-height: 19px;
    }
  }
}
.zc2_div_copper {
  width: 100%;
  height: 180px;
  // background: #fd9a9a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zc2_div_headimg {
  width: 272px;
}
.zc2_div_headimg > p {
  width: 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: #000000;
}
.zc2_img_show {
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
.zc2_img_showLeft {
  width: 108px;
  height: 108px;
  // border: 1px solid red;
}
.zc2_img_showRight {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  // border: 1px solid blue;
  overflow: hidden;
}
.img_showLeft {
  width: 108px;
  height: 100px;
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}
//截图框设置
// 1. 背景样式
.vue-cropper {
  background-image: none !important;
  background: #fafafa;
  border: 1px solid #dcdfe6;
}
// 2.遮罩层样式
.cropper-modal {
  background: none !important;
}
</style>
