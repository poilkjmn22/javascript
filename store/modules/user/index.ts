import { defineStore } from 'pinia';
import {
  getCodeImg,
  login,
  logout,
  getUserInfo,
  getRouters,
} from '@/api/login';
import { setToken, clearToken } from '@/utils/auth';
import generatorDynamicRouter from '@/router/routeGenerate';
import { walkTreeData } from '@/utils/index';

interface UserInfo {
  userName?: string;
  avatar?: string;
  roles?: Array<any>;
  [key: string]: unknown;
}
interface AsyncRoute {
  name?: string;
  path?: string;
  component?: [null, () => Promise<any>];
  redirect?: string;
  meta: {
    icon?: string;
    title?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    [key: string]: unknown;
  };
  children?: Array<AsyncRoute>;
}
interface UserState {
  useInfo: UserInfo;
  asyncRoutes: Array<AsyncRoute>;
  permissions: Array<any>;
  roles: Array<any>;
}

function transformRoutes(routes) {
  const hideSideMenuList: any[] = ['数据总览', '数据查询'];
  walkTreeData(routes, (n) => {
    n.meta?.icon && (n.meta.iconType = 'svgIcon');
    n.name = undefined;
    if (hideSideMenuList.includes(n.meta?.title)) {
      n.meta.hasSide = false;
    }
  })
}

// function shouldShowMenu(menu) {
  // return ['System'].includes(menu.name)
// }

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    useInfo: {},
    asyncRoutes: [],
    permissions: [],
    roles: [],
  }),
  getters: {
    userInfo(state: UserState): UserInfo {
      return { ...state.useInfo };
    },
  },
  actions: {
    async getCode() {
      return await getCodeImg();
    },
    async login(loginForm: Record<string, any>) {
      try {
        const res: any = await login(loginForm as any);
        setToken(res.data.access_token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    async logout() {
      try {
        await logout();
      } finally {
        this.logoutCallBack();
      }
    },
    // 退出登录后的回调函数
    logoutCallBack() {
      clearToken();
    },
    async getUserInfo() {
      const res: any = await getUserInfo();
      if (res.code === 200) {
        this.useInfo = res.user;
        this.permissions = res.permissions;
        this.roles = res.roles;
      }
    },
    async getMenus() {
      const { code, data }: any = await getRouters();
      if (code! == 200 && !data?.length) {
        return new Promise((resolve) => {
          resolve([]);
        });
      }
      transformRoutes(data);
      const { hasComponentRoutes, notHasComponentRoutes } =
        generatorDynamicRouter(data);
      this.asyncRoutes = notHasComponentRoutes[0].children || [];
      // console.log(hasComponentRoutes, notHasComponentRoutes)
      return new Promise((resolve) => {
        resolve(hasComponentRoutes);
      });
    },
  },
});

export default useUserStore;
