import ProfileCategory from '#models/profile_category'

export class ProfileCategoryDto {
  toJSON(profileCategory: ProfileCategory) {
    return {
      id: profileCategory.id,
      title: profileCategory.title,
      type: profileCategory.type,
      description: profileCategory.description,
    }
  }
}
