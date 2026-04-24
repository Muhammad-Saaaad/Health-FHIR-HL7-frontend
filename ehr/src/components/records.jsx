import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, FileText } from "lucide-react";
import { visit_note_by_doctor_per_patient } from "../api/visit_note";

export default function Records({data}) {
  const navigate = useNavigate();

  return(
      <div className="grid grid-cols-12 mt-5 gap-x-5">
      {
        data.map((item, index) => ( // every column will have its own grid
          <div 
            key={index} 
            className="border-2 border-[#828181] rounded-2xl col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 my-1 sm:my-3 "
            onClick={(e) => {
              e.stopPropagation();

              navigate(`/ehr/view-patient`, {
                state: {
                  "mpi": item.mpi,
                  "name": item.name,
                  "phone_no": item.phone_no,
                }
              });
            }}
          >
              <div className="col-span-11" >
                <div className="flex space-x-5 items-center">
                  <div>
                    <img src="/icons/main/Profile_pic.png" alt="profile" className="w-15 h-15"/>
                  </div>
                  <div>
                    <p className="font-bold text-[#152F5B]">{item.name}</p>
                    <p className="font-bold opacity-60">MPI: {item.mpi}</p>
                    <p className="opacity-40">{item.gender}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center col-span-1">
                <ChevronRight className="h-6 w-6 text-[#7A7979]" />
              </div> 
            </div>           
        ))
      }

    </div>
  )
}

export function Notes({mpi}){

  const navigate = useNavigate();
  const doctor_id = localStorage.getItem("doctor_id");

  const { data: visitNotes = [], isLoading, isError } = useQuery({
    queryKey: ['visit_notes', mpi, doctor_id],
    queryFn: () => visit_note_by_doctor_per_patient(mpi, doctor_id),  
    enabled: Boolean(mpi && (doctor_id != undefined || doctor_id != null)) // only trigger when there is an mpi and doctor_id available
  });

  if (isLoading) {
    return <div className="py-4 text-sm text-[#7A7979]">Loading visit notes...</div>;
  }

  if (isError) {
    return <div className="py-4 text-sm text-red-600">Unable to load visit notes.</div>;
  }

  return(
    <div className="h-full space-y-3 overflow-y-auto pr-1 md:pr-2 [scrollbar-gutter:stable]">
      {visitNotes?.map((item, index) => (
        <div
          key={item?.note_id ?? index}                                                                                           // smooth transition between colors
          className="flex items-center justify-between rounded-2xl border border-[#7A7979] bg-white px-4 py-4 shadow-sm transition-colors hover:bg-slate-100"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/ehr/view-note`, {state: {note_id: item.note_id}} )
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF]">
              <FileText className="h-9 w-9" strokeWidth={2.0} />
            </div>
            <div>
              <p className="text-md font-semibold text-[#152F5B]">
                {item?.note_title || "Visit Note"}
              </p>
              <p className="mt-1 text-md text-[#7A7979]">
                {item?.visit_date || ""}
              </p>
            </div>
          </div>

          <ChevronRight 
            className="h-6 w-6 text-[#7A7979]" />
        </div>
      ))}
    </div>
  )
}

export function LabReports({data: LabData}){
  console.log("LabData in LabReports component: ", LabData);
  return(
    <div className="h-full space-y-3 overflow-y-auto pr-1 md:pr-2 [scrollbar-gutter:stable]">
      {LabData.map((item, index) => (
        <div
          key={item?.report_id ?? index}                                                                                           // smooth transition between colors
          className="flex items-center justify-between rounded-2xl border border-[#7A7979] bg-white px-4 py-4 shadow-sm transition-colors hover:bg-slate-100"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/ehr/view-report`, {state: {report_id: item?.report_id}} )
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 sm:h-16 sm:w-16  shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF]">
              <FileText className="h-6 w-6 sm:h-9 sm:w-9 " strokeWidth={2.0} />
            </div>
            <div className="">
              <p className="text-md font-semibold text-[#152F5B]">
                {item?.test_name  || "Lab Report"}
              </p>
              <p className="mt-1 text-md text-[#7A7979] truncate">
                {item?.updated_at || "No Date Available"}
              </p>
              <p className="mt-1 text-md font-semibold text-[#7A7979]">
                {item?.test_status || "Pending"}
              </p>
            </div>
          </div>

          <ChevronRight className="shrink-0 h-6 w-6 text-[#7A7979]" />
        </div>
      ))}
    </div>
  );
}