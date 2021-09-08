<template>
  <el-card :body-style="{ padding: '12px 20px' }">
      <el-checkbox v-model="scriptSet.enable">{{ scriptSet.name }}</el-checkbox>
      <div v-show="scriptSet.enable">
        <pre>{{ generateBindedSQL(scriptSet.sql, variables) }}</pre>
        <DataTable
          :titles="scriptSet.result.titles"
          :datas="scriptSet.result.datas"/>
      </div>
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
      scriptSet: Object.assign({}, this.script)
    }
  },
  components: {
    DataTable
  },
  watch: {
    scriptSet: {
      handler: function () {
        this.$emit('update:script', this.scriptSet)
      },
      deep: true
    }
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

<style>
  .el-card pre {
    margin: 0px 0px 10px 0px;
  }
</style>
