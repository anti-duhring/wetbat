import * as yup from 'yup'

export const quoteSchema = yup.object({
  departureLocationName: yup
    .string()
    .nonNullable()
    .required('Departure location is required'),
  destinationLocationName: yup
    .string()
    .nonNullable()
    .required('Destination location is required'),
  departureDate: yup
    .date()
    .nonNullable()
    .required('Departure date is required'),
  destinationDate: yup.date().nonNullable().required('Return date is required'),
  travellersAmount: yup
    .number()
    .min(1)
    .integer('Travellers amount must be an integer')
    .nonNullable()
    .required('Travellers amount is required'),
  transportation: yup
    .string()
    .nonNullable()
    .required('Transportation type is required'),
  price: yup.number().min(0).nonNullable().required('Price is required'),
  contactEmail: yup
    .string()
    .nonNullable()
    .email('Contact email is invalid')
    .required('Contact email is required'),
})

export const contactSchema = yup.object({
  firstName: yup.string().nonNullable().required('First name is required'),
  lastName: yup.string().nonNullable().required('Last name is required'),
  email: yup
    .string()
    .nonNullable()
    .email('Contact email is invalid')
    .required('Contact email is required'),
  phone: yup.string().nonNullable().required('Phone number is required'),
})

export const airportSchema = yup.object({
  lat: yup.string().nonNullable().required('Latitude is required'),
  lon: yup.string().nonNullable().required('Longitude is required'),
  name: yup.string().nonNullable().required('Name is required'),
  city: yup.string().nonNullable().required('City is required'),
  state: yup.string().nonNullable().required('State is required'),
  country: yup.string().nonNullable().required('Country is required'),
  tz: yup.string().nonNullable().required('Timezone is required'),
})
