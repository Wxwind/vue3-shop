import { router } from "./index";
import { useLoginStore } from "@/stores/loginStore";

const whiteList = ["/login"]; //用户不需要登录也能访问的白名单
const loginStore = useLoginStore();
router.beforeEach((to, from, next) => {
  if (loginStore.token) {
    if (to.path === "/login") {
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
