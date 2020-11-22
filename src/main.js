// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {Vue, store, router, App, i18n} from './packages/modules'
import moment from 'moment'

Vue.config.productionTip = false

Vue.mixin({
  data: () => ({
    notifyPromise: Promise.resolve(),
    pageLoading: false,
    pageLoader: null
  }),
  watch: {
    pageLoading (val) {
      if (val) {
        this.pageLoader = this.$loading({
          lock: true,
          text: this.$t('message.loading'),
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else {
        this.pageLoader.close()
      }
    }
  },
  methods: {
    setLanguage (lang) {
      this.$i18n.locale = lang
      store.dispatch('Auth/changeLocale', lang)
      if (store.getters['Auth/loggedIn']) {
        this.$authService.changeLanguage(lang)
      }
    },
    notify (msg, title = 'Success', type = 'success', dur = 3000) {
      this.notifyPromise.then(this.$nextTick).then(() => {
        this.$notify({
          title: title,
          message: msg,
          duration: dur,
          type
        })
      })
    },
    formatPrice (value, currency = 'XAF') {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat(` ${currency}`)
    },
    shortDate (value) {
      return moment(value).format('MMM Do YY')
    },
    displayMessage (message, cbOK = () => {
    }, type = 'success', title = '') {
      this.$confirm(message, (title || this.$t('status.message')), {
        confirmButtonText: this.$t('button.close'),
        showCancelButton: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        confirmButtonClass: `el-button--${type === 'error' ? 'danger' : 'primary'}`,
        dangerouslyUseHTMLString: true,
        type: type
      }).then(cbOK)
    },
    askQuestion (question, cbOK = () => {
    }, title = 'Question', cbCancel = () => {
    }, type = 'question', config) {
      if (question) {
        this.$confirm(question, title, {
          confirmButtonText: this.$t('button.continue'),
          cancelButtonText: this.$t('button.cancel'),
          closeOnPressEscape: false,
          closeOnClickModal: false,
          iconClass: 'el-icon-question',
          type: type,
          dangerouslyUseHTMLString: true,
          beforeClose: (action, instance, done) => {
            done()
          }
        }).then((res) => {
          cbOK(res)
        }).catch((err) => {
          cbCancel(err)
        })
      }
    },
    go (name, params = {}, query = {}) {
      this.$router.push({name, params, query})
    }
  },
  filters: {
    limit_str (text = '', count) {
      if (text.length > count) {
        return text.substr(0, count - 1) + '...'
      }
      return text
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: {App},
  template: '<App/>'
})
