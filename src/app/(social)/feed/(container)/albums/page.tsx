import type { Metadata } from 'next'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import AllPhotos from './components/AllPhotos'

export const metadata: Metadata = { title: 'Photos' }

const Albums = () => {
  return (
    <Col md={8} lg={6} className="vstack gap-4">
      <AllPhotos />
    </Col>
  )
}
export default Albums
