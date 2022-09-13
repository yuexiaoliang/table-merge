<script setup lang="ts">
import useTableMerge from '@table-merge/antdv';
import { data, columns } from '../mock';

const _col = columns.map((col) => {
  return {
    title: col.label,
    dataIndex: col.prop,
    align: 'center'
  };
});

const columnsRow = useTableMerge(data, _col, 'row');

const columnsCol = useTableMerge(data, _col);
</script>

<template>
  <div class="box">
    <div class="box__title">多行合并</div>
    <a-table :dataSource="data" :columns="columnsRow" :pagination="false" bordered />
  </div>

  <div class="box">
    <div class="box__title">多列合并</div>
    <a-table :dataSource="data" :columns="columnsCol" :pagination="false" bordered />
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
