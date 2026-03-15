import type { Metadata } from 'next';
import DestinationsWrapper from './DestinationsWrapper';

export const metadata: Metadata = {
    title: "Our Destinations | Infinity Overseas Consultants",
    description: "Explore our diverse range of world-class study abroad destinations including UK, USA, Europe, Canada, and Australia.",
};

export default function DestinationsPage() {
    return <DestinationsWrapper />;
}
