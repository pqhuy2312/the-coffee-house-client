import { GetServerSideProps } from 'next'
import React from 'react'
import { requiredAuth } from 'utils'

const Dashboard = () => {
    return <div>Dashboard</div>
}

export const getServerSideProps: GetServerSideProps = requiredAuth(
    async () => {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false,
            },
        }
    },
    { role: 'ADMIN' },
)

export default Dashboard
