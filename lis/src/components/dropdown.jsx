import { useState } from "react";

export function CustomDropDown({options, defaultValue, onSelect}){

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(defaultValue);

    function dropDownValue(value){
        console.log("value --> " ,value)
        if (onSelect){
            onSelect(value);
        }
    }

    return (
        <div className="relative inline-block">
            <button 
                onClick={() => setOpen(!open)} 
                className="bg-[#152F5B] text-white p-5 rounded-2xl flex justify-center items-center w-32 h-10"
            >
                {select}
            </button>

            {open && ( // add relative here and you will see the dropdown overlab on the below content
                <div className="left-0 border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
                    {
                        options.map((item, index) => {
                            let style = "text-center py-2 w-32 h-10 active:bg-gray-600";
                            if (index%2 == 0){
                                style += " bg-[#7A7979] text-[#152F5B] font-bold hover:bg-gray-600 "
                            }
                            else{
                                style += "  text-[#152F5B] font-bold hover:bg-gray-600"
                            }
                            return <div 
                                        key={index}
                                        onClick={() => dropDownValue(item)}  // execute function, call the function with the item
                                        className={style}
                                    >
                                    {item}
                            </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default function DropDown(props){
    // This onSelect is a function that is given from the parent to this compoenent
    let {options, defaultValue, onSelect} = props;

    function changeValue(event){
        const value = event.target.value;
        if (onSelect){
            onSelect(value);
        }
    }
    
    return <select 
        className="border-2 border-[#E8F3F1] rounded-2xl w-40 h-10  p-2 pr-8"
        onChange={changeValue}
        defaultValue={defaultValue}
    >
        <option value="" disabled>{defaultValue}</option>

        {options.map((element, index) => {
            let style = ""
            if (index%2 == 0){
                style = "bg-[#7A7979] opacity-60 font-bold text-[#152F5B] p-2"
            }
            else{
                style = "bg-white font-bold text-[#152F5B] p-2"
            }
            
            return (
                <option key={index} value={element} className={style}>{element}</option>
            );
        })}

    </select>
}