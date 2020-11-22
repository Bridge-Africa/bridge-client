export default function guest ({next, store, router}) {
  if (store.getters['Auth/loggedIn']) {
    return router.push({name: 'home'})
  }

  return next()
}
