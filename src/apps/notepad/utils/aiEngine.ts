// Real AI engine - uses aiService for actual OpenAI/Anthropic calls
import { generateCompletion as realGenerateCompletion, generateGhostText } from '../../../services/aiService';
import { logAudit } from '../../../services/aiService';

export interface CompletionResult {
  text: string;
  confidence: number;
  latency: number;
  provider: 'openai' | 'anthropic' | 'mock';
}

// Fallback templates when real AI is unavailable
const FALLBACK_TEMPLATES = [
  { trigger: 'function', completion: ' (params) {\n  // Implementation here\n  return result;\n}' },
  { trigger: 'const', completion: ' = useState(initialValue);' },
  { trigger: 'import', completion: " { useState } from 'react';" },
  { trigger: 'interface', completion: ' {\n  id: string;\n  name: string;\n  createdAt: Date;\n}' },
];

const FALLBACK_CONTEXTUAL = [
  ' and ensures optimal performance across all devices.',
  ' with built-in error handling and validation.',
  ' using modern best practices and industry standards.',
];

export async function generateCompletion(
  currentText: string,
  cursorPosition: number
): Promise<CompletionResult | null> {
  const startTime = Date.now();
  const textBeforeCursor = currentText.slice(0, cursorPosition);
  const lastLine = textBeforeCursor.split('\n').pop() || '';
  const lastWord = lastLine.split(/\s+/).pop() || '';

  if (lastLine.length < 3) return null;

  // Try real AI first
  try {
    const ghostText = await generateGhostText(currentText, cursorPosition);
    if (ghostText) {
      const latency = Date.now() - startTime;
      logAudit({
        userId: 'anonymous',
        action: 'ghost_text_generated',
        details: { latency, provider: 'real', length: ghostText.length },
        success: true,
      });
      return {
        text: ghostText,
        confidence: 0.9,
        latency,
        provider: 'openai', // or anthropic depending on which was used
      };
    }
  } catch (error) {
    console.warn('Real AI failed, using fallback:', error);
  }

  // Fallback to templates
  for (const template of FALLBACK_TEMPLATES) {
    if (lastLine.trim().startsWith(template.trigger) || lastWord === template.trigger) {
      return {
        text: template.completion,
        confidence: 0.7,
        latency: Date.now() - startTime,
        provider: 'mock',
      };
    }
  }

  if (lastWord.length > 3) {
    const randomCompletion = FALLBACK_CONTEXTUAL[
      Math.floor(Math.random() * FALLBACK_CONTEXTUAL.length)
    ];
    return {
      text: randomCompletion,
      confidence: 0.5,
      latency: Date.now() - startTime,
      provider: 'mock',
    };
  }

  return null;
}

export function acceptCompletion(
  currentText: string,
  cursorPosition: number,
  completion: string
): { newText: string; newCursorPosition: number } {
  const newText = currentText.slice(0, cursorPosition) + completion + currentText.slice(cursorPosition);
  const newCursorPosition = cursorPosition + completion.length;
  return { newText, newCursorPosition };
}
