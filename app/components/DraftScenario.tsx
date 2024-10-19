"use client";
import { FC } from "react";
import { DraftScenarioProps } from "@/app/types";
import championData from "@/app/components/champInfo.json";

const DraftScenario: FC<DraftScenarioProps> = ({ draft, matchSetIndex, handleChampChange }) => {
    function findChampionImage(champName: string) {
        const foundChamp = championData.find((champion) => champion.name === champName);
        return foundChamp ? foundChamp.image : null;
    }

    function getPickClass(isPick: boolean, side: "blue" | "red") {
        if (!isPick) return "ban";
        return side === "blue" ? "blue-pick" : "red-pick";
    }

    return (
        <div>
            <h2>{draft.id}</h2>
            <div className="draftWrapper">
                <div>
                    {draft.blueSide.picks.map((pick,index) => {
                        const champImage = findChampionImage(pick.championName);
                        const tabIndexOrder = [1, 3, 5, 7, 10, 11, 13, 15, 18, 19]
                        return (
                            <div
                                key={pick.championIndex}
                                className={`championInputWrapper ${getPickClass(pick.isPick, "blue")}`}
                            >
                                {champImage ? <img src={champImage} alt={pick.championName} /> : null}
                                <input
                                    tabIndex={tabIndexOrder[index] + 100 * draft.id + 1000 * matchSetIndex}
                                    placeholder={pick.championPosition}
                                    className="championInput"
                                    type="text"
                                    value={pick.championName}
                                    onChange={(e) =>
                                        handleChampChange(
                                            matchSetIndex,
                                            draft.id,
                                            pick.championIndex,
                                            e.target.value,
                                            "blue"
                                        )
                                    }
                                />
                                <span></span>
                            </div>
                        );
                    })}
                </div>
                <div>
                    {draft.redSide.picks.map((pick, index) => {
                        const champImage = findChampionImage(pick.championName);
                        const tabIndexOrder = [2, 4, 6, 8, 9, 12, 14, 16, 17, 20]
                        return (
                            <div
                                key={pick.championIndex}
                                className={`championInputWrapper ${getPickClass(pick.isPick, "red")} red-side`}
                            >
                                {champImage ? <img src={champImage} alt={pick.championName} /> : null}
                                <input
                                    tabIndex={tabIndexOrder[index] + 100 * draft.id + 1000 * matchSetIndex}
                                    placeholder={pick.championPosition}
                                    className="championInput"
                                    type="text"
                                    value={pick.championName}
                                    onChange={(e) =>
                                        handleChampChange(
                                            matchSetIndex,
                                            draft.id,
                                            pick.championIndex,
                                            e.target.value,
                                            "red"
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DraftScenario;
