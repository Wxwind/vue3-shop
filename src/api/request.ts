import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import type { MyResponseType } from "@/types/index";
import { router } from "@/router";

const serve = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

const request = async <Q = any, D = any>(config: AxiosRequestConfig<Q>): Promise<D> => {
  //这里拿到的返回值如果被返回拦截器过滤掉了response.data.meta信息，只有response.data.data但是ts仍就以为是
  //AxiosResponse<MyResponseType<D>类型，所以我们在返回拦截器选择返回整个response
  const a = await serve.request<MyResponseType<D>, AxiosResponse<MyResponseType<D>>, Q>(config);
  console.log(a);
  const { data, meta } = a.data;
  return data;
};

export default request;

//请求拦截器
serve.interceptors.request.use(
  (config) => {
    if (config?.headers?.["Authorization"]) {
      config.headers["Authorization"] = localStorage.getItem("token");
    }
    console.log(config.data);
    return config;
  },
  (error: any) => {
    return Promise.reject(new Error(error));
  }
);

//返回拦截器
serve.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  (response: AxiosResponse<MyResponseType<any>>) => {
    const { data, meta } = response.data;

    console.log(response.data);
    if (meta.status === 200 || meta.status === 201) {
      //这里选择不过滤meta信息，原因见上面request注释
      return response;
    } else {
      //服务器内部逻辑输出了非200的状态码
      ElMessage.error(meta.msg);
      return Promise.reject(new Error(meta.msg));
    }
  },
  //超出 2xx 范围的状态码都会触发该函数
  (error: any) => {
    const { response } = error;

    console.log(response);
    if (response) {
      // 请求已发出且收到回复，但不是2xx
      errorHandle(response.status);
      return Promise.reject(response.data);
    } else {
      //断网，没收到回复
      ElMessage.warning("网络连接异常,请稍后再试!");
      return Promise.reject(new Error("网络连接异常,请稍后再试!"));
    }
  }
);

function errorHandle(status: number) {
  switch (status) {
    case 302:
      ElMessage.error("接口重定向了！");
      break;
    case 400:
      ElMessage.error("发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status);
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      // ElMessage.error("token:登录失效==>" + status + ":" + store.state.Roles);
      // storage.remove(store.state.Roles);
      // storage.get(store.state.Roles);
      router.replace({
        path: "/Login",
      });
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      ElMessage.error("登录过期,用户得到授权，但是访问是被禁止的==>" + status);
      // store.commit('token', null);
      setTimeout(() => {
        router.replace({
          path: "/Login",
        });
      }, 1000);
      break;
    case 404:
      ElMessage.error("网络请求不存在==>" + status);
      break;
    case 406:
      ElMessage.error("请求的格式不可得==>" + status);
      break;
    case 408:
      ElMessage.error(" 请求超时！");
      break;
    case 410:
      ElMessage.error("请求的资源被永久删除，且不会再得到的==>" + status);
      break;
    case 422:
      ElMessage.error("当创建一个对象时，发生一个验证错误==>" + status);
      break;
    case 500:
      ElMessage.error("服务器发生错误，请检查服务器==>" + status);
      break;
    case 502:
      ElMessage.error("网关错误==>" + status);
      break;
    case 503:
      ElMessage.error("服务不可用，服务器暂时过载或维护==>" + status);
      break;
    case 504:
      ElMessage.error("网关超时==>" + status);
      break;
    default:
      ElMessage.error("其他错误错误==>" + status);
  }
}
