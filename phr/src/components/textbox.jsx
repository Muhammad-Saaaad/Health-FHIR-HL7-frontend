import { twMerge } from "tailwind-merge";

const Textbox = (props) => {
    // if readOnly is set to true then we don't provide onChnage
    let { placeholder, value, className, onChange, readOnly, type, multiline, rows } = props;
    
    if (!readOnly){
        readOnly = false;
    }

    const isMultiline = Boolean(multiline);

    return (
        <div 
            className={twMerge(
                "flex w-full max-w-full sm:w-110 md:w-120 lg:w-130 border-2 border-[#E8F3F1] rounded-2xl p-4",
                isMultiline ? "items-start min-h-20" : "items-center h-9 sm:h-12"
            )}>
            {isMultiline ? (
                <textarea
                    rows={rows || 3}
                    className={twMerge("flex-1 outline-none w-full resize-none whitespace-pre-wrap break-all", className)}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={onChange}
                    readOnly={readOnly}
                />
            ) : (
                <input
                    type={type || "text"}
                    className={twMerge("flex-1 outline-none w-full", className)}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={onChange}
                    readOnly={readOnly}
                />
            )}
        </div>
    )
};

export default Textbox;