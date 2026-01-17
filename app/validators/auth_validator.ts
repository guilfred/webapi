import vine from '@vinejs/vine'

export const AuthenticationValidator = vine.compile(
  vine.object({
    username: vine.string().email().trim(),
    password: vine.string().trim(),
  })
)
