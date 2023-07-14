import { useEffect } from 'react'
import Widget from './Widget'
import HistoryIcon from '@mui/icons-material/History'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import {
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import { useQuotes } from '@/app/core'

const PendingQuotes = () => {
  const { data, isLoading, isFetching, refetch } = useQuotes()
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'  })

  return (
    <Widget
      title="Pending quotes"
      Icon={HistoryIcon}
      actionButtons={[
        <IconButton key={ReplayIcon.name} onClick={() => refetch()}>
          <ReplayIcon />
        </IconButton>,
        <IconButton key={FullscreenIcon.name}>
          <FullscreenIcon />
        </IconButton>,
      ]}
      contentSx={{ padding: 0 }}
      sx={{ flex: 1 }}
    >
      <Table aria-label="pending quotes" sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>DESTINATION</TableCell>
            <TableCell>PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(({ contact, ...quote }) => (
            <TableRow
              key={quote.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{contact?.firstName} {contact?.lastName}</TableCell>
              <TableCell>{quote.destinationLocation}</TableCell>
              <TableCell>{currencyFormatter.format(quote.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Widget>
  )
}

export default PendingQuotes
