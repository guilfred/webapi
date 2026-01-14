import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProfileCategoryController = () => import('#controllers/security/profile_category_controller')

export const ProfilesCategoriesRoutes = () => {
  router
    .group(() => {
      router.get('', [ProfileCategoryController, 'listOfProfiles'])
      router.get('/:id', [ProfileCategoryController, 'getProfileCategory'])
    })
    .prefix('/api/profile_categories')
    .middleware(middleware.auth())
}
