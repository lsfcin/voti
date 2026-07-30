export interface ProjectAnalysis {
    project: {
        id: string;
        title: string;
        date: string;
        votes: Record<string, string>;
    };
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
export declare const topDistinguishingProjects: ProjectAnalysis[];
export declare function loadTopProjects(): ProjectAnalysis[];
export declare function hasTopProjectsData(): boolean;
export declare function getProjectById(id: string): ProjectAnalysis | undefined;
export declare function getProjectsByCriteria(criteria: 'entropy' | 'variance' | 'polarizationIndex' | 'discriminationScore'): ProjectAnalysis[];
export declare function getTopProjectsStats(): {
    count: number;
    averageDiscriminationScore: number;
    averageEntropy: number;
    averageVariance: number;
    averagePolarization: number;
    maxScore: number;
    minScore: number;
    dateRange: {
        earliest: string;
        latest: string;
    };
};
