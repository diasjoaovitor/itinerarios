import { Suspense } from 'react'
import { Layout } from './components'
import Loading from './loading'

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>Home</Layout>
    </Suspense>
  )
}

export default Home
