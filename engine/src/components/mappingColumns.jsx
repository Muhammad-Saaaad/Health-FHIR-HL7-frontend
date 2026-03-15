export default function MappingColumns({FIELDS, checked, toggle }) {

    let fontendData = {} 
    // blow loop will make this:
    // {"patient": [ {endpoint_filed_id, path, name}, ...], "coverage": [...]}
    FIELDS?.forEach(element => {
        if (!fontendData[element.resource]) {
            fontendData[element.resource] = []
        }
        fontendData[element.resource].push(element);
    });
    
    return (
        <div className="p-3">
            {Object.keys(fontendData)?.map((resource, index) => (
                <div key={index}>
                    <p className="font-bold text-sm mb-2">{resource}</p>
                    {fontendData[resource]?.map(field => (          
                        
                        // the cursor-pointer turn the arrow into a finger for better representation.
                        // select-none means that the user cannot highlight or select the text.
                        <label key={field.endpoint_filed_id} className="flex items-center gap-2 mb-1 cursor-pointer select-none">
                            
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-[#31486F]" // accent is the color of the checkbox when it's checked.
                                checked={checked.includes(field)} // if the field is in the checked list, then it's checked.
                                onChange={() => toggle(field)}
                            />

                            <span className={`text-sm ${checked.includes(field) ? "line-through text-gray-400" : "text-gray-700"}`}>
                                {field.name}
                            </span>

                        </label>
                    ))}
                    
                </div>
            ))} 
        </div> 
    )
}