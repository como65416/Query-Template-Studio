import { DatabaseConfig, ScriptSet } from '@/types'
import store from 'store'
import os from 'os'
import fs from 'fs'
import path from 'path'

const databaseConfigKey = 'database-config'

declare const __static: string

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

  static getScriptSets (): ScriptSet[] {
    // Check home path
    const homePath = os.homedir()
    let filename = '.quick-query-tool.json'
    let fullpath = path.join(homePath, filename)
    if (fs.existsSync(fullpath)) {
      const content = fs.readFileSync(fullpath)
      const config = JSON.parse(String(content))
      return config
    }

    // If home path no config file, read example file
    const staticPath = __static
    filename = '.quick-query-tool.example.json'
    fullpath = path.join(staticPath, 'statics', filename)
    const content = fs.readFileSync(fullpath)
    const scriptSets: ScriptSet[] = JSON.parse(String(content))
    for (const scriptSet of scriptSets) {
      for (const index in scriptSet.scripts) {
        scriptSet.scripts[index].result = {
          titles: [],
          datas: []
        }
      }
    }

    return scriptSets
  }
}

export default DataStorage
