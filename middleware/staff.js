export default function ({ store, redirect }) {
  if (store.state.auth.role !== 'staff') {
    return redirect('/')
  }
}
