import { useQuery } from "@tanstack/react-query";
import { get_patients } from "../api/patient";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading"
import Textbox from "../components/textbox"
import { CustomDropDown } from "../components/dropdown"
import { HomeRecords } from "../components/records";

const Home = () => {

  const insurance_id = localStorage.getItem("insurance_id");

  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["payer_getPatients"],
    queryFn: () => get_patients(insurance_id),
  });

  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-2 sm:p-5 md:p-8">
        <Heading text="Insurance List" />

        <div className="grid grid-cols-3 mt-5 mr-2 mb-2 sm:mt-7 sm:mr-5">
          <div className="col-start-1 col-end-2">
            <Textbox placeholder="Search"></Textbox>
          </div>
          <div className="col-start-3 flex justify-end items-center">
            <CustomDropDown options={["Name", "NIC"]} defaultValue="Select by" onSelect={(value) => console.log(value)} />
          </div>
        </div>

        {isLoading && <p className="mt-4 text-gray-500">Loading...</p>}
        {isError && <p className="mt-4 text-red-500">{error?.message || "Failed to load patients"}</p>}
        {!isLoading && !isError && <HomeRecords data={data?.data} />}

      </main>
    </div>
  )
};

export default Home;
