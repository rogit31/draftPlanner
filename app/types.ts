export interface Pick {
    championIndex: number;
    championName: string;
    championPosition: string;
    isPick: boolean;
}

export interface Side {
    side: string;
    picks: Pick[];
}

export interface Draft {
    id: number;
    siding: "regular" | "reverse";
    blueSide: Side;
    redSide: Side;
}
export interface MatchSet {
    team1: string;
    team2: string;
    id: number;
    drafts: Draft[];
}

export interface MatchSetProps {
    matchSet: MatchSet;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID: number, champIndex: number, newChampName: string, side: "blue" | "red") => void;
    handleTeamNameChange: (matchSetIndex: number, newTeamName: string, teamID: "team1" | "team2") => void;
    handleAddDraft: (matchSetIndex: number, siding: "regular" | "reverse") => void;
    handleRemoveDraft: (matchSetIndex: number, draftID: number) => void;
}

export interface DraftScenarioProps {
    draft: Draft;
    draftID: number;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID:number, champIndex: number, newChampName: string, side: "blue" | "red") => void;
    team1: string;
    team2: string;
}