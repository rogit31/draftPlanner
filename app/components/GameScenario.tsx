
"use client";
import { useState } from "react";
import champInfo from '../components/champInfo.json'; // Adjust the path as necessary
import styles from "./GameScenario.module.css";

export default function GameScenario() {
    const [blueData, setBlueData] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [redData, setRedData] = useState(["", "", "", "", "", "", "", "", "", ""]);

    function handleNameChange(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        team: "blue" | "red"
    ) {
        const newValue = event.target.value;

        if (team === "blue") {
            setBlueData((prev) => prev.map((champ, i) => (i === index ? newValue : champ)));
        } else {
            setRedData((prev) => prev.map((champ, i) => (i === index ? newValue : champ)));
        }
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <div className="flex max-w-full">
            <form onSubmit={handleSubmit} className={styles.draftSet}>
                <h3>Blue</h3>
                {blueData.map((champ, index) => {
                    const champData = champInfo.find((champion) => champion.name === champ);
                    const champImage = champData ? `${champData.image}` : null;

                    return (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={champ}
                                onChange={(event) => handleNameChange(event, index, "blue")}
                            />
                            {champImage && <img src={champImage} alt={champ} className="ml-2 w-10 h-10" />}
                            {index < 3 && <span>(Ban)</span>}
                            {index === 3 && <span>B1</span>}
                            {index === 4 && <span>B2</span>}
                            {index === 5 && <span>B3</span>}
                            {index === 6 && <span>(Ban)</span>}
                            {index === 7 && <span>(Ban)</span>}
                            {index === 8 && <span>B4</span>}
                            {index === 9 && <span>B5</span>}
                        </div>
                    );
                })}
            </form>
            <form onSubmit={handleSubmit} className={styles.draftSet}>
                <h3>Red</h3>
                {redData.map((champ, index) => {
                    const champData = champInfo.find((champion) => champion.name === champ);
                    const champImage = champData ? `${champData.image}` : null;

                    return (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={champ}
                                onChange={(event) => handleNameChange(event, index, "red")}
                            />
                            {champImage && <img src={champImage} alt={champ} className="ml-2 w-10 h-10" />}
                            {index < 3 && <span>(Ban)</span>}
                            {index === 3 && <span>R1</span>}
                            {index === 4 && <span>R2</span>}
                            {index === 5 && <span>R3</span>}
                            {index === 6 && <span>(Ban)</span>}
                            {index === 7 && <span>(Ban)</span>}
                            {index === 8 && <span>R4</span>}
                            {index === 9 && <span>R5</span>}
                        </div>
                    );
                })}
            </form>
        </div>
    );
}
