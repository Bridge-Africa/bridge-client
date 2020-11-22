export default class AuthService {
  constructor (http, store, router) {
    this.$http = http
    this.$store = store
    this.$router = router
  }

  login (data) {
    this.$store.dispatch('Auth/authRequest')
    return new Promise((resolve, reject) => {
      this.$http.post('auth/login', data)
        .then(res => {
          if (res.status === 200) {
            return res.data
          }
        })
        .then(data => {
          this.$store.dispatch('Auth/loggedIn', data)
          resolve(data)
        })
        .catch(err => {
          this.$store.dispatch('Auth/authError')
          reject(err)
        })
    })
  }

  register (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('auth/register', data)
        .then(res => {
          if (res.status === 200) {
            return res.data
          }
        })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  logout () {
    this.$store.dispatch('Auth/setIntended', this.$router.currentRoute.name)
    this.$store.dispatch('Auth/logout')
      .then(() => {
        location.reload()
        this.$router.push('login')
      })
  }

  changePassword (data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`auth/password`, data)
        .then(res => res.data)
        .then(data => {
          resolve(data)
        })
        .catch(reject)
    })
  }

  changeLanguage (lang) {
    return new Promise((resolve, reject) => {
      this.$http.post(`auth/language`, {lang})
        .then(res => res.data)
        .then(data => {
          resolve(data)
        })
        .catch(reject)
    })
  }
}
