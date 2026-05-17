import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { twMerge } from "tailwind-merge";
import { expense_breakdown } from "../api/patient";

export default function Records({data}) {
  
  const navigate = useNavigate();

  const userid = localStorage.getItem("user_id");
  useEffect(() => {
    const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";

    if (invalidUser) {
      localStorage.clear();
      alert("User not logged in. Please log in to continue.");
      navigate("/login");
    } 
  }, [userid, navigate])

  async function handleClaimClick(claim_id) {
    const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";
    if (invalidUser) {
      localStorage.clear();
      alert("User not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }
    navigate(`/claim/${claim_id}`);
  }

  return(
      <div className="grid grid-cols-12 mt-5 gap-x-5">
      { // the ? is use as a if statement, here it is making sure if that data is available or not.
        data?.map((item, index) => ( // every column will have its own grid
          <div 
            key={index} 
            className="border-2 border-[#828181] rounded-2xl col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 my-1 sm:my-3"
            onClick={() => handleClaimClick(item.claim_id)}
          >
              <div className="col-span-11" >
                <div className="flex space-x-5 items-center">
                  <div>
                    <img src="/icons/main/Profile_pic.png" alt="profile" className="w-20 h-20"/>
                  </div>
                  <div>
                    <p className="font-bold text-[#152F5B]">{item.name}</p>
                    <p className="font-bold opacity-60">NIC: {item.nic}</p>
                    <p className="opacity-40">{item.created_at}</p>
                    <p className="opacity-60 font-bold">Claim_number: {item.claim_id }</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center col-span-1">
                <button type="button">
                  <img src="/icons/main/go_arrow.png" alt=">" className="h-5 w-3" />
                </button>
              </div> 
            </div>           
        ))
      }

    </div>
  )
}


export function HomeRecords({data}) {
  
  const navigate = useNavigate();
 
  return(
      <div className="grid grid-cols-12 mt-5 gap-x-5">
      { // the ? is use as a if statement, here it is making sure if that data is available or not.
        data?.map((item, index) => ( // every column will have its own grid
          <div 
            key={index} 
            className={`border-2 border-[#828181] rounded-2xl col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 my-1 sm:my-3`}
            onClick={() => navigate("/view-customer", {state: {pid: item.p_id }})}
          >
              <div className="col-span-11" >
                <div className="flex space-x-5 items-center">
                  <div>
                    <img src="/icons/main/Profile_pic.png" alt="profile" className="w-20 h-20"/>
                  </div>
                  <div>
                    <p className="font-bold text-[#152F5B]">{item.name}</p>
                    <p className="font-bold opacity-60">NIC: {item.nic}</p>
                    <p className="opacity-40">{item.date_of_birth}</p>
                    <p className="opacity-60 font-bold">policy_number: {item.policy_number}</p> 
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center col-span-1">
                <button type="button">
                  <img src="/icons/main/go_arrow.png" alt=">" className="h-5 w-3" />
                </button>
              </div> 
            </div>           
        ))
      }

    </div>
  )
}

export function ExpenseBreakdown({patientId, policy_id}) {

  console.log("Patient ID:", patientId);
  console.log("Policy ID:", policy_id);

  const {data, isLoading, isError, error} = useQuery({
        queryKey: ["payer_getExpenseBreakdown", patientId, policy_id],
        queryFn: () => expense_breakdown(patientId, policy_id),
        enabled: Boolean(patientId && policy_id)
    });

  if (isLoading) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-slate-500 shadow-sm">
        Loading expense breakdown...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
        {error?.message || "Unable to load expense breakdown."}
      </div>
    );
  }
   
  return(
      <div className="mt-5 grid grid-cols-12 gap-4">
      {
        data?.map((item, index) => {

            const isInactive = item.status === "Rejected";
            const statusClass = isInactive
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700";

            // you should add the key to the parent container instead of child containers.
            return (
              <div
                key={index}
                className="col-span-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:col-span-6 lg:col-span-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Claim Date
                    </p>
                    <div className="mt-1 text-lg font-extrabold text-[#152F5B]">
                      {item.claim_date}
                    </div>
                  </div>

                  <span className={twMerge("rounded-full border px-3 py-1 text-xs font-semibold", statusClass)}>
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-700">Service</span>
                    <span>{item.service_included ? "Included" : "Not Included"}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-700">Tests</span>
                    <span>{item.tests_included ? "Included" : "Not Included"}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2">
                    <span className="font-semibold text-slate-700">Total Amount</span>
                    <span className="text-base font-bold text-slate-900">{item.total_amount}</span>
                  </div>
                </div>
              </div>
            )
        })
      }

    </div>
  )
}