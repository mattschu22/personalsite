import ContentPanel from '../components/ContentPanel';
import PaxosVisualization from '../components/paxos';
import type { SectionComponentProps } from '../types';

export default function LandingSection({ onNavigate }: SectionComponentProps) {
  return (
    <ContentPanel className="bg-ink-900">
      <PaxosVisualization onNavigate={onNavigate} />
    </ContentPanel>
  );
}
