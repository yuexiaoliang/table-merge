import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);

app.mount('#app');
