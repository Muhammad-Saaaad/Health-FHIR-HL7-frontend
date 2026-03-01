import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { get_servers } from "../api/server";
import { get_endpoints, get_endpointFields } from '../api/endpoint';

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import DropDown, { SearchDropDown } from "../components/dropdown"
import Button from "../components/button"
import SideBar from "../components/sidebar"
import Mapping from '../components/mapping';

export default function AddChannels() {

    const navigate = useNavigate();
    
    const [data, setData] = useState({
        "name": "",
        "src_server_id": '',
        "src_endpoint_id": '',
        "dest_server_id": '',
        "dest_endpoint_id": '',
        "msg_type": "",
    });
    const [mappingRules, setMappingRules] = useState([]); // mapping: [{}, {}, ...]

    function arraysEqual(a, b) { // check if 2 array's are equal or not.
        if (a === b) return true; // Check if they are the exact same reference
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const { data: severData, isSuccess: serverIsStatus, isError: serverIsError, error: serverError } = useQuery({
        queryKey: ["get_servers_for_dropdown"],
        queryFn: get_servers,
    });

    const { data: srcEndpointData, isSuccess: srcEndpointISSuccess } = useQuery({
        queryKey: ['get_srcEndpoints_for_dropdown', data.src_server_id],
        queryFn: () => get_endpoints(data.src_server_id),
        enabled: !!data.src_server_id, // don't run on mount
    });

    const { data: destEndpointData, isSuccess: destEndpointISSuccess } = useQuery({
        queryKey: ['get_destEndpoints_for_dropdown', data.dest_server_id],
        queryFn: () => get_endpoints(data.dest_server_id),
        enabled: !!data.dest_server_id, // don't run on mount
    });

    const { data: srcFieldData, isSuccess: srcFieldIsSuccess } = useQuery({
        queryKey: ['get_srcFileds_for_mapping', data.src_endpoint_id],
        queryFn: () => get_endpointFields(data.src_endpoint_id),
        enabled: !!data.src_endpoint_id
    });
    
    const { data: destFieldData, isSuccess: destFieldISSuccess, } = useQuery({
        queryKey: ['get_destFileds_for_mapping', data.dest_endpoint_id],
        queryFn: () => get_endpointFields(data.dest_endpoint_id),
        enabled: !!data.dest_endpoint_id
    });

    // As sson as server is assign an id, hit the api to get the endpoints for that seever.
    function onSelectSrcServer(server_id) {
        setData(prev => ({ ...prev, "src_server_id": server_id}));
        // here the query will automatically run because of the enabled condition
        // we set for srcEndpoint query, so no need to manually refetch.
    }
    
    function onSelectDestServer(server_id) {  
        setData(prev => ({ ...prev, "dest_server_id": server_id }));
    }    

    function handleAddChannel() {
        // debugger;
        const finalData = {
            ...data,
            'rules': {"mapping_rules": mappingRules}
        }
        console.log("Final data to submit: ", finalData);
    }

    return (
        <div className="flex overflow-hidden h-screen">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Add Channels" />
                <br /><br />

                <Label text="Channel Name" />
                <br />
                <Textbox 
                    placeholder="Enter Channel Name" 
                    onChange={(e) => setData({ ...data, "name": e.target.value })} 
                />
                <br />

                <Label text="Source Server" />
                <br /> {/* Integrate API */}
                <DropDown 
                    keys={serverIsStatus ? severData.data?.filter(s=> s.server_id !== data.dest_server_id).map(s => s.server_id): ['']} 
                    values={serverIsStatus ? severData.data?.filter(s=> s.server_id !== data.dest_server_id).map(s=> s.name): ['']} 
                    defaultValue="Select Source Server" 
                    onSelect={(key) => onSelectSrcServer(key)} 
                />
                {
                    serverIsError && <p className="text-red-500 font-semibold">{serverError}</p>
                }
                <br /><br />

                <Label text="Source EndPoint" />
                <br /> {/* Integrate API */}
                <DropDown 
                    keys={srcEndpointISSuccess ? srcEndpointData.data?.map(ep=> ep.endpoint_id) : ['']} 
                    values={srcEndpointISSuccess ? srcEndpointData.data?.map(ep=> ep.url) : ['']} 
                    defaultValue="Select Source Endpoint" 
                    onSelect={(src_endpoint_id) => setData({ ...data, "src_endpoint_id": src_endpoint_id })} 
                />
                <br /><br />

                <Label text="Destination Server" />
                <br /> {/* Integrate API */}
                <DropDown 
                    keys={serverIsStatus ? severData.data?.filter(s=> s.server_id !== data.src_server_id).map(s=> s.server_id): ['']} 
                    values={serverIsStatus ? severData.data?.filter(s=> s.server_id !== data.src_server_id).map(s=> s.name): ['']} 
                    defaultValue="Select Destination Server" 
                    onSelect={(dest_server_id) => onSelectDestServer(dest_server_id)} 
                />
                {
                    serverIsError && <p className="text-red-500 font-semibold">{serverError}</p>    
                }
                <br /><br />

                <Label text="Destination EndPoint" />
                <br /> {/* Integrate API */}
                <DropDown 
                    keys={destEndpointISSuccess ? destEndpointData.data?.map(ep=> ep.endpoint_id) : ['']} 
                    values={destEndpointISSuccess ? destEndpointData.data?.map(ep=> ep.url) : ['']} 
                    defaultValue="Select Destination Endpoint" 
                    onSelect={(dest_endpoint_id) => setData({ ...data, "dest_endpoint_id": dest_endpoint_id })} 
                />
                <br /><br />

                <Mapping // 
                    srcFieldIsSuccess={srcFieldIsSuccess} // we give this so that the fields can be display on the table.
                    srcFieldData={srcFieldData} // the field data to be displayed on the mapping table.
                    destFieldISSuccess={destFieldISSuccess} 
                    destFieldData={destFieldData} 
                    
                    // Triggered when "add mapping" button is clicked
                    takeData={(mappingData) => setMappingRules(prev => ([ ...prev, mappingData ]))}

                    // Triggered when you want to remove a mapping line.
                    removeData={(line) => 
                        setMappingRules(prev => {
                            return prev.filter(m => // Remove all the mappings that have the same src_paths and dest_paths as the line to be removed.
                                !(arraysEqual(m.src_paths, line.src_paths) && arraysEqual(m.dest_paths, line.dest_paths))
                            );
                        }
                    )}
                />

                <SearchDropDown
                    options={["ADT", "ORM", "ORU", "DFT"]}
                    defaultValue="Message Type"
                    onSelect={(msg_type => setData({ ...data, "msg_type": msg_type }))}
                />
                <br /><br />

                <div className="flex justify-center items-center">
                    <Button 
                        className="w-50 font-semibold" 
                        text="Add Channel"
                        onClickfunction={() => handleAddChannel()}
                    />
                </div>

            </main>
        </div>
    )
}
