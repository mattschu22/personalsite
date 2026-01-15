import PaxosVisualization from '../components/paxos';
import type { SectionComponentProps } from '../types';

export default function IntroSection({ onNavigate }: SectionComponentProps) {
  return (
    <div
      data-content-panel="true"
      className="h-full min-h-screen w-full relative overflow-hidden"
    >
      <PaxosVisualization onNavigate={onNavigate} />
    </div>
  );
}
