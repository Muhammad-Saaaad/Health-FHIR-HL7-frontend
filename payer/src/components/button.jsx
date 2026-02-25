import { twMerge } from 'tailwind-merge'

const Button = (props) => {
    let { text, className } = props;

    let button = <button className={twMerge('bg-[#31486F] text-white p-2 rounded-2xl h-15 w-30 font-bold text-lg lg:text-2xl lg:w-50' ,className)}>
        {text}
    </button>

    return button;
}

export default Button;