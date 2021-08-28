<template>
  <div>
    <el-input
      size="mini"
      style="width: 300px; padding: 5px;"
      v-for="variable in variables" :key='variable.keyword'
      :type="(variable.type === Number) ? 'number' : 'string'"
      v-model="variable.value">
      <template v-slot:prepend>{{ variable.name }} ({{ variable.keyword }})</template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTable',
  data () {
    return {
      dataVariables: this.count
    }
  },
  props: {
    variables: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
