<template>
  <div class="avatar-uploader">
    <el-upload
      class="upload"
      action
      :auto-upload="false"
      :show-file-list="false"
      accept="image/png,image/jpeg,image/jpg"
      :on-change="changeUpload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        :style="{ width: size.width, height: size.height }"
      />
      <div
        v-else
        class="styles"
        :style="{ width: size.width, height: size.height }"
      >
        <i class="el-icon-plus"></i>
        <p class="text">{{ text }}</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { imganvas } from "../../utils/utils";
export default {
  props: {
    text: {
      type: String,
      default: "身份证人面像",
    },
    size: {
      type: Object,
      default: () => ({
        width: "343px",
        height: "201px",
      }),
    },
  },
  name: "upload",
  data() {
    return {
      imageUrl: "",
      img: {
        w: 0,
        h: 0,
      },
      // uploadObj: {},
      // controller: null, 七牛云上传控制器
    };
  },
  methods: {
    // 上传前对图片进行限制
    changeUpload(file) {
      let imgtype = ["image/png", "image/jpeg", "image/jpg"];
      const isIMG = imgtype.indexOf(file.raw.type) > -1;
      const isLt2M = file.raw.size / 1024 / 1024 < 5;
      if (!isIMG) {
        this.$message.error("请上传正确格式的图片！");
      } else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      } else {
        let posterURL = URL.createObjectURL(file.raw); // 获取URL
        let img = new Image();
        img.src = posterURL;
        img.onload = () => {
          let whisok = img.width >= 960 && img.height >= 600;
          if (!whisok) {
            this.$message.error(
              `图片解析失败，请上传 960*600 尺寸以上图片，当前图片 ${img.width}*${img.height}`
            );
          } else {
            this.$emit("changeImg", posterURL);
          }
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader {
  width: 343px;
  height: 201px;
  background: #f5f5fa;
  opacity: 1;
  position: relative;
  border-radius: 10px;
  &::v-deep .el-upload {
    width: 100%;
    height: 100%;
  }
  .text {
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    color: #c8c8d3;
    opacity: 1;
  }
  .styles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 343px;
    height: 201px;
  }
  .el-icon-plus {
    margin-bottom: 30px;
    font-size: 30px;
    color: #c8c8d3;
  }
  .upload {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    width: 300px;
    //height: 200px;
  }
}
</style>