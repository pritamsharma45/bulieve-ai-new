import type { Metadata } from 'next'
import DiscoverEvents from './components/DiscoverEvents'
import Hero from './components/Hero'

export const metadata: Metadata = { title: 'Events 2' }

const Events = () => {
  return (
    <main>
      <Hero />
      <DiscoverEvents />
    </main>
  )
}
export default Events
