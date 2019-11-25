const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  depart: state => state.user.depart,
  roles: state => state.user.roles,
  name: state => state.user.name
}
export default getters
