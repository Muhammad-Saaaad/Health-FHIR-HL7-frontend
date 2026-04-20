import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllLabTests } from "../api/visit_note";
import { Textbox } from "../components/textbox";
import Heading from "../components/heading"
import Label from "../components/label";
import Button from "../components/button";

export default function AddVisitNote() {

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

        { isLoading ? <p>Loading...</p> : data.map((labTest) => <p key={labTest?.loinc_code}>{labTest?.long_common_name}</p>) }
    </div>
    );
}