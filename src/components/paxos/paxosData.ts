import type { ConsensusValue, NodeConfig, CategoryType } from './paxosTypes';
import type { SectionId } from '../../types';

// Map Paxos node categories to navigation sections
export const categoryToSection: Record<CategoryType, SectionId> = {
  education: 'contact',
  experience: 'work',
  skills: 'contact',
  projects: 'projects',
  achievements: 'contact',
  languages: 'contact',
};

export const consensusValues: ConsensusValue[] = [
  {
    category: 'education',
    label: 'Education',
    values: [
      "I earned an M.S.E. in Computer Science with a 4.0 GPA",
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
      "I build reliable systems for Starlink enterprise customers at SpaceX",
      "I led full-stack development of a simulation tool now used across 170 VA hospitals",
      "I achieved a 78% performance improvement through parallelization and caching",
      "I built ML-driven automated UX analysis for kiosk applications at Aptiv",
      "I developed a multi-modal ML system with 91% accuracy for autonomous drive testing",
      "I created data mining software linking UX issues to their root causes",
      "The Lakeside product I worked on won Best of Show at VMworld 2018",
      "I've worked across the full stack: ML integration, networking, and concurrent systems",
    ],
  },
  {
    category: 'skills',
    label: 'Skills',
    values: [
      "I'm proficient in C++, Go, Python, JavaScript, TypeScript, and SQL",
      "I specialize in multi-threading and concurrent programming",
      "I work on networking and distributed systems",
      "I build and deploy machine learning models and AI tools",
      "I design and optimize databases and web applications",
      "I’m interested in how data structures affect real-world performance",
    ],
  },
  {
    category: 'projects',
    label: 'Projects',
    values: [
      "I'm building Linux Kernel Patching Agent, an automated kernel patch generation tool using AI agents",
      "I'm building MattSQL toward a full custom SQL engine and database runtime",
      "I achieved a 125× speedup in a VLIW/SIMD tree-traversal optimization challenge",
      "I built a wine recommendation service using React, Python, and PostgreSQL",
      "I improved ShedSkin's Python-to-C++ transpilation with escape analysis",
      "My ShedSkin optimizations achieved 22x and 47x speedups for tuples and classes",
      "I built ML models to predict pitch types and locations for baseball analytics",
      "I use Model Context Protocol (MCP) for agent communication across projects",
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
      "I build interactive web applications with JavaScript",
      "I design and query relational databases with SQL",
      "I work on infrastructure and distributed services",
    ],
  },
];

export const nodeConfigs: NodeConfig[] = [
  { id: 0, category: 'education', label: 'Education', color: '#2B55D8' },
  { id: 1, category: 'experience', label: 'Experience', color: '#2B55D8' },
  { id: 2, category: 'skills', label: 'Skills', color: '#2B55D8' },
  { id: 3, category: 'projects', label: 'Projects', color: '#2B55D8' },
  { id: 4, category: 'achievements', label: 'Achievements', color: '#2B55D8' },
  { id: 5, category: 'languages', label: 'Languages', color: '#2B55D8' },
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
