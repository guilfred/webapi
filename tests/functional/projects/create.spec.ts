import User from '#models/user'
import { test } from '@japa/runner'

test.group('Projects api create test', () => {

  test('Create project unauthorized', async ({ client }) => {
    const response = await client.post('/api/projects')
    response.assertUnauthorized()
  })

  test('Create project successfully', async ({ client }) => {
    const account = await User.query().whereHas('profile', (profileQuery) => {
      profileQuery.whereHas('profileCategory', (categoryQuery) => {
        categoryQuery.where('type', 'super_admin')
      })
    })
    .preload('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    .firstOrFail()
    const response = await client.post('/api/projects').json({
      title: 'Projet de site vitrine',
      description: 'Site vitrine en wp',
      profileID: 4
    }).loginAs(account)
    response.assertCreated()
  })

})