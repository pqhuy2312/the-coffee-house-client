import { IImageUploaded } from 'types'

export const imageUploads = async (images: Array<File>) => {
    let imgArr: IImageUploaded[] = []
    if (images === undefined) return
    for (const item of images) {
        const formData = new FormData()

        formData.append('file', item)

        formData.append('upload_preset', 'vazjsn9l')
        formData.append('cloud_name', 'huyphamcloud')

        const res = await (
            await fetch('https://api.cloudinary.com/v1_1/huyphamcloud/upload', {
                method: 'POST',
                body: formData,
            })
        ).json()

        imgArr.push({ public_id: res.public_id, secure_url: res.secure_url })
    }
    return imgArr
}
