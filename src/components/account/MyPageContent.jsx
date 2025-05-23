import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowRight,
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
import { toast } from 'react-toastify';

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
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();
  const [myReviews, setMyReviews] = useState([]);

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
    const accessToken = localStorage.getItem('Access_Token');

    async function fetchMyReviews() {
      try {
        const res = await axiosInstance.get('/api/reviews/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('✅ 내 리뷰 응답:', res.data);

        setMyReviews(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error('❌ 내 리뷰 요청 실패:', err);
      }
    }

    fetchMyReviews();
  }, []);

  const handleReviewDelete = async (reviewId) => {
    const accessToken = localStorage.getItem('Access_Token');
    const confirm = window.confirm('리뷰를 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const res = await axiosInstance.delete('/api/reviews', {
        params: { reviewId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        alert('리뷰가 삭제되었습니다!');
        setMyReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } else {
        alert(res.data.message || '삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error('❌ 리뷰 삭제 실패:', err);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('Access_Token');

    async function fetchSavedPlaces() {
      try {
        const res = await axiosInstance.get('/api/saved-places', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('✅ 저장 목록 응답:', res.data);
        setSavedItems(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error('❌ 저장 목록 요청 실패:', err);
      }
    }

    fetchSavedPlaces();
  }, []);

  const handleDelete = async (placeId) => {
    const accessToken = localStorage.getItem('Access_Token');

    try {
      const res = await axiosInstance.delete(`/api/saved-places/${placeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('✅ 삭제 응답:', res.data);

      if (res.data.success) {
        alert('삭제 성공!');
        setSavedItems((prev) =>
          prev.filter((item) => item.placeId !== placeId)
        );
      } else {
        alert(res.data.message || '삭제 실패');
      }
    } catch (err) {
      console.error('❌ 삭제 요청 실패:', err);
      alert('삭제 중 오류 발생');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 회원 정보
        const userResponse = await axiosInstance.get('/api/accounts/mypage');
        console.log('회원정보', userResponse.data);
        setUserInfo({
          email: userResponse.data.email,
          nickname: userResponse.data.nickname,
          imgUrl: userResponse.data.imgUrl,
          level: userResponse.data.level,
          levelExp: userResponse.data.levelExp,
        });

        // 예약 목록
        const bookingsResponse = await axiosInstance.get(
          '/api/flights/my-bookings'
        );
        console.log('예약 목록:', bookingsResponse.data);
        if (bookingsResponse.data.success) {
          setBookings(bookingsResponse.data.data);
        }

        // AI 일정
        const aiPlansResponse = await axiosInstance.get('/api/aiplan/my-plans');
        console.log('AI 일정 목록:', aiPlansResponse.data);
        const aiTrips = aiPlansResponse.data.map((plan) => ({
          id: plan.id,
          title: `${
            destinationMap[plan.destination.toLowerCase()] || plan.destination
          } 여행`,
          date: `${plan.startDate} - ${plan.endDate}`,
          status: plan.status,
          planType: plan.planType,
          image:
            destinationMap[plan.destination.toLowerCase()] || plan.destination,
          color: getColorForDestination(plan.destination),
        }));

        // 수동 일정
        const manualPlansResponse = await axiosInstance.get(
          '/api/travel-plans/my-plans'
        );
        console.log('수동 일정 목록:', manualPlansResponse.data);
        const manualTrips = manualPlansResponse.data.map((plan) => ({
          id: plan.id,
          title: `${
            destinationMap[plan.destination.toLowerCase()] || plan.destination
          } 여행`,
          date: `${plan.startDate} - ${plan.endDate}`,
          status: plan.status,
          planType: plan.planType,
          image:
            destinationMap[plan.destination.toLowerCase()] || plan.destination,
          color: getColorForDestination(plan.destination),
        }));

        // AI와 수동 일정 통합
        setMyTrips([...aiTrips, ...manualTrips]);
      } catch (error) {
        console.error('데이터 요청 실패:', error);
        toast.error('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  const destinationMap = {
    tokyo: '도쿄',
    jeju: '제주도',
    bangkok: '방콕',
    paris: '파리',
    rome: '로마',
    venice: '베니스',
    fukuoka: '후쿠오카',
    singapore: '싱가포르',
    osaka: '오사카',
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
      singapore: '#f3d9fa',
      osaka: '#ff922b',
    };
    return colors[destination.toLowerCase()] || '#4dabf7';
  };

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
              <div className="h-2 w-32 bg-[#e7f5ff]">
                <div
                  className="h-full bg-[#4dabf7]"
                  style={{ width: `${percent}%` }}
                />
              </div>
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
                className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
              >
                <Settings className="mr-1 h-4 w-4" />
                설정
              </Button>
            </Link>

            <Link to="/profile-edit">
              <Button
                size="sm"
                variant="outline"
                className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
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
                            <path d="M50,80 L40,40 L60,40 Z" fill="#4dabf7" />
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
                            <path d="M50,80 L30,40 L70,40 Z" fill="#ff9a9e" />
                            <circle cx="50" cy="30" r="10" fill="#ff9a9e" />
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
                            <circle cx="50" cy="50" r="10" fill="#adb5bd" />
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
                        {trip.image === '오사카' && (
                          <>
                            <path
                              d="M50,20 L65,40 L60,65 L40,65 L35,40 Z"
                              fill="#ff922b"
                            />
                            <rect
                              x="45"
                              y="30"
                              width="10"
                              height="20"
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
                      {trip.planType || 'AI'}
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
                        <Plane
                          className="h-5 w-5"
                          style={{ color: '#93c5fd' }}
                        />
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
          <div className="space-y-6">
            {savedItems.length > 0 ? (
              savedItems.map((item) => (
                <div
                  key={item.placeId}
                  className="rounded-2xl bg-white p-6 shadow-md border border-gray-100 min-h-[160px] flex flex-col justify-between"
                >
                  {/* 상단 정보 */}
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#1e3a8a]">
                        {item.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-1 h-4 w-4 text-traveling-text" />
                        {item.city}
                        {item.country ? `, ${item.country}` : ''}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-4 w-4 text-traveling-text" />
                        저장일: {item.createdAt?.slice(0, 10)}
                      </div>
                    </div>

                    {/* 카테고리 뱃지 */}
                    <div className="text-right">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {item.type || '기타'}
                      </span>
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                      onClick={() => navigate(`/place/${item.placeId}`)}
                    >
                      상세보기
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(item.placeId)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#495057]">저장된 장소가 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            {myReviews.length > 0 ? (
              myReviews.map((review) => (
                <Card
                  key={review.id}
                  className="rounded-2xl bg-white p-6 shadow-md border border-gray-100 min-h-[160px]"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#1e3a8a]">
                        {review.title || '명소'}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-4 w-4 text-traveling-text" />
                        작성일: {review.createdAt?.slice(0, 10) || '날짜 없음'}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(review.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium text-yellow-500">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-700">
                    {review.content}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-300 hover:bg-red-50"
                      onClick={() => handleReviewDelete(review.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#495057]">작성된 리뷰가 없습니다.</p>
              </div>
            )}
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
