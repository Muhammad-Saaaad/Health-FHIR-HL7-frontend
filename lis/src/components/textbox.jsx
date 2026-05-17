import { twMerge } from "tailwind-merge";

const Textbox = (props) => {
    let {placeholder, type} = props;

    type = type ? type : "text"; {/*type text | Date */}

    return <input type={type} className="border-2 border-[#E8F3F1] rounded-2xl w-45 h-7 md:w-60 lg:w-200 md:h-12 p-4"
        placeholder={placeholder}
    />
};

export const BetterTextbox = (props) => {
    const {placeholder, type = "text", value, readOnly = false, className, required, onChange} = props;
    const isRequired = required ?? true;

    return <input 
        type={type} 
        className={twMerge("border-2 border-[#E8F3F1] rounded-2xl w-full h-12 p-4", className)}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        required={isRequired}
        onChange={onChange}
    />
};

export default Textbox;