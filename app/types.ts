export interface Draft {
    id: string;
    side: string;
    picks: {
        championIndex: number;
        championName: string;
        championPosition: string;
    }[];
}

export interface MatchSet {
    opponentName: string;
    id: string;
    drafts: Draft[];
}

export interface MatchSetProps {
    matchSet: MatchSet;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID: string, champIndex: number, newChampName: string) => void;
}

export interface DraftScenarioProps {
    draft: Draft;
    draftID: string;
    matchSetIndex: number;
    handleChampChange: (matchSetIndex: number, draftID:string, champIndex: number, newChampName: string) => void;
}