(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-870cfc10"],{3773:function(t,e,s){"use strict";s("d484")},"472e":function(t,e,s){},"47cc":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"div_audit_html"},[t._m(0),s("div",{staticClass:"au_body"},[s("State",{attrs:{"user-state":t.stateid}}),t._m(1)],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"au_header"},[a("div",{staticClass:"nr_header_left"},[a("div",[a("img",{attrs:{src:s("67b8")}})]),a("div",{staticClass:"nr_header_left_title"},[t._v("备考猫创作中心")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"au_bot"},[a("img",{attrs:{src:s("cfc8"),alt:""}}),a("h3",[t._v("备考猫创作者顾问")])])}],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"au_body_shenghe"},[s("div",{staticClass:"shenghe_top"},[s("div",[s("i",{class:t.iconClass[t.userState]})]),s("h3",{class:t.userState>0?t.userState>1?"h3_lose":"h3_await":"h3_succee"},[t._v("\n      "+t._s(t.ptitle[t.userState].title)+"\n    ")])]),2==t.userState?s("ul",{staticClass:"user_isnot"},[s("li",[t._v("很抱歉，您的创作者身份审核未能通过，具体原因如下:")]),s("li",[t._v("1. 资质认证资料不够详细，无法确认您的具体信息;")]),s("li",[t._v("2. 资料内容模糊，阅读困难，需提交更高清晰度的材料;")]),s("li",{staticClass:"list_a"},[s("router-link",{attrs:{to:"/zhuce/zcbz2"}},[t._v(" 重新提交注册信息")])],1)]):t._e(),s("p",{staticClass:"shenghe_bot"},[t._v(t._s(t.ptitle[t.userState].content))])])},c=[],r={data:function(){return{ptitle:[{title:"提交成功！24小时内将完成审核",content:"审核结果将通过短信通知您，同时您也可以通过备考猫APP系统消息通知获知审核结果。扫描以下二维码添加备考猫创作顾问微信，获取进一步支持。"},{title:"账号审核中···",content:"审核结果将通过短信通知您，同时您也可以通过备考猫APP系统消息通知获知审核结果。扫描以下二维码添加备考猫创作顾问微信，获取进一步支持。"},{title:"审核未通过",content:""}],iconClass:["el-icon-circle-check","el-icon-time","el-icon-circle-close"]}},created:function(){},props:["userState"]},l=r,u=(s("f237"),s("2877")),o=Object(u["a"])(l,n,c,!1,null,"51a0483a",null),d=o.exports,_=s("0b22"),h={data:function(){return{stateid:null}},created:function(){var t=this,e=sessionStorage.getItem("loginUser");if(e){var s=JSON.parse(e);this.userid=s.id,Object(_["a"])({url:"/user/userView",data:{czz_id:s.id}}).then((function(e){console.log(e);var a=e.data.data,i=(a.jindu,a.status),n=e.data.data.token;if(n==s.token)switch(i){case"0":t.stateid=1;break;case"1":t.stateid=0,t.$message.success("您已通过注册，请直接登录！"),t.$router.push({name:"index"});break;case"2":t.stateid=2;break;default:t.$message.error("请填写完整您的个人信息！"),t.$router.push({name:"zhuce2"});break}else t.$message.error("您的注册信息有误！请先登录"),t.$router.push({name:"index"})}))}else this.$message.error("您的注册信息有误！请先登录"),this.$router.push({name:"index"})},components:{State:d}},f=h,v=(s("3773"),Object(u["a"])(f,a,i,!1,null,"1488b2b8",null));e["default"]=v.exports},cfc8:function(t,e,s){t.exports=s.p+"img/bkmCode.10bad28b.svg"},d484:function(t,e,s){},f237:function(t,e,s){"use strict";s("472e")}}]);
//# sourceMappingURL=chunk-870cfc10.d05fdeda.js.map