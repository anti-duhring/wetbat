import * as yup from 'yup'

export const quoteSchema = yup.object({
  departureLocationName: yup.string().nonNullable().required(),
  destinationLocationName: yup.string().nonNullable().required(),
  departureDate: yup.date().nonNullable().required(),
  destinationDate: yup.date().nonNullable().required(),
  travellersAmount: yup.number().min(1).integer().nonNullable().required(),
  transportation: yup.string().nonNullable().required(),
  price: yup.number().min(0).nonNullable().required(),
  contactEmail: yup.string().nonNullable().email().required(),
})

export const contactSchema = yup.object({
  firstName: yup.string().nonNullable().required(),
  lastName: yup.string().nonNullable().required(),
  email: yup.string().nonNullable().email().required(),
  phone: yup.string().nonNullable().required(),
})
