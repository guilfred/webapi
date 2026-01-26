import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProjectController = () => import('#controllers/project_controller')

export const ProjectRoutes = () => {
  router
    .group(() => {
      router.get('', [ProjectController, 'index']),
      router.post('', [ProjectController, 'store']),
      router.put('/:id', [ProjectController, 'edit'])
    })
    .prefix('/api/projects')
    .middleware(middleware.auth())
}
