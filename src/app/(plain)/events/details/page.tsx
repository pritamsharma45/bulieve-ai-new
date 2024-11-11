import type { Metadata } from 'next'
import Footer from './components/Footer'
import Hero from './components/Hero'
import OverView from './components/OverView'
import Topbar from './components/Topbar'

export const metadata: Metadata = { title: 'Event Details 2' }

const EventDetails = () => {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <OverView />
      </main>
      <Footer />
    </>
  )
}
export default EventDetails
