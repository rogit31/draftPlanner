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
    blueSide: Side;
    redSide: Side;
}
export interface MatchSet {
    opponentName: string;
    id: string;
    drafts: Draft[];
}

export interface MatchSetProps {
    matchSet: MatchSet;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID: number, champIndex: number, newChampName: string, side: "blue" | "red") => void;
}

export interface DraftScenarioProps {
    draft: Draft;
    draftID: number;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID:number, champIndex: number, newChampName: string, side: "blue" | "red") => void;
}