export default function ({ store, redirect }) {
  store.dispatch('user/syncLoginUser')

  if (!store.state.auth.isAuthenticated) {
    return redirect('/login')
  }
}
