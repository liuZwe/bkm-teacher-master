<template>
  <!-- --------------视频上传列表控制区域------------- -->
  <div class="progress spkc_nr_nr">
    <div class="spkc_nr_nr_left">
      <svg class="icon" aria-hidden="true" style="width: 40px; height: 40px">
        <use xlink:href="#icon-a-zhibo1"></use>
      </svg>
      <div class="spkc_nr_nr_left_ks">课时{{ i + 1 }}</div>
    </div>
    <div class="spkc_nr_nr_right">
      <div class="spkc_nr_nr_right_title">
        <input
          type="text"
          maxlength="80"
          autofocus="autofocus"
          :placeholder="workData.name || workData.title"
          v-model="CourseTitle"
          v-show="inputShow"
          ref="courseRef"
          @blur="courseBlur()"
        />
        <span v-show="!inputShow" @click="showInput()">
          {{ workData.name || workData.title }}
        </span>
        <span class="isnotPass" v-if="item.status == '2'">
          <i class="iconfont">&#xe610;</i>
          未通过
        </span>
      </div>
      <div class="spkc_nr_nr_right_center">
        <div class="spkc_nr_nr_right_center_left" v-if="item.progress !== 100">
          已经上传：{{ workData.uploadSize }}MB/{{ workData.size }}MB
        </div>
        <div
          class="spkc_nr_nr_right_center_center"
          v-if="item.progress !== 100"
        >
          当前速度：{{ workData.speed }}MB/s
        </div>
        <div class="spkc_nr_nr_right_center_right" v-if="item.progress !== 100">
          剩余时间：{{ workData.ytime }}
        </div>
        <div v-else>上传完成</div>
      </div>
      <div class="spkc_nr_nr_right_bottom">
        <div style="flex: 1">
          <el-progress
            :percentage="workData.progress"
            :status="workData.progress === 100 ? 'success' : null"
          ></el-progress>
        </div>
        <p class="actions">
          <span @click="preview" class="point">{{
            workData.progress !== 100 ? (play ? "暂停" : "继续") : "预览"
          }}</span>
          <!-- 新上传视频 -->
          <span
            class="point spcolor"
            @click="isShanChu = true"
            v-show="item.id * 1 < 0"
            >删除</span
          >
          <!-- 当前视频类型defaultForm-status 2 3 4  -->
          <span
            class="point spcolor"
            @click="isShanChu = true"
            v-show="
              (item.id * 1 > 0 &&
                defaultForm.statustype == '1' &&
                item.status == '2') ||
              (item.id * 1 > 0 && defaultForm.statustype != '1') ||
              (item.id * 1 > 0 && defaultForm.status == '4')
            "
            >删除</span
          >
        </p>
        <!-- <div class="radio point" style="margin-right: 40px" @click="setWork">
          <div class="radioBox">
            <span :class="workData.isWork ? 'circle' : ''"></span>
          </div>
          <span>作业</span> -->
        <!-- </div> -->
      </div>
    </div>
    <!-- 删除弹框 -->
    <el-dialog title="删除提醒" :visible.sync="isShanChu" width="560px">
      <div class="div_isbody">删除后无法恢复，确定删除视频吗？</div>
      <span slot="footer" class="dialog-footer">
        <div class="div_isOK_button">
          <span class="spOk" @click="delVideo()">确定</span>
          <span class="spNo" @click="isShanChu = false">取消</span>
        </div>
      </span>
    </el-dialog>
    <!-- 视频预览 -->
    <el-dialog
      title="视频预览"
      :visible.sync="isPlayVideo"
      width="560px"
      center
      @close="closeVideo()"
    >
      <video
        ref="refvideo"
        :src="videoUrl || item.showurl"
        controls
        class="dialog_video"
        autoplay
      ></video>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "progresss",
  data: () => ({
    isShanChu: false, //删除弹框控制
    isPlayVideo: false,
    workData: {},
    starTime: 0,
    speed: 0,
    play: true, //T: 暂停 F:继续
    ctl: null,
    videoUrl: "", // 上传完成url
    videoTime: 0,
    lostsize: null,
    urlhead: "https://ceshi.heyhui.com",
    inputShow: false, //课题名称修改
    CourseTitle: "", //课程标题新
  }),
  props: {
    item: {
      type: Object,
      default: () => ({
        name: "江南大学设计学院工业设计专业课 1",
        id: 2,
        fixed: false,
        isWork: false,
        progress: 0, //进度
        controller: null,
        size: 26,
        uploadSize: 1,
        speed: 2,
        time: 10,
      }),
    },
    i: {
      type: Number,
      default: 1,
    },
    defaultForm: {
      type: Object,
    },
  },
  mounted() {
    this.workData = this.item;
    this.speed = this.item.speed;
    console.log("接受的item", this.item);
    console.log("接收的type", this.defaultForm);
    this.ctl =
      this.item.controller &&
      //调用当前上传七牛云的subscribe方法
      // 七牛上传对象.subscribe(next, error, complete)
      this.item.controller.subscribe(
        this.uploadNext,
        null,
        this.uploadComplete
      );
  },
  methods: {
    showInput() {
      this.inputShow = true;
      this.$nextTick(() => {
        this.$refs.courseRef.focus();
      });
    },
    //修改课时名称
    courseBlur() {
      let name = this.workData.name || this.workData.title;
      if (name != this.CourseTitle && this.CourseTitle != "") {
        name = this.CourseTitle;
        if (this.workData.name) this.workData.name = name;
        else this.workData.title = name;
        this.CourseTitle = "";
        this.$emit("setWork", this.workData);
      }
      this.inputShow = false;
    },
    closeVideo() {
      let video = this.$refs.refvideo;
      video.pause();
    },
    // setWork() {
    //   this.workData.isWork = !this.workData.isWork;
    // },
    //-------------1. 预览 / 暂停-继续 功能实现------------------
    preview() {
      //1-1 当前上传进度如果为一百
      if (this.item.progress === 100) {
        this.isPlayVideo = true;
        // window.open(this.videoUrl || this.item.showurl);
      } else {
        //1-2 暂停还是继续?
        if (this.play) {
          //暂停
          this.ctl.unsubscribe();
          this.play = false;
        } else {
          // 继续上传
          this.item.controller.subscribe(
            this.uploadNext,
            null,
            this.uploadComplete
          );
          this.play = true;
        }
      }
    },
    load() {},
    //删除上传的视频
    delVideo() {
      // 取消上传/当前是否上传完成
      if (this.ctl) this.ctl.unsubscribe();
      this.$emit("remove", this.item.id);
    },
    // 计算时间
    settime(second) {
      let result = parseInt(second);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);

      let res = "";
      if (h !== "00") res += `${h}时`;
      if (m !== "00") res += `${m}分`;
      res += `${s}秒`;
      return res;
    },
    // 1. 接受当前的上传进度
    uploadNext(res) {
      // console.log("发送中...", res);
      const _this = this;
      // 接受当前已发送尺寸
      let loadedSize = res.total.loaded;
      // 下一秒发送的尺寸
      setTimeout(() => {
        this.lostsize = res.total.loaded;
      }, 1000);
      // 实时计算当前速度
      if (this.lostsize) {
        let nowSpeed = ((loadedSize - this.lostsize) / 1024 / 1024).toFixed(2);
        _this.workData.speed = nowSpeed > 0 ? nowSpeed : "0";
      }
      // size: 总共的尺寸
      // loaded: 已经发送完毕的尺寸
      // percent: 进度比例，范围在 0 - 100
      //计算上传速度
      let s = (
        (res.total.size - res.total.loaded) /
        1024 /
        _this.speed /
        1000
      ).toFixed(2);
      // 上传预计的时间
      _this.workData.ytime = _this.settime(s);
      //视频上传的进度条
      _this.workData.progress = Math.floor(res.total.percent);
      // 视频已上传大小
      _this.workData.uploadSize = (res.total.loaded / 1024 / 1024).toFixed(2);
    },
    // 2. 七牛上传完成后触发
    uploadComplete(res) {
      console.log(res, "???");
      // 2-1 获取当前视频地址
      this.videoUrl = this.urlhead + "/" + res.key;
      this.url = this.urlhead + "/" + res.key;
      this.workData.url = this.urlhead + "/" + res.key;
      // _this.workData.videoTime = this.item.videoTime;
      this.workData.progress = 100;
      this.workData.ytime = 0;
      this.workData.time = this.item.time;
      // 更新当前视频信息对象
      this.$emit("setWork", this.workData);
      // _this.workData.time = 0;
      // this.videoUrl = window.URL.createObjectURL(this.item.file);
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.$refs.video.play();
      //     _this.workData.videoTime = this.$refs.video.duration;
      //     _this.$emit("setWork", _this.workData);
      //   }, 800);
      // });
      // this.timer = setInterval(async () => {
      //   // 2-1 获取三张截图
      //   let jieArr = [
      //     _this.url + "?vframe/jpg/offset/1/h/260",
      //     _this.url + "?vframe/jpg/offset/3/h/260",
      //     _this.url + "?vframe/jpg/offset/5/h/260",
      //   ];
      //   //2-2 上传视频的封面截图数组
      //   this.$emit("changeImg", jieArr);
      //   //2-3 当前截图展示第一张
      //   _this.workData.img = jieArr[0];
      //   //2-4 上传视频的信息
      //   this.$emit("setWork", _this.workData);
      //   window.clearInterval(this.timer);
      //   //
      // }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../kcfb";
@import "../../../assets/css/icon.css";
.div_isbody {
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 24px;
  color: #000000;
}
.div_isOK_button {
  user-select: none;
  white-space: unset !important;
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
    border: 1px solid #e7e7e7;
    background: #ffffff;
  }
  .spNo {
    border: 1px solid #e7e7e7;
    background: #ffffff;
  }
  .spOk:hover {
    background: #ff7e67;
    border: 1px solid transparent;
    color: #ffffff;
  }
  .spNo:hover {
    background: #ff7e67;
    border: 1px solid transparent;
    color: #ffffff;
  }
}
.dialog_video {
  width: 100%;
  height: 300px;
}
</style>
