<template>
  <div>
    <!-- Main Dialog -->
    <el-dialog title="Edit Script Set" v-model="dialogVisible">
      <div class='main-dialog'>
        <div class="select-set-card">
          Script Set :
          <el-select v-model="selectedScriptSetIndex" size="medium" placeholder="-">
            <el-option
              v-for="(scriptSet, key) in editingScriptSets"
              :label="scriptSet.name"
              :value="key"
              :id="scriptSet.id"
              :key="scriptSet.id"
            ></el-option>
          </el-select>
          <el-button
            class="set-btn"
            size="mini"
            type="success"
            icon="el-icon-plus"
            @click="openAddScriptSetDialog"
            circle>
          </el-button>
          <el-button
            class="set-btn"
            size="mini"
            type="danger"
            icon="el-icon-minus"
            @click="removeScriptSet"
            circle>
          </el-button>
        </div>
        <div class="variables-card">
          Variable :
          <el-tag size="small"
            v-for="variable in editingScriptSets[selectedScriptSetIndex].variables"
            :key="variable.keyword"
            class="variable-tag"
            @close="deleteVariable(variable)"
            closable>
            {{ variable.name }} ({{ variable.keyword }})
          </el-tag>
          <el-button class="button-new-variable" size="mini" @click="openAddVariableDialog">+</el-button>
        </div>
        <el-tabs
          type="border-card"
          @tab-click="tabsClick"
          @tab-remove="removeScript">
          <el-tab-pane
            v-for="script in editingScriptSets[selectedScriptSetIndex].scripts"
            :label="script.name"
            :name="script.name"
            closable
            :key="script.name">
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span><i class="el-icon-plus"></i></span>
            </template>
          </el-tab-pane>
          <CodeTextArea
            height="200px"
            mode="ace/mode/sql"
            v-if="selectedScriptSqlIndex >= 0"
            v-model:content="editingScriptSets[selectedScriptSetIndex].scripts[selectedScriptSqlIndex].sql
            "/>
        </el-tabs>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveConfig">Save</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Add New Script Set Dialog -->
    <el-dialog title="Add New Script Set" width="40%" v-model="addScriptSetVisible" append-to-body>
      <el-input placeholder="Name" v-model="newScriptSetName">
        <template #prepend>Name : </template>
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="createNewScriptSet">Save</el-button>
          <el-button @click="addScriptSetVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Add New Script Dialog -->
    <el-dialog title="Add New Script" width="40%" v-model="addScriptVisible" append-to-body>
      <el-input placeholder="Name" v-model="newScriptName">
        <template #prepend>Name : </template>
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="createNewScript">Save</el-button>
          <el-button @click="addScriptVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Add New Variable Dialog -->
    <el-dialog title="Add New Variable" width="40%" v-model="addVariableVisible" append-to-body>
      <el-form label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="newVariableName"></el-input>
        </el-form-item>
        <el-form-item label="Keyword">
          <el-input v-model="newVariableKeyword"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="newVariableType">
            <el-option v-for="option in typeOptions"
              :label="option.label"
              :value="option.type"
              v-bind:key="option.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="createNewVariable">Save</el-button>
          <el-button @click="addVariableVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { uuid } from 'uuidv4'
import { PropType, defineComponent } from 'vue'
import { CodeTextArea } from '@/components'
import { ScriptData, ScriptSet, VariableData } from '@/types'
import { DataType } from '@/enums'

declare interface TypeOption {
  label: string,
  type: DataType,
}

declare interface BaseComponentData {
  editingScriptSets: ScriptSet[],
  selectedScriptSetIndex: number,
  selectedScriptSqlIndex: number,
  // Dialog Status
  dialogVisible: boolean,
  addScriptVisible: boolean,
  addScriptSetVisible: boolean,
  addVariableVisible: boolean,
  // Input data
  newScriptName: string,
  newScriptSetName: string,
  newVariableName: string,
  newVariableKeyword: string,
  newVariableType: DataType,
  // UI Data
  typeOptions: TypeOption[],
}

