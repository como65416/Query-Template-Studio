<template>
  <div class="floating-buttons">
    <el-button
      :icon="isExpanded ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
      size="mini"
      @click="isExpanded = !isExpanded"
      circle>
    </el-button>

    <!--
    <el-button
      v-show="isExpanded"
      type="success"
      icon="el-icon-folder-add"
      size="medium"
      @click="handleCreateFolderClick"
      circle>
    </el-button>
    <el-button
      v-show="isExpanded"
      type="primary"
      icon="el-icon-document-add"
      size="medium"
      @click="handleCreateScriptClick"
      circle>
    </el-button>
    -->
    <el-button
      v-show="isExpanded"
      type="warning"
      icon="el-icon-setting"
      size="medium"
      @click="handleSettingClick"
      circle>
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingButton',
  data () {
    return {
      isExpanded: false
    }
  },
  props: {
  },
  methods: {
    handleCreateFolderClick () {
      this.$emit('onCreateFolderClick')
    },
    handleCreateScriptClick () {
      this.$emit('onCreateScriptClick')
    },
    handleSettingClick () {
      this.$emit('onSettingClick')
    }
  }
})
</script>

<style scoped>
  .floating-buttons {
    position: fixed;
    left: 10px;
    bottom: 10px;
  }
</style>
