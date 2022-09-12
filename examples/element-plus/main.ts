import { createApp } from 'vue';

import { ElTable } from 'element-plus';
import 'element-plus/lib/components/table/style/css';

import App from './App.vue';

const app = createApp(App);
app.use(ElTable);

app.mount('#app');
