<template>
  <el-card :body-style="{ padding: '12px 20px' }">
    <el-checkbox v-model="scriptData.enable">{{ scriptData.name }}</el-checkbox>
    <el-popover
      placement="bottom"
      title="SQL"
      :width="600"
      trigger="hover"
    >
      <pre class="reandered-sql-preview">{{ renderedSql }}</pre>
      <template #reference>
        <img src="static://statics/icons/db_mysql_server.svg" class="show-script-icon" @click="copyToClipboard"/>
      </template>
    </el-popover>
    <div v-show="scriptData.enable">
      <DataTable
        :titles="scriptData.result.titles"
        :datas="scriptData.result.datas"/>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Clipboard, SqlUtil } from '@/libs'
import { defineComponent, PropType } from 'vue'
import { DataTable } from '@/components'
import { VariableData, ScriptData } from '@/types'

export default defineComponent({
  name: 'QueryCard',
  data () {
    return {
      scriptData: Object.assign({}, this.script)
    }
  },
  components: {
    DataTable
  },
  watch: {
    scriptData: {
      handler: function () {
        this.$emit('update:script', this.scriptData)
      },
      deep: true
    }
  },
  computed: {
    renderedSql: function (): string {
      if (this.script == null || this.variables == null) {
        return ''
      }
      return SqlUtil.generateBindedSQL(this.scriptData.sql, this.variables)
    }
  },
  props: {
    variables: {
      type: Array as PropType<VariableData[]>,
      requried: true
    },
    script: {
      type: Object as PropType<ScriptData>,
      requried: true
    }
  },
  methods: {
    copyToClipboard () {
      Clipboard.copyToClipboard(this.renderedSql)
    }
  }
})
</script>

<style>
  .el-card pre {
    margin: 0px 0px 10px 0px;
  }

  .show-script-icon {
    width: 24px;
    vertical-align: middle;
    padding: 0px 8px;
  }

  .reandered-sql-preview {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
