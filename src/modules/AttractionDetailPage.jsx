import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Star, MapPin, Globe, Phone, Clock, MessageSquare } from 'lucide-react';
import { Button } from '../modules/Button';
import { Badge } from '../modules/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../modules/Tabs';
import { NavBar } from '../components/Nav-bar';
import { ReviewForm } from '../components/travel-planner/Review-form';
import { Bookmark } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

function AttractionDetailPage() {
  const { id } = useParams(); // URL에서 placeId 추출
  const navigate = useNavigate();

  // ✅ 명소 정보 및 탭 상태
  const [basicPlace, setBasicPlace] = useState(null);
  const [detail, setDetail] = useState(null);
  const [tab, setTab] = useState('intro');

  // ✅ 리뷰 관련
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // ✅ 유저 정보
  const storedUser =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user'));
  const userNickname = storedUser?.nickname;

  // ✅ 명소 저장 (북마크)
  const handleSavePlace = async () => {
    try {
      const res = await axiosInstance.post('/api/saved-places', {
        placeId: basicPlace.placeId,
        name: basicPlace.name,
        city: basicPlace.city,
        country: basicPlace.country,
        image: basicPlace.image,
        type: basicPlace.type,
      });

      if (res.data.success) {
        alert('저장 완료!');
      } else {
        alert(res.data.message || '저장 실패');
      }
    } catch (err) {
      console.error('❌ 저장 요청 오류:', err);
      alert('오류 발생');
    }
  };

  // ✅ 리뷰 삭제
const handleDelete = async (placeId) => {
  try {
    const res = await axiosInstance.delete('/api/reviews', {
      params: { placeId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (res.data.success) {
      const deletedId = res.data.data.deletedId;
      setReviews((prev) => prev.filter((r) => r.id !== deletedId));
      alert('리뷰 삭제 완료');
    } else {
      alert(res.data.error?.message || '삭제 실패');
    }
  } catch (err) {
    console.error('❌ 삭제 중 오류:', err);
    alert('삭제 중 오류 발생');
  }
};



  // ✅ [1] 전체 명소 중 선택된 명소 찾기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('allPlaces')) || [];
    const found = stored.find((p) => p.placeId === id);
    setBasicPlace(found);
  }, [id]);

  // ✅ [2] 해당 명소에 대한 리뷰 불러오기
  useEffect(() => {
    if (!basicPlace?.placeId) return;

    fetch(`/api/reviews?placeId=${basicPlace.placeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setReviews(data.data);
        }
      })
      .catch((err) => console.error('리뷰 불러오기 실패:', err));
  }, [basicPlace]);

  // ✅ [3] 명소 상세정보 불러오기
  useEffect(() => {
    if (!basicPlace?.placeId) return;

    fetch(`/api/places/detail?placeId=${basicPlace.placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => console.error('❌ 상세정보 실패:', err));
  }, [basicPlace?.placeId]);

  // ✅ 예외처리
  if (!basicPlace) {
    return (
      <p className="text-center mt-10 text-red-500">
        명소 정보를 찾을 수 없습니다.
      </p>
    );
  }

  return (
    <>
      <NavBar />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        <div className="w-full bg-white rounded-xl shadow p-6">
          <img
            src={basicPlace.image || '/placeholder.svg'}
            alt={basicPlace.name}
            className="w-full h-[380px] object-cover rounded-xl shadow-sm mb-6 transition-opacity duration-700 opacity-0"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />

          {/* 헤더 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {detail?.name || basicPlace.name}
              </h2>
              <div className="mt-2 flex gap-2">
                <Badge className="bg-gray-200 text-gray-800 text-sm">
                  {basicPlace.category || '관광지'}
                </Badge>
                <Badge className="bg-pink-100 text-pink-600 text-sm">
                  {basicPlace.city || '도시 미지정'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-500 text-lg">
              <Star className="fill-yellow-400 h-5 w-5" />
              <span className="font-semibold">{detail?.rating ?? 'N/A'}</span>
              {detail?.user_ratings_total && (
                <span className="text-gray-500 text-sm">
                  (
                  {(
                    (detail?.user_ratings_total || 0) + (reviews?.length || 0)
                  ).toLocaleString()}
                  )
                </span>
              )}
            </div>
          </div>

          {/* 정보 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {detail?.formatted_address || basicPlace.address}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {detail?.international_phone_number || '전화번호 없음'}
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-1" />
              <div>
                {detail?.opening_hours?.weekday_text?.length > 0 ? (
                  <ul className="space-y-0.5">
                    {detail.opening_hours.weekday_text.map((text, idx) => (
                      <li key={idx}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  '운영 시간 정보 없음'
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {detail?.website ? (
                <a
                  href={detail.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  웹사이트 방문
                </a>
              ) : (
                '웹사이트 없음'
              )}
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleSavePlace}>
              <Bookmark className="mr-1 h-4 w-4" /> 저장
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(true)}
            >
              <MessageSquare className="h-4 w-4 mr-1" /> 리뷰 작성
            </Button>
            <Button variant="ghost">공유</Button>
          </div>

          {/* 탭 */}
          <Tabs value={tab} onValueChange={setTab} className="mt-10">
            <TabsList className="flex bg-gray-100 rounded-md overflow-hidden">
              <TabsTrigger
                value="intro"
                className={`flex-1 text-center px-4 py-2 text-sm ${
                  tab === 'intro'
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-500'
                }`}
              >
                상세 정보
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className={`flex-1 text-center px-4 py-2 text-sm ${
                  tab === 'photos'
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-500'
                }`}
              >
                사진
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className={`flex-1 text-center px-4 py-2 text-sm ${
                  tab === 'reviews'
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-500'
                }`}
              >
                리뷰
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intro" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">소개</h3>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {detail?.editorial_summary?.overview ||
                  '이 명소에 대한 소개 글이 없습니다.'}
              </p>
            </TabsContent>

            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detail?.photos?.slice(0, 6).map((photo, i) => {
                  const url = `/api/places/photo?photo_reference=${encodeURIComponent(
                    photo.photo_reference
                  )}`;
                  return (
                    <img
                      key={i}
                      src={url}
                      alt={`photo-${i}`}
                      className="rounded-xl object-cover h-48 w-full transition-opacity duration-700 ease-in-out opacity-0"
                      loading="lazy"
                      onLoad={(e) =>
                        e.currentTarget.classList.remove('opacity-0')
                      }
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                리뷰 (
                {(
                  (detail?.user_ratings_total || 0) + (reviews?.length || 0)
                ).toLocaleString()}
                )
              </h3>

              {/* 1. DB에 저장된 리뷰 먼저 표시 */}
              {Array.isArray(reviews) && reviews.length > 0 ? (
                <ul className="space-y-4">
                  {reviews.map((review, i) => (
                    <li key={`db-${i}`} className="border-b pb-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">
                          {review.nickname || '익명'}
                        </p>
                        {/* 내 닉네임일 때만 삭제 버튼 표시 */}
                        {review.nickname === userNickname && (
                          <button
                            onClick={() => handleDelete(review.placeId)}
                            className="text-red-500 text-xs"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700">
                        {review.content || '내용 없음'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* 2. 구글 리뷰도 같이 표시 */}
              {detail?.reviews?.length > 0 && (
                <ul className="space-y-4 mt-6">
                  {detail.reviews.slice(0, 5).map((review, i) => (
                    <li key={`google-${i}`} className="border-b pb-2">
                      <p className="text-sm font-medium">
                        {review.author_name}
                      </p>
                      <p className="text-gray-700">{review.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* 3. 아무 리뷰도 없을 때 */}
              {reviews.length === 0 &&
                (!detail?.reviews || detail.reviews.length === 0) && (
                  <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
                )}
            </TabsContent>
          </Tabs>

          <ReviewForm
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            placeName={detail?.name}
            placeType={basicPlace?.category || '관광지'}
            placeId={basicPlace?.placeId}
            onSuccess={() => {
              fetch(`/api/reviews?placeId=${basicPlace.placeId}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) setReviews(data.response);
                });
            }}
          />

          <div className="mt-8">
            <Button onClick={() => navigate(-1)}>← 돌아가기</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttractionDetailPage;
