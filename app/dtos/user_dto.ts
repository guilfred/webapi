import User from '#models/user'

export class UserDto {
  toJSON(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isEnabled: user.isEnabled,
      lastLoginAt: user.lastLoginAt || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt || null,
    }
  }
}
