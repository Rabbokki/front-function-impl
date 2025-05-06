import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { NavBar } from '../../../../components/Nav-bar';
import { CommunityPostDetail } from '../../../../modules/Community-post-detail';

// 게시글 ID 유효성 검사 함수
function isValidPostId(id) {
  return !isNaN(Number(id)) && Number(id) > 0 && Number(id) <= 13;
}

export default function CommunityPostPage() {
  const { id } = useParams();

  // 유효하지 않은 게시글 ID인 경우 404 페이지로 리다이렉트
  if (!isValidPostId(id)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">커뮤니티</h1>
        <CommunityPostDetail postId={id} />
      </div>
    </main>
  );
}
