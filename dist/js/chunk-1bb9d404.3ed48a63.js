(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1bb9d404"],{"0b23":function(a,t,s){},"8cda":function(a,t,s){"use strict";s.r(t);var e=function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"zcbzHtml_two"},[a._m(0),s("div",{staticStyle:{height:"70px"}}),s("div",{staticClass:"zc_div_body"},[a._m(1),s("ul",{staticClass:"zc_ul_form"},[s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("姓名")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.name,expression:"fromUser.name"}],staticClass:"input_name",attrs:{type:"text"},domProps:{value:a.fromUser.name},on:{change:a.changeUsername,input:function(t){t.target.composing||a.$set(a.fromUser,"name",t.target.value)}}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:a.warning.uname>0&&a.warning.uname<6,expression:"warning.uname > 0 && warning.uname < 6"}],staticClass:"form_error"},[a._v("\n            姓名不得为空\n          ")]),s("span",{staticClass:"span_hint"},[a._v("身份证姓名，若姓名中有特殊符号，请完整输入")])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("身份证号码")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.idCard,expression:"fromUser.idCard"}],staticClass:"input_name",attrs:{type:"text"},domProps:{value:a.fromUser.idCard},on:{change:a.changeidCard,input:function(t){t.target.composing||a.$set(a.fromUser,"idCard",t.target.value)}}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:a.warning.icard>0&&a.warning.icard<6,expression:"warning.icard > 0 && warning.icard < 6"}],staticClass:"form_error"},[a._v("\n            "+a._s(a.warning.icard>1?"身份证格式有误":"身份证号码不得为空")+"\n          ")]),s("span",{staticClass:"span_hint"},[a._v("身份证号码，18位数字或17位数字+“X”")])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("硕士院校")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_school"},[s("div",{staticClass:"formList_school_titles"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.academys.school,expression:"fromUser.academys.school"}],attrs:{type:"text"},domProps:{value:a.fromUser.academys.school},on:{change:function(t){return a.changeAcademy()},input:function(t){t.target.composing||a.$set(a.fromUser.academys,"school",t.target.value)}}}),s("span",{staticClass:"span_hint"},[a._v("学校")])]),s("div",{staticClass:"formList_school_titles"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.academys.academy,expression:"fromUser.academys.academy"}],attrs:{type:"text"},domProps:{value:a.fromUser.academys.academy},on:{change:function(t){return a.changeAcademy()},input:function(t){t.target.composing||a.$set(a.fromUser.academys,"academy",t.target.value)}}}),s("span",{staticClass:"span_hint"},[a._v("院系")])]),s("div",{staticClass:"formList_school_titles"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.academys.specialty,expression:"fromUser.academys.specialty"}],attrs:{type:"text"},domProps:{value:a.fromUser.academys.specialty},on:{change:function(t){return a.changeAcademy()},input:function(t){t.target.composing||a.$set(a.fromUser.academys,"specialty",t.target.value)}}}),s("span",{staticClass:"span_hint"},[a._v("专业")])])])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("当前状态")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input",staticStyle:{border:"none"}},[s("el-select",{attrs:{placeholder:"请选择",size:"medium"},on:{change:function(t){return a.changeState()}},model:{value:a.optionsValue,callback:function(t){a.optionsValue=t},expression:"optionsValue"}},a._l(a.options,(function(a){return s("el-option",{key:a.value,attrs:{label:a.label,value:a.value}})})),1)],1)])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("身份证照片")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input_identityCard"},[s("div",{staticClass:"input_identityCard"},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","auto-upload":!1,"show-file-list":!1,accept:"image/png,image/jpeg,image/jpg","on-change":a.uploadIdPhotoZ}},[0==a.idCardTorF.zheng?s("div",{staticClass:"input_identityCard_icon"},[s("div",[s("i",{staticClass:"el-icon-plus"}),s("span",{staticClass:"span_hint"},[a._v("身份证人像面")])])]):1==a.idCardTorF.zheng?s("div",{staticClass:"input_identityCard_img"},[s("img",{attrs:{src:a.sfzimg1}})]):s("div",{staticClass:"input_identityCard_maskLayer"},[s("div",{staticClass:"input_identityCard_progress"},[s("el-progress",{attrs:{percentage:a.percentageZ,"show-text":!1,color:"#40DA97"}})],1)])])],1),s("div",{staticClass:"input_identityCard"},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","auto-upload":!1,"show-file-list":!1,accept:"image/png,image/jpeg,image/jpg","on-change":a.uploadIdPhotoF}},[0==a.idCardTorF.fan?s("div",{staticClass:"input_identityCard_icon"},[s("div",[s("i",{staticClass:"el-icon-plus"}),s("span",{staticClass:"span_hint"},[a._v("身份证国徽面")])])]):1==a.idCardTorF.fan?s("div",{staticClass:"input_identityCard_img"},[s("img",{attrs:{src:a.sfzimg2}})]):s("div",{staticClass:"input_identityCard_maskLayer"},[s("div",{staticClass:"input_identityCard_progress"},[s("el-progress",{attrs:{percentage:a.percentageF,"show-text":!1,color:"#40DA97"}})],1)])])],1)]),s("span",{staticClass:"span_hint"},[a._v("请上传身份证照片，照片大小10M以内")])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name"},[a._v("资质认证")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input_zzrzall"},[a._l(a.certificArr,(function(t,e){return s("div",{key:t.id,staticClass:"formList_input_zzrzimg",on:{mouseenter:function(t){return a.enterZzrz(e)},mouseleave:function(t){return a.leaveZzrz(e)}}},[s("img",{attrs:{src:t.imgsrc}}),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"val.isShow"}],staticClass:"zzrz_zhe"},[s("i",{staticClass:"el-icon-close zzrz_icon",on:{click:function(t){return a.deleteCer(e)}}})])])})),a.certificArr.length<5?s("div",{staticClass:"formList_input_zzrz"},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","auto-upload":!1,"show-file-list":!1,accept:"image/png,image/jpeg,image/jpg","on-change":a.changeCertification}},[s("i",{staticClass:"el-icon-plus input_icon"})])],1):a._e()],2),s("span",{staticClass:"span_hint"},[a._v("可上传学历、学位证书、录取通知书、职业资格证书等，最多可上传5张图片，图片大小10M以内")])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name_nobefore"},[a._v("其他认证")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.otherCertification,expression:"fromUser.otherCertification"}],staticClass:"form_textarea",domProps:{value:a.fromUser.otherCertification},on:{input:function(t){t.target.composing||a.$set(a.fromUser,"otherCertification",t.target.value)}}})]),s("span",{staticClass:"span_hint"},[a._v("可填写其他平台个人主页链接，如豆瓣、微博、小红书；可增加审核通过的几率哦～")])])]),s("li",{staticClass:"form_list"},[s("div",{staticClass:"formList_name_nobefore"},[a._v("邮箱地址")]),s("div",{staticClass:"formList_box"},[s("div",{staticClass:"formList_input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.fromUser.email,expression:"fromUser.email"}],staticClass:"input_name",attrs:{type:"text"},domProps:{value:a.fromUser.email},on:{input:function(t){t.target.composing||a.$set(a.fromUser,"email",t.target.value)}}})]),s("span",{staticClass:"span_hint"},[a._v("可用于找回密码")])])])]),s("div",{staticClass:"zc_div_uploadAll"},[s("div",{staticClass:"uploadAllLast",on:{click:function(t){return a.golast()}}},[a._v("上一步")]),s("div",{staticClass:"uploadAllNext",on:{click:function(t){return a.userCommit()}}},[a._v("提交")])])])])},i=[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"nr_header"},[e("div",{staticClass:"nr_header_left"},[e("div",[e("img",{attrs:{src:s("67b8")}})]),e("div",{staticClass:"nr_header_left_title"},[a._v("备考猫创作中心")])])])},function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"zc_topSchedule"},[s("p",{staticClass:"p_xian",staticStyle:{background:"#fd6246"}}),s("p",{staticClass:"p_xian",staticStyle:{background:"#fd6246"}}),s("div",{staticClass:"schedule_formerly"},[s("span",[a._v("1")])]),s("div",{staticClass:"schedule_now"},[s("span",[a._v("2")])]),s("div",{staticClass:"schedule_future"},[s("span",[a._v("3")])])])}],r=(s("a481"),s("7f7f"),s("bc3a")),o=s.n(r),n=s("0b22"),c={data:function(){return{userid:null,active:2,options:[{value:"已录取",lable:"1"},{value:"在读中",lable:"2"},{value:"已毕业",lable:"3"},{value:"已结业",lable:"4"}],optionsValue:"",percentageZ:0,percentageF:0,idCardTorF:{zheng:0,fan:0},sfzimg1:"",sfzimg2:"",certificArr:[],fromUser:{name:"",idCard:"",academys:{school:"",academy:"",specialty:""},schoolState:"",idCardPhotograph:{front:"",rear:""},certification:[],otherCertification:"",email:""},warning:{uname:0,icard:0,academy:0,scstate:0,idCardPhot:0,cerfiv:0}}},created:function(){var a=this,t=JSON.parse(sessionStorage.getItem("loginUser"));t?Object(n["a"])({url:"/user/userView",data:{czz_id:t.id}}).then((function(s){var e=s.data.data;e.token!=t.token?(a.$message.error("您的注册信息有误！请重新注册"),a.$router.push({name:"zhuce1"})):a.userid=e.id})):(this.$message.error("您的注册信息有误！请重新注册"),this.$router.push({name:"zhuce1"}))},methods:{changeUsername:function(){0==this.fromUser.name.length?this.warning.uname=1:this.warning.uname=6},changeidCard:function(){var a=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;""==this.fromUser.idCard?this.warning.icard=1:a.test(this.fromUser.idCard)?this.warning.icard=6:this.warning.icard=2},changeAcademy:function(){var a=this.fromUser.academys,t=a.school,s=a.academy,e=a.specialty;this.warning.academy=""!=t&&""!=s&&""!=e?6:1},changeState:function(){switch(this.optionsValue){case"已录取":this.fromUser.schoolState=1;break;case"在读中":this.fromUser.schoolState=2;break;case"已毕业":this.fromUser.schoolState=3;break;case"已结业":this.fromUser.schoolState=4;break;default:break}this.warning.scstate=6},uploadIdPhotoZ:function(a){var t=this,s=a.raw,e=s.size,i=s.type,r=["image/png","image/jpeg","image/jpg"];if(e/1024/1024<10&&-1!=r.indexOf(i)){var n=new FormData;n.append("file",a.raw),this.idCardTorF.zheng=2,this.percentageZ=100,o()({baseURL:"https://bkmcsapi.heyhui.com",method:"POST",url:"/page/upload/uploadImgs",data:{file:n},headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return n}]}).then((function(a){console.log("sfz",a),a.data.status?(t.sfzimg1=a.data.showurl,t.fromUser.idCardPhotograph.front=a.data.url,t.idCardTorF.zheng=1,1==t.idCardTorF.zheng&&1==t.idCardTorF.fan?t.warning.idCardPhot=6:(t.warning.idCardPhot=2,console.log(t.idCardTorF,"未通过"))):(t.idCardTorF.zheng=0,t.$message.error("上传失败请稍后再试!"))})).catch((function(a){t.idCardTorF.zheng=0,console.log("请求错误",a)}))}else this.$message.error("请选择正确格式的图片")},uploadIdPhotoF:function(a){var t=this,s=a.raw,e=s.size,i=s.type,r=["image/png","image/jpeg","image/jpg"];if(e/1024/1024<10&&-1!=r.indexOf(i)){var n=new FormData;n.append("file",a.raw),this.idCardTorF.fan=2,this.percentageF=100,o()({baseURL:"https://bkmcsapi.heyhui.com",method:"POST",url:"/page/upload/uploadImgs",data:{file:n},headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return n}],timeout:3e4}).then((function(a){a.data.status?(t.sfzimg2=a.data.showurl,t.fromUser.idCardPhotograph.rear=a.data.url,t.idCardTorF.fan=1,1==t.idCardTorF.zheng&&1==t.idCardTorF.fan?t.warning.idCardPhot=6:t.warning.idCardPhot=2):(t.idCardTorF.fan=0,t.$message.error("上传失败请稍后再试!"))})).catch((function(a){t.idCardTorF.fan=0,console.log("请求错误")}))}else this.$message.error("请选择正确格式的图片")},changeCertification:function(a){var t=this;if(5==this.certificArr.length)this.$message.error("超出最大上传数量");else{var s=a.raw,e=s.size,i=s.type,r=["image/png","image/jpeg","image/jpg"];if(e/1024/1024<10&&-1!=r.indexOf(i)){var n=new FormData;n.append("file",a.raw),o()({baseURL:"https://bkmcsapi.heyhui.com",url:"/page/upload/uploadImgs",method:"POST",data:{file:n},headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return n}]}).then((function(s){if(s.data.status){var e={isShow:!1},i=s.data.showurl,r=s.data.url;e.imgsrc=i,e.id=a.raw.uid,t.certificArr.push(e),t.fromUser.certification.push(r),t.warning.cerfiv=6}else t.$message.error("上传失败请稍后再试!")})).catch((function(a){console.log("请求错误")}))}else this.$message.error("请选择正确格式的图片")}},enterZzrz:function(a){this.certificArr[a].isShow=!0},leaveZzrz:function(a){this.certificArr[a].isShow=!1},deleteCer:function(a){this.$delete(this.certificArr,a),this.$delete(this.fromUser.certification,a),this.certificArr.length<=0?this.warning.cerfiv=1:this.warning.cerfiv=6},golast:function(){var a={form:this.fromUser,warning:this.warning,optionsValue:this.optionsValue,idCardTorF:this.idCardTorF,certificArr:this.certificArr,sfzimg1:this.sfzimg1,sfzimg2:this.sfzimg2};sessionStorage.setItem("nowfrom",JSON.stringify(a)),this.$router.replace({name:"zhuce2"})},userCommit:function(){var a=this,t=!0;for(var s in this.warning)6!=this.warning[s]&&(t=!1);if(t){var e=this.fromUser.idCardPhotograph.front,i=this.fromUser.idCardPhotograph.rear;Object(n["a"])({url:"/login/setuserinfo",data:{user_id:this.userid,name:this.fromUser.name,card_id:this.fromUser.idCard,card_pic_z:e,card_pic_f:i,email:this.fromUser.email,imgs:this.fromUser.certification,sname:this.fromUser.academys.school,faculty:this.fromUser.academys.academy,major:this.fromUser.academys.specialty,type:this.fromUser.schoolState,content:this.fromUser.otherCertification}}).then((function(t){console.log("步骤3",t);var s=t.data.st;1==s?(a.$message.success("提交成功！"),a.$router.replace({path:"/zhuce/audit",query:{userstated:0}})):a.$message.error("注册失败！请稍后...")}))}else this.$message.error("请填写完整后提交!")}},beforeRouteEnter:function(a,t,s){var e=JSON.parse(sessionStorage.getItem("nowfrom"));"zhuce2"==t.name&&e?s((function(a){a.fromUser=e.form,a.warning=e.warning,a.optionsValue=e.optionsValue,a.idCardTorF=e.idCardTorF,a.certificArr=e.certificArr,a.sfzimg1=e.sfzimg1,a.sfzimg2=e.sfzimg2})):(sessionStorage.removeItem("nowfrom"),s())}},l=c,d=(s("a2cb"),s("2877")),m=Object(d["a"])(l,e,i,!1,null,"225adece",null);t["default"]=m.exports},a2cb:function(a,t,s){"use strict";s("0b23")}}]);
//# sourceMappingURL=chunk-1bb9d404.3ed48a63.js.map