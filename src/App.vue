<template>
  <el-container style="height: 100%;">
    <el-aside width="240px">
      <Sidebar
        :scriptSets="scriptSets"
        @onScriptSetSelect="onScriptSetSelect"/>
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
import { defineComponent } from 'vue'
import { DataStorage } from '@/libs'
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
    onScriptSetSelect (scriptSet :ScriptSet) {
      this.seletedScriptSet = scriptSet
    },
    openCreateFolderDialog () {
      console.log('...')
    },
    openCreateScriptDialog () {
      console.log('...')
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
