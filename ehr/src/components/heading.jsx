import { twMerge } from "tailwind-merge";

function Heading(props){
    let { text, level, className } = props;

    if (!level) {
        level = 1;
    }

    let element;
    switch (level) {
        case 1:
            element = <h1 className={twMerge("text-5xl font-bold font-sans text-[#152F5B]", className)}>{text}</h1>;
            break;
        case 2:
            element = <h2 className={twMerge("text-4xl font-bold font-sans text-[#152F5B]", className)}>{text}</h2>;
            break;
        case 3:
            element = <h3 className={twMerge("text-3xl font-bold font-sans text-[#152F5B]", className)}>{text}</h3>;
            break;
        default:
            element = <h1 className={twMerge("text-5xl font-bold font-sans text-[#152F5B]", className)}>{text}</h1>;
    }
    return element;
}

export default Heading;

// props is an json object, you can call it like an attribute in html
// if you want to pass a int, float, or a boolean value, you have to use curly braces like <Heading isActive={true} />
// you can call the component like a single tag or a double tag
// example single tag: <Heading text="hello"/>
// example double tag: <Heading> hello </Heading> --- in this case, you have to use props.children to get the value ---
