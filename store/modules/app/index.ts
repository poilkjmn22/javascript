import { defineStore } from 'pinia';
import { Skin } from '@/types/global';
import { getImageUrl } from '@/utils';

interface AppState {
  theme: string; // dark | light
  navbar: boolean; // 导航栏
  menu: boolean; // 菜单栏
  topMenu: boolean; // 顶部菜单栏
  hideMenu: boolean; // 隐藏菜单栏
  menuCollapse: boolean; // 菜单栏折叠
  themeColor: string; // 主题色
  menuWidth: number; // 菜单栏宽度
  tabBar: boolean; // 多页签
  globalSettings: boolean; // 全局设置
  skins: Skin[];
  activeSkin: string | undefined;
  themeVars: any;
  homeTitle: string;
  homeLogo: string;
  homeUrl: ""; // 用户登录地址，退出登录使用，默认跳转至login
  [key: string]: unknown;
}

const DefaultHomeTitle: string = "水利数据分析平台";
const DefaultHomeLogo: string =  getImageUrl('logo.png');
const defaultSettings: AppState = {
  theme: 'light',
  navbar: true,
  menu: true,
  topMenu: false,
  hideMenu: false,
  menuCollapse: false,
  themeColor: '#165DFF',
  tabBar: true,
  menuWidth: 220,
  globalSettings: false,
  skins: [{name: '', title: 'arco默认主题' },{ name: '@arco-themes/vue-hxtest123', title: 'hx测试主题' },{name:  '@arco-themes/vue-taolu-publishing-platform', title: '在线主题taolu' }],
  activeSkin: '',
  themeVars: {},
  homeTitle: DefaultHomeTitle,
  homeLogo: DefaultHomeLogo,
  homeUrl: "", // 用户登录地址，退出登录使用，默认跳转至login
};

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
  },
  actions: {
    updateAppSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      const data = {
        homeTitle: partial.homeTitle || DefaultHomeTitle,
        homeLogo:
          (partial.homeLogo ? location.origin + partial.homeLogo : undefined) ||
          DefaultHomeLogo,
        homeUrl: partial.homeUrl,
      };
      if ('homeLogo' in partial) {
        setTimeout(() => {
          const linkTags = document.getElementsByTagName("link");
          for (let i = 0; i < linkTags.length; i++) {
            const linkTag = linkTags[i];
            if (linkTag.getAttribute("rel") === "icon") {
              // 修改 href 属性
              linkTag.setAttribute("href", data.homeLogo);
            }
          }
        }, 0);
      }
      this.$patch({ ...partial,...data });
    },
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    setTitle(title: string) {
      document.title = title;
    },
  },
});

export default useAppStore;
