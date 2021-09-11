<template>
  <div>
    <ag-grid-vue style="width: 100%;"
      class="ag-theme-balham"
      @grid-ready="onGridReady"
      :gridOptions="{
        domLayout: 'autoHeight',
        rowHeight: 26,
        headerHeight: 26,
      }"
      rowSelection="multiple">
    </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { AgGridEvent, GridApi, ColumnApi, ColDef, ColGroupDef, CellClassParams } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { defineComponent, PropType } from 'vue'

declare interface BaseComponentData {
  agGridAPI?: GridApi
  columnApi?: ColumnApi
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
      const columnDefs: Array<ColGroupDef | ColDef> = this.titles
        .map((title: string) => ({
          field: title,
          editable: true,
          resizable: true,
          maxWidth: 150,
          cellStyle: (params: CellClassParams) => {
            if (params.value === null) {
              return { backgroundColor: '#dadee6' }
            }
            return {}
          }
        }))
      this.agGridAPI!.setColumnDefs(columnDefs)
      this.columnApi!.autoSizeAllColumns()
    },
    datas () {
      this.agGridAPI!.setRowData(this.datas)
      this.columnApi!.autoSizeAllColumns()
    }
  },
  components: {
    AgGridVue
  },
  methods: {
    onGridReady (params: AgGridEvent) {
      this.columnApi = params.columnApi
      this.agGridAPI = params.api
      params.api.setColumnDefs([])
      params.api.setRowData([])
    }
  }
})
</script>

<style scoped>
</style>
