import { ReactElement } from 'react'
import Layout from 'components/Layout'
import Banner from 'components/Banner'
import HomeMenu from 'components/HomeMenu'
import HomeBrand from 'components/HomeBrand'
import HomeStore from 'components/HomeStore'
import HomeBlog from 'components/HomeBlog'

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeMenu />
            <HomeBrand />
            <HomeStore />
            <HomeBlog />
        </div>
    )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
