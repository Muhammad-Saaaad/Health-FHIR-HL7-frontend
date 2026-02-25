import { GenderLabel } from "./label";

export default function RadioButton(props){
    const { items, name } = props;
    return (
        <>
            {
                items.map((item, index) => {
                    return <div className="space-y-0 space-x-3 lg:mb-5">
                        <input type="radio" key={index} value={item} name={name} onClick={(e) => console.log(e.target.value)} />
                        <GenderLabel>{item}</GenderLabel>
                    </div>
                })
            }
        </>
    );
}