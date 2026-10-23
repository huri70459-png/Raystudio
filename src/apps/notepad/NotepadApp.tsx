import { useState, useEffect } from 'react';
import { NotepadProvider } from './store';
import FileExplorer from './components/FileExplorer';
import DualEditor from './components/DualEditor';
import FileConverter from './components/FileConverter';

interface NotepadAppProps {
  onBack: () => void;
}

function NotepadAppInner({ onBack }: NotepadAppProps) {
  const [converterOpen, setConverterOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: New file (handled in FileExplorer)
      // Escape: Close converter
      if (e.key === 'Escape' && converterOpen) {
        setConverterOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [converterOpen]);

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <FileExplorer
          onBack={onBack}
          onOpenConverter={() => setConverterOpen(true)}
        />

        {/* Editor */}
        <DualEditor />
      </div>

      {/* File Converter Modal */}
      <FileConverter
        isOpen={converterOpen}
        onClose={() => setConverterOpen(false)}
      />
    </div>
  );
}

export default function NotepadApp(props: NotepadAppProps) {
  return (
    <NotepadProvider>
      <NotepadAppInner {...props} />
    </NotepadProvider>
  );
}
