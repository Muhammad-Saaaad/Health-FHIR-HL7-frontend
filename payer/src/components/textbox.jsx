import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const Textbox = (props) => {
    // if readOnly is set to true then we don't provide onChnage.
    // We provide value in case of, readOnly, where it will just show the value.
    let { placeholder, value, className, onChange, readOnly } = props;

    if (!readOnly){
        readOnly = false;
    }
    
    return (
        <div className="flex items-center border-2 border-[#E8F3F1] rounded-2xl w-50 h-7 sm:w-70 lg:w-100 md:h-12 p-4">
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

export const DateTextBox =({placeholder, onChange}) =>{
    const [date, setDate] = useState(null);
    const inputRef = useRef(null);

    return (
        <div className="flex items-center justify-between border-2 border-[#E8F3F1] rounded-2xl w-50 h-7 sm:w-70 lg:w-90 md:h-12 p-4">
            <DatePicker 
                ref={inputRef}
                selected={date}
                onChange={(date) => {
                    setDate(date);
                    const formattedDate = date.toISOString().split("T")[0]; // "2026-03-02"
                    onChange(formattedDate); // pass formatted date to parent
                }}
                placeholderText={placeholder}
                dateFormat="dd/MM/yyyy"
                onFocus={(e) => e.target.blur()}
                className="flex-1 outline-none text-sm text-gray-600 w-30 sm:w-55 md:w-30"
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