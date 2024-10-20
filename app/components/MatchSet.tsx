"use client";
import {FC} from "react";
import DraftScenario from "@/app/components/DraftScenario";
import { MatchSetProps } from "@/app/types";
import ConfirmSideModal from "@/app/components/ConfirmSideModal";

const MatchSet: FC<MatchSetProps> = ({ matchSet, matchSetIndex, handleChampChange, handleTeamNameChange, handleAddDraft, handleRemoveDraft }) => {

    const handleConfirm = (siding: "regular" | "reverse") => {
        handleAddDraft(matchSetIndex, siding);
    }

    return (
        <div className="border border-red-200">
            <h2 className="text-center font-bold">Scenarios</h2>
            <div className="teamNameInputWrapper">
                <input className="teamNameInput" type="text" value={matchSet.team1}
                       onChange={(e) => handleTeamNameChange(matchSetIndex, e.target.value, "team1")}/>
                <span>VS</span>
                <input className="teamNameInput" type="text" value={matchSet.team2}
                       onChange={(e) => handleTeamNameChange(matchSetIndex, e.target.value, "team2")}/>
            </div>
            <div className="matchSetWrapper">
                {matchSet.drafts.map((draft) => (
                    <div key={draft.id}>
                        <DraftScenario
                            draft={draft}
                            draftID={draft.id}
                            matchSetIndex={matchSetIndex}
                            handleChampChange={handleChampChange}
                            team1={matchSet.team1}
                            team2={matchSet.team2}
                        />
                        <button onClick={() => handleRemoveDraft(matchSetIndex, draft.id)}>Remove Draft</button>
                    </div>
                ))}
                    <ConfirmSideModal
                        onConfirm={handleConfirm}
                        team1={matchSet.team1}
                    />
            </div>
        </div>
    );
};

export default MatchSet;
