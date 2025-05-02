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
import { Avatar, AvatarFallback, AvatarImage } from '../../modules/Avatar';
import { Progress } from '../../modules/Progress';
import { Badge } from '../../modules/Badge';
import { Input } from '../../modules/Input';
import { Label } from '../../modules/Label';
import { Textarea } from '../../modules/Textarea';
import axiosInstance from '../../api/axiosInstance';

function MyPageContent() {
  const [activeTab, setActiveTab] = useState('my-trips');

  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    level: '',
    levelExp: 0,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/accounts/mypage');
        console.log('회원정보', res.data);
        setUserInfo({
          email: res.data.email,
          nickname: res.data.nickname,
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

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-8 flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
        <Avatar className="h-24 w-24 border-4 border-[#4dabf7]">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="프로필 이미지"
          />
          {/* <AvatarFallback className="bg-[#e7f5ff] text-[#1e3a8a]">
            여행자
          </AvatarFallback> */}
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
              <Badge className="ml-2 bg-[#ffd43b] text-[#1e3a8a]">
                Lv.{userInfo.levelExp}
              </Badge>
            </div>
            <div className="mt-1 flex items-center">
              <Progress
                value={65}
                className="h-2 w-32 bg-[#e7f5ff]"
                indicatorClassName="bg-[#4dabf7]"
              />
              <span className="ml-2 text-xs text-[#495057]">65%</span>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <Link href="/mypage/settings">
              <Button
                size="sm"
                variant="outline"
                className="border-traveling-blue text-traveling-text hover:bg-traveling-light-blue"
              >
                <Settings className="mr-1 h-4 w-4" />
                설정
              </Button>
            </Link>
            <Link href="/mypage/profile-edit">
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

        {/* <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            {userInfo.nickname}
          </h2>
          <p className="text-[#495057]">{userInfo.email}</p>
        </div> */}
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
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            프로필/수정
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

        <TabsContent value="profile">
          <Card className="bg-[#f8f9fa]">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a]">
                프로필 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="username" className="text-[#1e3a8a]">
                  닉네임
                </Label>
                <Input
                  id="username"
                  value={userInfo.nickname}
                  readOnly
                  className="bg-[#e7f5ff]/30"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="text-[#1e3a8a]">
                  이메일
                </Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  readOnly
                  className="bg-[#e7f5ff]/30"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="bio" className="text-[#1e3a8a]">
                  자기소개
                </Label>
                <Textarea
                  id="bio"
                  defaultValue="여행 좋아하는 30대 직장인입니다. 맛집 탐방과 사진 찍는 것을 좋아해요."
                  className="min-h-[100px] bg-[#e7f5ff]/30"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="preferences" className="text-[#1e3a8a]">
                  여행 선호도
                </Label>
                <div className="flex flex-wrap gap-2">
                  {['맛집', '자연', '문화', '쇼핑', '휴양', '모험', '사진'].map(
                    (pref) => (
                      <Badge
                        key={pref}
                        className="bg-[#e7f5ff] text-[#1c7ed6] hover:bg-[#4dabf7] hover:text-white cursor-pointer"
                      >
                        {pref}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="profile-image" className="text-[#1e3a8a]">
                  프로필 이미지
                </Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-2 border-[#4dabf7]">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="프로필 이미지"
                    />
                    <AvatarFallback className="bg-[#e7f5ff] text-[#1e3a8a]">
                      여행자
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  >
                    이미지 변경
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-[#e7f5ff]/30 p-4">
              <Button
                variant="outline"
                className="border-[#adb5bd] text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
              >
                취소
              </Button>
              <Button className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
                저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyPageContent;
