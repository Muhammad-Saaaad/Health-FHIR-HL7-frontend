import { useState } from "react"

import Button from "./button";
import MappingColumns from "./mappingColumns"

export default function Mapping({srcFieldIsSuccess, srcFieldData, destFieldISSuccess, destFieldData, takeData}) {

    const [srcChecked, setSrcChecked] = useState([]);   // list of checked src field names
    const [destChecked, setDestChecked] = useState([]);   // list of checked dest field names
    
    const toggleSrc = (field) =>{ // if field is already in checked list, remove it, otherwise add it.
        setSrcChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };

    const toggleDest = (field) => {
        setDestChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };

    const [mappings, setMappings] = useState([]);   // added mapping strings
    
    const addMapping = () => {
        if (srcChecked.length === 0 || destChecked.length === 0) 
            return;
        if (srcChecked.length > 1 && destChecked.length > 1) 
            return alert("Please select only one source or one destination field to create mapping.");

        const src = srcChecked.map(field => field.name).join(" + ");
        const dest = destChecked.map(field => field.name).join(" + ");

        const line = `${src} → ${dest}`;
        if (!mappings.includes(line)) {
            setMappings(prev => [...prev, line]);

            let transform = "copy";
            let config = {};
            if (srcChecked.length > 1){
                transform = "concat";
                config = { "delimiter": " "}; // for example, we can use space to concat multiple source fields.
            }
            else if (destChecked.length > 1){
                transform = "split";
                config = { "delimiter": " "}; // for example, we can use space to split the source field into multiple destination fields.
            }

            takeData(
                {
                    "src_paths": srcChecked.map(field => field.endpoint_filed_id),
                    "dest_paths": destChecked.map(field => field.endpoint_filed_id),
                    "transform": transform,
                    "config": config
                }
            );
        }
        
        setSrcChecked([]);
        setDestChecked([]);
    };

    const removeMapping = (line) => setMappings(prev => prev.filter(m => m !== line));

    return (
        <div className="p-0 m-0">
            <div className="border-2 border-[#31486F] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-white text-center font-bold text-[#31486F] py-2 border-b-2 border-[#31486F]">
                    Mapping
                </div>

                {/* Two-column table */} 
                {/* The divide is applied to the parent container, but it applies the border to child containers.*/}
                {/* The divide only applies border to the center childs not first or last child.*/}
                <div className="grid grid-cols-2 divide-x-2 divide-[#31486F]">
                    {/* Source column */}
                    <MappingColumns 
                        FIELDS={srcFieldIsSuccess ? srcFieldData.data : []} 
                        checked={srcChecked} 
                        toggle={toggleSrc} 
                    />

                    {/* Destination column */}
                    <MappingColumns 
                        FIELDS={destFieldISSuccess ? destFieldData.data : []} 
                        checked={destChecked} 
                        toggle={toggleDest} 
                    />
                </div>
            </div>

            {/* Add Mapping button */}
            <div className="flex justify-center mt-4">
                <Button 
                    text="Add Mapping" 
                    className="font-semibold h-10 text-sm md:text-lg/2 rounded-full"
                    onClickfunction={addMapping}
                />
            </div>

            {/* Added mappings list */}
            {mappings.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                    {mappings.map((line, i) => (
                        <div key={i} className="flex items-center justify-between border-2 border-[#E8F3F1] rounded-2xl px-4 py-2">
                            <span className="text-sm text-gray-600 font-semibold">{line}</span>
                            <button
                                type="button"
                                onClick={() => removeMapping(line)}
                                className="bg-[#31486F] hover:bg-[#1e3352] text-white text-sm font-semibold px-4 py-1 rounded-full transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <br /><br />
        </div>
    );
}