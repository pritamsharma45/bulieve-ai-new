import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Stories from './components/Stories'
import Feeds from './components/Feeds'
import Followers from './components/Followers'
import CreatePostCard from '@/components/cards/CreatePostCard'
import Link from 'next/link'
import LoadContentButton from '@/components/LoadContentButton'
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db"
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Default Home' }
async function getData() {
  noStore();
  const data = await prisma.processed_macro_economy_articles.findMany({
    select: {
      id: true,
      title: true,
      link: true,
      summary: true,
      published_at: true,

    },
  });
  return data;
}


const Home = async() => {
  const allNewsItems = await getData();
  console.log(allNewsItems[0]);
  return (
    <>
      <Col md={8} lg={6} className="vstack gap-4">
        <Stories />
        <CreatePostCard />
        <Feeds />
      </Col>

      <Col lg={3}>
        <Row className="g-4">
          <Col sm={6} lg={12}>
            <Followers />
          </Col>

          <Col sm={6} lg={12}>
            <Card>
              <CardHeader className="pb-0 border-0">
                <CardTitle className="mb-0">Today’s news</CardTitle>
              </CardHeader>
              <CardBody>
            {
              allNewsItems.map((news,index)=>(
                <div className="mb-3" key={index}>
                  <h6 className="mb-0">
                    <Link href={`/news/${news.id}`}>{news.title}</Link>
                  </h6>
                  <small>2hr</small>
                </div>
              ))
            }
                {/* <div className="mb-3">
                  <h6 className="mb-0">
                    <Link href="/blogs/details">Ten questions you should answer truthfully</Link>
                  </h6>
                  <small>2hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link href="/blogs/details">Five unbelievable facts about money</Link>
                  </h6>
                  <small>3hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link href="/blogs/details">Best Pinterest Boards for learning about business</Link>
                  </h6>
                  <small>4hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link href="/blogs/details">Skills that you can learn from business</Link>
                  </h6>
                  <small>6hr</small>
                </div> */}

                <LoadContentButton name="View all latest news" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Home
