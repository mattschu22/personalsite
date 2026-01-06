# Matt Schumacher Portfolio Site - Summary

## Overview

A personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS. The site features a unique section-based navigation system and an interactive Paxos consensus visualization as its intro page.

## Tech Stack

- **Framework**: React 18.3
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 3.4
- **Linting**: ESLint 9

## Site Structure

### Navigation

The site uses a horizontal section-based layout with 5 main sections:

1. **Intro** - Paxos consensus visualization
2. **About** - Personal information
3. **Work** - Professional experience
4. **Projects** - Portfolio projects
5. **Contact** - Contact information

Navigation methods:
- Click on section bars
- Keyboard arrows (up/down/left/right)
- Number keys (1-5)
- Mouse wheel scrolling (with edge detection)
- Auto-progress mode (6 second intervals, disabled on user interaction)

### File Structure

```
src/
├── App.tsx                    # Main app with section navigation
├── main.tsx                   # Entry point
├── types/index.ts             # TypeScript type definitions
├── components/
│   ├── ContentPanel.tsx       # Scrollable content container
│   ├── SectionBar.tsx         # Collapsible section navigation bars
│   ├── GrainOverlay.tsx       # Visual texture overlay
│   ├── TerminalHero.tsx       # (Legacy) Terminal-style hero
│   └── paxos/                 # Paxos visualization components
│       ├── index.ts           # Barrel export
│       ├── paxosTypes.ts      # Type definitions
│       ├── paxosData.ts       # Resume data & node configs
│       ├── usePaxosSimulation.ts  # Paxos state machine
│       ├── PaxosVisualization.tsx # Main visualization container
│       ├── PaxosNode.tsx      # Individual node component
│       ├── PacketDot.tsx      # Animated packet/message dots
│       ├── CenterDisplay.tsx  # Center name & consensus value
│       ├── StatusFeed.tsx     # Real-time status messages
│       └── ConsensusLog.tsx   # History of consensus values
├── sections/
│   ├── IntroSection.tsx       # Uses LandingSection
│   ├── LandingSection.tsx     # Wraps PaxosVisualization
│   ├── AboutSection.tsx
│   ├── WorkSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
└── data/
    ├── education.ts
    ├── experience.ts
    └── projects.ts
```

## Paxos Consensus Visualization

### Concept

The intro page displays an interactive visualization of the Paxos distributed consensus algorithm. Six nodes arranged in a hexagonal pattern represent different categories of resume information:

| Node | Category | Color |
|------|----------|-------|
| 0 | Education | Blue (#3B82F6) |
| 1 | Experience | Purple (#8B5CF6) |
| 2 | Skills | Teal (#14B8A6) |
| 3 | Projects | Rose (#F43F5E) |
| 4 | Achievements | Amber (#F59E0B) |
| 5 | Languages | Pink (#EC4899) |

### How It Works

Each round simulates the Paxos protocol:

1. **Proposing Phase**: All 6 nodes begin proposing with random delays (50-800ms)
2. **Prepare Phase**: Proposers send prepare messages to all nodes (including self)
3. **Promise Phase**: Acceptors promise to the first prepare they receive
4. **Leader Election**: First proposer to receive 4/6 promises becomes leader
5. **Accept Phase**: Leader broadcasts its value to all nodes
6. **Consensus**: Once 4/6 nodes accept, consensus is reached
7. **Display**: The winning value (a fact about Matt) is displayed

### Key Features

- **Multi-proposer**: All nodes propose simultaneously, racing to become leader
- **Absolute majority**: Requires 4/6 (>50%) for both promises and accepts
- **Retry logic**: If no leader is elected within 1.5s, a new round starts
- **Visual feedback**:
  - Animated packet dots traveling between nodes
  - Leader highlighted with solid category color
  - Accepted nodes show green checkmarks
  - Final "accepted" paths remain visible briefly (500ms fade)
- **Status feed**: Real-time messages showing protocol progress
- **Consensus log**: History of agreed-upon values at bottom

### Timing Configuration

```typescript
MIN_LATENCY = 200ms          // Minimum network delay
MAX_LATENCY = 600ms          // Maximum network delay
MIN_PROPOSE_DELAY = 50ms     // Minimum proposer start delay
MAX_PROPOSE_DELAY = 800ms    // Maximum proposer start delay
LEADER_ELECTION_TIMEOUT = 1500ms  // Retry timeout
CONSENSUS_DISPLAY_TIME = 2500ms   // Time to show result
IDLE_TIME = 1200ms           // Pause between rounds
```

### Resume Data

Each node cycles through multiple facts from `paxosData.ts`:

- **Education**: Degrees (MSE CS, BSE CS, BBA), honors, coursework
- **Experience**: CHEPS healthcare simulation, Aptiv automotive ML, Lakeside patents
- **Skills**: Languages, systems programming, ML, databases
- **Projects**: Vibe Kernel, wine recommendation service
- **Achievements**: Patents, publications
- **Languages**: C++, Go, Python, TypeScript, Java, SQL, Bash

## Visual Design

- Clean, light theme with subtle gradients
- Responsive layout (mobile, tablet, desktop breakpoints)
- Hexagonal node arrangement with elliptical proportions
- Animated transitions and hover states
- Consistent typography using display font for headings

## Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build (TypeScript + Vite)
npm run preview  # Preview production build
npm run lint     # ESLint
npm run typecheck # TypeScript type checking
```
