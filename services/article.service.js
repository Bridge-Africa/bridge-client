export default class ArticleService {
  constructor (http, store, router) {
    this.$http = http
    this.$store = store
    this.$router = router
  }

  getArticles () {
    return new Promise((resolve, reject) => {
      this.$http.get(`articles`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getArticle (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`articles/${id}`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  getArchivedArticles () {
    return new Promise((resolve, reject) => {
      this.$http.get(`articles/archived/all`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  createArticle (data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`articles/store`, data)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  updateArticle (id, data) {
    return new Promise((resolve, reject) => {
      this.$http.post(`articles/${id}/update`, data)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  archiveArticle (id) {
    return new Promise((resolve, reject) => {
      this.$http.post(`articles/${id}/trash`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }

  destroyArticle (id) {
    return new Promise((resolve, reject) => {
      this.$http.post(`article_trash/${id}/destroy`)
        .then(res => res.data)
        .then(resolve)
        .catch(reject)
    })
  }

  restoreArticle (id) {
    return new Promise((resolve, reject) => {
      this.$http.post(`article_trash/${id}/restore`)
        .then(res => res.data)
        .then(data => {
          resolve(data.data)
        })
        .catch(reject)
    })
  }
}
