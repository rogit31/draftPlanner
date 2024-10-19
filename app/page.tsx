"use client"
import PrioPicks from "@/app/components/PrioPicks";
import MatchSet from "@/app/components/MatchSet";
import {useEffect, useState} from "react";
import matchSet from "@/app/components/MatchSet";

export default function Home() {

    function buildData() {
        return {
            matchSets: [buildMatch()],
            priorityPicks: [],
            blueSidePriority: [],
        };
    }

    function buildMatch() {
        return {
            opponentName: 'Opponent 1',
            id: '0',
            drafts: buildDrafts(10),
        };
    }

    function buildDrafts(draftCount: number) {
        return Array(draftCount).fill(undefined).map((_, index) => ({
            id: index,

            blueSide: {
                side: 'blue',
                picks: [
                    {
                        championPosition: 'blueBan1',
                        championIndex: 0,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'blueBan2',
                        championIndex: 1,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'blueBan3',
                        championIndex: 2,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'B1',
                        championIndex: 3,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'B2',
                        championIndex: 4,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'B3',
                        championIndex: 5,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'blueBan4',
                        championIndex: 6,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'blueBan5',
                        championIndex: 7,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'B4',
                        championIndex: 8,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'B5',
                        championIndex: 9,
                        championName: '',
                        isPick: true
                    }
                ]
            },
            redSide: {
                side: 'red',
                picks: [
                    {
                        championPosition: 'redBan1',
                        championIndex: 0,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'redBan2',
                        championIndex: 1,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'redBan3',
                        championIndex: 2,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'R1',
                        championIndex: 3,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'R2',
                        championIndex: 4,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'R3',
                        championIndex: 5,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'redBan4',
                        championIndex: 6,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'redBan5',
                        championIndex: 7,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'R4',
                        championIndex: 8,
                        championName: '',
                        isPick: true
                    },
                    {
                        championPosition: 'R5',
                        championIndex: 9,
                        championName: '',
                        isPick: true
                    }
                ]
            }
        }));
    }

    function handleAddMatchSet() {
        const newMatchSet = buildMatch();
        newMatchSet.id = data.matchSets.length.toString();
        newMatchSet.opponentName = `Opponent ${data.matchSets.length + 1}`;
        setData((prevState) => ({
            ...prevState,
            matchSets: [...prevState.matchSets, newMatchSet],
        }));
    }

    const handleChampChange = (
        matchSetIndex: number,
        draftID: number,
        champIndex: number,
        newChampName: string,
        side: "blue" | "red"
    ) => {
        setData((prevState) => {
            const updatedMatchSets = [...prevState.matchSets];
            const matchSet = updatedMatchSets[matchSetIndex];
            const draft = matchSet.drafts.find((d) => d.id === draftID)

            if (!draft) {
                console.error("Oops, draft was undefined.");
                return prevState;
            }
            const picks = side === "blue" ? draft.blueSide.picks : draft.redSide.picks;

            if (picks[champIndex]) {
                picks[champIndex].championName = newChampName;
            } else {
                console.error("Invalid champion index.");
            }

            return {
                ...prevState,
                matchSets: updatedMatchSets,
            };
        });
    };

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("data");
        return savedData ? JSON.parse(savedData) : buildData();
    });

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center">Home page</h1>
            <div className="">
                <PrioPicks />
                {data.matchSets.map((matchSet, matchSetIndex) => {
                    return (
                        <div key={matchSet.id} className="matchSetWrapper">
                            <MatchSet
                                matchSet={matchSet}
                                matchSetIndex={matchSetIndex}
                                handleChampChange={handleChampChange}
                            />
                        </div>
                    );
                })}
                <button onClick={() => handleAddMatchSet()}>Add match</button>
            </div>
        </>
    );
}
