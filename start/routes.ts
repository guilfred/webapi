/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { ProfilesCategoriesRoutes } from './profile/routes.js'
import { SecurityRoutes } from './security/routes.js'
import { UserRoutes } from './user/routes.js'

router
  .get('/', async () => {
    return {
      hello: 'world',
    }
  })
  .middleware(middleware.userLocation())

// Routes importées  
UserRoutes()
ProfilesCategoriesRoutes()
SecurityRoutes()
