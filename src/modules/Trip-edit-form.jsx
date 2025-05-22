import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  Plane,
  Hotel,
  FileText,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Clock,
  DollarSign,
  Utensils,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format, parse } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 여행 데이터 (실제로는 API에서 가져올 것)
export const tripData = {
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

// 활동 유형 옵션
const activityTypes = [
  { value: "transportation", label: "교통", color: "#4dabf7" },
  { value: "accommodation", label: "숙박", color: "#9775fa" },
  { value: "food", label: "식사", color: "#ffa94d" },
  { value: "sightseeing", label: "관광", color: "#51cf66" },
  { value: "activity", label: "액티비티", color: "#ff6b6b" },
  { value: "shopping", label: "쇼핑", color: "#ffd43b" },
  { value: "others", label: "기타", color: "#adb5bd" },
]

// 장소 카테고리 옵션
const placeCategories = [
  { value: "명소", label: "명소", color: "#ff6b6b" },
  { value: "맛집", label: "맛집", color: "#ffd43b" },
  { value: "쇼핑", label: "쇼핑", color: "#4dabf7" },
  { value: "자연", label: "자연", color: "#51cf66" },
  { value: "테마파크", label: "테마파크", color: "#9775fa" },
  { value: "해변", label: "해변", color: "#4dabf7" },
  { value: "관광", label: "관광", color: "#ffa94d" },
]

export function TripEditForm({ tripId }) {
  const router = useRouter()
  const [trip, setTrip] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [dateRange, setDateRange] = useState()
  const [newActivity, setNewActivity] = useState({
    time: "",
    title: "",
    type: "sightseeing",
  })
  const [newNote, setNewNote] = useState("")
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "명소",
    address: "",
  })
  const [editingDay, setEditingDay] = useState(null)

  useEffect(() => {
    // 직접 tripData 객체를 사용
    const foundTrip = tripData[tripId]
    if (foundTrip) {
      setTrip(foundTrip)

      // 날짜 범위 설정
      const [startDateStr, endDateStr] = foundTrip.date.split(" - ")
      const startDate = parse(startDateStr, "yyyy.MM.dd", new Date())
      const endDate = parse(endDateStr, "yyyy.MM.dd", new Date())
      setDateRange({ from: startDate, to: endDate })
    }
  }, [tripId])

  const handleSave = () => {
    // 실제로는 API를 통해 데이터를 저장할 것
    alert("여행 정보가 저장되었습니다.")
    router.push(`/mypage/trip/${tripId}`)
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      const newDate = `${format(range.from, "yyyy.MM.dd")} - ${format(range.to, "yyyy.MM.dd")}`
      setTrip({ ...trip, date: newDate })
    }
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

  const removeNote = (noteId) => {
    if (!trip) return

    setTrip({
      ...trip,
      notes: trip.notes.filter((note) => note.id !== noteId),
    })
  }

  const addNewPlace = () => {
    if (!newPlace.name.trim() || !trip) return

    const newPlaceObj = {
      id: Math.max(0, ...trip.places.map((p) => p.id)) + 1,
      name: newPlace.name,
      category: newPlace.category,
      address: newPlace.address,
    }

    setTrip({
      ...trip,
      places: [...trip.places, newPlaceObj],
    })

    setNewPlace({
      name: "",
      category: "명소",
      address: "",
    })
  }

  const removePlace = (placeId) => {
    if (!trip) return

    setTrip({
      ...trip,
      places: trip.places.filter((place) => place.id !== placeId),
    })
  }

  const addNewActivity = (dayIndex) => {
    if (!newActivity.time.trim() || !newActivity.title.trim() || !trip) return

    const updatedItinerary = [...trip.itinerary]
    const day = updatedItinerary[dayIndex]

    const newActivityObj = {
      time: newActivity.time,
      title: newActivity.title,
      type: newActivity.type,
      completed: false,
    }

    updatedItinerary[dayIndex] = {
      ...day,
      activities: [...day.activities, newActivityObj],
    }

    setTrip({
      ...trip,
      itinerary: updatedItinerary,
    })

    setNewActivity({
      time: "",
      title: "",
      type: "sightseeing",
    })

    setEditingDay(null)
  }

  const removeActivity = (dayIndex, activityIndex) => {
    if (!trip) return

    const updatedItinerary = [...trip.itinerary]
    const day = updatedItinerary[dayIndex]
    const updatedActivities = day.activities.filter((_, index) => index !== activityIndex)

    updatedItinerary[dayIndex] = {
      ...day,
      activities: updatedActivities,
    }

    setTrip({
      ...trip,
      itinerary: updatedItinerary,
    })
  }

  const updateDayTitle = (dayIndex, newTitle) => {
    if (!trip) return

    const updatedItinerary = [...trip.itinerary]
    updatedItinerary[dayIndex] = {
      ...updatedItinerary[dayIndex],
      title: newTitle,
    }

    setTrip({
      ...trip,
      itinerary: updatedItinerary,
    })
  }

  const updateBudget = (category, value) => {
    if (!trip) return

    const numValue = Number.parseInt(value.replace(/,/g, ""), 10) || 0
    const updatedBudget = { ...trip.budget }
    updatedBudget.categories = { ...updatedBudget.categories, [category]: numValue }

    // 총 예산 업데이트
    const total = Object.values(updatedBudget.categories).reduce((sum, val) => sum + val, 0)
    updatedBudget.total = total

    setTrip({
      ...trip,
      budget: updatedBudget,
    })
  }

  if (!trip) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl bg-white p-6 shadow-md">
        <p className="text-lg text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    )
  }

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
              <Input
                value={trip.title}
                onChange={(e) => setTrip({ ...trip, title: e.target.value })}
                className="mb-2 text-xl font-bold text-[#1e3a8a]"
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="date-range" className="text-sm font-medium text-[#1e3a8a]">
                    여행 날짜
                  </Label>
                  <DatePickerWithRange
                    id="date-range"
                    date={dateRange}
                    onDateChange={handleDateRangeChange}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="status" className="text-sm font-medium text-[#1e3a8a]">
                    상태
                  </Label>
                  <Select value={trip.status} onValueChange={(value) => setTrip({ ...trip, status: value })}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="예정">예정</SelectItem>
                      <SelectItem value="진행중">진행중</SelectItem>
                      <SelectItem value="완료">완료</SelectItem>
                      <SelectItem value="취소">취소</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="description" className="text-sm font-medium text-[#1e3a8a]">
              여행 설명
            </Label>
            <Textarea
              id="description"
              value={trip.description}
              onChange={(e) => setTrip({ ...trip, description: e.target.value })}
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-[#1e3a8a]">
                여행지
              </Label>
              <div className="mt-1 flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-[#4dabf7]" />
                <Input
                  id="location"
                  value={trip.location}
                  onChange={(e) => setTrip({ ...trip, location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="transportation" className="text-sm font-medium text-[#1e3a8a]">
                교통편
              </Label>
              <div className="mt-1 flex items-center">
                <Plane className="mr-2 h-4 w-4 text-[#4dabf7]" />
                <Input
                  id="transportation"
                  value={trip.transportation}
                  onChange={(e) => setTrip({ ...trip, transportation: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accommodation" className="text-sm font-medium text-[#1e3a8a]">
                숙소
              </Label>
              <div className="mt-1 flex items-center">
                <Hotel className="mr-2 h-4 w-4 text-[#4dabf7]" />
                <Input
                  id="accommodation"
                  value={trip.accommodation}
                  onChange={(e) => setTrip({ ...trip, accommodation: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="progress" className="text-sm font-medium text-[#1e3a8a]">
                준비 상태 (%)
              </Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={trip.progress}
                  onChange={(e) => setTrip({ ...trip, progress: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2 md:mt-0">
          <Button
            variant="outline"
            className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#fff5f5]"
            onClick={() => router.push(`/mypage/trip/${tripId}`)}
          >
            취소
          </Button>
          <Button className="bg-[#4dabf7] hover:bg-[#1c7ed6]" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" />
            저장하기
          </Button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
          <TabsTrigger value="basic" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            기본 정보
          </TabsTrigger>
          <TabsTrigger value="itinerary" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            일정
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            예산
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            메모/장소
          </TabsTrigger>
        </TabsList>

        {/* 기본 정보 탭 */}
        <TabsContent value="basic">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-[#1e3a8a]">여행 기본 정보</h3>
            <p className="mb-4 text-[#495057]">여행의 기본 정보를 수정하려면 상단의 폼을 이용하세요.</p>

            <div className="rounded-lg bg-[#e7f5ff]/30 p-4">
              <h4 className="mb-2 text-lg font-medium text-[#1e3a8a]">여행 이미지 선택</h4>
              <div className="grid grid-cols-3 gap-4">
                {["도쿄", "제주도", "방콕"].map((image) => (
                  <div
                    key={image}
                    className={`cursor-pointer rounded-lg p-4 ${
                      trip.image === image ? "bg-[#4dabf7]/20 ring-2 ring-[#4dabf7]" : "bg-white hover:bg-[#e7f5ff]"
                    }`}
                    onClick={() => setTrip({ ...trip, image })}
                  >
                    <div className="flex justify-center">
                      <div className="h-16 w-16">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                          {image === "도쿄" && (
                            <>
                              <path d="M50,80 L30,40 L70,40 Z" fill="#ff6b6b" />
                              <rect x="45" y="20" width="10" height="20" fill="#ff6b6b" />
                            </>
                          )}
                          {image === "제주도" && (
                            <>
                              <path
                                d="M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C30,80 20,70 20,50 C20,40 30,20 50,20 Z"
                                fill="#51cf66"
                              />
                              <path
                                d="M50,30 L55,45 L70,45 L60,55 L65,70 L50,60 L35,70 L40,55 L30,45 L45,45 Z"
                                fill="#ffd43b"
                              />
                            </>
                          )}
                          {image === "방콕" && (
                            <>
                              <path d="M50,20 L65,40 L60,65 L40,65 L35,40 Z" fill="#ffd43b" />
                              <path d="M40,65 L60,65 L55,80 L45,80 Z" fill="#ffd43b" />
                            </>
                          )}
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-[#1e3a8a]">{image}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-[#e7f5ff]/30 p-4">
              <h4 className="mb-2 text-lg font-medium text-[#1e3a8a]">여행 색상 선택</h4>
              <div className="grid grid-cols-6 gap-4">
                {["#ff6b6b", "#ffd43b", "#51cf66", "#4dabf7", "#9775fa", "#ffa94d"].map((color) => (
                  <div
                    key={color}
                    className={`cursor-pointer rounded-full p-2 ${
                      trip.color === color ? "ring-2 ring-[#1e3a8a] ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTrip({ ...trip, color })}
                  >
                    <div className="h-8 w-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 일정 탭 */}
        <TabsContent value="itinerary">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1e3a8a]">여행 일정</h3>
              <Button size="sm" className="bg-[#4dabf7] hover:bg-[#1c7ed6]">
                <Plus className="mr-1 h-4 w-4" />
                일정 추가
              </Button>
            </div>

            <div className="space-y-6">
              {trip.itinerary.map((day, dayIndex) => (
                <Card key={dayIndex} className="overflow-hidden bg-[#f8f9fa]">
                  <CardHeader className="bg-[#e7f5ff]/50 pb-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-[#4dabf7]">Day {day.day}</Badge>
                        <Input
                          value={day.title}
                          onChange={(e) => updateDayTitle(dayIndex, e.target.value)}
                          className="h-8 w-auto border-none bg-transparent p-0 text-lg font-medium text-[#1e3a8a] focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div className="text-sm text-[#495057]">{day.date}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {day.activities.map((activity, activityIndex) => {
                        const activityType =
                          activityTypes.find((type) => type.value === activity.type) || activityTypes[0]

                        return (
                          <div key={activityIndex} className="flex items-start rounded-lg bg-white p-2 shadow-sm">
                            <div
                              className="mr-2 flex h-6 w-6 items-center justify-center rounded-full"
                              style={{ backgroundColor: activityType.color + "20" }}
                            >
                              <Clock className="h-3 w-3" style={{ color: activityType.color }} />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center">
                                <Input
                                  value={activity.time}
                                  onChange={(e) => {
                                    const updatedItinerary = [...trip.itinerary]
                                    updatedItinerary[dayIndex].activities[activityIndex].time = e.target.value
                                    setTrip({ ...trip, itinerary: updatedItinerary })
                                  }}
                                  className="mr-2 h-7 w-20 border-none bg-transparent p-0 text-sm font-medium text-[#1e3a8a] focus-visible:ring-1"
                                />
                                <Input
                                  value={activity.title}
                                  onChange={(e) => {
                                    const updatedItinerary = [...trip.itinerary]
                                    updatedItinerary[dayIndex].activities[activityIndex].title = e.target.value
                                    setTrip({ ...trip, itinerary: updatedItinerary })
                                  }}
                                  className="h-7 flex-1 border-none bg-transparent p-0 text-sm text-[#495057] focus-visible:ring-1"
                                />
                              </div>

                              <div className="mt-1">
                                <Select
                                  value={activity.type}
                                  onValueChange={(value) => {
                                    const updatedItinerary = [...trip.itinerary]
                                    updatedItinerary[dayIndex].activities[activityIndex].type = value
                                    setTrip({ ...trip, itinerary: updatedItinerary })
                                  }}
                                >
                                  <SelectTrigger className="h-6 w-24 border-none bg-transparent p-0 text-xs focus:ring-0">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{
                                        borderColor: activityType.color,
                                        color: activityType.color,
                                      }}
                                    >
                                      {activityType.label}
                                    </Badge>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {activityTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        <span style={{ color: type.color }}>{type.label}</span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-[#ff6b6b]"
                              onClick={() => removeActivity(dayIndex, activityIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>

                    {editingDay === dayIndex ? (
                      <div className="mt-4 rounded-lg border border-dashed border-[#4dabf7] p-3">
                        <h4 className="mb-2 text-sm font-medium text-[#1e3a8a]">새 활동 추가</h4>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="시간"
                            value={newActivity.time}
                            onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                            className="w-20"
                          />
                          <Input
                            placeholder="활동 내용"
                            value={newActivity.title}
                            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                            className="flex-1"
                          />
                          <Select
                            value={newActivity.type}
                            onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="유형" />
                            </SelectTrigger>
                            <SelectContent>
                              {activityTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <span style={{ color: type.color }}>{type.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#adb5bd] text-[#495057]"
                            onClick={() => setEditingDay(null)}
                          >
                            취소
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#4dabf7] hover:bg-[#1c7ed6]"
                            onClick={() => addNewActivity(dayIndex)}
                          >
                            추가
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-dashed border-[#4dabf7] text-[#4dabf7] hover:bg-[#e7f5ff]"
                          onClick={() => setEditingDay(dayIndex)}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          활동 추가
                        </Button>
                      </div>
                    )}
                  </CardContent>
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
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <Card className="bg-[#f8f9fa]">
                <CardContent className="p-4">
                  <div className="text-sm text-[#495057]">총 예산</div>
                  <div className="mt-1 text-2xl font-bold text-[#1e3a8a]">{trip.budget.total.toLocaleString()}원</div>
                </CardContent>
              </Card>

              <Card className="bg-[#f8f9fa]">
                <CardContent className="p-4">
                  <div className="text-sm text-[#495057]">사용 금액</div>
                  <Input
                    type="text"
                    value={trip.budget.spent.toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, "")
                      const numValue = Number.parseInt(value, 10) || 0
                      setTrip({
                        ...trip,
                        budget: {
                          ...trip.budget,
                          spent: numValue,
                        },
                      })
                    }}
                    className="mt-1 border-none bg-transparent p-0 text-2xl font-bold text-[#1e3a8a] focus-visible:ring-1"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h4 className="mb-4 text-lg font-medium text-[#1e3a8a]">카테고리별 지출</h4>
              <div className="space-y-4">
                {Object.entries(trip.budget.categories).map(([category, amount]) => {
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
                    <div key={category} className="flex items-center">
                      <div className="flex w-32 items-center">
                        {categoryIcon}
                        <span className="ml-2 text-sm font-medium text-[#495057]">{categoryName}</span>
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          value={amount.toLocaleString()}
                          onChange={(e) => updateBudget(category, e.target.value)}
                          className="border-none bg-transparent p-0 text-[#495057] focus-visible:ring-1"
                        />
                      </div>
                      <div className="w-16 text-right text-sm text-[#adb5bd]">원</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 메모/장소 탭 */}
        <TabsContent value="notes">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 메모 섹션 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1e3a8a]">메모 및 체크리스트</h3>
              </div>

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

              <div className="space-y-2">
                {trip.notes.map((note) => (
                  <div key={note.id} className="flex items-center rounded-lg border border-[#dee2e6] bg-white p-3">
                    <div className="mr-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={note.completed}
                        onChange={() => {
                          const updatedNotes = trip.notes.map((n) =>
                            n.id === note.id ? { ...n, completed: !n.completed } : n,
                          )
                          setTrip({ ...trip, notes: updatedNotes })
                        }}
                        className="h-5 w-5 rounded border-[#adb5bd] text-[#4dabf7]"
                      />
                    </div>
                    <Input
                      value={note.content}
                      onChange={(e) => {
                        const updatedNotes = trip.notes.map((n) =>
                          n.id === note.id ? { ...n, content: e.target.value } : n,
                        )
                        setTrip({ ...trip, notes: updatedNotes })
                      }}
                      className={`flex-1 border-none bg-transparent p-0 ${
                        note.completed ? "text-[#adb5bd] line-through" : "text-[#495057]"
                      } focus-visible:ring-1`}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-[#ff6b6b]"
                      onClick={() => removeNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {trip.notes.length === 0 && (
                <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#dee2e6] p-4">
                  <p className="text-[#adb5bd]">메모가 없습니다</p>
                </div>
              )}
            </div>

            {/* 장소 섹션 */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1e3a8a]">방문 장소</h3>
              </div>

              <div className="mb-6 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="장소명"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                    className="bg-[#f8f9fa]"
                  />
                  <Select
                    value={newPlace.category}
                    onValueChange={(value) => setNewPlace({ ...newPlace, category: value })}
                  >
                    <SelectTrigger className="bg-[#f8f9fa]">
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      {placeCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="주소"
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
                  className="bg-[#f8f9fa]"
                />
                <Button onClick={addNewPlace} className="w-full bg-[#4dabf7] hover:bg-[#1c7ed6]">
                  장소 추가
                </Button>
              </div>

              <div className="space-y-3">
                {trip.places.map((place) => (
                  <Card key={place.id} className="overflow-hidden bg-[#f8f9fa]">
                    <CardHeader className="pb-2 pt-3">
                      <div className="flex items-start justify-between">
                        <Input
                          value={place.name}
                          onChange={(e) => {
                            const updatedPlaces = trip.places.map((p) =>
                              p.id === place.id ? { ...p, name: e.target.value } : p,
                            )
                            setTrip({ ...trip, places: updatedPlaces })
                          }}
                          className="border-none bg-transparent p-0 text-base font-medium text-[#1e3a8a] focus-visible:ring-1"
                        />
                        <Select
                          value={place.category}
                          onValueChange={(value) => {
                            const updatedPlaces = trip.places.map((p) =>
                              p.id === place.id ? { ...p, category: value } : p,
                            )
                            setTrip({ ...trip, places: updatedPlaces })
                          }}
                        >
                          <SelectTrigger className="h-6 w-auto border-none bg-transparent p-0 focus:ring-0">
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
                          </SelectTrigger>
                          <SelectContent>
                            {placeCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3 pt-1">
                      <div className="flex items-center text-sm text-[#495057]">
                        <MapPin className="mr-1 h-3 w-3 text-[#4dabf7]" />
                        <Input
                          value={place.address}
                          onChange={(e) => {
                            const updatedPlaces = trip.places.map((p) =>
                              p.id === place.id ? { ...p, address: e.target.value } : p,
                            )
                            setTrip({ ...trip, places: updatedPlaces })
                          }}
                          className="border-none bg-transparent p-0 text-[#495057] focus-visible:ring-1"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-[#e7f5ff]/30 p-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#ff6b6b] hover:bg-[#fff5f5]"
                        onClick={() => removePlace(place.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {trip.places.length === 0 && (
                <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#dee2e6] p-4">
                  <p className="text-[#adb5bd]">등록된 장소가 없습니다</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}