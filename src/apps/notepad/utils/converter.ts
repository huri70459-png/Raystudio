import TurndownService from 'turndown';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

export type SupportedFormat = 'md' | 'json' | 'yaml' | 'html' | 'txt' | 'jsonl' | 'docx' | 'pdf' | 'png' | 'jpg' | 'jpeg';

export interface ConversionResult {
  fileName: string;
  fileType: string;
  content: string;
  mimeType: string;
  blob?: Blob;
}

export async function convertFile(
  file: File,
  targetFormat: 'md' | 'pdf' | 'html' | 'json' | 'yaml' | 'txt'
): Promise<ConversionResult> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  // DOCX → MD/HTML
  if (extension === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const htmlContent = result.value;

    if (targetFormat === 'md') {
      const markdown = turndownService.turndown(htmlContent);
      return {
        fileName: `${baseName}.md`,
        fileType: 'md',
        content: markdown,
        mimeType: 'text/markdown',
      };
    }
    return {
      fileName: `${baseName}.html`,
      fileType: 'html',
      content: htmlContent,
      mimeType: 'text/html',
    };
  }

  // Text-based files
  if (['md', 'txt', 'json', 'yaml', 'yml', 'html', 'jsonl'].includes(extension)) {
    const textContent = await file.text();

    if (extension === 'html' && targetFormat === 'md') {
      const markdown = turndownService.turndown(textContent);
      return {
        fileName: `${baseName}.md`,
        fileType: 'md',
        content: markdown,
        mimeType: 'text/markdown',
      };
    }

    if (extension === 'md' && targetFormat === 'html') {
      const html = await marked(textContent);
      return {
        fileName: `${baseName}.html`,
        fileType: 'html',
        content: html as string,
        mimeType: 'text/html',
      };
    }

    return {
      fileName: file.name,
      fileType: extension,
      content: textContent,
      mimeType: 'text/plain',
    };
  }

  // Image → PDF
  if (['png', 'jpg', 'jpeg'].includes(extension)) {
    if (targetFormat === 'pdf') {
      const doc = new jsPDF();
      const imageUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const maxWidth = 190;
          const maxHeight = 270;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          doc.addImage(img, extension.toUpperCase(), 10, 10, width, height);
          URL.revokeObjectURL(imageUrl);
          resolve();
        };
      });

      const pdfBlob = doc.output('blob');
      const pdfDataUri = doc.output('datauristring');
      return {
        fileName: `${baseName}.pdf`,
        fileType: 'pdf',
        content: pdfDataUri,
        mimeType: 'application/pdf',
        blob: pdfBlob,
      };
    }

    // Image → MD (embed as base64)
    if (targetFormat === 'md') {
      const base64 = await fileToBase64(file);
      const markdown = `![${file.name}](${base64})\n\n*Image imported from ${file.name}*`;
      return {
        fileName: `${baseName}.md`,
        fileType: 'md',
        content: markdown,
        mimeType: 'text/markdown',
      };
    }
  }

  // Text/MD → PDF
  if (['md', 'txt', 'html'].includes(extension) && targetFormat === 'pdf') {
    const textContent = await file.text();
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(textContent, 180);
    doc.text(lines, 15, 20);
    const pdfBlob = doc.output('blob');
    const pdfDataUri = doc.output('datauristring');
    return {
      fileName: `${baseName}.pdf`,
      fileType: 'pdf',
      content: pdfDataUri,
      mimeType: 'application/pdf',
      blob: pdfBlob,
    };
  }

  throw new Error(`Unsupported conversion: .${extension} → .${targetFormat}`);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export function downloadFile(content: string | Blob, fileName: string, mimeType: string) {
  const blob = typeof content === 'string'
    ? new Blob([content], { type: mimeType })
    : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || 'txt';
}

export function getFileType(fileName: string): 'md' | 'json' | 'yaml' | 'html' | 'txt' | 'jsonl' {
  const ext = getExtension(fileName);
  if (['md'].includes(ext)) return 'md';
  if (['json'].includes(ext)) return 'json';
  if (['yaml', 'yml'].includes(ext)) return 'yaml';
  if (['html', 'htm'].includes(ext)) return 'html';
  if (['jsonl'].includes(ext)) return 'jsonl';
  return 'txt';
}
