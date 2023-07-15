'use client'

import theme from '@/app/core/theme'
import { IconButton } from '@mui/material'

type Props = {
  Icon: JSX.Element
}
const NavbarIconButton = ({ Icon }: Props) => {
  return (
    <IconButton sx={{ color: theme.palette.common.white }}>{Icon}</IconButton>
  )
}

export default NavbarIconButton
