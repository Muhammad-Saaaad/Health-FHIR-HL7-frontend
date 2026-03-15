export default function error_response(err, err_about){
    const detail = err?.response?.data?.detail;
    const status = err?.response?.status;

    let message;
    // Sometimes FastAPI returns details as an array, and sometimes it returns it as a string,
    // so we need to handle both cases. 
    if (Array.isArray(detail)) {
        // if an array we loop through each error, where the location of the error is in loc[1],
        //  and the error message is in msg, and we join them with a new line.
        message = detail.map(e => `${e.loc[1]}: ${e.msg}`).join("\n");
    } else {
        message = detail || err?.message || "Unknown error";
    }

    alert(`${err_about}: ${message} (Status: ${status})`);
}