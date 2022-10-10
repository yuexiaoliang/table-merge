<script setup lang="ts">
import tableMergeElementPlus from '@table-merge/element-plus';

const data = [
  { id: 1, a: 8, b: 8, c: 2, d: 0 },
  { id: 2, a: 2, b: 4, c: 4, d: 5 },
  { id: 3, a: 8, b: 8, c: 4, d: 4 },
  { id: 4, a: 5, b: 8, c: 4, d: 1 },
  { id: 5, a: 5, b: 3, c: 3, d: 2 }
];

const columns = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'a', label: 'A列', align: 'center' },
  { prop: 'b', label: 'B列', align: 'center' },
  { prop: 'c', label: 'C列', align: 'center' },
  { prop: 'd', label: 'D列', align: 'center' }
];
</script>

<template>
  <h1 class="title">@table-merge/element-plus</h1>

  <h2 class="box">合并行</h2>

  <div class="box">
    <p>多行合并</p>
    <pre>tableMergeElementPlus(data)</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data)" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>从第二行开始合并</p>
    <pre>tableMergeElementPlus(data, { range: { row: 2 } })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { row: 2 } })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>合并 1 - 3 行，不包含第 3 行</p>
    <pre>tableMergeElementPlus(data, { range: { row: [1, 3] } })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { row: [1, 3] } })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>从第一行和第二例开始合并</p>
    <pre>tableMergeElementPlus(data, { range: { row: 1, col: 2 } })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { row: 1, col: 2 } })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <h2 class="box">合并列</h2>

  <div class="box">
    <p>多列合并</p>
    <pre>tableMergeElementPlus(data, { spanType: 'colSpan' })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { spanType: 'colSpan' })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>从第二列开始合并</p>
    <pre>tableMergeElementPlus(data, { range: { col: 2 }, spanType: 'colSpan' })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { col: 2 }, spanType: 'colSpan' })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>合并 1 - 3 列，不包含第 3 列</p>
    <pre>tableMergeElementPlus(data, { range: { col: [1, 3] }, spanType: 'colSpan' })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { col: [1, 3] }, spanType: 'colSpan' })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
  </div>

  <div class="box">
    <p>从第一行和第二例开始合并</p>
    <pre>tableMergeElementPlus(data, { range: { row: 1, col: 2 }, spanType: 'colSpan' })</pre>
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { range: { row: 1, col: 2 }, spanType: 'colSpan' })" border>
      <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
    </el-table>
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

const columns = [
  { prop: 'a', label: 'A列', align: 'center' },
  { prop: 'b', label: 'B列', align: 'center' },
  { prop: 'c', label: 'C列', align: 'center' },
  { prop: 'd', label: 'D列', align: 'center' }
];

tableMergeElementPlus(data, { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' })
</pre
    >
    <el-table :data="data" :span-method="tableMergeElementPlus(data, { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' })" border>
      <el-table-column v-for="col in columns.filter((col) => col.prop !== 'id')" :key="col.prop" v-bind="col" />
    </el-table>
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
