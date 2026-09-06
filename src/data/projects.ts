import type { Project, MinorProject } from '../types';

export const projects: Project[] = [
  {
    title: "Anthropic Performance Challenge",
    subtitle: "Optimized assembly code for parallel tree traversal on VLIW/SIMD processors",
    period: "January 2026",
    description: "Optimized assembly code for parallel tree traversal on VLIW/SIMD processors. The implementation achieved a 125× speedup over the baseline and improved by 13% on the result produced by Opus 4.5 with unlimited time and Anthropic’s custom test harness.",
    tags: ["Optimization", "Inference", "Assembly", "Parallelism"]
  },
  {
    title: "MattSQL",
    subtitle: "Custom SQL Engine and Database Runtime",
    period: "Current",
    description: "Building MattSQL toward a full custom SQL database engine, starting with a C++ query pipeline for lexing, parsing, binding, planning, optimization, execution, catalog management, and table storage. The long-term goal is a complete SQL system with durable storage, transactions, recovery, runtime ownership, batched I/O, and an eventual database-oriented operating environment.",
    tags: ["C++", "Databases", "SQL", "Storage Engines", "Runtime Systems"]
  },
  {
    title: "Linux Kernel Patching Agent",
    subtitle: "Agentic Kernel Development Assistant",
    period: "August 2025 - Current",
    description: "An end-to-end automated kernel patch generation tool. The system ingests bugs found by Google’s Syzkaller kernel fuzzer and uses an orchestrator-worker agent pattern to produce patches autonomously. A small GCP cluster parallelizes kernel builds and verification.",
    tags: ["AI/ML", "Linux", "MCP", "Systems", "Docker"]
  },
  {
    title: "Cache-Affinity Inference Router",
    subtitle: "Reducing prefill time for LLM-based applications",
    period: "January 2026 - Current",
    description: "Working to reduce inference prefill time by load-aware cache affinity routing. Project disaggregates and shares KV-Cache between spatially co-located nodes. Queries are then routed to node groups based on radix-tree prefix length and application defined semantic variables.",
    tags: ["Distributed Systems", "Inference", "Routing", "LLMs"]
  },
  {
    title: "Wine Recommendation Service",
    subtitle: "Full-Stack AI Application",
    period: "May 2025 - Current",
    description: "Natural-language wine recommendations built with TypeScript, React, Python, and PostgreSQL. MCP-powered agent communication provides context-rich recommendations, while native function calling produces structured responses. The application includes authentication and persistent chat history.",
    tags: ["TypeScript", "React", "Python", "PostgreSQL", "MCP"]
  },
  {
    title: "ShedSkin",
    subtitle: "Improving Python-to-C Transpilation",
    period: "August 2025 - December 2025",
    description: "Improved the open-source ShedSkin compiler by using escape analysis to safely stack-allocate method-local objects. The pass walks the AST to identify definitions that reach an escaping control-flow statement. The changes improved tight-loop tuple and class allocation workloads by 22× and 47×, respectively.",
    tags: ["Compilers", "Python", "C++", "Memory Allocation", "Escape Analysis"]
  },
  {
    title: "Pitch Prediction",
    subtitle: "Applying ML techniques to gain a competitive edge at the plate. ",
    period: "August 2023 - September 2024",
    description: "Used a variety of ML techniques to predict the type and location of pitches. Additional topics explored included best reliever - hitter matchups and outcomes of at-bats.",
    tags: ["ML", "Model Training", "Data Pipelines", "Data Science"]
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
    description: "Built basic thread library from scratch",
    tags: ["C", "Concurrency", "Threading"]
  },
  {
    title: "Networked File System",
    description: "Designed NFS to serve multiple clients with minimal overhead",
    tags: ["C", "Networking", "Concurrency", "Boost"]
  },
  {
    title: "Video Streaming Client",
    description: "Implemented streaming client that adaptavely changes video quality to optimize user experience",
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
    title: "XSS Attack",
    description: "Constructed Cross-Site Scripting attacks to utilize cookies from proxy clients",
    tags: ["XSS", "Cybersecurity", "Web Development"]
  },
  {
    title: "RCE Exploit",
    description: "Successfully ran RCE exploits on proxy servers using techniques such as buffer overflow",
    tags: ["gdb", "Machine Code Analysis", "Memory Safety"]
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
