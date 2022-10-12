<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TableMergeSpanTypes, TableMergeOptions } from '@table-merge/core';
import type { OptionsRange } from '@table-merge/core/dist/types/index';

const data = [
  { id: 1, a: 8, b: 8, c: 2, d: 0 },
  { id: 2, a: 2, b: 4, c: 4, d: 5 },
  { id: 3, a: 8, b: 8, c: 4, d: 4 },
  { id: 4, a: 5, b: 8, c: 4, d: 1 },
  { id: 5, a: 5, b: 3, c: 3, d: 2 }
];
const allKeys = ref(Object.keys(data[0]));

const columns = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'a', label: 'A列', align: 'center' },
  { prop: 'b', label: 'B列', align: 'center' },
  { prop: 'c', label: 'C列', align: 'center' },
  { prop: 'd', label: 'D列', align: 'center' }
];

interface FormData extends TableMergeOptions {
  spanType: TableMergeSpanTypes;
}

const keys = ref<string[]>(allKeys.value);
const spanType = ref<TableMergeSpanTypes>('rowSpan');
const rangeStart = ref(0);
const rangeEnd = ref(allKeys.value.length);
const rangeType = ref('number');
const range = computed<OptionsRange>(() => {
  const key = {
    rowSpan: 'row',
    colSpan: 'col'
  }[spanType.value];
  const value = computed(() => (rangeType.value === 'number' ? rangeStart : [rangeStart, rangeEnd]));
  return {
    [key]: value.value
  };
});

const formData = computed(() => {
  return {
    spanType: spanType.value,
    keys: allKeys.value,
    range: range.value
  };
});
</script>

<template>
  <div class="editor-tools">
    <div class="block-title">配置项</div>
    <el-form style="max-width: 460px">
      <el-form-item label="合并方式：" class="block">
        <el-radio-group v-model="spanType">
          <el-radio label="rowSpan">合并行</el-radio>
          <el-radio label="colSpan">合并列</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="合并的列：" class="block">
        <el-checkbox-group v-model="keys">
          <el-checkbox v-for="key in allKeys" :key="key" :label="key" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="合并范围：">
        <el-radio-group v-model="rangeType">
          <el-radio label="number">开始索引</el-radio>
          <el-radio label="array">开始到结束索引</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <template v-if="rangeType === 'number'">
          <el-input-number v-model="rangeStart" :min="1" :max="10" />
        </template>

        <template v-if="rangeType === 'array'">
          <el-col :span="11">
            <el-input-number v-model="rangeStart" :min="1" :max="10" style="width: 100%" />
          </el-col>
          <el-col class="text-center" :span="1" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-input-number v-model="rangeEnd" :min="1" :max="10" style="width: 100%" />
          </el-col>
          <p class="remark">ps: 包含开始，不包含结束</p>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.editor-tools {
  width: var(--tools-panel-width);
  height: 100%;
  padding: var(--editor-padding);
  border-right: 1px solid var(--border-color);
  box-sizing: border-box;

  .remark {
    width: 100%;
    color: var(--tools-remark-color);
  }
}

.block {
  display: block;
}
</style>
