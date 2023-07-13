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

const rows = [
  {
    id: 1,
    name: 'Frozen yoghurt',
    destination: 'New York',
    price: '$24.99',
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    destination: 'Ecuador',
    price: '$4.99',
  },

  {
    id: 3,
    name: 'Eclair',
    destination: 'Costa Rica',
    price: '$1.99',
  },
  {
    id: 4,
    name: 'Cupcake',
    destination: 'Germany',
    price: '$1.99',
  },
  {
    id: 5,
    name: 'Gingerbread',
    destination: 'France',
    price: '$1.99',
  },
]
const PendingQuotes = () => {
  return (
    <Widget
      title="Pending quotes"
      Icon={HistoryIcon}
      actionButtons={[
        <IconButton>
          <ReplayIcon />
        </IconButton>,
        <IconButton>
          <FullscreenIcon />
        </IconButton>,
      ]}
      contentSx={{ padding: 0 }}
      sx={{ flex: 1 }}
    >
      <Table aria-label="pending quotes" sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell>ID #</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>DESTINATION</TableCell>
            <TableCell>PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Widget>
  )
}

export default PendingQuotes
