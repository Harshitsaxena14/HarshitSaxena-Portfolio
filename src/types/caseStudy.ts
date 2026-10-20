export interface WorkflowStep {
  stepNumber: string;
  title: string;
  actor: string;
  description: string;
}

export interface ProblemStatement {
  headline: string;
  context: string;
  coreFrictions: string[];
  technicalConstraints?: string;
}

export interface SolutionComponent {
  title: string;
  description: string;
}

export interface ProjectSolution {
  headline: string;
  summary: string;
  components: SolutionComponent[];
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  path: string;
  description: string;
}

export interface SubsystemDetail {
  title: string;
  details: string[];
}

export interface IntegrationDetail {
  name: string;
  purpose: string;
  details: string;
}

export interface ArchitectureInfo {
  summary: string;
  diagramType: "codement" | "sahayak" | "harshitos" | "ml_pipeline" | "geospatial";
  frontend: {
    framework: string;
    details: string[];
  };
  backend: {
    runtime: string;
    details: string[];
    endpoints?: ApiEndpoint[];
  };
  dataLayer: {
    storage: string;
    details: string[];
  };
  integrations: IntegrationDetail[];
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface ImplementedFeature {
  name: string;
  description: string;
  implementationDetail?: string;
  status: "production" | "functional" | "prototype" | "in_progress";
}

export interface FeatureGroup {
  groupTitle: string;
  badge?: string;
  features: ImplementedFeature[];
}

export interface VisualAsset {
  type: "image" | "diagram";
  src?: string;
  title: string;
  caption: string;
  attribution?: string;
}

export interface EngineeringChallenge {
  title: string;
  problem: string;
  solution: string;
  compromiseOrLesson: string;
}

export interface CurrentLimitation {
  area: string;
  limitation: string;
  reason: string;
}

export interface RoadmapItem {
  priority: "P0" | "P1" | "P2";
  title: string;
  description: string;
  status: "planned" | "in_progress" | "proposed";
}

export interface CaseStudyData {
  badge?: string;
  category: string;
  summary: string;
  targetAudience: string;
  problemStatement: ProblemStatement;
  solution: ProjectSolution;
  workflow: WorkflowStep[];
  keyHighlights: string[];
  architecture: ArchitectureInfo;
  techCategories: TechCategory[];
  contributions: {
    role: string;
    collaboration: string;
    keyDeliverables: string[];
  };
  featureGroups: FeatureGroup[];
  visualAssets?: VisualAsset[];
  challenges: EngineeringChallenge[];
  currentLimitations: CurrentLimitation[];
  roadmap: RoadmapItem[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: string;
  features: string[];
  challenges: string;
  lessons: string;
  tech: string[];
  accentHue: number;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  previewImage?: string;
  logoSvg?: string;
  verifiedModules?: { label: string; detail: string }[];
  caseStudy: CaseStudyData;
}
