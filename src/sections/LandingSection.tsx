import ContentPanel from '../components/ContentPanel';
import PaxosVisualization from '../components/paxos';

interface LandingSectionProps {
  onComplete?: () => void;
}

export default function LandingSection({ onComplete }: LandingSectionProps) {
  return (
    <ContentPanel className="bg-ink-900">
      <PaxosVisualization onComplete={onComplete} />
    </ContentPanel>
  );
}
