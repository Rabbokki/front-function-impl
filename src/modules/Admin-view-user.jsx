import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser, getPostsByUserId, deletePostByUserId } from '../hooks/reducer/admin/adminThunk';

import { Button } from './Button';
import { Input } from './Input';
import { ScrollArea } from './Scroll-area';
import { Textarea } from './Textarea';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './Dialog';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs';

import {
  Camera,
  Edit,
  Trash2,
} from 'lucide-react';

export function AdminViewUser({ isOpen, onClose, user, onUserUpdated }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.admin.userPosts);

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const [postPage, setPostPage] = useState(1);
  const postsPerPage = 8;
  const [viewAllPosts, setViewAllPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const totalPostPages = Math.ceil(filteredPosts.length / postsPerPage);
  const postIndexStart = (postPage - 1) * postsPerPage;
  const postIndexEnd = postIndexStart + postsPerPage;

  const paginatedPosts = viewAllPosts
    ? filteredPosts
    : filteredPosts.slice(postIndexStart, postIndexEnd);

  const isFirstPostPage = postPage === 1;
  const isLastPostPage = postIndexEnd >= filteredPosts.length;

  useEffect(() => {
    if (user?.id) {
      console.log("user id is: ", user.id)
      dispatch(getPostsByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts])

  const clearAllInput = () => {
    setName('');
    setNickname('');
    setBio('');
    setProfileImage(null);
    setPreviewUrl(null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const paginatePosts = (e, increment) => {
    e.preventDefault();
    setPostPage((prev) => prev + increment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm(`정말 ${user.name}의 디태일 수정 하겠습니가?`)) return;

    const formData = new FormData();

    const dto = {
      name: name || user.name,
      nickname: nickname || user.nickname,
      bio: bio || user.bio,
    }
    formData.append('dto', new  Blob([JSON.stringify(dto)], { type: "application/json" }))

    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const result = await dispatch(updateUser({ accountId: user.id, formData })).unwrap();
      alert('유저 수정되었습니다!');
      if (onUserUpdated) onUserUpdated();
      clearAllInput();
      onClose();
    } catch (error) {
      console.error('유저 처리 실패:', error);
      alert('유저 처리 실패: ' + error);
    }
  }

  const handlePostDelete = async (e, post) => {
    e.preventDefault();

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await dispatch(deletePostByUserId({ postId: post.id, accountId: user.id })).unwrap();
      alert("게시물이 삭제되었습니다!");
      dispatch(getPostsByUserId(user.id)); // <- refresh post list
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("게시물 삭제에 실패했습니다.");
  }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 pt-10 bg-white text-black shadow-xl rounded-lg max-w-3xl max-h-[90vh]">
        <ScrollArea className="h-[75vh] pr-4">
          <DialogHeader>
            <DialogTitle>유저 디태일</DialogTitle>
          </DialogHeader>

          <div className="flex gap-6 py-4">
            {/* LEFT: Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32">
                <div className="rounded-full border-4 border-[#4dabf7] bg-[#e7f5ff] overflow-hidden h-full w-full">
                  <img
                    src={previewUrl || user.imgUrl || "/placeholder.svg"}
                    alt="프로필 미리보기"
                    className="h-full w-full object-cover"
                  />
                  <label htmlFor="profileImageUpload">
                    <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#4dabf7] hover:bg-[#339af0] cursor-pointer shadow-md">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </label>
                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
              <p className="text-sm text-[#495057] mt-2">프로필 이미지를 선택하세요</p>
            </div>

            {/* RIGHT: Form */}
            <div className="flex-1 space-y-4">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="text-sm font-medium">이름</label>
                <Input
                  id="name"
                  placeholder={user.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="placeholder:text-gray-400 placeholder:opacity-80"
                />
              </div>

              {/* 닉네임 */}
              <div>
                <label htmlFor="nickname" className="text-sm font-medium">닉네임</label>
                <Input
                  id="nickname"
                  placeholder={user.nickname}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="placeholder:text-gray-400 placeholder:opacity-80"
                />
              </div>

              {/* 바이오 */}
              <div>
                <label htmlFor="bio" className="text-sm font-medium">바이오</label>
                <Textarea
                  id="bio"
                  placeholder={user.bio}
                  className="min-h-[100px] placeholder:text-gray-400 placeholder:opacity-80"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="justify-center mb-4">
            <Button variant="outline" onClick={onClose}>취소</Button>
            <Button onClick={handleSubmit} className="bg-traveling-purple">수정하기</Button>
          </DialogFooter>

          <div className="border-b border-gray-200 mb-2" />

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
              <TabsTrigger value="details">상세</TabsTrigger>
              <TabsTrigger value="posts">게시물</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <table className="min-w-full text-sm mt-4 border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border w-10">ID</th>
                    <th className="p-2 border">이매일</th>
                    <th className="p-2 border">생일</th>
                    <th className="p-2 border">성별</th>
                    <th className="p-2 border">가입일</th>
                    <th className="p-2 border">레벨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 border w-10 truncate text-center">{user.id}</td>
                    <td className="p-2 border text-center">{user.email}</td>
                    <td className="p-2 border text-center">{user.birthday}</td>
                    <td className="p-2 border text-center">{user.gender}</td>
                    <td className="p-2 border text-center">{new Date(user.createdAt).toISOString().slice(0, 10)}</td>
                    <td className="p-2 border text-center">{user.level}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="posts">
              <table className="min-w-full text-sm mt-4 border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border w-10">ID</th>
                    <th className="p-2 border">제목</th>
                    <th className="p-2 border">작성일</th>
                    <th className="p-2 border">수정일</th>
                    <th className="p-2 border">조회수</th>
                    <th className="p-2 border">좋아요</th>
                    <th className="p-2 border">댓글</th>
                    <th className="p-2 border">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts && paginatedPosts.length > 0 ? (
                    paginatedPosts?.map((post, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 border w10 truncate text-center">{post.id}</td>
                        <td className="p-2 border text-center">
                          <Link
                            to={`/community/post/${post.id}`}
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {post.title}
                          </Link>
                        </td>
                        <td className="p-2 border text-center">{new Date(post.createdAt).toISOString().slice(0, 10)}</td>
                        <td className="p-2 border text-center">{new Date(post.updatedAt).toISOString().slice(0, 10)}</td>
                        <td className="p-2 border text-center">{post.views}</td>
                        <td className="p-2 border text-center">{post.likeCount}</td>
                        <td className="p-2 border text-center">{post.commentsCount}</td>
                        <td className="p-2 border text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={(e) => handlePostDelete(e, post)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-gray-400">게시물이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {!viewAllPosts && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    총 {filteredPosts.length}개의 게시물 중 {postIndexStart + 1}-
                    {Math.min(postIndexEnd, filteredPosts.length)} 표시
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isFirstPostPage}
                      onClick={(e) => paginatePosts(e, -1)}
                    >
                      이전
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isLastPostPage}
                      onClick={(e) => paginatePosts(e, 1)}
                    >
                      다음
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>

  )
}