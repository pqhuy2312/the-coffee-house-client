import { ReactElement } from 'react'
import Layout from 'components/Layout'

const Home = () => {
    return <div className="text-red-500">hi</div>
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
