import type { ConsensusLogEntry, PaxosPhase } from './paxosTypes';

interface CenterDisplayProps {
  name: string;
  consensusValue: string | null;
  category: string;
  categoryColor: string;
  phase: PaxosPhase;
  lastConsensus: ConsensusLogEntry | null;
}

export default function CenterDisplay({ name, consensusValue, category, phase, lastConsensus }: CenterDisplayProps) {
  const value = consensusValue ?? lastConsensus?.value ?? null;
  const label = consensusValue ? category : lastConsensus?.category ?? '';
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 paxos-center text-center pointer-events-none">
      <p className="font-mono text-xs md:text-sm tracking-normal text-accent-600 mb-3">Software engineer · SpaceX</p>
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-ink-900 tracking-tight">{name}</h1>
      <div className="h-px w-20 md:w-32 bg-accent-600 mx-auto my-4" />
      <p className="font-mono text-xs md:text-sm text-ink-500 mb-2">{phase}{label ? ` / ${label}` : ''}</p>
      <p className="text-sm md:text-lg text-ink-700 leading-relaxed">{value ?? 'I build systems for Starlink’s enterprise customers.'}</p>
    </div>
  );
}
