interface Question {
    id: number;
    title: string;
    simplifiedQuestion: string;
    originalText: string;
    fullText: string;
    category: string;
}
interface QuestionnaireResultsProps {
    answers: Record<number, 'favor' | 'contra' | 'abstencao'>;
    questions: Question[];
}
export declare function QuestionnaireResults({ answers, questions }: QuestionnaireResultsProps): any;
export {};
