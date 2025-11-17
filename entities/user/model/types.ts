export interface User {
  id: string
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
}

export type UserCreate = Omit<User, 'id'>
export type UserUpdate = Partial<UserCreate> & { id: string }