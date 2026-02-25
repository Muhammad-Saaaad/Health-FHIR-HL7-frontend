import { useQuery } from "@tanstack/react-query";

import { get_patients } from "../api/home";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading"
import Textbox from "../components/textbox"
import { CustomDropDown } from "../components/dropdown" 
import Records from "../components/records";

const Home = () => {

  const {data, isLoading, error} = useQuery({
    queryKey: ["home_getPatients"],
    queryFn: get_patients,
  });

  console.log(isLoading);
  console.log(error);
  
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <main className="p-2 sm:p-5 md:8 overflow-y-auto flex-1">
        <Heading text="All Records" />

        <div className="grid grid-cols-3 mt-5 mr-2 mb-2 sm:mt-7 sm:mr-5">
          <div className="col-start-1 col-end-2">
            <Textbox placeholder="Search Patients"></Textbox>
          </div>
          <div className="col-start-3 flex justify-end items-center">
            <CustomDropDown options={["Name", "MPI"]} defaultValue="Search by" onSelect={(value) => console.log(value)} />
          </div>
        </div>

        <Records data={data?.data}></Records>
        
      </main>
    </div>
  )
};

export default Home;
