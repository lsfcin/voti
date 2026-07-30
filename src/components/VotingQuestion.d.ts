interface Question {
    id: number;
    title: string;
    simplifiedQuestion: string;
    originalText: string;
    fullText: string;
    category: string;
}
interface VotingQuestionProps {
    question: Question;
    onAnswer: (questionId: number, answer: 'favor' | 'contra' | 'abstencao') => void;
    onPrevious: () => void;
    canGoPrevious: boolean;
}
export declare function VotingQuestion({ question, onAnswer, onPrevious, canGoPrevious }: VotingQuestionProps): any;
export {};
