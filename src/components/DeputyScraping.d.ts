interface Deputy {
    id: string;
    name: string;
    party: string;
    state: string;
    photoUrl: string;
}
interface DeputyScrapingProps {
    onDeputiesExtracted?: (deputies: Deputy[]) => void;
}
export default function DeputyScraping({ onDeputiesExtracted }: DeputyScrapingProps): any;
export {};
