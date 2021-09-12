<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar
        :scriptSets="scriptSets"
        @onScriptSetSelect="onScriptSetSelect"/>
    </el-aside>
    <el-main>
      <ScriptSetPanel
        v-bind:key="scriptSet.id"
        v-for="(scriptSet, index) in createdScriptSets"
        v-show="selectedScriptIndex == index"
        :scriptSet="scriptSet"
        :databaseConfig="databaseConfig"/>
    </el-main>
  </el-container>
  <SettingButton
    @onSettingClick="openSettingDialog"/>
  <SettingDialog
    v-model:visible="settingDialogVisable"
    v-model:databaseConfig="databaseConfig"/>
</template>

<script lang="ts">
import _ from 'lodash'
import { defineComponent } from 'vue'
import { DataStorage } from '@/libs'
import { Sidebar, SettingButton, SettingDialog, ScriptSetPanel } from '@/components'
import { ScriptSet, DatabaseConfig } from '@/types'

declare interface BaseComponentData {
  scriptSets: ScriptSet[],
  settingDialogVisable: boolean,
  databaseConfig: DatabaseConfig,
  isQuerying: boolean,
  createdScriptSets: ScriptSet[],
  selectedScriptIndex: number,
}

export default defineComponent({
  name: 'App',
  data (): BaseComponentData {
    return {
      scriptSets: DataStorage.getScriptSets(),
      databaseConfig: DataStorage.getDatabaseConfig(),
      settingDialogVisable: false,
      isQuerying: false,
      createdScriptSets: [],
      selectedScriptIndex: -1
    }
  },
  components: {
    Sidebar,
    SettingButton,
    SettingDialog,
    ScriptSetPanel
  },
  methods: {
    onScriptSetSelect (scriptSet: ScriptSet) {
      const index = this.createdScriptSets.findIndex((set: ScriptSet) => set.id === scriptSet.id)
      if (index === -1) {
        const newScriptSet = _.cloneDeep(scriptSet)
        this.createdScriptSets.push(newScriptSet)
        this.selectedScriptIndex = this.createdScriptSets.length - 1
      } else {
        this.selectedScriptIndex = index
      }
    },
    openSettingDialog () {
      this.settingDialogVisable = true
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
