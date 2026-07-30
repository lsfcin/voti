export interface VotingProject {
    id: string;
    title: string;
    date: string;
    votes: Record<string, string>;
}
export interface AnalysisResult {
    project: VotingProject;
    entropy: number;
    variance: number;
    polarizationIndex: number;
    discriminationScore: number;
    yesVotes: number;
    noVotes: number;
    abstentions: number;
    absences: number;
    totalVotes: number;
}
export interface ConcordanceMatrix {
    [deputy1: string]: {
        [deputy2: string]: {
            concordance: number;
            totalComparisons: number;
        };
    };
}
export declare class VotingAnalyzer {
    private projects;
    constructor();
    private loadVotingData;
    private parseCSV;
    private extractDateFromHeader;
    private parseCSVLine;
    calculateEntropy(project: VotingProject): number;
    calculateVariance(project: VotingProject): number;
    calculatePolarizationIndex(project: VotingProject): number;
    private getVoteCounts;
    analyzeProjects(count?: number): AnalysisResult[];
    calculateConcordanceMatrix(projectIds?: string[]): ConcordanceMatrix;
    getProjectsCount(): number;
    getAllProjects(): VotingProject[];
}
