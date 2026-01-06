import type { Packet, NodePosition } from './paxosTypes';

interface PacketDotProps {
  packet: Packet;
  fromPos: NodePosition;
  toPos: NodePosition;
  color: string;
}

const typeLabels: Record<Packet['type'], string> = {
  prepare: 'P',
  promise: 'OK',
  accept: 'A',
  accepted: 'Y',
};

const ACCEPTED_PATH_FADE_DELAY = 500; // ms before fading
const ACCEPTED_PATH_FADE_DURATION = 300; // ms to fade out

export default function PacketDot({ packet, fromPos, toPos, color }: PacketDotProps) {
  // Interpolate position based on progress
  const currentX = fromPos.x + (toPos.x - fromPos.x) * packet.progress;
  const currentY = fromPos.y + (toPos.y - fromPos.y) * packet.progress;

  // For accepted packets that arrived, just show the path
  const isFinishedAccepted = packet.arrived && packet.type === 'accepted';

  // Calculate opacity for accepted paths (fade out after delay)
  const getAcceptedPathOpacity = () => {
    if (!isFinishedAccepted) return 1;
    const timeSinceArrival = Date.now() - (packet.startTime + packet.duration);
    if (timeSinceArrival < ACCEPTED_PATH_FADE_DELAY) return 1;
    const fadeProgress = (timeSinceArrival - ACCEPTED_PATH_FADE_DELAY) / ACCEPTED_PATH_FADE_DURATION;
    return Math.max(0, 1 - fadeProgress);
  };

  // Fade out when arrived (except for accepted packets which fade after delay)
  const opacity = packet.arrived && !isFinishedAccepted
    ? Math.max(0, 1 - (packet.progress - 1) * 2)
    : getAcceptedPathOpacity();

  return (
    <g style={{ opacity }}>
      {/* Trail line - full path for finished accepted packets */}
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={isFinishedAccepted ? toPos.x : currentX}
        y2={isFinishedAccepted ? toPos.y : currentY}
        stroke={color}
        strokeWidth="2"
        strokeOpacity={isFinishedAccepted ? 0.5 : 0.3}
        strokeLinecap="round"
      />

      {/* Hide dot/label for finished accepted packets - just show the path */}
      {!isFinishedAccepted && (
        <>
          {/* Packet glow */}
          <circle
            cx={currentX}
            cy={currentY}
            r="16"
            fill={color}
            fillOpacity="0.15"
          />

          {/* Packet body */}
          <circle
            cx={currentX}
            cy={currentY}
            r="10"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />

          {/* Packet label */}
          <text
            x={currentX}
            y={currentY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {typeLabels[packet.type]}
          </text>
        </>
      )}
    </g>
  );
}
