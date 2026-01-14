import type { Project, MinorProject } from '../types';

export const projects: Project[] = [
  {
    title: "Itinerary Planner",
    subtitle: "AI-Powered End-to-End Travel Planner",
    period: "January 2026 - Current",
    description: "",
    tags: ["AI/ML", "UX", "MCP", "FastAPI"]
  },
  {
    title: "Wine Recommendation Service",
    subtitle: "Full-Stack AI Application",
    period: "May 2025 - Current",
    description: "Natural language-driven wine recommendations using TypeScript (React + Tailwind), Python, and PostgreSQL. MCP-powered agent communication for context-rich recommendations.",
    tags: ["TypeScript", "React", "Python", "PostgreSQL", "MCP"]
  },
  {
    title: "Vibe Kernel",
    subtitle: "Agentic Kernel Development Assistant",
    period: "August 2025 - Current",
    description: "AI-driven development tool for Linux kernel engineering using orchestrator-worker agent patterns, MCP, and integrations with Elixir cross-references and kernel documentation.",
    tags: ["AI/ML", "Linux", "MCP", "Systems"]
  },
  {
    title: "ShedSkin",
    subtitle: "Improving Python-to-C Transpilation",
    period: "August 2025 - December 2025",
    description: "",
    tags: ["Compilers", "Memory Allocation"]
  },
  {
    title: "Pitch Prediction",
    subtitle: "Applying ML techniques to understand ",
    period: "August 2025 - December 2025",
    description: "",
    tags: ["ML", "Model Training", "Data Science"]
  },
  
];

export const minorProjects: MinorProject[] = [
  {
    title: "Portfolio Site",
    description: "This website - interactive Paxos consensus visualization",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    title: "Thread Library",
    description: "Built a basic thread library from scratch",
    tags: ["C", "Concurrency", "Threading"]
  },
  {
    title: "Networked File System",
    description: "Designed NFS to serve multiple clients with minimal overhead",
    tags: ["C", "Networking", "Concurrency"]
  },
  {
    title: "Video Streaming Client",
    description: "Implemented a streaming client that adaptavely changes video quality to optimize user experience",
    tags: ["Congestion Monitoring", "Buffer Management", "Real-Time Analytics"]
  },
  {
    title: "TCP",
    description: "Wrote the TCP protocol on top of UDP",
    tags: ["C++", "Networking", "Reliable Transport"]
  },
  {
    title: "Router",
    description: "Wrote firmware stack for a static router",
    tags: ["Switch Programming", "ARP", "Ethernet"]
  },
  {
    title: "Map Reduce",
    description: "Created a Map-Reduce backend that leverages computing clusters",
    tags: ["Go", "Concurrency", "Distributed Computing"]
  },
  {
    title: "Sharded Paxos",
    description: "Implemented a distributed and sharded KV server from scratch",
    tags: ["Go", "Concurrency", "Fault Tolerance", "Consensus"]
  },
  {
    title: "LLaVa Fine Tunning",
    description: "Fine-tuned a multimodal Llama-based LLM for terrain recognition",
    tags: ["Training Pipelines", "LLMs", "Post-Training"]
  },
  {
    title: "Search Engine",
    description: "Built a search engine leverage TF-IDF scores and PageRank",
    tags: ["MapReduce", "Data Mining", "Distributed Computing"]
  },
  {
    title: "Grover's Algorithm", 
    description: "Reproduced an quantum algorithm that produces a √t speedup over classical solutions",
    tags: ["Quantum Computing", "qiskit", "NP-Hard"]
  },
  {
    title: "MLB Scoreboard",
    description: "Live scores from the league displayed on a Raspberry PI",
    tags: ["Embedded Systems", "Web Scraping", "Real-Time Computing"]
  }
];
