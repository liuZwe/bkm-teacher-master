import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/assets/css/theme/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import * as echarts from "echarts";
import "@/icon/iconfont.css";
// @ts-ignore
import VueCropper from "vue-cropper";
import QuillEditor from "../src/components/quilleditor/quill-editor.vue";
// @ts-ignore
import timers from "timers";
import "./assets/css/reset.css";
import * as qiniu from "qiniu-js";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  loading: require("./assets/images/placeholder.png"),
  error: require("./assets/images/imgerro.png"),
  attempt: 1,
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCropper);
Vue.use(timers);
// @ts-ignore
Vue.use(qiniu);
Vue.use(VueAxios, axios);
// @ts-ignore
Vue.component(QuillEditor);
Vue.prototype.$echarts = echarts;

//md5加密
import $md5 from "js-md5";

Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
