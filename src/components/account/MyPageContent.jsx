// css 이쁘던거 원래코드
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
  Train,
  ArrowRight
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
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

function MyPageContent() {
  const [activeTab, setActiveTab] = useState('my-trips');
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    imgUrl: '',
    level: '',
    levelExp: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
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

    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get('/api/flights/my-bookings');
        console.log('예약 목록:', res.data);
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error('예약 목록 요청 실패:', error);
      }
    };

    const fetchAiPlans = async () => {
      try {
        const res = await axiosInstance.get('/api/aiplan/my-plans');
        console.log('AI 일정 목록:', res.data);
        const trips = res.data.map(plan => ({
          id: plan.id,
          title: `${destinationMap[plan.destination.toLowerCase()] || plan.destination} 여행`,
          date: `${plan.startDate} - ${plan.endDate}`,
          status: plan.status,
          planType: plan.planType, // planType 추가
          image: destinationMap[plan.destination.toLowerCase()] || plan.destination,
          color: getColorForDestination(plan.destination)
        }));
        setMyTrips(trips);
      } catch (error) {
        console.error('AI 일정 목록 요청 실패:', error);
        setMyTrips([]);
      }
    };

    fetchUserInfo();
    fetchBookings();
    fetchAiPlans();
  }, []);

  const destinationMap = {
    tokyo: '도쿄',
    jeju: '제주도',
    bangkok: '방콕',
    paris: '파리',
    rome: '로마',
    venice: '베니스',
    fukuoka: '후쿠오카',
    singapore: '싱가포르'
  };

  const getColorForDestination = (destination) => {
    const colors = {
      tokyo: '#ff6b6b',
      jeju: '#51cf66',
      bangkok: '#ffd43b',
      paris: '#4dabf7',
      rome: '#ff9a9e',
      venice: '#93c5fd',
      fukuoka: '#adb5bd',
      singapore: '#f3d9fa'
    };
    return colors[destination.toLowerCase()] || '#4dabf7';
  };

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

  const formatRelativeTime = (string) => {
    const now = new Date();
    now.setFullYear(2025);
    const date = new Date(string);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return '방금 전';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간 전`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}주 전`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months}개월 전`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years}년 전`;
    }
  };

  const getStatusBadgeColor = (string) => {
    switch (string) {
      case 'RESERVED':
        return 'bg-[#93c5fd] text-white';
      case 'CANCELLED':
        return 'bg-[#ff9a9e] text-white';
      default:
        return 'bg-[#93c5fd] text-white';
    }
  };

  const getAirportName = (code) => {
    const airportMap = {
      ICN: '인천',
      NRT: '나리타',
      HND: '하네다',
      HKG: '홍콩',
      CDG: '파리 샤를드골',
      LHR: '런던 히드로',
    };
    return airportMap[code] || code;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price);
  };

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
                여행 레벨: {currentLevel.label}
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
            {myTrips.length > 0 ? (
              myTrips.map((trip) => (
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
                        {trip.image === '파리' && (
                          <>
                            <path
                              d="M50,80 L40,40 L60,40 Z"
                              fill="#4dabf7"
                            />
                            <rect
                              x="45"
                              y="20"
                              width="10"
                              height="20"
                              fill="#4dabf7"
                            />
                          </>
                        )}
                        {trip.image === '로마' && (
                          <>
                            <path
                              d="M50,80 L30,40 L70,40 Z"
                              fill="#ff9a9e"
                            />
                            <circle
                              cx="50"
                              cy="30"
                              r="10"
                              fill="#ff9a9e"
                            />
                          </>
                        )}
                        {trip.image === '베니스' && (
                          <>
                            <path
                              d="M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C30,80 20,70 20,50 C20,40 30,20 50,20 Z"
                              fill="#93c5fd"
                            />
                            <path
                              d="M50,30 L60,50 L50,70 L40,50 Z"
                              fill="#ffffff"
                            />
                          </>
                        )}
                        {trip.image === '후쿠오카' && (
                          <>
                            <path
                              d="M50,20 L65,40 L60,65 L40,65 L35,40 Z"
                              fill="#adb5bd"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="10"
                              fill="#adb5bd"
                            />
                          </>
                        )}
                        {trip.image === '싱가포르' && (
                          <>
                            <path
                              d="M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C30,80 20,70 20,50 C20,40 30,20 50,20 Z"
                              fill="#f3d9fa"
                            />
                            <rect
                              x="45"
                              y="30"
                              width="10"
                              height="40"
                              fill="#ffffff"
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
                      {trip.planType || 'MY'} {/* planType 표시, 기본값 MY */}
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
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-[#495057]">저장된 여행 일정이 없습니다.</p>
                <Link to="/travel-planner">
                  <Button
                    size="sm"
                    className="mt-4 border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  >
                    여행 계획 시작하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

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

        <TabsContent value="bookings">
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="overflow-hidden bg-[#f8f9fa] hover:bg-[#e0f2fe]/20"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ backgroundColor: '#93c5fd' }}
                  ></div>
                  <CardHeader className="flex flex-row items-start justify-between pb-2 pl-6 pt-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-[#e0f2fe] p-2">
                        <Plane className="h-5 w-5" style={{ color: '#93c5fd' }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-[#4338ca]">
                          {getAirportName(booking.departureAirport)} →{' '}
                          {getAirportName(booking.arrivalAirport)}
                        </CardTitle>
                        <div className="mt-1 space-y-1 text-sm text-[#495057]">
                          <p>
                            {booking.carrier} {booking.flightNumber}
                          </p>
                          <p>
                            출발:{' '}
                            {format(
                              new Date(booking.departureTime),
                              'yyyy.MM.dd HH:mm',
                              { locale: ko }
                            )}
                          </p>
                          <p>
                            도착:{' '}
                            {format(
                              new Date(booking.arrivalTime),
                              'yyyy.MM.dd HH:mm',
                              { locale: ko }
                            )}
                          </p>
                          <p>탑승객: {booking.passengerCount}명</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={getStatusBadgeColor(booking.status)}>
                        {booking.status === 'RESERVED' ? '예약 완료' : '취소됨'}
                      </Badge>
                      <p className="mt-2 font-medium text-[#4338ca]">
                        {formatPrice(booking.totalPrice)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-end pb-4 pl-6 pt-2">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#93c5fd] text-[#4338ca] hover:bg-[#e0f2fe]"
                      >
                        상세보기
                      </Button>
                      {booking.status === 'RESERVED' && (
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#495057]">예약 내역이 없습니다.</p>
                <Link to="/flight-search">
                  <Button
                    size="sm"
                    className="mt-4 border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  >
                    항공권 검색하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
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
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------


//css 신호등 
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Calendar,
//   MapPin,
//   Bookmark,
//   Star,
//   Settings,
//   PenLine,
//   Plus,
//   Plane,
//   Hotel,
//   Bus,
//   Train,
//   ArrowRight,
// } from 'lucide-react';
// import { Button } from '../../modules/Button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../modules/Tabs';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../../modules/Card';
// import { Avatar, AvatarImage } from '../../modules/Avatar';
// import { Progress } from '../../modules/Progress';
// import { Badge } from '../../modules/Badge';
// import axiosInstance from "../../api/axiosInstance";
// import { format } from 'date-fns';
// import { ko } from 'date-fns/locale';

// function MyPageContent() {
//   const [activeTab, setActiveTab] = useState('my-trips');
//   const [userInfo, setUserInfo] = useState({
//     email: '',
//     nickname: '',
//     imgUrl: '',
//     level: '',
//     levelExp: 0,
//   });
//   const [bookings, setBookings] = useState([]);
//   const [showLevelModal, setShowLevelModal] = useState(false);
//   const [showExpModal, setShowExpModal] = useState(false);

//   const levelInfo = {
//     BEGINNER: { label: '여행 새싹', min: 0, max: 99 },
//     NOVICE: { label: '초보 여행자', min: 100, max: 199 },
//     EXPLORER: { label: '탐험가', min: 200, max: 299 },
//     ADVENTURER: { label: '모험가', min: 300, max: 399 },
//     WORLD_TRAVELER: { label: '세계 여행자', min: 400, max: 499 },
//     MASTER: { label: '여행 달인', min: 500, max: 599 },
//     LEGEND: { label: '전설의 여행자', min: 600, max: 9999 },
//   };

//   const currentLevel = levelInfo[userInfo.level] || levelInfo.BEGINNER;
//   const percent = Math.floor(
//     ((userInfo.levelExp - currentLevel.min) /
//       (currentLevel.max - currentLevel.min + 1)) * 100
//   );

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const res = await axiosInstance.get('/api/accounts/mypage');
//         console.log('회원정보', res.data);
//         setUserInfo({
//           email: res.data.email,
//           nickname: res.data.nickname,
//           imgUrl: res.data.imgUrl,
//           level: res.data.level,
//           levelExp: res.data.levelExp,
//         });
//       } catch (error) {
//         console.error('회원정보 요청 실패:', error);
//       }
//     };

//     const fetchBookings = async () => {
//       try {
//         const res = await axiosInstance.get('/api/flights/my-bookings');
//         console.log('예약 목록:', res.data);
//         if (res.data.success) {
//           setBookings(res.data.data);
//         }
//       } catch (error) {
//         console.error('예약 목록 요청 실패:', error);
//       }
//     };

//     fetchUserInfo();
//     fetchBookings();
//   }, []);

//   const myTrips = [
//     {
//       id: 1,
//       title: '도쿄 3박 4일',
//       date: '2025.05.15 - 2025.05.18',
//       status: '예정',
//       image: '도쿄',
//       color: '#ff6b6b',
//     },
//     {
//       id: 2,
//       title: '제주도 가족여행',
//       date: '2025.03.10 - 2025.03.13',
//       status: '완료',
//       image: '제주도',
//       color: '#51cf66',
//     },
//     {
//       id: 3,
//       title: '방콕 5일',
//       date: '2024.12.24 - 2024.12.28',
//       status: '완료',
//       image: '방콕',
//       color: '#ffd43b',
//     },
//   ];

//   const savedItems = [
//     {
//       id: 1,
//       title: '도쿄 스카이트리',
//       type: '명소',
//       location: '도쿄, 일본',
//       savedDate: '2025.04.15',
//       color: '#ff6b6b',
//     },
//     {
//       id: 2,
//       title: '이치란 라멘',
//       type: '맛집',
//       location: '도쿄, 일본',
//       savedDate: '2025.04.15',
//       color: '#ffd43b',
//     },
//     {
//       id: 3,
//       title: '호텔 미라코스타',
//       type: '숙소',
//       location: '도쿄, 일본',
//       savedDate: '2025.04.14',
//       color: '#4dabf7',
//     },
//     {
//       id: 4,
//       title: '방콕 왕궁',
//       type: '명소',
//       location: '방콕, 태국',
//       savedDate: '2025.04.10',
//       color: '#ff6b6b',
//     },
//     {
//       id: 5,
//       title: '팟타이 맛집',
//       type: '맛집',
//       location: '방콕, 태국',
//       savedDate: '2025.04.10',
//       color: '#ffd43b',
//     },
//   ];

//   const myReviews = [
//     {
//       id: 1,
//       title: '도쿄 스카이트리',
//       rating: 4.5,
//       date: '2025.03.20',
//       content:
//         '도쿄 전경을 한눈에 볼 수 있어서 좋았습니다. 입장료가 조금 비싸지만 볼만한 가치가 있어요.',
//       color: '#ff6b6b',
//     },
//     {
//       id: 2,
//       title: '이치란 라멘',
//       rating: 5,
//       date: '2025.03.19',
//       content:
//         '정말 맛있었습니다! 줄이 길었지만 기다릴 만한 가치가 있었어요. 돈코츠 라멘의 진수를 맛볼 수 있습니다.',
//       color: '#ffd43b',
//     },
//     {
//       id: 3,
//       title: '제주 협재해변',
//       rating: 4,
//       date: '2025.03.12',
//       content:
//         '물이 맑고 모래가 고운 해변이에요. 날씨가 좋으면 에메랄드빛 바다를 볼 수 있습니다.',
//       color: '#51cf66',
//     },
//   ];

//   const formatRelativeTime = (string) => {
//     const now = new Date();
//     now.setFullYear(2025);
//     const date = new Date(string);
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//     if (diffInSeconds < 60) {
//       return '방금 전';
//     } else if (diffInSeconds < 3600) {
//       const minutes = Math.floor(diffInSeconds / 60);
//       return `${minutes}분 전`;
//     } else if (diffInSeconds < 86400) {
//       const hours = Math.floor(diffInSeconds / 3600);
//       return `${hours}시간 전`;
//     } else if (diffInSeconds < 604800) {
//       const days = Math.floor(diffInSeconds / 86400);
//       return `${days}일 전`;
//     } else if (diffInSeconds < 2592000) {
//       const weeks = Math.floor(diffInSeconds / 604800);
//       return `${weeks}주 전`;
//     } else if (diffInSeconds < 31536000) {
//       const months = Math.floor(diffInSeconds / 2592000);
//       return `${months}개월 전`;
//     } else {
//       const years = Math.floor(diffInSeconds / 31536000);
//       return `${years}년 전`;
//     }
//   };

//   const getStatusBadgeColor = (string) => {
//     switch (string) {
//       case 'RESERVED':
//         return 'bg-[#93c5fd] text-white';
//       case 'CANCELLED':
//         return 'bg-[#ff9a9e] text-white';
//       default:
//         return 'bg-[#93c5fd] text-white';
//     }
//   };

//   const getAirportName = (code) => {
//     const airportMap = {
//       ICN: '인천',
//       NRT: '나리타',
//       HND: '하네다',
//       HKG: '홍콩',
//       CDG: '파리 샤를드골',
//       LHR: '런던 히드로',
//     };
//     return airportMap[code] || code;
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('ko-KR', {
//       style: 'currency',
//       currency: 'KRW',
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <div className="rounded-xl bg-white p-6 shadow-md">
//       <div className="mb-8 flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
//         <Avatar className="h-24 w-24 border-4 border-[#4dabf7]">
//           <AvatarImage
//             src={userInfo?.imgUrl || '/placeholder.svg?height=96&width=96'}
//             alt="프로필 이미지"
//           />
//         </Avatar>

//         <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
//           <h2 className="text-2xl font-bold text-[#1e3a8a]">
//             {userInfo.nickname}
//           </h2>
//           <p className="text-[#495057]">{userInfo.email}</p>

//           <div className="mt-2">
//             <div className="flex items-center">
//               <span className="text-sm text-[#495057]">
//                 여행 레벨: {currentLevel.label}
//               </span>
//               <Badge
//                 onClick={() => setShowLevelModal(true)}
//                 className="ml-2 cursor-pointer bg-[#ffd43b] text-[#1e3a8a]"
//               >
//                 {Math.floor(userInfo.levelExp / 100) + 1 >= 7
//                   ? '🏆 MAX'
//                   : `Lv.${Math.floor(userInfo.levelExp / 100) + 1}`}
//               </Badge>
//             </div>
//             <div className="mt-1 flex items-center">
//               <Progress
//                 value={percent}
//                 className="h-2 w-32 bg-[#e7f5ff]"
//                 indicatorClassName="bg-[#4dabf7]"
//               />
//               <span
//                 className="ml-2 text-xs text-[#495057] cursor-pointer hover:underline"
//                 onClick={() => setShowExpModal(true)}
//               >
//                 {percent}%
//               </span>
//             </div>
//           </div>

//           <div className="mt-4 flex space-x-2">
//             <Link to="/settings">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="border-[#4dabf7] text-[#1e3a8a] hover:bg-[#e7f5ff]"
//               >
//                 <Settings className="mr-1 h-4 w-4" />
//                 설정
//               </Button>
//             </Link>

//             <Link to="/profile-edit">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="border-[#4dabf7] text-[#1e3a8a] hover:bg-[#e7f5ff]"
//               >
//                 <PenLine className="mr-1 h-4 w-4" />
//                 프로필 수정
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <Tabs
//         defaultValue="my-trips"
//         className="w-full"
//         onValueChange={setActiveTab}
//       >
//         <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
//           <TabsTrigger
//             value="my-trips"
//             className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
//           >
//             내 여행
//           </TabsTrigger>
//           <TabsTrigger
//             value="my-bookings"
//             className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
//           >
//             내 예약
//           </TabsTrigger>
//           <TabsTrigger
//             value="saved"
//             className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
//           >
//             내 저장
//           </TabsTrigger>
//           <TabsTrigger
//             value="reviews"
//             className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
//           >
//             내 리뷰
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="my-trips">
//           <div className="grid gap-6 md:grid-cols-3">
//             {myTrips.map((trip) => (
//               <Card
//                 key={trip.id}
//                 className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105"
//               >
//                 <div
//                   className="relative h-40 w-full"
//                   style={{ backgroundColor: trip.color }}
//                 >
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-2xl font-bold text-white">
//                       {trip.image}
//                     </span>
//                   </div>
//                 </div>
//                 <CardHeader>
//                   <CardTitle className="text-lg font-bold text-[#1e3a8a]">
//                     {trip.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center text-[#495057]">
//                     <Calendar className="mr-2 h-4 w-4" />
//                     <span>{trip.date}</span>
//                   </div>
//                   <div className="mt-2">
//                     <Badge
//                       className={
//                         trip.status === '예정'
//                           ? 'bg-[#93c5fd] text-white'
//                           : 'bg-[#51cf66] text-white'
//                       }
//                     >
//                       {trip.status}
//                     </Badge>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button
//                     size="sm"
//                     className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//                   >
//                     상세 보기
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="my-bookings">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <Card
//                   key={booking.id}
//                   className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105"
//                 >
//                   <CardHeader>
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg font-bold text-[#1e3a8a]">
//                         {booking.carrier} {booking.flightNumber}
//                       </CardTitle>
//                       <Badge className={getStatusBadgeColor(booking.status)}>
//                         {booking.status === 'RESERVED' ? '예약 완료' : '취소됨'}
//                       </Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-[#495057]">
//                         <Plane className="mr-2 h-4 w-4" />
//                         <span>
//                           {getAirportName(booking.departureAirport)} →{' '}
//                           {getAirportName(booking.arrivalAirport)}
//                         </span>
//                       </div>
//                       <div className="flex items-center text-[#495057]">
//                         <Calendar className="mr-2 h-4 w-4" />
//                         <span>
//                           {format(
//                             new Date(booking.departureTime),
//                             'yyyy.MM.dd HH:mm',
//                             { locale: ko }
//                           )}{' '}
//                           ~{' '}
//                           {format(new Date(booking.arrivalTime), 'HH:mm', {
//                             locale: ko,
//                           })}
//                         </span>
//                       </div>
//                       {booking.returnDepartureTime && (
//                         <>
//                           <div className="flex items-center text-[#495057]">
//                             <Plane className="mr-2 h-4 w-4" />
//                             <span>
//                               {getAirportName(booking.returnDepartureAirport)} →{' '}
//                               {getAirportName(booking.returnArrivalAirport)}
//                             </span>
//                           </div>
//                           <div className="flex items-center text-[#495057]">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             <span>
//                               {format(
//                                 new Date(booking.returnDepartureTime),
//                                 'yyyy.MM.dd HH:mm',
//                                 { locale: ko }
//                               )}{' '}
//                               ~{' '}
//                               {format(
//                                 new Date(booking.returnArrivalTime),
//                                 'HH:mm',
//                                 { locale: ko }
//                               )}
//                             </span>
//                           </div>
//                         </>
//                       )}
//                       <div className="flex items-center text-[#495057]">
//                         <span>탑승객: {booking.passengerCount}명</span>
//                       </div>
//                       <div className="flex items-center text-[#495057]">
//                         <span>좌석: {booking.selectedSeats.join(', ')}</span>
//                       </div>
//                       <div className="flex items-center text-[#495057]">
//                         <span>총 요금: {formatPrice(booking.totalPrice)}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <Button
//                       size="sm"
//                       className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//                     >
//                       예약 상세
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-8">
//                 <p className="text-[#495057]">예약 내역이 없습니다.</p>
//                 <Link to="/flight-search">
//                   <Button className="mt-4 bg-[#4dabf7] text-white hover:bg-[#3b82f6]">
//                     항공권 검색하기
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="saved">
//           <div className="grid gap-6 md:grid-cols-3">
//             {savedItems.map((item) => (
//               <Card
//                 key={item.id}
//                 className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-lg font-bold text-[#1e3a8a]">
//                     {item.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center text-[#495057]">
//                     <Bookmark className="mr-2 h-4 w-4" />
//                     <span>{item.type}</span>
//                   </div>
//                   <div className="flex items-center text-[#495057] mt-2">
//                     <MapPin className="mr-2 h-4 w-4" />
//                     <span>{item.location}</span>
//                   </div>
//                   <div className="flex items-center text-[#495057] mt-2">
//                     <Calendar className="mr-2 h-4 w-4" />
//                     <span>{formatRelativeTime(item.savedDate)}</span>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button
//                     size="sm"
//                     className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//                   >
//                     상세 보기
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="reviews">
//           <div className="grid gap-6 md:grid-cols-3">
//             {myReviews.map((review) => (
//               <Card
//                 key={review.id}
//                 className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-lg font-bold text-[#1e3a8a]">
//                     {review.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center text-[#495057]">
//                     <Star className="mr-2 h-4 w-4 text-[#ffd43b]" />
//                     <span>{review.rating}</span>
//                   </div>
//                   <div className="flex items-center text-[#495057] mt-2">
//                     <Calendar className="mr-2 h-4 w-4" />
//                     <span>{formatRelativeTime(review.date)}</span>
//                   </div>
//                   <p className="mt-2 text-[#495057] line-clamp-3">
//                     {review.content}
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button
//                     size="sm"
//                     className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//                   >
//                     리뷰 보기
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {showLevelModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Card className="bg-white p-6 max-w-md w-full">
//             <CardHeader>
//               <CardTitle>여행 레벨 안내</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {Object.entries(levelInfo).map(([key, { label, min, max }]) => (
//                   <li key={key} className="text-[#495057]">
//                     {label}: {min} ~ {max} EXP
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 onClick={() => setShowLevelModal(false)}
//                 className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//               >
//                 닫기
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}

//       {showExpModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Card className="bg-white p-6 max-w-md w-full">
//             <CardHeader>
//               <CardTitle>경험치 안내</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-[#495057]">
//                 현재 경험치: {userInfo.levelExp} EXP
//               </p>
//               <p className="text-[#495057] mt-2">
//                 다음 레벨까지: {currentLevel.max - userInfo.levelExp + 1} EXP
//               </p>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 onClick={() => setShowExpModal(false)}
//                 className="w-full bg-[#4dabf7] text-white hover:bg-[#3b82f6]"
//               >
//                 닫기
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyPageContent;
