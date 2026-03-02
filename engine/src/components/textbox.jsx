import { twMerge } from "tailwind-merge";

const Textbox = (props) => {
    // if readOnly is set to true then we don't provide onChnage.
    // We provide value in case of, readOnly, where it will just show the value.
    let { placeholder, value, className, onChange, readOnly } = props;
    
    if (!readOnly){
        readOnly = false;
    }

    return (
        <div className="flex items-center border-2 border-[#E8F3F1] rounded-2xl w-70 h-7 lg:w-100 md:h-12 p-4">
            <input
                type="text"
                className={twMerge("flex-1 outline-none w-full", className)}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
        </div>
    )
};

export default Textbox;