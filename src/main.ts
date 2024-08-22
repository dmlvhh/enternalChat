import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import "@/assets/cust-elementplus.scss"
import "@/assets/icon/iconfont.css"
import "@/assets/base.scss"
import router from "@/router"
import utils from '@/utils/utils';
import verify from '@/utils/verify';
import Request from './request'
import message from '@/utils/message'
import api from '@/utils/api'
import * as Pinia from "pinia"
import Blank from "@/components/Blank.vue"
import Layout from "@/components/Layout.vue"
import WinOp from "@/components/WinOp.vue"

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(Pinia.createPinia())
app.mount('#app')

app.component("WinOp",WinOp)
app.component("Layout",Layout)
app.component("Blank",Blank)

app.config.globalProperties.Verify = verify;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = message;
app.config.globalProperties.Utils = utils;
app.config.globalProperties.Api = api;