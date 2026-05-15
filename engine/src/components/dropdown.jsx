import { useState, useEffect } from "react";

export function SearchDropDown({ options, defaultValue, onSelect }) { // custom dropdown

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(defaultValue); // this tell which value in the dropdown 

    function dropDownValue(value) {
        console.log("value --> ", value);
        setOpen(false);
        if (onSelect) {
            onSelect(value);
            setSelect(value);
        }
    }

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="bg-[#152F5B] text-white font-bold p-5 rounded-2xl flex justify-center items-center w-40 h-10"
            >
                {select}
            </button>

            {open && ( // add relative here and you will see the dropdown overlab on the below content
                <div className="left-0 border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
                    {
                        options.map((item, index) => {
                            let display_item = item;
                            if (item === "ADT^A04") {
                                display_item = "ADT^A04 (Patient Registration)";
                            }
                            else if (item === "ADT^A01") {
                                display_item = "ADT^A01 (Add Encounter)";
                            }
                            else if (item === "DFT^P03") {
                                display_item = "DFT^P03 (Send Claim Submission)";
                            }
                            else if (item === "ORM^O01") {
                                display_item = "ORM^O01 (Send Lab Test Order)";
                            }
                            else if (item === "ORU^R01") {
                                display_item = "ORU^R01 (Send Report/Results)";
                            }
                            else if (item === "BAR^P10") {
                                display_item = "BAR^P10 (Claim Approval/Rejection)";
                            }

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
                                {
                                    display_item
                                }
                            </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default function DropDown(props) {
    // This onSelect is a function that is given from the parent to this compoenent
    let { keys, values, defaultValue, onSelect, resetTrigger } = props;

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(defaultValue);

    useEffect(() => {
        setSelect(defaultValue);
    }, [defaultValue, resetTrigger]);

    if (keys.length > 0 && values.length > 0 && keys.length !== values.length) {
        alert("Keys and values must have the same length, for dropdown.")
    }

    function changeValue(key, frontend_value) {
        if (onSelect) {
            onSelect(key);
            setOpen(false);
            setSelect(frontend_value);
        }
    }

    return <div className="relative inline-block">
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className={
                `text-start border-2 border-[#E8F3F1] rounded-2xl w-70 h-10 p-2
                 ${select === defaultValue ? "text-gray-400" : "text-gray-900"}`}
        >
            {select}
        </button>

        {
            open && <div className="left-0 border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
                {values?.map((element, index) => {                    

                    return (
                        <div
                            key={keys[index]}
                            value={element}
                            className="font-bold text-[#152F5B] p-2"
                            onClick={() => changeValue(keys[index], element)}
                        >
                            {element}
                        </div>
                    );
                })}
            </div>
        }
    </div>

}