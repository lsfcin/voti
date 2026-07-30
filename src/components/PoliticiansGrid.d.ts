import { DeputyAffinity } from '../lib/votingAnalyzer';
interface PoliticiansGridProps {
    affinities: DeputyAffinity[];
    userAnswers: Record<string, 'favor' | 'contra' | 'abstencao'>;
}
export default function PoliticiansGrid({ affinities, userAnswers }: PoliticiansGridProps): any;
export {};
