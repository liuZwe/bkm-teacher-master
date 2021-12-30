<template>
  <div class="nr1">
    <!-- 上传显示 -->
    <div v-if="one">
      <div class="div_upload">
        <div class="div_upload_box">
          <el-upload
            class="upload-demo"
            action
            drag
            accept="video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb,video/mov"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="beforeUploadVideo"
          >
            <div
              class="upload"
              :style="
                backColorUpload
                  ? 'background-color:#FFA077'
                  : 'background-color: #ff6246'
              "
              @dragover="backColorUpload = true"
              @dragleave="backColorUpload = false"
            >
              <div class="upload_body">
                <i class="el-icon-upload" style="color: #ffffff"></i>
              </div>
              <p class="upload_body_p">上传视频课程</p>
            </div>
          </el-upload>
        </div>
        <div class="el-upload__text">直接拖拽视频到此处也可以上传哦~</div>
        <div class="el-upload__tip" slot="tip">
          <strong class="title">快速通过审核的格式: mp4，flv格式</strong><br />
          <p class="tips">
            （推荐的视频格式在上传转码过程中更快速，审核也会更加快速）
          </p>
        </div>
      </div>
    </div>
    <!-- 显示上传 -->
    <div v-if="two" class="nr_nr">
      <!-- 视频上传区域 -->
      <div class="spkc">
        <div class="spkc_title">
          <div class="spkc_title_nr">视频课程</div>
        </div>
        <!-- 视频上传时-显示与控制 -->
        <div class="spkc_nr">
          <div class="spkc_nr_title">
            课程上传<span>（尽量采用MP4、flv格式，可快速通过审核）</span>
          </div>
          <!-- 上传列表拖拽换位 -->
          <Vuedraggable
            v-model="myArray"
            animation="300"
            chosenClass="chosen"
            group="spkc_nr_nr"
            @start="drag = true"
            @sort="sortCallback"
            @end="drag = false"
          >
            <transition-group>
              <div
                v-for="(item, i) in myArray"
                :key="item.id"
                class="spkc_nr_nr"
              >
                <!-- 
                  视频上传显示列表
                  remove(myArry-id):删除已上传视频
                  changeImg(imgList-封面img数组):上传视频完毕后，截取视频封面
                  item:myArry信息数组的对象
                 -->
                <Progress
                  @changeImg="changeImg"
                  @remove="remove"
                  @setWork="setWork"
                  :item="item"
                  :defaultForm="defaultForm"
                  :i="i"
                />
              </div>
            </transition-group>
          </Vuedraggable>
        </div>
        <div class="spkc_buttom">
          <el-upload
            style="padding-left: 2%"
            class="upload-demo"
            action
            :auto-upload="false"
            :show-file-list="false"
            accept="video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb,video/mov"
            :on-change="beforeUploadVideo"
          >
            <el-button
              style="
                background: #ff6246;
                color: #ffffff;
                border: none;
                margin-left: 2%;
                margin-top: 10px;
              "
              @click="Get()"
            >
              <div class="tianjia">
                <div style="font-size: 20px">+</div>
                <div style="margin-left: 10px">添加视频</div>
              </div>
            </el-button>
          </el-upload>
        </div>
      </div>
      <!-- 课程基本信息区域 -->
      <Forms :defaultForm="defaultForm" :imgList="imgList" />
    </div>
    <!-- <img :src="textimg" alt="" /> -->
  </div>
</template>

<script>
import { request } from "../../../network/request/request.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Forms from "../components/forms.vue";
import Vuedraggable from "vuedraggable";
import Progress from "../components/progresss";
import { qiniuUpload, vidioImages } from "@/utils/utils";
import { courseCourseView, courseDelCourseurl } from "@/http/home/home";

