<template>
  <div class="nr">
    <div class="zy" v-if="userData">
      <!-- 头部 -->
      <div class="nr_top">
        <div class="nr_top_title">账号信息</div>
        <!-- 头像显示 -->
        <div class="nr_top_head">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            accept="image/png,image/jpeg,image/jpg"
            :on-change="changeUpload"
          >
            <img v-lazy="userData.showhimg" class="nr_top_head_img" />
            <div class="nr_top_ze ishover"></div>
            <img
              src="../../assets/images/jcxx/amendImg.png"
              class="nr_top_changeImg ishover"
            />
          </el-upload>
        </div>
        <!--账号信息-->
        <ul class="nr_top_ul_number">
          <li>
            <div class="ulnumber_list_name">账号名称</div>
            <div class="ulnumber_list_content">{{ userData.nickname }}</div>
            <div class="ulnumber_list_extra">
              <span class="sp_change" @click="isChangeName = true">修改</span>
              <span class="sp_change2">您还有3次修改机会</span>
              <Tooltip>
                <img
                  src="../../assets/images/jcxx/question.svg"
                  class="img_question"
                />
                <template v-slot:body>
                  <div class="tooltip_p">
                    创作者一年内有3次修改账号名称的机会，若第一次修改账号名称时间为2021年11月22号，到2022年11月22号之前，还可修改2次账号名称
                  </div>
                </template>
              </Tooltip>
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">猫爪号</div>
            <div class="ulnumber_list_hao">{{ userData.account }}</div>
          </li>
          <li>
            <div class="ulnumber_list_name">账号简介</div>
            <div class="ulnumber_list_jianjie">
              <div class="ulnumber_list_content2" v-show="!isChangeContent">
                {{ userData.summary }}
              </div>
              <input
                ref="refsim"
                class="ulnumber_list_content3"
                :placeholder="userData.summary"
                v-model="simmary"
                v-show="isChangeContent"
              />
              <div class="form_error" v-show="warning.jj > 0 && warning.jj < 6">
                {{
                  warning.jj > 1
                    ? "不可出现电话、微信、广告营销等信息"
                    : "账号简介不得为空，且最大字数不得超过120个"
                }}
              </div>
              <div class="ulnumber_list_extra">
                <span
                  v-show="!isChangeContent"
                  class="sp_change"
                  @click="Changejj()"
                  >修改</span
                >
                <div class="sp_ischange" v-show="isChangeContent">
                  <span @click="changeContent()">保存</span>
                  <span @click="unchangeContent()">取消</span>
                </div>
                <span class="sp_change2">您还有5次修改机会</span>
                <Tooltip>
                  <img
                    src="../../assets/images/jcxx/question.svg"
                    class="img_question"
                  />
                  <template v-slot:body>
                    <div class="tooltip_p">
                      可填写帐号的定位、作者简介、作者身份或影响力等信息，简介将显示在帐号主页，请勿发布手机号、邮箱、广告营销等信息，请勿超过120个字。
                    </div>
                  </template>
                </Tooltip>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 个人信息 -->
      <div class="nr_body">
        <div class="nr_top_title">个人信息</div>
        <ul class="nr_top_ul_number">
          <li>
            <div class="ulnumber_list_name">个人姓名</div>
            <div class="ulnumber_list_right">
              {{ userData.name ? userData.name : "***" }}
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">硕士院校</div>
            <div class="ulnumber_list_right">
              <div class="ulnumber_list_school">
                {{
                  userData.teacher_info.sname +
                  "-" +
                  userData.teacher_info.faculty +
                  "-" +
                  userData.teacher_info.major
                }}
              </div>
              <div class="ulnumber_list_typechange">
                {{ this.schoolType }}
              </div>
              <div class="ulnumber_list_update" @click="openChangetype()">
                修改
              </div>
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">个人认证</div>
            <div class="ulnumber_list_right">
              <span class="ulnumber_list_right_renz">已认证</span>
              <Tooltip>
                <img
                  src="../../assets/images/jcxx/question.svg"
                  class="img_question"
                />
                <template v-slot:body>
                  <div class="tooltip_p">
                    个人认证指注册成功且完成实名认证，同时创作者满足申请标准、提交相关资质且通过审核。
                  </div>
                </template>
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
      <!-- 安全信息 -->
      <div class="nr_bottom">
        <div class="nr_top_title">账号信息</div>
        <ul class="nr_bot_ul_number">
          <li>
            <div class="ulnumber_list_name">登录手机号</div>
            <div class="ulnumber_list_right">
              <div class="unmber_list_title">{{ userData.mobile }}</div>
              <!-- <div class="unmber_list_change">更换手机号</div> -->
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">安全邮箱</div>
            <div class="ulnumber_list_right">
              <div class="unmber_list_title">
                {{ userData.teacher_info.email }}
              </div>
              <!-- <div class="unmber_list_change">更换邮箱</div> -->
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">微信账号绑定</div>
            <div class="ulnumber_list_right">
              <div class="unmber_list_title">已绑定</div>
              <!-- <div class="unmber_list_change">解绑微信</div> -->
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">QQ账号绑定</div>
            <div class="ulnumber_list_right">
              <div class="unmber_list_title">已绑定</div>
              <!-- <div class="unmber_list_change">解绑QQ</div> -->
            </div>
          </li>
          <li>
            <div class="ulnumber_list_name">微博账号绑定</div>
            <div class="ulnumber_list_right">
              <div class="unmber_list_title">未绑定</div>
              <!-- <div class="unmber_list_change">绑定微博</div> -->
            </div>
          </li>
        </ul>
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
          centerBox
          fixed
          :info="false"
          autoCropWidth="180"
          autoCropHeight="180"
          :full="false"
          :fixedNumber="[1, 1]"
          canMoveBox
          :infoTrue="true"
          :outputSize="1"
          :height="true"
          :original="false"
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
        <div class="div_isOK_button" style="justify-content: center">
          <span class="spOk" @click="confirmImg">确定</span>
          <span class="spNo" @click="centerDialogVisible = false">取消</span>
        </div>
      </span>
    </el-dialog>
    <!--name弹框 -->
    <el-dialog
      :visible.sync="isChangeName"
      width="720px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="isclose()"
    >
      <div slot="title" class="div_changeNameTop">
        <div class="top_title">
          <span class="name">修改账号名称</span>
          <b>您还有3次修改机会</b>
        </div>
        <i class="el-icon-close close_icon" @click="isChangeName = false"></i>
      </div>
      <div class="div_changeName">
        <div class="formList_input" ref="uninput">
          <input
            type="text"
            class="input_name"
            v-model="nickname"
            @input="inputName()"
            @focus="focusName()"
            @blur="blurName()"
          />
          <p>{{ nickname.length }}/15</p>
        </div>
        <div class="form_error" v-show="warning.un > 0 && warning.un < 6">
          {{ warning.un > 1 ? "账号名不符合命名规则" : "账号名不得为空" }}
        </div>
        <div class="form_tishi">
          <span>
            长度2-15个字，中英文不限，请勿使用含有特殊符号和推广意图明显的账号名称
          </span>
          <Tooltip>
            <img
              src="../../assets/images/jcxx/question.svg"
              class="img_question"
            />
            <template v-slot:body>
              <div class="tooltip_p">
                备考猫创作者名称中含有以下内容，将不予通过:<br /><br />
                1.色情、反动、血腥及上级主管机关明令禁止的其他内容;<br />
                2.特殊符号、空格、火星文;<br />
                3.含有QQ、微信、微博、网址、邮箱、手机号等联系方式;<br />
                4.冒用他人、社会公众人物、明星、企业及组织的名称; <br />
                5.单独以国家城市省份命名的名称;<br />
                6.包含但不限于中考、高考等K12教育性质的名称;<br />
              </div>
            </template>
          </Tooltip>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="div_isOK_button">
          <span class="spOk" @click="changeUsername()">确定</span>
          <span class="spNo" @click="unChangeName()">取消</span>
        </div>
      </span>
    </el-dialog>
    <!--在校状态弹框-->
    <el-dialog
      title="修改学历状态"
      :visible.sync="ifChangeSchool"
      width="400px"
    >
      <div class="div_changeSchool">
        <el-radio v-model="schoolRadio" label="1">已录取</el-radio>
        <br />
        <el-radio v-model="schoolRadio" label="2">就读中</el-radio>
        <br />
        <el-radio v-model="schoolRadio" label="3">已毕业</el-radio>
        <br />
        <el-radio v-model="schoolRadio" label="4">已结业</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ChangeSchoolType()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request/request";
