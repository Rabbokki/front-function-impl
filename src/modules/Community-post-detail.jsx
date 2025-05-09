import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAccountDetails } from '../hooks/reducer/account/accountThunk';
import { getPostById, deletePost, viewPost } from '../hooks/reducer/post/postThunk';
import { addLike, removeLike, getLikeStatus } from '../hooks/reducer/like/likeThunk';
import { getCommentsByPostId, createComment } from '../hooks/reducer/comment/commentThunk';
import {
  ArrowLeft, ThumbsUp, MessageSquare, Share2, Clock, Eye,
} from "lucide-react";
import { Button } from "./Button";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Separator } from "./Separator";
import { Badge } from "./Badge";
import { Textarea } from "./Textarea";

export function CommunityPostDetail({ postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.account.account);
  const { post, loading } = useSelector((state) => state.posts);
  const { like } = useSelector((state) => state.likes);
  const { comments, loading: commentLoading, error: commentError } = useSelector((state) => state.comments);

  const isOwner = currentUser && post && post.userId === currentUser.id;

  const [localPost, setLocalPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // 게시글 불러오기
  useEffect(() => {
    dispatch(getPostById(postId));
    dispatch(viewPost(postId));
    dispatch(getLikeStatus(postId)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLiked(res.payload.isLiked);
      }
    });
    dispatch(getCommentsByPostId(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) setLocalPost(post);
  }, [post]);

  useEffect(() => {
    console.log("currentUser is:", currentUser)
  }, [currentUser]);

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const formData = new FormData();

    const uploadComment = {
      content: newComment ?? '',
      likeCount: 0
    }
  
    try {
      dispatch(createComment({ postId, data: uploadComment })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setNewComment(""); // Clear the textarea
        }
      });
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

  // 좋아요 처리
  const handleLike = () => {
    if (!localPost) return;

    if (liked) {
      setLiked(false);
      setLocalPost((prev) => ({
        ...prev,
        likeCount: Math.max(prev.likeCount - 1, 0),
      }));

      dispatch(removeLike(postId)).then((res) => {
        if (res.meta.requestStatus !== 'fulfilled') {
          setLiked(true);
          setLocalPost((prev) => ({
            ...prev,
            likeCount: prev.likeCount + 1,
          }));
        }
      });
    } else {
      setLiked(true);
      setLocalPost((prev) => ({
        ...prev,
        likeCount: prev.likeCount + 1,
      }));

      dispatch(addLike(postId)).then((res) => {
        if (res.meta.requestStatus !== 'fulfilled') {
          setLiked(false);
          setLocalPost((prev) => ({
            ...prev,
            likeCount: Math.max(prev.likeCount - 1, 0),
          }));
        }
      });
    }
  };

  // 삭제 처리
  const handleDelete = () => {
    if (!window.confirm('정말 삭제 하겠습니가?')) return;

    dispatch(deletePost(postId))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          console.log("삭제 성공 했습니다.");
          navigate("/community");
        } else {
          console.error("삭제 실패 했습니다");
        }
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4dabf7] border-t-transparent"></div>
      </div>
    );
  }

  if (!localPost || !localPost.title) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-[#1e3a8a]">게시글을 찾을 수 없습니다</h2>
        <p className="mb-6 text-[#495057]">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
        <Button onClick={() => navigate("/community")} className="bg-[#4dabf7] text-white hover:bg-[#339af0]">
          커뮤니티로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-2 text-[#495057]" onClick={() => navigate("/community")}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          목록으로
        </Button>
        <div className="ml-auto flex space-x-2">
          {isOwner ? (
            <div className="flex gap-2">
              <Link to="/community/write">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-[#4dabf7] text-white"
                >
                  수정
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4dabf7] text-white"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          ) :  (
            <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${liked ? "bg-[#4dabf7] text-white" : "text-[#495057]"}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  좋아요 {localPost.likeCount}
              </Button>
              <Button variant="outline" size="sm" className="text-[#495057]">
                <Share2 className="mr-1 h-4 w-4" />
                  공유하기
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {localPost.tags?.map((tag) => (
            <Badge key={tag} className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#d0ebff]">{tag}</Badge>
          ))}
        </div>
        <h1 className="mb-2 text-2xl font-bold text-[#1e3a8a]">{localPost.title}</h1>
        <div className="flex items-center justify-between text-sm text-[#495057]">
          <div className="flex items-center">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage src={localPost.userImgUrl || '/placeholder.svg?height=96&width=96'} />
              <AvatarFallback>익</AvatarFallback>
            </Avatar>
            <span className="mr-3">{localPost.userName}</span>
            <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3 text-[#4dabf7]" />
            <span>{localPost.views}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4 bg-[#e9ecef]" />

      <div className="mb-8">
        <div
          className="prose max-w-none prose-headings:text-[#1e3a8a] prose-a:text-[#4dabf7]"
          dangerouslySetInnerHTML={{ __html: localPost.content?.replace(/\n/g, "<br>") }}
        />
        {localPost.imgUrl?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {localPost.imgUrl.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={url}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-6 bg-[#e9ecef]" />

      <div>
        <h3 className="mb-4 flex items-center text-lg font-bold text-[#1e3a8a]">
          <MessageSquare className="mr-2 h-5 w-5 text-[#4dabf7]" />
          댓글 {comments.length}개
        </h3>

        <div className="mb-6 flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.imgUrl || '/placeholder.svg?height=96&width=96'} />
            <AvatarFallback>나</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="댓글을 작성해주세요..."
              className="mb-2 resize-none border-[#d0ebff] focus-visible:ring-[#4dabf7]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button className="ml-auto bg-[#4dabf7] text-white hover:bg-[#339af0]" onClick={handleCommentSubmit}>
              댓글 작성
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg bg-[#f8f9fa] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage src={comment.authorImage || "/placeholder.svg"} />
                    <AvatarFallback>익</AvatarFallback>
                  </Avatar>
                  <span className="mr-2 font-medium text-[#1e3a8a]">{comment.author || "익명"}</span>
                  <span className="text-xs text-[#868e96]">{comment.date || "방금 전"}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-[#495057]">
                  <ThumbsUp className="mr-1 h-3 w-3" />
                  {comment.likes || 0}
                </Button>
              </div>
              <p className="text-[#495057]">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
