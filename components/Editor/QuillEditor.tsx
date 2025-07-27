// components/Editor/QuillEditor.tsx
'use client';

import dynamic from 'next/dynamic';

export const QuillEditor = dynamic(() => import('react-quill-new'), {
  ssr: false, // ✅ 이게 중요
  loading: () => <p>Loading editor...</p>,
});

