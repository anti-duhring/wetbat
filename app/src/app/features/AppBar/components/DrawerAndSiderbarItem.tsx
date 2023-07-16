'use client'

import theme from '@/app/core/theme'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

type Props = {
  Icon: JSX.Element
  title: string
  link: string
}

const DrawerAndSidebarItem = ({ Icon, title, link }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={link}>
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          {Icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{ color: theme.palette.primary.main }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default DrawerAndSidebarItem
