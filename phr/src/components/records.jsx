export default function Records({data}){

    return(
        <div className="grid grid-cols-12 mt-5 gap-x-5">
        { // the ? is use as a if statement, here it is making sure if that data is available or not.
          data?.map((item, index) => ( // every column will have its own grid
            <div 
              key={index} 
              className="border-2 border-[#828181] rounded-2xl col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 my-1 sm:my-3 "
            >
                <div className="col-span-11" >
                  <div className="flex space-x-5 items-center">
                    <div>
                      <img src="/icons/Profile_pic.png" alt="profile" className="w-17 h-17"/>
                    </div>
                    <div>
                      <p className="font-bold text-[#152F5B]">{item.name}</p>
                      <p className="font-bold opacity-60">phone_no: {item.phone_no}</p>
                      <p className="opacity-40">last visit: {item.last_visit.split("T")[0]}</p>
                      <p className="opacity-60 font-bold">speclization: {item.speclization}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start items-center col-span-1">
                  <button type="button">
                    <img src="/icons/go_arrow.png" alt=">" className="h-5 w-3" />
                  </button>
                </div> 
             </div>           
          ))
        }

      </div>
    )
}