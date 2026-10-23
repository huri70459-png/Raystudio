export interface NotepadFile {
  id: string;
  name: string;
  type: 'md' | 'json' | 'yaml' | 'html' | 'txt' | 'jsonl';
  content: string;
  createdAt: number;
  updatedAt: number;
  folder?: string;
}

export interface NotepadFolder {
  id: string;
  name: string;
  files: string[]; // file IDs
}

export type EditorMode = 'wysiwyg' | 'code' | 'split';

export interface AICompletion {
  text: string;
  confidence: number;
  timestamp: number;
}

export interface ConversionTarget {
  format: 'md' | 'pdf' | 'html' | 'json' | 'yaml';
  label: string;
  icon: string;
}
