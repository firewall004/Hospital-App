export default function ({ store, redirect }) {
  if (store.state.auth.role !== 'admin') {
    return redirect('/admin')
  }
}
