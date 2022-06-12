import Link from 'next/link'

interface IDropdownItem {
    title: string
    url: string
}

export interface IDropdownCol {
    root: IDropdownItem
    children: Array<IDropdownItem>
}

interface IDropdownProps {
    data: Array<IDropdownCol>
}

const Dropdown: React.FC<IDropdownProps> = ({ data }) => {
    return (
        <div className="pt-6 pb-8 flex justify-center bg-white absolute top-[200%] left-0 w-full opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:top-full transition-all duration-500">
            <ul className="flex gap-x-10">
                <li>
                    <Link href="/categories">
                        <a className="hover:text-primary hover:border-primary transition-colors duration-300 min-w-[120px] block text-base font-semibold border-b-2 border-black">
                            Tất cả
                        </a>
                    </Link>
                </li>
                {data.map(({ root, children }, index) => (
                    <li key={index}>
                        <Link href={root.url}>
                            <a className="hover:text-primary hover:border-primary transition-colors duration-300 min-w-[120px] block text-base font-semibold border-b-2 border-black">
                                {root.title}
                            </a>
                        </Link>
                        <ul className="mt-4 w-full">
                            {children.map((item, index) => (
                                <li className="mb-[6px]" key={index}>
                                    <Link href={item.url}>
                                        <a className="hover:text-primary hover:border-primary text-[rgba(0,0,0,0.6)] text-sm  transition-colors duration-300">
                                            {item.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown
