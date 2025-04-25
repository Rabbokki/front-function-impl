import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Button } from "./Button"
import { Separator } from "./Separator"
import { Badge } from "./Badge"
import { Textarea } from "./Textarea"
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Train,
  Home,
  ShoppingBag,
  Coffee,
  CreditCard,
  Wifi,
  AlertCircle,
} from "lucide-react"

export function TokyoTravelTipsSimple() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(89)
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const comments = [
    {
      id: 1,
      author: "일본여행러버",
      authorImage: "/diverse-japan-street.png",
      content: "정말 유용한 정보 감사합니다! 다음 달에 도쿄 여행 갈 예정인데 많은 도움이 될 것 같아요.",
      date: "2025년 4월 18일",
      likes: 12,
    },
    {
      id: 2,
      author: "초보여행자",
      authorImage: "/abstract-profile-two.png",
      content: "스이카 카드는 어디서 구매할 수 있나요? 공항에서도 살 수 있나요?",
      date: "2025년 4월 18일",
      likes: 3,
    },
    {
      id: 3,
      author: "여행고수",
      authorImage: "/business-profile-consultation.png",
      content:
        "네, 공항에서도 구매 가능합니다! 나리타 공항이나 하네다 공항의 JR 동일본 여행 서비스 센터에서 구매할 수 있어요. 편의점이나 역에서도 구매 가능합니다.",
      date: "2025년 4월 18일",
      likes: 8,
      isAuthor: true,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-80 md:h-96">
        <Image src="/tokyo-fuji-vista.png" alt="도쿄 스카이라인" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex space-x-2 mb-2">
            {["도쿄", "일본", "꿀팁"].map((tag) => (
              <Badge key={tag} className="bg-[#4dabf7] hover:bg-[#339af0]">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            도쿄 여행 꿀팁 모음 (교통, 숙소, 쇼핑)
          </h1>
          <div className="flex items-center text-white/90">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">2025년 4월 18일</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>도쿄, 일본</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src="/diverse-travel-consultants.png" alt="여행고수" />
              <AvatarFallback>여행고수</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">여행고수</p>
              <p className="text-sm text-gray-500">여행 블로거 | 도쿄 방문 횟수: 7회</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={liked ? "text-[#ff6b6b] border-[#ff6b6b]" : ""}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {likeCount}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={bookmarked ? "text-[#ffd43b] border-[#ffd43b]" : ""}
              onClick={handleBookmark}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-lg">
            안녕하세요, 여행고수입니다! 이번에 도쿄 여행을 다녀왔는데요, 유용했던 정보들을 공유합니다. 도쿄는 처음
            방문하시는 분들에게는 복잡하게 느껴질 수 있지만, 몇 가지 팁만 알면 쉽고 즐겁게 여행할 수 있어요!
          </p>
        </div>

        <Tabs defaultValue="transportation" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="transportation" className="flex items-center">
              <Train className="h-4 w-4 mr-2" />
              교통
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              숙소
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              쇼핑
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              기타 팁
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transportation">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e3a8a]">도쿄 교통 꿀팁</CardTitle>
                <CardDescription>도쿄에서 효율적으로 이동하는 방법</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <CreditCard className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">스이카(Suica) 카드 구매하기</h3>
                      <p>
                        편의점이나 역에서 구매 가능하며, 지하철, 버스, 편의점 등에서 사용할 수 있어요. 보증금 500엔이
                        포함된 2,000엔부터 구매 가능하며, 귀국 시 반납하면 보증금을 돌려받을 수 있어요.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <Train className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">도쿄 메트로 패스</h3>
                      <p>
                        24시간(800엔), 48시간(1,200엔), 72시간(1,500엔) 패스가 있어요. 관광지를 많이 다닐 계획이라면 이
                        패스가 경제적입니다. 나리타/하네다 공항, 주요 관광 정보 센터, 도쿄 메트로 역에서 구매 가능해요.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <Train className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">야마노테선(JR)</h3>
                      <p>
                        도쿄 주요 관광지를 순환하는 노선이에요. 시부야, 신주쿠, 아키하바라 등을 쉽게 이동할 수 있습니다.
                        JR 패스가 있다면 무제한 이용 가능해요.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image src="/tokyo-metro-network.png" alt="도쿄 메트로 지도" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/suica-tokyo-commute.png"
                      alt="스이카 카드와 도쿄 전철"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="bg-[#fff9db] p-4 rounded-lg border border-[#ffd43b]">
                  <h4 className="font-medium flex items-center mb-2">
                    <AlertCircle className="h-4 w-4 text-[#f59f00] mr-2" />
                    알아두면 좋은 교통 팁
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>출퇴근 시간(7:30-9:30, 17:30-19:30)에는 전철이 매우 혼잡하니 가능하면 피하세요.</li>
                    <li>구글 맵이나 일본 지하철 앱(Japan Transit Planner)을 활용하면 길 찾기가 쉬워요.</li>
                    <li>택시는 비싸지만, 늦은 밤이나 짐이 많을 때 편리해요. 기본요금은 약 410엔부터 시작합니다.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accommodation">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e3a8a]">도쿄 숙소 추천</CardTitle>
                <CardDescription>지역별 숙소 추천 및 예약 팁</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">신주쿠/시부야</h3>
                      <p>
                        번화가에 위치해 있어 교통이 편리하고 쇼핑하기 좋아요. 젊은 분위기와 활기찬 나이트라이프를 즐길
                        수 있습니다. 호텔 가격대는 중간~높은 편이에요.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        추천 호텔: 신주쿠 그랜드 호텔, 시부야 스트림 엑셀 호텔 도쿄
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">우에노/아사쿠사</h3>
                      <p>
                        전통적인 분위기를 느끼고 싶다면 추천해요. 우에노 공원과 아사쿠사 센소지 사원 등 관광지가
                        가까워요. 호텔 가격대는 비교적 저렴한 편입니다.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        추천 호텔: 리치몬드 호텔 프리미어 아사쿠사 인터내셔널, 미츠이 가든 호텔 우에노
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">도쿄역/긴자</h3>
                      <p>
                        고급 호텔이 많고 쇼핑하기 좋아요. 도쿄역에서 신칸센 등 다른 지역으로 이동하기 편리합니다. 호텔
                        가격대는 높은 편이에요.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        추천 호텔: 포시즌스 호텔 도쿄 마루노우치, 도쿄 스테이션 호텔
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image src="/shinjuku-cityscape-view.png" alt="신주쿠 호텔 객실" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                      <p className="text-white text-sm">신주쿠 호텔 객실</p>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image src="/asakusa-ryokan-tranquility.png" alt="아사쿠사 전통 료칸" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                      <p className="text-white text-sm">아사쿠사 전통 료칸</p>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=Ginza Luxury Hotel"
                      alt="긴자 럭셔리 호텔"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                      <p className="text-white text-sm">긴자 럭셔리 호텔</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shopping">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e3a8a]">도쿄 쇼핑 가이드</CardTitle>
                <CardDescription>쇼핑 명소 및 쇼핑 팁</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <ShoppingBag className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">돈키호테</h3>
                      <p>
                        화장품, 과자, 전자제품 등 다양한 상품을 저렴하게 구매할 수 있어요. 24시간 운영하는 매장도 많아
                        늦은 시간에도 쇼핑이 가능합니다. 시부야, 신주쿠 등 주요 지역에 위치해 있어요.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <ShoppingBag className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">다이소</h3>
                      <p>
                        100엔 숍으로 저렴한 기념품이나 생활용품을 구매하기 좋아요. 품질이 좋은 제품이 많아 실용적인
                        선물을 찾는다면 추천합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <ShoppingBag className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">아키하바라</h3>
                      <p>
                        전자제품, 애니메이션 관련 상품을 구매하기 좋아요. 면세점도 많아 외국인 관광객에게 인기가
                        많습니다. 오타쿠 문화의 중심지로 애니메이션 팬이라면 꼭 방문해보세요.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=Don Quijote Tokyo Shopping"
                      alt="돈키호테 쇼핑"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=Akihabara Electronics District"
                      alt="아키하바라 전자상가"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e3a8a]">기타 유용한 팁</CardTitle>
                <CardDescription>도쿄 여행을 더 즐겁게 만들어줄 팁</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <Wifi className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">포켓 와이파이 대여</h3>
                      <p>
                        공항에서 대여하면 편리해요. 사전에 온라인으로 예약하면 더 저렴하게 이용할 수 있어요. 일본
                        전역에서 인터넷을 사용할 수 있어 길 찾기나 정보 검색에 유용합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <Coffee className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">화장실 찾기</h3>
                      <p>
                        편의점, 백화점, 지하철역에 깨끗한 화장실이 많아요. 대부분 무료이며 화장지도 구비되어 있습니다.
                        카페나 패스트푸드점의 화장실은 고객만 이용 가능한 경우가 많아요.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#e7f5ff] p-2 rounded-full mr-4 mt-1">
                      <CreditCard className="h-5 w-5 text-[#4dabf7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">현금 준비</h3>
                      <p>
                        일본은 아직 현금 사용이 많은 나라예요. 특히 작은 가게나 식당에서는 카드를 받지 않는 곳이 많으니
                        현금을 충분히 준비하세요. 세븐일레븐, 패밀리마트 등 편의점 ATM에서 외국 카드로 현금 인출이
                        가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-[#4dabf7]" />
            댓글 ({comments.length})
          </h3>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.authorImage || "/placeholder.svg"} alt={comment.author} />
                  <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">{comment.author}</span>
                    {comment.isAuthor && (
                      <Badge variant="outline" className="text-xs border-[#4dabf7] text-[#4dabf7]">
                        작성자
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      좋아요 {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      답글 달기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-3">댓글 작성</h4>
            <Textarea
              placeholder="댓글을 입력하세요..."
              className="mb-3 min-h-[100px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button className="bg-[#4dabf7] hover:bg-[#339af0]">댓글 등록</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">관련 게시글</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=Japan Travel Guide"
                  alt="일본 여행 가이드"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">일본 여행 필수 앱 10가지</CardTitle>
                <CardDescription className="text-xs">여행고수 • 2025.04.10</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=Tokyo Food Guide"
                  alt="도쿄 음식 가이드"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">도쿄 맛집 지도 (현지인 추천)</CardTitle>
                <CardDescription className="text-xs">맛집탐험가 • 2025.04.15</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}