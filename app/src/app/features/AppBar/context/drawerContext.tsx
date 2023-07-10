import { ReactNode, createContext, useState } from 'react'
import { useMediaQuery, Box, styled } from '@mui/material'
import theme from '@/app/core/theme'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Drawer from '../components/Drawer'

type TDrawerContext = {
  isOpen: boolean
  isMediaQueryAboveSm: boolean
  toggleDrawer: () => void
}

export const DrawerContext = createContext<TDrawerContext>({
  isOpen: false,
  isMediaQueryAboveSm: true,
  toggleDrawer: () => {},
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const DrawerOrSidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'))

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <DrawerContext.Provider
      value={{ isOpen, toggleDrawer, isMediaQueryAboveSm }}
    >
      <Navbar />
      <Box component="main">
        <DrawerHeader />
        {isMediaQueryAboveSm ? <Sidebar /> : <Drawer />}
      </Box>
    </DrawerContext.Provider>
  )
}
