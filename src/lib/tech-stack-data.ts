export interface TechItem {
  name: string;
  detail: string;
  iconName?: string;
}

export interface TechCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  depthLabel: string;
  depth: number; // 0.0 (top) to 1.0 (deepest abyss)
  accentColor: string;
  technologies: TechItem[];
}

export const TECH_STACK_DATA: TechCategory[] = [
  {
    id: "surface",
    number: "01",
    title: "WHAT I BUILD WITH",
    subtitle: "Frontend & Core Languages (Surface Level)",
    depthLabel: "SURFACE // ABOVE WATERLINE",
    depth: 0.18,
    accentColor: "#38BDF8", // Cyan
    technologies: [
      { name: "C++", detail: "STL, Memory Management, Graph Algorithms" },
      { name: "Python", detail: "FastAPI, ML Tooling, Automation Scripts" },
      { name: "TypeScript", detail: "Strict Typing, Generic Patterns, Async Flow" },
      { name: "JavaScript", detail: "ES6+, Event Loop, DOM Architecture" },
      { name: "React 18", detail: "Hooks, Custom Hooks, State Architecture" },
      { name: "Next.js 14", detail: "App Router, SSR, Server Components" },
    ],
  },
  {
    id: "how-i-build",
    number: "02",
    title: "HOW I BUILD",
    subtitle: "Backend & Real-time Systems (Upper Submerged)",
    depthLabel: "DEPTH // UPPER HULL",
    depth: 0.42,
    accentColor: "#A855F7", // Purple
    technologies: [
      { name: "Node.js", detail: "Event-driven Server Applications" },
      { name: "FastAPI", detail: "Async REST APIs, Pydantic Schemas" },
      { name: "WebSockets & Yjs", detail: "Real-time Binary CRDT Synchronization" },
      { name: "REST & GraphQL", detail: "API Contracts & Endpoint Design" },
      { name: "Go", detail: "Goroutines, Channels, CLI Binary Specs" },
      { name: "Tailwind CSS & Motion", detail: "Utility Systems & Spring Animations" },
    ],
  },
  {
    id: "where-data-lives",
    number: "03",
    title: "WHERE DATA LIVES",
    subtitle: "Databases & In-memory Queues (Deep Submerged)",
    depthLabel: "ABYSS // DATA CORE",
    depth: 0.68,
    accentColor: "#10B981", // Emerald
    technologies: [
      { name: "PostgreSQL", detail: "ACID Transactions, Relational Schema" },
      { name: "Redis", detail: "Priority Queues, In-memory Caching" },
      { name: "SQL", detail: "Relational Modeling, Indexing & Queries" },
      { name: "Docker", detail: "Containerization, Multi-stage Builds" },
      { name: "Git & Linux", detail: "Version Control, Shell Scripting, CLI" },
    ],
  },
  {
    id: "tools-ml",
    number: "04",
    title: "TOOLS & APPLIED ML",
    subtitle: "AI Infrastructure & Deep Engineering (Deepest Abyss)",
    depthLabel: "TRENCH // DEEP SYSTEMS",
    depth: 0.90,
    accentColor: "#F59E0B", // Amber
    technologies: [
      { name: "Gemini API", detail: "Structured LLM Prompt Engineering" },
      { name: "PyTorch & TensorFlow", detail: "Neural Net Inference & Pipelines" },
      { name: "MLflow", detail: "Model Tracking & Artifact Repositories" },
      { name: "Scikit-Learn", detail: "Dataset Preprocessing & Classifiers" },
      { name: "OpenCV", detail: "Computer Vision & Image Processing" },
      { name: "React Flow", detail: "Visual Computation Graph Builders" },
    ],
  },
];
