import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ace-builds/webpack-resolver'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.mount('#app')
