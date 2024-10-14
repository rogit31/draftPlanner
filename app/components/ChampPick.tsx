"use client";
import styles from "./ChampPick.module.css";
import { useState } from "react";
import championData from "./champInfo.json";

export default function ChampPick({ position }) {
    const [champName, setChampName] = useState("");

    const handleChampNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChampName(e.target.value);
    };

    function findChampionImage(champName: string) {
        const foundChamp = championData.find((champion) => champion.name === champName);
        return foundChamp ? foundChamp.image : null;
    }

    const champImage = findChampionImage(champName);

    return (
        <div className={`${styles.champDiv} ${styles[position]}`}>
            {champImage ? <img src={champImage} alt={champName} className={styles.champImg}/> : null}
            <input type="text" value={champName} onChange={handleChampNameChange}/>
            <span>{position.length < 4 ? `${position}` : ''}</span>
        </div>
    );
}
