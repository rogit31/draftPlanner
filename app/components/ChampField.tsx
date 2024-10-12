import {useState} from "react";

export default function ChampField(props: { value: string, index: number, handleNameChange:any, champImage?:string|null}) {


    return (
        <>
            <input type="text" className="text-black m-1 p-1" value={props.value}
                   onChange={(event) => props.handleNameChange(event, props.index)}/>
            <img src="" alt=""/>
            {props.champImage && <img src={props.champImage} alt={props.value} className="ml-2 w-8 h-8" />}
        </>
    );
}