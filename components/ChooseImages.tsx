import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { BsUpload } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { InputChange } from 'types'
import { IoMdClose } from 'react-icons/io'

interface IChooseImagesProps {
    images: Array<File>
    setImages: (files: Array<File>) => void
    className?: string
}

const ChooseImages: React.FC<IChooseImagesProps> = ({
    images,
    setImages,
    className,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [blobs, setBlobs] = useState<string[]>([])

    useEffect(() => {
        setBlobs(
            images.map((image) =>
                typeof image == 'string' ? image : URL.createObjectURL(image),
            ),
        )
    }, [images])

    const handleFilesChange = (e: InputChange) => {
        const files: FileList | null = (e.target as HTMLInputElement).files
        if (!files || files.length == 0) return

        Array.from(files).forEach((file) => {
            if (!file.type.match('image.*')) {
                return toast.error('File type invalid', {
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                })
            }
        })

        setImages([...images, ...(files as unknown as Array<File>)])
        inputRef.current && (inputRef.current.value = '')
    }

    const handleRemoveImage = (index: number) =>
        setImages(images.filter((_, i) => i != index))

    return (
        <div className={className}>
            <div
                onClick={() => inputRef.current && inputRef.current.click()}
                className="primary-btn px-4 select-none inline-flex items-center mt-1"
            >
                <BiUpload className="mr-2 text-2xl" />
                Choose files
            </div>
            <input
                onChange={handleFilesChange}
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                multiple
            />
            <div className="grid gap-2 grid-cols-2 mt-4">
                {blobs.map((item, index) => (
                    <div key={index} className="pt-[56.25%] relative">
                        <span
                            onClick={handleRemoveImage.bind(this, index)}
                            className="text-white cursor-pointer z-10 p-1 rounded-full bg-primary absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
                        >
                            <IoMdClose className="text-xl" />
                        </span>
                        <Image src={item} layout="fill" objectFit="cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ChooseImages)
