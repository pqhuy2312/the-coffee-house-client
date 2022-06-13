import { GetServerSideProps } from 'next'
import { requiredAuth } from 'utils'

const Index = () => {
    return null
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

export default Index
