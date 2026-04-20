import { twMerge } from 'tailwind-merge'

const Label = (props) => {
    let {className, text} = props;
    return <label className={twMerge("font-bold", className)}>
        {text}
    </label>
};

export default Label;