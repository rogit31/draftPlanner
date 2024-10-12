"use client"
import {useState} from "react";
import ChampField from "@/app/components/ChampField";
import champInfo from '../components/champInfo.json';

export default function PrioPicks(){
    const [picks, setPicks] = useState(["", "", "", "", ""]);

    function handleSubmit(event){
        event.preventDefault()
    }

    function handleAddChamp(){
        setPicks((prevData)=>([...prevData, ""]))
    }
    function handleRemoveChamp(index){
        setPicks((prevData)=>(prevData.filter((_, i) => i !== index)))
    }
    function handleChampNameChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const newValue = event.target.value;
        setPicks((prevData) => {
            const newPicks = [...prevData];
            newPicks[index] = newValue;
            return newPicks;
        });
    }


    return(
        <div>
            <form action="" onSubmit={handleSubmit} className="flex flex-col max-w-lg">
                {picks.map((champion:string, index:number) => {
                    const champData = champInfo.find(champ => champ.name === champion);
                    const champImage = champData ? `${champData.image}` : null;

                    return (
                        <div key={index}>
                            <ChampField value={champion} index={index} handleNameChange={handleChampNameChange} champImage={champImage}/>
                            <button type="button" onClick={() => handleRemoveChamp(index)}>Remove</button>
                        </div>
                    )}
                )
                }
                <button onClick={handleAddChamp} type={"button"}>Add champ</button>
            </form>
        </div>
    )
}