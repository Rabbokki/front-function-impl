import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Bookmark,
  Star,
  Settings,
  PenLine,
  Plus,
  Plane,
  Hotel, 
  Bus,
  Train
} from 'lucide-react';
import { Button } from '../../modules/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../modules/Tabs';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../modules/Card';
import { Avatar, AvatarImage } from '../../modules/Avatar';
import { Progress } from '../../modules/Progress';
import { Badge } from '../../modules/Badge';
import axiosInstance from '../../api/axiosInstance';

function MyPageContent() {
  const [activeTab, setActiveTab] = useState('my-trips');

  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    imgUrl: '',
    level: '',
    levelExp: 0,
  });

  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  const levelInfo = {
    BEGINNER: { label: '여행 새싹', min: 0, max: 99 },
    NOVICE: { label: '초보 여행자', min: 100, max: 199 },
    EXPLORER: { label: '탐험가', min: 200, max: 299 },
    ADVENTURER: { label: '모험가', min: 300, max: 399 },
    WORLD_TRAVELER: { label: '세계 여행자', min: 400, max: 499 },
    MASTER: { label: '여행 달인', min: 500, max: 599 },
    LEGEND: { label: '전설의 여행자', min: 600, max: 9999 },
  };

  const currentLevel = levelInfo[userInfo.level] || levelInfo.BEGINNER;
  const percent = Math.floor(
    ((userInfo.levelExp - currentLevel.min) /
      (currentLevel.max - currentLevel.min + 1)) *
      100
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/accounts/mypage');
        console.log('회원정보', res.data);
        setUserInfo({
          email: res.data.email,
          nickname: res.data.nickname,
          imgUrl: res.data.imgUrl,
          level: res.data.level,
          levelExp: res.data.levelExp,
        });
      } catch (error) {
        console.error('회원정보 요청 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const myTrips = [
    {
      id: 1,
      title: '도쿄 3박 4일',
      date: '2025.05.15 - 2025.05.18',
      status: '예정',
      image: '도쿄',
      color: '#ff6b6b',
    },
    {
      id: 2,
      title: '제주도 가족여행',
      date: '2025.03.10 - 2025.03.13',
      status: '완료',
      image: '제주도',
      color: '#51cf66',
    },
    {
      id: 3,
      title: '방콕 5일',
      date: '2024.12.24 - 2024.12.28',
      status: '완료',
      image: '방콕',
      color: '#ffd43b',
    },
  ];

  const savedItems = [
    {
      id: 1,
      title: '도쿄 스카이트리',
      type: '명소',
      location: '도쿄, 일본',
      savedDate: '2025.04.15',
      color: '#ff6b6b',
    },
    {
      id: 2,
      title: '이치란 라멘',
      type: '맛집',
      location: '도쿄, 일본',
      savedDate: '2025.04.15',
      color: '#ffd43b',
    },
    {
      id: 3,
      title: '호텔 미라코스타',
      type: '숙소',
      location: '도쿄, 일본',
      savedDate: '2025.04.14',
      color: '#4dabf7',
    },
    {
      id: 4,
      title: '방콕 왕궁',
      type: '명소',
      location: '방콕, 태국',
      savedDate: '2025.04.10',
      color: '#ff6b6b',
    },
    {
      id: 5,
      title: '팟타이 맛집',
      type: '맛집',
      location: '방콕, 태국',
      savedDate: '2025.04.10',
      color: '#ffd43b',
    },
  ];

  const myReviews = [
    {
      id: 1,
      title: '도쿄 스카이트리',
      rating: 4.5,
      date: '2025.03.20',
      content:
        '도쿄 전경을 한눈에 볼 수 있어서 좋았습니다. 입장료가 조금 비싸지만 볼만한 가치가 있어요.',
      color: '#ff6b6b',
    },
    {
      id: 2,
      title: '이치란 라멘',
      rating: 5,
      date: '2025.03.19',
      content:
        '정말 맛있었습니다! 줄이 길었지만 기다릴 만한 가치가 있었어요. 돈코츠 라멘의 진수를 맛볼 수 있습니다.',
      color: '#ffd43b',
    },
    {
      id: 3,
      title: '제주 협재해변',
      rating: 4,
      date: '2025.03.12',
      content:
        '물이 맑고 모래가 고운 해변이에요. 날씨가 좋으면 에메랄드빛 바다를 볼 수 있습니다.',
      color: '#51cf66',
    },
  ];

  const myBookings = [
    {
      id: 1,
      type: "항공권",
      title: "인천 → 도쿄 (나리타)",
      airline: "대한항공",
      flightNumber: "KE703",
      departureDate: "2025.05.15 08:30",
      arrivalDate: "2025.05.15 10:45",
      status: "예약 완료",
      passengers: 2,
      price: "₩580,000",
      color: "#93c5fd",
      icon: Plane,
    },
    {
      id: 2,
      type: "항공권",
      title: "도쿄 (나리타) → 인천",
      airline: "아시아나항공",
      flightNumber: "OZ104",
      departureDate: "2025.05.18 19:20",
      arrivalDate: "2025.05.18 22:00",
      status: "예약 완료",
      passengers: 2,
      price: "₩620,000",
      color: "#93c5fd",
      icon: Plane,
    },
    {
      id: 3,
      type: "숙소",
      title: "호텔 미라코스타",
      location: "도쿄, 일본",
      checkIn: "2025.05.15",
      checkOut: "2025.05.18",
      roomType: "디럭스 더블룸",
      guests: 2,
      status: "예약 완료",
      price: "₩960,000",
      color: "#a78bfa",
      icon: Hotel,
    },
    {
      id: 4,
      type: "교통",
      title: "나리타 공항 → 도쿄역 리무진 버스",
      departureDate: "2025.05.15 11:30",
      arrivalDate: "2025.05.15 13:00",
      passengers: 2,
      status: "예약 완료",
      price: "₩30,000",
      color: "#6ee7b7",
      icon: Bus,
    },
    {
      id: 5,
      type: "교통",
      title: "도쿄 → 교토 신칸센",
      departureDate: "2025.05.16 09:00",
      arrivalDate: "2025.05.16 11:30",
      passengers: 2,
      status: "예약 완료",
      price: "₩280,000",
      color: "#fce7f3",
      icon: Train,
    },
  ]
  const formatRelativeTime = (string) => {
    const now = new Date()
    // 데모를 위해 현재 시간을 2025년으로 설정
    now.setFullYear(2025)

    const date = new Date(string)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "방금 전"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes}분 전`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours}시간 전`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days}일 전`
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800)
      return `${weeks}주 전`
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000)
      return `${months}개월 전`
    } else {
      const years = Math.floor(diffInSeconds / 31536000)
      return `${years}년 전`
    }
  }

  

  // 예약 상태에 따른 배지 색상 결정
  const getStatusBadgeColor = (string) => {
    switch (string) {
      case "예약 완료":
        return "bg-[#93c5fd] text-white"
      case "이용 완료":
        return "bg-[#adb5bd] text-white"
      case "취소됨":
        return "bg-[#ff9a9e] text-white"
      default:
        return "bg-[#93c5fd] text-white"
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-8 flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
        <Avatar className="h-24 w-24 border-4 border-[#4dabf7]">
          <AvatarImage
            src={userInfo?.imgUrl || '/placeholder.svg?height=96&width=96'}
            alt="프로필 이미지"
          />
        </Avatar>

        <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            {userInfo.nickname}
          </h2>
          <p className="text-[#495057]">{userInfo.email}</p>

          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-sm text-[#495057]">
                여행 레벨: {userInfo.level}
              </span>
              <Badge
                onClick={() => setShowLevelModal(true)}
                className="ml-2 cursor-pointer bg-[#ffd43b] text-[#1e3a8a]"
              >
                {Math.floor(userInfo.levelExp / 100) + 1 >= 7
                  ? '🏆 MAX'
                  : `Lv.${Math.floor(userInfo.levelExp / 100) + 1}`}
              </Badge>
            </div>
            <div className="mt-1 flex items-center">
              <Progress
                value={percent}
                className="h-2 w-32 bg-[#e7f5ff]"
                indicatorClassName="bg-[#4dabf7]"
              />
              <span
                className="ml-2 text-xs text-[#495057] cursor-pointer hover:underline"
                onClick={() => setShowExpModal(true)}
              >
                {percent}%
              </span>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <Link to="/settings">
              <Button
                size="sm"
                variant="outline"
                className="border-traveling-blue text-traveling-text hover:bg-traveling-light-blue"
              >
                <Settings className="mr-1 h-4 w-4" />
                설정
              </Button>
            </Link>

            <Link to="/profile-edit">
              <Button
                size="sm"
                variant="outline"
                className="border-traveling-blue text-traveling-text hover:bg-traveling-light-blue"
              >
                <PenLine className="mr-1 h-4 w-4" />
                프로필 수정
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="my-trips"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
          <TabsTrigger
            value="my-trips"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            내 여행
          </TabsTrigger>

          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            내 예약
          </TabsTrigger>

          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            내 저장
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            내 리뷰
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-trips">
          <div className="grid gap-6 md:grid-cols-3">
            {myTrips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105"
              >
                <div className="relative h-40 w-full bg-[#e7f5ff]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="h-20 w-20">
                      {trip.image === '도쿄' && (
                        <>
                          <path d="M50,80 L30,40 L70,40 Z" fill="#ff6b6b" />
                          <rect
                            x="45"
                            y="20"
                            width="10"
                            height="20"
                            fill="#ff6b6b"
                          />
                        </>
                      )}
                      {trip.image === '제주도' && (
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
                      {trip.image === '방콕' && (
                        <>
                          <path
                            d="M50,20 L65,40 L60,65 L40,65 L35,40 Z"
                            fill="#ffd43b"
                          />
                          <path
                            d="M40,65 L60,65 L55,80 L45,80 Z"
                            fill="#ffd43b"
                          />
                        </>
                      )}
                    </svg>
                  </div>
                  <Badge
                    className={`absolute right-2 top-2 ${
                      trip.status === '예정' ? 'bg-[#4dabf7]' : 'bg-[#adb5bd]'
                    } text-white`}
                  >
                    {trip.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-[#1e3a8a]">{trip.title}</h3>
                  <div className="mt-2 flex items-center text-sm text-[#495057]">
                    <Calendar className="mr-1 h-3 w-3 text-[#4dabf7]" />
                    <span>{trip.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-[#e7f5ff]/30 p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  >
                    상세보기
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  >
                    수정하기
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Link to="/travel-planner" className="block h-full">
              <Card className="flex h-full min-h-[220px] items-center justify-center bg-[#f8f9fa]/50 border-dashed border-[#d0ebff] transition-transform duration-200 hover:scale-[1.02]">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-[#e7f5ff] p-3">
                    <Plus className="h-6 w-6 text-[#4dabf7]" />
                  </div>
                  <h3 className="text-[#1e3a8a]">새 여행 만들기</h3>
                  <p className="mt-1 text-sm text-[#495057]">
                    새로운 여행 일정을 계획해보세요
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="my-bookings">
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden bg-[#f8f9fa] hover:bg-[#e0f2fe]/20">
                <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: booking.color }}></div>
                <CardHeader className="flex flex-row items-start justify-between pb-2 pl-6 pt-4">
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-[#e0f2fe] p-2">
                      <booking.icon className="h-5 w-5" style={{ color: booking.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#4338ca]">{booking.title}</CardTitle>
                      {booking.type === "항공권" && (
                        <div className="mt-1 space-y-1 text-sm text-[#495057]">
                          <p>
                            {booking.airline} {booking.flightNumber}
                          </p>
                          <p>출발: {booking.departureDate}</p>
                          <p>도착: {booking.arrivalDate}</p>
                          <p>탑승객: {booking.passengers}명</p>
                        </div>
                      )}
                      {booking.type === "숙소" && (
                        <div className="mt-1 space-y-1 text-sm text-[#495057]">
                          <p>위치: {booking.location}</p>
                          <p>체크인: {booking.checkIn}</p>
                          <p>체크아웃: {booking.checkOut}</p>
                          <p>
                            객실: {booking.roomType}, 인원: {booking.guests}명
                          </p>
                        </div>
                      )}
                      {booking.type === "교통" && (
                        <div className="mt-1 space-y-1 text-sm text-[#495057]">
                          <p>출발: {booking.departureDate}</p>
                          <p>도착: {booking.arrivalDate}</p>
                          <p>인원: {booking.passengers}명</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className={getStatusBadgeColor(booking.status)}>{booking.status}</Badge>
                    <p className="mt-2 font-medium text-[#4338ca]">{booking.price}</p>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end pb-4 pl-6 pt-2">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-[#93c5fd] text-[#4338ca] hover:bg-[#e0f2fe]">
                      상세보기
                    </Button>
                    {booking.status === "예약 완료" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#ff9a9e] text-[#ff9a9e] hover:bg-[#fce7f3]"
                      >
                        예약 취소
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="space-y-4">
            {savedItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden bg-[#f8f9fa] hover:bg-[#e7f5ff]/20"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: item.color }}
                ></div>
                <CardHeader className="flex flex-row items-start justify-between pb-2 pl-6 pt-4">
                  <div>
                    <CardTitle className="text-lg text-[#1e3a8a]">
                      {item.title}
                    </CardTitle>
                    <div className="mt-1 flex items-center text-sm text-[#495057]">
                      <MapPin className="mr-1 h-3 w-3 text-[#4dabf7]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <Badge
                    className={`
                    ${
                      item.type === '명소'
                        ? 'bg-[#ff6b6b]'
                        : item.type === '맛집'
                        ? 'bg-[#ffd43b]'
                        : 'bg-[#4dabf7]'
                    }
                    text-white
                    `}
                  >
                    {item.type}
                  </Badge>
                </CardHeader>
                <CardFooter className="flex items-center justify-between pb-4 pl-6 pt-2 text-sm text-[#495057]">
                  <div className="flex items-center">
                    <Bookmark className="mr-1 h-3 w-3 text-[#4dabf7]" />
                    <span>저장일: {item.savedDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
                    >
                      상세보기
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
                    >
                      삭제
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            {myReviews.map((review) => (
              <Card key={review.id} className="overflow-hidden bg-[#f8f9fa]">
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: review.color }}
                ></div>
                <CardHeader className="pb-2 pl-6 pt-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-[#1e3a8a]">
                      {review.title}
                    </CardTitle>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(review.rating)
                              ? 'fill-[#ffd43b] text-[#ffd43b]'
                              : i < review.rating
                              ? 'fill-[#ffd43b] text-[#ffd43b] stroke-[#ffd43b]'
                              : 'text-[#dee2e6]'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium text-[#1e3a8a]">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-[#495057]">
                    작성일: {review.date}
                  </p>
                </CardHeader>
                <CardContent className="py-2 pl-6">
                  <p className="text-[#1e3a8a]">{review.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end pb-4 pl-6 pt-2">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
                    >
                      삭제
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* 레벨 안내 */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-center mb-4 text-[#1e3a8a]">
              🌟 여행 레벨 안내
            </h2>
            <ul className="space-y-2 text-sm text-[#495057]">
              <li>
                <strong>Lv.1</strong> 여행 새싹 (0~99 exp)
              </li>
              <li>
                <strong>Lv.2</strong> 초보 여행자 (100~199 exp)
              </li>
              <li>
                <strong>Lv.3</strong> 탐험가 (200~299 exp)
              </li>
              <li>
                <strong>Lv.4</strong> 모험가 (300~399 exp)
              </li>
              <li>
                <strong>Lv.5</strong> 세계 여행자 (400~499 exp)
              </li>
              <li>
                <strong>Lv.6</strong> 여행 달인 (500~599 exp)
              </li>
              <li>
                <strong>🏆</strong> 전설의 여행자 (600+ exp)
              </li>
            </ul>
            <button
              onClick={() => setShowLevelModal(false)}
              className="mt-6 w-full rounded bg-[#4dabf7] py-2 text-white hover:bg-[#339af0]"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 경험치 안내 */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-center mb-4 text-[#1e3a8a]">
              💡 경험치(Exp)란?
            </h2>
            <p className="text-sm text-[#495057] leading-relaxed">
              경험치는 여행 활동을 할 때마다 자동으로 쌓이는 점수입니다.
              <br />
              <br />
              예를 들어:
              <ul className="mt-2 list-disc pl-5 space-y-1 text-left">
                <li>여행 일정 만들기 +20</li>
                <li>명소 추가하기 +5</li>
                <li>커뮤니티 글 작성 +15</li>
                <li>리뷰 작성 +20</li>
              </ul>
              <br />
              일정 경험치를 모으면 자동으로 다음 레벨로 올라갑니다!
            </p>
            <button
              onClick={() => setShowExpModal(false)}
              className="mt-6 w-full rounded bg-[#4dabf7] py-2 text-white hover:bg-[#339af0]"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageContent;
