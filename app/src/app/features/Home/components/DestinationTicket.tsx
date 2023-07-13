import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material'

const ticketData = {
  image: 'https://i.imgur.com/mb1497f.png',
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut dolor a arcu semper consequat sit amet eu felis. ',
  price: {
    currency: 12345,
    info: 'PRE-NIGHT',
  },
}

const DestinationTicket = () => {
  const { image, title, description, price } = ticketData

  return (
    <Card sx={{ maxWidth: 300 }} elevation={4}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">${price.currency}</Typography>
          <Typography variant="body1">{price.info}</Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          disableElevation
          sx={{
            color: (theme) => theme.palette.common.white,
            borderRadius: 20,
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default DestinationTicket
