import Profile from '#models/profile'
import ProfileCategory from '#models/profile_category'

export class ProfileCategoryDto {
  toJSON(profileCategory: ProfileCategory) {
    return {
      id: profileCategory.id,
      title: profileCategory.title,
      type: profileCategory.type,
      description: profileCategory.description,
      profiles: profileCategory.profiles .length > 0? 
      profileCategory.profiles.map((profile:Profile) => {
        return {
          id: profile.id,
          name: profile.name,
          firstname: profile.firstname,
          rs: profile.rs,
          description: profile.description,
          address: profile.address,
          phone: profile.phone,
          website: profile.website,
          codePostal: profile.codePostal,
          numImmatriculation: profile.numImmatriculation,
          userID: profile.userID
        }
      }) : []
    }
  }
}
