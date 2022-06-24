import { InputChange } from 'types'
import {
    DragEventHandler,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { toast } from 'react-toastify'

const DropImageInput = forwardRef<any, any>((_, ref) => {
    const [isDragEnter, setIsDragEnter] = useState<boolean>(false)
    const [file, setFile] = useState<File>()
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [blob, setBlob] = useState<string>('')

    useImperativeHandle(ref, () => ({
        getFile() {
            return file
        },
    }))

    useEffect(() => {
        if (file) {
            setBlob(URL.createObjectURL(file))
        }

        return () => {
            URL.revokeObjectURL(blob)
        }
    }, [file])

    const onDragLeave = () => {
        setIsDragEnter((_) => false)
    }

    const onDragEnter = () => {
        setIsDragEnter((_) => true)
    }

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        setIsDragEnter((_) => false)
        const newFile = e.dataTransfer.files?.[0]
        if (newFile) {
            if (!newFile.type.match('image.*')) {
                toast.error('Chỉ chấp nhận file ảnh!', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                })
            } else {
                setFile(newFile)
            }
        }
    }

    const onFileChange = (e: InputChange) => {
        const newFile = (e.target as HTMLInputElement).files?.[0]
        if (newFile) {
            if (!newFile.type.match('image.*')) {
                toast.error('Chỉ chấp nhận file ảnh!', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                })
            } else {
                inputFileRef.current &&
                    ((inputFileRef.current as any).value = null)
                setFile(newFile)
            }
        }
    }

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
        }

        window.addEventListener('dragover', handler)
        window.addEventListener('drop', handler)

        return () => {
            window.removeEventListener('dragover', handler)
            window.removeEventListener('drop', handler)
        }
    }, [])

    return (
        <div
            style={
                {
                    '--bg': `url(${blob})`,
                } as any
            }
            onClick={() => inputFileRef.current && inputFileRef.current.click()}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={`${
                blob ? 'before-bg-file' : ''
            } relative p-6 cursor-pointer border-2 border-dashed border-blue-600 h-[200px] bg-[#fafafa] flex flex-col items-center text-sm leading-[1.6] select-none`}
        >
            <input
                ref={inputFileRef}
                onChange={onFileChange}
                type="file"
                accept="image/*"
                hidden
            />
            <p className="text-center my-3 pointer-events-none">
                Choose thumbnail for your post.
            </p>
            <p className="text-center pointer-events-none">
                {isDragEnter
                    ? 'Drop photos here'
                    : 'Drag and drop photos here, or click to select photos'}
            </p>
        </div>
    )
})

DropImageInput.displayName = 'DropImageInput'

export default DropImageInput
