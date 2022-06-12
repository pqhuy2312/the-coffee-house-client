import { UseFormRegisterReturn } from 'react-hook-form'

interface ITextFieldProps {
    name: string
    label: string
    type?: 'text' | 'password'
    error?: string
    placeholder?: string
    className?: string
    register: UseFormRegisterReturn
}

const TextField: React.FC<ITextFieldProps> = ({
    name,
    register,
    label,
    type = 'text',
    error,
    placeholder,
    className,
}) => {
    return (
        <div className={className}>
            <label
                className="text-sm mb-1 block text-[#222] font-bold"
                htmlFor={name}
            >
                {label}
            </label>
            <input
                {...register}
                placeholder={placeholder}
                className="block w-full px-3 input-shadow text-[#333] h-12 border border-gray-200 bg-gray-100 text-base focus:bg-white rounded-md transition-colors"
                type={type}
                name={name}
            />
            {error && (
                <span className="text-invalid mt-1 text-sm">{error}</span>
            )}
        </div>
    )
}

export default TextField
