import { twMerge } from "tailwind-merge";

function Heading(props){
    let { text } = props;

    let element = <h1 className="text-5xl font-bold font-sans text-[#152F5B]">{text}</h1>;
    return element;
}

export function LowerHeading({ text, className }){
    let element = <h1 className={twMerge("text-3xl font-bold font-sans text-[#152F5B]", className)}>{text}</h1>;
    return element; 
}

export default Heading;

// props is an json object, you can call it like an attribute in html
// if you want to pass a int, float, or a boolean value, you have to use curly braces like <Heading isActive={true} />
// you can call the component like a single tag or a double tag
// example single tag: <Heading text="hello"/>
// example double tag: <Heading> hello </Heading> --- in this case, you have to use props.children to get the value ---
