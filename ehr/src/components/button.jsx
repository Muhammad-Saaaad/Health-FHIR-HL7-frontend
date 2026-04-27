import { twMerge } from "tailwind-merge";

const Button = (props) => {
    let { text, className, onClick, type = "button", disabled = false } = props;

    return <button 
        type={type}
        className={twMerge("bg-[#31486F] text-white active:bg-[#475a7a] p-2 rounded-2xl h-15 w-30 font-bold text-2xl", className)}
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </button>
}

export default Button;