const Textbox = (props) => {
    let {placeholder, type} = props;

    type = type ? type : "text"; {/*type text | Date */}

    return <input type={type} className="border-2 border-[#E8F3F1] rounded-2xl w-45 h-7 md:w-60 lg:w-200 md:h-12 p-4"
        placeholder={placeholder}
    />
};

export default Textbox;