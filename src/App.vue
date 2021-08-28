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
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
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
