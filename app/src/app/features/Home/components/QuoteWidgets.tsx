import { Box } from '@mui/material'
import QuickQuote from './QuickQuote'
import PendingQuotes from './PendingQuotes'

const QuoteWidget = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}
    >
      <QuickQuote />
      <PendingQuotes />
    </Box>
  )
}

export default QuoteWidget
