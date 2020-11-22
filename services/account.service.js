export default class AccountService {
  constructor (http, store, router) {
    this.$http = http
    this.$store = store
    this.$router = router
  }

  getAccount () {
    return new Promise((resolve, reject) => {
      this.$http.get(`account`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  createDeposit (data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/deposits/create`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getDeposits () {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/deposits`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  createWithdrawal (data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/withdraws/create`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getWithdrawals () {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/withdraws`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getCategories () {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/categories`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  createCategory (data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/categories/create`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  updateCategory (id, data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/categories/${id}/update`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getCategorySummary (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/categories/${id}/summary`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getSubcategories (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/categories/${id}/subcategories`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getAllSubcategories () {
    return new Promise((resolve, reject) => {
      this.$http.get(`account/subcategories`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  createSubcategory (id, data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/categories/${id}/subcategories/create`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  updateSubcategory (id, data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`account/categories/subcategories/${id}/update`, data)
        .then(res => res.data)
        .then(data => {
          if (data.status === 'error') reject(new Error(data.message))
          resolve(data.data)
        })
        .catch(reject)
    })
  }
}
