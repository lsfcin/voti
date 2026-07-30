interface Politician {
    id: number;
    name: string;
    party: string;
    state: string;
    chamber: 'deputado' | 'senador';
    photo: string;
    affinity: number;
    votes: Record<number, 'favor' | 'contra' | 'abstencao'>;
}
interface Question {
    id: number;
    title: string;
    simplifiedQuestion: string;
    originalText: string;
    fullText: string;
    category: string;
}
interface PoliticianCardProps {
    politician: Politician;
    userAnswers: Record<number, 'favor' | 'contra' | 'abstencao'>;
    questions: Question[];
}
export declare function PoliticianCard({ politician, userAnswers, questions }: PoliticianCardProps): any;
export {};