import Tooltip from "./components/tooltip.vue";
import { VueCropper } from "vue-cropper";

export default {
  name: "jcxx",
  data() {
    return {
      userData: null,
      centerDialogVisible: false, //截图框显隐控制
      posterURL: null, //当前截图url
      previews: {}, //截图文件
      previewStyle: "", //截图样式
      isChangeName: false,
      nickname: "",
      isChangeContent: false,
      simmary: "",
      ifChangeSchool: false,
      schoolRadio: "", //1已录取2就读中3已毕业4已结业
      warning: { un: 0, jj: 0 }, //警告监听 0默认 1为空 2错误 6正确
    };
  },
  async created() {
    // 继承请求过来的信息
    let res = await this.Get();
    this.nickname = res.nickname;
  },
  methods: {
    //0.获取用户信息
    Get() {
      return new Promise((res, rej) => {
        request({
          url: "user/userView",
          data: {
            czz_id: JSON.parse(localStorage.getItem("user")).id,
          },
        }).then((data) => {
          res(data.data.data);
          this.userData = data.data.data;
          this.posterURL = this.userData.showhimg;
          console.log(data.data.data, "当前请求的个人信息");
        });
      });
    },
    //1-1截图方法 //点击头像
    changeUpload(file) {
      let { size, type } = file.raw;
      let typearr = ["image/png", "image/jpeg", "image/jpg"];
      if (size / 1024 / 1024 < 5 && typearr.indexOf(type) != -1) {
        // 获取上传图片的url
        this.posterURL = URL.createObjectURL(file.raw);
        this.centerDialogVisible = true;
      } else {
        this.$message.error("请选择正确格式的图片");
      }
    },
    //1-2截图浏览
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
    //1-3头像上传
    confirmImg() {
      // 4. 获取截图的blob数据
      this.$refs.cropper.getCropBlob((imgfile) => {
        let formData = new FormData();
        formData.append("file", imgfile);
        //5. 上传图片
        request({
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
              this.userData.showhimg = data.data.showurl;
              this.userData.himg = data.data.url;
              this.changeUser("/user/upHimg", {
                czz_id: this.userData.id,
                himg: data.data.url,
              });
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
    // 2-2昵称输入检查
    inputName() {
      let unlength = this.nickname.length;
      let yzusname = /^[\u4e00-\u9fa5a-zA-Z]+$/;
      if (unlength == 0) {
        this.warning.un = 1;
        this.$refs.uninput.style = "border: 1px solid #F23C42";
      } else if (!yzusname.test(this.nickname)) {
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
    //2-2样式
    focusName() {
      this.$refs.uninput.style = "border: 1px solid #dcdfe6;";
    },
    blurName() {
      if (this.nickname.length == 0) {
        this.warning.un = 1;
        this.$refs.uninput.style = "border: 1px solid #F23C42;";
      }
    },
    //2-3确定
    changeUsername() {
      if (this.warning.un == 6) {
        this.changeUser("user/upName", {
          czz_id: this.userData.id,
          nickname: this.nickname,
        });
        this.userData.nickname = this.nickname;
        this.isChangeName = false;
      }
    },
    //2-4取消
    unChangeName() {
      this.isChangeName = false;
      this.nickname = this.userData.nickname;
    },
    isclose() {
      this.warning.un = 0;
      this.$refs.uninput.style = "border: 1px solid #dcdfe6;";
    },
    // 3-0账号简介
    Changejj() {
      this.isChangeContent = !this.isChangeContent;
      this.$nextTick(() => {
        this.$refs.refsim.focus();
      });
    },
    yazCont() {
      let yznumber =
        /(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}/g;
      let yzurl =
        /((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
      let yzemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
      if (this.simmary.length <= 0 || this.simmary.length > 120) {
        this.warning.jj = 1;
      } else if (
        yznumber.test(this.simmary) ||
        yzurl.test(this.simmary) ||
        yzemail.test(this.simmary)
      ) {
        this.warning.jj = 2;
      } else {
        this.warning.jj = 6;
      }
    },
    // 确认修改-修改简介"user/upJieshao"
    changeContent() {
      this.yazCont();
      if (this.warning.jj == 6) {
        this.userData.summary = this.simmary;
        this.changeUser("user/upJieshao", {
          czz_id: this.userData.id,
          jieshao: this.simmary,
        });
        this.isChangeContent = false;
        this.simmary = "";
      }
    },
    // 取消修改
    unchangeContent() {
      this.isChangeContent = false;
      this.simmary = "";
      this.warning.jj = 0;
    },
    //4-0 学校状态
    openChangetype() {
      this.schoolRadio = this.userData.teacher_info.type;
      this.ifChangeSchool = true;
    },
    ChangeSchoolType() {
      if (this.schoolRadio != this.userData.teacher_info.type) {
        this.userData.teacher_info.type = this.schoolRadio;
        this.changeUser("user/upschoolinfo", {
          type: this.schoolRadio,
          czz_id: this.userData.id,
        });
      }
      this.ifChangeSchool = false;
    },
    //###确认-"/user/upHimg"
    changeUser(src, data) {
      request({
        url: src,
        data,
      }).then((res) => {
        console.log("修改", res);
      });
    },
    //修改简介"user/upJieshao"
    //身份验证获取验证码login/getSms
    //绑定新手机号获取验证码login/getSms
    //修改密码身份验证获取手机号login/getSms
  },
  computed: {
    schoolType() {
      let typeName = "未选择";
      // 就读状态1234
      switch (this.userData.teacher_info.type) {
        case "1":
          typeName = "已录取";
          break;
        case "2":
          typeName = "就读中";
          break;
        case "3":
          typeName = "已毕业";
          break;
        case "4":
          typeName = "已结业";
          break;
        default:
          break;
      }
      return typeName;
    },
  },
  components: {
    Tooltip,
    VueCropper,
  },
};
</script>

<style lang="scss" scoped>
.nr {
  width: 100%;
  .zy {
    width: 100%;
    font-family: PingFang SC;
    .nr_top {
      width: 100%;
      border-radius: 10px;
      padding: 24px 32px;
      box-sizing: border-box;
      background-color: #ffffff;

      .nr_top_head {
        width: 100px;
        height: 100px;
        margin: 0px auto;
        position: relative;
        cursor: pointer;
        .nr_top_head_img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .nr_top_ze {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          display: flex;

          align-items: center;
          justify-content: center;
          background: #000000;
          border-radius: 50%;
          opacity: 0.42;
        }
        .nr_top_changeImg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ishover {
          display: none;
        }
      }
      .nr_top_head:hover .ishover {
        display: inline-block;
      }
      .nr_top_ul_number {
        width: 100%;
        list-style: none;
        font-size: 14px;
        li {
          display: flex;
          margin: 24px 0px;
          .ulnumber_list_name {
            width: 90px;
            color: #a2a2a2;
            margin-right: 50px;
            user-select: none;
            margin-top: 12px;
          }
          .ulnumber_list_content {
            width: 240px;
            line-height: 40px;
            background: #f7f7f7;
            border-radius: 5px;
            padding: 0px 16px;
            box-sizing: border-box;
          }
          .ulnumber_list_extra {
            line-height: 40px;
            color: #c3c3c3;
            user-select: none;
            display: flex;
            align-items: center;
            .sp_change {
              padding: 0px 20px;
              font-size: 14px;
              line-height: 40px;
              color: #5b6d97;
              cursor: pointer;
            }
            .sp_ischange {
              font-size: 14px;
              line-height: 40px;
              color: #5b6d97;
              cursor: pointer;
              span {
                padding: 0px 20px;
                font-size: 14px;
                line-height: 40px;
              }
            }
            .sp_change2 {
              margin-right: 8px;
            }
          }
          .ulnumber_list_hao {
            width: 178px;
            height: 40px;
            line-height: 40px;
            color: #a2a2a2;
            background: #f7f7f7;
            border-radius: 5px;
            padding: 0px 16px;
          }
          .ulnumber_list_jianjie {
            width: 80%;
            .ulnumber_list_content2 {
              background: #f7f7f7;
              border-radius: 5px;
              padding: 12px 16px;
              line-height: 20px;
              color: #353535;
              border: none;
            }
            .form_error {
              height: 18px;
              line-height: 18px;
              font-size: 13px;
              color: #f23c42;
            }
            .ulnumber_list_content3 {
              width: 100%;
              background: #ffffff;
              border-radius: 5px;
              padding: 12px 16px;
              line-height: 20px;
              border: 1px solid #3b546a;
            }
            .ulnumber_list_content3::-webkit-input-placeholder {
              color: #a4a4a4;
            }
            .ulnumber_list_content3:-moz-placeholder {
              /* FF 4-18 */
              color: #a4a4a4;
            }
            .ulnumber_list_content3::-moz-placeholder {
              /* FF 19+ */
              color: #a4a4a4;
            }
            .ulnumber_list_content3:-ms-input-placeholder {
              /* IE 10+ */
              color: #a4a4a4;
            }
          }
        }
      }
    }
    .nr_body {
      width: 96%;
      height: 30%;
      padding: 24px 32px;
      background-color: #ffffff;
      margin: 16px 0px;
      border-radius: 10px;
      font-family: PingFang SC;
      .nr_top_ul_number {
        width: 100%;
        list-style: none;
        font-size: 14px;
        li {
          display: flex;
          margin: 24px 0px;
          .ulnumber_list_name {
            width: 90px;
            color: #a2a2a2;
            margin-right: 50px;
            user-select: none;
            margin-top: 12px;
          }
          .ulnumber_list_right {
            height: 40px;
            line-height: 40px;
            display: flex;
            align-items: center;
            .ulnumber_list_school {
              padding: 0px 16px;
              height: 40px;
              background: #f7f7f7;
              border-radius: 5px;
              margin-right: 24px;
              color: #a3a3a3;
            }
            .ulnumber_list_typechange {
              height: 40px;
              background: #f7f7f7;
              border-radius: 5px;
              padding: 0px 16px;
            }
            .ulnumber_list_update {
              color: #5b6d97;
              padding: 0px 16px;
              line-height: 40px;
              margin-left: 4px;
              cursor: pointer;
              user-select: none;
            }
            .ulnumber_list_right_renz {
              margin-right: 8px;
            }
          }
        }
      }
    }
    .nr_bottom {
      width: 96%;
      height: 30%;
      padding: 24px 32px;
      background-color: #ffffff;
      border-radius: 10px;
      font-family: PingFang SC;
      font-size: 14px;
      .nr_bot_ul_number {
        width: 100%;
        list-style: none;
        font-size: 14px;
        li {
          display: flex;
          margin: 24px 0px;
          line-height: 40px;
          .ulnumber_list_name {
            width: 90px;
            color: #a2a2a2;
            margin-right: 50px;
            user-select: none;
          }
          .ulnumber_list_right {
            width: 85%;
            display: flex;
            justify-content: space-between;
            .unmber_list_title {
              color: #353535;
            }
            .unmber_list_change {
              cursor: pointer;
              user-select: none;
              color: #5b6d97;
            }
          }
        }
      }
    }
  }
}
// 公共的样式

.nr_top_title {
  font-weight: 600;
  font-size: 18px;
  color: #000000;
}
.tooltip_p {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #707070;
}
.img_question {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.zc2_div_copper {
  width: 100%;
  height: 180px;
  // background: #fd9a9a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .zc2_div_headimg {
    width: 272px;
    p {
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
    }
  }
}
.div_changeNameTop {
  font-family: PingFang SC;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .top_title {
    .name {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
    }
    > b {
      font-size: 12px;
      color: #9597a1;
      margin-left: 12px;
    }
  }
  .close_icon {
    font-size: 18px;
    cursor: pointer;
  }
}
.div_changeName {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  font-family: PingFang SC;
  .formList_input {
    width: 100%;
    border: 1px solid #dcdfe6;
    position: relative;
    .input_name {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      padding: 0px 10px;
      box-sizing: border-box;
    }
    p {
      color: #9597a1;
      font-size: 14px;
      position: absolute;
      top: calc(50% - 6px);
      right: 10px;
    }
  }
  .form_error {
    height: 18px;
    line-height: 18px;
    font-size: 13px;
    color: #f23c42;
  }
  .form_tishi {
    margin-top: 8px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      color: #9597a1;
      line-height: 16px;
      font-size: 13px;
      margin-right: 8px;
    }
  }
}
.div_isOK_button {
  user-select: none;
  display: flex;
  justify-content: right;
  font-size: 14px;
  font-family: PingFang SC;
  text-align: center;
  line-height: 32px;
  span {
    width: 72px;
    height: 32px;
    border-radius: 2px;
    margin: 0px 12px;
    cursor: pointer;
  }
  .spOk {
    background: #fd6246;
    color: #ffffff;
  }
  .spNo {
    border: 1px solid #e7e7e7;
    background: #ffffff;
  }
  .spOk:hover {
    background: #ff7e67;
  }
  .spNo:hover {
    background: #ff7e67;
    border: 1px solid transparent;
    color: #ffffff;
  }
}
.div_changeSchool {
  font-size: 14px !important;
  line-height: 17px !important;
  font-family: PingFang SC;
  padding: 0px 20px;
  box-sizing: border-box;
  .el-radio {
    margin-bottom: 18px;
  }
}
</style>