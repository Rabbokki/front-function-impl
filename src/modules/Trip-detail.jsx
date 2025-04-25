import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Clock,
  Plane,
  Hotel,
  Utensils,
  Camera,
  DollarSign,
  FileText,
  Share2,
  Edit,
  Trash2,
  ArrowLeft,
  CheckSquare,
  Square,
  Plus,
} from "lucide-react"
import { Button } from "./Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Badge } from "./Badge"
import { Progress } from "./Progress"
import { Input } from "./Input"

// 여행 데이터 (실제로는 API에서 가져올 것)
const tripData = {
  "1": {
    id: 1,
    title: "도쿄 3박 4일",
    date: "2025.05.15 - 2025.05.18",
    status: "예정",
    image: "도쿄",
    color: "#ff6b6b",
    description: "일본 도쿄 여행. 스카이트리, 디즈니랜드, 아사쿠사 등 방문 예정",
    progress: 75,
    location: "도쿄, 일본",
    transportation: "비행기",
    accommodation: "호텔 미라코스타",
    budget: {
      total: 1500000,
      spent: 650000,
      categories: {
        transportation: 450000,
        accommodation: 350000,
        food: 200000,
        activities: 300000,
        shopping: 150000,
        others: 50000,
      },
    },
    itinerary: [
      {
        day: 1,
        date: "2025.05.15",
        title: "도착 및 시내 관광",
        activities: [
          { time: "09:00", title: "인천공항 출발", type: "transportation", completed: true },
          { time: "11:30", title: "하네다 공항 도착", type: "transportation", completed: true },
          { time: "14:00", title: "호텔 체크인", type: "accommodation", completed: false },
          { time: "16:00", title: "시부야 스크램블 교차로", type: "sightseeing", completed: false },
          { time: "19:00", title: "이치란 라멘", type: "food", completed: false },
        ],
      },
      {
        day: 2,
        date: "2025.05.16",
        title: "도쿄 디즈니랜드",
        activities: [
          { time: "08:00", title: "호텔 조식", type: "food", completed: false },
          { time: "10:00", title: "디즈니랜드 입장", type: "activity", completed: false },
          { time: "13:00", title: "파크 내 점심", type: "food", completed: false },
          { time: "20:00", title: "디즈니랜드 퍼레이드", type: "activity", completed: false },
          { time: "22:00", title: "호텔 복귀", type: "transportation", completed: false },
        ],
      },
      {
        day: 3,
        date: "2025.05.17",
        title: "도쿄 시내 관광",
        activities: [
          { time: "09:00", title: "아사쿠사 센소지", type: "sightseeing", completed: false },
          { time: "12:00", title: "스카이트리 방문", type: "sightseeing", completed: false },
          { time: "15:00", title: "아키하바라 쇼핑", type: "shopping", completed: false },
          { time: "19:00", title: "신주쿠 이자카야", type: "food", completed: false },
        ],
      },
      {
        day: 4,
        date: "2025.05.18",
        title: "귀국",
        activities: [
          { time: "10:00", title: "호텔 체크아웃", type: "accommodation", completed: false },
          { time: "12:00", title: "하네다 공항 도착", type: "transportation", completed: false },
          { time: "14:30", title: "하네다 공항 출발", type: "transportation", completed: false },
          { time: "17:00", title: "인천공항 도착", type: "transportation", completed: false },
        ],
      },
    ],
    notes: [
      { id: 1, content: "여권 만료일 확인하기", completed: true },
      { id: 2, content: "환전하기 (50만원)", completed: true },
      { id: 3, content: "디즈니랜드 티켓 예약", completed: false },
      { id: 4, content: "포켓 와이파이 대여", completed: false },
      { id: 5, content: "어댑터 챙기기", completed: false },
    ],
    places: [
      { id: 1, name: "도쿄 스카이트리", category: "명소", address: "도쿄도 스미다구" },
      { id: 2, name: "도쿄 디즈니랜드", category: "테마파크", address: "치바현 우라야스시" },
      { id: 3, name: "센소지", category: "명소", address: "도쿄도 다이토구 아사쿠사" },
      { id: 4, name: "이치란 라멘", category: "맛집", address: "도쿄도 시부야구" },
      { id: 5, name: "아키하바라", category: "쇼핑", address: "도쿄도 치요다구" },
    ],
  },
  "2": {
    id: 2,
    title: "제주도 가족여행",
    date: "2025.03.10 - 2025.03.13",
    status: "완료",
    image: "제주도",
    color: "#51cf66",
    description: "가족과 함께하는 제주도 여행. 한라산, 성산일출봉, 우도 등 방문",
    progress: 100,
    location: "제주도, 한국",
    transportation: "비행기",
    accommodation: "제주 신라 호텔",
    budget: {
      total: 1200000,
      spent: 1200000,
      categories: {
        transportation: 400000,
        accommodation: 450000,
        food: 150000,
        activities: 100000,
        shopping: 50000,
        others: 50000,
      },
    },
    itinerary: [
      {
        day: 1,
        date: "2025.03.10",
        title: "도착 및 동부 관광",
        activities: [
          { time: "08:00", title: "김포공항 출발", type: "transportation", completed: true },
          { time: "09:20", title: "제주공항 도착", type: "transportation", completed: true },
          { time: "10:30", title: "렌터카 수령", type: "transportation", completed: true },
          { time: "12:00", title: "성산일출봉", type: "sightseeing", completed: true },
          { time: "15:00", title: "우도 방문", type: "sightseeing", completed: true },
          { time: "18:00", title: "호텔 체크인", type: "accommodation", completed: true },
        ],
      },
      {
        day: 2,
        date: "2025.03.11",
        title: "한라산 등반",
        activities: [
          { time: "07:00", title: "호텔 조식", type: "food", completed: true },
          { time: "09:00", title: "한라산 등반 시작", type: "activity", completed: true },
          { time: "12:00", title: "백록담 도착", type: "activity", completed: true },
          { time: "16:00", title: "하산 완료", type: "activity", completed: true },
          { time: "19:00", title: "흑돼지 저녁", type: "food", completed: true },
        ],
      },
      {
        day: 3,
        date: "2025.03.12",
        title: "서부 관광",
        activities: [
          { time: "09:00", title: "협재 해변", type: "sightseeing", completed: true },
          { time: "12:00", title: "오설록 티 뮤지엄", type: "sightseeing", completed: true },
          { time: "15:00", title: "카페 투어", type: "activity", completed: true },
          { time: "19:00", title: "제주 해산물 저녁", type: "food", completed: true },
        ],
      },
      {
        day: 4,
        date: "2025.03.13",
        title: "귀국",
        activities: [
          { time: "10:00", title: "호텔 체크아웃", type: "accommodation", completed: true },
          { time: "11:00", title: "렌터카 반납", type: "transportation", completed: true },
          { time: "13:00", title: "제주공항 도착", type: "transportation", completed: true },
          { time: "14:30", title: "제주공항 출발", type: "transportation", completed: true },
          { time: "15:50", title: "김포공항 도착", type: "transportation", completed: true },
        ],
      },
    ],
    notes: [
      { id: 1, content: "렌터카 예약 확인", completed: true },
      { id: 2, content: "한라산 등반 장비 준비", completed: true },
      { id: 3, content: "우도 페리 시간 확인", completed: true },
      { id: 4, content: "제주 특산품 구매 목록 작성", completed: true },
    ],
    places: [
      { id: 1, name: "성산일출봉", category: "명소", address: "제주특별자치도 서귀포시 성산읍" },
      { id: 2, name: "우도", category: "명소", address: "제주특별자치도 제주시 우도면" },
      { id: 3, name: "한라산", category: "자연", address: "제주특별자치도 제주시" },
      { id: 4, name: "협재 해변", category: "해변", address: "제주특별자치도 제주시 한림읍" },
      { id: 5, name: "오설록 티 뮤지엄", category: "관광", address: "제주특별자치도 서귀포시 안덕면" },
    ],
  },
  "3": {
    id: 3,
    title: "방콕 5일",
    date: "2024.12.24 - 2024.12.28",
    status: "완료",
    image: "방콕",
    color: "#ffd43b",
    description: "태국 방콕 여행. 왕궁, 카오산로드, 짜뚜짝 시장 등 방문",
    progress: 100,
    location: "방콕, 태국",
    transportation: "비행기",
    accommodation: "방콕 매리어트 호텔",
    budget: {
      total: 1000000,
      spent: 950000,
      categories: {
        transportation: 350000,
        accommodation: 300000,
        food: 100000,
        activities: 100000,
        shopping: 80000,
        others: 20000,
      },
    },
    itinerary: [
      {
        day: 1,
        date: "2024.12.24",
        title: "도착 및 시내 관광",
        activities: [
          { time: "10:00", title: "인천공항 출발", type: "transportation", completed: true },
          { time: "14:00", title: "수완나품 공항 도착", type: "transportation", completed: true },
          { time: "16:00", title: "호텔 체크인", type: "accommodation", completed: true },
          { time: "18:00", title: "카오산로드 방문", type: "sightseeing", completed: true },
        ],
      },
      {
        day: 2,
        date: "2024.12.25",
        title: "방콕 왕궁 관광",
        activities: [
          { time: "08:00", title: "호텔 조식", type: "food", completed: true },
          { time: "10:00", title: "왕궁 및 에메랄드 사원", type: "sightseeing", completed: true },
          { time: "14:00", title: "왓포 사원", type: "sightseeing", completed: true },
          { time: "17:00", title: "차오프라야 강 디너 크루즈", type: "activity", completed: true },
        ],
      },
      {
        day: 3,
        date: "2024.12.26",
        title: "쇼핑 및 마사지",
        activities: [
          { time: "09:00", title: "짜뚜짝 시장", type: "shopping", completed: true },
          { time: "13:00", title: "씨암 파라곤", type: "shopping", completed: true },
          { time: "16:00", title: "태국 전통 마사지", type: "activity", completed: true },
          { time: "19:00", title: "팟타이 저녁", type: "food", completed: true },
        ],
      },
      {
        day: 4,
        date: "2024.12.27",
        title: "아유타야 당일치기",
        activities: [
          { time: "07:00", title: "아유타야 출발", type: "transportation", completed: true },
          { time: "09:00", title: "아유타야 유적지 관광", type: "sightseeing", completed: true },
          { time: "13:00", title: "현지 점심", type: "food", completed: true },
          { time: "17:00", title: "방콕 복귀", type: "transportation", completed: true },
        ],
      },
      {
        day: 5,
        date: "2024.12.28",
        title: "귀국",
        activities: [
          { time: "09:00", title: "호텔 체크아웃", type: "accommodation", completed: true },
          { time: "11:00", title: "수완나품 공항 도착", type: "transportation", completed: true },
          { time: "13:30", title: "수완나품 공항 출발", type: "transportation", completed: true },
          { time: "21:00", title: "인천공항 도착", type: "transportation", completed: true },
        ],
      },
    ],
    notes: [
      { id: 1, content: "비자 확인", completed: true },
      { id: 2, content: "환전하기 (30만원)", completed: true },
      { id: 3, content: "왕궁 방문 시 복장 확인", completed: true },
      { id: 4, content: "짜뚜짝 시장 지도 다운로드", completed: true },
    ],
    places: [
      { id: 1, name: "방콕 왕궁", category: "명소", address: "방콕 프라나콘 구역" },
      { id: 2, name: "왓포 사원", category: "명소", address: "방콕 프라나콘 구역" },
      { id: 3, name: "짜뚜짝 시장", category: "쇼핑", address: "방콕 짜뚜짝 구역" },
      { id: 4, name: "카오산로드", category: "명소", address: "방콕 프라나콘 구역" },
      { id: 5, name: "아유타야 유적지", category: "명소", address: "아유타야 주" },
    ],
  },
}

