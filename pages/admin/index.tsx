import { GetServerSideProps } from 'next'
import { requiredAuth } from 'utils'

const Index = () => {
    return null
}

export const getServerSideProps: GetServerSideProps = requiredAuth(
    async () => {
        return {
            props: {},
        }
    },
    { role: 'ADMIN' },
)

export default Index
