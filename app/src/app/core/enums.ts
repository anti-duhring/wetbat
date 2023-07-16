export enum QuoteMessage {
  QUOTE_CREATED_SUCCESSFULLY = 'Quote created successfully',
  QUOTE_UPDATED_SUCCESSFULLY = 'Quote updated successfully',
}

export enum QuoteFormMessage {
  DEPARTURE_LOCATION_LABEL = 'FROM',
  DEPARTURE_LOCATION_HELPER_TEXT = 'Select the airport that is departure location. You can search for an airport typing either its name, the city, state or country.',
  DESTINATION_LOCATION_LABEL = 'DESTINATION',
  DESTINATION_LOCATION_HELPER_TEXT = 'Select the airport that is destine location. You can search for an airport typing either its name, the city, state or country.',
  DEPARTURE_DATE_LABEL = 'DEPARTURE DATE',
  DEPARTURE_DATE_HELPER_TEXT = 'Select the departure date.',
  RETURN_DATE_LABEL = 'RETURN DATE',
  RETURN_DATE_HELPER_TEXT = 'Select the return date.',
  DESTINATION_DATE_LABEL = 'RETURN DATE',
  DESTINATION_DATE_HELPER_TEXT = 'Select the destination date.',
  TRAVELLERS_AMOUNT_LABEL = 'PEOPLE',
  TRAVELLERS_AMOUNT_HELPER_TEXT = 'Select the amount of people.',
  PRICE_LABEL = 'PRICE $',
  PRICE_HELPER_TEXT = 'The total price is calculated based on the selected dates and amount of people.',
  TRANSPORTATION_TYPE_LABEL = 'TRANSPORTATION',
  TRANSPORTATION_TYPE_HELPER_TEXT = 'Select the type of transportation that will be used on the trip.',
  CONTACT_LABEL = 'EMAIL',
  CONTACT_HELPER_TEXT = 'Provide the email address of the contact that will be used to contact the customer.',
  ID_LABEL = 'ID',
  STATUS_LABEL = 'STATUS',
}

export enum ContactMessage {
  QUICK_CONTACT_DIALOG_TITLE = 'Quick Contact',
  QUICK_CONTACT_DIALOG_DESCRIPTION = 'The email provided does not exist. Please register a new contact using this email address or provide a different email.',
  CONTACT_CREATED_SUCCESSFULLY = 'Contact created successfully',
  CONTACT_UPDATED_SUCCESSFULLY = 'Contact updated successfully',
  NOT_FOUND = 'Contact not found',
}

export enum ContactFormMessage {
  FIRST_NAME_LABEL = 'FIRST NAME',
  FIRST_NAME_HELPER_TEXT = 'First name of the contact.',
  LAST_NAME_LABEL = 'LAST NAME',
  LAST_NAME_HELPER_TEXT = 'Last name of the contact.',
  EMAIL_LABEL = 'EMAIL',
  EMAIL_HELPER_TEXT = 'Eemail address of the contact.',
  PHONE_NUMBER_LABEL = 'PHONE NUMBER',
  PHONE_NUMBER_HELPER_TEXT = 'Phone number of the contact.',
  ID_LABEL = 'ID',
}

export enum AirportMessage {
  AIRPORT_CREATED_SUCCESSFULLY = 'Airport created successfully',
  AIRPORT_UPDATED_SUCCESSFULLY = 'Airport updated successfully',
}

export enum AirportFormMessage {
  ID_LABEL = 'ID',
  LAT_LABEL = 'LATITUDE',
  LAT_HELPER_TEXT = 'The latitude position of the airport.',
  LON_LABEL = 'LONGITUDE',
  LON_HELPER_TEXT = 'The longitude position of the airport.',
  NAME_LABEL = 'NAME',
  NAME_HELPER_TEXT = 'Name of the airport.',
  CITY_LABEL = 'CITY',
  CITY_HELPER_TEXT = 'Provide the city of the airport.',
  STATE_LABEL = 'STATE',
  STATE_HELPER_TEXT = 'Provide the state of the airport.',
  COUNTRY_LABEL = 'COUNTRY',
  COUNTRY_HELPER_TEXT = 'Provide the country of the airport.',
  TIMEZONE_LABEL = 'TIMEZONE',
  TIMEZONE_HELPER_TEXT = 'Timezone of the airport region.',
}

export enum URLs {
  HOME = '/',
  QUOTE_DETAILS = '/quotes',
}
