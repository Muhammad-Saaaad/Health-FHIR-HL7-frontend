import { useState } from "react";
import { twMerge } from "tailwind-merge";

const DropDown = (props) => {
    // This onSelect is a function that is given from the parent to this compoenent
    let {options, defaultValue, onSelect} = props;

    function changeValue(event){
        const value = event.target.value;
        if (onSelect){
            onSelect(value);
        }
    }
    
    return <select 
        className="border-2 border-[#E8F3F1] rounded-2xl w-full h-12 p-2 pr-8"
        onChange={changeValue}
        defaultValue={defaultValue}
    >
        <option value="">{defaultValue}</option>

        {options.map((element, index) => (
            <option key={index} value={element}>{element}</option>
        ))}

    </select>
}

export const HospitalDropDown = (props) => {
    // This onSelect is a function that is given from the parent to this compoenent
    let {options, defaultValue, onSelect} = props;

    function changeValue(event){
        const value = event.target.value;
        if (onSelect){
            onSelect(value);
        }
    }
    
    return <select 
        className="w-full h-12 p-2 pr-8"
        onChange={changeValue}
        defaultValue={defaultValue}
    >
        <option value="">{defaultValue}</option>

        {options?.map((element, index) => (
            <option key={index} value={element.hospital_id}>{element.name}</option>
        ))}

    </select>
}

export function SearchDropDown({ options, defaultValue, onSelect, DefaultValueClassName, OptionsClassNames }) { // custom dropdown

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(defaultValue); // this tell which value in the dropdown 

    function dropDownValue(item) {
        console.log("value --> ", item);
        setOpen(false);
        if (onSelect) {
            onSelect(item?.system_id);
            setSelect(item?.name || defaultValue);
        }
    }

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={twMerge("bg-[#152F5B] text-white font-bold p-5 rounded-2xl flex justify-center items-center w-40 h-10", DefaultValueClassName)}
            >
                {select}
            </button>

            {open && ( // add relative here and you will see the dropdown overlab on the below content
                <div className={twMerge("left-0 border border-gray-300 rounded-2xl shadow-lg overflow-hidden", OptionsClassNames)}>
                    {
                        options?.payers?.map((item, index) => {
                            let style = "text-center py-2 w-full h-10 active:bg-gray-600";
                            if (index % 2 == 0) {
                                style += " bg-[#7A7979] text-[#152F5B] font-bold hover:bg-gray-600 "
                            }
                            else {
                                style += "  text-[#152F5B] font-bold hover:bg-gray-600"
                            }
                            return <div
                                key={index}
                                onClick={() => dropDownValue(item)}  // execute function, call the function with the item
                                className={style}
                            >
                                {item?.name}
                            </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default DropDown;