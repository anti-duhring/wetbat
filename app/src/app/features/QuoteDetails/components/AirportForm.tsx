import { airportSchema } from '@/app/core'
import { AirportFormMessage, AirportMessage } from '@/app/core/enums'
import {
  NotificationSeverity,
  useNotification,
  useUpdateAirport,
} from '@/app/core/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'

type Props = {
  departure: TAirport
  destination: TAirport
}
const AirportForm = ({ departure, destination }: Props) => {
  const { NotificationComponent, openNotification, closeNotification } =
    useNotification()

  return (
    <Box>
      <AirportFields
        airport={departure}
        type="Departure"
        openNotification={openNotification}
        closeNotification={closeNotification}
      />
      <AirportFields
        airport={destination}
        type="Destination"
        openNotification={openNotification}
        closeNotification={closeNotification}
      />
      <NotificationComponent />
    </Box>
  )
}

type TAirportFieldsProps = {
  airport: TAirport
  type: 'Departure' | 'Destination'
  openNotification: (message: string, severity: NotificationSeverity) => void
  closeNotification: () => void
}
const AirportFields = ({
  airport,
  type,
  openNotification,
  closeNotification,
}: TAirportFieldsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(airportSchema), defaultValues: airport })
  const { update, isLoading } = useUpdateAirport({
    onSuccess,
    onError,
  })

  function onSuccess() {
    openNotification(
      AirportMessage.AIRPORT_UPDATED_SUCCESSFULLY,
      NotificationSeverity.SUCCESS,
    )
  }

  function onError(error: any) {
    const message = error.response?.data.message

    openNotification(message, NotificationSeverity.ERROR)
  }

  const onSubmit = () => {
    if (Object.keys(errors).length) {
      openNotification(
        (errors as any)[Object.keys(errors)[0]]?.message,
        NotificationSeverity.ERROR,
      )
      return
    }

    closeNotification()
    handleSubmit((data) => update({ id: airport.id, ...data }))()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        mb: 5,
      }}
    >
      <Typography variant="h5">{type} airport</Typography>
      <TextField
        label={AirportFormMessage.ID_LABEL}
        value={airport.id}
        disabled
      />
      <TextField
        {...register('name')}
        error={Boolean(errors?.name)}
        label={AirportFormMessage.NAME_LABEL}
        helperText={AirportFormMessage.NAME_HELPER_TEXT}
      />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label={AirportFormMessage.CITY_LABEL}
          helperText={AirportFormMessage.CITY_HELPER_TEXT}
          {...register('city')}
          error={Boolean(errors?.city)}
        />
        <TextField
          label={AirportFormMessage.STATE_LABEL}
          helperText={AirportFormMessage.STATE_HELPER_TEXT}
          {...register('state')}
          error={Boolean(errors?.state)}
        />
        <TextField
          label={AirportFormMessage.COUNTRY_LABEL}
          helperText={AirportFormMessage.COUNTRY_HELPER_TEXT}
          {...register('country')}
          error={Boolean(errors?.country)}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label={AirportFormMessage.LAT_LABEL}
          helperText={AirportFormMessage.LAT_HELPER_TEXT}
          {...register('lat')}
          error={Boolean(errors?.lat)}
        />
        <TextField
          label={AirportFormMessage.LON_LABEL}
          helperText={AirportFormMessage.LON_HELPER_TEXT}
          {...register('lon')}
          error={Boolean(errors?.lon)}
        />
      </Box>
      <TextField
        label={AirportFormMessage.TIMEZONE_LABEL}
        helperText={AirportFormMessage.TIMEZONE_HELPER_TEXT}
        {...register('tz')}
        error={Boolean(errors?.tz)}
      />
      <Box>
        <Button endIcon={<SaveIcon />} onClick={onSubmit} disabled={isLoading}>
          Update airport
        </Button>
      </Box>
    </Box>
  )
}

export default AirportForm
