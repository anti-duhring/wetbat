'use client'

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
  position: 'fixed',
  minWidth: '200px',
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
        variant="body1"
        fontSize={12}
        sx={{
          p: 2,
          textAlign: 'center',
          color: theme.palette.grey[600],
        }}
      >
        Allright received by wetbat 2023©
      </Typography>
    </SidebarContainer>
  )
}

export default Sidebar
