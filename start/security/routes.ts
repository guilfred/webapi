import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogoutController = () => import('#controllers/security/logout_controller')
const AuthenticationController = () => import('#controllers/security/auth_controller')

export const SecurityRoutes = () => {
  router.post('/api/auth', [AuthenticationController, 'authentication'])
  router.post('/api/login', [AuthenticationController, 'login'])
  router.post('/api/logout', [LogoutController, 'logout']).middleware(middleware.auth())
  router
    .get('/api/me', [AuthenticationController, 'currentUser'])
    .middleware(middleware.auth({ guards: ['web', 'jwt'] }))
}
