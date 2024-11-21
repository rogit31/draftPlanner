"use client"
import PrioPicks from "@/app/components/PrioPicks";
import MatchSet from "@/app/components/MatchSet";
import {useEffect, useState} from "react";
import FirstPicks from "@/app/components/FirstPicks";

//TODO: trim user input for champion names

export default function Home() {

    const [data, setData] = useState(buildData);
    const [isMounted, setIsMounted] = useState(false);
    const [settings, setSettings] = useState({
        draft_border: "#ffffff",
        banColor: "#716f6f",
        bluePicksColor: "#18a4d1",
        redPicksColor: "#ea5f5f",
        backgroundColor: "#0c0c0c",
        fontColor: "#ffffff",
        placeholderColor: "#474444"
    });

    function buildData() {
        return {
            matchSets: [buildMatch()],
            priorityPicks: [],
            blueSidePriority: [],
        };
    }
    //Fetching settings and data from localstorage
    useEffect(() => {
        if(typeof(window) !== undefined){
            const savedData = localStorage.getItem("data");
            const savedSettings = localStorage.getItem("settings");
            if(savedData){
                setData((JSON).parse(savedData));
            }
            if(savedSettings){
                const parsedSettings = JSON.parse(savedSettings);
                setSettings(parsedSettings);
                Object.keys(parsedSettings).forEach((key) => {
                    document.documentElement.style.setProperty(`--${key}`, parsedSettings[key])
                })
            }
            setIsMounted(true)
        }
    }, []);

    useEffect(() => {
        if(isMounted){
            localStorage.setItem("data", JSON.stringify(data));
            localStorage.setItem("settings", JSON.stringify(settings))
        }
    }, [data, settings, isMounted]);

    function buildMatch() {
        return {
            team1: 'Team 1',
            team2: 'Team 2',
            id: 0,
            drafts: [...buildDrafts(5,"regular"), ...buildDrafts(5, "reverse", 5)],
        };
    }

    function buildDrafts(draftCount: number, siding: "regular" | "reverse", startID: number = 0) {
        return Array(draftCount).fill(undefined).map((_, index) => ({
            id: index + startID,
            siding: siding,
            blueSide: {
                side: 'blue',
                picks: [
                    {
                        championPosition: 'Blue Ban',
                        championIndex: 0,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Blue Ban',
                        championIndex: 1,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Blue Ban',
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
                        championPosition: 'Blue Ban',
                        championIndex: 6,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Blue Ban',
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
                        championPosition: 'Red Ban',
                        championIndex: 0,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Red Ban',
                        championIndex: 1,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Red Ban',
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
                        championPosition: 'Red Ban',
                        championIndex: 6,
                        championName: '',
                        isPick: false
                    },
                    {
                        championPosition: 'Red Ban',
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
        newMatchSet.id = data.matchSets.length;
        newMatchSet.team1 = `Team 1`;
        newMatchSet.team2 = "Team 2";
        setData((prevState) => ({
            ...prevState,
            matchSets: [...prevState.matchSets, newMatchSet],
        }));
    }
    function handleRemoveMatchSet(matchSetID:number){
        setData((prevState) => {
            const updatedMatchSets = prevState.matchSets.filter((matchSet) => matchSet.id !== matchSetID);
            return {
                ...prevState,
                matchSets: updatedMatchSets,
            }
        })
    }
    function handleAddDraft(matchSetID:number, siding: "regular" | "reverse"){

        setData((prevState)=> {
            const updatedMatchSets   = prevState.matchSets.map((matchSet)=>{
                const currentDraftCount = matchSet.drafts.length
                if (matchSet.id === matchSetID){
                    const newDraft = buildDrafts(1, siding, currentDraftCount)[0];

                    return{
                        ...matchSet,
                        drafts: [...matchSet.drafts, newDraft],
                    }
                }
                return matchSet;
            });
            return {
                ...prevState,
                matchSets: updatedMatchSets,
            }
        })
    }

    function handleRemoveDraft(matchSetID: number, draftID: number) {
        setData((prevState) => {
            const updatedMatchSets = prevState.matchSets.map((matchSet) => {
                if (matchSet.id === matchSetID) {
                    return {
                        ...matchSet,
                        drafts: matchSet.drafts.filter((draft) => draft.id !== draftID),
                    };
                }
                return matchSet;
            });

            return {
                ...prevState,
                matchSets: updatedMatchSets,
            };
        });
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
            const draft = matchSet.drafts.find((d) => d.id === draftID);


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

    const handleTeamNameChange = (
        matchSetIndex: number,
        newTeamName: string,
        teamID: "team1"| "team2",
    ) => {
        setData((prevState) => {
            const updatedMatchSets = [...prevState.matchSets];
            const updatedMatchSet = {...updatedMatchSets[matchSetIndex]};

            updatedMatchSet[teamID] = newTeamName;
            updatedMatchSets[matchSetIndex] = updatedMatchSet;
            return{
                ...prevState,
                matchSets: updatedMatchSets
            }
        })
    }


    return (
        <>
            <header>
                <a className="ravenLogo" href="https://igortasic.ca" target="_blank"><img src="/pixelRaven.png" alt="pixelated raven"/></a>
                <h1 className="text-4xl font-bold text-center m-5">DraftPlanner</h1>
                <button><a href="/options"><img src="/gear.svg" alt=""/></a></button>
            </header>
            <div className="contentWrapper">
                <div>
                <PrioPicks />
                <FirstPicks />
                </div>
                <div>
                    {data.matchSets.map((matchSet, matchSetIndex) => {
                        return (
                            <div key={matchSet.id}>
                                <MatchSet
                                    matchSet={matchSet}
                                    matchSetIndex={matchSetIndex}
                                    handleChampChange={handleChampChange}
                                    handleTeamNameChange={handleTeamNameChange}
                                    handleAddDraft={handleAddDraft}
                                    handleRemoveDraft={handleRemoveDraft}
                                />
                                <div className="removeMatchSetWrapper">
                                    {matchSet.id !== 0 ? <button onClick={() => handleRemoveMatchSet(matchSet.id)}>Remove match</button> : "" }
                                </div>
                            </div>

                        );
                    })}
                    <div className="addMatchSetWrapper">
                        <button className="addMatchSetButton" onClick={() => handleAddMatchSet()}>Add match</button>
                    </div>
                </div>

            </div>
        </>
    );
}
