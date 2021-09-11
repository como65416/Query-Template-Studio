<template>
  <div>
    <ag-grid-vue style="width: 100%;"
      class="ag-theme-balham"
      @grid-ready="onGridReady"
      :gridOptions="{
        domLayout: 'autoHeight',
        rowHeight: 26,
        headerHeight: 26,
        suppressSizeToFit: true
      }"
      rowSelection="multiple">
    </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { AgGridEvent, GridApi } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { defineComponent, PropType } from 'vue'

declare interface BaseComponentData {
  agGridAPI?: GridApi
}

export default defineComponent({
  name: 'DataTable',
  data (): BaseComponentData {
    return {
    }
  },
  props: {
    titles: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    datas: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    titles () {
      const columnDefs = this.titles.map((title: string) => ({ field: title, editable: true, resizable: true }))
      this.agGridAPI!.setColumnDefs(columnDefs)
      this.agGridAPI!.sizeColumnsToFit()
    },
    datas () {
      this.agGridAPI!.setRowData(this.datas)
      this.agGridAPI!.sizeColumnsToFit()
    }
  },
  components: {
    AgGridVue
  },
  methods: {
    onGridReady (params: AgGridEvent) {
      this.agGridAPI = params.api
      params.api.setColumnDefs([])
      params.api.setRowData([])
    }
  }
})
</script>

<style scoped>
</style>
