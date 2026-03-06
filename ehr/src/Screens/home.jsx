import { useQuery } from "@tanstack/react-query";

import { get_patients } from "../api/patient"
import Textbox from "../components/textbox";
import Heading from "../components/heading";
import Sidebar from "../components/sidebar";
import Records from "../components/records"

const Home = () => {
  
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ['ehr_all_patients'],
    queryFn: get_patients
  });

  console.log(data);
  console.log( 'isloading', isLoading);
  console.log('is error ', isError);
  console.log('error', error);
  console.log('status ', status);

  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-[#8cd7f5] min-h-screen relative top-0">
          {/* min-h-screen set the color to entire screen. */}
          {/* <Sidebar page="Home" /> */}
          <div className="mx-2 bg-[#8cd7f5] mb-5">
            <div className=" flex items-center justify-between gap-3">

              <div className="flex flex-col ">
                <img src="icons/main/Dr_Sana.png" alt="Doctor"className="w-20 h-20 mb-2"/>
                <p className=" inline-block font-bold text-[#152F5B]">Welcome!</p>
              </div>

              <img src="icons/main/Logo.png" alt="Logo" className="w-40 h-35" />
            </div>
          </div>

          <div className="bg-white rounded-t-2xl min-h-screen p-5">
            <Textbox placeholder="Search Patients" />
            <br /><br />

            <div className="relative mb-4">
                <Heading text="Patient List" />
            </div>

            {/* Patient list */}
            {
              !isLoading && !isError && <Records data={data?.data}></Records>
            }
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
