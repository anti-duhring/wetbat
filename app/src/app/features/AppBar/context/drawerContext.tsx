import { createContext, useState } from 'react'
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

const Header = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const DrawerOrSidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <DrawerContext.Provider
      value={{ isOpen, toggleDrawer, isMediaQueryAboveSm }}
    >
      <Navbar />
      <Box>
        <Header />
        {isMediaQueryAboveSm ? <Sidebar /> : <Drawer />}
      </Box>
    </DrawerContext.Provider>
  )
}
