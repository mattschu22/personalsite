import PaxosVisualization from '../components/paxos';

export default function IntroSection() {
  return (
    <div
      data-content-panel="true"
      className="h-full w-full relative overflow-hidden"
    >
      <PaxosVisualization />
    </div>
  );
}
