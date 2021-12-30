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
    <div class="zc_div_body">
      <!-- 步骤条 -->
      <div class="zc_topSchedule">
        <p class="p_xian" style="background: #fd6246"></p>
        <p class="p_xian" style="background: #fd6246"></p>
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
      <!-- 表单页 -->
      <ul class="zc_ul_form">
        <li class="form_list">
          <div class="formList_name">姓名</div>
          <div class="formList_box">
            <div class="formList_input">
              <input
                type="text"
                class="input_name"
                v-model="fromUser.name"
                @change="changeUsername"
              />
            </div>
            <div
              class="form_error"
              v-show="warning.uname > 0 && warning.uname < 6"
            >
              姓名不得为空
            </div>
            <span class="span_hint"
              >身份证姓名，若姓名中有特殊符号，请完整输入</span
            >
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">身份证号码</div>
          <div class="formList_box">
            <div class="formList_input">
              <input
                type="text"
                class="input_name"
                v-model="fromUser.idCard"
                @change="changeidCard"
              />
            </div>
            <div
              class="form_error"
              v-show="warning.icard > 0 && warning.icard < 6"
            >
              {{ warning.icard > 1 ? "身份证格式有误" : "身份证号码不得为空" }}
            </div>
            <span class="span_hint">身份证号码，18位数字或17位数字+“X”</span>
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">硕士院校</div>
          <div class="formList_box">
            <div class="formList_school">
              <div class="formList_school_titles">
                <input
                  type="text"
                  v-model="fromUser.academys.school"
                  @change="changeAcademy()"
                />
                <span class="span_hint">学校</span>
              </div>
              <div class="formList_school_titles">
                <input
                  type="text"
                  v-model="fromUser.academys.academy"
                  @change="changeAcademy()"
                />
                <span class="span_hint">院系</span>
              </div>
              <div class="formList_school_titles">
                <input
                  type="text"
                  v-model="fromUser.academys.specialty"
                  @change="changeAcademy()"
                />
                <span class="span_hint">专业</span>
              </div>
            </div>
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">当前状态</div>
          <div class="formList_box">
            <div class="formList_input" style="border: none">
              <el-select
                v-model="optionsValue"
                placeholder="请选择"
                size="medium"
                @change="changeState()"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <div class="form_error">当前状态不得为空</div> -->
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">身份证照片</div>
          <div class="formList_box">
            <div class="formList_input_identityCard">
              <!-- 正面 -->
              <div class="input_identityCard">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  accept="image/png,image/jpeg,image/jpg"
                  :on-change="uploadIdPhotoZ"
                >
                  <!-- 空 -->
                  <div
                    class="input_identityCard_icon"
                    v-if="idCardTorF.zheng == 0"
                  >
                    <div>
                      <i class="el-icon-plus"></i>
                      <span class="span_hint">身份证人像面</span>
                    </div>
                  </div>
                  <!-- 显示 -->
                  <div
                    class="input_identityCard_img"
                    v-else-if="idCardTorF.zheng == 1"
                  >
                    <img :src="sfzimg1" />
                  </div>
                  <!-- 上传中 -->
                  <div class="input_identityCard_maskLayer" v-else>
                    <div class="input_identityCard_progress">
                      <el-progress
                        :percentage="percentageZ"
                        :show-text="false"
                        color="#40DA97"
                      ></el-progress>
                    </div>
                  </div>
                </el-upload>
              </div>
              <!-- 反面 -->
              <div class="input_identityCard">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  accept="image/png,image/jpeg,image/jpg"
                  :on-change="uploadIdPhotoF"
                >
                  <!-- 空 -->
                  <div
                    class="input_identityCard_icon"
                    v-if="idCardTorF.fan == 0"
                  >
                    <div>
                      <i class="el-icon-plus"></i>
                      <span class="span_hint">身份证国徽面</span>
                    </div>
                  </div>
                  <!-- 显示 -->
                  <div
                    class="input_identityCard_img"
                    v-else-if="idCardTorF.fan == 1"
                  >
                    <img :src="sfzimg2" />
                  </div>
                  <!-- 上传中 -->
                  <div class="input_identityCard_maskLayer" v-else>
                    <div class="input_identityCard_progress">
                      <el-progress
                        :percentage="percentageF"
                        :show-text="false"
                        color="#40DA97"
                      ></el-progress>
                    </div>
                  </div>
                </el-upload>
              </div>
            </div>
            <!-- <div class="form_error">身份证照片不得为空</div> -->
            <span class="span_hint">请上传身份证照片，照片大小10M以内</span>
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name">资质认证</div>
          <div class="formList_box">
            <div class="formList_input_zzrzall">
              <!-- 图片展示 -->
              <div
                class="formList_input_zzrzimg"
                v-for="(val, inde) in certificArr"
                :key="val.id"
                @mouseenter="enterZzrz(inde)"
                @mouseleave="leaveZzrz(inde)"
              >
                <img :src="val.imgsrc" />
                <div class="zzrz_zhe" v-show="val.isShow">
                  <!-- 关闭 -->
                  <i
                    class="el-icon-close zzrz_icon"
                    @click="deleteCer(inde)"
                  ></i>
                </div>
              </div>
              <!-- 上传 -->
              <div class="formList_input_zzrz" v-if="certificArr.length < 5">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  accept="image/png,image/jpeg,image/jpg"
                  :on-change="changeCertification"
                >
                  <i class="el-icon-plus input_icon"></i>
                </el-upload>
              </div>
            </div>
            <!-- <div class="form_error">"上传图像不得为空"</div> -->
            <span class="span_hint"
              >可上传学历、学位证书、录取通知书、职业资格证书等，最多可上传5张图片，图片大小10M以内</span
            >
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name_nobefore">其他认证</div>
          <div class="formList_box">
            <div class="formList_input">
              <textarea
                class="form_textarea"
                v-model="fromUser.otherCertification"
              ></textarea>
            </div>
            <span class="span_hint"
              >可填写其他平台个人主页链接，如豆瓣、微博、小红书；可增加审核通过的几率哦～</span
            >
          </div>
        </li>
        <li class="form_list">
          <div class="formList_name_nobefore">邮箱地址</div>
          <div class="formList_box">
            <div class="formList_input">
              <input type="text" class="input_name" v-model="fromUser.email" />
            </div>
            <span class="span_hint">可用于找回密码</span>
          </div>
        </li>
      </ul>
      <!-- 提交 -->
      <div class="zc_div_uploadAll">
        <div class="uploadAllLast" @click="golast()">上一步</div>
        <div class="uploadAllNext" @click="userCommit()">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { request } from "@/network/request/request";
