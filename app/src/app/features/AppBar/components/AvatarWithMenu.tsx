'use client'

import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import { DrawerContext } from '../context/drawerContext'
import {
  avatarDropdownMenuItemsMobile,
  avatarDropdownMenuItemsWeb,
} from '../utils/avatarDropdownMenuItems'

const AvatarWithMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isMediaQueryAboveSm } = useContext(DrawerContext)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const menuItems = isMediaQueryAboveSm
    ? avatarDropdownMenuItemsWeb
    : avatarDropdownMenuItemsMobile

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/images/avatar/2.jpg"
        />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems.map((item) => (
          <MenuItem key={item} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default AvatarWithMenu
