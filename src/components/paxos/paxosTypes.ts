export type PaxosPhase =
  | 'idle'
  | 'proposing'    // All nodes sending prepares
  | 'promising'    // Nodes responding with promises
  | 'accepting'    // Winner sending accepts
  | 'confirming'   // Nodes responding with accepted
  | 'consensus';   // Consensus reached

export type CategoryType =
  | 'education'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'languages';

export type PacketType = 'prepare' | 'promise' | 'accept' | 'accepted';

export interface Packet {
  id: string;
  type: PacketType;
  from: number;
  to: number;
  progress: number; // 0 to 1
  startTime: number;
  duration: number; // ms for the packet to travel
  arrived: boolean;
  value?: string; // For accept packets
  proposalNumber?: number; // For prepare/promise packets
}

export interface NodeState {
  id: number;
  // Highest proposal number this node has promised to
  highestPromised: number;
  // Whether this node has sent a promise this round
  hasPromised: boolean;
  // Which proposer this node promised to
  promisedTo: number | null;
  // Whether this node has accepted a value this round
  hasAccepted: boolean;
  // The proposal number this node is using (if proposing)
  proposalNumber: number;
  // The value this node is proposing
  proposedValue: string;
}

export interface PaxosState {
  phase: PaxosPhase;
  // Nodes that are currently proposing
  activeProposers: Set<number>;
  // The winner (first to get majority promises)
  winningProposer: number | null;
  // The value that won consensus
  consensusValue: string | null;
  consensusCategory: CategoryType | null;
  // Round tracking
  roundNumber: number;
  // Value index for cycling through resume data
  valueIndices: Record<CategoryType, number>;
}

export interface NodeConfig {
  id: number;
  category: CategoryType;
  label: string;
  color: string;
}

export interface ConsensusValue {
  category: CategoryType;
  label: string;
  values: string[];
}

export interface StatusMessage {
  id: string;
  text: string;
  type: PacketType | 'consensus' | 'info';
  timestamp: number;
}

export interface ConsensusLogEntry {
  id: string;
  value: string;
  category: CategoryType;
  round: number;
}

export interface NodePosition {
  x: number;
  y: number;
}
