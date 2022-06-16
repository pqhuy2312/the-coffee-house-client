import AdminLayout from 'components/AdminLayout'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'
import { requiredAuth } from 'utils'

const Dashboard = () => {
    return <div>Dashboard</div>
}

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
