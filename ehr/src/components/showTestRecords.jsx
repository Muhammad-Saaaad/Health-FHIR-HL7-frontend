import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllLabTests } from "../api/visit_note";
import Textbox from "./textbox";
import Button from "./button";

export default function LabTestSearchResults({ selectedTest: initialSelectedTest = [], onChangeSelectedTest }){

    const [selectedTest, setSelectedTest] = useState(initialSelectedTest);

    const [inputValue, setInputValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        // here create a timeout, on each key stroke if a time execde limit then only it will set the data into the debouncedSearch,
        // if user keep on typing then it will clear the timeout and create a new one, so only when user stop typing for 600ms
        // then only it will set the data into debouncedSearch
        const timeoutId = setTimeout(() => { 
            setDebouncedSearch(inputValue.trim());
        }, 600);
        return () => clearTimeout(timeoutId);

    }, [inputValue]);

    useEffect(() => {
        setSelectedTest(initialSelectedTest);
    }, [initialSelectedTest]);

    useEffect(() => {
        onChangeSelectedTest?.(selectedTest);
    }, [selectedTest, onChangeSelectedTest]);

    const {data = [], isLoading} = useQuery({
        queryKey: ['labTests', debouncedSearch],
        queryFn: () => getAllLabTests(debouncedSearch),
        enabled: !!debouncedSearch,
        staleTime: 120 * 60 * 1000, // Keep data fresh for 120 minutes
        gcTime: 600 * 60 * 1000, // Keep in cache for 10 hours after unused
    });

    function handleSearchReport(value) {
        setInputValue(value);
    }
    function handleSelectTest(test) {
        setSelectedTest(prev=> {
            if (prev.some(t => t.loinc_code === test.loinc_code)) {
                return prev; // already selected, do not add again
            }
            return [...prev, test];
        })
    }

    return (
        <div>
            <Textbox required={false} placeholder="Select lab test..." onChange={event => handleSearchReport(event.target.value)} />
            
            <br /><br />
            {
                data?.length > 0 && <div className="border-2 border-gray-500 rounded-xl min-h-0 min-w-full m-2 p-1">
                    <div className="max-h-60 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                        {   isLoading ? 
                            <p>Loading...</p> : 
                            data.map((labTest, idx) => {
                                return <div 
                                    key={labTest?.loinc_code}
                                    // className={`p-2 border-2 border-gray-300 my-2 rounded-xl hover:bg-gray-200 cursor-pointer ${idx ==0 ? "pt-0": ""}`} // condition
                                    className="p-2 border-2 border-gray-300 my-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectTest(labTest)}
                                >
                                    <p>{labTest?.display_name}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

            <br />
            <div>
                {
                    selectedTest?.length>0 && <div className="border-2 border-gray-500 rounded-lg min-h-0 min-w-full m-2 p-1">
                        <div className="max-h-40 overflow-auto [scrollbar-gutter:stable]">
                            {
                                selectedTest?.map(test => {
                                    return (
                                        <div key={test.loinc_code} className="flex justify-between items-center border-2 border-gray-500 rounded-xl m-2 p-2">
                                        <p>
                                            {test?.mobile_name || test?.display_name}
                                        </p>
                                        <Button 
                                            text="Remove"  
                                            className="h-10 self-end sm:self-auto shrink-0 bg-[#31486F] hover:bg-[#1e3352] text-white text-sm font-semibold px-4 py-1 rounded-full transition-colors"
                                            onClick={() => setSelectedTest(prev => prev.filter(p => p.loinc_code !== test.loinc_code))} 
                                        />

                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
}