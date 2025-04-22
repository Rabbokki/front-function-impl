
import { useState } from "react"
import { Search, MessageSquare, ThumbsUp, Eye, Clock, User, Users } from "lucide-react"
import { Button } from"../modules/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../modules/Tabs"
import { Input } from "../modules/Input"
import { Card, CardFooter, CardHeader, CardTitle } from "../modules/Card"
import { Badge } from "../modules/Badge"

export function CommunityContent() {
  const [activeTab, setActiveTab] = useState("tips")

  const tipPosts = [/* 생략 */]
  const freePosts = [/* 생략 */]
  const travelMatePosts = [/* 생략 */]

  const getPostsByTab = () => {
    switch (activeTab) {
      case "tips": return tipPosts
      case "free": return freePosts
      case "mate": return travelMatePosts
      default: return tipPosts
    }
  }

  const renderPosts = () =>
    getPostsByTab().map((post) => (
      <Card key={post.id} className="overflow-hidden bg-[#f8f9fa] hover:bg-[#e7f5ff]/20">
        <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: post.color }}></div>
        <CardHeader className="pb-2 pl-6 pt-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg text-[#1e3a8a]">{post.title}</CardTitle>
            <div className="flex space-x-1">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#d0ebff]">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex items-center justify-between pb-4 pl-6 pt-2 text-sm text-[#495057]">
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3 text-[#4dabf7]" /><span className="mr-3">{post.author}</span>
            <Clock className="mr-1 h-3 w-3 text-[#4dabf7]" /><span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center"><Eye className="mr-1 h-3 w-3 text-[#4dabf7]" /><span>{post.views}</span></div>
            <div className="flex items-center"><ThumbsUp className="mr-1 h-3 w-3 text-[#4dabf7]" /><span>{post.likes}</span></div>
            <div className="flex items-center">
              {activeTab === "mate" ? (
                <>
                  <Users className="mr-1 h-3 w-3 text-[#4dabf7]" /><span>{post.comments}</span>
                </>
              ) : (
                <>
                  <MessageSquare className="mr-1 h-3 w-3 text-[#4dabf7]" /><span>{post.comments}</span>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    ))

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Input placeholder="검색어를 입력하세요" className="bg-[#f8f9fa] pl-10" />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
        </div>
        <Button className="ml-4 bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">글쓰기</Button>
      </div>

      <Tabs defaultValue="tips" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3 bg-[#e7f5ff]">
          <TabsTrigger value="tips" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">꿀팁 게시판</TabsTrigger>
          <TabsTrigger value="free" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">자유게시판</TabsTrigger>
          <TabsTrigger value="mate" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">여행메이트</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="space-y-4">{renderPosts()}</div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={page === 1 ? "bg-[#4dabf7] text-white hover:bg-[#339af0]" : "border-[#d0ebff] text-[#4dabf7]"}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
