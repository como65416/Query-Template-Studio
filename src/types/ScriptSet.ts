import { VariableData, ScriptData } from '@/types/index'

declare interface ScriptSet {
  id: string
  name: string
  variables: VariableData[],
  scripts: ScriptData[],
}

export default ScriptSet
