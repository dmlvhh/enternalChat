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
import request from './request'
import message from '@/utils/message'
import api from '@/utils/api'


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.Verify = verify;
app.config.globalProperties.Request = request;
app.config.globalProperties.Message = message;
app.config.globalProperties.Api = api;