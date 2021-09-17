<template>
  <div ref="code-editor" :style="{width: width, height: height}">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as ace from 'ace-builds'

declare interface BaseComponentData {
  editor?: ace.Ace.Editor,
}

export default defineComponent({
  name: 'CodeTextArea',
  data (): BaseComponentData {
    return {
    }
  },
  components: {
  },
  watch: {
    content () {
      if (this.content !== this.editor?.getValue()) {
        this.editor!.setValue(this.content)
      }
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    content: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'ace/mode/text'
    }
  },
  methods: {
  },
  mounted () {
    const element: Element = this.$refs['code-editor'] as Element
    const editor = ace.edit(element)
    editor.setValue(this.content)
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode(this.mode)
    editor.on('change', () => {
      this.$emit('update:content', this.editor?.getValue())
    })

    this.editor = editor
  }
})
</script>

<style scoped>
</style>
