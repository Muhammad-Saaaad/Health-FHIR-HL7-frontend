import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query";

import Button from "./button";
import MappingColumns from "./mappingColumns"
import { get_mapping_suggestions } from "../api/channels";
import error_response from "../api/error_response";

export default function EditMapping({
    src_server_id,
    dest_server_id,
    srcFieldIsSuccess,
    srcFieldData,
    destFieldISSuccess,
    destFieldData, 
    takeData, 
    removeData,
    mappingRules = []
}) {

    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [srcChecked, setSrcChecked] = useState([]);
    const [destChecked, setDestChecked] = useState([]);
    const [allChecked, setAllChecked] = useState([]);
    const [mappings, setMappings] = useState([]);

    // Initialize mappings from mappingRules prop
    useEffect(() => {
        if (mappingRules && mappingRules.length > 0) {
            const initialMappings = mappingRules
                .filter(rule => rule.src_paths && rule.dest_paths)
                .map(rule => {
                    const srcPathsArray = Array.isArray(rule.src_paths) ? rule.src_paths : [];
                    const destPathsArray = Array.isArray(rule.dest_paths) ? rule.dest_paths : [];
                    return {
                        frontLine: `Mapping: ${srcPathsArray.join(", ")} → ${destPathsArray.join(", ")}`,
                        backLine: `${srcPathsArray.join(" + ")} → ${destPathsArray.join(" + ")}`
                    };
                });
            setMappings(initialMappings);
        }
    }, []);

    const {refetch} = useQuery({
        queryKey: [
            "get_mapping_suggestions",
            srcChecked.map(f => f.endpoint_field_id),
            destChecked.map(f => f.endpoint_field_id)
        ],
        queryFn: () => get_mapping_suggestions(
            src_server_id, 
            dest_server_id, 
            srcChecked.map(f => f.endpoint_field_id), 
            destChecked.map(f => f.endpoint_field_id)
        ),
        enabled: false,
        retry: false
    });
    
    const toggleSrc = (field) => {
        setSrcChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };
    
    const toggleDest = (field) => {
        setDestChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };

    const addMapping = async () => {
        if (srcChecked.length === 0 || destChecked.length === 0)
            return;
        if (srcChecked.length > 1 && destChecked.length > 1) {
            return alert("Please select only one source or one destination field to create mapping.");
        }

        setIsLoadingSuggestions(true);
        
        const {data, isError, error} = await refetch();
        if (isError){
            error_response(error, "Failed to get mapping suggestions");
            setIsLoadingSuggestions(false);
            return;
        }
        
        const suggestion = data?.data;

        const front_src = suggestion?.src_names?.map(field_name => field_name).join(" + ");
        const front_dest = suggestion?.dest_names?.map(field_name => field_name).join(" + ");
        const back_src = suggestion?.src_field_ids?.map(field_id => field_id).join(" + ");
        const back_dest = suggestion?.dest_field_ids?.map(field_id => field_id).join(" + ");

        const frontLine = `${front_src} → ${front_dest}`;
        const backLine = `${back_src} → ${back_dest}`;
        console.log("frontLine: ", frontLine);
        console.log("backLine: ", backLine);
        
        if (front_src === undefined || front_dest === undefined || back_src === undefined || back_dest === undefined){
            setIsLoadingSuggestions(false);
            alert("Undefined: something is wrong with the mapping suggestion, please try again.");
            return;
        }
        
        if (!mappings.some(m => m.frontLine === frontLine)) {
            setMappings(prev => [...prev, {"frontLine": frontLine, "backLine": backLine}]);
            takeData({
                "src_paths": suggestion?.src_field_ids,
                "dest_paths": suggestion?.dest_field_ids,
                "transform": suggestion?.transform_type,
                "config": suggestion?.config
            });
        }
        
        setIsLoadingSuggestions(false);
        setAllChecked(prev => [...prev, ...srcChecked, ...destChecked]);
        setSrcChecked([]);
        setDestChecked([]);
    };

    const removeMapping = (line) => {
        setMappings(prev => prev.filter(m => m.frontLine !== line.frontLine));

        let src_paths = line.backLine.split(" → ")[0].split(" + ").map(Number);
        let dest_paths = line.backLine.split(" → ")[1].split(" + ").map(Number);
        
        setAllChecked(prev => prev.filter(f => !src_paths.includes(f.endpoint_field_id) && !dest_paths.includes(f.endpoint_field_id)));        

        removeData({"src_paths": src_paths, "dest_paths": dest_paths});
    };

    return (
        <div className="p-0 m-0">
            <div className="border-2 border-[#31486F] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-white text-center font-bold text-[#31486F] py-2 border-b-2 border-[#31486F]">
                    Edit Mapping
                </div>

                {/* Two-column table */} 
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
                        allChecked={allChecked} 
                        toggle={toggleSrc} 
                    />

                    {/* Destination column */}
                    <MappingColumns 
                        FIELDS={destFieldISSuccess ? destFieldData.data : []} 
                        checked={destChecked} 
                        allChecked={allChecked}
                        toggle={toggleDest} 
                    />
                </div>
            </div>

            {/* Add Mapping button */}
            <div className="flex justify-center mt-4">
                <Button 
                    text={isLoadingSuggestions ? "Loading..." : "Add Mapping"}
                    className="font-semibold h-10 text-sm md:text-lg/2 rounded-full"
                    onClickfunction={addMapping}
                    isDisabled={isLoadingSuggestions}
                />
            </div>

            {/* Added mappings list */}
            {mappings.length > 0 && (
                <div className="mt-4 flex flex-col gap-2 overflow-y-auto max-h-90">
                    {mappings.map((line, i) => (
                        <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-2 border-[#E8F3F1] rounded-2xl px-4 py-2">
                            <span className="min-w-0 flex-1 text-sm text-gray-600 font-semibold wrap-break-word">
                                {line.frontLine}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeMapping(line)}
                                className="self-end sm:self-auto shrink-0 bg-[#31486F] hover:bg-[#1e3352] text-white text-sm font-semibold px-4 py-1 rounded-full transition-colors"
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
