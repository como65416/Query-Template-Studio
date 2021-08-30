<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar @onOptionClick="optionClicked"/>
    </el-aside>
    <el-main>
      <ScriptSetPanel
        :scriptSet="seletedScriptSet"
        :databaseConfig="databaseConfig"/>
    </el-main>
  </el-container>
  <SettingButton
    @onCreateFolderClick="openCreateFolderDialog"
    @onCreateScriptClick="openCreateScriptDialog"
    @onSettingClick="openSettingDialog"/>
  <SettingDialog
    v-model:visible="settingDialogVisable"
    v-model:databaseConfig="databaseConfig"/>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import mysql from 'mysql2/promise'
import { defineComponent } from 'vue'
import { DataStorage, SqlUtil } from '@/libs'
import { Sidebar, SettingButton, SettingDialog, ScriptSetPanel } from '@/components'
import { ScriptSet, DatabaseConfig } from '@/types'

declare interface BaseComponentData {
  scriptSets: ScriptSet[],
  settingDialogVisable: boolean,
  databaseConfig: DatabaseConfig,
  isQuerying: boolean,
  seletedScriptSet: ScriptSet
}

export default defineComponent({
  name: 'App',
  data (): BaseComponentData {
    const sets = DataStorage.getScriptSets()
    return {
      scriptSets: DataStorage.getScriptSets(),
      databaseConfig: DataStorage.getDatabaseConfig(),
      settingDialogVisable: false,
      isQuerying: false,
      seletedScriptSet: sets[0]
    }
  },
  components: {
    Sidebar,
    SettingButton,
    SettingDialog,
    ScriptSetPanel
  },
  methods: {
    optionClicked (key :string, keyPath :string) {
      console.log('parent', key, keyPath)
    },
    openCreateFolderDialog () {
      console.log('...')
    },
    openCreateScriptDialog () {
      console.log('...')
    },
    openSettingDialog () {
      this.settingDialogVisable = true
    },
    async querySQLs () {
      this.isQuerying = true
      let conn
      try {
        conn = await mysql.createConnection({
          host: this.databaseConfig.host,
          user: this.databaseConfig.username,
          password: this.databaseConfig.password,
          database: this.databaseConfig.database,
          port: this.databaseConfig.port
        })

        for (const script of this.seletedScriptSet.scripts) {
          script.result.titles = []
          script.result.datas = []
          if (!script.enable) {
            continue
          }

          const sql = SqlUtil.generateBindedSQL(script.sql, this.seletedScriptSet.variables)
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
    }
  },
  watch: {
    databaseConfig () {
      DataStorage.saveDatabaseConfig(this.databaseConfig)
    }
  }
})
</script>

<style>
  html, body, #app {
    margin: 0;
    height: 100%;
  }
</style>
