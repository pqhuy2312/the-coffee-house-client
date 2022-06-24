import Layout from 'components/Layout'
import React, { ReactElement } from 'react'

const DetailProduct = () => {
    return <div>DetailProduct</div>
}

DetailProduct.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default DetailProduct
