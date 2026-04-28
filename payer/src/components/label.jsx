import { twMerge } from "tailwind-merge";

const Label = (props) => {
    const {text, className} = props;
    return <label className={twMerge("font-bold text-xl", className)}>{text}</label>
};

export function GenderLabel(props){
    const { children } = props;
    return <label className="text-xl">{children}</label>
} 

export default Label;