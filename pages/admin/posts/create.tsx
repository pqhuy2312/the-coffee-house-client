import { yupResolver } from '@hookform/resolvers/yup'
import AdminLayout from 'components/AdminLayout'
import ChooseImages from 'components/ChooseImages'
import EditorField from 'components/EditorField'
import TextField from 'components/TextField'
import { ReactElement, useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { ICreatePostParams, ICreateStoreParams } from 'types'
import { imageUpload, imageUploads } from 'utils'
import * as yup from 'yup'
import { postsApi, storesApi, tagsApi } from 'api'
import SelectField from 'components/SelectField'
import DropImageInput from 'components/DropImageInput'
import { topicsApi } from 'api/topics'

const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    topicId: yup.number().min(1).required('topic id is required'),

    content: yup.string().required('content is required'),
})

const Create = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<ICreatePostParams>({ resolver: yupResolver(schema) })
    const { data: tags } = useQuery('tags', tagsApi.getTags)
    const { data: topics } = useQuery('topics', topicsApi.getTopics)
    const thumbnailRef = useRef<any>(null)

    const mutation = useMutation('createPost', postsApi.createPost)

    const onSubmit = async (data: ICreatePostParams) => {
        try {
            const file = thumbnailRef.current.getFile()
            if (!file) return
            const thumbnail = (await imageUpload(file))?.secure_url as string
            const res = await mutation.mutateAsync({
                ...data,
                thumbnail,
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            reset()
        }
    }

    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">
                Create new post
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Topic
                    </label>

                    <Controller
                        name="topicId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <SelectField
                                options={
                                    topics?.map((topic) => ({
                                        value: topic.id,
                                        label: topic.title,
                                    })) || []
                                }
                                selected={
                                    topics && {
                                        label: topics[0].title,
                                        value: topics[0].id,
                                    }
                                }
                                field={field}
                            />
                        )}
                    />
                    {errors.topicId?.message && (
                        <span className="text-invalid mt-1 text-sm">
                            {errors.topicId?.message}
                        </span>
                    )}
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Tag
                    </label>

                    <Controller
                        name="tagId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <SelectField
                                options={
                                    tags?.map((tag) => ({
                                        value: tag.id,
                                        label: tag.title,
                                    })) || []
                                }
                                selected={
                                    tags && {
                                        label: tags[0].title,
                                        value: tags[0].id,
                                    }
                                }
                                field={field}
                            />
                        )}
                    />
                    {errors.tagId?.message && (
                        <span className="text-invalid mt-1 text-sm">
                            {errors.tagId?.message}
                        </span>
                    )}
                </div>
                <div className="mb-5">
                    <TextField
                        name="title"
                        label="Title *"
                        register={register('title')}
                        error={errors.title?.message}
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
                <div className="mb-5 max-w-[500px]">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Thumbnail*
                    </label>

                    <DropImageInput ref={thumbnailRef} />
                </div>
                <div className="mb-5">
                    <label className="text-sm mb-1 block text-[#222] font-bold">
                        Content*
                    </label>

                    <Controller
                        name="content"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <EditorField
                                field={field}
                                error={errors.content?.message}
                                className="h-[400px]"
                            />
                        )}
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
