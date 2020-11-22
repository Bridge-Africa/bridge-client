import Vue from 'vue'
import axios from 'axios'
// Element UI
import ElementUI from 'element-ui'
import langEn from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'

import VueI18n from 'vue-i18n'
import {loadLocaleMessages} from '../locales/i18n'

import App from '../App'
import router from '../router'
import store from '../store'
import middlewarePipeline from '../middleware/middleware'
import AuthService from '../../services/auth.service'
import ArticleService from '../../services/article.service'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {longDateFormat, shortDateFormat, formatPhone} from './helpers'

require('dotenv').config()
Vue.prototype.$env = process.env

locale.use(langEn) // Set ELEMENT UI default language
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Helper function attachment
Vue.prototype.$longDate = longDateFormat
Vue.prototype.$shortDate = shortDateFormat
Vue.prototype.$formatPhone = formatPhone

Vue.use(VueI18n) // lang

// Created service instances
Vue.prototype.$authService = new AuthService(axios, store, router)
Vue.prototype.$articleService = new ArticleService(axios, store, router)

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api/'
  : ''
axios.defaults.headers.common['Accept'] = 'application/json'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['Authorization'] = `Bearer ${store.getters['Auth/getToken']}`
  config.headers['Locale'] = `${store.getters['Auth/getLocale']}`
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log('Response success: ', response, response.data, response.data.status)
  if (response.data.status !== 'success' && response.data.status !== 200) {
    // Global error handler
    ElementUI.Notification({
      type: response.data.status,
      title: i18n.t('status.validation'),
      message: response.data.message
    })
  }
  return response
}, function (error) {
  // Do something with response error
  console.log('Response error: ', error.response, error.message, this)
  let callback = err => {
    let promise = Promise.resolve()
    let resp = err.response
    if (error.message === 'Network Error' && !resp) {
      promise = promise.then(Vue.nextTick).then(() => {
        ElementUI.MessageBox({
          title: i18n.t('status.server'),
          message: i18n.t('message.server'),
          showClose: false,
          type: 'warning',
          closeOnPressEscape: false,
          closeOnHashChange: false,
          closeOnClickModal: false,
          confirmButtonClass: 'el-button bg-info',
          confirmButtonText: i18n.t('button.connection'),
          iconClass: 'el-icon-lightning'
        }).then(ok => {
          window.location.reload()
        })
      })
      return false
    } else if (resp && resp.status === 500 && resp.data.message.indexOf('SQLSTATE[HY000] [2002]') !== -1) {
      console.log(resp.data.message)
      promise = promise.then(Vue.nextTick).then(() => {
        ElementUI.MessageBox({
          title: i18n.t('status.database'),
          message: i18n.t('message.database'),
          showClose: false,
          type: 'warning',
          closeOnPressEscape: false,
          closeOnHashChange: false,
          closeOnClickModal: false,
          confirmButtonClass: 'el-button el-button--warning',
          confirmButtonText: i18n.t('button.connection'),
          iconClass: 'mdi mdi-emoticon-neutral text-warning'
        }).then(ok => {
          window.location.reload()
        })
      })
      return false
    } else if (resp.status === 422) {
      let data = resp.data.errors
      for (let ii in data) {
        if (data.hasOwnProperty(ii)) {
          promise = promise.then(Vue.nextTick).then(() => {
            ElementUI.Notification({
              type: 'error',
              title: i18n.t('status.validation'),
              message: data[ii][0]
            })
          })
        }
      }
    } else if (resp.status === 401 && router.currentRoute.name !== 'login') {
      ElementUI.MessageBox.confirm(i18n.t('login.expired.notify'), i18n.t('login.expired.notify_title'), {
        confirmButtonText: i18n.t('button.secure'),
        cancelButtonText: i18n.t('button.cancel'),
        type: 'warning'
      }).then(() => {
        ElementUI.MessageBox.prompt(i18n.t('login.expired.message', [store.getters['Auth/getUser'].username]), i18n.t('login.expired.title'), {
          confirmButtonText: i18n.t('button.secure'),
          cancelButtonText: i18n.t('button.cancel'),
          inputType: 'password'
        }).then(({value}) => {
          Vue.prototype.$authService.login({username: store.getters['Auth/getUser'].username, password: value})
            .then(data => {
              router.go()
            })
            .catch(() => {
              store.dispatch('Auth/setIntended', router.currentRoute.name)
              Vue.prototype.$authService.logout()
            })
        }).catch(() => {
          store.dispatch('Auth/setIntended', router.currentRoute.name)
          Vue.prototype.$authService.logout()
        })
      })
    }
  }
  callback(error)
  return Promise.reject(error)
})
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false
// Logger
// let log = require('electron-log')
// Load middleware
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store,
    router
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

// Load translations
const i18n = new VueI18n({
  locale: store.getters['Auth/getLocale'] || process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

export {
  Vue, axios, App, router, store, i18n
}
