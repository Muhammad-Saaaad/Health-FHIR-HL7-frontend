import { twMerge } from 'tailwind-merge'

const Button = (props) => {
    let { text, className, type="button", onClick } = props;

    let button = <button 
        className={twMerge('bg-[#31486F] text-white p-2 rounded-2xl h-15 w-30 font-bold text-lg lg:text-2xl lg:w-50' ,className)}
        type={type}
        onClick={onClick}
    >
        {text}
    </button>

    return button;
}

export default Button;