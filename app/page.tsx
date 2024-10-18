"use client"
import PrioPicks from "@/app/components/PrioPicks";
import MatchSet from "@/app/components/MatchSet";
import {useEffect, useState} from "react";

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
            drafts: [...buildDrafts(5, "blue"), ...buildDrafts(5, "red")],
        };
    }

    function buildDrafts(draftCount: number, side: string) {
        return Array(draftCount).fill(undefined).map((_, index) => ({
            id: side + index,
            side: side,
            picks: Array(5).fill(undefined).map((_, champIndex) => ({
                championIndex: champIndex,
                championName: 'Xayah',
                championPosition: ''
            })),
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

    const handleChampChange = (matchSetIndex: number, draftID: string, champIndex: number, newChampName: string) => {
        setData((prevState) => {
            const updatedMatchSets = [...prevState.matchSets];
            const matchSet = updatedMatchSets[matchSetIndex];

            // Check if matchSet is defined
            if (!matchSet) {
                console.error(`Match set at index ${matchSetIndex} is undefined`);
                return prevState; // Return previous state if matchSet is undefined
            }

            const draft = matchSet.drafts.find(d => d.id === draftID);

            // Check if draft is defined
            if (!draft) {
                console.error(`Draft at index ${draftID} is undefined in match set ${matchSetIndex}`);
                return prevState; // Return previous state if draft is undefined
            }

            const picks = draft.picks;

            // Check if picks is defined
            if (!picks) {
                console.error(`Picks are undefined for draft at index ${draftID} in match set ${matchSetIndex}`);
                return prevState; // Return previous state if picks is undefined
            }

            // Check if champIndex is valid
            if (champIndex < 0 || champIndex >= picks.length) {
                console.error(`champIndex ${champIndex} is out of bounds for picks`);
                return prevState; // Return previous state if champIndex is out of bounds
            }

            // Update champion name
            picks[champIndex].championName = newChampName;

            return {
                ...prevState,
                matchSets: updatedMatchSets,
            };
        });
    };


    const [data, setData] = useState(buildData);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center">Home page</h1>
            <div className="">
                <PrioPicks />
                {data.matchSets.map((matchSet, matchSetIndex) => {
                    return (
                        <div key={matchSet.id}>
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
