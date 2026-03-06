import { twMerge } from "tailwind-merge";

const Button = (props) => {
    let { text, className } = props;

    return <button 
        className={twMerge("bg-[#31486F] text-white p-2 rounded-2xl h-15 w-30 font-bold text-2xl", className)}
    >
        {text}
    </button>
}

export default Button;