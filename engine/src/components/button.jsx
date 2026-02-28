import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom';

const Button = (props) => {
    
    // If type is button then only submit the onClickPath button.
    let { text, className, onClickPath, type, onClickfunction} = props;

    const navigator = useNavigate();

    const handleClick = () => {
        if (onClickfunction) {
            onClickfunction();
        }
        if (onClickPath) {
            navigator(onClickPath);
        }
    }

    let button = <button
        className={
            twMerge('bg-[#31486F] hover:bg-[#1e3352] active:bg-[#152740] text-white p-2 rounded-2xl h-15 w-30 font-bold text-lg md:text-2xl md:w-50'
                , className)
        }
        onClick={handleClick}
        type={type} // submit | button
    >
        {text}
    </button>

    return button;
}

export default Button;