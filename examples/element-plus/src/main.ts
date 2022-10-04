import { createApp } from 'vue';

import { ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/lib/components/table/style/css';
import 'element-plus/lib/components/table-column/style/css';

import App from './App.vue';

const app = createApp(App);
app.use(ElTable).use(ElTableColumn);

app.mount('#app');
