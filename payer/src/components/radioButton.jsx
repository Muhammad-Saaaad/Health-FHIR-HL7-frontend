import { GenderLabel } from "./label";

export default function RadioButton(props){
    const { items, name, onChange } = props;
    return (
        <>
            {
                items.map((item, index) => {
                    return <div className="space-y-0 space-x-3 lg:mb-5" key={index}>
                        <input type="radio" value={item} name={name} onClick={(e) => onChange(e.target.value)} />
                        <GenderLabel>{item}</GenderLabel>
                    </div>
                })
            }
        </>
    );
}