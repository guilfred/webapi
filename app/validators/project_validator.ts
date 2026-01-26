import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(5),
    description: vine.string().trim().minLength(5),
    profileID: vine.number().withoutDecimals()
  })
)


export const getProjectByIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)
