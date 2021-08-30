<template>
  <div class="floating-buttons">
    <el-button
      :icon="isExpanded ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
      size="mini"
      @click="isExpanded = !isExpanded"
      circle>
    </el-button>
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
