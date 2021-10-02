import { createStore, Store } from 'vuex'
import RootState from './RootState'
import { SET_ENVIRONMENT } from './mutation-types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

export default createStore<RootState>({
  state: {
    environment: {
      databaseConfig: {
        host: '',
        username: '',
        password: '',
        port: 0,
        database: ''
      }
    }
  },
  mutations: {
    [SET_ENVIRONMENT]: function (state, { databaseConfig }) {
      state.environment.databaseConfig = databaseConfig
    }
  },
  actions: {
  },
  modules: {
  }
})
