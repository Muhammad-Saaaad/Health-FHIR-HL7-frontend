import { useState } from "react"

import Button from "./button";
import MappingColumns from "./mappingColumns"
import { rule_validation } from '../api/channels'; // just a json variable

export default function Mapping({srcFieldIsSuccess, srcFieldData, destFieldISSuccess, destFieldData, takeData, removeData}) {

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
        if (srcChecked.length > 1 && destChecked.length > 1) {
            return alert("Please select only one source or one destination field to create mapping.");
        }

        let is_valid_mapping = true;
        // // srcChecked and destChecked contain this kind of data => [{endpoint_filed_id, path, name}, ...]
        srcChecked?.forEach(src_element => {
            // debugger;
            if (rule_validation[src_element.name]){

                let dest_value = rule_validation[src_element.name]; // give the destination list, type and config.
                destChecked?.forEach(dest_element => {
                    if (!dest_value.dest.includes(dest_element.name)){
                        alert(`You cannot map ${src_element.name} to ${dest_element.name}`);
                        is_valid_mapping = false;
                        return false;
                    }
                });
            }
            else{
                alert(`${src_element.name} is not present in the validation list.`);
                is_valid_mapping = false;
                return false;
            }
        });

        if (!is_valid_mapping){
            return;
        } // now we are sure that the mapping is valid and we can add it to the list of mappings. and then pass the data to api.

        const front_src = srcChecked.map(field => field.name).join(" + ");
        const front_dest = destChecked.map(field => field.name).join(" + ");
        const back_src = srcChecked.map(field => field.endpoint_filed_id).join(" + ");
        const back_dest = destChecked.map(field => field.endpoint_filed_id).join(" + ");

        const frontLine = `${front_src} → ${front_dest}`;
        const backLine = `${back_src} → ${back_dest}`;
        if (!mappings.some(m => m.frontLine === frontLine)) {
            setMappings(prev => [...prev, {"frontLine": frontLine, "backLine": backLine}]);

            // we can just take the first one because if there are multiple source fields, 
            // then the transformation will be concat and and it will be same for mutliple source fields.,
            // Similarly if there are multiple destination fields, then the transformation will be split
            // but again the transform type and the config will be a only 1.
            let dest_value = rule_validation[srcChecked[0].name]; 
            let transform = dest_value.type;
            let config = dest_value.config;

            takeData( // pass the selected fields and transformation config to parent component, so that it can be included in the final data to submit.
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

    const removeMapping = (line) => {
        setMappings(prev => prev.filter(m => {
            // debugger;
            let output =  m.frontLine !== line.frontLine;
            return output;
        }));

        // Here you get paths as string arrays and you convert into into Int using Number datatype.
        // {"backLine": "src1_id + src2_id → dest1_id + dest2_id"}
        let src_paths = line.backLine.split(" → ")[0].split(" + ").map(Number);
        let dest_paths = line.backLine.split(" → ")[1].split(" + ").map(Number);

        removeData({"src_paths": src_paths, "dest_paths": dest_paths});
    };

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
                    {/* Headings */}
                    <div className="flex justify-center items-center border-b-2 border-[#31486F]">
                        <p className="font-bold text-sm mb-2">Source Fields</p>
                    </div>
                    <div className="flex justify-center items-center border-b-2 border-r-0 border-[#31486F]">
                        <p className="font-bold text-sm mb-2">Destination Fields</p>
                    </div>

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
                            <span className="text-sm text-gray-600 font-semibold">{line.frontLine}</span>
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