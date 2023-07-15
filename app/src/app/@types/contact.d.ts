type TContact = {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}

type TCreateContact = Pick<
  TContact,
  'firstName' | 'lastName' | 'phone' | 'email'
>
