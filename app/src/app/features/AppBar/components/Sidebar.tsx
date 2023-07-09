import { styled, List, Divider, Typography } from '@mui/material'
import SidebarItem from './SidebarItem'
import HomeIcon from '@mui/icons-material/Home'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import TelegramIcon from '@mui/icons-material/Telegram'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import AssessmentIcon from '@mui/icons-material/Assessment'
import GroupsIcon from '@mui/icons-material/Groups'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import theme from '@/app/core/theme'

const SidebarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  height: '100%',
}))

const Sidebar = () => {
  const generalSidebarItems = [
    {
      Icon: <HomeIcon />,
      title: 'Home',
      link: '/',
    },
    {
      Icon: <AttachMoneyIcon />,
      title: 'Quotes',
      link: '/',
    },
    {
      Icon: <FormatListBulletedIcon />,
      title: 'Leads',
      link: '/',
    },
    {
      Icon: <TelegramIcon />,
      title: 'Tours',
      link: '/',
    },
  ]
  const employeeSidebarItems = [
    {
      Icon: <InsertDriveFileIcon />,
      title: 'Invoices',
      link: '/',
    },
    {
      Icon: <AssessmentIcon />,
      title: 'Analytics',
      link: '/',
    },
    {
      Icon: <GroupsIcon />,
      title: 'Team',
      link: '/',
    },
    {
      Icon: <AdminPanelSettingsIcon />,
      title: 'Admin',
      link: '/',
    },
    {
      Icon: <LiveHelpIcon />,
      title: 'Support',
      link: '/',
    },
  ]
  return (
    <SidebarContainer>
      <List>
        {generalSidebarItems.map((props) => (
          <SidebarItem key={props.title} {...props} />
        ))}
      </List>
      <Divider />
      <List>
        {employeeSidebarItems.map((props) => (
          <SidebarItem key={props.title} {...props} />
        ))}
      </List>
      <Divider />
      <Typography
        variant="caption"
        sx={{ p: 2, color: theme.palette.grey[600] }}
      >
        Allright received by wetbat 2023 ©
      </Typography>
    </SidebarContainer>
  )
}

export default Sidebar
