'use client';

import { renderContent } from '@/lib/utils/content-parser';

interface BlogContentProps {
  content: string;
  className?: string;
}

export function BlogContent({ content, className = '' }: BlogContentProps) {
  const htmlContent = renderContent(content);

  return (
    <article 
      className={`prose prose-lg dark:prose-invert prose-headings:mb-4 prose-p:my-2 max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
