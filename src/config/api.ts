// API Configuration
// Users must set these environment variables in their deployment

export const API_CONFIG = {
  // OpenAI API
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_MODEL: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
  
  // Anthropic API
  ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  ANTHROPIC_MODEL: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
  
  // Backend API (if using separate backend)
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  
  // Feature flags
  ENABLE_REAL_AI: import.meta.env.VITE_ENABLE_REAL_AI === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
} as const;

// Validation
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (API_CONFIG.ENABLE_REAL_AI) {
    if (!API_CONFIG.OPENAI_API_KEY && !API_CONFIG.ANTHROPIC_API_KEY) {
      errors.push('At least one AI API key (OpenAI or Anthropic) must be configured');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
