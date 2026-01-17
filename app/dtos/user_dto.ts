import User from '#models/user'

export class UserDto {
  toJSON(user: User) {
    return {
      id: user.id,
      email: user.email,
      isEnabled: user.isEnabled ? true : false,
      lastLoginAt: user.lastLoginAt || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt || null,
      profile: user.profile
        ? {
            name: user.profile.name,
            firstname: user.profile.firstname,
            rs: user.profile.rs,
            description: user.profile.description,
            address: user.profile.address,
            phone: user.profile.phone,
            website: user.profile.website,
            codePostal: user.profile.codePostal,
            numImmatriculation: user.profile.numImmatriculation,
            profileCategory: user.profile.profileCategory.title,
          }: null,
    }
  }
}