// import { requestLogin } from "@/network/request/requestLogin";
export default {
  data() {
    return {
      userid: null,
      active: 2,
      options: [
        { value: "已录取", lable: "1" },
        { value: "在读中", lable: "2" },
        { value: "已毕业", lable: "3" },
        { value: "已结业", lable: "4" },
      ],
      optionsValue: "", //在校状态
      percentageZ: 0, //进度条正
      percentageF: 0, //进度条反
      //身份证上传状态:0:未上传 1:已完成  2:上传中
      idCardTorF: {
        zheng: 0,
        fan: 0,
      },
      sfzimg1: "", //展示身份证正面
      sfzimg2: "", //展示身份证反面
      // 上传资质数组
      certificArr: [], //{id,imgsrc,isShow}
      // 表单提交内容
      fromUser: {
        name: "", //姓名
        idCard: "", //身份证
        academys: {
          school: "", //学校
          academy: "", //院系
          specialty: "", //专业
        },
        schoolState: "", //当前状态
        //身份证正反面
        idCardPhotograph: {
          front: "",
          rear: "",
        },
        certification: [], //资质认证[]
        otherCertification: "", //其他认证
        email: "", //邮箱
      },
      //警告监听 0默认 1为空 2错误 6正确
      warning: {
        uname: 0, //姓名
        icard: 0, //身份证
        academy: 0, //院校
        scstate: 0, //当前状态
        idCardPhot: 0, //身份证正反面
        cerfiv: 0, //资质认证
      },
    };
  },
  created() {
    //1. 判断当前用户是否正确
    let userMessage = JSON.parse(sessionStorage.getItem("loginUser"));
    if (userMessage) {
      request({
        url: "/user/userView",
        data: {
          czz_id: userMessage.id,
        },
      }).then((data) => {
        let shujuObj = data.data.data;
        if (shujuObj.token != userMessage.token) {
          this.$message.error("您的注册信息有误！请重新注册");
          this.$router.push({ name: "zhuce1" });
        } else {
          this.userid = shujuObj.id;
        }
      });
    } else {
      this.$message.error("您的注册信息有误！请重新注册");
      this.$router.push({ name: "zhuce1" });
    }
  },
  methods: {
    //姓名
    changeUsername() {
      if (this.fromUser.name.length == 0) {
        this.warning.uname = 1;
      } else {
        this.warning.uname = 6;
      }
    },
    // 身份证
    changeidCard() {
      const idNumberReg =
        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (this.fromUser.idCard == "") {
        this.warning.icard = 1;
      } else if (idNumberReg.test(this.fromUser.idCard)) {
        this.warning.icard = 6;
      } else {
        this.warning.icard = 2;
      }
    },
    // 硕士院校
    changeAcademy() {
      let { school, academy, specialty } = this.fromUser.academys;
      if (school != "" && academy != "" && specialty != "") {
        this.warning.academy = 6;
        // console.log(this.fromUser.academys);
      } else {
        this.warning.academy = 1;
      }
    },
    // 在校状态
    changeState() {
      switch (this.optionsValue) {
        case "已录取":
          this.fromUser.schoolState = 1;
          break;
        case "在读中":
          this.fromUser.schoolState = 2;
          break;
        case "已毕业":
          this.fromUser.schoolState = 3;
          break;
        case "已结业":
          this.fromUser.schoolState = 4;
          break;
        default:
          break;
      }

      this.warning.scstate = 6;
    },
    //身份证照片上传-正反
    uploadIdPhotoZ(file) {
      let { size, type } = file.raw;
      let typearr = ["image/png", "image/jpeg", "image/jpg"];
      // 1. 检查格式
      if (size / 1024 / 1024 < 10 && typearr.indexOf(type) != -1) {
        let formData = new FormData();
        formData.append("file", file.raw);
        // 2. 发送请求
        this.idCardTorF.zheng = 2;
        this.percentageZ = 100;
        axios({
          baseURL: "https://bkmcsapi.heyhui.com",
          method: "POST",
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
            console.log("sfz", data);
            if (data.data.status) {
              this.sfzimg1 = data.data.showurl;
              this.fromUser.idCardPhotograph.front = data.data.url;
              this.idCardTorF.zheng = 1;
              // 2. 检查是否全部上传完成
              if (this.idCardTorF.zheng == 1 && this.idCardTorF.fan == 1) {
                // console.log("通过");
                this.warning.idCardPhot = 6;
              } else {
                this.warning.idCardPhot = 2;
                console.log(this.idCardTorF, "未通过");
              }
            } else {
              this.idCardTorF.zheng = 0;
              this.$message.error("上传失败请稍后再试!");
            }
          })
          .catch((err) => {
            this.idCardTorF.zheng = 0;
            console.log("请求错误", err);
          });
      } else {
        this.$message.error("请选择正确格式的图片");
      }
    },
    uploadIdPhotoF(file) {
      let { size, type } = file.raw;
      let typearr = ["image/png", "image/jpeg", "image/jpg"];
      // 1. 检查格式
      if (size / 1024 / 1024 < 10 && typearr.indexOf(type) != -1) {
        let formData = new FormData();
        formData.append("file", file.raw);
        // 2. 发送请求
        this.idCardTorF.fan = 2;
        this.percentageF = 100;
        axios({
          baseURL: "https://bkmcsapi.heyhui.com",
          method: "POST",
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
          timeout: 30000,
        })
          .then((data) => {
            // console.log(data);
            if (data.data.status) {
              this.sfzimg2 = data.data.showurl;
              this.fromUser.idCardPhotograph.rear = data.data.url;
              this.idCardTorF.fan = 1;
              // 2. 检查是否全部上传完成
              if (this.idCardTorF.zheng == 1 && this.idCardTorF.fan == 1) {
                // console.log("通过");
                this.warning.idCardPhot = 6;
              } else {
                this.warning.idCardPhot = 2;
                // console.log(this.idCardTorF, "未通过");
              }
            } else {
              this.idCardTorF.fan = 0;
              this.$message.error("上传失败请稍后再试!");
            }
          })
          .catch((err) => {
            this.idCardTorF.fan = 0;
            console.log("请求错误");
          });
      } else {
        this.$message.error("请选择正确格式的图片");
      }
    },
    // 资质认证上传
    changeCertification(file) {
      // 1. 检查图片数量
      if (this.certificArr.length == 5) {
        this.$message.error("超出最大上传数量");
      } else {
        let { size, type } = file.raw;
        let typearr = ["image/png", "image/jpeg", "image/jpg"];
        // 2. 检查格式
        if (size / 1024 / 1024 < 10 && typearr.indexOf(type) != -1) {
          let formData = new FormData();
          formData.append("file", file.raw);
          axios({
            baseURL: "https://bkmcsapi.heyhui.com",
            url: "/page/upload/uploadImgs",
            method: "POST",
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
              // console.log("zzz",data);
              if (data.data.status) {
                let newobj = { isShow: false };
                let imgsrc = data.data.showurl;
                let formsrc = data.data.url;
                newobj.imgsrc = imgsrc;
                newobj.id = file.raw.uid;
                // console.log(newobj);
                //添加到img数组中
                this.certificArr.push(newobj);
                // 添加到表单
                this.fromUser.certification.push(formsrc);
                this.warning.cerfiv = 6;
              } else {
                this.$message.error("上传失败请稍后再试!");
              }
            })
            .catch((err) => {
              console.log("请求错误");
            });
        } else {
          this.$message.error("请选择正确格式的图片");
        }
      }
    },
    //修改已上传资质
    enterZzrz(inde) {
      this.certificArr[inde].isShow = true;
    },
    leaveZzrz(inde) {
      this.certificArr[inde].isShow = false;
    },
    // 删除照片
    deleteCer(i) {
      this.$delete(this.certificArr, i);
      this.$delete(this.fromUser.certification, i);
      // console.log(this.certificArr.length);
      if (this.certificArr.length <= 0) this.warning.cerfiv = 1;
      else this.warning.cerfiv = 6;
    },
    //前往上一步
    golast() {
      // 1. 保存当前用户信息
      let nowform = {
        form: this.fromUser,
        warning: this.warning,
        optionsValue: this.optionsValue,
        idCardTorF: this.idCardTorF,
        certificArr: this.certificArr,
        sfzimg1: this.sfzimg1,
        sfzimg2: this.sfzimg2,
      };
      sessionStorage.setItem("nowfrom", JSON.stringify(nowform));
      // 2. 跳转
      this.$router.replace({
        name: "zhuce2",
      });
    },
    // 提交
    userCommit() {
      let isok = true;
      for (const key in this.warning) {
        if (this.warning[key] != 6) {
          isok = false;
        }
      }
      if (isok) {
        // 处理上传图片链接
        let zheng = this.fromUser.idCardPhotograph.front;
        let fan = this.fromUser.idCardPhotograph.rear;
        // 开始提交流程
        request({
          url: "/login/setuserinfo",
          data: {
            user_id: this.userid,
            name: this.fromUser.name,
            card_id: this.fromUser.idCard,
            card_pic_z: zheng,
            card_pic_f: fan,
            email: this.fromUser.email,
            imgs: this.fromUser.certification,
            sname: this.fromUser.academys.school,
            faculty: this.fromUser.academys.academy,
            major: this.fromUser.academys.specialty,
            type: this.fromUser.schoolState,
            content: this.fromUser.otherCertification,
          },
        }).then((data) => {
          console.log("步骤3", data);
          let { st } = data.data;
          if (st == 1) {
            this.$message.success("提交成功！");
            this.$router.replace({
              path: "/zhuce/audit",
              query: {
                userstated: 0,
              },
            });
          } else {
            this.$message.error("注册失败！请稍后...");
          }
        });
      } else {
        this.$message.error("请填写完整后提交!");
      }
    },
  },
  // 获取跳转前的表单字段
  beforeRouteEnter(to, from, next) {
    let nowform = JSON.parse(sessionStorage.getItem("nowfrom"));
    if (from.name == "zhuce2" && nowform) {
      next((vm) => {
        vm.fromUser = nowform.form;
        vm.warning = nowform.warning;
        vm.optionsValue = nowform.optionsValue;
        vm.idCardTorF = nowform.idCardTorF;
        vm.certificArr = nowform.certificArr;
        vm.sfzimg1 = nowform.sfzimg1;
        vm.sfzimg2 = nowform.sfzimg2;
      });
    } else {
      sessionStorage.removeItem("nowfrom");
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
input {
  outline: none;
  border: none;
}
.span_hint {
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
.zcbzHtml_two {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  background-color: #fafafa;
  overflow: hidden;
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
    .nr_header_left {
      margin-left: 5%;
      display: flex;
      align-items: center;
      .nr_header_left_title {
        margin-left: 10px;
        font-size: 24px;
        font-family: PingFang TC, PingFang TC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #37373b;
      }
    }
  }
  .zc_div_body {
    width: 1204px;
    padding: 80px 260px 70px;
    box-sizing: border-box;
    /* border: 1px solid red; */
    background-color: #ffffff;
    margin: 0 auto;
    font-family: PingFang SC;
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
          top: 110%;
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
          line-height: 32px;
          width: 32px;
          height: 32px;
          background: #ffffff;
          border: 2px solid #fd6246;
          color: #fd6246;
        }
        > span::before {
          content: "填写账号信息";
          font-size: 14px;
          position: absolute;
          display: inline-block;
          white-space: nowrap;
          top: 110%;
          left: 50%;
          color: #000000;
          transform: translate(-50%, 0%);
        }
      }
      .schedule_future {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(0%, -50%);
        > span {
          width: 48px;
          height: 48px;
          background: #fd6246;
          line-height: 48px;
          font-size: 28px;
          color: white;
        }
        > span::before {
          content: "填写申请人信息";
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
    }
    .zc_ul_form {
      width: 100%;
      list-style: none;
      margin-top: 140px;
      .form_list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .formList_name {
          font-size: 14px;
          color: #37373b;
          position: relative;
          margin-top: 10px;
          // margin-right: 64px;
        }
        .formList_name_nobefore {
          font-size: 14px;
          color: #37373b;
          position: relative;
          margin-top: 10px;
          // margin-right: 64px;
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
          .formList_input {
            width: 560px;
            border: 1px solid #dcdfe6;
            position: relative;
            .input_name {
              width: 90%;
              height: 40px;
              border: none;
              outline: none;
              padding: 0px 10px;
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
          }
          .formList_school {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .formList_school_titles {
              width: 176px;
              > input {
                width: 100%;
                height: 40px;
                border: 1px solid #dcdfe6;
                border-radius: 2px;
                padding: 0px 10px;
                box-sizing: border-box;
              }
            }
          }
          .formList_input_identityCard {
            width: 560px;
            display: flex;
            justify-content: space-between;
            .input_identityCard {
              width: 270px;
              height: 172px;
              border: 1px solid #eaeaea;
              position: relative;
              .input_identityCard_icon {
                width: 270px;
                height: 172px;
                > div {
                  width: 84px;
                  text-align: center;
                  font-size: 48px;
                  color: #9597a1;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .input_identityCard_img {
                width: 270px;
                height: 172px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .input_identityCard_maskLayer {
                width: 270px;
                height: 172px;
                background-color: rgba(211, 211, 211, 0.5);
                box-shadow: 0px 5px 10px rgba(64, 218, 151, 0.15);
                position: relative;
                .input_identityCard_progress {
                  width: 160px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
          .formList_input_zzrzall {
            width: 100%;
            height: 104px;
            display: flex;
            .formList_input_zzrzimg {
              width: 104px;
              height: 104px;
              position: relative;
              border: 1px solid transparent;
              > img {
                width: 100%;
                height: 100%;
              }
              .zzrz_zhe {
                width: 104px;
                height: 104px;
                position: absolute;
                top: 0px;
                left: 0px;
                background-color: rgba(112, 112, 112, 0.5);
                cursor: pointer;
                .zzrz_icon {
                  width: 16px;
                  height: 16px;
                  position: absolute;
                  top: 5px;
                  right: 5px;
                }
                .zzrz_icon:hover {
                  color: white;
                }
              }
            }
            .formList_input_zzrz {
              width: 104px;
              height: 104px;
              background: #fafafa;
              border: 1px solid #dcdfe6;
              .input_icon {
                width: 104px;
                height: 104px;
                color: #b1b2c3;
                font-size: 32px;
                line-height: 104px;
                text-align: center;
              }
              .formList_uploader_img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .zc_div_uploadAll {
      width: 100%;
      display: flex;
      justify-content: center;
      div {
        width: 108px;
        height: 40px;
        border-radius: 2px;
        text-align: center;
        line-height: 40px;
        margin: 0px 12px;
        user-select: none;
        cursor: pointer;
        // #FFA07B
      }
      .uploadAllLast {
        border: 1px solid #eaeaea;
        color: #37373b;
      }
      .uploadAllLast:hover {
        border: 1px solid transparent;
        background-color: #fd6246;
        color: white;
      }
      .uploadAllNext {
        background-color: #fd6246;
        color: white;
      }
      .uploadAllNext:hover {
        background-color: #ffa07b;
      }
    }
  }
}
// elementUl公共样式
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #feeae2 !important;
}
.el-select {
  width: 560px !important;
}
</style>