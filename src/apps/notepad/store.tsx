import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { NotepadFile } from './types';

interface NotepadState {
  files: NotepadFile[];
  activeFileId: string | null;
  recentFiles: string[];
}

type NotepadAction =
  | { type: 'LOAD_STATE'; payload: NotepadState }
  | { type: 'CREATE_FILE'; payload: NotepadFile }
  | { type: 'UPDATE_FILE'; payload: { id: string; content: string } }
  | { type: 'DELETE_FILE'; payload: string }
  | { type: 'SET_ACTIVE_FILE'; payload: string }
  | { type: 'RENAME_FILE'; payload: { id: string; name: string } };

const STORAGE_KEY = 'notepad-files';

const defaultFiles: NotepadFile[] = [
  {
    id: 'welcome',
    name: 'welcome.md',
    type: 'md',
    content: `# Welcome to Smart Notepad

An AI-augmented writing environment with real-time completions and multi-format conversion.

## Features

- **Dual-Engine Editor**: Switch between rich text (Tiptap) and code (Monaco) modes
- **AI Ghost Text**: Press Tab to accept intelligent completions
- **Universal Converter**: Transform DOCX, PDF, images into editable formats
- **File Management**: Organize documents with folders and quick access

## Quick Start

1. Create a new file from the sidebar
2. Start typing — AI suggestions appear as ghost text
3. Press **Tab** to accept a suggestion
4. Use the toolbar to switch between Rich Text and Code modes
5. Drag & drop files to convert formats

## Keyboard Shortcuts

- \`Ctrl/Cmd + N\` — New file
- \`Ctrl/Cmd + S\` — Save
- \`Tab\` — Accept AI completion
- \`Ctrl/Cmd + /\` — Toggle editor mode

---

*Built with Tiptap, Monaco Editor, and AI-powered completions*`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'config-sample',
    name: 'config.json',
    type: 'json',
    content: `{
  "app": {
    "name": "Smart Notepad",
    "version": "2.0.0",
    "theme": "dark"
  },
  "editor": {
    "fontSize": 14,
    "tabSize": 2,
    "wordWrap": true,
    "minimap": false
  },
  "ai": {
    "enabled": true,
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 500
  }
}`,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'md',
    content: `# Project Documentation

## Overview

This project implements a modern web application with the following architecture:

\`\`\`
src/
├── components/    # Reusable UI components
├── utils/         # Helper functions
├── hooks/         # Custom React hooks
└── types/         # TypeScript definitions
\`\`\`

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## API Reference

### Authentication

All API requests require a Bearer token:

\`\`\`javascript
const response = await fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
`,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
  },
];

function loadState(): NotepadState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return {
    files: defaultFiles,
    activeFileId: 'welcome',
    recentFiles: ['welcome'],
  };
}

function saveState(state: NotepadState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function notepadReducer(state: NotepadState, action: NotepadAction): NotepadState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'CREATE_FILE':
      return {
        ...state,
        files: [...state.files, action.payload],
        activeFileId: action.payload.id,
        recentFiles: [action.payload.id, ...state.recentFiles.filter(id => id !== action.payload.id)].slice(0, 10),
      };

    case 'UPDATE_FILE':
      return {
        ...state,
        files: state.files.map(f =>
          f.id === action.payload.id
            ? { ...f, content: action.payload.content, updatedAt: Date.now() }
            : f
        ),
      };

    case 'DELETE_FILE':
      const newFiles = state.files.filter(f => f.id !== action.payload);
      const newActiveId = state.activeFileId === action.payload
        ? (newFiles[0]?.id || null)
        : state.activeFileId;
      return {
        ...state,
        files: newFiles,
        activeFileId: newActiveId,
        recentFiles: state.recentFiles.filter(id => id !== action.payload),
      };

    case 'SET_ACTIVE_FILE':
      return {
        ...state,
        activeFileId: action.payload,
        recentFiles: [action.payload, ...state.recentFiles.filter(id => id !== action.payload)].slice(0, 10),
      };

    case 'RENAME_FILE':
      return {
        ...state,
        files: state.files.map(f =>
          f.id === action.payload.id
            ? { ...f, name: action.payload.name, updatedAt: Date.now() }
            : f
        ),
      };

    default:
      return state;
  }
}

interface NotepadContextType {
  state: NotepadState;
  dispatch: React.Dispatch<NotepadAction>;
  activeFile: NotepadFile | null;
}

const NotepadContext = createContext<NotepadContextType | null>(null);

export function NotepadProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notepadReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeFile = state.files.find(f => f.id === state.activeFileId) || null;

  return (
    <NotepadContext.Provider value={{ state, dispatch, activeFile }}>
      {children}
    </NotepadContext.Provider>
  );
}

export function useNotepad() {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error('useNotepad must be used within NotepadProvider');
  }
  return context;
}
