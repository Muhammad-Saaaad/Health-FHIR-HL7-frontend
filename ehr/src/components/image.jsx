import { useNavigate } from "react-router-dom";

const Image = (props) =>  {
    let navigator = useNavigate();
    let {alt, src, text, color, link} = props;

    color = color ? color : "text-[#747474]";

    return <div className="flex flex-col items-center gap-2" onClick={() => navigator(link)}>
        <img className="w-6 h-6" src={src} alt={alt} />
        <p className={`font-semibold ${color}`}>{text}</p>
    </div>
};

export default Image;