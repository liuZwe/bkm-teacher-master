import * as Qiniu from "qiniu-js";
import { uploadQiUpload } from "@/http/home/home"; // 提取接口链接

/**
 * 上传图片
 * @param file
 * @param isFile
 * @return {Promise<unknown>}
 */
// ----------------------------七牛云上传配置-----------------------------
//  file:上传文件   isFile: T-视频 F-图片
export const qiniuUpload = async (file, isFile) => {
  //1.提取http请求后缀
  const uploadObj = await uploadQiUpload();
  // console.log("提取http请求后缀", uploadObj.data);
  // 2. 获取上传属性domain:上传地址 - uptoken:上传token
  const { domain, uptoken, uptoken_url, vidio_image } = uploadObj.data;
  // 3. 上传文件配置
  const putExtra = {
    fname: file.name, //文件原文件名
    params: {}, //用来放置自定义变量
    mimeType: isFile ? null : ["image/png", "image/jpeg", "image/jpg"], //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
  };
  // 4. 上传加速和上传地区设置
  let config = {
    useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
    region: null, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
  };
  // 5. 返回七牛上传数据
  return new Promise((resolve, rej) => {
    // console.log("进入七牛");
    // 6. 七牛云上传配置
    const controller = Qiniu.upload(
      file,
      Date.now().toString(),
      uptoken,
      putExtra,
      config
    );
    //--7. 直接获取返回值---
    if (isFile) {
      resolve({ ctl: controller, data: uploadObj.data });
      return;
    }
    // 8.获取进度subscribe():七牛云上传监听方法
    controller.subscribe({
      next: (res) => {
        // 主要用来展示进度
        let total = res.total;
        // total.percent:当前上传进度，范围：0～100。
        // console.log("进度：" + parseInt(total.percent) + "% ");
      },
      error: (err) => {
        // 失败报错信息
        console.log(err);
      },
      complete: (res) => {
        // 接收成功后返回的信息
        console.log("上传成功:", domain, "key", res);
        resolve(`${domain}/${res.key}`);
      },
    });
  });
};

/**
 * Canvas高清分辨路显示模糊问题
 * @param context 屏幕大小
 */
export const canvasRatio = (context) => {
  const backingStore = context
    ? context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1
    : 1;
  return (window.devicePixelRatio || 1) / backingStore;
};
// 转化日期格式
export const formatSeconds = (value) => {
  let result = parseInt(value);
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
  return `${h}:${m}:${s}`;
};
// 网络链接转为base64
export const imgURLtoBase = (imgsrc) => {
  return new Promise((res, rej) => {
    let img = new Image();
    img.src = imgsrc;
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function() {
      let cvs = document.createElement("canvas");
      let ctx = cvs.getContext("2d");
      cvs.width = img.width;
      cvs.height = img.height;
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
      let base64 = cvs.toDataURL("image/jpeg", 1);
      res(base64);
    };
  });
};
//将base64转换为文件
export const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
// 获取上传视频截图
export const vidioImages = (file, miao) => {
  return new Promise((res, rej) => {
    // 获取当前视频的本地链接
    let videosrc = URL.createObjectURL(file);
    // 创建视频标签
    let video = document.createElement("video");
    // video.setAttribute("crossOrigin", "Anonymous"); // 处理跨域
    video.setAttribute("src", videosrc);
    // 视频播放
    video.setAttribute("controls", "controls");
    // video.setAttribute("autoplay", "autoplay");
    video.currentTime = miao;
    // 视频加载完成后-开始截图
    video.addEventListener("canplay", function() {
      // // 生成canvas
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth; // 获取视频宽度
      canvas.height = video.videoHeight; //获取视频高度
      let imgtime = video.duration; //获取图片时间
      // 利用canvas对象方法绘图
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // 转换成base64形式
      let aa = canvas.toDataURL("image/png");
      let aaimgfile = dataURLtoFile(aa, Date.now());
      let imgsrc = URL.createObjectURL(aaimgfile);
      let obj = { imgsrc, imgtime };
      res(obj);
      console.log("-----------视频的时间", imgtime, imgsrc);
      // 或者使用blob格式转换成本地的url链接
      // canvas.toBlob(
      //   function(blob) {
      //     let imgsrc = URL.createObjectURL(blob);
      //   },
      //   "image/jpeg",
      //   1
      // );
    });
  });
};
