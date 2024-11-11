import Image from 'next/image'
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Fragment } from 'react'
import { BsCalendarDate, BsClock } from 'react-icons/bs'
import ReplyForm from './components/ReplyForm'
import { commentsData } from './data'

import blogImg from '@/assets/images/post/16by9/big/03.jpg'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogById } from '@/helpers/data'
import Footer from './components/Footer'
import { unstable_noStore as noStore } from "next/cache";
import prisma from '@/lib/db'

type ParamsNewsId = {
  params: {
    newsId: string
  }
}

async function getData(newsId:string) {
  noStore();
  const data = await prisma.processed_macro_economy_articles.findFirst({
    where:{
      id:parseInt(newsId)
    },
    select: {
      title: true,
      link: true,
      summary: true,
      published_at: true,
      id:true
    },
  }

  )
  return data;
}

export const generateMetadata = async ({ params }: ParamsNewsId): Promise<Metadata> => {
  const news = await getData(params.newsId)
  return { title: news?.title ?? 'News' }
}

const BlogDetails = async ({ params }: ParamsNewsId) => {
  const news = await getData(params.newsId)
  console.log(news);
  if (!news) notFound()
  return (
    <>
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="mx-auto">
              <div className="vstack gap-4">
                <Card className="card-body">
                  <Image className="rounded" src={blogImg} alt="blog" />
                  <div className="mt-4">
                    {/* <Link href="" className="badge bg-danger bg-opacity-10 text-danger mb-2 fw-bold">
                      Lifestyle
                    </Link> */}
                    <h1 className="mb-2 h2">{news.title}</h1>
                    <ul className="nav nav-stack gap-3 align-items-center">
                      {/* <li className="nav-item">
                        <div className="nav-link">
                          by{' '}
                          <Link href="" className="text-reset btn-link">
                            Louis Ferguson
                          </Link>
                        </div>
                      </li> */}
                      <li className="nav-item">
                        {' '}
                        <BsCalendarDate size={20} className="pe-1" />
                        {news.published_at?.toLocaleTimeString()}
                      </li>
                      {/* <li className="nav-item">
                        {' '}
                        <BsClock size={20} className="pe-1" />5 min read
                      </li> */}
                    </ul>
                    <figure className="bg-light rounded p-3 p-sm-4 my-4">
                      <h5>AI Summary</h5>
                      <blockquote >
                        <p> {news.summary}</p>
                      </blockquote>
                      {/* <figcaption className="blockquote-footer mb-0">Albert Schweitzer</figcaption> */}
                    </figure>
                    <p className="mb-0">
                    <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  Read full article
                </a>
                    </p>
                  </div>
                </Card>
                <Card>
                  <CardHeader className="pb-0 border-0">
                    <h4>5 comments</h4>
                  </CardHeader>
                  <CardBody>
                    {commentsData.map((comment, idx) => {
                      return (
                        <Fragment key={idx}>
                          <div className="my-4 d-flex">
                            <Image className="avatar avatar-md rounded-circle float-start me-3" src={comment.avatar} alt="avatar" />
                            <div>
                              <div className="mb-2 d-sm-flex">
                                <h6 className="m-0 me-2">{comment.name}</h6>
                                <span className="me-3 small">
                                  {comment.createdAt.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} at{' '}
                                  {comment.createdAt.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}{' '}
                                </span>
                              </div>
                              <p>{comment.comment}</p>
                              <Button variant="light" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                          {comment.reply &&
                            comment.reply.map((reply, idx) => (
                              <div className="my-4 d-flex ps-3 ps-md-5" key={idx}>
                                <Image className="avatar avatar-md rounded-circle float-start me-3" src={reply.avatar} alt="avatar" />
                                <div>
                                  <div className="mb-2 d-sm-flex">
                                    <h6 className="m-0 me-2">{reply.name}</h6>
                                    <span className="me-3 small">
                                      {reply.createdAt.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} at{' '}
                                      {reply.createdAt.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}{' '}
                                    </span>
                                  </div>
                                  <p>{reply.comment} </p>
                                  <Button variant="light" size="sm">
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </Fragment>
                      )
                    })}
                    <hr className="my-4" />
                    <div>
                      <h4>Leave a reply</h4>
                      <ReplyForm />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  )
}
export default BlogDetails