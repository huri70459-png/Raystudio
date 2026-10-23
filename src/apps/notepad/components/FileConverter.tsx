import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  FileUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { convertFile, downloadFile } from '../utils/converter';
import { useNotepad } from '../store';
import { getFileType } from '../utils/converter';

interface FileConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FileConverter({ isOpen, onClose }: FileConverterProps) {
  const { dispatch } = useNotepad();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'md' | 'pdf' | 'html' | 'json' | 'yaml' | 'txt'>('md');
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loadIntoEditor, setLoadIntoEditor] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError(null);
      setSuccessMsg(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
      setSuccessMsg(null);
    }
  };

  const executeConversion = async () => {
    if (!selectedFile) return;

    setConverting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const result = await convertFile(selectedFile, targetFormat);
      setSuccessMsg(`Successfully converted to ${result.fileName}!`);

      if (loadIntoEditor && ['md', 'json', 'yaml', 'html', 'txt', 'jsonl'].includes(result.fileType)) {
        // Create new file in workspace
        const newFile = {
          id: `converted-${Date.now()}`,
          name: result.fileName,
          type: getFileType(result.fileName),
          content: result.content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        dispatch({ type: 'CREATE_FILE', payload: newFile });
      } else if (result.blob) {
        // Download binary file (PDF)
        downloadFile(result.blob, result.fileName, result.mimeType);
      }
    } catch (err: any) {
      setError(err.message || 'Conversion failed. Please check file format.');
    } finally {
      setConverting(false);
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setError(null);
    setSuccessMsg(null);
  };

  const formats = [
    { value: 'md' as const, label: 'Markdown', ext: '.md' },
    { value: 'html' as const, label: 'HTML', ext: '.html' },
    { value: 'pdf' as const, label: 'PDF', ext: '.pdf' },
    { value: 'json' as const, label: 'JSON', ext: '.json' },
    { value: 'txt' as const, label: 'Plain Text', ext: '.txt' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-zinc-100">Universal File Converter</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Drop zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-zinc-700/80 rounded-xl p-6 text-center bg-zinc-950/40 hover:border-purple-500/50 transition-colors cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".docx,.pdf,.md,.html,.txt,.json,.yaml,.yml,.jsonl,.png,.jpg,.jpeg"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-2.5 rounded-xl bg-zinc-800/80 text-purple-400 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{selectedFile.name}</p>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); resetState(); }}
                        className="mt-2 text-[11px] text-zinc-500 hover:text-zinc-300 underline"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        Drop file here or <span className="text-purple-400">browse</span>
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        DOCX, PDF, MD, HTML, JSON, YAML, PNG, JPG
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Target format */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                  Target Format
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {formats.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setTargetFormat(fmt.value)}
                      className={`py-2 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                        targetFormat === fmt.value
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                          : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-zinc-700/40'
                      }`}
                    >
                      {fmt.ext}
                    </button>
                  ))}
                </div>
              </div>

              {/* Load into editor toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    loadIntoEditor ? 'bg-purple-600' : 'bg-zinc-700'
                  }`}
                  onClick={() => setLoadIntoEditor(!loadIntoEditor)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      loadIntoEditor ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <span className="text-xs text-zinc-300">Load converted file into editor</span>
              </label>

              {/* Convert button */}
              <button
                onClick={executeConversion}
                disabled={!selectedFile || converting}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {converting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4" />
                    Convert & {loadIntoEditor ? 'Load' : 'Download'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950/30">
              <p className="text-[10px] text-zinc-600 font-mono">
                Supports: DOCX → MD/HTML • HTML → MD • MD → HTML/PDF • Images → PDF/MD • Text → PDF
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
