import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/security/user_controller')

export const UserRoutes = () => {
  router
    .group(() => {
      router.post('', [UserController, 'createAccount'])
      router.get('', [UserController, 'listeAccount'])
      router.get('/:id', [UserController, 'getAccount'])
      router.put('/update_able_account/:id', [UserController, 'updateAbleAccount'])
      router.post('/update_password', [UserController, 'updatePassword'])
      router.post('update_profiles', [UserController, 'updateProfile'])
    })
    .prefix('/api/users')
    .middleware(middleware.auth())
}
