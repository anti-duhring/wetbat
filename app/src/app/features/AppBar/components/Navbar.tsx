'use client'

import { AppBar, Toolbar, Typography } from '@mui/material'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import Search from './Search'
import AvatarWithMenu from './AvatarWithMenu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import SettingsIcon from '@mui/icons-material/Settings'
import NavbarIconButton from './NavbarIconButton'

const Navbar = () => {
  const navbarIconsButton = [NotificationsIcon, ChatBubbleIcon, SettingsIcon]
  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', userSelect: 'none' }}>
      <Toolbar sx={{ columnGap: '1rem' }}>
        <ViewQuiltIcon fontSize="large" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wetbat
        </Typography>
        <Search />
        {navbarIconsButton.map((Icon) => (
          <NavbarIconButton key={Icon.name} Icon={<Icon />} />
        ))}
        <AvatarWithMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
