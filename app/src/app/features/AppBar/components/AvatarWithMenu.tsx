import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const AvatarWithMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default AvatarWithMenu
