<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar @onOptionClick="optionClicked"/>
    </el-aside>
    <el-main>
      <div>
        <VariableField v-model:variables="scriptConfig.variables" />
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
          v-for="(script, i) in scriptConfig.scripts"
          v-model:script="scriptConfig.scripts[i]"
          :variables="scriptConfig.variables"
          :key="script.sql"/>
      </div>
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
import { Sidebar, VariableField, QueryCard, SettingButton, SettingDialog } from '@/components'
import { ScriptConfig, DatabaseConfig } from '@/types'

declare interface BaseComponentData {
  scriptConfig: ScriptConfig,
  settingDialogVisable: boolean,
  databaseConfig: DatabaseConfig,
  isQuerying: boolean
}

export default defineComponent({
  name: 'App',
  data (): BaseComponentData {
    return {
      scriptConfig: DataStorage.getScriptConfig(),
      databaseConfig: DataStorage.getDatabaseConfig(),
      settingDialogVisable: false,
      isQuerying: false
    }
  },
  components: {
    QueryCard,
    Sidebar,
    VariableField,
    SettingButton,
    SettingDialog
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

        for (const script of this.scriptConfig.scripts) {
          script.result.titles = []
          script.result.datas = []
          if (!script.enable) {
            continue
          }

          const sql = SqlUtil.generateBindedSQL(script.sql, this.scriptConfig.variables)
          const [rows] = await conn.execute(sql)

          interface RowData {
            [key: string]: any
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
