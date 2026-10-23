import { API_CONFIG } from '../config/api';

export interface AICompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  stream?: boolean;
}

export interface AICompletionResponse {
  text: string;
  model: string;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  latency: number;
  provider: 'openai' | 'anthropic' | 'mock';
}

export interface AIServiceError extends Error {
  code: string;
  statusCode?: number;
  provider?: string;
}

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
  // Remove potential script tags and dangerous patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// OpenAI API Integration
async function callOpenAI(
  prompt: string,
  options: AICompletionOptions = {}
): Promise<AICompletionResponse> {
  const startTime = Date.now();
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || API_CONFIG.OPENAI_MODEL,
      messages: [
        ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
        { role: 'user', content: sanitizeInput(prompt) }
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
    }),
  });

  if (!response.ok) {
    const error = new Error(`OpenAI API error: ${response.statusText}`) as AIServiceError;
    error.code = 'OPENAI_API_ERROR';
    error.statusCode = response.status;
    error.provider = 'openai';
    throw error;
  }

  const data = await response.json();
  const latency = Date.now() - startTime;

  return {
    text: data.choices[0]?.message?.content || '',
    model: data.model,
    tokens: {
      prompt: data.usage?.prompt_tokens || 0,
      completion: data.usage?.completion_tokens || 0,
      total: data.usage?.total_tokens || 0,
    },
    latency,
    provider: 'openai',
  };
}

// Anthropic API Integration
async function callAnthropic(
  prompt: string,
  options: AICompletionOptions = {}
): Promise<AICompletionResponse> {
  const startTime = Date.now();
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_CONFIG.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: options.model || API_CONFIG.ANTHROPIC_MODEL,
      messages: [{ role: 'user', content: sanitizeInput(prompt) }],
      system: options.systemPrompt,
      max_tokens: options.maxTokens ?? 1000,
      temperature: options.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const error = new Error(`Anthropic API error: ${response.statusText}`) as AIServiceError;
    error.code = 'ANTHROPIC_API_ERROR';
    error.statusCode = response.status;
    error.provider = 'anthropic';
    throw error;
  }

  const data = await response.json();
  const latency = Date.now() - startTime;

  return {
    text: data.content[0]?.text || '',
    model: data.model,
    tokens: {
      prompt: data.usage?.input_tokens || 0,
      completion: data.usage?.output_tokens || 0,
      total: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    },
    latency,
    provider: 'anthropic',
  };
}

// Mock implementation for development/demo
async function callMockAI(
  prompt: string,
  options: AICompletionOptions = {}
): Promise<AICompletionResponse> {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
  
  return {
    text: `[Mock AI Response] Processed: "${prompt.slice(0, 100)}..."`,
    model: 'mock-model',
    tokens: { prompt: 10, completion: 20, total: 30 },
    latency: 500,
    provider: 'mock',
  };
}

// Main AI service with fallback logic
export async function generateCompletion(
  prompt: string,
  options: AICompletionOptions = {}
): Promise<AICompletionResponse> {
  // Sanitize input
  const sanitizedPrompt = sanitizeInput(prompt);
  
  if (!sanitizedPrompt.trim()) {
    throw new Error('Prompt cannot be empty');
  }

  // Check if real AI is enabled
  if (!API_CONFIG.ENABLE_REAL_AI) {
    return callMockAI(sanitizedPrompt, options);
  }

  // Try OpenAI first if configured
  if (API_CONFIG.OPENAI_API_KEY) {
    try {
      return await callOpenAI(sanitizedPrompt, options);
    } catch (error) {
      console.error('OpenAI failed, trying fallback:', error);
    }
  }

  // Try Anthropic if configured
  if (API_CONFIG.ANTHROPIC_API_KEY) {
    try {
      return await callAnthropic(sanitizedPrompt, options);
    } catch (error) {
      console.error('Anthropic failed, using mock:', error);
    }
  }

  // Fallback to mock
  console.warn('No AI providers available, using mock');
  return callMockAI(sanitizedPrompt, options);
}

// Ghost text completion for editor
export async function generateGhostText(
  context: string,
  cursorPosition: number
): Promise<string | null> {
  const textBeforeCursor = context.slice(0, cursorPosition);
  const lastLine = textBeforeCursor.split('\n').pop() || '';
  
  if (lastLine.length < 3) return null;

  try {
    const response = await generateCompletion(
      `Continue this text naturally. Only provide the continuation, no explanations:\n\n"${lastLine}"`,
      {
        temperature: 0.8,
        maxTokens: 100,
        systemPrompt: 'You are a helpful writing assistant. Provide natural text continuations.',
      }
    );
    
    return response.text.trim();
  } catch (error) {
    console.error('Ghost text generation failed:', error);
    return null;
  }
}

// Intent analysis for RAY-Evals
export async function analyzeIntent(prompt: string): Promise<{
  intent: string;
  confidence: number;
  keywords: string[];
}> {
  try {
    const response = await generateCompletion(
      `Analyze this prompt and identify:
1. The primary intent (e.g., "api_development", "database_query", "frontend_component", "security_implementation", "devops_deployment")
2. Key technical keywords
3. Confidence level (0-1)

Prompt: "${prompt}"

Respond in JSON format:
{
  "intent": "category",
  "confidence": 0.95,
  "keywords": ["keyword1", "keyword2"]
}`,
      {
        temperature: 0.3,
        maxTokens: 200,
      }
    );

    // Parse JSON response
    const jsonMatch = response.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        intent: parsed.intent || 'general',
        confidence: parsed.confidence || 0.5,
        keywords: parsed.keywords || [],
      };
    }
  } catch (error) {
    console.error('Intent analysis failed:', error);
  }

  // Fallback to keyword-based analysis
  const lower = prompt.toLowerCase();
  const keywords: string[] = [];
  let intent = 'general';

  if (lower.includes('api') || lower.includes('endpoint')) {
    intent = 'api_development';
    keywords.push('api', 'endpoint');
  } else if (lower.includes('database') || lower.includes('sql')) {
    intent = 'database_query';
    keywords.push('database', 'sql');
  } else if (lower.includes('component') || lower.includes('react')) {
    intent = 'frontend_component';
    keywords.push('component', 'react');
  } else if (lower.includes('auth') || lower.includes('security')) {
    intent = 'security_implementation';
    keywords.push('auth', 'security');
  }

  return { intent, confidence: 0.6, keywords };
}

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(userId: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(userId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Audit logging
export interface AuditLog {
  timestamp: number;
  userId: string;
  action: string;
  details: Record<string, any>;
  success: boolean;
}

const auditLogs: AuditLog[] = [];

export function logAudit(entry: Omit<AuditLog, 'timestamp'>): void {
  const log: AuditLog = {
    ...entry,
    timestamp: Date.now(),
  };
  
  auditLogs.push(log);
  
  // Keep only last 1000 logs in memory
  if (auditLogs.length > 1000) {
    auditLogs.shift();
  }
  
  // In production, send to backend
  if (API_CONFIG.ENABLE_ANALYTICS) {
    // TODO: Send to analytics backend
    console.log('Audit log:', log);
  }
}

export function getAuditLogs(userId?: string): AuditLog[] {
  if (userId) {
    return auditLogs.filter(log => log.userId === userId);
  }
  return [...auditLogs];
}
