import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import shouye from "./components/shou/shouye.vue";
import spkgl from "./components/czgl/spkgl.vue";
import sjfx from "./components/czgl/sjfx.vue";
import kcpj from "./components/hdgl/kcpj.vue";
import kcplhf from "./components/hdgl/kcplhf.vue";
import zygl from "./components/fwgl/zygl.vue";
import fsgl from "./components/sjzx/fsgl.vue";
import kcsjtj from "./components/sjzx/kcsjtj.vue";
import jcxx from "./components/zhgl/jcxx.vue";
import czsy from "./components/zhgl/czsy.vue";
import index from "./views/login/index.vue";
import zhuce from "./views/zhuce/zhuce.vue";

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return (originalPush as any).call(this, location).catch((err: Error) => err);
};

Vue.use(Router);
const routes = [
  // 登录
  {
    path: "/",
    name: "index",
    component: index,
  },
  // 注册
  {
    path: "/zhuce",
    component: zhuce,
    meta: { isnotLongin: true },
    children: [
      {
        path: "zcbz1",
        name: "zhuce1",
        component: () => import("./views/zhuce/zcbz1.vue"),
        meta: { isnotLongin: true },
      },
      {
        path: "zcbz2",
        name: "zhuce2",
        component: () => import("./views/zhuce/zcbz2.vue"),
        meta: { isnotLongin: true },
      },
      {
        path: "zcbz3",
        name: "zhuce3",
        component: () => import("./views/zhuce/zcbz3.vue"),
        meta: { isnotLongin: true },
      },
      {
        path: "audit",
        name: "useraudit",
        component: () => import("./views/zhuce/audit.vue"),
        meta: { isnotLongin: true },
      },
    ],
  },
  //主页
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      // 创作投稿
      {
        path: "/cztg",
        name: "cztg",
        component: () => import("./components/fbkc/index.vue"),
        children: [
          {
            path: "/creativeHome",
            name: "creativeHome",
            component: () => import("./components/fbkc/views/homePage.vue"),
          },
          // 发布课程视频
          {
            path: "/kcfb",
            name: "kcfb",
            component: () => import("./components/fbkc/views/kcfb.vue"),
          },
          // 图文创作
          {
            path: "/graphic",
            name: "graphic",
            component: () =>
              import("./components/fbkc/views/graphicCreation.vue"),
          },
          // 考点专栏
          {
            path: "/specol",
            name: "specol",
            component: () =>
              import("./components/fbkc/views/specialColumn.vue"),
          },
          { path: "/cztg", redirect: "/creativeHome" },
        ],
      },
      //草稿箱
      {
        path: "/drafts",
        name: "/drafts",
        component: () => import("./components/czgl/drafts.vue"),
      },
      {
        path: "/shouye",
        name: "shouye",
        component: shouye,
      },
      {
        path: "/spkgl",
        name: "spkgl",
        component: spkgl,
      },
      {
        path: "/kcpj",
        name: "kcpj",
        component: kcpj,
      },
      {
        path: "/kcplhf",
        name: "kcplhf",
        component: kcplhf,
      },
      {
        path: "/zygl",
        name: "zygl",
        component: zygl,
      },
      {
        path: "/fsgl",
        name: "fsgl",
        component: fsgl,
      },
      {
        path: "/kcsjtj",
        name: "kcsjtj",
        component: kcsjtj,
      },
      {
        path: "/jcxx",
        name: "jcxx",
        component: jcxx,
      },
      {
        path: "/czsy",
        name: "czsy",
        component: czsy,
      },

      {
        path: "/sjfx",
        name: "sjfx",
        component: sjfx,
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 登录页-针对跳转
  if (to.name === "index") {
    let userStro = localStorage.getItem("user");
    if (userStro) next("/shouye");
    else next();
  } else if (to.meta) {
    // 无需登录
    if (to.meta.isnotLongin) {
      next();
    } else {
      // 需要登录
      let userStro = localStorage.getItem("user");
      if (userStro) next();
      else next("/");
    }
  }
});

export default router;
