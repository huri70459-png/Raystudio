export interface Skill {
  id: string;
  name: string;
  version: string;
  domain: 'security' | 'database' | 'frontend' | 'compliance' | 'devops' | 'custom';
  keywords: string[];
  systemPromptAddition: string;
  fewShotExamples?: Array<{ input: string; output: string }>;
}

export interface CompilationStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  output?: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'coder' | 'security' | 'docs' | 'planner';
  status: 'idle' | 'running' | 'completed' | 'failed';
  output?: string;
}

export interface CompilationResult {
  rawPrompt: string;
  optimizedPrompt: string;
  matchedSkills: string[];
  agents: Agent[];
  stages: CompilationStage[];
  finalOutput: string;
  latency: number;
}
