interface Party {
    party: string;
    affinity: number;
}
interface PartyAffinityProps {
    parties: Party[];
}
export declare function PartyAffinity({ parties }: PartyAffinityProps): any;
export {};
