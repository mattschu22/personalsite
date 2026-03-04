import type { Project, MinorProject } from '../types';

export const projects: Project[] = [
  {
    title: "Vibe Kernel",
    subtitle: "Agentic Kernel Development Assistant",
    period: "August 2025 - Current",
    description: "End-to-end automated kernel patch generation tool. The Vibe Kernel agent scrapes bugs found from Google's Syzkaller (kernel fuzzer) project and utilizes an orchestrator-worker agent pattern to produces patches autonomously. Project made use of a small cluster deployed on GCP to parallelize kernel building and verification.",
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
    title: "Anthropic Performance Challenge",
    subtitle: "Optimized assembly code for parallel tree traversal on VLIW/SIMD processors",
    period: "January 2026",
    description: "Optimized assembly code for parallel tree traversal on VLIW/SIMD processors. Project used a combination of techniques to achieve a 125x speedup over the baseline implementation and 13% improvement over what Opus 4.5 was able to do with unlimited time and Anthropic's cutom test harness.",
    tags: ["Optimization", "Inference", "Assembly", "Parallelism"]
  },
  {
    title: "Wine Recommendation Service",
    subtitle: "Full-Stack AI Application",
    period: "May 2025 - Current",
    description: "Natural language-driven wine recommendations using TypeScript (React + Tailwind), Python, and PostgreSQL. MCP-powered agent communication for context-rich recommendations. Reliability is guarenteed through the use of structured responses via native function calling using OpenAI's SDK. Site features complete authentication system and chat history utility.",
    tags: ["TypeScript", "React", "Python", "PostgreSQL", "MCP"]
  },
  {
    title: "ShedSkin",
    subtitle: "Improving Python-to-C Transpilation",
    period: "August 2025 - December 2025",
    description: "Improved the OSS ShedSkin project by using escape analysis to safely stack-allocate method-local objects. Objects were determined to be local to a given method by walking the AST checking for definitions that reached an emitting control-flow statement. The resulting changes improved the runtimes of programs that initialized and access tuples and classes within a tight loop by 22x and 47x respectively.",
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
