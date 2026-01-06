import type { ConsensusValue, NodeConfig } from './paxosTypes';

export const consensusValues: ConsensusValue[] = [
  {
    category: 'education',
    label: 'Education',
    values: [
      "I'm pursuing an M.S.E. in Computer Science with a 4.0 GPA",
      "I graduated Summa Cum Laude with a B.S.E. in Computer Science (3.9 GPA)",
      "I also hold a B.B.A. in Business Administration, Magna Cum Laude",
      "I was awarded the William J. Branstrom Prize for academic excellence",
      "I made the Dean's List every semester and received University Honors",
      "I've taken Advanced Operating Systems, Compilers, and Scalable Systems",
      "My coursework includes Distributed Systems and Machine Learning",
      "I studied Large Language Models, Databases, and Networking",
    ],
  },
  {
    category: 'experience',
    label: 'Experience',
    values: [
      "I led full-stack development of a simulation tool now used across 170 VA hospitals",
      "I achieved a 78% performance improvement through parallelization and caching",
      "I built ML-driven automated UX analysis for kiosk applications at Aptiv",
      "I developed a multi-modal ML system with 91% accuracy for autonomous drive testing",
      "I created data mining software linking UX issues to their root causes",
      "My work won Best of Show at VMworld Las Vegas 2018, beating 500+ technologies",
      "I've worked across the full stack: ML integration, networking, and concurrent systems",
    ],
  },
  {
    category: 'skills',
    label: 'Skills',
    values: [
      "I'm proficient in C++, Go, Python, Java, TypeScript, and SQL",
      "I specialize in multi-threading and concurrent programming",
      "I have deep expertise in networking and distributed systems",
      "I build and deploy machine learning models and AI tools",
      "I design and optimize databases and web applications",
      "I understand cybersecurity principles and secure coding practices",
    ],
  },
  {
    category: 'projects',
    label: 'Projects',
    values: [
      "I'm building Vibe Kernel, an AI-driven Linux kernel development assistant",
      "I designed an orchestrator-worker agent pattern for kernel engineering",
      "I integrated Model Context Protocol (MCP) for agent communication",
      "I built a wine recommendation service with React, Python, and PostgreSQL",
      "I use natural language processing for context-rich recommendations",
    ],
  },
  {
    category: 'achievements',
    label: 'Achievements',
    values: [
      "I hold US Patent No. 11,461,212 for UX degradation analysis",
      "I have a continuation patent (No. 11,983,088) extending my original invention",
      "I co-authored a published paper on lung cancer screening resource modeling",
      "My research is indexed in PubMed (ID: 39237997)",
    ],
  },
  {
    category: 'languages',
    label: 'Languages',
    values: [
      "I write high-performance systems code in C++",
      "I build concurrent services in Go",
      "I develop ML pipelines and automation in Python",
      "I create type-safe web applications with TypeScript",
      "I build enterprise applications in Java",
      "I design and query relational databases with SQL",
      "I script infrastructure and DevOps workflows in Bash",
    ],
  },
];

export const nodeConfigs: NodeConfig[] = [
  { id: 0, category: 'education', label: 'Education', color: '#3B82F6' },
  { id: 1, category: 'experience', label: 'Experience', color: '#8B5CF6' },
  { id: 2, category: 'skills', label: 'Skills', color: '#14B8A6' },
  { id: 3, category: 'projects', label: 'Projects', color: '#F43F5E' },
  { id: 4, category: 'achievements', label: 'Achievements', color: '#F59E0B' },
  { id: 5, category: 'languages', label: 'Languages', color: '#EC4899' },
];

export const getNodePosition = (index: number, radius: number): { x: number; y: number } => {
  // Hexagonal layout: 6 nodes at 60° intervals
  const angle = (index * 60 - 90) * (Math.PI / 180);
  // Gentle ellipse for a balanced, spacious feel
  const xRadius = radius * 1.15;
  const yRadius = radius * 0.9;
  return {
    x: Math.cos(angle) * xRadius,
    y: Math.sin(angle) * yRadius,
  };
};

export const getCategoryValues = (category: string): string[] => {
  const found = consensusValues.find((cv) => cv.category === category);
  return found ? found.values : [];
};

export const getNodeByCategory = (category: string): NodeConfig | undefined => {
  return nodeConfigs.find((nc) => nc.category === category);
};
