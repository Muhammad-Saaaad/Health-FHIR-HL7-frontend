import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const Textbox = (props) => {
    let {placeholder, type} = props;

    type = type ? type : "text";

    return <input type={type} className="border-2 border-[#E8F3F1] rounded-2xl w-full h-12 p-4"
        placeholder={placeholder}
        showYearDropdown={true}
        showMonthDropdown={true}
    />
};

export const DateTextBox =({placeholder}) =>{
    const [date, seteDate] = useState(null);
    const inputRef = useRef(null);

    return (
        <div className="flex items-center justify-between border-2 border-[#E8F3F1] rounded-2xl w-50 h-7 sm:w-70 lg:w-90 md:h-12 p-4">
            <DatePicker 
                ref={inputRef}
                selected={date}
                onChange={(date) => {seteDate(date); inputRef.current.input.blur();}}
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