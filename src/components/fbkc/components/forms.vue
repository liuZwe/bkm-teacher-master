<template>
  <div class="forms">
    <p class="title">课程基本信息</p>

    <el-form :model="form" :rules="rules" ref="form">
      <!-- 视频封面设置 -->
      <el-form-item
        class="professional"
        required
        prop="img"
        style="margin-bottom: 0"
      >
        <p slot="label">
          <span class="subTitle">视频封面设置</span>
          <span class="des"> (格式为jpg,大小≤5MB，建议尺寸≥1146*717)</span>
        </p>
        <div class="clipBox">
          <div class="clip" :style="{ background: `url(${form.img}) ` }">
            <img
              v-show="!!form.img"
              :src="form.img"
              alt=""
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 302px;
                height: 192px;
                border-radius: 10px;
                z-index: 11;
              "
            />
            <div class="bottom" style="z-index: 12">
              <p class="pointer">
                <span>上传封面</span>
                <Upload
                  :size="{ width: '100%', height: '100%' }"
                  class="uploadCom"
                  @changeImg="changeImg"
                />
              </p>
              <p class="pointer" @click="clipCallback">裁剪封面</p>
            </div>
          </div>
          <!--列表-->
          <div class="imgList">
            <p class="face">
              <span>可选择以下封面</span>
              <span
                style="cursor: pointer"
                @click="lookMoreFace"
                v-show="imgList.length > 1"
                >查看更多封面</span
              >
            </p>
            <ul>
              <li
                v-for="(item, i) in imgList.slice(0, 4)"
                :key="i"
                @click="changeImg(item)"
              >
                <img :src="item" alt="" class="img" />
              </li>
            </ul>
          </div>
        </div>
      </el-form-item>
      <!-- 表单信息设置 -->
      <el-form-item required prop="title" style="margin-top: 20px">
        <p slot="label" class="subTitle">
          <span>课程标题</span>
        </p>
        <el-input
          type="text"
          placeholder="建议针对学校专业考察内容进行标题，这样更便于用户搜索"
          v-model="form.title"
          maxlength="80"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item required class="professional" prop="hy">
        <p class="subTitle" slot="label">选择适合的专业</p>
        <!-- 联级选择器 -->
        <el-cascader
          v-model="classValue"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange()"
        ></el-cascader>
      </el-form-item>

      <el-form-item required class="professional" prop="kc_fw">
        <p slot="label" class="subTitle">
          <span class="subTitle">课程类型</span>
          <span class="des">可多选，默认显示第一个选择标签</span>
        </p>
        <el-checkbox-group v-model="form.kc_fw">
          <el-checkbox
            :label="item"
            v-for="item in kc_fw_list"
            :key="item"
            style="
              font-family: PingFang SC, PingFang SC-Regular;
              font-size: 14px;
              font-weight: 400;
              color: #1d1d1d;
            "
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item required prop="bq">
        <p slot="label" class="subTitle">
          <span class="subTitle">适合的大学及专业标签</span>
        </p>
        <el-input type="text" class="visText" placeholder="">
          <span slot="suffix" class="suffix">还可添加4个标签</span>
        </el-input>
        <!-- ----------------标签创作区域-------------- -->
        <el-select
          class="tagSelect"
          v-model="form.bq"
          multiple
          filterable
          closable
          allow-create
          remote
          default-first-option
          @change="bqChange"
          placeholder="按回车键Enter创建标签"
        >
          <p slot="prefix">还可添加{{ 5 - form.bq.length }}个标签</p>
        </el-select>
        <!-- ------------历史标签响应区域 ---------->
        <div class="historyTags" v-show="historyIsShow">
          <div class="historyTags_bq">
            <p>历史标签</p>
            <el-row style="margin-left: 20px">
              <el-button
                @click="addBq(item)"
                v-for="(item, i) in historyList"
                :key="i"
                size="medium"
                class="mediumBtn"
                round
                >{{ item }}</el-button
              >
            </el-row>
          </div>
          <span class="clearHistoryTag" @click="clearTag">清除历史标签</span>
        </div>
      </el-form-item>

      <el-form-item required prop="jianjie">
        <p slot="label" class="subTitle">
          <span class="subTitle"> 课程简介 </span>
        </p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
          v-model="form.jianjie"
        >
        </el-input>
      </el-form-item>

      <el-form-item class="professional margin-bottom-0">
        <p slot="label" class="subTitle">
          <span class="subTitle">详细介绍</span>
        </p>
        <div id="demo1"></div>
      </el-form-item>

      <div class="btnBox_form">
        <div class="btnGroupOne" @click="submitCheck(0)">提交审核</div>
        <div class="btnGroupTwo" @click="submitCheck(1)">保存草稿</div>
      </div>
    </el-form>
    <!-- 裁剪图片 -->
    <el-dialog
      title="裁剪图片"
      :visible.sync="dialogVisible"
      width="907px"
      :before-close="handleClose"
    >
      <div class="clipBox">
        <div>
          <div class="vueCro">
            <VueCropper
              ref="cropper"
              :img="clipImg"
              :autoCrop="true"
              :centerBox="true"
              fixed
              :full="true"
              :info="false"
              :infoTrue="false"
              :canMove="false"
              :canScale="false"
              autoCropWidth="416"
              autoCropHeight="260"
              :fixedNumber="[16, 10]"
              :original="false"
              :outputSize="1"
              outputType="jpeg"
              :high="true"
              @realTime="realTime"
            >
            </VueCropper>
          </div>
        </div>
        <div class="previewClipImg">
          <ul>
            <li>
              <div :style="previewStyle1">
                <div :style="previews.div">
                  <img :src="previews.url" :style="previews.img" />
                </div>
              </div>
              <p>{{ this.size.w }}*{{ this.size.h }}（16:10）</p>
            </li>
            <li>
              <div style="height: 90px; overflow: hidden">
                <div :style="previewStyle2">
                  <div :style="previews.div">
                    <img :src="previews.url" :style="previews.img" />
                  </div>
                </div>
              </div>
              <p>
                {{ this.size.w }}*{{
                  Math.round(size.h - size.w * 0.0625)
                }}（16:9）
              </p>
            </li>
          </ul>
          <p class="showText">你的封面将以上面两种尺寸展示</p>
        </div>
      </div>
      <div class="clipBox_p">
        <p class="imgText">当前图片尺寸{{ size.w }} * {{ size.h }}</p>
        <p class="imgworring" v-show="preisOk">
          不可上传,封面最小尺寸为480 * 300
        </p>
      </div>
      <el-row slot="footer" class="dialog-footer">
        <el-button
          class="primaryBtn"
          type="primary"
          :loading="loading"
          @click="clipSuccess"
          >{{ !loading ? "确 定" : "上传中" }}</el-button
        >
      </el-row>
    </el-dialog>

    <el-dialog
      title="从视频中选择封面"
      :visible.sync="lookMoreFaceStatus"
      width="993px"
      :before-close="closeMoreFace"
    >
      <ul class="moreFaceImgBox">
        <li
          v-for="(item, i) in imgList"
          :class="[i === saveI ? 'active' : '']"
          :key="i"
          @click="selectImg(i)"
        >
          <img :src="item" alt="" class="moreFaceImg" />
        </li>
      </ul>
      <el-button slot="footer" @click="selectImage(saveImg, 1)" class="sure"
        >确定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Upload from "@/common/upload/upload";
