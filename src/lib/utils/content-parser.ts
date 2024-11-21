import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProseMirrorNode {
  type: string;
  attrs?: Record<string, any>;
  content?: ProseMirrorNode[];
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
  text?: string;
}

interface ProseMirrorDoc {
  type: 'doc';
  content: ProseMirrorNode[];
}

export function parseContent(content: string): ProseMirrorDoc | null {
  try {
    return JSON.parse(content) as ProseMirrorDoc;
  } catch (e) {
    console.error('Failed to parse content:', e);
    return null;
  }
}

export function renderTextWithMarks(text: string, marks: Array<{ type: string; attrs?: Record<string, any> }> = []): string {
  let result = text;
  
  marks.forEach(mark => {
    switch (mark.type) {
      case 'bold':
        result = `<strong>${result}</strong>`;
        break;
      case 'italic':
        result = `<em>${result}</em>`;
        break;
      case 'underline':
        result = `<u>${result}</u>`;
        break;
      case 'strike':
        result = `<del>${result}</del>`;
        break;
      case 'code':
        result = `<code>${result}</code>`;
        break;
      case 'link':
        if (mark.attrs?.href) {
          result = `<a href="${mark.attrs.href}" target="_blank" rel="noopener noreferrer">${result}</a>`;
        }
        break;
    }
  });
  
  return result;
}

export function renderNode(node: ProseMirrorNode): string {
  switch (node.type) {
    case 'paragraph':
      const alignment = node.attrs?.textAlign || 'left';
      const content = node.content
        ?.map(child => {
          if (child.type === 'text') {
            return renderTextWithMarks(child.text || '', child.marks);
          }
          return renderNode(child);
        })
        .join('') || '&nbsp;'; // Use &nbsp; for empty paragraphs
      return `<p class="text-${alignment}">${content}</p>`;

    case 'heading':
      const level = node.attrs?.level || 1;
      const headingContent = node.content
        ?.map(child => {
          if (child.type === 'text') {
            return renderTextWithMarks(child.text || '', child.marks);
          }
          return renderNode(child);
        })
        .join('') || '';
      return `<h${level} class="font-bold">${headingContent}</h${level}>`;

    case 'bulletList':
      const listItems = node.content
        ?.map(child => renderNode(child))
        .join('') || '';
      return `<ul class="list-disc list-inside">${listItems}</ul>`;

    case 'orderedList':
      const orderedItems = node.content
        ?.map(child => renderNode(child))
        .join('') || '';
      return `<ol class="list-decimal list-inside">${orderedItems}</ol>`;

    case 'listItem':
      const itemContent = node.content
        ?.map(child => renderNode(child))
        .join('') || '';
      return `<li>${itemContent}</li>`;

    case 'blockquote':
      const quoteContent = node.content
        ?.map(child => renderNode(child))
        .join('') || '';
      return `<blockquote class="border-l-4 border-primary pl-4 italic">${quoteContent}</blockquote>`;

    case 'image':
      return `<img src="${node.attrs?.src}" alt="${node.attrs?.alt || ''}" class="max-w-full h-auto" />`;

    case 'hardBreak':
      return '<br />';

    case 'text':
      return renderTextWithMarks(node.text || '', node.marks);

    default:
      return '';
  }
}

export function renderContent(content: string): string {
  const doc = parseContent(content);
  if (!doc) return '';

  return doc.content.map(node => renderNode(node)).join('\n');
}
