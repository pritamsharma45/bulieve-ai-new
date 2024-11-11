import type { Metadata } from 'next'
import AllPosts from './components/AllPosts'
import Hero from './components/Hero'

export const metadata: Metadata = { title: 'Post Home' }

const Posts = () => {
  return (
    <main className="pt-5">
      <Hero />

      <AllPosts />
    </main>
  )
}

export default Posts
