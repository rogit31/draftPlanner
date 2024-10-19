"use client";
import { FC } from "react";
import DraftScenario from "@/app/components/DraftScenario";
import { MatchSetProps } from "@/app/types";

const MatchSet: FC<MatchSetProps> = ({ matchSet, matchSetIndex, handleChampChange }) => {
    return (
        <div className="border border-red-200">
            <h2>Scenarios</h2>
            <h2>{matchSet.opponentName}</h2>
            <div>
                <h3>{matchSet.drafts.map((draft) => (
                    <div key={draft.id}>
                        <DraftScenario
                            draft={draft}
                            draftID={draft.id}
                            matchSetIndex={matchSetIndex}
                            handleChampChange={handleChampChange}
                        />
                    </div>
                ))}</h3>
            </div>
        </div>
    );
};

export default MatchSet;
