const DropDown = (props) => {
    // This onSelect is a function that is given from the parent to this compoenent
    let {options, defaultValue, onSelect} = props;

    function changeValue(event){
        const value = event.target.value;
        if (onSelect){
            onSelect(value);
        }
    }
    
    return <select 
        className="border-2 border-[#E8F3F1] rounded-2xl w-full h-12 p-2 pr-8"
        onChange={changeValue}
        defaultValue={defaultValue}
    >
        <option value="">{defaultValue}</option>

        {options.map((element, index) => (
            <option key={index} value={element}>{element}</option>
        ))}

    </select>
}

export default DropDown;