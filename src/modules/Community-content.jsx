import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  User,
  Users,
} from 'lucide-react';
import { Button } from './Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { Input } from './Input';
import { Card, CardFooter, CardHeader, CardTitle } from './Card';
import { Badge } from './Badge';
import { Link } from 'react-router-dom';

export function CommunityContent() {
  const [activeTab, setActiveTab] = useState('tips');
  const [searchTerm, setSearchTerm] = useState('');

  const tipPosts = [
    {
      id: 1,
      title: '도쿄 여행 꿀팁 모음 (교통, 숙소, 쇼핑)',
      author: '여행고수',
      date: '2025.04.18',
      views: 1243,
      likes: 89,
      comments: 23,
      tags: ['도쿄', '일본', '꿀팁'],
      color: '#ff6b6b',
    },
    {
      id: 2,
      title: '유럽 배낭여행 준비물 체크리스트',
      author: '유럽러버',
      date: '2025.04.15',
      views: 987,
      likes: 76,
      comments: 18,
      tags: ['유럽', '배낭여행', '체크리스트'],
      color: '#4dabf7',
    },
    {
      id: 3,
      title: '동남아 여행 시 주의사항 및 꿀팁',
      author: '아시아탐험가',
      date: '2025.04.12',
      views: 756,
      likes: 54,
      comments: 12,
      tags: ['동남아', '태국', '베트남'],
      color: '#51cf66',
    },
    {
      id: 4,
      title: '해외여행 환전 꿀팁 (수수료 절약하는 방법)',
      author: '알뜰여행자',
      date: '2025.04.10',
      views: 689,
      likes: 47,
      comments: 9,
      tags: ['환전', '꿀팁', '해외여행'],
      color: '#ffd43b',
    },
    {
      id: 5,
      title: '항공권 싸게 사는 방법 총정리',
      author: '비행기마스터',
      date: '2025.04.08',
      views: 1532,
      likes: 112,
      comments: 31,
      tags: ['항공권', '할인', '꿀팁'],
      color: '#ff6b6b',
    },
  ];

  const freePosts = [
    {
      id: 4,
      title: '방금 도쿄 여행 다녀왔어요! (사진 많음)',
      author: '도쿄여행자',
      date: '2025.04.20',
      views: 342,
      likes: 28,
      comments: 15,
      tags: ['도쿄', '여행후기', '사진'],
      color: '#ff6b6b',
    },
    {
      id: 5,
      title: '여행 중 겪은 황당한 에피소드',
      author: '웃픈여행',
      date: '2025.04.17',
      views: 567,
      likes: 89,
      comments: 42,
      tags: ['에피소드', '웃긴이야기'],
      color: '#4dabf7',
    },
    {
      id: 8,
      title: '혼자 떠난 제주도 3박 4일',
      author: '솔로여행러',
      date: '2025.04.14',
      views: 423,
      likes: 35,
      comments: 19,
      tags: ['제주도', '혼자여행'],
      color: '#51cf66',
    },
    {
      id: 9,
      title: '가족과 함께한 오사카 여행기',
      author: '행복한아빠',
      date: '2025.04.11',
      views: 289,
      likes: 24,
      comments: 7,
      tags: ['오사카', '가족여행'],
      color: '#ffd43b',
    },
    {
      id: 10,
      title: '유럽 한 달 살기 후기',
      author: '유럽생활자',
      date: '2025.04.09',
      views: 876,
      likes: 67,
      comments: 23,
      tags: ['유럽', '장기여행', '한달살기'],
      color: '#ff6b6b',
    },
  ];

  const travelMatePosts = [
    {
      id: 6,
      title: '5월 초 방콕 여행 동행 구해요 (20대 여성)',
      author: '방콕가자',
      date: '2025.04.19',
      views: 234,
      likes: 12,
      comments: 8,
      tags: ['방콕', '동행', '5월'],
      color: '#ffd43b',
    },
    {
      id: 7,
      title: '다음 주 제주도 렌트카 동행 1명 구함',
      author: '제주드라이버',
      date: '2025.04.18',
      views: 187,
      likes: 9,
      comments: 14,
      tags: ['제주도', '렌트카', '동행'],
      color: '#51cf66',
    },
    {
      id: 11,
      title: '6월 유럽 배낭여행 동행자 모집 (30대 남성)',
      author: '유럽탐험가',
      date: '2025.04.16',
      views: 321,
      likes: 18,
      comments: 22,
      tags: ['유럽', '배낭여행', '6월'],
      color: '#4dabf7',
    },
    {
      id: 12,
      title: '오사카 3박 4일 여행 동행 구해요',
      author: '오사카러버',
      date: '2025.04.15',
      views: 156,
      likes: 7,
      comments: 5,
      tags: ['오사카', '동행'],
      color: '#ff6b6b',
    },
    {
      id: 13,
      title: '다낭 1주일 동행 구합니다 (식도락 여행)',
      author: '베트남맛집',
      date: '2025.04.13',
      views: 198,
      likes: 11,
      comments: 9,
      tags: ['다낭', '베트남', '맛집'],
      color: '#ffd43b',
    },
  ];

  const getPostsByTab = () => {
    let posts;
    switch (activeTab) {
      case 'tips':
        posts = tipPosts;
        break;
      case 'free':
        posts = freePosts;
        break;
      case 'mate':
        posts = travelMatePosts;
        break;
      default:
        posts = tipPosts;
    }

    // 검색어가 있으면 필터링
    if (searchTerm.trim()) {
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return posts;
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      {/* 검색창 및 글쓰기 버튼 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="검색어를 입력하세요"
            className="bg-[#f8f9fa] pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
        </div>
        <Link href="/community/write">
          <Button className="ml-4 bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
            글쓰기
          </Button>
        </Link>
      </div>

      {/* 탭 및 포스트 리스트 렌더링 */}
      <Tabs defaultValue="tips" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3 bg-[#e7f5ff]">
          <TabsTrigger
            value="tips"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            꿀팁 게시판
          </TabsTrigger>
          <TabsTrigger
            value="free"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            자유게시판
          </TabsTrigger>
          <TabsTrigger
            value="mate"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            여행메이트
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tips">
          <div className="space-y-4">
            {getPostsByTab().map((post) => (
              <Link href={`/community/post/${post.id}`} key={post.id}>
                <Card className="overflow-hidden bg-[#f8f9fa] transition-all duration-200 hover:bg-[#e7f5ff]/20 hover:shadow-md">
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-[#1e3a8a]">
                        {post.title}
                      </CardTitle>
                      <div className="flex space-x-1">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#d0ebff]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between pb-4 pt-2 text-sm text-[#495057]">
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3 text-[#4dabf7]" />
                      <span className="mr-3">{post.author}</span>
                      <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* 탭 컨텐츠 */}
        {['tips', 'free', 'mate'].map((tabKey) => (
          <TabsContent value={tabKey} key={tabKey}>
            <div className="space-y-4">
              {getPostsByTab().map((post) => (
                <Link href={`/community/post/${post.id}`} key={post.id}>
                  <Card className="overflow-hidden bg-[#f8f9fa] transition-all duration-200 hover:bg-[#e7f5ff]/20 hover:shadow-md">
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-[#1e3a8a]">
                          {post.title}
                        </CardTitle>
                        <div className="flex space-x-1">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#d0ebff]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between pb-4 pt-2 text-sm text-[#495057]">
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span className="mr-3">{post.author}</span>
                        <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="mr-1 h-3 w-3 text-[#4dabf7]" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center">
                          {tabKey === 'mate' ? (
                            <Users className="mr-1 h-3 w-3 text-[#4dabf7]" />
                          ) : (
                            <>
                              <ThumbsUp className="mr-1 h-3 w-3 text-[#4dabf7]" />
                              <span>{post.likes}</span>
                            </>
                          )}
                          <MessageSquare className="ml-2 mr-1 h-3 w-3 text-[#4dabf7]" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? 'default' : 'outline'}
              size="sm"
              className={
                page === 1
                  ? 'bg-[#4dabf7] text-white hover:bg-[#339af0]'
                  : 'border-[#d0ebff] text-[#4dabf7]'
              }
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
