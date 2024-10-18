"use client";
// import styles from "./GameScenario.module.css";
import {DraftScenarioProps} from "@/app/types";
import championData from "@/app/components/champInfo.json";
import {FC} from "react";


const DraftScenario:FC<DraftScenarioProps> = ({ draft, matchSetIndex, handleChampChange }) => {

    function findChampionImage(champName: string) {
        const foundChamp = championData.find((champion) => champion.name === champName);
        return foundChamp ? foundChamp.image : null;
    }

    return (
        <div>
            <h2>{draft.id}</h2>
            {draft.picks.map((pick) => {
                const champImage = findChampionImage(pick.championName);
                return (
                    <div key={pick.championIndex}>
                        {champImage ? <img src={champImage} alt={pick.championName}/> : null}
                        <input
                            type="text"
                            value={pick.championName}
                            onChange={(e) => handleChampChange(matchSetIndex, draft.id, pick.championIndex, e.target.value)}
                        />
                        <span>{pick.championPosition.length < 4 ? `${pick.championPosition}` : ''}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default DraftScenario