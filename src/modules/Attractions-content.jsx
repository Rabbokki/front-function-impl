import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, MessageSquare } from 'lucide-react';
import { Button } from '../modules/Button';
import { Input } from '../modules/Input';
import { Card, CardContent } from '../modules/Card';
import { Badge } from '../modules/Badge';
import { ReviewForm } from '../components/travel-planner/Review-form';

function AttractionsContent() {
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 1. 초기 더미 데이터 로드
  useEffect(() => {
    fetch('/api/places/nearby?lat=35.6895&lng=139.6917')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaces(data);
          setAllPlaces(data);
          setFilteredAttractions(data);
        } else {
          console.error('❌ API 응답 오류:', data);
          fallbackToDummy();
        }
      })
      .catch((err) => {
        console.error('❌ API 실패:', err);
        fallbackToDummy();
      });
  }, []);

  function fallbackToDummy() {
    fetch('/data/places.json')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setAllPlaces(data);
        setFilteredAttractions(data);
      });
  }
  // 2. 필터링 및 검색 처리
  useEffect(() => {
    const filtered = allPlaces.filter(
      (attraction) =>
        (selectedCity === 'all' || attraction.cityId === selectedCity) &&
        ((attraction.name || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          (attraction.category || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (attraction.address || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (attraction.city || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );

    if (searchQuery && filtered.length === 0) {
      fetch(`/api/places/search?keyword=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPlaces(data);
            setAllPlaces(data);
            setFilteredAttractions(data);
          } else {
            console.warn('⚠️ 예상치 못한 응답:', data);
            setFilteredAttractions([]); // 빈 배열로 처리해서 map 오류 방지
          }
        })
        .catch((err) => {
          console.error('❌ 검색 API 오류:', err);
          setFilteredAttractions([]); // 오류 시도 방지
        });
    } else {
      setFilteredAttractions(filtered);
    }
  }, [searchQuery, selectedCity, allPlaces]);

  useEffect(() => {
    if (filteredAttractions.length > 0) {
      console.log('🖼️ 첫 번째 장소 이미지:', filteredAttractions[0].image);
    } else {
      console.log('📭 필터링된 명소가 없습니다.');
    }
  }, [filteredAttractions]);

  const cities = [
    { id: 'all', name: '전체' },
    { id: 'tokyo', name: '도쿄' },
    { id: 'osaka', name: '오사카' },
    { id: 'fukuoka', name: '후쿠오카' },
    { id: 'paris', name: '파리' },
    { id: 'rome', name: '로마' },
    { id: 'venice', name: '베니스' },
  ];

  const openReviewModal = (attraction) => {
    setSelectedPlace({
      name: attraction.name,
      type: attraction.category || '관광지',
    });
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
            추천 명소
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            인기 있는 여행지의 추천 명소들을 확인해보세요.
          </p>
        </div>

        {/* 검색창 + 버튼 필터 */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="명소 이름, 도시 등을 검색하세요"
              className="bg-traveling-background pl-10 border-traveling-text/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {cities.map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedCity === city.id
                    ? 'bg-traveling-purple text-white'
                    : 'border-traveling-text/30 text-traveling-text/70 hover:bg-traveling-background'
                }
                onClick={() => setSelectedCity(city.id)}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 카드 렌더링 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((attraction, idx) => (
            <Card
              key={attraction.id || idx}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <img
                  src={
                    attraction.image
                      ? attraction.image.startsWith('places/')
                        ? `/api/places/photo?name=${encodeURIComponent(
                            attraction.image
                          )}`
                        : attraction.image
                      : '/placeholder.svg'
                  }
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-traveling-text">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-traveling-yellow text-traveling-yellow" />
                    <span className="font-bold text-traveling-text">
                      {attraction.rating ?? 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-2">
                  <Badge className="bg-traveling-background text-traveling-text/70">
                    {attraction.category || '관광지'}
                  </Badge>
                  <Badge className="bg-traveling-pink/20 text-traveling-pink">
                    {attraction.city || '도시 미지정'}
                  </Badge>
                </div>

                <p className="mb-4 flex items-center text-sm text-traveling-text/70">
                  <MapPin className="mr-1 h-4 w-4 text-traveling-text/70" />
                  {attraction.address ||
                    attraction.vicinity ||
                    '주소 정보 없음'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm text-traveling-text/70">
                      <Star className="mr-1 h-4 w-4 text-traveling-pink" />
                      <span>{attraction.likes?.toLocaleString?.() || 0}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-traveling-purple"
                      onClick={() => openReviewModal(attraction)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-xs">리뷰</span>
                    </Button>
                  </div>
                  <Link to={`/place/${attraction.id || idx}`}>
                    <Button
                      size="sm"
                      className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
                    >
                      상세보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredAttractions.length === 0 && (
          <p className="text-center text-traveling-text/60 mt-4">
            검색 결과가 없습니다.
          </p>
        )}
      </Card>

      {selectedPlace && (
        <ReviewForm
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          placeName={selectedPlace.name}
          placeType={selectedPlace.type}
        />
      )}
    </div>
  );
}

export default AttractionsContent;
