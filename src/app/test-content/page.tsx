'use client';

import { BlogContent } from '@/components/BlogContent';

const testContent = {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "attrs": { "textAlign": "left" },
      "content": [
        {
          "type": "text",
          "marks": [{ "type": "bold" }],
          "text": "dcfcfcfcfcfcfcf"
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": { "textAlign": "left" }
    },
    {
      "type": "paragraph",
      "attrs": { "textAlign": "left" }
    },
    {
      "type": "paragraph",
      "attrs": { "textAlign": "left" },
      "content": [
        {
          "type": "text",
          "marks": [
            { "type": "bold" },
            { "type": "italic" }
          ],
          "text": "njnjnjnjnjnjnj"
        }
      ]
    }
  ]
};

export default function TestContentPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Content Test Page</h1>
      <div className="border rounded-lg p-6 bg-background">
        <BlogContent content={JSON.stringify(testContent)} />
      </div>
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(testContent, null, 2)}
        </pre>
      </div>
    </div>
  );
}
