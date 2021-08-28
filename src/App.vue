<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar
        @onOptionClick="optionClicked"
        @onCreateFolderClick="openCreateFolderModel"
        @onCreateScriptClick="onenCreateScriptModel"
      />
    </el-aside>
    <el-main>
      <div v-for='config in scriptConfigs' :key='config.id'>
        <VariableField v-model:variables="config.variables" />
        <center>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
          >Query</el-button>
        </center>
        <div v-for="script in config.scripts" :key="script.sql">
          <h3>{{ script.name }}</h3>
          <pre>{{ generateBindedSQL(script.sql, config.variables) }}</pre>
          <DataTable :titles="script.titles" :data="script.datas"/>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { SqlUtil } from '@/libs'
import { defineComponent } from 'vue'
import { DataTable, Sidebar, VariableField } from '@/components'
import { ScriptConfig, VariableData } from '@/types'

declare interface BaseComponentData {
  scriptConfigs: ScriptConfig[]
}

export default defineComponent({
  name: 'App',
  data (): BaseComponentData {
    return {
      scriptConfigs: [
        {
          id: 1,
          variables: [
            {
              keyword: '$age',
              name: '年齡',
              type: Number,
              value: null
            },
            {
              keyword: '$name',
              name: '姓名',
              type: String,
              value: null
            }
          ],
          scripts: [
            {
              name: '查詢年齡',
              sql: 'SELECT * FROM Student WHERE age = $age',
              result: {
                titles: [],
                datas: []
              }
            },
            {
              name: '查詢指定名字',
              sql: 'SELECT * FROM Student WHERE name = $name',
              result: {
                titles: [],
                datas: []
              }
            }
          ]
        }
      ]
    }
  },
  components: {
    Sidebar,
    DataTable,
    VariableField
  },
  methods: {
    generateBindedSQL (sql: string, variables: VariableData[]) {
      return SqlUtil.generateBindedSQL(sql, variables)
    },
    optionClicked (key :string, keyPath :string) {
      console.log('parent', key, keyPath)
    },
    openCreateFolderModel () {
      console.log('...')
    },
    onenCreateScriptModel () {
      console.log('...')
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
