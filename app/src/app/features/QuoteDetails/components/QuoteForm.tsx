import { quoteSchema } from '@/app/core'
import { AutocompleteInputAirport } from '@/app/core/components'
import { QuoteFormMessage, QuoteMessage } from '@/app/core/enums'
import { NotificationSeverity, useNotification } from '@/app/core/hooks'
import { useUpdateQuote } from '@/app/core/hooks/useUpdateQuote'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'

type Props = {
  quote: TQuote
}
const QuoteForm = ({ quote }: Props) => {
  const { NotificationComponent, openNotification, closeNotification } =
    useNotification()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(quoteSchema),
    defaultValues: {
      ...quote,
      departureDate: dayjs(quote.departureDate) as any,
      destinationDate: dayjs(quote.destinationDate) as any,
      departureLocationName: quote.departureLocation.name,
      destinationLocationName: quote.destinationLocation.name,
    },
  })
  const { update, isLoading } = useUpdateQuote({
    onSuccess,
    onError,
  })

  function onSuccess() {
    openNotification(
      QuoteMessage.QUOTE_UPDATED_SUCCESSFULLY,
      NotificationSeverity.SUCCESS,
    )
  }

  function onError(error: any) {
    openNotification(error.response?.data.message, NotificationSeverity.ERROR)
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
    handleSubmit((data) => update({ id: quote.id, ...data }))()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <TextField
          label={QuoteFormMessage.ID_LABEL}
          value={quote.id}
          disabled
        />
        <TextField
          label={QuoteFormMessage.STATUS_LABEL}
          value={quote.status}
          disabled
        />
        <AutocompleteInputAirport
          defaultValue={quote.departureLocation.name}
          inputProps={{
            label: QuoteFormMessage.DEPARTURE_LOCATION_LABEL,
            helperText: QuoteFormMessage.DEPARTURE_LOCATION_HELPER_TEXT,
            error: Boolean(errors.departureLocationName?.message),
            ...register('departureLocationName'),
          }}
        />
        <AutocompleteInputAirport
          defaultValue={quote.destinationLocation.name}
          inputProps={{
            label: QuoteFormMessage.DESTINATION_LOCATION_LABEL,
            helperText: QuoteFormMessage.DESTINATION_LOCATION_HELPER_TEXT,
            error: Boolean(errors.destinationLocationName?.message),
            ...register('destinationLocationName'),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="departureDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateField
                label={QuoteFormMessage.DEPARTURE_DATE_LABEL}
                helperText={QuoteFormMessage.DEPARTURE_DATE_HELPER_TEXT}
                value={value}
                onChange={onChange as any}
                slotProps={{
                  textField: {
                    error: Boolean(errors.departureDate?.message),
                  },
                }}
              />
            )}
          />
          <Controller
            name="destinationDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateField
                label={QuoteFormMessage.DESTINATION_DATE_LABEL}
                helperText={QuoteFormMessage.DESTINATION_DATE_HELPER_TEXT}
                value={value}
                onChange={onChange as any}
                slotProps={{
                  textField: {
                    error: Boolean(errors.destinationDate?.message),
                  },
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            {...register('travellersAmount')}
            label={QuoteFormMessage.TRAVELLERS_AMOUNT_LABEL}
            helperText={QuoteFormMessage.TRAVELLERS_AMOUNT_HELPER_TEXT}
            type="number"
            error={Boolean(errors.travellersAmount?.message)}
          />
          <TextField
            {...register('transportation')}
            label={QuoteFormMessage.TRANSPORTATION_TYPE_LABEL}
            helperText={QuoteFormMessage.TRANSPORTATION_TYPE_HELPER_TEXT}
            error={Boolean(errors.transportation?.message)}
          />
        </Box>
        <TextField
          {...register('price')}
          label={QuoteFormMessage.PRICE_LABEL}
          helperText={QuoteFormMessage.PRICE_HELPER_TEXT}
          type="number"
          error={Boolean(errors.price?.message)}
        />
        <TextField
          {...register('contactEmail')}
          label={QuoteFormMessage.CONTACT_LABEL}
          helperText={QuoteFormMessage.CONTACT_HELPER_TEXT}
          error={Boolean(errors.contactEmail?.message)}
        />
        <Box>
          <Button
            endIcon={<SaveIcon />}
            onClick={onSubmit}
            disabled={isLoading}
          >
            Update quote
          </Button>
        </Box>
      </Box>
      <NotificationComponent />
    </LocalizationProvider>
  )
}

export default QuoteForm
