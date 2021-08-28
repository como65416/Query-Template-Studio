import { VariableData } from '@/types'

class SqlUtil {
  static generateBindedSQL (sql: string, variables: VariableData[]): string {
    for (const v of variables) {
      if (v.value === null) {
        continue
      }

      if (v.type === Number) {
        sql = sql.replace(v.keyword, v.value)
      } else if (v.type === String) {
        sql = sql.replace(v.keyword, JSON.stringify(v.value))
      }
    }

    return sql
  }
}

export default SqlUtil
