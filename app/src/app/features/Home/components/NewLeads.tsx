'use client'

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListItemButton,
} from '@mui/material'
import Widget from './Widget'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import ReplayIcon from '@mui/icons-material/Replay'

const items = [
  {
    name: 'Jane Smith',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'Hey! I want to place my package',
    hour: '13:40 PM',
  },
  {
    name: 'John Doe',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    message: 'Hey! I want to place my package',
    hour: '13:50 PM',
  },
  {
    name: 'Alexa Johnson',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    message: 'Hey! I want to place my package',
    hour: '13:55 PM',
  },
  {
    name: 'Foo Bar',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    message: 'Hey! I want to place my package',
    hour: '14:00 PM',
  },
  {
    name: 'Magnus  Carlsen',
    avatar: 'https://mui.com/static/images/avatar/5.jpg',
    message: 'Hey! I want to place my package',
    hour: '14:10 PM',
  },
  {
    name: 'Larry Page',
    avatar: 'https://mui.com/static/images/avatar/6.jpg',
    message: 'Hey! I want to place my package',
    hour: '14:20 PM',
  },
]

const NewLeads = () => {
  return (
    <Widget
      title="New Leads"
      Icon={MailOutlineIcon}
      contentSx={{ padding: 0 }}
      actionButtons={[
        <IconButton key="1">
          <ReplayIcon />
        </IconButton>,
        <IconButton key="2">
          <FullscreenIcon />
        </IconButton>,
      ]}
      sx={{ flex: 1 }}
    >
      <List>
        {items.map((item) => {
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.message}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <ListItemText secondary={item.hour} sx={{ marginLeft: 1 }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Widget>
  )
}

export default NewLeads
