export default function ({ store, redirect }) {
  const role = store.state.auth.role

  switch (role) {
    case 'doctor':
      return redirect('/doctor')
    case 'staff':
      return redirect('/staff')
  }
}
