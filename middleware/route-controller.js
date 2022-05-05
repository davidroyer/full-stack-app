export default ({ store, redirect, route }) => {
  console.log('ROUTER CONTROLLER RUNNING')
  const activeUser = store.state.signedIn
  console.log('activeUser', activeUser)
  const isDashboardRoute = route.name === 'dashboard'
  console.log('isDashboardRoute', isDashboardRoute)

  if (activeUser && !isDashboardRoute) redirect('/dashboard')
  if (!activeUser && isDashboardRoute) redirect('/')
}
