import { post, getStorage } from "../http";

const homeUrl = {
  uploadSetToken: "upload/setToken",
  uploadQiUpload: "upload/qiUpload",
  withdrawalBindBank: "withdrawal/bindBank", //提交用户信息-绑定银行卡
  courseAddCourse: "course/addCourse",
  courseCourseView: "course/courseView",
  courseUpCourse: "course/upCourse",
  EvaluateDelPing: "Evaluate/delPing", //删除品论
  EvaluateHfEvaluate: "Evaluate/hfEvaluate", // 提交评论
  courseDelCourseurl: "course/delCourseurl",
  getFormSpecialtyurl: "course/getcoursecate", //专业分类
  getFormClassTypeurl: "course/chanellist", //课程类型
};

/**
 * 获取上传token
 * @return {AxiosPromise}
 */

export const uploadSetToken = () => post(homeUrl.uploadSetToken);

/**
 * 七牛云上传参数
 * @return
 */

export const uploadQiUpload = () => post(homeUrl.uploadQiUpload);

/**
 * 绑定银行卡
 * @param {*} czz_id 创作者id
 * @param {*} name 姓名
 * @param {*} idcard 身份证号
 * @param {*} idcard_img_q 	身份证前照片
 * @param {*} idcard_img_h 	身份证后照片
 * @param {*} kh_dq 	开户行地区
 * @param {*} khh       	开户行
 * @param {*} yh_account    银行卡号
 * @param {*} yh_img_q      银行卡照片 前
 * @param {*} yh_img_h      	银行卡照片 后
 * @returns
 */
export const withdrawalBindBank = (
  czz_id,
  name,
  idcard,
  idcard_img_q,
  idcard_img_h,
  kh_dq,
  khh,
  yh_account,
  yh_img_q,
  yh_img_h
) =>
  post(homeUrl.withdrawalBindBank, {
    czz_id,
    name,
    idcard,
    idcard_img_q,
    idcard_img_h,
    kh_dq,
    khh,
    yh_account,
    yh_img_q,
    yh_img_h,
  });

/**
 * 添加课程
 * @param czz_id    创作者id
 * @param img       封面
 * @param title     课程标题
 * @param hy        专业/ 行业
 * @param kc_fw     课程范围 多个 英文,逗号隔开
 * @param bq        标签 多个 英文,逗号隔开
 * @param jianjie   简介
 * @param js        介绍
 * @param course_child  课时信息 格式 [{"title":"测试课时1","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"},{"title":"测试课时2","url":"https://jbvideo.wxfzyc.com/FmF5EVM8aJX1NIOgCHGZdWCUwvoU","time":"0:22"}]
 * @param is_cg     是否草稿 0否 1是
 */
export const courseAddCourse = (
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
) =>
  post(homeUrl.courseAddCourse, {
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
  });

/**
 * 查看课程信息-数据展示
 * @param id
 * @return {AxiosPromise}
 */
export const courseCourseView = (id) =>
  post(homeUrl.courseCourseView, {
    id,
  });

export const courseUpCourse = (
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
  id
) =>
  post(homeUrl.courseUpCourse, {
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
    id,
  });

/**
 * 删除课程
 * @param {*} id
 * @returns
 */
export const EvaluateDelPing = (id) => post(homeUrl.EvaluateDelPing, { id });

/**
 * 回复评价
 * @param {*} czz_id
 * @param {*} id
 * @param {*} content
 * @returns
 */
export const EvaluateHfEvaluate = (id, content) =>
  post(homeUrl.EvaluateHfEvaluate, {
    czz_id: getStorage("user").id,
    id,
    content,
  });

/**
 * 删除已有的课时-编辑的时候
 * @param {*} id
 * @returns
 */
export const courseDelCourseurl = (id) =>
  post(homeUrl.courseDelCourseurl, {
    id,
  });

//1. 选择适合的专业
export const getFormSpecialtyurl = () => post(homeUrl.getFormSpecialtyurl);
//2. 选择适合的课程类型
export const getFormClassTypeurl = () => post(homeUrl.getFormClassTypeurl);
