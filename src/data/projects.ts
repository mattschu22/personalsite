import type { Project, MinorProject } from '../types';

export const projects: Project[] = [
  {
    title: "Anthropic Performance Challenge",
    subtitle: "Optimized assembly code for parallel tree traversal on VLIW/SIMD processors",
    period: "January 2026",
    description: "Optimized parallel tree traversal on VLIW/SIMD processors.",
    highlights: ["Optimized assembly code for parallel tree traversal on VLIW/SIMD processors, achieving a 125× speedup over the baseline.", "Improved by 13% on the result produced by Opus 4.5 with unlimited time and Anthropic’s custom test harness."],
    tags: ["Optimization", "Inference", "Assembly", "Parallelism"]
  },
  {
    title: "MattSQL",
    subtitle: "A SQL engine written in C++",
    period: "In progress",
    description: "A working C++20 SQL engine with an in-memory execution path and a custom runtime boundary.",
    highlights: ["Building a C++ SQL engine with lexing, parsing, binding, planning, optimization, execution, catalog management, and table storage.", "The longer-term goal includes durable storage, transactions, recovery, runtime ownership, batched I/O, and a database-oriented operating environment."],
    tags: ["C++", "Databases", "SQL", "Storage Engines", "Runtime Systems"]
  },
  {
    title: "Linux Kernel Patching Agent",
    subtitle: "Automated Linux patching",
    period: "August 2025 – February 2026",
    description: "An automated workflow for producing and checking Linux kernel patches.",
    highlights: ["Built an end-to-end tool that ingests bugs found by Google’s Syzkaller kernel fuzzer and uses an orchestrator-worker agent pattern to generate patches.", "Utilized GCP to parallelize builds and verification."],
    tags: ["AI/ML", "Linux", "MCP", "Systems", "Docker"]
  },
  {
    title: "Cache-Affinity Inference Router",
    subtitle: "Reducing prefill time for LLM-based applications",
    period: "January 2026 – Present",
    description: "An end-to-end inference router that combines server load and cache affinity to reduce prefill work.",
    highlights: ["Built load-aware cache-affinity routing to reduce prefill time for LLM-based applications.", "Disaggregates and shares KV cache between spatially co-located nodes, routing queries by radix-tree prefix length and application-defined semantic variables."],
    tags: ["Distributed Systems", "Inference", "Routing", "LLMs"]
  },
  {
    title: "Wine Recommendation Service",
    subtitle: "Wine search and recommendations",
    period: "May 2025 – December 2025",
    description: "A natural-language interface for finding and recommending wines.",
    highlights: ["Built natural-language wine recommendations with TypeScript, React, Python, and PostgreSQL.", "Uses MCP for agent communication and function calling for structured responses, with authentication and persistent chat history."],
    tags: ["TypeScript", "React", "Python", "PostgreSQL", "MCP"]
  },
  {
    title: "ShedSkin",
    subtitle: "Improving Python-to-C Transpilation",
    period: "August 2025 - December 2025",
    description: "Escape analysis for the open-source ShedSkin compiler.",
    highlights: ["Improved the open-source ShedSkin compiler with escape analysis to safely stack-allocate method-local objects.", "The pass walks the AST to identify definitions that reach an escaping control-flow statement.", "Improved tight-loop tuple and class allocation workloads by 22× and 47×, respectively."],
    tags: ["Compilers", "Python", "C++", "Memory Allocation", "Escape Analysis"]
  },
  
];

export const minorProjects: MinorProject[] = [
  {
    title: "Personal website",
    description: "This website and its interactive Paxos introduction",
    tags: ["React", "TypeScript"]
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
    description: "Implemented streaming client that adaptively changes video quality to optimize user experience",
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
    description: "Created a Map-Reduce backend that runs across computing clusters",
    tags: ["Go", "Concurrency", "Distributed Computing"]
  },
  {
    title: "Sharded Paxos",
    description: "Implemented a distributed and sharded KV server from scratch",
    tags: ["Go", "Concurrency", "Fault Tolerance", "Consensus"]
  },
  {
    title: "LLaVA Fine-Tuning",
    description: "Fine-tuned a multimodal Llama-based LLM for terrain recognition",
    tags: ["Training Pipelines", "LLMs", "Post-Training"]
  },
  {
    title: "Search Engine",
    description: "Built a search engine using TF-IDF scores and PageRank",
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
    description: "Reproduced a quantum algorithm that produces a √t speedup over classical solutions",
    tags: ["Quantum Computing", "qiskit", "NP-Hard"]
  },
  {
    title: "MLB Scoreboard",
    description: "Live scores from the league displayed on a Raspberry PI",
    tags: ["Embedded Systems", "Web Scraping", "Real-Time Computing"]
  }
];
