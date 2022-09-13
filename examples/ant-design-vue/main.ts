import { createApp } from 'vue';

import Table from 'ant-design-vue/lib/table';
import 'ant-design-vue/lib/table/style/css';

import App from './App.vue';

const app = createApp(App);
app.use(Table);

app.mount('#app');
