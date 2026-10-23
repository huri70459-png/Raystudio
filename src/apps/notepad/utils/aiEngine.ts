// Mock AI engine for ghost-text completions
// In production, this would connect to OpenAI/Anthropic APIs

const COMPLETION_TEMPLATES = [
  { trigger: 'function', completion: ' (params) {\n  // Implementation here\n  return result;\n}' },
  { trigger: 'const', completion: ' = useState(initialValue);' },
  { trigger: 'import', completion: " { useState } from 'react';" },
  { trigger: 'interface', completion: ' {\n  id: string;\n  name: string;\n  createdAt: Date;\n}' },
  { trigger: '# ', completion: 'Project Overview\n\n## Goals\n- Build a robust system\n- Ensure scalability\n\n## Timeline\nPhase 1: Research' },
  { trigger: '- ', completion: 'Real-time auto-formatting\n- Context-aware suggestions\n- Multi-format document conversion' },
  { trigger: '```', completion: 'javascript\nconst data = {\n  status: "active",\n  tier: 1\n};\n```' },
  { trigger: 'The', completion: ' system architecture follows a modular design pattern, enabling seamless integration between components.' },
  { trigger: 'This', completion: ' implementation leverages modern web technologies to deliver a high-performance user experience.' },
  { trigger: 'We', completion: ' recommend using TypeScript for type safety and improved developer experience.' },
];

const CONTEXTUAL_COMPLETIONS = [
  ' and ensures optimal performance across all devices.',
  ' with built-in error handling and validation.',
  ' using modern best practices and industry standards.',
  ' while maintaining backward compatibility.',
  ' for enhanced security and data protection.',
];

export interface CompletionResult {
  text: string;
  confidence: number;
  latency: number;
}

export async function generateCompletion(
  currentText: string,
  cursorPosition: number
): Promise<CompletionResult | null> {
  // Simulate API latency (200-800ms)
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));

  const textBeforeCursor = currentText.slice(0, cursorPosition);
  const lastLine = textBeforeCursor.split('\n').pop() || '';
  const lastWord = lastLine.split(/\s+/).pop() || '';

  // Check for template matches
  for (const template of COMPLETION_TEMPLATES) {
    if (lastLine.trim().startsWith(template.trigger) || lastWord === template.trigger) {
      return {
        text: template.completion,
        confidence: 0.85 + Math.random() * 0.1,
        latency: 200 + Math.random() * 600,
      };
    }
  }

  // Contextual completion based on last word
  if (lastWord.length > 3) {
    const randomCompletion = CONTEXTUAL_COMPLETIONS[
      Math.floor(Math.random() * CONTEXTUAL_COMPLETIONS.length)
    ];
    return {
      text: randomCompletion,
      confidence: 0.6 + Math.random() * 0.2,
      latency: 200 + Math.random() * 600,
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
