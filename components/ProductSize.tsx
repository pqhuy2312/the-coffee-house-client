import React, { memo, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { InputChange } from 'types'

export interface ISize {
    name: string
    price: number
}

interface IProductSizeProps {
    sizes: ISize[]
    setSizes: (size: ISize[]) => void
}

const ProductSize: React.FC<IProductSizeProps> = ({ sizes, setSizes }) => {
    const [errors, setErrors] = useState<{ name: string; price: string }>({
        name: '',
        price: '',
    })
    const [size, setSize] = useState<ISize>({
        name: '',
        price: 0,
    })
    const { name, price } = size

    const handleChange = (e: InputChange) => {
        const name = e.target.name
        setSize({
            ...size,
            [name]:
                name === 'price' ? parseInt(e.target.value) : e.target.value,
        })
    }

    const handleAddSize = () => {
        let flag = false
        const newErrors = { ...errors }
        if (!size.name) {
            newErrors.name = 'Please enter name size'
            flag = true
        } else {
            newErrors.name = ''
        }
        if (!size.price || size.price == 0) {
            newErrors.price = 'Please enter price'
            flag = true
        } else {
            newErrors.price = ''
        }
        if (flag) {
            setErrors(newErrors)
            return
        }
        setSizes([...sizes, size])
        setSize({
            name: '',
            price: 0,
        })
        setErrors({
            name: '',
            price: '',
        })
    }
    return (
        <div>
            <label className="text-sm mb-1 block text-[#222] font-bold">
                Sizes
            </label>
            <div className="flex flex-col gap-y-2">
                <input
                    type="text"
                    value={name}
                    className="text-field"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                />
                {errors.name && (
                    <span className="text-invalid mt-1 text-sm">
                        {errors.name}
                    </span>
                )}
                <input
                    type="number"
                    className="text-field"
                    placeholder="Price"
                    onChange={handleChange}
                    name="price"
                    value={price}
                />
                {errors.price && (
                    <span className="text-invalid mt-1 text-sm">
                        {errors.price}
                    </span>
                )}
                <div
                    onClick={handleAddSize}
                    className="px-4 primary-btn ml-auto"
                >
                    Add size
                </div>
            </div>
            <div className="mt-5">
                {sizes.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-100 mb-2 rounded-lg"
                    >
                        <span>{`${
                            item.name
                        } - ${item.price.toLocaleString()}đ`}</span>
                        <span
                            onClick={() =>
                                setSizes(sizes.filter((_, i) => i != index))
                            }
                            className="text-white cursor-pointer z-10 p-1 rounded-full bg-primary"
                        >
                            <IoMdClose className="text-xl" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ProductSize)
