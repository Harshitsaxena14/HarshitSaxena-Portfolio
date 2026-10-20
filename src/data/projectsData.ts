import { Project } from "@/types/caseStudy";

export const PROJECTS: Project[] = [
  {
    id: "codement",
    title: "CodeMent",
    tagline: "Adaptive DSA Learning Platform & Chrome MV3 Extension",
    description:
      "A full-stack, adaptive DSA learning platform featuring a 25+ topic guided curriculum, socratic AI mentorship powered by Google Gemini, and a Manifest V3 Chrome extension that synchronizes problem-solving telemetry directly from live LeetCode sessions.",
    problem:
      "Beginners learning DSA face high cognitive friction: solving random uncurated problems without topic progression, forgetting previously solved patterns, lacking weak-topic diagnosis, and having no contextual guidance while actively struggling on LeetCode.",
    architecture:
      "Decoupled multi-tier system: React 19 + Vite frontend communicating via Axios with an Express.js REST backend, MongoDB Atlas persistence (users, problems, progress, contests), Google Gemini AI integration for socratic hints, and a Manifest V3 Chrome extension injecting content scripts into leetcode.com/problems/*.",
    features: [
      "25+ Topic Curated DSA Roadmap with progressive unlock gates",
      "Socratic AI Mentor powered by Google Gemini for hint laddering",
      "Manifest V3 Chrome Extension auto-detecting active LeetCode problems",
      "Spaced Repetition & Mission Planner tracking mastery decay",
      "Mock Contest Engine with real-time scoring and telemetry",
      "JWT-authenticated user accounts and progress synchronization",
    ],
    challenges:
      "Synchronizing isolated Chrome extension content scripts with the web application session state without auth latency, and prompt engineering Google Gemini to enforce socratic hint progression instead of immediate code leaks.",
    lessons:
      "Bridging structured curriculum directly into the developer's live problem-solving context (via browser extension) yields vastly higher retention than isolated problem databases.",
    tech: [
      "React 19",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Google Gemini AI",
      "Chrome MV3",
      "Tailwind CSS",
      "JWT",
      "Axios",
    ],
    accentHue: 270,
    githubUrl: "https://github.com/Harshitsaxena14/CodeMent",
    isFeatured: true,
    featuredBadge: "FLAGSHIP // ADAPTIVE DSA PLATFORM",
    previewImage: "/projects/codement/hero.png",
    logoSvg: "/projects/codement/logo.svg",
    verifiedModules: [
      { label: "CURRICULUM", detail: "25+ Topics & Unlocks" },
      { label: "AI MENTOR", detail: "Gemini Context Hints" },
      { label: "SYNC EXTENSION", detail: "LeetCode Manifest V3" },
      { label: "AUTH & DATA", detail: "Express + Mongo + JWT" },
    ],
    caseStudy: {
      badge: "FLAGSHIP // ADAPTIVE DSA PLATFORM",
      category: "Adaptive DSA Learning Platform & Chrome MV3 Extension",
      summary:
        "CodeMent eliminates the disjointed preparation process typical of algorithmic interviews by uniting a structured 25+ topic curriculum, an interactive AI mentor, and a real-time browser extension that monitors live LeetCode problem solving.",
      targetAudience:
        "Computer science students, prospective software engineers, and competitive programmers who need structured topic progression rather than random, unguided problem solving.",
      problemStatement: {
        headline: "The Disconnected Algorithmic Preparation Trap",
        context:
          "Thousands of candidates practice on LeetCode daily, yet many struggle during technical interviews due to fragmented preparation habits.",
        coreFrictions: [
          "Curriculum Deficit: Beginners tackle advanced Dynamic Programming or Graph problems prematurely without mastering foundational recursion and two-pointer paradigms.",
          "Context Switching & Editorial Dependency: When stuck, developers either browse spoiler-heavy forums or surrender to complete solutions, short-circuiting genuine algorithmic intuition.",
          "Retention Decay: Solved questions are forgotten within weeks because platforms lack built-in spaced repetition intervals based on problem difficulty and user confidence.",
          "Live Practice Isolation: Learning resources, cheat sheets, and tracking spreadsheets exist completely detached from the actual code editor on LeetCode.",
        ],
        technicalConstraints:
          "The solution had to integrate seamlessly with third-party web domains (leetcode.com) without violating browser security sandbox boundaries, while keeping AI token costs and response latency low.",
      },
      solution: {
        headline: "A Unified Learning Loop with Live Extension Telemetry",
        summary:
          "CodeMent re-engineers DSA preparation into a cohesive feedback loop: structured curriculum progression, in-editor AI hints during live problem solving, and automated revision scheduling.",
        components: [
          {
            title: "25+ Topic Curated Roadmap",
            description:
              "Sequential curriculum dividing algorithmic concepts into beginner, intermediate, and advanced tiers with prerequisite unlock gates.",
          },
          {
            title: "Socratic AI Mentor (Gemini)",
            description:
              "A prompt-engineered AI engine configured to deliver progressive hint ladders (Intuition → Data Structure → Edge Cases → Pseudocode) rather than immediate code answers.",
          },
          {
            title: "Manifest V3 LeetCode Companion Extension",
            description:
              "Browser extension running declarative content scripts that detect problem slugs on leetcode.com, retrieve curriculum alignment, and sync telemetry.",
          },
          {
            title: "Mission Planner & Retention Engine",
            description:
              "Automated spaced-repetition scheduler (1-day, 3-day, 7-day intervals) surfacing weak topics and decay curves in a central analytics dashboard.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Curriculum Calibration & Topic Selection",
          actor: "Citizen Learner / React Frontend",
          description:
            "User logs in via JWT authentication, reviews their mastery heatmap, and selects their active roadmap topic (e.g., Two Pointers, Sliding Window, Binary Trees).",
        },
        {
          stepNumber: "02",
          title: "Live Problem Detection on LeetCode",
          actor: "Chrome MV3 Extension / Content Script",
          description:
            "When navigating to leetcode.com/problems/*, CodeMent's content script matches the URL slug against the backend problem catalog and displays topic context in an unobtrusive overlay.",
        },
        {
          stepNumber: "03",
          title: "Socratic In-Session AI Guidance",
          actor: "Google Gemini 1.5 API / Express Middleware",
          description:
            "If stuck or encountering Time Limit Exceeded (TLE), the learner asks for assistance. The AI parses the problem constraints and provides structured nudges without spoiling code.",
        },
        {
          stepNumber: "04",
          title: "Completion Telemetry & Spaced Revision Scheduling",
          actor: "Express REST API / MongoDB Mongoose",
          description:
            "Upon problem acceptance, the extension relays completion telemetry to /api/progress, updating the user's mastery score and scheduling revision intervals in the Mission Planner.",
        },
      ],
      keyHighlights: [
        "25+ Curated Topic Modules with unlock dependencies",
        "Manifest V3 Content Script injection on leetcode.com/problems/*",
        "Socratic AI hint laddering powered by Google Gemini",
        "Spaced repetition revision engine with decay telemetry",
        "Mock contest environment with penalty metrics",
        "Decoupled React 19 + Express.js + MongoDB architecture",
      ],
      architecture: {
        summary:
          "CodeMent employs a decoupled multi-tier architecture uniting an SPA client, a browser extension runtime, an Express REST backend, MongoDB Atlas persistence, and Google Gemini AI.",
        diagramType: "codement",
        frontend: {
          framework: "React 19 with Vite & Tailwind CSS",
          details: [
            "Modular page routing using React Router with protected route wrappers",
            "Context-driven session and active-mission state management",
            "Responsive dark editorial theme with custom Tailwind tokens and smooth layout transitions",
            "Dedicated interactive views: Roadmap, AI Mentor, Practice, Dashboard, Mock Contests, and Revision Tracker",
          ],
        },
        backend: {
          runtime: "Node.js with Express.js REST application",
          details: [
            "Stateless JWT authentication with bcrypt password hashing and token validation middleware",
            "Configured CORS rules supporting web client and browser extension origins",
            "Custom Gemini API proxy with system prompt safety filters and error handling",
          ],
          endpoints: [
            { method: "POST", path: "/api/auth/register", description: "User registration with encrypted credentials" },
            { method: "POST", path: "/api/auth/login", description: "Authentication and JWT token issuance" },
            { method: "GET", path: "/api/problems", description: "Curated problem directory & topic taxonomy" },
            { method: "POST", path: "/api/progress/sync", description: "Telemetry sync from extension and web app" },
            { method: "POST", path: "/api/ai/hint", description: "Gemini socratic guidance proxy" },
            { method: "GET", path: "/api/contests", description: "Mock contest list, questions, and timing rules" },
          ],
        },
        dataLayer: {
          storage: "MongoDB Atlas via Mongoose ODM",
          details: [
            "User Schema (user.js): profile, auth credentials, saved preferences",
            "Problem Schema (problemmodel.js): title, slug, topic category, difficulty, hints",
            "Progress Schema (progressmodel.js): completed topics, solved problems, revision timestamps",
            "Contest Schema (contestmodel.js): contest rounds, time limits, scoring benchmarks",
          ],
        },
        integrations: [
          {
            name: "Google Gemini AI API",
            purpose: "Socratic problem hints, conceptual breakdowns, and complexity verification",
            details:
              "Invoked via Google Generative AI SDK with enforced system constraints to withhold raw code implementations unless explicitly requested in review mode.",
          },
          {
            name: "Chrome Extension (Manifest V3)",
            purpose: "Real-time LeetCode synchronization and in-context guidance",
            details:
              "Runs content scripts on https://leetcode.com/problems/* with activeTab, storage, tabs, and scripting permissions, communicating with local web app via postMessage and REST.",
          },
        ],
      },
      techCategories: [
        {
          category: "Frontend & UI",
          items: ["React 19", "Vite", "Tailwind CSS", "React Router", "Lucide React", "Axios", "Framer Motion"],
        },
        {
          category: "Backend & Services",
          items: ["Node.js", "Express.js", "JWT (jsonwebtoken)", "bcryptjs", "CORS", "dotenv"],
        },
        {
          category: "Database & Storage",
          items: ["MongoDB Atlas", "Mongoose ODM", "Chrome Local Storage API"],
        },
        {
          category: "AI & Platform Tooling",
          items: ["Google Gemini API", "Chrome Extension (Manifest V3)", "Git", "ESLint"],
        },
      ],
      contributions: {
        role: "Full-Stack Architect & Sole Developer",
        collaboration: "Individual engineering project independently designed and built by Harshit Saxena.",
        keyDeliverables: [
          "Engineered the full-stack system end-to-end: React 19 SPA, Express REST server, and Chrome MV3 extension",
          "Formulated the 25+ topic DSA syllabus, prerequisite graph, and problem tagging taxonomy",
          "Designed socratic prompt middleware in Express that sanitizes incoming problem contexts before querying Gemini",
          "Built the spaced repetition interval algorithm and mock contest performance calculator",
        ],
      },
      featureGroups: [
        {
          groupTitle: "Curriculum & Progression",
          badge: "25+ TOPICS",
          features: [
            {
              name: "Progressive Unlock Roadmap",
              description: "Visual topic tree that unlocks subsequent algorithmic paradigms only after prerequisite problems are satisfied.",
              implementationDetail: "Evaluates user topic completion percentage in progressmodel.js before permitting access to dependent modules.",
              status: "production",
            },
            {
              name: "Topic Deep-Dive Pages",
              description: "Dedicated topic breakdown pages with pattern summaries, common pitfalls, and curated problem sequences.",
              implementationDetail: "Rendered dynamically in React from curated topic schemas with difficulty filters.",
              status: "production",
            },
          ],
        },
        {
          groupTitle: "AI Mentorship & Guidance",
          badge: "GEMINI 1.5",
          features: [
            {
              name: "Socratic Hint Laddering",
              description: "Four-tier progressive assistance: high-level intuition → data structure hint → edge case warning → pseudocode.",
              implementationDetail: "System prompt explicitly instructs the LLM to restrict output to conceptual intuition nudges without emitting solution code.",
              status: "production",
            },
            {
              name: "Time & Space Complexity Analyzer",
              description: "Instant algorithmic complexity evaluation comparing proposed approaches with optimal theoretical bounds.",
              implementationDetail: "Parses user-entered approach descriptions and returns big-O notation breakdowns.",
              status: "production",
            },
          ],
        },
        {
          groupTitle: "LeetCode Integration & Telemetry",
          badge: "MANIFEST V3",
          features: [
            {
              name: "Live LeetCode Slug Detection",
              description: "Chrome content script automatically matches the active problem URL on leetcode.com against CodeMent roadmap topics.",
              implementationDetail: "Injected content.js inspects window.location.pathname and problem container DOM nodes.",
              status: "production",
            },
            {
              name: "In-Browser Quick Action Popup",
              description: "Popup extension interface displaying current topic progress and quick links to CodeMent tools without leaving LeetCode.",
              implementationDetail: "Built with Manifest V3 action popup.html backed by chrome.storage.local caching.",
              status: "production",
            },
          ],
        },
        {
          groupTitle: "Retention & Testing",
          badge: "TELEMETRY",
          features: [
            {
              name: "Spaced Repetition Scheduler",
              description: "Surfaces problems due for review at 1-day, 3-day, and 7-day intervals based on solve confidence ratings.",
              implementationDetail: "Calculates nextReviewDate in MongoDB and flags expired intervals on the user dashboard.",
              status: "production",
            },
            {
              name: "Mock Contest Simulator",
              description: "Timed contest practice recreating real-world assessment environments with penalty point calculations.",
              implementationDetail: "Tracks elapsed seconds and submission counts against contestmodel.js rules.",
              status: "production",
            },
          ],
        },
      ],
      visualAssets: [
        {
          type: "image",
          src: "/projects/codement/hero.png",
          title: "CodeMent Platform Hero Archive",
          caption: "Authentic platform asset from CodeMent frontend source archive displaying the central dashboard hero motif.",
          attribution: "Verified repository asset: CodeMent/frontend/src/assets/hero.png",
        },
        {
          type: "image",
          src: "/projects/codement/logo.svg",
          title: "CodeMent Identity Vector",
          caption: "Verified brand identity vector asset from the platform repository.",
          attribution: "Verified repository asset: CodeMent/frontend/public/favicon.svg",
        },
      ],
      challenges: [
        {
          title: "Browser Extension Sandbox Isolation",
          problem:
            "Chrome Manifest V3 content scripts run in isolated worlds and cannot directly access web application JavaScript variables or cookies across different origins.",
          solution:
            "Designed a secure message-passing protocol utilizing window.postMessage with origin verification and chrome.storage.local to reliably synchronize JWT tokens and telemetry.",
          compromiseOrLesson:
            "Cross-context messaging requires strict origin validation to eliminate token exfiltration vulnerabilities.",
        },
        {
          title: "Preventing LLM Solution Leaks",
          problem:
            "Default LLM completions eagerly provide complete working C++ or Python code, depriving learners of the cognitive effort needed to build algorithmic problem-solving skills.",
          solution:
            "Engineered rigid multi-shot system instructions in the Express AI controller that enforce four structured hint tiers and explicitly penalize emitting functional code blocks.",
          compromiseOrLesson:
            "Pedagogical AI requires strict prompt engineering with structured response schemas rather than open-ended conversational completion.",
        },
        {
          title: "Dynamic LeetCode DOM Mutation Handling",
          problem:
            "LeetCode's single-page React interface frequently re-renders DOM trees during problem transitions without full page reloads, causing standard extension content scripts to detach.",
          solution:
            "Implemented a MutationObserver in content.js that monitors title and URL slug mutations, ensuring consistent telemetry hooks across navigation events.",
          compromiseOrLesson:
            "DOM-monitoring extensions must rely on URL change listeners and robust fallback element selectors.",
        },
      ],
      currentLimitations: [
        {
          area: "Extension Distribution",
          limitation: "Chrome Extension is currently packaged for local developer unpacked installation.",
          reason: "Chrome Web Store review and publishing pipeline is pending domain verification.",
        },
        {
          area: "Submission Verification",
          limitation: "Problem completion verification relies on user confirmation and extension detection rather than automated LeetCode internal API hooks.",
          reason: "LeetCode does not provide a public developer submission webhook API without account credentials.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "Real-Time WebSocket Peer Contests",
          description: "Enable developers to create private rooms and solve randomized curated sets synchronously with live scoreboard telemetry.",
          status: "proposed",
        },
        {
          priority: "P1",
          title: "Voice-Driven Socratic Assistant",
          description: "Integrate Web Speech API to allow candidates to verbally explain their algorithmic approach while the AI critiques logic flaws.",
          status: "in_progress",
        },
        {
          priority: "P2",
          title: "Automated Chrome Web Store Publishing",
          description: "Finalize packaging, privacy disclosures, and automated CI/CD deployment to the Chrome Web Store.",
          status: "planned",
        },
      ],
    },
  },
  {
    id: "sahayak",
    title: "SAHAYAK",
    tagline: "Multilingual AI Government & Citizen Assistant (SIH 2026 Prototype)",
    description:
      "A voice-first, multilingual AI citizen assistant engineered for Smart India Hackathon 2026. Guides citizens through welfare scheme eligibility (Pillar 1), manages deterministic grievance registration and tracking (Pillar 2), and provides a dedicated departmental officer resolution dashboard.",
    problem:
      "Navigating India's public welfare ecosystem is burdened by bureaucratic jargon, complex eligibility rules across disparate department portals, lack of language accessibility for rural citizens, and absence of transparent grievance redressal tracking.",
    architecture:
      "Decoupled full-stack architecture with React 18 + Vite frontend (featuring Web Speech API voice input in Hindi, Hinglish, and English), an Express.js backend exposing REST endpoints, MongoDB database with local JSON fallback (server/data/schemes.json), and an AI orchestration layer utilizing Groq SDK (Llama 3) / Gemini with strict JSON schema intent validation and an offline heuristic fallback classifier.",
    features: [
      "Pillar 1: Multilingual Scheme Discovery & Eligibility Engine (7 seeded national schemes)",
      "Pillar 2: Deterministic Grievance Redressal & Live Status Tracking (GRV-2026-XXXXXX)",
      "Dedicated Departmental Officer Resolution Dashboard (/officer)",
      "AI Intent Understanding & Slot Filling via strict JSON schema (UNDERSTAND_SCHEMA)",
      "Voice-first interaction via browser Web Speech API (Hindi, Hinglish, English)",
      "Dual-layer storage architecture with automatic memory/JSON fallback for offline testing",
    ],
    challenges:
      "Ensuring rapid offline fallback when cloud LLM APIs are unreachable, resolving ambiguity in mixed Hinglish speech inputs, and maintaining data consistency between static seed catalogs and dynamic MongoDB collections.",
    lessons:
      "Government accessibility tools must prioritize offline resilience and deterministic tracking IDs; citizens value transparency and verifiable ticket status over opaque conversational AI.",
    tech: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Web Speech API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Groq SDK",
      "Llama 3",
      "Lucide React",
    ],
    accentHue: 210,
    githubUrl: "https://github.com/Harshitsaxena14/Sahayak",
    isFeatured: false,
    featuredBadge: "SMART INDIA HACKATHON 2026 PROTOTYPE",
    verifiedModules: [
      { label: "PILLAR 1", detail: "Scheme Discovery & Eligibility" },
      { label: "PILLAR 2", detail: "Grievance Redressal (GRV)" },
      { label: "OFFICER PORTAL", detail: "/officer Status Workflow" },
      { label: "AI ENGINE", detail: "Groq Llama 3 + Heuristics" },
    ],
    caseStudy: {
      badge: "SMART INDIA HACKATHON 2026 PROTOTYPE",
      category: "Multilingual AI Government & Citizen Assistant",
      summary:
        "SAHAYAK simplifies government interactions by converting complex administrative procedures into a voice-guided conversation that explains welfare eligibility, registers verifiable citizen complaints, and routes grievances to municipal officers.",
      targetAudience:
        "Indian citizens navigating public welfare schemes, rural or semi-literate users requiring voice and multilingual assistance, and municipal departmental officers managing citizen grievances.",
      problemStatement: {
        headline: "The Information Barrier in Public Welfare & Redressal",
        context:
          "While hundreds of beneficial government initiatives exist across central and state ministries, millions of intended beneficiaries fail to access them due to bureaucratic complexity.",
        coreFrictions: [
          "Navigational Friction: Scheme documentation is scattered across dozens of disjointed departmental portals, written in dense administrative language that confuses citizens.",
          "Language & Literacy Divide: Millions of citizens communicate primarily in regional dialects or spoken Hinglish, making text-heavy web forms inaccessible.",
          "Opaque Grievance Submission: When basic civic services (water supply, roads, electricity) fail, citizens lack simple channels to file structured complaints with guaranteed tracking.",
          "Administrative Clutter: Departmental officers receive unstructured, unclassified complaints without standardized priority categorizations or audit logs.",
        ],
        technicalConstraints:
          "The system needed to support low-bandwidth connections, operate with zero external API dependencies in offline mode during hackathon evaluations, and handle code-mixed Hinglish queries.",
      },
      solution: {
        headline: "A Two-Pillar Conversational Platform with Deterministic Redressal",
        summary:
          "SAHAYAK organizes public service delivery into two distinct, verifiable functional pillars backed by structured AI orchestration and an officer management screen.",
        components: [
          {
            title: "Pillar 1: Scheme Discovery & Eligibility Assistant",
            description:
              "Guides citizens through discovery, understanding, eligibility checking, required documentation preparation, and direct official application portal links across verified welfare schemes (e.g., PM-KISAN, Ayushman Bharat).",
          },
          {
            title: "Pillar 2: Grievance Redressal Engine",
            description:
              "Captures civic complaints, classifies department and priority, generates deterministic ticket IDs (GRV-2026-XXXXXX), and logs complete audit histories.",
          },
          {
            title: "Officer Management Portal (/officer)",
            description:
              "Administrative dashboard where departmental officers review assigned grievances, update investigation progress (Registered → In Progress → Resolved), and record resolution notes.",
          },
          {
            title: "AI Intent Engine with Heuristic Fallback",
            description:
              "Structured pipeline utilizing Groq SDK (Llama 3) with JSON schema enforcement, coupled with an offline regex/keyword heuristic classifier (fallbackHeuristicClassify) for uninterrupted operation.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Citizen Query & Voice Intake",
          actor: "Citizen / Web Speech API (Client)",
          description:
            "Citizen speaks or types in Hindi, Hinglish, or English (e.g., 'Mujhe khet ke liye subsidy chahiye' or 'Hamare gaon me paani ki supply 3 din se band hai').",
        },
        {
          stepNumber: "02",
          title: "AI Intent Understanding & Slot Extraction",
          actor: "Groq SDK / UNDERSTAND_SCHEMA / Heuristic Engine",
          description:
            "POST /api/ai/understand classifies the intent (scheme_discovery, grievance_registration, etc.) and extracts entity slots: user_type, need, problem, location, department, priority.",
        },
        {
          stepNumber: "03",
          title: "Contextual Orchestration & Ticket Issuance",
          actor: "Express Server / MongoDB Service Layer",
          description:
            "For schemes, POST /api/ai/orchestrate returns tailored scheme details. For grievances, POST /api/ai/confirm-grievance generates a unique ticket (e.g. GRV-2026-836715) persisted to MongoDB.",
        },
        {
          stepNumber: "04",
          title: "Officer Redressal & Transparent Tracking",
          actor: "Municipal Officer (/officer) & Citizen",
          description:
            "Officers inspect assigned tickets via PATCH /api/officer/grievances/:ticketId to update progress and add resolution notes. Citizens track updates in real-time via /api/grievances/track/:ticketId.",
        },
      ],
      keyHighlights: [
        "Dual-pillar citizen architecture: Welfare Schemes + Grievance Redressal",
        "Deterministic ticket tracking format (GRV-2026-XXXXXX) with audit history",
        "7 verified seeded national schemes (PM-KISAN, Ayushman Bharat, PMAY, etc.)",
        "Multilingual NLP parsing with Groq SDK (Llama 3) and JSON schema enforcement",
        "Built-in offline heuristic fallback classifier for zero-dependency execution",
        "Dedicated officer dashboard (/officer) for workflow management",
      ],
      architecture: {
        summary:
          "SAHAYAK connects a multilingual React 18 client to an Express.js backend, backed by MongoDB with automatic fallback to JSON storage, orchestrated via Groq SDK and heuristic classification.",
        diagramType: "sahayak",
        frontend: {
          framework: "React 18 with Vite & Tailwind CSS",
          details: [
            "React Router DOM v6 managing citizen portal and officer dashboard routes (/ and /officer)",
            "Web Speech API integration for direct browser-based speech-to-text input",
            "Lucide React icons and clean accessibility-focused responsive citizen UI",
            "Real-time ticket tracker component rendering visual step progression",
          ],
        },
        backend: {
          runtime: "Node.js (CommonJS) with Express.js REST application",
          details: [
            "Modular controller and route separation: schemes, grievances, applications, ai, and officer",
            "Groq SDK integration running Llama 3 with enforced JSON schema validation",
            "Offline heuristic fallback classifier ensuring 100% uptime without API keys",
          ],
          endpoints: [
            { method: "GET", path: "/api/health", description: "System health & MongoDB connectivity status check" },
            { method: "GET", path: "/api/schemes", description: "Fetch all active government scheme records" },
            { method: "GET", path: "/api/schemes/:id", description: "Fetch scheme details by ID (e.g., SCH-001 PM-KISAN)" },
            { method: "POST", path: "/api/ai/understand", description: "Extract intent, language, category, and entity slots" },
            { method: "POST", path: "/api/ai/orchestrate", description: "Synthesize contextual scheme results and recommendations" },
            { method: "POST", path: "/api/ai/confirm-grievance", description: "Generate new grievance ticket (GRV-2026-XXXXXX)" },
            { method: "GET", path: "/api/grievances/track/:ticketId", description: "Track grievance investigation progress and notes" },
            { method: "POST", path: "/api/ai/confirm-application", description: "Submit verified scheme application (APP-2026-XXXXXX)" },
            { method: "GET", path: "/api/applications/track/:appId", description: "Track citizen scheme application status" },
            { method: "POST", path: "/api/officer/login", description: "Officer authentication portal" },
            { method: "GET", path: "/api/officer/grievances", description: "List all assigned grievances for departmental review" },
            { method: "PATCH", path: "/api/officer/grievances/:ticketId", description: "Update grievance status and append audit notes" },
          ],
        },
        dataLayer: {
          storage: "MongoDB via Mongoose with JSON file fallback (server/data/schemes.json)",
          details: [
            "Scheme Model (Scheme.js): schemeId, name, hindiName, ministry, sector, benefits, eligibility, documentsRequired",
            "Grievance Model (Grievance.js): ticketId, citizen details, department, priority, status, history, resolutionNotes",
            "Application Model (Application.js): appId, schemeId, applicantData, verificationStatus, submissionDate",
            "Automatic database seeding script (scripts/seed.js) populating verified national welfare data",
          ],
        },
        integrations: [
          {
            name: "Groq SDK / Llama 3 70B",
            purpose: "Zero-shot intent classification and slot filling into UNDERSTAND_SCHEMA",
            details:
              "Constrained by rigid JSON schema requiring intent, language, category, and 10 specific entity keys to prevent output hallucination.",
          },
          {
            name: "Rule-Based Heuristic NLP Fallback",
            purpose: "Guaranteed offline execution without cloud API dependency",
            details:
              "Regex and keyword pattern matcher implemented in fallbackHeuristicClassify ensuring the prototype remains responsive during network outages.",
          },
          {
            name: "Web Speech API",
            purpose: "In-browser voice input for Hindi and English speech",
            details: "Native browser speech recognition capturing citizen spoken queries without requiring external audio processing servers.",
          },
        ],
      },
      techCategories: [
        {
          category: "Frontend & Voice",
          items: ["React 18", "Vite", "Tailwind CSS", "React Router DOM", "Web Speech API", "Lucide React"],
        },
        {
          category: "Backend & Routing",
          items: ["Node.js", "Express.js", "CORS", "dotenv", "nodemon", "CommonJS"],
        },
        {
          category: "Database & Persistence",
          items: ["MongoDB", "Mongoose", "JSON File Fallback (schemes.json)", "Seed Scripts"],
        },
        {
          category: "AI & NLP Services",
          items: ["Groq SDK", "Llama 3", "UNDERSTAND_SCHEMA Enforcer", "Regex Heuristic NLP Engine"],
        },
      ],
      contributions: {
        role: "Full-Stack Engineer & AI Architect (Team Prototype)",
        collaboration: "Built for Smart India Hackathon (SIH 2026) prototype competition with verified backend and client integration.",
        keyDeliverables: [
          "Architected the dual-pillar core: Scheme Assistant (Pillar 1) and Grievance Redressal (Pillar 2)",
          "Engineered the Express REST API endpoints and Mongoose models for schemes, tickets, and applications",
          "Implemented the strict JSON schema intent parser and the offline heuristic fallback engine",
          "Built the end-to-end verified grievance lifecycle from creation (GRV-2026-836715) to officer PATCH updates",
        ],
      },
      featureGroups: [
        {
          groupTitle: "Pillar 1: Scheme Discovery & Guidance",
          badge: "7 SCHEMES",
          features: [
            {
              name: "Conversational Welfare Search",
              description: "Translates natural-language citizen inquiries into targeted welfare scheme recommendations.",
              implementationDetail: "Evaluates extracted demographic slots against MongoDB scheme records (e.g. SCH-001 PM-KISAN).",
              status: "functional",
            },
            {
              name: "Eligibility & Document Checklist",
              description: "Itemizes required government documents (Aadhaar, income certificates, land records) and direct application steps.",
              implementationDetail: "Exposes structured documentsRequired array from Scheme.js schema.",
              status: "functional",
            },
          ],
        },
        {
          groupTitle: "Pillar 2: Grievance Redressal",
          badge: "GRV TICKETS",
          features: [
            {
              name: "Deterministic Ticket Generation",
              description: "Issues unique collision-resistant tracking codes formatted as GRV-2026-XXXXXX.",
              implementationDetail: "POST /api/ai/confirm-grievance calculates randomized 6-digit hashes tied to current year.",
              status: "functional",
            },
            {
              name: "Real-Time Grievance Tracker",
              description: "Citizen portal allowing immediate verification of ticket status, assigned department, and timestamped progress logs.",
              implementationDetail: "GET /api/grievances/track/:ticketId retrieves complete status audit array from MongoDB.",
              status: "functional",
            },
          ],
        },
        {
          groupTitle: "Administrative Controls",
          badge: "OFFICER PORTAL",
          features: [
            {
              name: "Officer Resolution Dashboard",
              description: "Interface allowing municipal staff to inspect incoming tickets, filter by department, and update status.",
              implementationDetail: "PATCH /api/officer/grievances/:ticketId updates status to In Progress or Resolved with notes.",
              status: "functional",
            },
            {
              name: "Audit Trail Logging",
              description: "Records history entries for every status update, documenting who modified the ticket and when.",
              implementationDetail: "Appends timestamped update objects into the grievance history array.",
              status: "functional",
            },
          ],
        },
        {
          groupTitle: "Resilience & Fallback Architecture",
          badge: "OFFLINE FIRST",
          features: [
            {
              name: "Dual-Storage Resilience",
              description: "Automatically switches to local memory/JSON fallback if MongoDB daemon is unreachable.",
              implementationDetail: "getSchemesData() falls back to reading server/data/schemes.json if database connection fails.",
              status: "production",
            },
            {
              name: "Heuristic Classification Fallback",
              description: "Guarantees query understanding even when external AI API keys or internet access are unavailable.",
              implementationDetail: "fallbackHeuristicClassify regex rule engine detects intents for water, electricity, roads, and schemes.",
              status: "production",
            },
          ],
        },
      ],
      challenges: [
        {
          title: "Officer Authentication Security Hardening",
          problem:
            "As documented in repository audit logs, the prototype's officer login currently uses demo credential stubs and static tokens without cryptographic signature verification.",
          solution:
            "Architected the roadmap to replace demo tokens with bcrypt password hashing, salted credential stores, and signed JWT session headers with role-based access control (RBAC).",
          compromiseOrLesson:
            "Hackathon velocity necessitated a working demo authentication flow, but production deployment requires rigorous security boundaries.",
        },
        {
          title: "Mixed Hinglish Classification Ambiguity",
          problem:
            "Users frequently mix Hindi phrasing with English technical terms (e.g., 'PM kisan status check karna hai'), which caused LLM intent parsers to misclassify language or assign broad 'general' tags.",
          solution:
            "Constructed the UNDERSTAND_SCHEMA enforcer that forces the model to select strictly from enumerated intents and languages, supplemented by keyword biasing.",
          compromiseOrLesson:
            "Constraining LLM responses to deterministic JSON schemas significantly reduces classification errors in multilingual contexts.",
        },
        {
          title: "Dual Source of Truth Synchronization",
          problem:
            "Early prototype iterations maintained scheme definitions in both schemes.json and MongoDB, causing data desync during updates.",
          solution:
            "Consolidated MongoDB as the definitive system of record, utilizing server/scripts/seed.js as the single source for database population.",
          compromiseOrLesson:
            "A single authoritative persistence source is critical to avoid divergent application state in multi-developer hackathon prototypes.",
        },
      ],
      currentLimitations: [
        {
          area: "Officer Authentication",
          limitation: "Officer login is currently in demo mode using static tokens.",
          reason: "Full bcrypt password hashing and JWT authorization middleware are documented as P0 next steps.",
        },
        {
          area: "Voice Synthesis (TTS)",
          limitation: "Audio readout depends on browser Web Speech API voice synthesis availability.",
          reason: "Third-party cloud neural TTS engines require persistent paid API keys.",
        },
        {
          area: "Application Form Demo Fallback",
          limitation: "Unknown application tracking IDs return simulated verification records.",
          reason: "Demonstration fallback implemented for hackathon presentations when mock IDs are entered.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "Production Officer Authentication & RBAC",
          description: "Implement real bcrypt password hashing, secure JWT cookies, and role-based authorization restricting grievance modifications to assigned officers.",
          status: "in_progress",
        },
        {
          priority: "P1",
          title: "DigiLocker API Integration",
          description: "Enable citizens to fetch Aadhaar and income verification directly through India's DigiLocker gateway for automated scheme eligibility scoring.",
          status: "planned",
        },
        {
          priority: "P2",
          title: "WhatsApp & Telegram Bot Gateway",
          description: "Extend SAHAYAK's conversational REST endpoints to WhatsApp Business API to reach citizens without smartphones or web browsers.",
          status: "proposed",
        },
      ],
    },
  },
  {
    id: "harshitos-portfolio",
    title: "HarshitOS Portfolio",
    tagline: "Dark Editorial Systems Profile & Interactive Workspace",
    description:
      "A high-performance progressive web application showcasing systems engineering, algorithms, LeetCode analytics, and interactive spatial interfaces built with Next.js 14 App Router, TypeScript, and Framer Motion.",
    problem:
      "Traditional template portfolios are static, generic, and fail to demonstrate real frontend engineering depth, systems craftsmanship, keyboard accessibility, or interactive performance under 60fps budgets.",
    architecture:
      "Next.js 14 App Router with React 18 Server and Client Components, TypeScript strict typing, Tailwind CSS custom design tokens, Lenis smooth scrolling, GSAP card fan physics, and serverless proxy routes for live LeetCode GraphQL statistics.",
    features: [
      "Terminal boot protocol with cinematic transition and reduced motion support",
      "Apple-inspired floating dock navigation with active viewport tracking",
      "Interactive 3D Spatial Tilt & Card Fan Carousel physics",
      "Command Palette (⌘K) quick keyboard navigation with focus trap",
      "Live LeetCode GraphQL API integration displaying real-time metrics",
      "Full-screen four-tab interactive project case study workspaces",
    ],
    challenges:
      "Engineering complex 3D perspective transforms, GSAP fan physics, and terminal boot sequences while achieving zero hydration mismatch errors, sub-100ms interaction latency, and full keyboard accessibility.",
    lessons:
      "Restraint is the hallmark of great design. 70% content hierarchy, 20% interaction motion, and 10% spatial depth creates a lasting impression without sacrificing readability.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "GraphQL",
      "Lucide React",
    ],
    accentHue: 45,
    githubUrl: "https://github.com/Harshitsaxena14/HarshitSaxena-Portfolio",
    isFeatured: false,
    featuredBadge: "PRODUCTION PROFILE",
    caseStudy: {
      badge: "PRODUCTION PROFILE",
      category: "Next.js Systems Architecture & Interactive Profile",
      summary:
        "HarshitOS demonstrates modern web engineering craft: a progressive Next.js 14 application combining terminal boot sequencing, command palette keyboard workflows, 3D card physics, and deep project case studies.",
      targetAudience:
        "Engineering hiring managers, technical recruiters, and peer developers evaluating frontend architecture, interactive design standards, and system design capability.",
      problemStatement: {
        headline: "The Homogeneity of Modern Developer Portfolios",
        context:
          "Standard developer portfolios rely on predictable templates that list skills without demonstrating engineering depth or interactive polish.",
        coreFrictions: [
          "Superficial Skill Lists: Claiming proficiency in algorithms and architecture without interactive evidence or grounded case studies.",
          "Jank & Animation Bloat: Heavy libraries and uncalibrated animations causing layout shifts, scroll stutter, and poor mobile performance.",
          "Lack of Keyboard Accessibility: Visually flashy interfaces that are completely unusable for keyboard-only visitors.",
          "Stale Analytics: Static manually updated badges that fail to reflect ongoing algorithmic practice.",
        ],
        technicalConstraints:
          "Zero third-party 3D engine overhead (no three.js bundle bloat), zero hydration mismatch errors, strict WCAG contrast compliance, and sub-second initial paint.",
      },
      solution: {
        headline: "A Systems-Grade Interactive Engineering Profile",
        summary:
          "Built from the ground up using Next.js 14 App Router, combining curated design tokens, mathematical spring physics, and live telemetry integrations.",
        components: [
          {
            title: "Cinematic Boot & Terminal Protocol",
            description: "Custom phased boot sequence simulating systems initialization with accessible skip mechanisms.",
          },
          {
            title: "Command Palette (⌘K) Architecture",
            description: "Keyboard-driven modal navigation featuring focus trapping, fuzzy matching, and keyboard shortcuts.",
          },
          {
            title: "Spatial Card Fan & 3D Tilt Field",
            description: "GSAP and CSS 3D perspective transforms creating tactile physical card displacement on hover.",
          },
          {
            title: "LeetCode GraphQL Proxy API",
            description: "Next.js serverless route proxying LeetCode's public GraphQL endpoint with edge caching.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Initial Page Load & Boot Diagnostics",
          actor: "Next.js App Router / useBoot Hook",
          description: "Terminal initialization renders system telemetry and transitions into the primary editorial hero view.",
        },
        {
          stepNumber: "02",
          title: "Smooth Continuous Vertical Journey",
          actor: "Lenis Engine / Floating Dock",
          description: "Lenis smooth scroll synchronizes with floating dock navigation pills, updating active section indicators.",
        },
        {
          stepNumber: "03",
          title: "Keyboard-First Command Palette (⌘K)",
          actor: "CommandPalette Component",
          description: "Visitor presses ⌘K or Ctrl+K to jump immediately to projects, LeetCode stats, or contact channels.",
        },
        {
          stepNumber: "04",
          title: "In-Depth Case Study Exploration",
          actor: "CaseStudyWorkspace Overlay",
          description: "Clicking 'Explore Case Study' opens a full-screen technical workspace with four tabs without page reload.",
        },
      ],
      keyHighlights: [
        "Next.js 14 App Router with React 18 client and server optimization",
        "Custom motion engine with calibrated springs and reduced-motion fallback",
        "Command Palette with strict keyboard focus trapping and ARIA attributes",
        "Live LeetCode GraphQL stats integration with edge caching",
        "Lenis smooth scroll integration with modal scroll lock coordination",
      ],
      architecture: {
        summary:
          "Built on Next.js 14 with a layered architecture uniting presentation components, motion utilities, and serverless API endpoints.",
        diagramType: "harshitos",
        frontend: {
          framework: "Next.js 14 App Router with TypeScript",
          details: [
            "Strict TypeScript configuration with zero type assertions",
            "Tailwind CSS custom design system with dark palette and editorial typography",
            "GSAP card fan carousel with responsive viewport math and mouse physics",
            "Lucide React iconography and accessible HTML5 semantics",
          ],
        },
        backend: {
          runtime: "Next.js Route Handlers (Edge / Node.js)",
          details: [
            "Serverless route /api/leetcode proxying queries to leetcode.com/graphql",
            "CORS and caching headers for high-speed delivery",
          ],
          endpoints: [
            { method: "GET", path: "/api/leetcode", description: "Fetch real-time solved counts and ranking telemetry" },
          ],
        },
        dataLayer: {
          storage: "In-memory structured data models and external GraphQL API",
          details: [
            "Type-safe projectsData.ts containing comprehensive case studies",
            "tech-stack-data.ts categorizing languages, frameworks, and tools",
          ],
        },
        integrations: [
          {
            name: "LeetCode GraphQL API",
            purpose: "Real-time algorithmic statistics and submission metrics",
            details: "Proxied through Next.js route handlers with in-memory response caching.",
          },
          {
            name: "Lenis Smooth Scroll",
            purpose: "Hardware-accelerated viewport inertia scrolling",
            details: "Coordinated with modal open/close lifecycles to prevent background scroll leakage.",
          },
        ],
      },
      techCategories: [
        {
          category: "Framework & Language",
          items: ["Next.js 14", "React 18", "TypeScript", "Node.js"],
        },
        {
          category: "Styling & Motion",
          items: ["Tailwind CSS", "Framer Motion", "GSAP 3", "Lenis", "Lucide React"],
        },
        {
          category: "Architecture & Data",
          items: ["App Router", "GraphQL API Proxy", "ESLint", "PostCSS"],
        },
      ],
      contributions: {
        role: "Frontend Engineer & UI/UX Designer",
        collaboration: "Individual personal portfolio engineered from design concept to production deployment.",
        keyDeliverables: [
          "Designed and coded the entire portfolio interface without third-party UI component templates",
          "Engineered the GSAP mathematical fan carousel and 3D card tilt physics",
          "Implemented the Command Palette with focus trapping and keyboard shortcuts",
          "Built the reusable four-tab interactive Case Study workspace system",
        ],
      },
      featureGroups: [
        {
          groupTitle: "Interactive Systems",
          features: [
            {
              name: "Terminal Boot Protocol",
              description: "Simulates operating system initialization sequence with reduced motion respect.",
              status: "production",
            },
            {
              name: "Command Palette (⌘K)",
              description: "Accessible search dialog for instantaneous section jumping and external links.",
              status: "production",
            },
            {
              name: "Spatial Card Fan",
              description: "Responsive 3D fan layout with dynamic cursor spotlight and neighbor card displacement.",
              status: "production",
            },
          ],
        },
        {
          groupTitle: "Performance & Accessibility",
          features: [
            {
              name: "Lenis Modal Scroll Locking",
              description: "Stops background inertia scroll when overlays mount and restores position on close.",
              status: "production",
            },
            {
              name: "Reduced Motion Support",
              description: "Complete fallback disabling rotations and spring animations when prefers-reduced-motion is active.",
              status: "production",
            },
          ],
        },
      ],
      challenges: [
        {
          title: "GSAP & React 18 Concurrent Rendering",
          problem: "GSAP direct DOM mutations can conflict with React 18 reconciliation during rapid resizing.",
          solution: "Encapsulated GSAP tweens in scoped refs with clean teardown handlers and requestAnimationFrame debouncing.",
          compromiseOrLesson: "Direct DOM animation requires careful lifecycle management inside useEffect hooks.",
        },
      ],
      currentLimitations: [
        {
          area: "Theme Customization",
          limitation: "The portfolio is currently locked to a dark editorial theme; light mode is intentionally disabled.",
          reason: "Preserves high-contrast cybernetic aesthetic tailored for night viewing.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "Full-Screen Interactive Case Studies",
          description: "Deliver a 4-tab technical case study workspace for every showcased project.",
          status: "in_progress",
        },
      ],
    },
  },
  {
    id: "mindlens",
    title: "MindLens",
    tagline: "AI Student Wellbeing Analyzer & Burnout Predictor",
    description:
      "An AI-powered student mental health analytics platform combining sentiment classification, emotional state detection, and predictive burnout risk scoring with an interactive Streamlit telemetry dashboard.",
    problem:
      "University students frequently experience progressive burnout and psychological distress without accessible, early self-diagnostic indicators or structured wellbeing monitoring.",
    architecture:
      "Python-driven data pipeline integrating TensorFlow NLP sentiment classifiers, pandas data normalization, and an interactive Streamlit visualization dashboard.",
    features: [
      "Natural Language Processing pipeline for self-reported sentiment classification",
      "Multi-dimensional mood detection and burnout trend scoring",
      "Interactive Streamlit dashboard displaying historical wellbeing trajectories",
      "Privacy-first local analysis preserving student confidentiality",
    ],
    challenges:
      "Fine-tuning NLP sentiment classification models to accurately capture subtle emotional cues and academic stressors without producing false alarms.",
    lessons:
      "Effective health AI applications require accessible visual feedback; pairing TensorFlow with Streamlit enabled rapid validation of actionable insights.",
    tech: ["Python", "TensorFlow", "NLP", "Streamlit", "Pandas", "Scikit-Learn"],
    accentHue: 160,
    githubUrl: "https://github.com/Harshitsaxena14",
    caseStudy: {
      badge: "AI WELLBEING ANALYZER",
      category: "Mental Health Analytics & NLP",
      summary:
        "MindLens analyzes self-reported student journal entries and academic logs to identify emerging stress patterns and burnout trajectories before they escalate into acute distress.",
      targetAudience:
        "Higher-education students, academic counselors, and campus wellness initiatives seeking proactive mental health indicators.",
      problemStatement: {
        headline: "The Unobserved Epidemic of Student Burnout",
        context:
          "Academic pressure and competitive exams lead to unaddressed mental strain that traditional counseling centers only detect after crisis points occur.",
        coreFrictions: [
          "Delayed Intervention: Students rarely seek help until academic performance or physical health has severely deteriorated.",
          "Self-Reporting Friction: Clinical questionnaires (PHQ-9, GAD-7) feel intimidating and clinical, deterring frequent self-monitoring.",
          "Data Privacy Concerns: Reluctance to share mental health struggles with institutional authorities without verifiable privacy.",
        ],
      },
      solution: {
        headline: "Low-Friction Natural Language Emotion Telemetry",
        summary:
          "MindLens allows students to submit unstructured journal reflections, analyzing linguistic sentiment markers to produce objective burnout indices.",
        components: [
          {
            title: "TensorFlow Sentiment Pipeline",
            description: "Tokenizes and classifies textual reflections into valence, arousal, and cognitive load scores.",
          },
          {
            title: "Burnout Risk Scoring Model",
            description: "Algorithmic composite score weighting mood trajectory over 7-day and 30-day moving windows.",
          },
          {
            title: "Streamlit Insights Dashboard",
            description: "Visual charts displaying emotional trends, stress peaks, and personalized recovery recommendations.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Reflective Entry Submission",
          actor: "Student / Streamlit UI",
          description: "Student enters a brief free-form daily reflection regarding academic workload and energy levels.",
        },
        {
          stepNumber: "02",
          title: "Tokenization & Linguistic Processing",
          actor: "TensorFlow NLP Pipeline",
          description: "Text is cleaned, lemmatized, and passed through trained embedding layers to quantify affective sentiment.",
        },
        {
          stepNumber: "03",
          title: "Burnout Trajectory Assessment",
          actor: "Predictive Analytics Engine",
          description: "Current sentiment is aggregated against previous entries to compute risk velocity and flag sudden dips.",
        },
        {
          stepNumber: "04",
          title: "Actionable Telemetry Presentation",
          actor: "Interactive Visualizer",
          description: "Dashboard updates with trend graphs, highlighting burnout alerts and suggesting targeted decompression breaks.",
        },
      ],
      keyHighlights: [
        "TensorFlow NLP pipeline trained on emotional reflection corpora",
        "Continuous burnout velocity scoring over rolling time windows",
        "Streamlit interactive dashboard with zero client data leakage",
        "Configured for local and hosted academic deployment",
      ],
      architecture: {
        summary: "Lightweight Python architecture combining NLP feature extraction with an immediate interactive dashboard.",
        diagramType: "ml_pipeline",
        frontend: {
          framework: "Streamlit Interactive Application",
          details: ["Dynamic data widgets, reactive charts, and summary KPI cards."],
        },
        backend: {
          runtime: "Python 3.10 Runtime with TensorFlow 2.x",
          details: ["Modular data preprocessing, tokenization pipeline, and model inference services."],
        },
        dataLayer: {
          storage: "Pandas DataFrames and local serialized SQLite logs",
          details: ["Time-series sentiment logs indexed by anonymous student session identifiers."],
        },
        integrations: [
          {
            name: "TensorFlow / Keras",
            purpose: "Neural sentiment classification model inference",
            details: "Evaluates tokenized textual inputs to output emotional valence scores.",
          },
        ],
      },
      techCategories: [
        { category: "Machine Learning & NLP", items: ["Python", "TensorFlow", "Keras", "NLTK", "Scikit-Learn"] },
        { category: "Data & UI", items: ["Streamlit", "Pandas", "NumPy", "Matplotlib"] },
      ],
      contributions: {
        role: "ML Engineer & Application Developer",
        collaboration: "Individual academic research and prototype implementation.",
        keyDeliverables: [
          "Developed data preprocessing and tokenization scripts for emotional reflection text",
          "Trained sentiment classification model in TensorFlow",
          "Built the Streamlit dashboard interface for real-time visualization",
        ],
      },
      featureGroups: [
        {
          groupTitle: "NLP & Predictive Analytics",
          features: [
            {
              name: "Sentiment Valence Classifier",
              description: "Detects emotional polarity and stress markers in unstructured text.",
              status: "functional",
            },
            {
              name: "Burnout Scoring Model",
              description: "Calculates rolling burnout risk index based on consecutive negative trajectory markers.",
              status: "functional",
            },
          ],
        },
      ],
      challenges: [
        {
          title: "Subtle Sentiment Ambiguity",
          problem: "Students frequently use sarcastic or understated language when describing stress.",
          solution: "Integrated contextual n-gram tokens and fine-tuned word embeddings to capture academic vernacular.",
          compromiseOrLesson: "Domain-specific text requires customized vocabulary mappings rather than generic sentiment lexicons.",
        },
      ],
      currentLimitations: [
        {
          area: "Platform Integration",
          limitation: "Currently operates as a standalone Streamlit web app rather than a mobile notification widget.",
          reason: "Prototype focused on ML model accuracy before cross-platform client development.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "Mobile Push Notification Companion",
          description: "Deliver daily micro-checkins directly via push notifications.",
          status: "proposed",
        },
      ],
    },
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Medicine Inventory Management Platform (In Progress)",
    description:
      "A healthcare inventory management web application. Emergency Mode assists hospitals in discovering nearby pharmacies with verified stock of critical medicines in real time.",
    problem:
      "During critical medical emergencies, hospitals and caregivers struggle to rapidly identify which nearby retail or hospital pharmacies currently hold urgent, life-saving medicines.",
    architecture:
      "Web application architecture backed by a PostgreSQL relational database. Emergency procurement module matches inventory queries against geospatial pharmacy records.",
    features: [
      "Real-time healthcare inventory management and batch tracking",
      "Emergency Mode for instant nearby pharmacy medicine discovery",
      "Streamlined hospital procurement workflow and requisition logs",
      "Relational database schema for medicine stock and expiry tracking",
    ],
    challenges:
      "Designing an efficient query pattern for rapid emergency lookup across multi-tenant pharmacy inventory databases with low latency.",
    lessons:
      "High-availability data design is critical in healthcare tech. Clear data modeling reduces latency when seconds matter.",
    tech: ["Python", "PostgreSQL", "Web Development", "Databases", "Geolocation API"],
    accentHue: 200,
    githubUrl: "https://github.com/Harshitsaxena14",
    caseStudy: {
      badge: "HEALTHCARE LOGISTICS // IN PROGRESS",
      category: "Healthcare Logistics & Geolocation Procurement",
      summary:
        "MediFlow bridges the critical information gap between hospital intensive care units and local pharmaceutical distributors during urgent prescription emergencies.",
      targetAudience:
        "Hospital procurement staff, ICU nurses, emergency caregivers, and participating pharmacy networks.",
      problemStatement: {
        headline: "The Time-Critical Medicine Procurement Gap",
        context:
          "In emergency trauma or rare medication cases, hospitals frequently run out of specialized drugs with zero automated visibility into regional inventory.",
        coreFrictions: [
          "Manual Phone Tree Delays: Hospital staff must manually call multiple retail pharmacies to locate urgent medicines.",
          "Stock Discrepancies: Inaccurate inventory databases leading to wasted transit time during critical medical windows.",
          "Lack of Emergency Routing: No coordinated logistical routing between available supply points and treating clinics.",
        ],
      },
      solution: {
        headline: "Geospatial Inventory Matching for Emergency Care",
        summary:
          "An interconnected pharmacy network database allowing emergency staff to query drug availability within radius boundaries.",
        components: [
          {
            title: "Emergency Discovery Engine",
            description: "Matches active medication requests against regional pharmacy inventories sorted by drive time.",
          },
          {
            title: "Hospital Inventory Module",
            description: "Tracks internal hospital pharmacy stock levels, minimum thresholds, and expiry dates.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Emergency Requisition Triggered",
          actor: "Hospital ICU Staff",
          description: "Staff initiates an Emergency Requisition specifying medicine name, dosage, and required quantity.",
        },
        {
          stepNumber: "02",
          title: "Geospatial Radius Query",
          actor: "MediFlow Procurement Engine",
          description: "PostgreSQL queries local pharmacy stock tables within a configurable kilometer perimeter.",
        },
        {
          stepNumber: "03",
          title: "Stock Verification & Reservation",
          actor: "Participating Pharmacy Network",
          description: "Target pharmacy receives instant alert and confirms reservation of required medicine vials.",
        },
        {
          stepNumber: "04",
          title: "Dispatch & Fulfillment Tracking",
          actor: "Logistics Dispatcher",
          description: "Dispatch courier collects reserved units and updates delivery ETA in the hospital dashboard.",
        },
      ],
      keyHighlights: [
        "PostgreSQL relational schema optimized for emergency stock queries",
        "Geospatial distance sorting for rapid emergency transit",
        "Automated low-stock threshold alerting for hospital dispensaries",
      ],
      architecture: {
        summary: "Relational database architecture backed by PostgreSQL with geospatial indexing.",
        diagramType: "geospatial",
        frontend: {
          framework: "Responsive Web Interface",
          details: ["Clean emergency interface with high-contrast alert indicators."],
        },
        backend: {
          runtime: "Python Web Framework",
          details: ["RESTful API handling inventory CRUD and emergency dispatch queries."],
        },
        dataLayer: {
          storage: "PostgreSQL Relational Database",
          details: ["Normalized schemas for Pharmacies, Inventory, Medicine Catalog, and Requisitions."],
        },
        integrations: [
          {
            name: "Geolocation API",
            purpose: "Pharmacy proximity calculations and transit time estimation",
            details: "Calculates bounding box distances between hospital coordinates and pharmacy addresses.",
          },
        ],
      },
      techCategories: [
        { category: "Backend & Database", items: ["Python", "PostgreSQL", "SQLAlchemy", "REST APIs"] },
        { category: "Tools & Logistics", items: ["Geolocation API", "Docker", "Git"] },
      ],
      contributions: {
        role: "Backend Architect & Database Designer",
        collaboration: "Independent development project currently in active prototyping.",
        keyDeliverables: [
          "Designed relational schema for multi-tenant pharmacy inventory tracking",
          "Engineered emergency radius query algorithm in PostgreSQL",
        ],
      },
      featureGroups: [
        {
          groupTitle: "Inventory & Emergency Routing",
          features: [
            {
              name: "Emergency Mode Search",
              description: "Rapid lookup of critical medicines sorted by physical pharmacy distance.",
              status: "in_progress",
            },
            {
              name: "Stock Expiry Tracking",
              description: "Automated alerts for batches approaching expiration dates.",
              status: "in_progress",
            },
          ],
        },
      ],
      challenges: [
        {
          title: "Real-Time Stock Synchronization",
          problem: "Retail pharmacies sell stock in-store without immediate point-of-sale API synchronization.",
          solution: "Designed safety buffers and mandatory reservation confirmations before dispatch.",
          compromiseOrLesson: "Healthcare logistics must account for offline retail inventory lag.",
        },
      ],
      currentLimitations: [
        {
          area: "Deployment Status",
          limitation: "Application is in active development with prototype database seed records.",
          reason: "Partnership integration with real pharmacy management software is pending legal compliance review.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "Complete Core Procurement APIs",
          description: "Finalize reservation verification and courier tracking endpoints.",
          status: "in_progress",
        },
      ],
    },
  },
  {
    id: "fashion-mnist",
    title: "Fashion-MNIST Image Classifier",
    tagline: "Convolutional Neural Network Deep Learning Model",
    description:
      "A Convolutional Neural Network (CNN) computer vision model engineered with TensorFlow and Keras, achieving 86% classification accuracy in 5 training epochs with rigorous tensor preprocessing.",
    problem:
      "Demonstrating foundational deep learning mechanics: preventing overfitting on grayscale image arrays while optimizing convolutional filter weights under constrained training epoch budgets.",
    architecture:
      "Multi-layer Convolutional Neural Network built with TensorFlow/Keras, incorporating Conv2D feature extractors, MaxPooling2D spatial dimensionality reduction, Dropout regularization, and Softmax output classification.",
    features: [
      "Convolutional feature extraction pipeline engineered in TensorFlow",
      "86% classification accuracy achieved across 10 fashion item classes in 5 epochs",
      "Image normalization and tensor preprocessing pipeline",
      "Evaluation metrics: confusion matrices, loss curves, and precision-recall scoring",
    ],
    challenges:
      "Balancing model depth against rapid overfitting on 28x28 grayscale matrices within an aggressive 5-epoch training constraint.",
    lessons:
      "Data preprocessing, batch normalization, and dropout placement directly govern neural network convergence speed more than pure layer depth.",
    tech: ["Python", "TensorFlow", "Keras", "CNN", "NumPy", "Matplotlib"],
    accentHue: 270,
    githubUrl: "https://github.com/Harshitsaxena14",
    caseStudy: {
      badge: "DEEP LEARNING // CNN MODEL",
      category: "Computer Vision & Deep Learning",
      summary:
        "Demonstrates computer vision fundamentals through an optimized Convolutional Neural Network classifying fashion articles into 10 distinct apparel categories with high computational efficiency.",
      targetAudience:
        "Machine learning practitioners, computer vision researchers, and engineers evaluating neural network architecture design.",
      problemStatement: {
        headline: "Efficient Feature Extraction from Grayscale Spatial Matrices",
        context:
          "Fashion-MNIST replaces standard digit MNIST with complex clothing silhouettes (shirts, pullovers, coats, ankle boots) possessing subtle spatial boundaries.",
        coreFrictions: [
          "Intra-Class Variance: Coats, pullovers, and shirts share highly similar pixel outlines, challenging simple dense layers.",
          "Compute Constraint: Achieving high validation accuracy within a minimal 5-epoch training ceiling.",
          "Overfitting Risk: Small 28x28 pixel resolutions easily induce memorization rather than generalized feature learning.",
        ],
      },
      solution: {
        headline: "Hierarchical Convolutional Layering with Regularization",
        summary:
          "Engineered a sequential CNN extracting low-level edges and high-level shape geometries before dense classification.",
        components: [
          {
            title: "Conv2D & Pooling Stack",
            description: "Feature extraction layers learning spatial filters with max pooling for translation invariance.",
          },
          {
            title: "Dropout Regularization",
            description: "Randomly deactivates neuron activations to prevent co-adaptation on training images.",
          },
          {
            title: "Softmax Classification Head",
            description: "Computes calibrated probability distributions across 10 distinct clothing categories.",
          },
        ],
      },
      workflow: [
        {
          stepNumber: "01",
          title: "Tensor Loading & Normalization",
          actor: "Data Pipeline",
          description: "Pixel values scaled from [0, 255] to [0.0, 1.0] and reshaped into 4D tensor batches.",
        },
        {
          stepNumber: "02",
          title: "Convolutional Filter Extraction",
          actor: "Conv2D Layer Stack",
          description: "Learned 3x3 kernels sweep over images to detect edges, textures, and apparel collar shapes.",
        },
        {
          stepNumber: "03",
          title: "Dense Dimensionality Reduction",
          actor: "Flatten & Dense Layers",
          description: "Feature maps flattened into dense representations with Dropout regularization.",
        },
        {
          stepNumber: "04",
          title: "Probability Scoring & Validation",
          actor: "Softmax Output",
          description: "Generates prediction probabilities and calculates categorical cross-entropy loss against ground truth.",
        },
      ],
      keyHighlights: [
        "86% test accuracy achieved in 5 epochs",
        "Rigorous data normalization and tensor dimension validation",
        "Confusion matrix generation identifying inter-class misclassification rates",
      ],
      architecture: {
        summary: "Sequential Convolutional Neural Network architecture built with TensorFlow/Keras.",
        diagramType: "ml_pipeline",
        frontend: {
          framework: "Jupyter & Visualization Suite",
          details: ["Matplotlib visualization plots and confusion matrix heatmaps."],
        },
        backend: {
          runtime: "Python 3.10 with TensorFlow 2.x & Keras",
          details: ["Sequential model pipeline with Adam optimizer and Sparse Categorical Crossentropy loss."],
        },
        dataLayer: {
          storage: "Fashion-MNIST 70,000 image dataset (60k train / 10k test)",
          details: ["Standardized 28x28 grayscale images across 10 categories."],
        },
        integrations: [
          {
            name: "TensorFlow / Keras",
            purpose: "Deep learning model definition, compilation, and training",
            details: "Sequential API with Conv2D, MaxPooling2D, Flatten, Dense, and Dropout.",
          },
        ],
      },
      techCategories: [
        { category: "Deep Learning & AI", items: ["Python", "TensorFlow", "Keras", "CNN"] },
        { category: "Math & Visualization", items: ["NumPy", "Matplotlib", "Scikit-Learn"] },
      ],
      contributions: {
        role: "Deep Learning Engineer",
        collaboration: "Independent machine learning implementation.",
        keyDeliverables: [
          "Engineered CNN model architecture and hyperparameter tuning in Keras",
          "Achieved 86% validation accuracy within 5 training epochs",
          "Generated comprehensive performance visualizations and classification reports",
        ],
      },
      featureGroups: [
        {
          groupTitle: "Model Architecture & Training",
          features: [
            {
              name: "Hierarchical Conv2D Filtering",
              description: "Extracts edge and pattern features from 28x28 clothing tensors.",
              status: "production",
            },
            {
              name: "Dropout Regularization",
              description: "Prevents overfitting on repetitive training patterns.",
              status: "production",
            },
          ],
        },
      ],
      challenges: [
        {
          title: "Distinguishing Visually Overlapping Apparel",
          problem: "Pullovers, coats, and shirts possess overlapping silhouette boundaries.",
          solution: "Added localized max pooling layers and adjusted learning rates to sharpen fine-grained feature boundaries.",
          compromiseOrLesson: "Fine-grained visual categorization requires hierarchical receptive fields.",
        },
      ],
      currentLimitations: [
        {
          area: "Inference Deployment",
          limitation: "Model is validated in Python research environment; web browser ONNX/TensorFlow.js export is pending.",
          reason: "Initial project milestone focused on training optimization and benchmark accuracy.",
        },
      ],
      roadmap: [
        {
          priority: "P0",
          title: "TensorFlow.js Web Camera Inference",
          description: "Export model weights to TensorFlow.js for client-side webcam apparel detection.",
          status: "proposed",
        },
      ],
    },
  },
];
