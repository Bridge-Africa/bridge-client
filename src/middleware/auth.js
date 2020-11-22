export default function auth ({next, store, router, to}) {
  if (!store.getters['Auth/loggedIn']) {
    store.dispatch('Auth/setIntended', to.name)
    return router.push({
      name: 'login'
    })
  }

  return next()
}
