import React from 'react';
import { WritePostForm } from '../../../modules/Write-post-form';

export default function WritePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold text-[#1e3a8a]">새 게시글 작성</h1>
      <WritePostForm />
    </div>
  );
}
