import { App, ComponentPublicInstance } from 'vue';
import request from "@/utils/request";

export default function handleError(Vue: App, enable = false) {
  Vue.config.performance = enable;
  // 捕获所有vue组件里面错误信息
  Vue.config.errorHandler = (
    err: any,
    instance: ComponentPublicInstance | null,
    info: string
  ) => {
    if (err?.stack) {
      errorReport(err?.stack, info);
    }
  };
  // 捕获js错误信息（与errorHandler冲突，用于补充errorHandler未捕获到的错误，主要是异步、Promise错误）
  window.onerror = function (message, source, line, column, error) {
    if (error?.stack) {
      errorReport(error?.stack);
    }
  };
}

function errorReport(info: string, ...rest: any) {
  console.log(
    `错误页面：${location.pathname}，错误信息：${info}`,
    rest.length ? `来源：${rest.join(',')}` : ''
  );
}

export function sendAnalytics(url: string, data: any) {
  document.addEventListener("visibilitychange", function logData() {
    if (document.visibilityState === "hidden") {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("url", data);
      } else {
        request({
          url,
          method: 'post',
          data
        })
      }
    }
  });
}
