<script setup lang="ts">
import useTableMerge from '@table-merge/element-plus';
import { data, columns } from '../mock.js';

const mergeCol = useTableMerge(data);
const mergeRow = useTableMerge(data, 'row');
</script>

<template>
  <div class="box">
    <div class="box__title">多行合并</div>
    <el-table ref="table" :data="data" :span-method="mergeRow" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多列合并</div>
    <el-table ref="table" :data="data" :span-method="mergeCol" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
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
