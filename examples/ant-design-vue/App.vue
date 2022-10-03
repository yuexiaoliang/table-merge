<script setup lang="ts">
// import { tableMergeAntDesignVue } from 'table-merge';
// or
import tableMergeAntDesignVue from '@table-merge/ant-design-vue';

import { data, columns } from '../mock';

const cols = columns.map((col) => {
  return {
    title: col.label,
    dataIndex: col.prop,
    align: 'center'
  };
});

const columnsRow = tableMergeAntDesignVue(data, cols, {});
const columnsRow2 = tableMergeAntDesignVue(data, cols, { range: { row: 2 } });
const columnsRow1_3 = tableMergeAntDesignVue(data, cols, { range: { row: [1, 3] } });

const columnsCol = tableMergeAntDesignVue(data, cols, {}, 'colSpan');
const columnsCol2 = tableMergeAntDesignVue(data, cols, { range: { col: 2 } }, 'colSpan');
const columnsCol1_3 = tableMergeAntDesignVue(data, cols, { range: { col: [1, 3] } }, 'colSpan');

const mergeColFilter = tableMergeAntDesignVue(
  data,
  cols.filter((col) => col.dataIndex !== 'id'),
  { keys: ['a', 'b', 'c', 'd'] },
  'colSpan'
);
</script>

<template>
  <div class="box">
    <div class="box__title">多行合并</div>
    <a-table :dataSource="data" :columns="columnsRow" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多行合并-指定开始位置-2</div>
    <a-table :dataSource="data" :columns="columnsRow2" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多行合并-指定范围-[1-3]</div>
    <a-table :dataSource="data" :columns="columnsRow1_3" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多列合并</div>
    <a-table :dataSource="data" :columns="columnsCol" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多列合并-指定开始位置-2</div>
    <a-table :dataSource="data" :columns="columnsCol2" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多列合并-指定范围-[1-3]</div>
    <a-table :dataSource="data" :columns="columnsCol1_3" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">指定列</div>
    <a-table :dataSource="data" :columns="mergeColFilter" :pagination="false" bordered />
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin: 30px;

  &__title {
    margin-bottom: 10px;
    font-size: 20px;
  }
}
</style>
