import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    user: vine.object({
      email: vine.string().email().trim(),
      password: vine.string().trim(),
    }),
    profile: vine.object({
      name: vine.string().trim(),
      firstname: vine.string().trim(),
      rs: vine.string().trim().nullable(),
      description: vine.string().trim().nullable(),
      address: vine.string().trim(),
      phone: vine.string().trim(),
      website: vine.string().trim().nullable(),
      codePostal: vine.string().trim().nullable(),
      numImmatriculation: vine.string().trim().nullable(),
      categoryID: vine.number().positive().withoutDecimals(),
    }),
  })
)

export const showUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const getUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)


export const updateUserPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim(),
    newPassword: vine.string().trim(),
  })
)
