<template>
  <el-card>
    <template #header>
      <el-checkbox v-model="scriptSet.enable">{{ scriptSet.name }}</el-checkbox>
    </template>
    <div>
      <pre>{{ generateBindedSQL(scriptSet.sql, variables) }}</pre>
      <DataTable
        v-show="scriptSet.enable"
        :titles="scriptSet.result.titles"
        :data="scriptSet.result.datas"/>
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

<style scoped>
  .el-card pre {
    margin: 0px 0px 10px 0px;
  }
</style>
