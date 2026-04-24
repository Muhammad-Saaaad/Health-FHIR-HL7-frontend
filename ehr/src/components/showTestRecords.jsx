import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllLabTests } from "../api/visit_note";
import Textbox from "./textbox";

export default function LabTestSearchResults(){

    const [selectedTest, setSelectedTest] = useState([]);

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

    return (
        <div>
            <Textbox placeholder="Select lab test..." onChange={event => handleSearchReport(event.target.value)} />
            
            <br /><br />
            {
                data?.length > 0 && <div 
                    className="border-2 border-gray-500 rounded-xl min-h-0 max-h-60 min-w-full m-2 overflow-auto"
                >
                    {   isLoading ? 
                        <p>Loading...</p> : 
                        data.map((labTest) => {
                            // return <p key={labTest?.loinc_code}>{labTest?.long_common_name}</p>
                            return <div 
                                key={labTest?.loinc_code}
                                className="p-2 border-2 border-gray-300 my-2 rounded-xl"
                            >
                                <p>{labTest?.display_name}</p>
                                {/* <p className="text-sm text-gray-500">{labTest?.loinc_code}</p> */}
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}