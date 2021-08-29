import QueryResult from './QueryResult'

declare interface ScriptData {
  name: string,
  sql: string,
  result: QueryResult,
  enable: boolean
}

export default ScriptData
