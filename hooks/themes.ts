import { Ref, ref, computed, watch } from 'vue';
import { useAppStore } from '@/store';
import { getRgbStr } from '@/utils/index';
import { isArray, pick } from 'lodash-es';
import { Skin } from '@/types/global';

export default function useThemes() {
  const appStore = useAppStore();
  const isDark = computed(() => {
    return appStore.theme === 'dark';
  });

  watch(() => isDark.value, updateThemeVars);

  return {
    isDark,
  };
}
// 获取设计变量
const themeStyle = window.getComputedStyle(document.body);

const getVar = (key: string) => {
  return themeStyle.getPropertyValue(key);
};
const setVar = (key: string) => {
  return themeStyle.getPropertyValue(key);
};
export { getVar, setVar };

export function useVars(_keys: string[] | string) {
  const appStore = useAppStore();
  const tv: any = appStore.themeVars;
  const keys: string[] = (isArray(_keys) ? _keys : [_keys]) as string[];
  for (const k of keys) {
    if (!(k in tv)) {
      tv[k] = getVar(k);
    }
  }

  const vars = computed(() => pick(tv, keys));
  return {
    vars,
  };
}

export function useBrand(brandName: string, count = 10) {
  const appStore = useAppStore();
  const tv: any = appStore.themeVars;
  const keys: string[] = [];
  for (let i: number = 1; i <= count; i++) {
    const k = `--${brandName}-${i}`;
    keys.push(k);
  }
  for (const k of keys) {
    if (k in tv) {
      break;
    }
    tv[k] = getVar(k);
  }

  const vars = computed(() => keys.map((k) => tv[k]));
  const varsColor = computed(() => keys.map((k) => getRgbStr(tv[k])));
  return { varsColor, vars };
}

export function useSkin(defaultThemeId = 'arco-custom-theme') {
  const appStore = useAppStore();

  function changeSkin(skinName?: string) {
    let linkTag: HTMLLinkElement | undefined = undefined;
    linkTag = document.querySelector(`#${defaultThemeId}`) as HTMLLinkElement;
    if (linkTag) {
      document.head.removeChild(linkTag);
      linkTag = undefined;
    }
    if (!skinName) {
      selectSkin(skinName);
      updateThemeVars();
      return new Promise((resolve) => resolve('done'));
    }
    linkTag = document.createElement('link');
    linkTag.id = defaultThemeId;
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.href = new URL(
      `../../node_modules/${skinName}/css/arco.css`,
      import.meta.url
    ).href;
    document.head.appendChild(linkTag);
    return new Promise((resolve) => {
      const cssNum = document.styleSheets.length;
      const timer = setInterval(() => {
        if (document.styleSheets.length > cssNum) {
          clearInterval(timer);
          selectSkin(skinName);
          updateThemeVars();
          resolve('done');
        }
      }, 10);
    });
  }
  const skin = computed(() =>
    appStore.skins.find((s) => s.name === appStore.activeSkin)
  );

  return {
    changeSkin,
  };
}
export function updateThemeVars() {
  const appStore = useAppStore();
  const tv = appStore.themeVars
  for(const k in tv) {
    tv[k] = getVar(k)
  }
}
export function selectSkin(skin?: string) {
  const appStore = useAppStore();
  appStore.activeSkin = skin;
}
export function addSkin(skin: Skin) {
  const appStore = useAppStore();
  appStore.skins.push(skin);
}

export { getRgbStr }
