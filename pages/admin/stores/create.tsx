import { yupResolver } from '@hookform/resolvers/yup'
import AdminLayout from 'components/AdminLayout'
import ChooseImages from 'components/ChooseImages'
import EditorField from 'components/EditorField'
import TextField from 'components/TextField'
import { ReactElement, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { ICreateStoreParams } from 'types'
import { imageUploads } from 'utils'
import * as yup from 'yup'
import { storesApi } from 'api'

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    address: yup.string().required('Address is required'),
    openAt: yup
        .string()
        .required('OpenAt is required')
        .matches(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            'Open at invalid. (ex: 7:00)',
        ),
    closeAt: yup
        .string()
        .required('CloseAt is required')
        .matches(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            'Close at invalid. (ex: 19:00)',
        ),
})

const Create = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<ICreateStoreParams>({ resolver: yupResolver(schema) })
    const [images, setImages] = useState<Array<File>>([])
    const mutation = useMutation('createStore', storesApi.createStore)

    const handleChangeImages = useCallback(
        (files: Array<File>) => setImages(files),
        [],
    )

    const onSubmit = async (data: ICreateStoreParams) => {
        try {
            if (images.length > 0) {
                const imagesUploaded = await imageUploads(images)
                if (imagesUploaded) {
                    data.images = imagesUploaded.map((img) => img.secure_url)
                }
            }
            const res = await mutation.mutateAsync(data)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            reset()
            setImages([])
        }
    }

    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">
                Create new Store
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
                        name="address"
                        label="Address *"
                        className="max-w-[500px]"
                        register={register('address')}
                        error={errors.address?.message}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Description*
                    </label>

                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <EditorField
                                field={field}
                                error={errors.description?.message}
                                className="h-[400px]"
                            />
                        )}
                    />
                </div>
                <div className="mb-5">
                    <TextField
                        name="openAt"
                        label="Open At (ex: 7:00) *"
                        className="max-w-[500px]"
                        register={register('openAt')}
                        error={errors.openAt?.message}
                    />
                </div>
                <div className="mb-5">
                    <TextField
                        name="closeAt"
                        label="Close At (ex: 19:00) *"
                        className="max-w-[500px]"
                        register={register('closeAt')}
                        error={errors.closeAt?.message}
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

                <button className="primary-btn px-4" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

Create.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Create
