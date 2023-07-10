import theme from '@/app/core/theme'
import { Divider, List, styled, Typography } from '@mui/material'

import {
  employeeSidebarItems,
  generalSidebarItems,
} from '../utils/sidebarItems'
import DrawerAndSidebarItem from './DrawerAndSiderbarItem'

const SidebarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  height: '100%',
}))

const Sidebar = () => {
  return (
    <SidebarContainer>
      <List>
        {generalSidebarItems.map(({ Icon, ...props }) => (
          <DrawerAndSidebarItem key={props.title} Icon={<Icon />} {...props} />
        ))}
      </List>
      <Divider />
      <List>
        {employeeSidebarItems.map(({ Icon, ...props }) => (
          <DrawerAndSidebarItem key={props.title} Icon={<Icon />} {...props} />
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