const Label = (props) => {
    const {children} = props;
    return <label className="font-bold text-xl">{children}</label>
};

export function GenderLabel(props){
    const { children } = props;
    return <label className="text-xl">{children}</label>
} 

export default Label;