import QueryResult from './QueryResult'

declare interface ScriptData {
  name: string,
  sql: string,
  result: QueryResult,
}

export default ScriptData