import { VueCropper } from "vue-cropper";
import {
  formatSeconds,
  qiniuUpload,
  dataURLtoFile,
  imgURLtoBase,
} from "@/utils/utils";
import { getStorage } from "@/http/http";
import {
  courseAddCourse,
  courseUpCourse,
  getFormSpecialtyurl,
  getFormClassTypeurl,
} from "@/http/home/home";
import WangEditor from "wangeditor";

export default {
  name: "forms",
  data: () => ({
    editor: null,
    timer: null,
    previews: {}, //截图文件
    previewStyle1: "", //截图样式
    previewStyle2: "", //截图样式
    preisOk: false, //是否可上传截图
    mosize: { w: 0, h: 0 }, //原图片比例
    size: {
      w: 0,
      h: 0,
    },
    loading: false,
    saveImg: "", //选中图片连接
    clipImg: "", //裁剪图片连接
    saveI: -1,
    form: {
      czz_id: getStorage("user").id, // 创作者id
      img: "", // 封面
      title: "", // 课程标题
      hy: "", // 专业/ 行业
      kc_fw: [], // 课程范围 多个 英文,逗号隔开
      bq: [], // 标签 多个 英文,逗号隔开
      jianjie: "", // 简介
      js: "", // 介绍
      course_child: "", // 课时信息 格式 [{"title":"测试课时1","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"},{"title":"测试课时2","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"}]
      is_cg: 0, // 是否草稿 0否 1是
    },
    historyList: [], //历史标签
    kc_fw_fill: [],
    tagList: [],
    options: [], //专业选择
    classValue: [], //当前选中的专业
    kc_fw_list: [], //课程类型选择
    kc_fw_fill_list: ["设计理论", "基础手绘", "手绘快题"],
    lookMoreFaceStatus: false, //查看更多封面展示-控制
    dialogVisible: false,
    historyIsShow: false,
    rules: Object.freeze({
      img: [
        { required: true, message: "请选择图片", trigger: ["change", "blur"] },
        {
          validator: (rule, value, callback) => {
            // console.log(value, 'value')
            if (value) callback();
            else callback(new Error("请选择图片"));
          },
          trigger: "blur",
        },
      ],
      title: [
        { required: true, message: "请输入标题", trigger: ["change", "blur"] },
      ],
      hy: [
        {
          required: true,
          message: "请选择专业/行业",
          trigger: ["change", "blur"],
        },
      ],
      kc_fw: [
        {
          required: true,
          message: "请选择课程范围",
          trigger: ["change", "blur"],
        },
      ],
      bq: [
        {
          required: true,
          message: "请选择标签",
          trigger: ["change", "blur", "input"],
        },
      ],
      jianjie: [
        { required: true, message: "请输入简介", trigger: ["change", "blur"] },
      ],
    }),
  }),
  // props传递：imglist[图片封面的网络地址]  - 用户之前提交的表单信息
  props: {
    imgList: {
      type: Array,
      default: () => [],
    },
    defaultForm: {
      type: Object,
      default: () => ({}),
    },
  },
  async created() {
    //继承/创建历史记录
    let hislist = localStorage.getItem("historyTag");
    if (hislist) {
      this.historyList = JSON.parse(hislist);
      this.historyIsShow = true;
    }
    // 区分新视频还是已上传视频
    if (!this.$route.query.id) {
      let base = await imgURLtoBase(this.imgList[0]);
      const shouimg = await qiniuUpload(dataURLtoFile(base, Date.now()));
      this.form.img = shouimg;
      this.clipImg = shouimg;
    }
    // 获取专业标签
    let specialt = await getFormSpecialtyurl();
    this.options = specialt.data;
    // console.log("请求的标签专业", specialt.data);
    //获取视频类型
    let calssType = await getFormClassTypeurl();
    calssType.data.forEach((val, inde) => {
      this.kc_fw_list.push(val.title);
    });
    // console.log("请求的课程类型", calssType.data);
  },
  mounted() {
    const editor = new WangEditor(`#demo1`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.form.js = newHtml;
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    classType() {
      return this.classValue[this.classValue.length - 1];
    },
  },
  methods: {
    // 专业标签改变
    handleChange() {
      this.form.hy = this.classType;
    },
    // 更多封面->封面选择触发
    selectImg(i) {
      this.saveI = i;
      this.saveImg = this.imgList[i];
    },
    // 更多封面->封面确定触发
    selectImage(e, status) {
      if (e) {
        if (status === 1) {
          this.lookMoreFaceStatus = false;
        }
        if (this.dialogVisible) {
          clearInterval(this.timer);
        }
        this.clipImg = e;
        // 显示截图
        this.dialogVisible = true;
        // this.form.img = e;
        this.clipCallback();
      } else {
        this.lookMoreFaceStatus = false;
      }
    },
    lookMoreFace() {
      this.lookMoreFaceStatus = !this.lookMoreFaceStatus;
    },
    //1.点击已有视频截取封面-触发
    changeImg(e) {
      if (this.dialogVisible) {
        clearInterval(this.timer);
      }
      this.clipImg = e;
      this.clipCallback();
    },
    closeMoreFace() {
      this.lookMoreFaceStatus = false;
    },
    // 关闭裁剪框之前
    handleClose() {
      this.dialogVisible = false;
      //考虑用户选择图片后未上传
      this.clipImg = this.form.img;
    },
    //2. 实现上传裁剪封面功能
    clipCallback() {
      const _this = this;
      // 获取当前点击图片的默认宽高
      let img = new Image();
      img.src = _this.clipImg;
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = async () => {
        let imgw = img.width;
        let imgh = img.height;
        console.log("当前为处理前的图片大小:", imgw, imgh);
        //提交当前尺寸
        this.$store.commit("changeSize", { w: imgw, h: imgh });
        if (_this.clipImg) {
          _this.mosize = this.$store.state.mosize;
          _this.dialogVisible = true;
        } else {
          _this.$message.error("请先上传图片");
        }
      };
    },
    // 2-2 截图实时预览
    realTime(data) {
      // console.log(data);
      let previews = data;
      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 160 / previews.w,
      };
      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 160 / previews.w,
      };
      // 获取原图尺寸
      //压缩后的原图尺寸 wid:1491 hei:707
      //  260 * 1491 / 707 = 缩小后的宽
      //   260 / 707 = 缩小的倍数-高
      //   缩小后的宽 / 1491 = 缩小的倍数- 宽
      let width = this.mosize.w;
      let height = this.mosize.h;
      let sw = (width / height) * 260;
      let bw = sw / width;
      let bh = 260 / height;
      this.size.w = Math.round(this.$refs.cropper.cropW / bw);
      this.size.h = Math.round(this.$refs.cropper.cropH / bh);

      if (this.size.w < 480 || this.size.h < 300) this.preisOk = true;
      else this.preisOk = false;
      this.previews = data;
    },
    //3. 确定上传截图提交图片
    clipSuccess() {
      if (!this.preisOk) {
        this.loading = true;
        // 获取截图的base64 数据
        this.$refs.cropper.getCropData(async (data) => {
          let yuanFile = dataURLtoFile(data, Date.now());
          let imgSrc = URL.createObjectURL(yuanFile);
          console.log("截图后的本地图片", imgSrc);
          // 网络链接用于上传
          const _ = await qiniuUpload(yuanFile);
          // 关闭截图
          this.loading = false;
          this.dialogVisible = false;
          this.clipImg = imgSrc;
          this.form.img = _;
        });
      } else {
        this.$message.error("请检查您的图片尺寸后再上传!");
      }
    },
    // $$提交-保存盛和
    // $$$ 提交截取视频和图片的key
    jieKey(url) {
      if (url.indexOf("/")) {
        let urlarr = url.split("/");
        let len = urlarr.length - 1;
        return urlarr[len];
      } else {
        return url;
      }
    },
    // 提交
    submitCheck(is_cg) {
      // console.log(this.$parent.myArray, 'myArray');
      console.log(form, "form --->");
      const form = JSON.parse(JSON.stringify(this.form));
      form.kc_fw = (form.kc_fw || []).reduce(
        (p, c) => `${p}${!p ? "" : ","}${c}`,
        ""
      );
      form.bq = (form.bq || []).reduce(
        (p, c) => `${p}${!p ? "" : ","}${c}`,
        ""
      );
      if (is_cg) form.is_cg = 1;
      else form.is_cg = 0;
      //收集提交视频信息
      let newCourseArr = [];
      this.$parent.myArray.forEach((val, inde) => {
        let obj = {};
        let { title, name, url, size, id, time } = val;
        obj.title = title || name;
        obj.url = url;
        obj.size = size;
        obj.id = id;
        obj.time = typeof time === "number" ? formatSeconds(time) : time;
        obj.img = "abcdefg";
        newCourseArr.push(obj);
      });
      form.course_child = newCourseArr;
      // 上传表单信息
      if (form.course_child.length <= 0) {
        this.$message.warning("请上传视频后再操作!");
      } else {
        this.$refs.form.validate(async (v) => {
          if (v) {
            form.img = this.jieKey(form.img);
            form.course_child.forEach((val) => {
              val.url = this.jieKey(val.url);
            });
            const {
              czz_id,
              img,
              title,
              hy,
              kc_fw,
              bq,
              jianjie,
              js,
              course_child,
              is_cg,
            } = form;
            let _;
            console.log("提交参数", form);
            if (!this.id) {
              _ = await courseAddCourse(
                czz_id,
                img,
                title,
                hy,
                kc_fw,
                bq,
                jianjie,
                js,
                course_child,
                is_cg
              );
            } else {
              _ = await courseUpCourse(
                czz_id,
                img,
                title,
                hy,
                kc_fw,
                bq,
                jianjie,
                js,
                course_child,
                is_cg,
                form.id
              );
            }
            console.log(_, "结果");
            if (_.st === 1) {
              this.$message.success("已提交");
              this.$router.push({ path: "/spkgl" });
            } else {
              this.$message.error(_.msg);
            }
          } else {
            this.$message.error("内容未填写完成!");
          }
        });
      }
    },
    async save() {
      const form = this.form;
      form.kc_fw = form.kc_fw.reduce((p, c) => `${p}${!p ? "" : ","}${c}`, "");
      form.bq = form.bq.reduce((p, c) => `${p}${!p ? "" : ","}${c}`, "");
      form.is_cg = 1;
    },
    //3. 标签输入框内容触发
    bqChange(e) {
      let length = this.form.bq.length;
      if (e.length > 5) {
        this.$message({
          message: "最大标签数量不得超过5个",
          type: "warning",
        });
        this.$delete(this.form.bq, e.length - 1);
      }
      // ##历史记录
      let newStr = this.form.bq.slice(length - 1, length)[0];
      if (newStr != null) {
        if (this.historyList.indexOf(newStr) == -1) {
          this.historyList.push(newStr);
          this.historyIsShow = true;
          if (this.historyList.length > 20) {
            this.$delete(this.historyList, 0);
          }
          //本地存储
          let newHistoryList = JSON.stringify(this.historyList);
          localStorage.setItem("historyTag", newHistoryList);
        }
      }
    },
    //4. 历史标签添加功能
    addBq(e) {
      if (this.form.bq.length >= 5) {
        this.$message({
          message: "最大标签数量不得超过5个",
          type: "warning",
        });
      } else {
        if (this.form.bq.indexOf(e) == -1) {
          this.form.bq.push(e);
        } else {
          this.$message.error("已有标签,请不要重复添加");
        }
      }
    },
    // 5.清除历史标签
    clearTag() {
      this.historyList = [];
      this.historyIsShow = false;
      localStorage.removeItem("historyTag");
    },
  },
  watch: {
    defaultForm: {
      deep: true,
      handler: function (v) {
        if (v.id) {
          const form = {
            czz_id: getStorage("user").id, // 创作者id
            img: v.img, // 封面
            title: v.title, // 课程标题
            hy: v.hy, // 专业/ 行业
            kc_fw: v.kc_fw, // 课程范围 多个 英文,逗号隔开
            // zy_fx: '',// 专业方向 多个 英文,逗号隔开
            bq: v.bq, // 标签 多个 英文,逗号隔开
            jianjie: v.jianjie || "", // 简介
            js: v.js || "", // 介绍
            course_child: v.child, // 课时信息 格式 [{"title":"测试课时1","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"},{"title":"测试课时2","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"}]
            is_cg: v.is_cg, // 是否草稿 0否 1是
            id: v.id,
          };
          this.form = form;
          this.editor.txt.html(v.js);
          this.clipImg = this.form.img;
          this.classValue = v.hy_id;
        }
      },
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  components: {
    Upload,
    VueCropper,
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #1e1f1f;
  opacity: 1;
}
::v-deep .el-dialog__close {
  width: 16px;
  height: 16px;
  color: #a2abb2 !important;
  opacity: 1;
}
.previewClipImg {
  margin-left: 120px;
  ul {
    li {
      // margin-top: 10px;
      list-style: none;
      margin: 5px auto;
      p {
        // text-align: center;
        padding-left: 8px;
        white-space: nowrap;
        margin-top: 8px;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #999999;
        opacity: 1;
      }
    }
  }
  .showText {
    margin-top: 25px !important;
  }
}
.active {
  border: 1px solid red;
}
.forms {
  width: 96%;
  margin: 0 auto;
  .uploadCom {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #565f67;
    margin: 42px 0 24px 0;
    font-family: PingFang SC, PingFang SC-Medium;
  }
  ::v-deep .el-form-item__label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-input__inner {
    width: 100% !important;
  }
  ::v-deep .el-input .el-input__count .el-input__count-inner {
    color: #b4bac1 !important;
  }
  ::v-deep .el-checkbox__label {
    color: #1d1d1d;
  }
  .tagSelect {
    width: 100%;
    position: absolute;
    left: 0;
    // ::-webkit-input-placeholder {
    // }
    ::v-deep .el-select__input {
      /*text-indent: 16px;*/
      padding-left: 15px;
    }
    ::v-deep .el-input__prefix {
      right: 10px;
      text-align: right;
    }

    ::v-deep .el-input input {
      padding-left: 15px !important;
      // text-indent: 15px;
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
      border-radius: 15px;
      line-height: 30px;
      font-size: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #ff6246;
      user-select: none;
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
  .margin-bottom-0 {
    margin-bottom: 0 !important;
  }
  ::v-deep .el-input__count {
    color: #b4bac1 !important;
  }
  ::v-deep .visText input {
    background: none;
  }
  ::v-deep .el-form-item__label {
    line-height: 18px;
    margin-bottom: 13px;
  }
  ::v-deep .el-form-item {
    margin-bottom: 32px;
  }
  .checkText {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #99a2aa;
    opacity: 1;
  }
  .suffix {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #b4bac1;
    opacity: 1;
    margin-right: 30px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    color: #1d1d1d;
    opacity: 1;
    font-family: PingFang SC, PingFang SC-Medium;
  }
  ::v-deep .professional .el-form-item__content {
    margin-top: 40px;
    display: block;
  }
  .des {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #666666;
    opacity: 1;
    margin-left: 20px;
  }
  .clip {
    position: relative;
    width: 302px;
    background-size: 100% 100% !important;
    height: 192px;
    background: rgba(0, 0, 0, 0);
    opacity: 1;
    border-radius: 10px;
    margin: 22px 0 15px 0;
    p {
      display: inline-block;
      width: 50%;
      text-align: center;
      height: 100%;
      color: white;
      line-height: 50px;
      &:nth-child(1) {
        position: relative;
        &:after {
          content: "";
          right: 0;
          position: absolute;
          height: 13px;
          border: 1px solid #ffffff;
          opacity: 1;
          top: 19px;
        }
      }
    }
    .bottom {
      width: 302px;
      height: 50px;
      background: #000000;
      opacity: 0.37;
      position: absolute;
      bottom: 0;
      border-radius: 0px 0px 10px 10px;
    }
  }
  .historyTags {
    width: 100%;
    // height: 40px;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: #333333;
    margin-top: 28px;
    opacity: 1;
    align-items: center;
    justify-content: space-between;
  }
  .historyTags_bq {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .historyTags_bq > p {
    white-space: nowrap;
  }
  .mediumBtn {
    // width: 95px;
    height: 35px;
    color: #9ca4ac;
    font-size: 14px;
    border: 1px solid #cccccc;
    border-radius: 18px;
    margin: 4px;
  }
  .mediumBtn:hover,
  .mediumBtn:focus,
  .mediumBtn:active {
    color: #ffffff;
    border: 1px solid transparent;
  }
}
.btnBox_form {
  padding: 50px 0px;
  display: flex;
  div {
    width: 246px;
    height: 66px;
    border-radius: 5px;
    line-height: 66px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btnGroupOne {
    background: #ff6246;
    color: white;
  }
  .btnGroupOne:hover {
    background: #ff7e67;
    color: white;
  }
  .btnGroupTwo {
    margin-left: 20px;
    color: #ff6246;
    border-color: #ff6246;
    border: 1px solid;
  }
  .btnGroupTwo:hover {
    color: white;
    background-color: #ff7e67;
  }
}

.pointer {
  cursor: pointer;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
::v-deep .el-dialog__header {
  padding: 20px !important;
  padding-bottom: 10px !important;
}
.primaryBtn {
  width: 160px;
  height: 57px;
  background: #ff6246;
  opacity: 1;
  border-radius: 5px;
}
::v-deep .el-form-item__content {
  margin-top: 20px;
}
.clipBox {
  display: flex;
  align-items: center;
}
.vueCro {
  width: 472px;
  height: 260px;
}
.imgList {
  margin-left: 70px;
  margin-top: 20px;
  flex: 1;
  height: 170px;
  background: #ffffff;
  border: 2px solid #f0f0f0;
  opacity: 1;
  border-radius: 8px;
  position: relative;
  padding-bottom: 20px;
  overflow: hidden;
  ul {
    display: flex;
    padding-left: 30px;
    li {
      margin-right: 32px;
    }
  }
  .face {
    padding: 18px 0 10px 25px;
    span {
      &:nth-child(1) {
        font-size: 16px;
        font-family: ".PingFang SC";
        font-weight: 500;
        line-height: 22px;
        color: #9a9a9a;
        opacity: 1;
      }
      &:nth-child(2) {
        margin-left: 25px;
        font-size: 16px;
        font-family: ".PingFang SC";
        font-weight: 500;
        line-height: 22px;
        color: #7d98d6;
        opacity: 1;
      }
    }
  }
  &:before {
    content: "";
    position: absolute;
    border-top: 20px solid transparent;
    border-right: 30px solid white;
    border-bottom: 20px solid transparent;
    top: 34%;
    left: -30px;
  }
  .img {
    width: 171px;
    height: 106px;
    border-radius: 7px;
  }
}
.moreFaceImgBox {
  display: flex;
  width: 926px;
  flex-wrap: wrap;
  max-height: 400px;
  overflow-y: scroll;
  justify-content: space-between;
  padding: 0px 10px;
  li {
    // margin-right: 37px;
    cursor: pointer;
    margin-bottom: 26px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .moreFaceImg {
    width: 283px;
    height: 176px;

    background: rgba(0, 0, 0, 0);
    opacity: 1;
    border-radius: 10px;
  }
}
.sure {
  width: 160px;
  height: 57px;
  background: #ff6246;
  opacity: 1;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #ffffff;
}
.clipBox_p {
  display: flex;
  color: #333333;
  font-size: 14px;
  margin: 25px 0px;
  align-items: center;
}
.imgText {
  font-size: 18px;
  font-weight: 400;
  opacity: 1;
}
.imgworring {
  margin-left: 20px;
  color: #e40c0c;
}
::v-deep .el-dialog__body {
  padding: 30px 20px 0 20px;
}
.clearHistoryTag {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #9ca4ac;
  opacity: 1;
  cursor: pointer;
}
</style>
