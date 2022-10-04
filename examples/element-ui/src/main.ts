import Vue from 'vue';

import App from './App.vue';

import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/table.css';
import 'element-ui/lib/theme-chalk/table-column.css';

Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);

new Vue({
  el: '#app',
  render: (h) => h(App)
});
