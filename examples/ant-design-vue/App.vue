<script setup lang="ts">
import { tableMergeAntDesignVue } from 'table-merge';
// or
// import tableMergeAntDesignVue from '@table-merge/ant-design-vue';

import { data, columns } from '../mock';

const _col = columns.map((col) => {
  return {
    title: col.label,
    dataIndex: col.prop,
    align: 'center'
  };
});

const columnsRow = tableMergeAntDesignVue(data, _col, 'row');
const columnsRow2 = tableMergeAntDesignVue(data, _col, 'row', 2);
const columnsRow1_2 = tableMergeAntDesignVue(data, _col, 'row', [1, 2]);

const columnsCol = tableMergeAntDesignVue(data, _col);
const columnsCol2 = tableMergeAntDesignVue(data, _col, 'column', 2);
const columnsCol1_2 = tableMergeAntDesignVue(data, _col, 'column', [1, 2]);
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
    <div class="box__title">多行合并-指定范围-[1-2]</div>
    <a-table :dataSource="data" :columns="columnsRow1_2" :pagination="false" bordered />
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
    <div class="box__title">多列合并-指定范围-[1-2]</div>
    <a-table :dataSource="data" :columns="columnsCol1_2" :pagination="false" bordered />
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
