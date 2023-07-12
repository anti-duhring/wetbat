import { Box } from '@mui/material'
import QuickQuote from './QuickQuote'
import PendingQuotes from './PendingQuotes'
import NewLeads from './NewLeads'

const QuoteWidgets = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', width: '100%' }}
    >
      <QuickQuote />
      <PendingQuotes />
      <NewLeads />
    </Box>
  )
}

export default QuoteWidgets