// 활동 유형에 따른 아이콘 및 색상
const activityIcons = {
  transportation: { icon: Plane, color: "#4dabf7" },
  accommodation: { icon: Hotel, color: "#9775fa" },
  food: { icon: Utensils, color: "#ffa94d" },
  sightseeing: { icon: Camera, color: "#51cf66" },
  activity: { icon: Clock, color: "#ff6b6b" },
  shopping: { icon: DollarSign, color: "#ffd43b" },
}

export function TripDetail({ tripId }) {
  const [trip, setTrip] = useState(null)
  const [activeTab, setActiveTab] = useState("itinerary")
  const [newNote, setNewNote] = useState("")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 것
    setTrip(tripData[tripId])
  }, [tripId])

  const toggleNoteStatus = (noteId) => {
    if (!trip) return

    setTrip({
      ...trip,
      notes: trip.notes.map((note) => (note.id === noteId ? { ...note, completed: !note.completed } : note)),
    })
  }

  const addNewNote = () => {
    if (!newNote.trim() || !trip) return

    const newNoteObj = {
      id: Math.max(0, ...trip.notes.map((n) => n.id)) + 1,
      content: newNote,
      completed: false,
    }

    setTrip({
      ...trip,
      notes: [...trip.notes, newNoteObj],
    })

    setNewNote("")
  }

  const toggleActivityStatus = (dayIndex, activityIndex) => {
    if (!trip) return

    const updatedItinerary = [...trip.itinerary]
    const day = updatedItinerary[dayIndex]
    const updatedActivities = [...day.activities]
    updatedActivities[activityIndex] = {
      ...updatedActivities[activityIndex],
      completed: !updatedActivities[activityIndex].completed,
    }

    updatedItinerary[dayIndex] = {
      ...day,
      activities: updatedActivities,
    }

    setTrip({
      ...trip,
      itinerary: updatedItinerary,
    })
  }

  if (!trip) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl bg-white p-6 shadow-md">
        <p className="text-lg text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    )
  }

  // 예산 사용 비율 계산
  const budgetUsagePercent = Math.round((trip.budget.spent / trip.budget.total) * 100)

  return (
    <div className="space-y-6">
      {/* 상단 헤더 및 기본 정보 */}
      <div className="flex flex-col rounded-xl bg-white p-6 shadow-md md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="mb-4 flex items-center">
            <Link href="/mypage" className="mr-2 inline-flex items-center text-[#4dabf7] hover:text-[#1c7ed6]">
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>마이페이지로 돌아가기</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div
              className="mr-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: trip.color + "20" }}
            >
              <svg viewBox="0 0 100 100" className="h-10 w-10">
                {trip.image === "도쿄" && (
                  <>
                    <path d="M50,80 L30,40 L70,40 Z" fill={trip.color} />
                    <rect x="45" y="20" width="10" height="20" fill={trip.color} />
                  </>
                )}
                {trip.image === "제주도" && (
                  <>
                    <path
                      d="M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C30,80 20,70 20,50 C20,40 30,20 50,20 Z"
                      fill={trip.color}
                    />
                    <path d="M50,30 L55,45 L70,45 L60,55 L65,70 L50,60 L35,70 L40,55 L30,45 L45,45 Z" fill="#ffd43b" />
                  </>
                )}
                {trip.image === "방콕" && (
                  <>
                    <path d="M50,20 L65,40 L60,65 L40,65 L35,40 Z" fill={trip.color} />
                    <path d="M40,65 L60,65 L55,80 L45,80 Z" fill={trip.color} />
                  </>
                )}
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e3a8a]">{trip.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <div className="flex items-center text-sm text-[#495057]">
                  <Calendar className="mr-1 h-4 w-4 text-[#4dabf7]" />
                  <span>{trip.date}</span>
                </div>
                <div className="flex items-center text-sm text-[#495057]">
                  <MapPin className="mr-1 h-4 w-4 text-[#4dabf7]" />
                  <span>{trip.location}</span>
                </div>
                <Badge className={`${trip.status === "예정" ? "bg-[#4dabf7]" : "bg-[#adb5bd]"} text-white`}>
                  {trip.status}
                </Badge>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[#495057]">{trip.description}</p>

          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <p className="text-sm font-medium text-[#1e3a8a]">교통편</p>
              <div className="mt-1 flex items-center">
                <Plane className="mr-1 h-4 w-4 text-[#4dabf7]" />
                <span className="text-[#495057]">{trip.transportation}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#1e3a8a]">숙소</p>
              <div className="mt-1 flex items-center">
                <Hotel className="mr-1 h-4 w-4 text-[#4dabf7]" />
                <span className="text-[#495057]">{trip.accommodation}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#1e3a8a]">준비 상태</p>
              <div className="mt-1 flex items-center">
                <Progress value={trip.progress} className="h-2 w-32 bg-[#e7f5ff]" indicatorClassName="bg-[#4dabf7]" />
                <span className="ml-2 text-xs text-[#495057]">{trip.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2 md:mt-0">
          <Button
            variant="outline"
            className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
            onClick={() => setEditMode(!editMode)}
          >
            <Edit className="mr-1 h-4 w-4" />
            {editMode ? "보기 모드" : "수정하기"}
          </Button>
          <Button variant="outline" className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#fff5f5]">
            <Trash2 className="mr-1 h-4 w-4" />
            삭제하기
          </Button>
          <Button variant="outline" className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]">
            <Share2 className="mr-1 h-4 w-4" />
            공유하기
          </Button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="itinerary" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
          <TabsTrigger value="itinerary" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            일정
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            예산
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            메모
          </TabsTrigger>
          <TabsTrigger value="places" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            장소
          </TabsTrigger>
        </TabsList>

        {/* 일정 탭 */}
        <TabsContent value="itinerary">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1e3a8a]">여행 일정</h3>
              {editMode && (
                <Button size="sm" className="bg-[#4dabf7] hover:bg-[#1c7ed6]">
                  <Plus className="mr-1 h-4 w-4" />
                  일정 추가
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {trip.itinerary.map((day, dayIndex) => (
                <Card key={dayIndex} className="overflow-hidden bg-[#f8f9fa]">
                  <CardHeader className="bg-[#e7f5ff]/50 pb-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-[#4dabf7]">Day {day.day}</Badge>
                        <CardTitle className="text-lg text-[#1e3a8a]">{day.title}</CardTitle>
                      </div>
                      <div className="text-sm text-[#495057]">{day.date}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {day.activities.map((activity, activityIndex) => {
                        const ActivityIcon = activityIcons[activity.type]?.icon || Clock
                        const activityColor = activityIcons[activity.type]?.color || "#4dabf7"

                        return (
                          <div
                            key={activityIndex}
                            className={`flex items-start rounded-lg p-2 ${
                              activity.completed ? "bg-[#e7f5ff]/30" : "bg-white"
                            }`}
                          >
                            {editMode ? (
                              <div
                                className="mr-2 cursor-pointer"
                                onClick={() => toggleActivityStatus(dayIndex, activityIndex)}
                              >
                                {activity.completed ? (
                                  <CheckSquare className="h-5 w-5 text-[#4dabf7]" />
                                ) : (
                                  <Square className="h-5 w-5 text-[#adb5bd]" />
                                )}
                              </div>
                            ) : (
                              <div
                                className="mr-2 flex h-6 w-6 items-center justify-center rounded-full"
                                style={{ backgroundColor: activityColor + "20" }}
                              >
                                <ActivityIcon className="h-3 w-3" style={{ color: activityColor }} />
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-[#1e3a8a]">{activity.time}</span>
                                <span className="mx-2 text-[#adb5bd]">•</span>
                                <span
                                  className={`${activity.completed ? "text-[#adb5bd] line-through" : "text-[#495057]"}`}
                                >
                                  {activity.title}
                                </span>
                              </div>

                              <div className="mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-xs"
                                  style={{
                                    borderColor: activityColor,
                                    color: activityColor,
                                  }}
                                >
                                  {activity.type}
                                </Badge>
                              </div>
                            </div>

                            {editMode && (
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4 text-[#495057]" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Trash2 className="h-4 w-4 text-[#ff6b6b]" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                  {editMode && (
                    <CardFooter className="flex justify-center bg-[#f8f9fa] p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed border-[#4dabf7] text-[#4dabf7] hover:bg-[#e7f5ff]"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        활동 추가
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* 예산 탭 */}
        <TabsContent value="budget">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1e3a8a]">여행 예산</h3>
              {editMode && (
                <Button size="sm" className="bg-[#4dabf7] hover:bg-[#1c7ed6]">
                  <Edit className="mr-1 h-4 w-4" />
                  예산 수정
                </Button>
              )}
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <Card className="bg-[#f8f9fa]">
                <CardContent className="p-4">
                  <div className="text-sm text-[#495057]">총 예산</div>
                  <div className="mt-1 text-2xl font-bold text-[#1e3a8a]">{trip.budget.total.toLocaleString()}원</div>
                </CardContent>
              </Card>

              <Card className="bg-[#f8f9fa]">
                <CardContent className="p-4">
                  <div className="text-sm text-[#495057]">사용 금액</div>
                  <div className="mt-1 text-2xl font-bold text-[#1e3a8a]">{trip.budget.spent.toLocaleString()}원</div>
                </CardContent>
              </Card>

              <Card className="bg-[#f8f9fa]">
                <CardContent className="p-4">
                  <div className="text-sm text-[#495057]">남은 금액</div>
                  <div className="mt-1 text-2xl font-bold text-[#1e3a8a]">
                    {(trip.budget.total - trip.budget.spent).toLocaleString()}원
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#495057]">예산 사용 현황</span>
                <span className="text-sm text-[#495057]">{budgetUsagePercent}%</span>
              </div>
              <Progress
                value={budgetUsagePercent}
                className="h-2 bg-[#e7f5ff]"
                indicatorClassName={`${
                  budgetUsagePercent > 90 ? "bg-[#ff6b6b]" : budgetUsagePercent > 70 ? "bg-[#ffd43b]" : "bg-[#4dabf7]"
                }`}
              />
            </div>

            <div className="mt-8">
              <h4 className="mb-4 text-lg font-medium text-[#1e3a8a]">카테고리별 지출</h4>
              <div className="space-y-4">
                {Object.entries(trip.budget.categories).map(([category, amount]) => {
                  const percentage = Math.round((amount / trip.budget.total) * 100)
                  let categoryName = ""
                  let categoryIcon = null

                  switch (category) {
                    case "transportation":
                      categoryName = "교통"
                      categoryIcon = <Plane className="h-4 w-4 text-[#4dabf7]" />
                      break
                    case "accommodation":
                      categoryName = "숙박"
                      categoryIcon = <Hotel className="h-4 w-4 text-[#9775fa]" />
                      break
                    case "food":
                      categoryName = "식비"
                      categoryIcon = <Utensils className="h-4 w-4 text-[#ffa94d]" />
                      break
                    case "activities":
                      categoryName = "액티비티"
                      categoryIcon = <Camera className="h-4 w-4 text-[#51cf66]" />
                      break
                    case "shopping":
                      categoryName = "쇼핑"
                      categoryIcon = <DollarSign className="h-4 w-4 text-[#ffd43b]" />
                      break
                    case "others":
                      categoryName = "기타"
                      categoryIcon = <FileText className="h-4 w-4 text-[#adb5bd]" />
                      break
                  }

                  return (
                    <div key={category}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center">
                          {categoryIcon}
                          <span className="ml-2 text-sm font-medium text-[#495057]">{categoryName}</span>
                        </div>
                        <div className="text-sm text-[#495057]">
                          {amount.toLocaleString()}원 ({percentage}%)
                        </div>
                      </div>
                      <Progress
                        value={percentage}
                        className="h-1.5 bg-[#e7f5ff]"
                        indicatorClassName={`${
                          category === "transportation"
                            ? "bg-[#4dabf7]"
                            : category === "accommodation"
                              ? "bg-[#9775fa]"
                              : category === "food"
                                ? "bg-[#ffa94d]"
                                : category === "activities"
                                  ? "bg-[#51cf66]"
                                  : category === "shopping"
                                    ? "bg-[#ffd43b]"
                                    : "bg-[#adb5bd]"
                        }`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 메모 탭 */}
        <TabsContent value="notes">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1e3a8a]">메모 및 체크리스트</h3>
            </div>

            {editMode && (
              <div className="mb-6 flex items-center space-x-2">
                <Input
                  placeholder="새 메모 추가..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="bg-[#f8f9fa]"
                />
                <Button onClick={addNewNote} className="bg-[#4dabf7] hover:bg-[#1c7ed6]">
                  추가
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {trip.notes.map((note) => (
                <div
                  key={note.id}
                  className={`flex items-center rounded-lg border p-3 ${
                    note.completed ? "border-[#e7f5ff] bg-[#e7f5ff]/20" : "border-[#dee2e6] bg-white"
                  }`}
                >
                  <div className="mr-3 cursor-pointer" onClick={() => editMode && toggleNoteStatus(note.id)}>
                    {note.completed ? (
                      <CheckSquare className="h-5 w-5 text-[#4dabf7]" />
                    ) : (
                      <Square className="h-5 w-5 text-[#adb5bd]" />
                    )}
                  </div>
                  <span className={`flex-1 ${note.completed ? "text-[#adb5bd] line-through" : "text-[#495057]"}`}>
                    {note.content}
                  </span>
                  {editMode && (
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-[#495057]" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-[#ff6b6b]" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {trip.notes.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#dee2e6] p-4">
                <p className="text-[#adb5bd]">메모가 없습니다</p>
                {editMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#4dabf7] text-[#4dabf7] hover:bg-[#e7f5ff]"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    메모 추가
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* 장소 탭 */}
        <TabsContent value="places">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1e3a8a]">방문 장소</h3>
              {editMode && (
                <Button size="sm" className="bg-[#4dabf7] hover:bg-[#1c7ed6]">
                  <Plus className="mr-1 h-4 w-4" />
                  장소 추가
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trip.places.map((place) => (
                <Card key={place.id} className="overflow-hidden bg-[#f8f9fa]">
                  <CardHeader className="pb-2 pt-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base text-[#1e3a8a]">{place.name}</CardTitle>
                      <Badge
                        className={`
                          ${
                            place.category === "명소"
                              ? "bg-[#ff6b6b]"
                              : place.category === "맛집"
                                ? "bg-[#ffd43b]"
                                : place.category === "쇼핑"
                                  ? "bg-[#4dabf7]"
                                  : place.category === "자연"
                                    ? "bg-[#51cf66]"
                                    : place.category === "테마파크"
                                      ? "bg-[#9775fa]"
                                      : place.category === "해변"
                                        ? "bg-[#4dabf7]"
                                        : place.category === "관광"
                                          ? "bg-[#ffa94d]"
                                          : "bg-[#adb5bd]"
                          } text-white
                        `}
                      >
                        {place.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 pt-1">
                    <div className="flex items-center text-sm text-[#495057]">
                      <MapPin className="mr-1 h-3 w-3 text-[#4dabf7]" />
                      <span>{place.address}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-[#e7f5ff]/30 p-2">
                    <Button size="sm" variant="ghost" className="text-[#4dabf7] hover:bg-[#e7f5ff]">
                      상세정보
                    </Button>
                    {editMode && (
                      <Button size="sm" variant="ghost" className="text-[#ff6b6b] hover:bg-[#fff5f5]">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}