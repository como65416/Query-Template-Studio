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

  static saveScriptSets (scriptSets: ScriptSet[]): void {
    const defaultSavePath = this.getDefaultSavePath()
    const content = JSON.stringify(scriptSets, null, 4)
    fs.writeFileSync(defaultSavePath, content)
  }

  static getScriptSets (): ScriptSet[] {
    // Check home path
    const defaultSavePath = this.getDefaultSavePath()
    if (fs.existsSync(defaultSavePath)) {
      const content = fs.readFileSync(defaultSavePath)
      const config = JSON.parse(String(content))
      return config
    }

    // If home path no config file, read example file
    const staticPath = __static
    const filename = '.query-template-studio.scripts-example.json'
    const fullpath = path.join(staticPath, 'statics', filename)
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

  static getDefaultSavePath (): string {
    const homePath = os.homedir()
    const filename = '.query-template-studio.scripts.json'
    const fullpath = path.join(homePath, filename)

    return fullpath
  }
}

export default DataStorage
