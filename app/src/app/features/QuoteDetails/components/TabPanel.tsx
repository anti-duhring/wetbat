import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index }: Props) => {
  if (value !== index) return null

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`quote-details-tab-${index}`}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  )
}

export default TabPanel
