import { AirportFormMessage, ContactFormMessage } from '@/app/core/enums'
import { Box, Button, TextField, Typography } from '@mui/material'

type Props = {
  departure: TAirport
  destination: TAirport
}
const AirportForm = ({ departure, destination }: Props) => {
  return (
    <Box>
      <AirportFields airport={departure} type="Departure" />
      <AirportFields airport={destination} type="Destination" />
      <Box>
        <Button variant="contained">Update contact</Button>
      </Box>
    </Box>
  )
}

type TAirportFieldsProps = {
  airport: TAirport
  type: 'Departure' | 'Destination'
}
const AirportFields = ({ airport, type }: TAirportFieldsProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Typography variant="h4">{type}</Typography>
      <TextField
        label={AirportFormMessage.ID_LABEL}
        value={airport.id}
        variant="filled"
        fullWidth
        disabled
      />
      <TextField
        label={AirportFormMessage.NAME_LABEL}
        helperText={AirportFormMessage.NAME_HELPER_TEXT}
        value={airport.name}
        variant="filled"
        fullWidth
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={AirportFormMessage.CITY_LABEL}
          helperText={AirportFormMessage.CITY_HELPER_TEXT}
          value={airport.city}
          variant="filled"
          fullWidth
        />
        <TextField
          label={AirportFormMessage.STATE_LABEL}
          helperText={AirportFormMessage.STATE_HELPER_TEXT}
          value={airport.state}
          variant="filled"
          fullWidth
        />
        <TextField
          label={AirportFormMessage.COUNTRY_LABEL}
          helperText={AirportFormMessage.COUNTRY_HELPER_TEXT}
          value={airport.country}
          variant="filled"
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={AirportFormMessage.LAT_LABEL}
          helperText={AirportFormMessage.LAT_HELPER_TEXT}
          value={airport.lat}
          variant="filled"
          fullWidth
        />
        <TextField
          label={AirportFormMessage.LON_LABEL}
          helperText={AirportFormMessage.LON_HELPER_TEXT}
          value={airport.lon}
          variant="filled"
          fullWidth
        />
      </Box>
      <TextField
        label={AirportFormMessage.TIMEZONE_LABEL}
        helperText={AirportFormMessage.TIMEZONE_HELPER_TEXT}
        value={airport.tz}
        variant="filled"
        fullWidth
      />
    </Box>
  )
}

export default AirportForm
