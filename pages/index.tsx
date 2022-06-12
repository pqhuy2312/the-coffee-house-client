import { ReactElement } from 'react'
import Layout from 'components/Layout'
import Banner from 'components/Banner'

const Home = () => {
    return (
        <div className="h-[2000px]">
            <Banner />
        </div>
    )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
