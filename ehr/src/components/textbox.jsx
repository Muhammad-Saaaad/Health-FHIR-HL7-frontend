import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const Textbox = (props) => {
    let {placeholder, type, className, onChange} = props;

    type = type ? type : "text";

    return <input 
        type={type} 
        className={twMerge("border-2 border-[#E8F3F1] rounded-2xl w-full h-12 p-4", className)}
        placeholder={placeholder}
        onChange={onChange}
    />
};


export const DateTextBox =({placeholder, onChange}) =>{
    const [date, setDate] = useState(null);
    const inputRef = useRef(null);

    return (
        <div className="flex items-center justify-between border-2 border-[#E8F3F1] rounded-2xl w-50 h-7 sm:w-70 lg:w-90 md:h-12 p-4">
            <DatePicker 
                ref={inputRef}
                selected={date}
                onChange={(date) => {setDate(date); onChange(date); inputRef.current.input.blur();}}
                placeholderText={placeholder}
                className="flex-1 outline-none text-sm text-gray-600 w-35 sm:w-55 md:w-55 lg:w-75"
                disabledKeyboardNavigation

                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}  
                scrollableYearDropdown 
            />
            <Calendar /> {/*this is the Calendar icon*/}

        </div>
    )
}

export default Textbox;