export default {
  name: "kcfb",
  data() {
    return {
      textimg: "",
      imgList: [], //视频封面数组
      speed: 0,
      // 上传视频信息数组
      myArray: [],
      startTime: 0,
      endTime: 0,
      radio: "1",
      //界面切换
      one: true,
      two: false,
      videoUploadPercent: 100,
      // 进度条
      fileList: [
        {
          name: "test1",
          url: "https://ceshi.heyhui.com/1629897504432",
        },
      ],
      dialogVisible: false,
      dialogVisible1: false,
      previews: {},
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        size: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式1
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框1
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例1
        fixedNumber: [16, 10], // 截图框的宽高比例1
        full: true, // 是否输出原图比例的截图1
        canMoveBox: false, // 截图框能否拖动1
        original: true, // 上传图片按照原始比例渲染1
        centerBox: false, // 截图框是否被限制在图片里面1
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高1
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false,
      value1: "",
      options2: [
        {
          value2: "选项1",
          label2: "艺术 - 设计学",
        },
      ],
      value2: "",
      checkList: [],
      // 标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      aa: false,

      textarea: "",
      content: "",
      editorOption: {},
      ls: true,
      shuliang: 4,
      // 首次上传时携带的参数-已注销
      postData: {
        token: "",
      },
      tupian5: [],
      tupian6: [],
      img: "",
      defaultForm: {}, //重新编辑-整体信息
      // imgurl:''
      backColorUpload: false,
    };
  },
  created() {
    this.Get();
  },
  mounted() {
    this.startTime = Date.now();
    if (this.id) {
      this.one = false;
      this.two = true;
      this.getData();
    }
  },
  watch: {
    //视频编辑页面->发布课程页面时刷新页面
    $route(to, from) {
      if (to.name == from.name) {
        this.$router.go(0);
      }
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  methods: {
    //修改当前截图的图片方法
    changeImg(earr) {
      // console.log("第一次传递图片");
      this.imgList = [...this.imgList, ...earr];
    },
    //**将最新添加的视频对象添加进myarry中
    setWork(e) {
      this.myArray = this.myArray.map((_) => (_.id === e.id ? e : _));
    },
    //**更具mayArry的id删除上传视频
    //提取视频的key
    jieKey(url) {
      let urlarr = url.split("/");
      let len = urlarr.length - 1;
      return urlarr[len];
    },
    // 删除视频
    async remove(e) {
      let arr = []; //新的myArray
      // 删除视频信息在已上传视频中
      if (+e < 0) {
        // 删除未提交的视频
        arr = this.myArray.filter((_) => _.id !== e);
      } else {
        // 下架已有的课程编辑时
        const _ = await courseDelCourseurl(e);
        if (_.st === 1) {
          arr = this.myArray.filter((_) => _.id !== e);
        }
      }
      this.myArray = [...arr];
    },
    sortCallback(e) {
      console.log(e, "e --> ");
    },
    // 1. 上传前文件预处理-上传课程限制
    async beforeUploadVideo(videofile) {
      let file = videofile.raw;
      let videoUpload = true;
      //再次触发上传
      console.log("再次触发上传", file);
      let fileSize = file.size / 1024 / 1024 < 2048;
      //解析上传视频获取截图和视频时间
      let videos = await vidioImages(file, 1);
      console.log("获取视频上传时间", videos);
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        videoUpload = false;
      } else if (!fileSize) {
        this.$message.error("视频大小不能超过2G");
        videoUpload = false;
      } else if (videos.imgtime <= 300) {
        this.$message.error("上传课程不得少于5分钟");
        videoUpload = false;
      } else {
        this.myArray.forEach((val, i) => {
          let newName = file.name.split(".");
          if (val.name == newName[0]) {
            this.$message.error("请不要重复上传相同视频");
            videoUpload = false;
          }
        });
      }
      //3.开始上传流程
      if (videoUpload) {
        let videos2 = await vidioImages(file, 100);
        let videos3 = await vidioImages(file, 200);
        this.imgList.push(videos.imgsrc);
        this.imgList.push(videos2.imgsrc);
        this.imgList.push(videos3.imgsrc);
        //3. 开始上传文件-七牛云{true:视频,false:图片}
        const _ = await qiniuUpload(file, true);
        // console.log("啊看看", _);
        this.myArray = [
          ...this.myArray,
          {
            name: file.name.replace(/(.*)\..*/g, "$1"),
            id: `-${this.myArray.length + 1}`,
            fixed: false,
            isWork: false,
            progress: 0,
            controller: _.ctl,
            size: (file.size / 1024 / 1024).toFixed(2),
            uploadSize: 0,
            speed: this.speed.toFixed(2),
            ytime: 0, //预计上传时间
            time: videos.imgtime, //视频时长
            uploadData: _.data,
            file,
            // url:
          },
        ];
        // console.log("当前视频时间2:", this.myArray);
        if (file != "") {
          this.one = false;
          this.two = true;
        }
      }
    },
    // 3. 发送请求计算预计的上传速度
    Get() {
      this.startTime = Date.now();
      request({
        url: "upload/qiUpload",
        data: {},
      }).then((res) => {
        if (res.data.st == 500) {
          this.$message.warning("登录已过期，请重新登录");
          this.$router.push({ path: "/index" });
        }
        const speed =
          res.request.responseText.length /
          ((Date.now() - this.startTime) / 1000) /
          1024;
        this.speed = speed;
      });
    },
    //进度条
    format(percentage) {
      return percentage === 100 ? "满" : "${percentage}%";
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoUploadPercent = Number(file.percentage.toFixed(0));
      // console.log(this.videoUploadPercent);
    },
    cg(res) {
      // console.log(res);
      this.$message.success("上传成功");
      this.imageUrl = "https://ceshi.heyhui.com/" + res.key;
      let new_img = this.imageUrl + "?vframe/jpg/offset/3";
      this.tupian5.push(new_img);
      this.tupian6.push(new_img);
      this.Get();
    },

    //封面上传成功
    handleChangeCG() {
      this.$message.success("上传成功");
    },
    //点击查看更多封面
    chakan() {
      this.dialogVisible = true;
    },
    //点击关闭弹窗
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //确定选择封面
    fmqd() {
      this.dialogVisible = false;
    },
    //点击上传视频封面
    changeUpload(file, fileList) {
      this.fileList = fileList.slice(-3);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      this.fileinfo = file;
      // console.log(this.fileinfo);

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = file.url;
        this.dialogVisible1 = true;
      });
    },
    //点击裁剪按钮弹框
    caijian() {
      this.dialogVisible1 = true;
    },
    // 点击裁剪确定按钮，这一步是可以拿到处理后的地址
    finish() {
      let formData = new FormData();
      this.$refs.cropper.getCropBlob((data) => {
        let img = window.URL.createObjectURL(data);
        this.model = true;
        this.modelSrc = img;
        formData.append("file", data, this.fileName);
        // console.log(formData);
        request({
          url: "upload/imgs",
          data: {
            file: this.formData,
          },
        }).then((res) => {
          console.log(res);
        });
      });
    },
    // 打开裁剪页面
    openimg(img) {
      // alert(img)
      this.caijian();
      this.option.img = img;
    },
    //清除历史标签
    qingchu() {
      this.ls = false;
    },
    // 添加标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 4) {
        this.shuliang = 4 - this.dynamicTags.length;
        this.aa = false;
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.shuliang = 4 - this.dynamicTags.length;
      if (this.dynamicTags.length >= 4) {
        this.aa = true;
      } else {
        this.aa = false;
      }
    },
    // ^^^编辑模式-编辑已上传视频^^^
    async getData() {
      const _ = await courseCourseView(this.id);
      console.log("看看是啥", _);
      let imgArrs = _.data.child;
      this.myArray = imgArrs.map((_, i) => ({
        ..._,
        progress: 100,
        controller: null,
        id: _.id || `-${i}`,
      }));
      let videoFrame = [1, 3, 5];
      imgArrs.forEach((val) => {
        for (var i = 0; i < videoFrame.length; i++) {
          let imgsrc = val.showurl + `?vframe/jpg/offset/${videoFrame[i]}`;
          this.imgList.push(imgsrc);
        }
      });
      this.defaultForm = _.data;
    },
  },
  components: {
    Forms,
    Vuedraggable,
    Progress,
  },
};
</script>

<style scoped lang="scss">
@import "../kcfb";
</style>