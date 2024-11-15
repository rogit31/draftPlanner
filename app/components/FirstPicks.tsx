"use client";
import { useEffect, useState } from "react";
import champInfo from '../components/champInfo.json';


export default function FirstPicks() {
    const [firstPicks, setFirstPicks] = useState({
        blueSide: ["Ahri", "", "", "", ""],
        redSide: ["", "", "", "", ""]
    })
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFirstPicks = localStorage.getItem("firstPicks");
            if (savedFirstPicks) {
                setFirstPicks(JSON.parse(savedFirstPicks));
            }
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("firstPicks", JSON.stringify(firstPicks));
        }
    }, [firstPicks, isMounted]);

    type Side = "blueSide" | "redSide";
    function handleNameChange(index: number, side: Side, newName: string) {
        setFirstPicks((prevState) => ({
            ...prevState,
            [side]: prevState[side].map((pick: string, i: number) => (i === index ? newName : pick))
        }));
    }

    function handleAddChampion(side: Side) {
        setFirstPicks((prevState) => ({
            ...prevState,
            [side]: [...prevState[side], ""]
        }))
    }

    function handleRemoveChampion(index: number, side: Side) {
        setFirstPicks((prevState) => ({
            ...prevState,
            [side]: prevState[side].filter((_, i: number) => i !== index)
        }));
    }

    return(
        <div className="">
        <h2 className="text-center font-bold">First Picks</h2>
        <div className="firstPicksInputsWrapper">
            <div className="firstPicksVerticalWrapper">
                {firstPicks.blueSide.map((pick, index) => {
                    const championMatch = champInfo.find(champ => champ.name.toLowerCase() === pick.toLowerCase());
                    const championImage = championMatch ? `${championMatch.image}` : null;
                    return(
                        <div key={index} className="championFirstPickWrapper blueSideFirstPickWrapper firstPicksInputRow">
                            <input className="championFirstPickInput blueSideFirstPicks firstPicksInputCell" type="text" value={pick}
                                   onChange={(e) => handleNameChange(index, "blueSide", e.target.value)}/>
                            {championImage ? <img src={championImage} alt={pick}/> : null}
                            <button className="removePickButton" onClick={() => handleRemoveChampion(index, "blueSide")}>X</button>
                        </div>
                    )
                })}
                <div className="addChampionButtonWrapper">
                    <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium text-sm px-2.5 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 mt-2 mb-2"
                        onClick={() => handleAddChampion("blueSide")}>
                        Add
                    </button>
                </div>

        </div>
            <div className="firstPicksVerticalWrapper">
                {firstPicks.redSide.map((pick, index) => {
                    const championMatch = champInfo.find(champ => champ.name.toLowerCase() === pick.toLowerCase());
                    const championImage = championMatch ? `${championMatch.image}` : null;
                    return (
                        <div key={index} className="championFirstPickWrapper redSideFirstPickWrapper firstPicksInputRow">
                            <input className="championFirstPickInput redSideFirstPicks firstPicksInputCell" type="text" value={pick}
                                   onChange={(e) => handleNameChange(index, "redSide", e.target.value)}/>
                            {championImage ? <img src={championImage} alt={pick}/> : null}
                            <button className="removePickButton" onClick={() => handleRemoveChampion(index, "redSide")}>
                                X</button>
                        </div>
                    )
                })}
                <div className="addChampionButtonWrapper">
                    <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium text-sm px-2.5 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 mt-2 mb-2"
                        onClick={() => handleAddChampion("redSide")}>
                        Add
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}
