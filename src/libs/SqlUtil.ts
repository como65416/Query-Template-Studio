import { DataType } from '@/enums'
import { VariableData } from '@/types'

class SqlUtil {
  static generateBindedSQL (sql: string, variables: VariableData[]): string {
    for (const v of variables) {
      if (v.value === null || v.value === undefined) {
        continue
      }

      switch (v.type.toLowerCase()) {
        case DataType.Number:
          sql = sql.replace(v.keyword, String(v.value))
          break
        case DataType.String:
          sql = sql.replace(v.keyword, JSON.stringify(v.value))
          break
      }
    }

    return sql
  }
}

export default SqlUtil
