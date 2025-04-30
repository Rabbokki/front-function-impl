import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  ArrowLeft, ThumbsUp, MessageSquare, Share2, Clock, Eye,
} from "lucide-react"
import { Button } from "./Button"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Separator } from "./Separator"
import { Badge } from "./Badge"
import { Textarea } from "./Textarea"

export function CommunityPostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  // 게시글 및 댓글 불러오기
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          axios.get(`/api/posts/find/${postId}`),  // 게시글 조회
          axios.get(`/api/comments/${postId}`)    // 댓글 조회
        ])
        setPost(postRes.data) // 게시글 데이터 설정
        setComments(commentRes.data) // 댓글 데이터 설정
      } catch (err) {
        console.error("데이터 조회 실패:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPostAndComments() // 호출
  }, [postId])

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    try {
      const res = await axios.post(`/api/comments`, {
        postId,
        content: newComment
      })
      setComments([...comments, res.data]) // 댓글 목록에 새 댓글 추가
      setNewComment("") // 입력창 비우기
    } catch (err) {
      console.error("댓글 작성 실패:", err)
    }
  }

  // 좋아요 처리
  const handleLike = async () => {
    setLiked(!liked)
    try {
      const res = await axios.post(`/api/posts/${postId}/like`) // 좋아요 처리 요청
      setPost({
        ...post,
        likeCount: liked ? post.likeCount - 1 : post.likeCount + 1 // 좋아요 수 업데이트
      })
    } catch (err) {
      console.error("좋아요 처리 실패:", err)
    }
  }

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4dabf7] border-t-transparent"></div>
      </div>
    )
  }

  // 게시글이 없는 경우
  if (!post) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-[#1e3a8a]">게시글을 찾을 수 없습니다</h2>
        <p className="mb-6 text-[#495057]">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
        <Button onClick={() => navigate("/community")} className="bg-[#4dabf7] text-white hover:bg-[#339af0]">
          커뮤니티로 돌아가기
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-2 text-[#495057]" onClick={() => navigate("/community")}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          목록으로
        </Button>
        <div className="ml-auto flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`${liked ? "bg-[#4dabf7] text-white" : "text-[#495057]"}`}
            onClick={handleLike}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            좋아요 {post.likeCount}
          </Button>
          <Button variant="outline" size="sm" className="text-[#495057]">
            <Share2 className="mr-1 h-4 w-4" />
            공유하기
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#d0ebff]">{tag}</Badge>
          ))}
        </div>
        <h1 className="mb-2 text-2xl font-bold text-[#1e3a8a]">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-[#495057]">
          <div className="flex items-center">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage src={"/placeholder.svg"} />
              <AvatarFallback>익</AvatarFallback>
            </Avatar>
            <span className="mr-3">작성자</span>
            <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3 text-[#4dabf7]" />
            <span>{post.views}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4 bg-[#e9ecef]" />

      <div className="mb-8">
        <div
          className="prose max-w-none prose-headings:text-[#1e3a8a] prose-a:text-[#4dabf7]"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }}
        />
        {post.imgUrl?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {post.imgUrl.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={img}
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
            <AvatarImage src="/abstract-profile-two.png" />
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
  )
}
