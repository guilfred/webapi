import User from '#models/user'
import { test } from '@japa/runner'

test.group('Projects api list test', () => {
  test('List projects with unauthorized', async ({ client }) => {
    const response = await client.get('/api/projects')
    response.assertUnauthorized()
  })

  test('List projects successfully', async ({ client }) => {
    const account = await User.query()
      .whereHas('profile', (profileQuery) => {
        profileQuery.whereHas('profileCategory', (categoryQuery) => {
          categoryQuery.where('type', 'super_admin')
        })
      })
      .preload('profile', (profileQuery) => {
        profileQuery.preload('profileCategory')
      })
      .firstOrFail()
    const response = await client.get('/api/projects').loginAs(account)
    response.assertOk()
  })

  test('List projects with account forbidden', async ({ client }) => {
    const account1 = await User.query()
      .whereHas('profile', (profileQuery) => {
        profileQuery.whereHas('profileCategory', (categoryQuery) => {
          categoryQuery.where('type', 'client')
        })
      })
      .preload('profile', (profileQuery) => {
        profileQuery.preload('profileCategory')
      })
      .firstOrFail()
    const response = await client.get('/api/projects').loginAs(account1)
    response.assertStatus(403)
  })
})
