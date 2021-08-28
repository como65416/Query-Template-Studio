<template>
  <el-card>
    <template #header>
      {{ script.name }}
    </template>
    <pre>{{ generateBindedSQL(script.sql, variables) }}</pre>
    <DataTable :titles="script.result.titles" :data="script.result.datas"/>
  </el-card>
</template>

<script lang="ts">
import { SqlUtil } from '@/libs'
import { defineComponent } from 'vue'
import { DataTable } from '@/components'
import { VariableData } from '@/types'

export default defineComponent({
  name: 'QueryCard',
  data () {
    return {
    }
  },
  components: {
    DataTable
  },
  props: {
    variables: {
      type: Array,
      requried: true
    },
    script: {
      type: Object,
      requried: true
    }
  },
  methods: {
    generateBindedSQL (sql: string, variables: VariableData[]) {
      return SqlUtil.generateBindedSQL(sql, variables)
    }
  }
})
</script>

<style scoped>
  .el-card pre {
    margin: 0px 0px 10px 0px;
  }
</style>
