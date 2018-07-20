import login from './lib/login'
import Session from './lib/session'

const qcloud = {
  login: login.login,
  loginWithCode: login.loginWithCode,
  setLoginUrl: login.setLoginUrl,
  Session,
  clearSession: Session.clear
}

export default qcloud
