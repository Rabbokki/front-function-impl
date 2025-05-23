import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { usePagination } from '../hooks/Use-pagination';
import { useSortData } from '../hooks/Use-sort-data';
import { getAllUsers, deleteUser, deletePostByUserId } from "../hooks/reducer/admin/adminThunk";
import { getAllPosts } from '../hooks/reducer/post/postThunk';
import { AdminViewUser } from './Admin-view-user';

import Hangul from 'hangul-js';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../modules/Tabs';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../modules/Card';

import { Button } from '../modules/Button';
import { SortArrows } from './Sort-arrows';
import { Input } from '../modules/Input';
import { Label } from '../modules/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../modules/Select';

import { Badge } from '../modules/Badge';
import { Avatar, AvatarFallback, AvatarImage } from "../modules/Avatar";
import {
  Users,
  FileText,
  Map,
  Settings,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Bell,
} from 'lucide-react';

function DonutChart({ title, value, change, trend, color, percentage, icon }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-[120px] h-[120px]">
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#f1f1f1"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-3"
              style={{ backgroundColor: `${color}30` }}
            >
              {icon}
            </div>
          </div>

          <div className="mt-4 text-center space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center justify-center">
              <span
                className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change}
              </span>
              <span className="ml-1 text-xs text-gray-500">지난 달 대비</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, description, time, icon }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="rounded-full bg-gray-100 p-2">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('overview');
  const [chartPeriod, setChartPeriod] = useState('month');

  // 유저
  const users = useSelector((state) => state.admin.users);
  const { items: sortedUsers, requestSort: requestUserSort, sortConfig: sortUserConfig } = useSortData(users, { key: 'createdAt', direction: 'desc' });
  const [selectedUser, setSelectedUser] = useState(null);

  //유저 수정 할데
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);

  //유저 search 할데
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const itemsPerPage  = 8;
  //유저 summary 볼데
  const {
    paginatedData: paginatedUsers,
    currentPage: userPage,
    isFirstPage: isFirstUserPage,
    isLastPage: isLastUserPage,
    pageStart: userPageStart,
    pageEnd: userPageEnd,
    paginate: paginateUsers,
    resetPagination: resetUserPagination,
  } = usePagination(filteredUsers, itemsPerPage);

  const displayedUsers = paginatedUsers;

  //게시글
  const posts = useSelector((state) => state.posts.posts);
  const { items: sortedPosts, requestSort: requestPostSort, sortConfig: sortPostConfig } = useSortData(posts, { key: 'createdAt', direction: 'desc' });
  const [categoryActiveTab, setCategoryActiveTab] = useState("ALL")
  const [postSearchTerm, setPostSearchTerm] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const {
    paginatedData: paginatedPosts,
    currentPage: postPage,
    isFirstPage: isFirstPostPage,
    isLastPage: isLastPostPage,
    pageStart: postPageStart,
    pageEnd: postPageEnd,
    paginate: paginatePosts,
    resetPagination: resetPostPagination,
  } = usePagination(filteredPosts, itemsPerPage);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts(({ category: categoryActiveTab, search: postSearchTerm })));
  }, [])
  
  useEffect(() => {
    console.log("users is: ", users)
  }, [users]);

  useEffect(() => {
    // When users or searchTerm changes, update filteredUsers
    const filtered = sortedUsers.filter((user) => {
      return (
        Hangul.search(user.name, userSearchTerm) !== -1 ||
        Hangul.search(user.nickname, userSearchTerm) !== -1 ||
        Hangul.search(user.email, userSearchTerm) !== -1
      );
    });
    setFilteredUsers(filtered);
    resetUserPagination();
  }, [sortedUsers, userSearchTerm]);

  useEffect(() => {
    const filtered = sortedPosts.filter((post) => {
      const title = post?.title || '';
      const userName = post?.userName || '';
      const term = postSearchTerm || '';

      return (
        Hangul.search(title, term) !== -1 ||
        Hangul.search(userName, term) !== -1
      );
    });

    setFilteredPosts(filtered);
    resetUserPagination();
  }, [sortedPosts, postSearchTerm]);

  useEffect(() => {
    console.log("posts is: ", posts)
  }, [posts])

  const generateDummyData = () => {
    const data = [];
    const now = new Date();
    const dataPoints =
      chartPeriod === 'day' ? 14 : chartPeriod === 'week' ? 8 : 6;

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(now);
      if (chartPeriod === 'day') {
        date.setDate(date.getDate() - (dataPoints - i - 1));
      } else if (chartPeriod === 'week') {
        date.setDate(date.getDate() - (dataPoints - i - 1) * 7);
      } else {
        date.setMonth(date.getMonth() - (dataPoints - i - 1));
      }

      data.push({
        date: date,
        users: Math.floor(Math.random() * 30) + 20,
        posts: Math.floor(Math.random() * 25) + 15,
        trips: Math.floor(Math.random() * 20) + 10,
        comments: Math.floor(Math.random() * 35) + 25,
      });
    }

    return data;
  };

  const [activityData] = useState(() => generateDummyData());

  const getMaxValue = () => {
    let max = 0;
    activityData.forEach((item) => {
      const total = item.users + item.posts + item.trips + item.comments;
      if (total > max) max = total;
    });
    return max;
  };

  const maxValue = getMaxValue();

  const formatDate = (date) => {
    if (chartPeriod === 'day' || chartPeriod === 'week') {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } else {
      return `${date.getMonth() + 1}월`;
    }
  };

  const handleUserSearchChange = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const handlePostSearchChange = (e) => {
    setPostSearchTerm(e.target.value);
  };

  const openUserEditModal = (user) => {
    setSelectedUser(user);
    setIsUserEditModalOpen(true);
  }

  const handleUserDelete = async (user) => {
    if (!window.confirm(`정말 ${user.name} 삭제 하겠습니가?`)) return;

    dispatch(deleteUser(user.id))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          alert("삭제 성공 했습니다.");
          dispatch(getAllUsers())
        } else {
          alert("삭제 실패 했습니다");
        }
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  }

  const handlePostDelete = async (post) => {
    if (!window.confirm(`정말 ${post.title} 삭제 하겠습니가?`)) return;

    try {
      await dispatch(deletePostByUserId({ postId: post.id, accountId: post.userId })).unwrap();
      alert("게시물이 삭제되었습니다!");
      dispatch(getAllPosts(({ category: categoryActiveTab, search: postSearchTerm })));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("게시물 삭제에 실패했습니다.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-traveling-purple/10 text-traveling-purple border-traveling-purple/30"
          >
            관리자
          </Badge>
          <p className="text-sm text-gray-500">
            최근 로그인: 2023년 4월 25일 15:14
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            알림
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            설정
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DonutChart
          title="총 사용자"
          value="2,845"
          change="+12%"
          trend="up"
          color="#FFD1DC"
          percentage={72}
          icon={<Users className="h-5 w-5" />}
        />
        <DonutChart
          title="총 게시글"
          value="1,257"
          change="+8%"
          trend="up"
          color="#BFDFFF"
          percentage={63}
          icon={<FileText className="h-5 w-5" />}
        />
        <DonutChart
          title="여행 계획"
          value="3,721"
          change="+15%"
          trend="up"
          color="#BFFCC6"
          percentage={85}
          icon={<Map className="h-5 w-5" />}
        />
        <DonutChart
          title="신규 가입"
          value="124"
          change="+5%"
          trend="up"
          color="#E6E6FA"
          percentage={45}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 md:w-fit">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="users">사용자 관리</TabsTrigger>
          <TabsTrigger value="posts">게시글 관리</TabsTrigger>
          <TabsTrigger value="trips">여행 관리</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>사이트 활동</CardTitle>
                  <CardDescription>최근 활동 통계</CardDescription>
                </div>
                <Select value={chartPeriod} onValueChange={setChartPeriod}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">일간</SelectItem>
                    <SelectItem value="week">주간</SelectItem>
                    <SelectItem value="month">월간</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>

              <CardContent>
                <div className="h-80">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#FFD1DC] mr-2"></div>
                        <span className="text-sm">사용자</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#BFDFFF] mr-2"></div>
                        <span className="text-sm">게시글</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#BFFCC6] mr-2"></div>
                        <span className="text-sm">여행 계획</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#E6E6FA] mr-2"></div>
                        <span className="text-sm">댓글</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-64 border border-gray-100 rounded-lg p-4">
                    {/* Y축 */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                      <span>100</span>
                      <span>75</span>
                      <span>50</span>
                      <span>25</span>
                      <span>0</span>
                    </div>

                    {/* 차트 영역 */}
                    <div className="absolute left-10 right-0 top-0 bottom-0">
                      {/* 그리드 라인 */}
                      <div className="absolute left-0 right-0 top-0 h-px bg-gray-200"></div>
                      <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-200"></div>
                      <div className="absolute left-0 right-0 top-2/4 h-px bg-gray-200"></div>
                      <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-200"></div>
                      <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>

                      {/* 막대 그래프 */}
                      <div className="flex items-end justify-between h-full pt-2 pb-6">
                        {activityData.map((item, index) => {
                          const userHeight = Math.max(
                            1,
                            (item.users / 100) * 100
                          );
                          const postHeight = Math.max(
                            1,
                            (item.posts / 100) * 100
                          );
                          const tripHeight = Math.max(
                            1,
                            (item.trips / 100) * 100
                          );
                          const commentHeight = Math.max(
                            1,
                            (item.comments / 100) * 100
                          );

                          return (
                            <div
                              key={index}
                              className="flex-1 flex flex-col items-center group mx-1"
                            >
                              <div className="relative w-full max-w-[30px] h-full flex flex-col-reverse">
                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                  <p className="font-medium">
                                    {formatDate(item.date)}
                                  </p>
                                  <p>사용자: {item.users}</p>
                                  <p>게시글: {item.posts}</p>
                                  <p>여행 계획: {item.trips}</p>
                                  <p>댓글: {item.comments}</p>
                                </div>

                                {/* 댓글 */}
                                <div
                                  className="w-full bg-[#E6E6FA] rounded-t"
                                  style={{ height: `${commentHeight}%` }}
                                ></div>

                                {/* 여행 계획 */}
                                <div
                                  className="w-full bg-[#BFFCC6]"
                                  style={{ height: `${tripHeight}%` }}
                                ></div>

                                {/* 게시글 */}
                                <div
                                  className="w-full bg-[#BFDFFF]"
                                  style={{ height: `${postHeight}%` }}
                                ></div>

                                {/* 사용자 */}
                                <div
                                  className="w-full bg-[#FFD1DC]"
                                  style={{ height: `${userHeight}%` }}
                                ></div>
                              </div>

                              {/* X축 레이블 */}
                              <span className="text-xs text-gray-500 mt-2">
                                {formatDate(item.date)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>최근 활동</CardTitle>
                <CardDescription>최근 시스템 활동 내역</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    title="새 사용자 가입"
                    description="user123@example.com"
                    time="10분 전"
                    icon={<Users className="h-4 w-4" />}
                  />
                  <ActivityItem
                    title="새 게시글 등록"
                    description="도쿄 여행 후기"
                    time="25분 전"
                    icon={<FileText className="h-4 w-4" />}
                  />
                  <ActivityItem
                    title="새 여행 계획 생성"
                    description="오사카 3박 4일"
                    time="1시간 전"
                    icon={<Map className="h-4 w-4" />}
                  />
                  <ActivityItem
                    title="시스템 알림"
                    description="백업 완료"
                    time="3시간 전"
                    icon={<Bell className="h-4 w-4" />}
                  />
                  <ActivityItem
                    title="설정 변경"
                    description="이메일 알림 설정 변경"
                    time="5시간 전"
                    icon={<Settings className="h-4 w-4" />}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>사용자 관리</CardTitle>
                <CardDescription>모든 사용자을 관리합니다</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    value={userSearchTerm}
                    onChange={handleUserSearchChange}
                    placeholder="사용자 검색..."
                    className="pl-8 w-full sm:w-[240px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        사용자 <span style={{ marginLeft: '6px' }}>{SortArrows('name', sortUserConfig, requestUserSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        닉내임 <span style={{ marginLeft: '6px' }}>{SortArrows('nickname', sortUserConfig, requestUserSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        이메일 <span style={{ marginLeft: '6px' }}>{SortArrows('email', sortUserConfig, requestUserSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        가입일 
                      </th><span style={{ marginLeft: '6px' }}>{SortArrows('createdAt', sortUserConfig, requestUserSort)}</span>
                      <th className="text-right py-3 px-4 font-medium">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUsers && displayedUsers.length > 0 ? (
                      displayedUsers.map((user, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.imgUrl || '/placeholder.svg?height=96&width=96'} />
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.nickname}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            {new Date(user.createdAt).toISOString().slice(0, 10)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openUserEditModal(user)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleUserDelete(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : ( 
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
                          유저 정보가 멊습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  총 {users.length}명의 사용자 중 {userPageStart + 1}-
                  {Math.min(userPageEnd, users.length)} 표시
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={isFirstUserPage} onClick={() => paginateUsers(-1)}>
                    이전
                  </Button>
                  <Button variant="outline" size="sm" disabled={isLastUserPage} onClick={() => paginateUsers(1)}>
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>게시글 관리</CardTitle>
                  <CardDescription>모든 게시글을 관리합니다</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      value={postSearchTerm}
                      onChange={handlePostSearchChange}
                      placeholder="게시글 검색..."
                      className="pl-8 w-full sm:w-[240px]"
                    />
                  </div>
                  <Select value={categoryActiveTab} onValueChange={setCategoryActiveTab}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="게시판을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white shadow-md">
                      <SelectItem value="ALL">모든 카테고리</SelectItem>
                      <SelectItem value="TIPS">꿀팁 게시판</SelectItem>
                      <SelectItem value="FREE">자유게시판</SelectItem>
                      <SelectItem value="MATE">여행메이트</SelectItem>
                    </SelectContent>
                </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        제목 <span style={{ marginLeft: '6px' }}>{SortArrows('title', sortPostConfig, requestPostSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        작성자 <span style={{ marginLeft: '6px' }}>{SortArrows('name', sortPostConfig, requestPostSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        카테고리
                      </th>
                      <th className="text-left py-3 px-4 font-medium cursor-pointer select-none">
                        작성일 <span style={{ marginLeft: '6px' }}>{SortArrows('createdAt', sortPostConfig, requestPostSort)}</span>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">상태</th>
                      <th className="text-right py-3 px-4 font-medium">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPosts && paginatedPosts.length > 0 ? (
                      paginatedPosts?.map((post, i) => (
                        <tr key={post.title} className="border-b">
                          <td className="py-3 px-4">
                            <Link
                              to={`/community/post/${post.id}`}
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              {post.title}
                            </Link>
                          </td>
                          <td className="py-3 px-4">{post.userName}</td>
                          <td className="py-3 px-4">
                            {post.category === 'TIPS' ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                꿀팁
                              </Badge>
                            ) : post.category === 'FREE' ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                자유
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-purple-50 text-purple-700 border-purple-200"
                              >
                                메이트
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">{new Date(post.createdAt).toISOString().slice(0, 10)}</td>
                          <td className="py-3 px-4">
                            {!post.reported ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                게시됨
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200"
                              >
                                신고됨
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handlePostDelete(post)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
                          게시 정보가 멊습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  총 {posts.length}개의 게시글 중 {postPageStart + 1}-{Math.min(postPageEnd, posts.length)} 표시
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={isFirstPostPage} onClick={() => paginatePosts(-1)}>
                    이전
                  </Button>
                  <Button variant="outline" size="sm" disabled={isLastPostPage} onClick={() => paginatePosts(1)}>
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>여행 관리</CardTitle>
                  <CardDescription>
                    사용자 여행 계획을 관리합니다
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="여행 검색..."
                      className="pl-8 w-full sm:w-[240px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="여행 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="planned">계획됨</SelectItem>
                      <SelectItem value="ongoing">진행중</SelectItem>
                      <SelectItem value="completed">완료됨</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        여행 제목
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        사용자
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        목적지
                      </th>
                      <th className="text-left py-3 px-4 font-medium">기간</th>
                      <th className="text-left py-3 px-4 font-medium">상태</th>
                      <th className="text-right py-3 px-4 font-medium">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: '도쿄 벚꽃 여행',
                        user: '김여행',
                        destination: '도쿄',
                        period: '2023-04-01 ~ 2023-04-05',
                        status: 'completed',
                      },
                      {
                        title: '오사카 맛집 탐방',
                        user: '이모험',
                        destination: '오사카',
                        period: '2023-05-10 ~ 2023-05-15',
                        status: 'planned',
                      },
                      {
                        title: '유럽 백패킹',
                        user: '박세계',
                        destination: '파리, 로마, 베니스',
                        period: '2023-05-20 ~ 2023-06-10',
                        status: 'planned',
                      },
                      {
                        title: '방콕 힐링 여행',
                        user: '최탐험',
                        destination: '방콕',
                        period: '2023-04-15 ~ 2023-04-20',
                        status: 'ongoing',
                      },
                      {
                        title: '제주도 가족 여행',
                        user: '정글로벌',
                        destination: '제주도',
                        period: '2023-07-01 ~ 2023-07-05',
                        status: 'planned',
                      },
                      {
                        title: '싱가포르 출장',
                        user: '한여행자',
                        destination: '싱가포르',
                        period: '2023-04-10 ~ 2023-04-13',
                        status: 'completed',
                      },
                      {
                        title: '후쿠오카 주말 여행',
                        user: '윤세계인',
                        destination: '후쿠오카',
                        period: '2023-06-02 ~ 2023-06-04',
                        status: 'planned',
                      },
                      {
                        title: '파리 신혼여행',
                        user: '송여정',
                        destination: '파리',
                        period: '2023-09-10 ~ 2023-09-20',
                        status: 'planned',
                      },
                    ].map((trip, i) => (
                      <tr key={trip.title} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{trip.title}</div>
                        </td>
                        <td className="py-3 px-4">{trip.user}</td>
                        <td className="py-3 px-4">{trip.destination}</td>
                        <td className="py-3 px-4">{trip.period}</td>
                        <td className="py-3 px-4">
                          {trip.status === 'completed' ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              완료됨
                            </Badge>
                          ) : trip.status === 'ongoing' ? (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              진행중
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              계획됨
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  총 8개의 여행 중 1-8 표시
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    이전
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>시스템 설정</CardTitle>
              <CardDescription>관리자 시스템 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">일반 설정</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="site-name">사이트 이름</Label>
                      <Input id="site-name" defaultValue="트래블링" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="site-description">사이트 설명</Label>
                      <Input
                        id="site-description"
                        defaultValue="여행 계획 및 커뮤니티 플랫폼"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">연락처 이메일</Label>
                      <Input
                        id="contact-email"
                        defaultValue="contact@traveling.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">알림 설정</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="new-user-notification"
                          className="block"
                        >
                          새 사용자 알림
                        </Label>
                        <p className="text-sm text-gray-500">
                          새 사용자가 가입할 때 알림 받기
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="new-user-notification"
                          className="sr-only"
                        >
                          새 사용자 알림
                        </Label>
                        <input
                          type="checkbox"
                          id="new-user-notification"
                          className="h-4 w-4 rounded border-gray-300 text-traveling-purple focus:ring-traveling-purple"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="new-post-notification"
                          className="block"
                        >
                          새 게시글 알림
                        </Label>
                        <p className="text-sm text-gray-500">
                          새 게시글이 작성될 때 알림 받기
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="new-post-notification"
                          className="sr-only"
                        >
                          새 게시글 알림
                        </Label>
                        <input
                          type="checkbox"
                          id="new-post-notification"
                          className="h-4 w-4 rounded border-gray-300 text-traveling-purple focus:ring-traveling-purple"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="report-notification" className="block">
                          신고 알림
                        </Label>
                        <p className="text-sm text-gray-500">
                          게시글이나 댓글이 신고될 때 알림 받기
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="report-notification"
                          className="sr-only"
                        >
                          신고 알림
                        </Label>
                        <input
                          type="checkbox"
                          id="report-notification"
                          className="h-4 w-4 rounded border-gray-300 text-traveling-purple focus:ring-traveling-purple"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">백업 설정</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="backup-frequency">백업 주기</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="백업 주기 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">매시간</SelectItem>
                          <SelectItem value="daily">매일</SelectItem>
                          <SelectItem value="weekly">매주</SelectItem>
                          <SelectItem value="monthly">매월</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="backup-retention">백업 보관 기간</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="backup-retention">
                          <SelectValue placeholder="백업 보관 기간 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7일</SelectItem>
                          <SelectItem value="14">14일</SelectItem>
                          <SelectItem value="30">30일</SelectItem>
                          <SelectItem value="90">90일</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>설정 저장</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedUser && (
        <AdminViewUser
          isOpen={isUserEditModalOpen}
          onClose={() => setIsUserEditModalOpen(false)}
          user={selectedUser}
          onUserUpdated={() => dispatch(getAllUsers())}
        />
      )}

    </div>
  );
}
