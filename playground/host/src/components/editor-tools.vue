<script setup lang="ts">
import { reactive, ref } from 'vue';

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

const rangeType = ref('number');
const formData = reactive({});
</script>

<template>
  <div class="editor-tools">
    <el-form :model="formData" style="max-width: 460px">
      <el-form-item label="Span Type" class="block">
        <el-radio-group v-model="formData.spanType" class="ml-4">
          <el-radio label="rowSpan">rowSpan</el-radio>
          <el-radio label="colSpan">colSpan</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Keys" class="block">
        <el-checkbox-group v-model="formData.keys">
          <el-checkbox v-for="key in allKeys" :key="key" :label="key" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Range Type">
        <el-radio-group v-model="rangeType" class="ml-4">
          <el-radio label="number">number</el-radio>
          <el-radio label="array">array</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <template v-if="rangeType === 'number'">
          <el-input-number v-model="formData.range" :min="1" :max="10" />
        </template>
        <template v-if="rangeType === 'array'">
          <el-col :span="11">
            <el-input-number v-model="formData.range" :min="1" :max="10" style="width: 100%" />
          </el-col>
          <el-col class="text-center" :span="1" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-input-number v-model="formData.range" :min="1" :max="10" style="width: 100%" />
          </el-col>
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
}

.block {
  display: block;
}
</style>
