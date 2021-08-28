import { VariableData, ScriptData } from '@/types/index'

declare interface ScriptSet {
  id: number
  variables: VariableData[],
  scripts: ScriptData[],
}

export default ScriptSet
