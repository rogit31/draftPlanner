
export default function ChampField(props: { value: string, index: number, handleNameChange:any, champImage?:string|null}) {


    return (
        <div className="prioPickInputWrapper">
            <input type="text" className="prioPickInput" value={props.value}
                   onChange={(event) => props.handleNameChange(event, props.index)}/>
            {props.champImage && <img src={props.champImage} alt={props.value}/>}
        </div>
    );
}