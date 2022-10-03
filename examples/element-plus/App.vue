<script setup lang="ts">
// import { tableMergeElementPlus } from 'table-merge';
// or
import tableMergeElementPlus from '@table-merge/element-plus';

// @ts-ignore
import { data, columns } from '../mock';

const mergeRow = tableMergeElementPlus(data);
const mergeRow2 = tableMergeElementPlus(data, { range: { row: 2 } });
const mergeRow1_3 = tableMergeElementPlus(data, { range: { row: [1, 3] } });

const mergeCol = tableMergeElementPlus(data, null, 'colSpan');
const mergeCol2 = tableMergeElementPlus(data, { range: { col: 2 } }, 'colSpan');
const mergeCol1_3 = tableMergeElementPlus(data, { range: { col: [1, 3] } }, 'colSpan');

const mergeColFilter = tableMergeElementPlus(data, { keys: ['a', 'b', 'c', 'd'] }, 'colSpan');
</script>

<template>
  <div class="box">
    <div class="box__title">指定列</div>
    <el-table ref="table" :data="data" :span-method="mergeColFilter" border style="width: 100%">
      <el-table-column v-for="col in columns.filter((col) => col.prop !== 'id')" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多行合并</div>
    <el-table ref="table" :data="data" :span-method="mergeRow" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多行合并-指定开始位置-2</div>
    <el-table ref="table" :data="data" :span-method="mergeRow2" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多行合并-指定范围-[1-3]</div>
    <el-table ref="table" :data="data" :span-method="mergeRow1_3" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多列合并</div>
    <el-table ref="table" :data="data" :span-method="mergeCol" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多列合并-指定开始位置-2</div>
    <el-table ref="table" :data="data" :span-method="mergeCol2" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>

  <div class="box">
    <div class="box__title">多列合并-指定范围-[1-3]</div>
    <el-table ref="table" :data="data" :span-method="mergeCol1_3" border style="width: 100%">
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
