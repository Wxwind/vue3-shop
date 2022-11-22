import { router } from "./index";
import { useLoginStore } from "@/stores/loginStore";

const whiteList = ["/login"]; //用户不需要登录也能访问的白名单

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (loginStore.token) {
    //有token且跑到登录页面
    if (to.path === "/login") {
      //已经有token，重定向到/user
      next("/"); //重定向到主页
    } else {
      next(); //不处理
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
