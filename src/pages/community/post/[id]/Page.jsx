import { NavBar } from '../../../../components/Nav-bar';
import { CommunityPostDetail } from '../../../../modules/Community-post-detail';
import { notFound } from 'next/navigation';

// 게시글 ID 유효성 검사 함수
function isValidPostId(id) {
  // 1~13까지의 ID만 유효하다고 가정
  return !isNaN(Number(id)) && Number(id) > 0 && Number(id) <= 13;
}

export default function CommunityPostPage({ params }) {
  // 유효하지 않은 게시글 ID인 경우 404 페이지로 리다이렉트
  if (!isValidPostId(params.id)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#e8f4fc]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-[#1e3a8a]">커뮤니티</h1>
        <CommunityPostDetail postId={params.id} />
      </div>
    </main>
  );
}
