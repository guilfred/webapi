import User from '#models/user'
import { test } from '@japa/runner'

test.group('Projects api edit test', () => {
  test('Edit project failed', async ({ client }) => {
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

    const res = await client
      .put('/api/projects/198765')
      .json({
        title: 'Projet de site vitrine',
        description: 'Site vitrine en wp',
        profileID: 4,
      })
      .loginAs(account)

    // Vérifier simplement le status 404
    res.assertStatus(404)
    // ou selon votre framework :
    // assert.equal(res.status(), 404)
  })
  test('Edit project successfully', async ({ client }) => {
    const account = await User.query()
      .whereHas('profile', (profileQuery) => {
        profileQuery.whereHas('profileCategory', (categoryQuery) => {
          categoryQuery.where('type', 'admin')
        })
      })
      .preload('profile', (profileQuery) => {
        profileQuery.preload('profileCategory')
      })
      .firstOrFail()
    const response = await client
      .put('/api/projects/1')
      .json({
        title: 'Projet app metier',
        description: 'Webapp metier',
        profileID: 4,
      })
      .loginAs(account)
    response.assertOk()
  })
})
