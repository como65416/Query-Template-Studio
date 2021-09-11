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
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  watch: {
    titles () {
      this.updateColumnDef()
      this.columnApi!.autoSizeAllColumns()
    },
    datas () {
      this.updateRenderDatas()
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
    },
    updateColumnDef () {
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
    },
    updateRenderDatas () {
      const renderDatas: any[] = []
      for (const data of this.datas) {
        const row: any = {}
        for (const key in data) {
          row[key] = (data[key] instanceof Object) ? JSON.stringify(data[key]) : data[key]
        }
        renderDatas.push(row)
      }
      this.agGridAPI!.setRowData(renderDatas)
    }
  }
})
</script>

<style scoped>
</style>