export default defineComponent({
  name: 'EditorDialog',
  data (): BaseComponentData {
    return {
      editingScriptSets: this.scriptSets,
      selectedScriptSetIndex: 0,
      selectedScriptSqlIndex: 0,
      // Dialog Status
      dialogVisible: false,
      addScriptVisible: false,
      addScriptSetVisible: false,
      addVariableVisible: false,
      // Input data
      newScriptName: '',
      newScriptSetName: '',
      newVariableName: '',
      newVariableKeyword: '',
      newVariableType: DataType.String,
      // UI Data
      typeOptions: [
        {
          label: 'String',
          type: DataType.String
        },
        {
          label: 'Number',
          type: DataType.Number
        }
      ]
    }
  },
  components: {
    CodeTextArea
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    scriptSets: {
      type: Array as PropType<ScriptSet[]>,
      required: true
    }
  },
  emits: ['update:visible', 'scriptSetsUpdated'],
  watch: {
    visible () {
      this.dialogVisible = this.visible
      this.editingScriptSets = _.cloneDeep(this.scriptSets)
      this.selectedScriptSetIndex = 0
      this.selectedScriptSqlIndex = 0
    },
    dialogVisible (value) {
      this.$emit('update:visible', value)
    },
    selectedScriptSetIndex () {
      this.selectedScriptSqlIndex = -1
      if (this.editingScriptSets[this.selectedScriptSetIndex].scripts.length > 0) {
        this.selectedScriptSqlIndex = 0
      }
    }
  },
  methods: {
    openAddScriptSetDialog () {
      this.newScriptSetName = ''
      this.addScriptSetVisible = true
    },
    openAddScriptDialog () {
      this.addScriptVisible = true
      this.newScriptName = ''
      this.selectedScriptSqlIndex = -1
    },
    openAddVariableDialog () {
      this.addVariableVisible = true
    },
    saveConfig () {
      this.$emit('scriptSetsUpdated', this.editingScriptSets)
      this.dialogVisible = false
    },
    tabsClick (tab: any) {
      if (tab.index >= this.editingScriptSets[this.selectedScriptSetIndex].scripts.length) {
        this.openAddScriptDialog()
        return
      }

      this.selectedScriptSqlIndex = tab.index
    },
    deleteVariable (t: any) {
      if (confirm('Are you sure you want to delete this varaible?')) {
        const index = this.editingScriptSets[this.selectedScriptSetIndex]
          .variables
          .findIndex(v => v.name === t.name && v.keyword === t.keyword)
        if (index >= 0) {
          this.editingScriptSets[this.selectedScriptSetIndex].variables.splice(index, 1)
        }
      }
    },
    createNewScriptSet () {
      this.editingScriptSets.push({
        id: uuid(),
        name: this.newScriptSetName,
        variables: [],
        scripts: []
      } as ScriptSet)
      this.selectedScriptSetIndex = this.editingScriptSets.length - 1
      this.addScriptSetVisible = false
    },
    createNewScript () {
      this.editingScriptSets[this.selectedScriptSetIndex].scripts.push({
        name: this.newScriptName,
        sql: '',
        result: {},
        enable: false
      } as ScriptData)
      this.selectedScriptSqlIndex = this.editingScriptSets[this.selectedScriptSetIndex].scripts.length - 1
      this.addScriptVisible = false
    },
    createNewVariable () {
      this.editingScriptSets[this.selectedScriptSetIndex].variables.push({
        keyword: this.newVariableKeyword,
        name: this.newVariableName,
        type: this.newVariableType
      } as VariableData)
      this.addVariableVisible = false
    },
    removeScriptSet () {
      const set = this.editingScriptSets[this.selectedScriptSetIndex]
      if (confirm('Are you sure delete script set `' + set.name + '` ?')) {
        this.editingScriptSets.splice(this.selectedScriptSetIndex, 1)
        this.selectedScriptSetIndex = 0
      }
    },
    removeScript (name: string) {
      const index = this.editingScriptSets[this.selectedScriptSetIndex].scripts.findIndex(s => s.name === name)
      const script = this.editingScriptSets[this.selectedScriptSetIndex].scripts[index]
      if (confirm('Are you sure delete script `' + script.name + '` script set?')) {
        this.editingScriptSets[this.selectedScriptSetIndex].scripts.splice(index, 1)
        this.selectedScriptSqlIndex = -1
      }
    }
  }
})
</script>

<style scoped>
  .main-dialog {
    margin: 5px;
  }

  .select-set-card {
    padding: 5px;
  }

  .variables-card {
    padding: 5px;
  }

  .variable-tag  {
    margin: 4px;
  }

  .button-new-variable {
    padding: 3px 7px;
    min-height: 18px;
  }

  .set-btn, .set-btn {
    margin: 0px 0px 0px 5px;
  }
</style>
