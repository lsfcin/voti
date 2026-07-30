export interface DeputyVotingPattern {
    name: string;
    sim: number;
    nao: number;
    abstencao: number;
    ausente: number;
    total: number;
    percentualSim: number;
}
export declare function analyzeDeputyVotingPatterns(): DeputyVotingPattern[];
export declare function getVotingStatsDescription(): {
    totalProjects: number;
    totalDeputies: number;
    mostConservative: DeputyVotingPattern;
    mostProgressive: DeputyVotingPattern;
    averageYesPercentage: number;
};
