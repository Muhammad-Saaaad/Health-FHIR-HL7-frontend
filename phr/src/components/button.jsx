import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom';

const Button = (props) => {
    
    // If type is button then only submit the onClickPath button.
    let { text, className, onClickPath, type } = props;

    const navigator = useNavigate();

    const handleClick = () => {
        if (onClickPath) {
            navigator(onClickPath);
        }
    }

    let button = <button
        className={
            twMerge('bg-[#31486F] active:bg-blue-950 text-white p-2 rounded-2xl h-15 w-30 font-bold text-lg md:text-2xl md:w-50 '
                , className)
        }
        onClick={handleClick}
        type={type} // submit | button
    >
        {text}
    </button>

    return button;
}

export function AuthButton({text, isProcessing}){ // always type is submit for this button
    return (
        <button
            type="submit"
            className="mt-28 w-full h-13 rounded-full bg-blue-600 text-white text-base font-semibold shadow-lg shadow-blue-300 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer border-none"
        >
            {isProcessing ? "Processing..." : text}
        </button>
    )
}

export default Button;