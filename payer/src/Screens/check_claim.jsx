import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { claim_details, unlock_claim, change_claim_status } from "../api/claims";
import error_response from "../api/error_response";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import Label from "../components/label";
import Button from "../components/button";

export default function CheckClaim() {
    const navigate = useNavigate();
    const { claimId } = useParams(); // useParams is a hook that allows us to access the parameters in the URL, here we are accessing the claimId parameter that we defined in the App.jsx file.

    const userid = localStorage.getItem("user_id");
    useEffect(() => {
        const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";

        if (invalidUser) {
            localStorage.clear();
            alert("User not logged in. Please log in to continue.");
            navigate("/login");
        } 
    }, [userid, navigate])

    const { mutateAsync: unlock_claim_mutate } = useMutation({
        mutationFn: ({ claimId, userId }) => unlock_claim(claimId, userId),
        onError: (err) => {
            error_response(err, "Failed to unlock claim");
        }
    });

    const { mutateAsync: change_claim_status_mutate } = useMutation({
        mutationFn: ({ claimId, status }) => change_claim_status(claimId, status),
        onError: (err) => {
            error_response(err, "Failed to update claim status");
        }
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["claim_details", claimId],
        queryFn: () => claim_details(claimId),
        enabled: Boolean(claimId)
    });

    async function handleStatus(status) {
        const invalidUser = userid === null || userid === "" || userid === "undefined" || userid === "null";
        if (invalidUser) {
            localStorage.clear();
            alert("User not logged in. Please log in to continue.");
            navigate("/login");
            return;
        }
        if (status !== "Approved" && status !== "Reject") {
            alert("Invalid status. Please select either 'Approved' or 'Reject'.");
            return;
        }

        try {
            await change_claim_status_mutate({ claimId, status });
            console.log(`Claim status changed to ${status} successfully!`);
            await unlock_claim_mutate({ claimId, userId: userid });
            alert(`Claim ${status} successfully!`);
            navigate(-1); // navigate back to the previous page.
        } catch (err) {
            error_response(err, "Failed to update claim status");
        }
    }

    const remaining_amount = data?.total_coverage - data?.amount_used;

    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-2 sm:p-5 md:p-8">
                <Heading text={"Customer: "+ data?.patient_name} />

                {isLoading && <p className="mt-4 text-gray-500">Loading claim...</p>}
                {isError && <p className="mt-4 text-red-500">{error?.message || "Failed to load claim"}</p>}
                
                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979] flex flex-col gap-2">
                    <div>
                        <Label className="text-[#32496F]" text="Gender: "/>
                        <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && data?.gender} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Phone no: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.patient_phone_no)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Bill : " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.bill_amount)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Total Coverage: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.total_coverage )} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Remaining Amount: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && remaining_amount)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Service: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.service_included ? "Included" : "Not Included")} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Test: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.tests_included ? "Included" : "Not Included")} />
                    </div>
                </div>

                <div className="flex justify-around items-center">
                    <Button
                        type="Submit"
                        className="active:bg-[#7791bc]"
                        onClick={() => handleStatus("Approved")}
                        text="Approved"
                    />

                    <Button
                        type="Submit"
                        className="bg-[#6F7683]  font-bold active:bg-[#505257]"
                        onClick={() => handleStatus("Reject")}
                        text="Reject"
                    />
                </div>
                
            </main>
        </div>
    );
}