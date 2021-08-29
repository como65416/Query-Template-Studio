import { DatabaseConfig, ScriptConfig } from '@/types'
import store from 'store'
import os from 'os'
import fs from 'fs'
import path from 'path'

const databaseConfigKey = 'database-config'

class DataStorage {
  static getDatabaseConfig (): DatabaseConfig {
    const defaultConfig = {
      host: 'localhost',
      username: 'username',
      password: 'password',
      port: 3306,
      database: 'database'
    }

    return store.get(databaseConfigKey) ?? defaultConfig
  }

  static saveDatabaseConfig (config: DatabaseConfig): void {
    store.set(databaseConfigKey, config)
  }

  static getScriptConfig (): ScriptConfig {
    const homePath = os.homedir()
    const filename = '.quick-query-tool.json'
    const fullpath = path.join(homePath, filename)
    if (fs.existsSync(fullpath)) {
      const content = fs.readFileSync(fullpath)
      const config = JSON.parse(String(content))
      return config
    }

    return {
      id: 1,
      variables: [
        {
          keyword: '$age',
          name: '年齡',
          type: 'Number',
          value: 20
        },
        {
          keyword: '$name',
          name: '姓名',
          type: 'String',
          value: 'Bob.'
        }
      ],
      scripts: [
        {
          name: '查詢年齡',
          sql: 'SELECT * FROM students WHERE age = $age',
          result: {
            titles: [],
            datas: []
          },
          enable: true
        },
        {
          name: '查詢指定名字',
          sql: 'SELECT * FROM students WHERE name = $name',
          result: {
            titles: [],
            datas: []
          },
          enable: false
        }
      ]
    }
  }
}

export default DataStorage
