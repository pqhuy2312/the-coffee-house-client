import { GetServerSideProps } from 'next'
import { requiredAuth } from 'utils'

const Index = () => {
    return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: {
            destination: '/admin/dashboard',
            permanent: false,
        },
    }
}

export default Index
