import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Code2,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  FolderOpen,
  ArrowLeft,
} from 'lucide-react';
import { useNotepad } from '../store';
import { getFileType } from '../utils/converter';

interface FileExplorerProps {
  onBack: () => void;
  onOpenConverter: () => void;
}

export default function FileExplorer({ onBack, onOpenConverter }: FileExplorerProps) {
  const { state, dispatch } = useNotepad();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreateFile = () => {
    const name = `untitled-${Date.now().toString(36)}.md`;
    const newFile = {
      id: `file-${Date.now()}`,
      name,
      type: 'md' as const,
      content: '# New Document\n\nStart writing here...',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch({ type: 'CREATE_FILE', payload: newFile });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.files.length <= 1) return;
    dispatch({ type: 'DELETE_FILE', payload: id });
  };

  const startRename = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(id);
    setRenameValue(currentName);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      dispatch({ type: 'RENAME_FILE', payload: { id: renamingId, name: renameValue.trim() } });
    }
    setRenamingId(null);
  };

  const getFileIcon = (type: string) => {
    if (['json', 'yaml', 'html', 'jsonl'].includes(type)) {
      return <Code2 className="w-3.5 h-3.5 text-amber-400" />;
    }
    return <FileText className="w-3.5 h-3.5 text-purple-400" />;
  };

  return (
    <div className="w-64 h-full flex flex-col bg-zinc-950 border-r border-zinc-800/60">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ecosystem</span>
        </button>
        <button
          onClick={handleCreateFile}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
          title="New file"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Workspace label */}
      <div className="px-4 py-2.5 flex items-center gap-2">
        <FolderOpen className="w-3.5 h-3.5 text-zinc-500" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Workspace
        </span>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {state.files.map(file => (
          <motion.div
            key={file.id}
            layout
            onClick={() => dispatch({ type: 'SET_ACTIVE_FILE', payload: file.id })}
            className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all text-sm ${
              state.activeFileId === file.id
                ? 'bg-purple-600/20 text-white border border-purple-500/30'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
            }`}
          >
            {getFileIcon(file.type)}

            {renamingId === file.id ? (
              <div className="flex-1 flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') commitRename();
                    if (e.key === 'Escape') setRenamingId(null);
                  }}
                  className="flex-1 bg-zinc-800 text-xs text-white px-1.5 py-0.5 rounded border border-zinc-700 focus:outline-none focus:border-purple-500"
                  autoFocus
                />
                <button onClick={commitRename} className="p-0.5 text-emerald-400 hover:text-emerald-300">
                  <Check className="w-3 h-3" />
                </button>
                <button onClick={() => setRenamingId(null)} className="p-0.5 text-zinc-500 hover:text-zinc-300">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 truncate text-xs font-mono">{file.name}</span>
                <div className="hidden group-hover:flex items-center gap-0.5">
                  <button
                    onClick={(e) => startRename(file.id, file.name, e)}
                    className="p-1 rounded hover:bg-zinc-700 text-zinc-500 hover:text-white"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(file.id, e)}
                    className="p-1 rounded hover:bg-rose-900/50 text-zinc-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Converters section */}
      <div className="border-t border-zinc-800/60 px-2 py-2">
        <div className="px-2.5 py-1.5 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Converters
          </span>
        </div>
        <button
          onClick={onOpenConverter}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all border border-transparent hover:border-zinc-800"
        >
          <span className="text-base">📄</span>
          <span>Universal Converter</span>
        </button>
        <button
          onClick={onOpenConverter}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all border border-transparent hover:border-zinc-800"
        >
          <span className="text-base">🖼️</span>
          <span>Image → PDF</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-zinc-800/60">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
          <span>{state.files.length} files</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Synced
          </span>
        </div>
      </div>
    </div>
  );
}
