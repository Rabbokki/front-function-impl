import React, { useState, useEffect, useMemo } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../hooks/reducer/post/postThunk'; // Update the path as necessary
import { usePagination } from '../hooks/Use-pagination';

export function CommunityContent() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Select posts from Redux store
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  // Fetch posts whenever activeTab or searchTerm changes
  useEffect(() => {
    dispatch(getAllPosts({ category: activeTab, search: searchTerm }));
  }, [dispatch, activeTab, searchTerm]);

  // Sort posts from latest to oldest based on createdAt
  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [posts]);

  // Pagination: display 10 items per page
  const {
    paginatedData,
    currentPage,
    isFirstPage,
    isLastPage,
    paginate,
    resetPagination,
  } = usePagination(sortedPosts, 10);

  // Reset to first page whenever posts or activeTab or searchTerm changes
  useEffect(() => {
    resetPagination();
  }, [sortedPosts, activeTab, searchTerm]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
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
        <Link to="/community/write">
          <Button className="ml-4 bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
            글쓰기
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="ALL" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid w-full grid-cols-4 bg-[#e7f5ff]">
          <TabsTrigger
            value="ALL"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            전채 보기
          </TabsTrigger>
          <TabsTrigger
            value="TIPS"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            꿀팁 게시판
          </TabsTrigger>
          <TabsTrigger
            value="FREE"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            자유게시판
          </TabsTrigger>
          <TabsTrigger
            value="MATE"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            여행메이트
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              paginatedData.map((post) => (
                <Link to={`/community/post/${post.id}`} key={post.id}>
                  <Card className="overflow-hidden bg-[#f8f9fa] transition-all duration-200 hover:bg-[#e7f5ff]/20 hover:shadow-md">
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-[#1e3a8a]">
                          {post.title}
                        </CardTitle>
                        <div className="flex space-x-1">
                          {post.tags?.map((tag) => (
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
                        <span className="mr-3">{post.userName}</span>
                        <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="mr-1 h-3 w-3 text-[#4dabf7]" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center">
                          {activeTab === 'MATE'.toLowerCase() ? (
                            <Users className="mr-1 h-3 w-3 text-[#4dabf7]" />
                          ) : (
                            <>
                              <ThumbsUp className="mr-1 h-3 w-3 text-[#4dabf7]" />
                              <span>{post.likeCount}</span>
                            </>
                          )}
                          <MessageSquare className="ml-2 mr-1 h-3 w-3 text-[#4dabf7]" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && !error && sortedPosts.length > 0 && (
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                onClick={() => paginate(-1)}
                disabled={isFirstPage}
                className="bg-[#4dabf7] text-white hover:bg-[#228be6] disabled:bg-[#dee2e6] disabled:text-[#868e96]"
              >
                이전
              </Button>
              <span className="flex items-center text-sm text-[#495057]">
                {currentPage} / {Math.ceil(sortedPosts.length / 10)}
              </span>
              <Button
                onClick={() => paginate(1)}
                disabled={isLastPage}
                className="bg-[#4dabf7] text-white hover:bg-[#228be6] disabled:bg-[#dee2e6] disabled:text-[#868e96]"
              >
                다음
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
