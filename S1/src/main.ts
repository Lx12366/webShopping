import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import { router } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia";
import "nprogress/nprogress.css";
//loading 全局加载时的进度条
import "./permission";
//全局路由钩子

import mitt from 'mitt'
//Bus库传参

import directive from "~/directive/index";

const app = createApp(App)
const pinia = createPinia()
const Mit = mitt()


declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

app.config.globalProperties.$Bus = Mit

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



app.use(router)
app.use(pinia)

app.use(directive)

app.mount('#app')

