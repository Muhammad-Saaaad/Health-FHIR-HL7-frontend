import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { get_doctor_for_hospital } from "../api/doctor"
import Textbox from "../components/textbox";
import Heading, { LowerHeading } from "../components/heading";
import Sidebar from "../components/sidebar";
import Records from "../components/records"

const ViewDoctors = () => {
  const location = useLocation();
  const hospital_id = location?.state?.hospital_id;

  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ['phr_all_doctors_by_patient', hospital_id],
    queryFn: () => get_doctor_for_hospital(hospital_id),
    enabled: Boolean(hospital_id),
    // retry: false, // Disable automatic retries on failure
  });

  
  const [records, setRecords] = useState();
  const [searchRecords, setSearchRecords] = useState("");

  useEffect(() => {
    if(!isLoading && !isError && data){
      setRecords(data?.data);
      console.log(data);
      
    }
  }, [data, status])


  function searchValue(event){
    const value = event.target.value;
    if (value === ""){
      setRecords(data?.data);
      setSearchRecords(""); // "" is equal to null but [] and {} is not equal to null.
      return;
    }
    setSearchRecords(records?.filter(item => item?.name?.includes(value) ));
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-5">
            <div className="relative mb-4">
                <Heading text="Doctor List" />
            </div>

            <hr />

            {/* Doctor list */}
            {
              !isLoading && !isError && <Records data={searchRecords? searchRecords : records}></Records>
            }
            
      </main>
    </div>
  );
};

export default ViewDoctors;
