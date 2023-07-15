import Widget from './Widget'
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  styled,
  ListItemButton,
} from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatIcon from '@mui/icons-material/Chat'

type TTeamItem = {
  name: string
  avatar: string
  role: string
  avaliability: 'avaliable' | 'unavaliable'
}
const items: TTeamItem[] = [
  {
    name: 'Jane Smith',
    avatar: 'https://mui.com/static/images/avatar/7.jpg',
    role: 'Customer service',
    avaliability: 'avaliable',
  },
  {
    name: 'John Doe',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    role: 'Customer service',
    avaliability: 'avaliable',
  },
  {
    name: 'Alex Johnson',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    role: 'Customer service',
    avaliability: 'unavaliable',
  },
  {
    name: 'Foo Bar',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    role: 'Customer service',
    avaliability: 'avaliable',
  },
  {
    name: 'William Butcher',
    avatar: 'https://mui.com/static/images/avatar/11.jpg',
    role: 'Customer service',
    avaliability: 'avaliable',
  },
  {
    name: 'Foo Bar',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    role: 'Customer service',
    avaliability: 'avaliable',
  },
]

const StyledBadge = styled(Badge)(({ theme, color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color,
    color: color,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation:
        color === 'success' ? 'ripple 1.2s infinite ease-in-out' : 'none',
      border: color === 'success' ? '1px solid currentColor' : 'none',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1.4)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(3)',
      opacity: 0,
    },
  },
}))

const TeamChat = () => {
  return (
    <Widget
      title="Team chat"
      Icon={ChatBubbleOutlineIcon}
      actionButtons={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      contentSx={{ padding: 0 }}
      sx={{ flex: 1 }}
    >
      <List>
        {items.map((item) => {
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <StyledBadge
                    overlap="rectangular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    variant="dot"
                    color={
                      item.avaliability === 'avaliable' ? 'success' : 'error'
                    }
                  >
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      variant="rounded"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.role}
                  title={item.avaliability}
                />
                <IconButton color="secondary">
                  <ChatIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Widget>
  )
}

export default TeamChat
