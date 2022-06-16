import { ReactElement } from 'react'
import Layout from 'components/Layout'
import Banner from 'components/Banner'
import HomeMenu from 'components/HomeMenu'
import HomeBrand from 'components/HomeBrand'

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeMenu />
            <HomeBrand />
        </div>
    )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
