"use client";
import {useEffect, useState} from "react";
import ChampField from "@/app/components/ChampField";
import champInfo from '../components/champInfo.json';

export default function PrioPicks() {
    const [picks, setPicks] = useState({
        top: ["", "", "", ""],
        jungle: ["", "", "", ""],
        mid: ["", "", "", ""],
        ad: ["", "", "", ""],
        support: ["", "", "", ""]
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedPicks = localStorage.getItem("picks");
            if (savedPicks) {
                setPicks(JSON.parse(savedPicks));
            }
            setIsMounted(true); // Set to true once mounted
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("picks", JSON.stringify(picks));
        }
    }, [picks, isMounted]);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    function handleAddChamp(role: keyof typeof picks) {
        setPicks((prevData) => ({
            ...prevData,
            [role]: [...prevData[role], ""],
        }));
    }

    function handleRemoveChamp(index: number, role: keyof typeof picks) {
        setPicks((prevData) => ({
            ...prevData,
            [role]: prevData[role].filter((_, i) => i !== index)
        }));
    }

    function handleChampNameChange(event: React.ChangeEvent<HTMLInputElement>, index: number, role: keyof typeof picks) {
        const newValue = event.target.value;
        setPicks((prevData) => ({
            ...prevData,
            [role]: prevData[role].map((champ, i) => (i === index ? newValue : champ))
        }));
    }

    return (
        <div className="w-96 border border-solid border-amber-500 p-4">
            <h2 className="text-center mb-4">Priority Picks</h2>
            <form onSubmit={handleSubmit} className="">
                {Object.entries(picks).map(([role, champs]) => (
                    <div key={role} className="">
                        <h3 className="font-bold text-center">{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
                        <hr/>
                        <div className="grid grid-cols-2 gap-1">
                        {champs.map((champion: string, index: number) => {
                            const champData = champInfo.find(champ => champ.name === champion);
                            const champImage = champData ? `${champData.image}` : null;
                            return (
                                <div key={index} className="">
                                    <div className="flex items-center gap-2">
                                        <ChampField
                                            value={champion}
                                            index={index}
                                            handleNameChange={(event:never) => handleChampNameChange(event, index, role as keyof typeof picks)}
                                            champImage={champImage}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveChamp(index, role as keyof typeof picks)}
                                            className="font-bold text-sm text-red-500"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleAddChamp(role as keyof typeof picks)}
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-md text-sm px-2.5 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 mt-2 mb-2"
                                type="button"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
}
