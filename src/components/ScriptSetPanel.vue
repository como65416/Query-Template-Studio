<template>
  <div>
    <VariableField v-model:variables="scriptSetData.variables" />
    <p style="text-align:center;">
      <el-button
        type="success"
        size="mini"
        icon="el-icon-search"
        :loading="isQuerying"
        @click="querySQLs"
      >Query</el-button>
    </p>
    <QueryCard
      v-for="(script, i) in scriptSetData.scripts"
      v-model:script="scriptSetData.scripts[i]"
      :variables="scriptSetData.variables"
      :key="script.sql"/>
  </div>
</template>

<script lang="ts">
import mysql from 'mysql2/promise'
import { ElMessage } from 'element-plus'
import { SqlUtil } from '@/libs'
import { defineComponent, PropType } from 'vue'
import { VariableField, QueryCard } from '@/components'
import { VariableData, ScriptSet, DatabaseConfig } from '@/types'

declare interface BaseComponentData {
  isQuerying: boolean,
  scriptSetData?: ScriptSet
}

export default defineComponent({
  name: 'ScriptSetPanel',
  data (): BaseComponentData {
    return {
      isQuerying: false,
      scriptSetData: Object.assign({}, this.scriptSet)
    }
  },
  components: {
    VariableField,
    QueryCard
  },
  watch: {
    scriptSet: function () {
      this.scriptSetData = this.scriptSet
    }
  },
  props: {
    scriptSet: {
      type: Object as PropType<ScriptSet>,
      requried: true
    },
    databaseConfig: {
      type: Object as PropType<DatabaseConfig>,
      required: true
    }
  },
  methods: {
    async querySQLs () {
      if (this.scriptSetData === undefined) {
        return
      }

      this.isQuerying = true
      let conn
      try {
        conn = await mysql.createConnection({
          host: this.databaseConfig.host,
          user: this.databaseConfig.username,
          password: this.databaseConfig.password,
          database: this.databaseConfig.database,
          port: this.databaseConfig.port,
          dateStrings: true
        })

        for (const script of this.scriptSetData.scripts) {
          script.result.titles = []
          script.result.datas = []
          if (!script.enable) {
            continue
          }

          const sql = SqlUtil.generateBindedSQL(script.sql, this.scriptSetData.variables)
          const [rows] = await conn.execute(sql)

          interface RowData {
            [key: string]: number | string | null
          }
          const datas: RowData[] = Object.values(JSON.parse(JSON.stringify(rows)))

          if (datas.length > 0) {
            script.result.titles = Object.keys(datas[0])
            script.result.datas = datas
          }
        }
      } catch (e) {
        ElMessage.error(e.toString())
      } finally {
        if (conn !== undefined) {
          conn.end()
        }
      }
      this.isQuerying = false
    },
    generateBindedSQL (sql: string, variables: VariableData[]) {
      return SqlUtil.generateBindedSQL(sql, variables)
    }
  }
})
</script>

<style scoped>
</style>
