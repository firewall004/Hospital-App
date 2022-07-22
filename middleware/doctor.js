export default function ({ store, redirect }) {
  if (store.state.auth.role !== 'doctor') {
    return redirect('/')
  }
}
