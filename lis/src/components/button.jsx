const Button = (props) => {
    let { text } = props;

    return <button className="
        bg-[#31486F] 
        text-white
        p-2
        rounded-2xl
        h-15 w-30
        font-bold
        text-2xl
        ">{text}
    </button>
}

export default Button;