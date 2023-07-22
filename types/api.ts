

export interface CardType {
  id?: string
  name: string
  cpf?: string
  createdAt?: string
  updatedAt?: string
  wasDelivered?: boolean
}

export interface UserType {
  id: string
  name: string
  email: string 
  cpf: string
  phone: string
  emailVerified: string
  hashedPassword: string
  createdAt: string
  updatedAt: string
}