import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/security/user_controller')

export const UserRoutes = () => {
  router
    .group(() => {
      router.get('list_users', [UserController, 'listUsers'])
    })
    .prefix('/api/users')
    .middleware(middleware.auth())
}
