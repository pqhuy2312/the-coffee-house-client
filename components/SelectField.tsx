import { memo, useEffect, useMemo, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import Select, { Options } from 'react-select'

export interface IOptions {
    value: any
    label: string
}

interface ISelectFieldProps {
    options: IOptions[]
    styles?: { [key: string]: any }
    width?: number
    selected?: IOptions
    field?: ControllerRenderProps<any, any>
    placeholder?: string
}

const SelectField: React.FC<ISelectFieldProps> = ({
    options,
    styles,
    width,
    selected,
    field,
    placeholder,
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(selected ?? null)

    const customStyles = useMemo(() => {
        return (
            styles ?? {
                menu: (provided: any, _state: any) => ({
                    ...provided,
                    fontSize: 14,
                    width: width || 250,
                    zIndex: 50,
                }),
                control: (_: any, { _selectProps }: any) => ({
                    height: 40,
                    width: width || 250,
                    display: 'flex',
                    borderRadius: 4,
                    border: '1px solid rgb(229 231 235 / 1)',
                }),
                singleValue: (provided: any, _state: any) => {
                    return { ...provided, width: width || 250 }
                },
                placeholder: (provided: any) => ({
                    ...provided,
                    fontSize: 14,
                }),
            }
        )
    }, [width])

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption)
        if (field) {
            field.onChange(selectedOption.value)
        }
    }

    return (
        <Select
            value={selectedOption}
            styles={{ ...customStyles, ...styles }}
            onChange={handleChange}
            options={options}
            placeholder={placeholder}
        />
    )
}

export default memo(SelectField)
