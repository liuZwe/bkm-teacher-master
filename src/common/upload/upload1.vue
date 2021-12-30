<template>
  <div class="avatar-uploader">
    <el-upload
        class="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        accept="image/png,image/jpeg,image/jpg"
        :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar"  :style="{ width: size.width, height: size.height }">
      <div v-else class="styles" :style="{ width: size.width, height: size.height }">
        <i class="el-icon-plus"></i>
        <p class="text">{{ text }}</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadQiUpload } from "@/http/home/home";
import * as Qiniu from "qiniu-js";

export default {
  props: {
    text: {
      type: String,
      default: '身份证人面像'
    },
    size: {
      type: Object,
      default: () => ({
        width: '343px',
        height: '201px'
      })
    },
    form:{
      type:Object,
      default: () => ({
        name: "",
        idcard: "",
        idcard_img_q: '',
        idcard_img_h: '',
      })
    },
    imgsType:{
       type: Number,
       default: 1
    }
  },
  name: "upload1",
  data() {
    return {
      imageUrl: '',
      uploadObj: {},
      controller: null, // 七牛云上传控制器
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        // this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.qiniuUpload(file);
      return isJPG && isLt2M;
    },
    qiniuUpload(file) {
      const { domain, uptoken, uptoken_url, vidio_image } = this.uploadObj;
      const putExtra = {
        fname: file.name,  //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: ["image/png", "image/jpeg", 'image/jpg']  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      }
      const config = {
        useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: null    // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
      };
      console.log(Qiniu.upload);
      this.controller = Qiniu.upload(file, Date.now().toString(), uptoken, putExtra, config);
      this.controller.subscribe({
        next: (res) => {
          // 主要用来展示进度
          let total = res.total;
          // window.Qapp.showLoad({content:'上传图片中！'})
          console.log("进度：" + parseInt(total.percent) + "% ")
        },
        error: (err) => {
          // 失败报错信息
          console.log(err)
        },
        complete: (res) => {
          // 接收成功后返回的信息
          console.log(this.form)
          if(this.form.idcard&&this.form.name){
            if(this.imgsType==1&&this.form.idcard_img_h){
              this.$emit("disable",false )
            }
            if(this.imgsType==2&&this.form.idcard_img_q){
              this.$emit("disable",false )
            }
          }
          
          this.imageUrl = `${domain}/${res.key}`;
          this.$emit("changeImg",`${domain}/${res.key}` )
        }
      })
    },
    async getUploadQiUpload() {
      const _ = await uploadQiUpload();
      console.log(_, 'h获取上传token');
      this.uploadObj = {..._.data};
    }
  },
  mounted() {
    this.getUploadQiUpload();
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  width: 343px;
  height: 201px;
  background: #F5F5FA;
  opacity: 1;
  position: relative;
  border-radius: 10px;
  &::v-deep .el-upload{
    width: 100%;
    height: 100%;
  }
  .text {
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    color: #C8C8D3;
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
    color: #C8C8D3;
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