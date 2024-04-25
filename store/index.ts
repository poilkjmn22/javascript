import { createPinia } from 'pinia';
import useAppStore from './modules/app/index';
import useUserStore from './modules/user/index';

const pinia = createPinia();

export { useAppStore, useUserStore };
export default pinia;
