import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { lock_claim } from "../api/claims";
import { twMerge } from "tailwind-merge";
import { expense_breakdown } from "../api/patient";

export default function Records({data}) {
  
  const navigate = useNavigate();

  const [selected_claim_id, setSelectedClaimID] = useState(0);

  const userid = localStorage.getItem("user_id");
  useEffect(() => {
    const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";

    if (invalidUser) {
      localStorage.clear();
      alert("User not logged in. Please log in to continue.");
      navigate("/login");
    } 
  }, [userid, navigate])

  const { mutateAsync: lockClaim, isPending: lock_is_loading } = useMutation({
    mutationFn: ({ claim_id, user_id }) => lock_claim(claim_id, user_id),
  });

  async function handleClaimClick(claim_id) {
    const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";
    if (invalidUser) {
      localStorage.clear();
      alert("User not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    if (lock_is_loading) {
      console.log("Locking in progress somehow. There might be a delay in setting the loading state. Please wait.");
      return;
    }

    setSelectedClaimID(claim_id);

    try {
      await lockClaim({ claim_id, user_id: userid });
      console.log(`Claim ${claim_id} locked successfully by user ${userid}`);
      navigate(`/claim/${claim_id}`);
    }
    catch {
      alert("Claim is currently being checked by another user. Please try again later.");
    }
  }

  return(
      <div className="grid grid-cols-12 mt-5 gap-x-5">
      { // the ? is use as a if statement, here it is making sure if that data is available or not.
        data?.map((item, index) => ( // every column will have its own grid
          <div 
            key={index} 
            className={`border-2 border-[#828181] rounded-2xl col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 my-1 sm:my-3 ${lock_is_loading && selected_claim_id === item.claim_id ? "opacity-70 cursor-wait" : ""}`}
            onClick={() => handleClaimClick(item.claim_id)}
          >
              <div className="col-span-11" >
                <div className="flex space-x-5 items-center">
                  <div>
                    <img src="/icons/main/Profile_pic.png" alt="profile" className="w-20 h-20"/>
                  </div>
                  <div>
                    <p className="font-bold text-[#152F5B]">{item.name}</p>
                    <p className="font-bold opacity-60">MPI: {item.mpi}</p>
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
                    <p className="font-bold opacity-60">MPI: {item.mpi}</p>
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
   
  return(
      <div className="grid grid-cols-12 mt-5 gap-x-5">
      {
        data?.map((item, index) => {

            let color_status = "text-green-500"
            if (item.status === 'Inactive') {
                color_status = "text-red-500"
            }

            // you should add the key to the parent container instead of child containers.
            return <div key={index} className="m-2 border-2 border-gray-400 rounded-lg px-2 py-1 shadow-lg">
                <div className="font-extrabold text-[#152F5B] text-xl text-start">
                    {item.claim_date}
                </div>
                <hr />

                <div className="flex justify-between mt-1">
                    <div>
                        <div>
                            <p className="font-bold inline-block text-lg">Service:</p>
                            {" "+item.service_included ? "Included" : "Not Included"}
                        </div>
                        <div>
                            <p className="font-bold inline-block text-lg">Tests:</p>
                            {" "+item.tests_included ? "Included" : "Not Included"}
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                           <p className="font-bold inline-block text-lg">Tests:</p>
                           <p> {" "+item.total_amount} </p>
                          </div>
                          <div>
                           <p className={twMerge("font-bold", color_status)}> {+item.status} </p>
                          </div>
                        </div>
                    </div>
                </div>

            </div>
        })
      }

    </div>
  )
}