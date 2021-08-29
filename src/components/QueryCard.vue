<template>
  <el-card>
    <template #header>
      <el-checkbox v-model="scriptConfig.enable">{{ scriptConfig.name }}</el-checkbox>
    </template>
    <div>
      <pre>{{ generateBindedSQL(scriptConfig.sql, variables) }}</pre>
      <DataTable
        v-show="scriptConfig.enable"
        :titles="scriptConfig.result.titles"
        :data="scriptConfig.result.datas"/>
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
      scriptConfig: Object.assign({}, this.script)
    }
  },
  components: {
    DataTable
  },
  watch: {
    scriptConfig: {
      handler: function () {
        this.$emit('update:script', this.scriptConfig)
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
