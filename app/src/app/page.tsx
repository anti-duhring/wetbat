import { Metadata } from 'next'
import { Dashboard } from './features/Home'

// Reference: https://nextjs.org/docs/messages/react-hydration-error
// const Dashboard = dynamic(() => import('./features/Home/components/Dashboard'), { ssr: false })

export const metadata: Metadata = {
  title: 'WetBat travel',
  description:
    'Discover the world with Wet Bat, a leading national travel agency chain. Explore our diverse range of tour services offered in 50 countries, providing unforgettable experiences for thousands of families each year.',
}

export default function Home() {
  return <Dashboard />
}
