import { IconType } from 'react-icons/lib'

interface IIconButtonProps {
    Icon: IconType
    buttonStyle?: { [key: string]: any }
    buttonClass?: string
    iconClass?: string
    onClick?: (value?: any) => void
    type?: 'button' | 'submit' | 'reset'
}

const IconButton: React.FC<IIconButtonProps> = ({
    Icon,
    buttonStyle,
    iconClass,
    buttonClass,
    onClick,
    type = 'button',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            style={buttonStyle}
            className={`p-[7px] rounded-full relative group ${
                buttonClass ? buttonClass : ''
            }`}
        >
            <Icon
                className={`transition-all leading-none ${
                    iconClass ? iconClass : ''
                }`}
            />
        </button>
    )
}

export default IconButton
