<template>
  <div style="height: 100%;">
    <el-menu
      :uniqueOpened="true"
      style="height: 100%;"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-folder"></i>
          <span>查詢會員資料</span>
        </template>
        <el-menu-item index="1-3">選項 1</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
  },
  methods: {
    handleSelect (key :string, keyPath :string) {
      this.$emit('onOptionClick', key, keyPath)
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
