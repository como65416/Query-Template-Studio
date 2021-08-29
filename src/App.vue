<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar @onOptionClick="optionClicked"/>
    </el-aside>
    <el-main>
      <div v-for='config in scriptConfigs' :key='config.id'>
        <VariableField v-model:variables="config.variables" />
        <p style="text-align:center;">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click="querySQLs"
          >Query</el-button>
        </p>
        <QueryCard
          v-for="script in config.scripts"
          :script="script"
          :variables="config.variables"
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
  scriptConfigs: ScriptConfig[],
  settingDialogVisable: boolean,
  databaseConfig: DatabaseConfig,
}

export default defineComponent({
  name: 'App',
  data (): BaseComponentData {
    return {
      scriptConfigs: DataStorage.getScriptConfigs(),
      databaseConfig: DataStorage.getDatabaseConfig(),
      settingDialogVisable: false
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
      let conn
      try {
        conn = await mysql.createConnection({
          host: this.databaseConfig.host,
          user: this.databaseConfig.username,
          password: this.databaseConfig.password,
          database: this.databaseConfig.database,
          port: this.databaseConfig.port
        })

        const config = this.scriptConfigs[0]
        for (const script of config.scripts) {
          const sql = SqlUtil.generateBindedSQL(script.sql, config.variables)
          const [rows] = await conn.execute(sql)

          interface RowData {
            [key: string]: any
          }
          const datas: RowData[] = Object.values(JSON.parse(JSON.stringify(rows)))

          script.result.titles = []
          script.result.datas = []
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
