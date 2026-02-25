import { useNavigate } from "react-router-dom";

const Image = (props) =>  {
    let navigator = useNavigate();
    let {alt, src, text, color, link} = props;

    color = color ? color : "text-[#747474]";

    return <div className="flex items-center gap-8" onClick={() => navigator(link)}>
        <img className="w-8 h-8" src={src} alt={alt} />
        {
            text && <p className={`font-semibold ${color}`}>{text}</p>
        }
    </div>
};

export default Image;