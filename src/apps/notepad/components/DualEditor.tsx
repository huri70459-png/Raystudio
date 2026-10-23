import { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import {
  FileText,
  Code2,
  Columns,
  Sparkles,
  Copy,
  Check,
  Download,
  Zap,
} from 'lucide-react';
import { useNotepad } from '../store';
import { EditorMode } from '../types';
import { generateCompletion, acceptCompletion } from '../utils/aiEngine';
import { downloadFile } from '../utils/converter';

export default function DualEditor() {
  const { activeFile, dispatch } = useNotepad();
  const [viewMode, setViewMode] = useState<EditorMode>('wysiwyg');
  const [copied, setCopied] = useState(false);
  const [aiCompletion, setAiCompletion] = useState<string | null>(null);
  const [aiLatency, setAiLatency] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const monacoRef = useRef<any>(null);

  // Initialize Tiptap
  const tiptapEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing... Press Tab to accept AI suggestions',
      }),
    ],
    content: activeFile?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] text-zinc-200 text-sm md:text-base leading-relaxed px-1',
      },
      handleKeyDown: (_view, event) => {
        if (event.key === 'Tab' && aiCompletion) {
          event.preventDefault();
          const text = tiptapEditor?.getText() || '';
          const pos = text.length;
          const { newText } = acceptCompletion(text, pos, aiCompletion);
          tiptapEditor?.commands.setContent(newText, { emitUpdate: false });
          setAiCompletion(null);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (activeFile) {
        const content = editor.getHTML();
        dispatch({ type: 'UPDATE_FILE', payload: { id: activeFile.id, content } });
        triggerAiCompletion(editor.getText(), editor.state.selection.from);
      }
    },
  });

  // Update Tiptap content when file changes
  useEffect(() => {
    if (tiptapEditor && activeFile && viewMode === 'wysiwyg') {
      const currentContent = tiptapEditor.getHTML();
      if (currentContent !== activeFile.content) {
        tiptapEditor.commands.setContent(activeFile.content, { emitUpdate: false });
      }
    }
  }, [activeFile?.id]);

  // Auto-switch mode based on file type
  useEffect(() => {
    if (activeFile) {
      if (['json', 'yaml', 'html', 'jsonl'].includes(activeFile.type)) {
        setViewMode('code');
      } else {
        setViewMode('wysiwyg');
      }
    }
  }, [activeFile?.id]);

  const triggerAiCompletion = useCallback((text: string, cursorPos: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsAiLoading(true);
      const result = await generateCompletion(text, cursorPos);
      setIsAiLoading(false);
      if (result) {
        setAiCompletion(result.text);
        setAiLatency(result.latency);
      } else {
        setAiCompletion(null);
      }
    }, 800);
  }, []);

  const handleMonacoChange = (value: string | undefined) => {
    if (value !== undefined && activeFile) {
      dispatch({ type: 'UPDATE_FILE', payload: { id: activeFile.id, content: value } });
    }
  };

  const handleCopy = async () => {
    if (!activeFile) return;
    const text = viewMode === 'wysiwyg'
      ? tiptapEditor?.getText() || ''
      : activeFile.content;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const text = viewMode === 'wysiwyg'
      ? tiptapEditor?.getHTML() || ''
      : activeFile.content;
    downloadFile(text, activeFile.name, 'text/plain');
  };

  const getMonacoLanguage = (type: string) => {
    switch (type) {
      case 'json':
      case 'jsonl':
        return 'json';
      case 'yaml':
        return 'yaml';
      case 'html':
        return 'html';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };

  const wordCount = activeFile?.content
    ? activeFile.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
    : 0;

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950/40">
        <div className="text-center space-y-3">
          <FileText className="w-12 h-12 text-zinc-700 mx-auto" />
          <p className="text-zinc-500 text-sm">Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-950/40 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950/80 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-zinc-300">{activeFile.name}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700/50 uppercase">
            {activeFile.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setViewMode('wysiwyg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'wysiwyg'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              Rich Text
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'code'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code2 className="w-3 h-3" />
              Code
            </button>
            {activeFile.type === 'md' && (
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  viewMode === 'split'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Columns className="w-3 h-3" />
                Split
              </button>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/50 transition-all"
            title="Copy content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/50 transition-all"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tiptap formatting toolbar */}
      {viewMode === 'wysiwyg' && tiptapEditor && (
        <div className="flex items-center gap-1 px-4 py-2 border-b border-zinc-800/40 bg-zinc-950/40">
          {[
            { label: 'B', action: () => tiptapEditor.chain().focus().toggleBold().run(), active: tiptapEditor.isActive('bold') },
            { label: 'I', action: () => tiptapEditor.chain().focus().toggleItalic().run(), active: tiptapEditor.isActive('italic') },
            { label: 'H1', action: () => tiptapEditor.chain().focus().toggleHeading({ level: 1 }).run(), active: tiptapEditor.isActive('heading', { level: 1 }) },
            { label: 'H2', action: () => tiptapEditor.chain().focus().toggleHeading({ level: 2 }).run(), active: tiptapEditor.isActive('heading', { level: 2 }) },
            { label: '• List', action: () => tiptapEditor.chain().focus().toggleBulletList().run(), active: tiptapEditor.isActive('bulletList') },
            { label: '1. List', action: () => tiptapEditor.chain().focus().toggleOrderedList().run(), active: tiptapEditor.isActive('orderedList') },
            { label: '" Quote', action: () => tiptapEditor.chain().focus().toggleBlockquote().run(), active: tiptapEditor.isActive('blockquote') },
            { label: '<> Code', action: () => tiptapEditor.chain().focus().toggleCodeBlock().run(), active: tiptapEditor.isActive('codeBlock') },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                btn.active
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 border border-transparent'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Editor area */}
      <div className="flex-1 relative overflow-hidden">
        {/* WYSIWYG mode */}
        {viewMode === 'wysiwyg' && (
          <div className="h-full overflow-y-auto p-6">
            <EditorContent editor={tiptapEditor} />
            {/* AI ghost text overlay */}
            {aiCompletion && (
              <div className="mt-2 px-1 py-1.5 rounded-lg bg-purple-900/10 border border-purple-500/20 inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-300/60 font-mono italic">
                  {aiCompletion.slice(0, 80)}{aiCompletion.length > 80 ? '...' : ''}
                </span>
                <span className="text-[10px] text-purple-400/40 font-mono">Tab to accept</span>
              </div>
            )}
          </div>
        )}

        {/* Code mode */}
        {viewMode === 'code' && (
          <div className="h-full">
            <Editor
              height="100%"
              language={getMonacoLanguage(activeFile.type)}
              theme="vs-dark"
              value={activeFile.content}
              onChange={handleMonacoChange}
              onMount={(editor) => { monacoRef.current = editor; }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                bracketPairColorization: { enabled: true },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
              }}
            />
          </div>
        )}

        {/* Split mode */}
        {viewMode === 'split' && activeFile.type === 'md' && (
          <div className="h-full flex">
            <div className="w-1/2 border-r border-zinc-800/60">
              <Editor
                height="100%"
                language="markdown"
                theme="vs-dark"
                value={activeFile.content}
                onChange={handleMonacoChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
            <div className="w-1/2 overflow-y-auto p-6">
              <div
                className="prose prose-invert max-w-none text-sm text-zinc-300"
                dangerouslySetInnerHTML={{ __html: marked(activeFile.content) as string }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-950 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span>
            Engine: {viewMode === 'wysiwyg' ? 'Tiptap' : viewMode === 'code' ? 'Monaco' : 'Split'}
          </span>
          <span className="text-zinc-700">•</span>
          <span className="flex items-center gap-1">
            {isAiLoading ? (
              <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
            ) : aiCompletion ? (
              <Sparkles className="w-3 h-3 text-purple-400" />
            ) : (
              <Sparkles className="w-3 h-3 text-zinc-600" />
            )}
            <span className={aiCompletion ? 'text-purple-400' : ''}>
              {isAiLoading ? 'Thinking...' : aiCompletion ? 'Suggestion ready' : 'AI Active'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span className="text-zinc-700">•</span>
          <span>{activeFile.content.length} chars</span>
          <span className="text-zinc-700">•</span>
          <span>UTF-8</span>
          {aiLatency > 0 && (
            <>
              <span className="text-zinc-700">•</span>
              <span className="text-purple-400/60">{Math.round(aiLatency)}ms</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
