export default function ({ store, redirect }) {
  if (store.state.auth.role !== 'manager') {
    return redirect('/')
  }
}
