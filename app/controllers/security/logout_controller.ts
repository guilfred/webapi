import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.clear()
    // Nettoyage des cookies
    response.clearCookie('adonis-session')

    return response.status(200).json({ message: "Deconnection de l'application !" })
  }
}
