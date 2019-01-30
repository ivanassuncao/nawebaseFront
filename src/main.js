import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'
import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import store from './config/store'
import router from './config/router'
const moment = require('moment')

moment.locale('pt-br')

Vue.config.productionTip = false

//Temporario

//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikl2YW4gSC4gQXNzdW5jYW8iLCJlbWFpbCI6Iml2YW5hc3N1bmNhb0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQwMzk1NjczLCJleHAiOjE1NDA2NTQ4NzN9.YPjdgSWj_f1e6ZJ4HGwkR85qDHRR1bItmczhML1w-Bg'


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')