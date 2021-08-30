<template>
  <div style="height: 100%;">
    <el-menu
      :uniqueOpened="true"
      style="height: 100%;"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="set.id" v-for="set in scriptSets" :key="set.id">
        <i class="el-icon-folder"></i>
        <template #title>{{ set.name }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ScriptSet } from '@/types'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
    scriptSets: {
      type: Object as PropType<ScriptSet[]>,
      required: true
    }
  },
  methods: {
    handleSelect (key :string) {
      this.$emit('onScriptSetSelect', this.scriptSets.find(s => s.id === key))
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
