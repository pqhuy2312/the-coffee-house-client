import AdminLayout from 'components/AdminLayout'
import TextField from 'components/TextField'
import { GetServerSideProps } from 'next'
import { ReactElement, useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ICreateProductParams, InputChange } from 'types'
import { imageUploads } from 'utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectField, { IOptions } from 'components/SelectField'
import { useMutation, useQuery } from 'react-query'
import { categoriesApi } from 'api'
import { BiUpload } from 'react-icons/bi'
import ChooseImages from 'components/ChooseImages'
import { toppingsApi } from 'api'
import ProductSize, { ISize } from 'components/ProductSize'
import EditorField from 'components/EditorField'
import { productsApi } from 'api'

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Product name is required')
        .max(50, 'name tối đa 50 ký tự'),
    price: yup
        .number()
        .typeError('You must specify a number')
        .required('Product price is required')
        .min(1, 'Price must be at least greater than 0'),
    info: yup.string().required('Product info is required'),
    story: yup.string().required('Product story is required'),
})

const Create = () => {
    const { data: categories } = useQuery(
        'categories',
        categoriesApi.getCategories,
    )
    const { data: toppings } = useQuery('toppings', toppingsApi.getToppings)
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<ICreateProductParams>({ resolver: yupResolver(schema) })
    const [images, setImages] = useState<Array<File>>([])
    const [toppingIds, setToppingIds] = useState<number[]>([])
    const [sizes, setSizes] = useState<ISize[]>([])
    const mutation = useMutation('createProduct', productsApi.createProduct)

    const handleChangeSizes = useCallback((size: ISize[]) => setSizes(size), [])

    const handleChangeToppings = (checked: boolean, value: string) => {
        if (checked) {
            setToppingIds([...toppingIds, parseInt(value)])
        } else {
            setToppingIds(toppingIds.filter((item) => item != parseInt(value)))
        }
    }

    const handleChangeImages = useCallback(
        (files: Array<File>) => setImages(files),
        [],
    )

    const CATEGORIES = useMemo(
        () =>
            categories?.reduce((prev: IOptions[], cur) => {
                prev.push({
                    value: cur.id,
                    label: cur.title,
                })
                if (cur.children.length > 0) {
                    prev = [
                        ...prev,
                        ...cur.children.map((item) => ({
                            value: item.id,
                            label: item.title,
                        })),
                    ]
                }

                return prev
            }, []),
        [categories],
    )

    const onSubmit = async (data: ICreateProductParams) => {
        try {
            if (images.length > 0) {
                const imagesUploaded = await imageUploads(images)
                if (imagesUploaded) {
                    data.images = imagesUploaded.map((img) => img.secure_url)
                }
            }
            sizes.length > 0 && (data.sizes = sizes)
            data.toppings = toppingIds
            const res = await mutation.mutateAsync(data)
            console.log(res)
            reset()
            setImages([])
            setToppingIds([])
            setSizes([])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">
                Create new Product
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <TextField
                        name="name"
                        label="Name *"
                        register={register('name')}
                        error={errors.name?.message}
                        className="max-w-[500px]"
                    />
                </div>
                <div className="mb-5">
                    <TextField
                        name="slug"
                        label="Slug"
                        className="max-w-[500px]"
                        register={register('slug')}
                        error={errors.slug?.message}
                    />
                </div>
                <div className="mb-5">
                    <TextField
                        name="price"
                        label="Price *"
                        className="max-w-[500px]"
                        register={register('price')}
                        error={errors.price?.message}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Info*
                    </label>

                    <Controller
                        name="info"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <EditorField
                                field={field}
                                error={errors.info?.message}
                                className="h-[400px]"
                            />
                        )}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Story*
                    </label>

                    <Controller
                        name="story"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <EditorField
                                field={field}
                                error={errors.story?.message}
                                className="h-[400px]"
                            />
                        )}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Category
                    </label>

                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <SelectField
                                options={
                                    CATEGORIES?.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    })) || []
                                }
                                selected={
                                    CATEGORIES && {
                                        label: CATEGORIES[0].label,
                                        value: CATEGORIES[0].value,
                                    }
                                }
                                field={field}
                            />
                        )}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Images
                    </label>
                    <ChooseImages
                        images={images}
                        setImages={handleChangeImages}
                        className="max-w-[500px]"
                    />
                </div>
                <div className="mb-5 max-w-[500px]">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Toppings
                    </label>
                    <div>
                        {toppings?.map((topping) => (
                            <div className="mt-1" key={topping.id}>
                                <label>
                                    <input
                                        onChange={(e: any) =>
                                            handleChangeToppings(
                                                e.target.checked,
                                                e.target.value,
                                            )
                                        }
                                        type="checkbox"
                                        value={topping.id}
                                    />
                                    <span className="ml-2">{`${
                                        topping.name
                                    } (${topping.price.toLocaleString()}đ)`}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-5 max-w-[500px]">
                    <ProductSize sizes={sizes} setSizes={handleChangeSizes} />
                </div>
                <button className="primary-btn px-4" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

Create.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Create
