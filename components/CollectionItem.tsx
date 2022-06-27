import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMenuItem } from 'types'
import coffee from 'assets/images/coffee.svg'
import coffeeBlack from 'assets/images/coffee-black.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface ICollectionItemProps {
    category: IMenuItem
}

const CollectionItem: React.FC<ICollectionItemProps> = ({
    category: { root, children = [] },
}) => {
    const [show, setShow] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (router.asPath) {
            if (root.url === router.asPath) {
                setActive(true)
                return
            } else {
                for (const item of children) {
                    if (item.url === router.asPath) {
                        setActive(true)
                        return
                    }
                }
            }

            setActive(false)
        }
    }, [router.asPath])

    return (
        <li
            style={{
                height: show ? 28 * (children.length + 1) : 28,
            }}
            className={`transition-all duration-300 overflow-hidden`}
        >
            <Link href={root.url}>
                <a
                    className={`pl-[26px] mb-2 ${
                        active
                            ? `text-base font-semibold ${
                                  router.asPath === root.url
                                      ? 'text-primary'
                                      : 'text-[#191919]'
                              }`
                            : 'text-sm text-gray-500'
                    } transition-all  relative inline-block `}
                    title={root.title}
                    onClick={() => setShow(!show)}
                >
                    {root.title}
                    {active && (
                        <div className="absolute left-0 w-4 h-4 top-1/2 -translate-y-1/2">
                            <Image
                                src={
                                    router.asPath === root.url
                                        ? coffee
                                        : coffeeBlack
                                }
                                layout="fill"
                            />
                        </div>
                    )}
                </a>
            </Link>
            {children.length > 0 && (
                <ul>
                    {children.map((item, index) => (
                        <li key={index}>
                            <Link href={item.url}>
                                <a
                                    className={`pl-6 ml-6 mb-2 text-sm relative dot  ${
                                        router.asPath === item.url
                                            ? 'text-primary'
                                            : 'text-gray-500'
                                    }`}
                                    title={item.title}
                                >
                                    {item.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

export default CollectionItem
