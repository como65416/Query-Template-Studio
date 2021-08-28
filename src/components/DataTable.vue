<template>
  <el-table
    :data="datas"
    size="mini"
    :header-cell-style="{background:'#F3F4F7',color:'#555'}"
    border>
    <el-table-column
      v-for="title in titles"
      :key="title"
      :width="150"
      :prop="title"
      :label="title">
      <template v-slot="scope">
        {{ scope.row[title] }}
        <el-tag
          v-if="scope.row[title] === null"
          size="mini"
          type="info"
          effect="plain">
          NULL
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTable',
  props: {
    titles: {
      type: Array,
      default: function () {
        return []
      }
    },
    datas: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
