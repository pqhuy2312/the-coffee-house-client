import Image from 'next/image'
import { ReactNode } from 'react'

interface ILayout {
    children: ReactNode
}

const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className="bg-[#F9FAFB]">
            <div className="p-6">
                <div className="min-h-[659px] h-screen max-w-4xl mx-auto rounded-2xl overflow-hidden flex shadow-lg">
                    <div className="flex-1 relative">
                        <Image
                            src="https://file.hstatic.net/1000075078/file/_kh_9748_44d9e63ab1df4fdb99261c49fa71c1c8_master.jpg"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex-1 p-12">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout
