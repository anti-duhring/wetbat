'use client'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import Search from './Search'
import AvatarWithMenu from './AvatarWithMenu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import SettingsIcon from '@mui/icons-material/Settings'
import NavbarIconButton from './NavbarIconButton'
import { useContext } from 'react'
import { DrawerContext } from '../context/drawerContext'
import theme from '@/app/core/theme'

const Navbar = () => {
  const { toggleDrawer, isMediaQueryAboveSm } = useContext(DrawerContext)

  const navbarIconsButton = [NotificationsIcon, ChatBubbleIcon, SettingsIcon]

  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', userSelect: 'none' }}>
      <Toolbar sx={{ columnGap: '1rem' }}>
        <IconButton
          onClick={toggleDrawer}
          sx={{ color: theme.palette.common.white }}
        >
          <ViewQuiltIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wetbat
        </Typography>

        {isMediaQueryAboveSm && <Search />}

        {isMediaQueryAboveSm &&
          navbarIconsButton.map((Icon, index) => (
            <NavbarIconButton key={index} Icon={<Icon />} />
          ))}

        <AvatarWithMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
