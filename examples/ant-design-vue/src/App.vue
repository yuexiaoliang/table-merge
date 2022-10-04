<script setup lang="ts">
import tableMergeAntDesignVue from '@table-merge/ant-design-vue';

const data = [
  { id: 1, a: 8, b: 8, c: 2, d: 0 },
  { id: 2, a: 2, b: 4, c: 4, d: 5 },
  { id: 3, a: 8, b: 8, c: 4, d: 4 },
  { id: 4, a: 5, b: 8, c: 4, d: 1 },
  { id: 5, a: 5, b: 3, c: 3, d: 2 }
];

const cols = [
  { align: 'center', dataIndex: 'id', title: 'ID' },
  { align: 'center', dataIndex: 'a', title: 'A列' },
  { align: 'center', dataIndex: 'b', title: 'B列' },
  { align: 'center', dataIndex: 'c', title: 'C列' },
  { align: 'center', dataIndex: 'd', title: 'D列' }
];
</script>

<template>
  <h1 class="title">@table-merge/ant-design-vue example</h1>

  <h2 class="box">合并行</h2>

  <div class="box">
    <p>多行合并</p>
    <pre>tableMergeAntDesignVue(data, cols)</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols)" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>从第二行开始合并</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { row: 2 } })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { row: 2 } })" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>合并 1 - 3 行，不包含第 3 行</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { row: [1, 3] } })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { row: [1, 3] } })" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>从第一行和第二例开始合并</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { row: 1, col: 2 } })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { row: 1, col: 2 } })" :pagination="false" bordered />
  </div>

  <h2 class="box">合并列</h2>

  <div class="box">
    <p>多列合并</p>
    <pre>tableMergeAntDesignVue(data, cols, { spanType: 'colSpan' })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { spanType: 'colSpan' })" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>从第二列开始合并</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { col: 2 }, spanType: 'colSpan' })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { col: 2 }, spanType: 'colSpan' })" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>合并 1 - 3 列，不包含第 3 列</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { col: [1, 3] }, spanType: 'colSpan' })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { col: [1, 3] }, spanType: 'colSpan' })" :pagination="false" bordered />
  </div>

  <div class="box">
    <p>从第一行和第二例开始合并</p>
    <pre>tableMergeAntDesignVue(data, cols, { range: { row: 1, col: 2 }, spanType: 'colspan' })</pre>
    <a-table :dataSource="data" :columns="tableMergeAntDesignVue(data, cols, { range: { row: 1, col: 2 }, spanType: 'colSpan' })" :pagination="false" bordered />
  </div>

  <h2 class="box">筛选指定列</h2>
  <div class="box">
    <p>比如后端返回很多数据，而只渲染某些数据的时候，这时候可以指定没列要渲染的 keys</p>
    <pre>
const data = [
  { id: 1, a: 8, b: 8, c: 2, d: 0 },
  { id: 2, a: 2, b: 4, c: 4, d: 5 },
  { id: 3, a: 8, b: 8, c: 4, d: 4 },
  { id: 4, a: 5, b: 8, c: 4, d: 1 },
  { id: 5, a: 5, b: 3, c: 3, d: 2 }
];

const cols = [
  { align: 'center', dataIndex: 'a', title: 'A列' },
  { align: 'center', dataIndex: 'b', title: 'B列' },
  { align: 'center', dataIndex: 'c', title: 'C列' },
  { align: 'center', dataIndex: 'd', title: 'D列' }
];

tableMergeAntDesignVue(
  data,
  cols,
  { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' }
)</pre
    >
    <a-table
      :dataSource="data"
      :columns="
        tableMergeAntDesignVue(
          data,
          cols.filter((col) => col.dataIndex !== 'id'),
          { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' }
        )
      "
      :pagination="false"
      bordered
    />
  </div>

  <br />
</template>

<style lang="scss" scoped>
.title {
  margin: 30px;
  text-align: center;
  font-size: 30px;
}
.box {
  margin: 30px;

  pre {
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
