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
        <div className="p-2">
            <div className="teamNameInputWrapper">
                <input className="teamNameInput" type="text" value={matchSet.team1}
                       onChange={(e) => handleTeamNameChange(matchSetIndex, e.target.value, "team1")}/>
                <span>VS</span>
                <input className="teamNameInput" type="text" value={matchSet.team2}
                       onChange={(e) => handleTeamNameChange(matchSetIndex, e.target.value, "team2")}/>
            </div>
            <div className="matchSetWrapper">
                {matchSet.drafts.map((draft) => (
                    <div key={draft.id} className="draftTileWrapper">
                        <DraftScenario
                            draft={draft}
                            draftID={draft.id}
                            matchSetIndex={matchSetIndex}
                            handleChampChange={handleChampChange}
                            team1={matchSet.team1}
                            team2={matchSet.team2}
                        />
                        <button className="removeDraftButton" onClick={() => handleRemoveDraft(matchSetIndex, draft.id)}>Remove Draft</button>
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
