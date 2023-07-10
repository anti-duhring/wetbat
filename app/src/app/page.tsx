
import { Metadata } from 'next'
import { Welcome } from './features/Home'

export const metadata: Metadata = {
  title: 'WetBat travel',
  description:
    'Discover the world with Wet Bat, a leading national travel agency chain. Explore our diverse range of tour services offered in 50 countries, providing unforgettable experiences for thousands of families each year.',
}

export default function Home() {
  return (
    <>
      <Welcome />
    </>
  )
}
