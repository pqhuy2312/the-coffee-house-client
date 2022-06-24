import MarkdownIt from 'markdown-it'
import mila from 'markdown-it-link-attributes'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import 'react-markdown-editor-lite/lib/index.css'
import { imageUpload } from 'utils'

export const mdParser: any = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
}).use(mila, {
    attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
    },
})

export function renderHTML(text: string) {
    return mdParser.render(text)
}

function onImageUpload(file: File) {
    return new Promise((resolve) => {
        imageUpload(file).then((res) => resolve(res?.secure_url))
    })
}

const MdEditor = dynamic<any>(() => import('react-markdown-editor-lite'), {
    ssr: false,
})

interface IEditorFieldProps {
    className?: string
    initValue?: string
    field: ControllerRenderProps<any, any>
    error?: string
}

const EditorField: React.FC<IEditorFieldProps> = ({
    className,
    initValue = '',
    field,
    error,
}) => {
    const [value, setValue] = useState<string>(initValue)
    const handleEditorChange = ({ text }: { text: string }) => {
        setValue(text)
        field.onChange(text)
    }
    return (
        <div>
            <MdEditor
                className={className}
                value={value}
                onChange={handleEditorChange}
                renderHTML={renderHTML}
                onImageUpload={onImageUpload}
            />
            {error && (
                <span className="text-invalid mt-1 text-sm">{error}</span>
            )}
        </div>
    )
}

export default EditorField
