export enum ProfileType {
  CLIENT = 'client',
  INTERVENANT = 'intervenant',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum ProfileTitle {
  CLIENT = 'Client',
  INTERVENANT = 'Intervenant',
  ADMIN = 'Administrateur',
  SUPER_ADMIN = 'Super Administrateur',
}

export type ProfileAdminCategory = 'super_admin' | 'admin'

export const EXPIRES_IN = 3600
