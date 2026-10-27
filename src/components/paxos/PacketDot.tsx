import type { NodePosition, Packet } from './paxosTypes';

interface PacketDotProps { packet: Packet; fromPos: NodePosition; toPos: NodePosition; color: string; }
const labels: Record<Packet['type'], string> = { prepare: 'P', promise: 'OK', accept: 'A', accepted: 'Y' };

export default function PacketDot({ packet, fromPos, toPos, color }: PacketDotProps) {
  const x = fromPos.x + (toPos.x - fromPos.x) * packet.progress;
  const y = fromPos.y + (toPos.y - fromPos.y) * packet.progress;
  return (
    <g opacity={packet.arrived ? .35 : 1}>
      <line x1={fromPos.x} y1={fromPos.y} x2={x} y2={y} stroke={color} strokeWidth="1" strokeOpacity=".28" />
      <circle cx={x} cy={y} r="9" fill={color} stroke="var(--surface)" strokeWidth="2" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="var(--on-signal)" fontSize="7" fontWeight="600" fontFamily="monospace">{labels[packet.type]}</text>
    </g>
  );
}
