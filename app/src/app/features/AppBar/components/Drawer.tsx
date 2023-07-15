'use client'

import { Drawer as DrawerEl } from '@mui/material'
import { Divider, List, styled, Typography } from '@mui/material'

import {
  employeeSidebarItems,
  generalSidebarItems,
} from '../utils/sidebarItems'
import DrawerAndSidebarItem from './DrawerAndSiderbarItem'
import theme from '@/app/core/theme'
import { useContext } from 'react'
import { DrawerContext } from '../context/drawerContext'

const Drawer = () => {
  const { isOpen, toggleDrawer } = useContext(DrawerContext)
  return (
    <DrawerEl
      open={isOpen}
      onClose={toggleDrawer}
      ModalProps={{ keepMounted: true }}
    >
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
    </DrawerEl>
  )
}

export default Drawer
