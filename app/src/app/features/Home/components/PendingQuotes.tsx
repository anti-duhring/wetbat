'use client'

import { URLs } from '@/app/core/enums'
import { useQuotes } from '@/app/core/hooks'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import HistoryIcon from '@mui/icons-material/History'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

import Loading from './Loading'
import Widget from './Widget'

const PendingQuotes = () => {
  const { data, isLoading, isFetching, refetch } = useQuotes()

  return (
    <Widget
      title="Pending quotes"
      Icon={HistoryIcon}
      actionButtons={[
        <IconButton key="1" onClick={() => refetch()}>
          <ReplayIcon />
        </IconButton>,
        <IconButton key="2">
          <FullscreenIcon />
        </IconButton>,
      ]}
      contentSx={{ padding: 0, height: '100%' }}
      sx={{ flex: 1 }}
    >
      {(isLoading || isFetching) ? <Loading /> : <PendingQuotesTable data={data} />}
    </Widget>
  )
}

type TPendingQuotesTableProps = {
  data?: TQuote[]
}
const PendingQuotesTable = ({ data }: TPendingQuotesTableProps) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return (
    <Table aria-label="pending quotes">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>DESTINATION</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>PRICE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map(({ contact, destinationLocation, ...quote }) => (
          <TableRow
            key={quote.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              textDecoration: 'none',
            }}
            component="a"
            href={`${URLs.QUOTE_DETAILS}/${quote.id}`}
            hover
          >
            <TableCell>
              {contact?.firstName} {contact?.lastName}
            </TableCell>
            <TableCell>{destinationLocation.name}</TableCell>
            <TableCell>{currencyFormatter.format(quote.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PendingQuotes
