import { Col } from 'react-bootstrap'
import AllGroupDetails from './components/page'
import type { Metadata } from 'next'
import { getGroupById } from '@/helpers/data'
import { notFound } from 'next/navigation'

type ParamsGroupId = {
  params: {
    groupId: string
  }
}

export const generateMetadata = async ({ params }: ParamsGroupId): Promise<Metadata> => {
  const group = await getGroupById(params.groupId)
  return { title: group?.id ?? 'Group Details' }
}

const GroupDetails = async ({ params }: ParamsGroupId) => {
  const group = await getGroupById(params.groupId)
  if (!group) notFound()
  return (
    <Col md={8} lg={8} className="vstack gap-4">
      <AllGroupDetails />
    </Col>
  )
}
export default GroupDetails
