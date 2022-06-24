import { IImageUploaded } from 'types'

export const imageUpload = async (
    image: File,
): Promise<IImageUploaded | null> => {
    if (image === undefined) return null

    const formData = new FormData()

    formData.append('file', image)

    formData.append('upload_preset', 'vazjsn9l')
    formData.append('cloud_name', 'huyphamcloud')

    const res = await (
        await fetch('https://api.cloudinary.com/v1_1/huyphamcloud/upload', {
            method: 'POST',
            body: formData,
        })
    ).json()

    return { public_id: res.public_id, secure_url: res.secure_url }
}
