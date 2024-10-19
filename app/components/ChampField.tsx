
export default function ChampField(props: { value: string, index: number, handleNameChange:any, champImage?:string|null}) {


    return (
        <div className="">
            <input type="text" className="text-black m-0.5 p-0.5 w-28 rounded-sm" value={props.value}
                   onChange={(event) => props.handleNameChange(event, props.index)}/>
            {props.champImage && <img src={props.champImage} alt={props.value} className="ml-2 w-10 h-10" />}
        </div>
    );
}