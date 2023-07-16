export enum QuoteErrorMessages {
  DEPARTURE_AND_DESTINATION_DATE_HAS_ALREADY_PASSED = 'Departure or destination has already passed',
  DEPARTURE_DATE_IS_GREATER_THAN_DESTINATION_DATE = 'Departure date cannot be after destination date',
  MAX_QUOTES_LESS_THAN_ZERO = 'Max number of Quotes cannot be less than zero',
}

export enum ContactErrorMessages {
  EMAIL_OR_PHONE_ALREADY_EXISTS = 'Invalid email or phone number',
}
