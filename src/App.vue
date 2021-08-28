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
        <p style="text-align:center;">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar, VariableField, QueryCard } from '@/components'
import { ScriptConfig } from '@/types'

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
    QueryCard,
    Sidebar,
    VariableField
  },
  methods: {
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
