import { ReactNode } from 'react'

import Header from './Header'

interface ILayout {
    children: ReactNode
}

const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className="h-[2000px]">
            <Header />
            <main>{children}</main>
        </div>
    )
}

export default Layout
