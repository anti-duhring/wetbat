import * as yup from 'yup'

export const quoteSchema = yup.object({
  departureLocationName: yup.string().required(),
  destinationLocationName: yup.string().required(),
  departureDate: yup.date().min(new Date()).required(),
  destinationDate: yup.date().min(new Date()).required(),
  travellersAmount: yup.number().min(1).integer().required(),
  transportation: yup.string().required(),
  price: yup.number().min(0).required(),
  contactEmail: yup.string().email().required(),
})
