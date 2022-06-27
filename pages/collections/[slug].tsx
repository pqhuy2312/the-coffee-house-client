import { categoriesApi } from 'api'
import CollectionsLayout from 'components/CollectionsLayout'
import MenuBlock from 'components/MenuBlock'
import { useRouter } from 'next/router'
import React, { Fragment, ReactElement } from 'react'
import { useQuery } from 'react-query'

const Collection = () => {
    const router = useRouter()
    const { data: category } = useQuery(
        ['category', router.query?.slug],
        () => categoriesApi.getCategoryBySlug(router.query?.slug as string),
        {
            enabled: !!router.query?.slug,
        },
    )
    return (
        <div>
            {category?.parentId ? (
                <MenuBlock title={category.title} slug={category.slug} />
            ) : (
                category?.children?.map((item) => (
                    <Fragment key={item.id}>
                        <MenuBlock title={item.title} slug={item.slug} />
                    </Fragment>
                ))
            )}
        </div>
    )
}

Collection.getLayout = (page: ReactElement) => (
    <CollectionsLayout>{page}</CollectionsLayout>
)

export default Collection
