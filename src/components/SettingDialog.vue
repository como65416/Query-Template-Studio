<template>
  <el-dialog title="Setting" v-model="dialogVisible">
    <el-form label-width="80px">
      <el-form-item label="Host">
        <el-input v-model="dbConfig.host"></el-input>
      </el-form-item>
      <el-form-item label="Username">
        <el-input v-model="dbConfig.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="dbConfig.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Port">
        <el-input v-model="dbConfig.port"></el-input>
      </el-form-item>
      <el-form-item label="Database">
        <el-input v-model="dbConfig.database"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="saveSetting">Save</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { DatabaseConfig } from '@/types'

declare interface BaseComponentData {
  dialogVisible: boolean,
  dbConfig: DatabaseConfig
}

export default defineComponent({
  name: 'SettingDialog',
  emits: ['update:visible', 'onSettingUpdated'],
  data (): BaseComponentData {
    return {
      dialogVisible: this.visible,
      dbConfig: Object.assign({}, this.databaseConfig)
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    databaseConfig: {
      type: Object as PropType<DatabaseConfig>,
      required: true
    }
  },
  watch: {
    visible () {
      this.dialogVisible = this.visible
      this.dbConfig = Object.assign({}, this.databaseConfig)
    },
    dialogVisible (value) {
      this.$emit('update:visible', value)
    }
  },
  methods: {
    saveSetting () {
      this.$emit('onSettingUpdated', this.dbConfig)
      this.dialogVisible = false
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
