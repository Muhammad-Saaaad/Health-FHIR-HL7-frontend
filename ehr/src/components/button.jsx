import { twMerge } from "tailwind-merge";

const Button = (props) => {
    let { text, className, onClick } = props;

    return <button 
        className={twMerge("bg-[#31486F] text-white p-2 rounded-2xl h-15 w-30 font-bold text-2xl", className)}
        onClick={onClick}
    >
        {text}
    </button>
}

export default Button;