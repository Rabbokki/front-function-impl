import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, MessageSquare } from 'lucide-react';
import { Button } from '../modules/Button';
import { Input } from '../modules/Input';
import { Card, CardContent } from '../modules/Card';
import { Badge } from '../modules/Badge';
import { ReviewForm } from '../components/travel-planner/Review-form';
//하나의 명소에 대한 상세정보 보여줌
function AttractionsContent() {
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const cityMeta = {
    all: { name: '전체', lat: null, lng: null },
    tokyo: { name: '도쿄', lat: 35.6895, lng: 139.6917 },
    osaka: { name: '오사카', lat: 34.6937, lng: 135.5023 },
    fukuoka: { name: '후쿠오카', lat: 33.5902, lng: 130.4017 },
    paris: { name: '파리', lat: 48.8566, lng: 2.3522 },
    rome: { name: '로마', lat: 41.9028, lng: 12.4964 },
    venice: { name: '베니스', lat: 45.4408, lng: 12.3155 },
  };

  const cities = Object.entries(cityMeta).map(([id, meta]) => ({
    id,
    name: meta.name,
  }));

  // 전체 도시 한 번에 불러오기
  useEffect(() => {
    const loadAllCities = async () => {
      const cityEntries = Object.entries(cityMeta).filter(
        ([id]) => id !== 'all'
      );
      const allResults = await Promise.all(
        cityEntries.map(async ([id, { lat, lng, name }]) => {
          const res = await fetch(
            `/api/places/nearby?lat=${lat}&lng=${lng}&city=${encodeURIComponent(
              name
            )}&cityId=${id}`
          );
          return res.json();
        })
      );
      const merged = allResults.flat().filter(Boolean);
      const unique = Array.from(
        new Map(merged.map((item) => [item.name + item.cityId, item])).values()
      );
      setAllPlaces(unique);
      setFilteredAttractions(unique);
    };
    loadAllCities();
  }, []);

  // 도시 선택 시 필터링
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

    console.log(
      '🧪 필터링된 명소:',
      filtered.map((p) => ({
        name: p.name,
        city: p.city,
        cityId: p.cityId,
      }))
    );

    setFilteredAttractions(filtered);
  }, [searchQuery, selectedCity, allPlaces]);

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
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-traveling-text">추천 명소</h2>
          <p className="text-sm text-traveling-text/70">
            인기 있는 여행지의 추천 명소들을 확인해보세요.
          </p>
        </div>

        {/* 검색창 */}
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

        {/* 도시 버튼 */}
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

        {/* 명소 카드 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((attraction, idx) => (
            <Card
              key={attraction.id || idx}
              className="overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative h-48 w-full">
                <img
                  src={attraction.image || '/placeholder.svg'}
                  alt={attraction.name}
                  className="w-full h-[180px] object-cover rounded-t-xl opacity-0 transition-opacity duration-700 ease-in-out"
                  loading="lazy"
                  onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-traveling-text">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-traveling-yellow text-traveling-yellow" />
                    <span className="font-bold">
                      {attraction.rating ?? 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-traveling-background text-traveling-text/70">
                    {attraction.category || '관광지'}
                  </Badge>
                  <Badge className="bg-traveling-pink/20 text-traveling-pink">
                    {cityMeta[attraction.cityId]?.name || '도시 미지정'}
                  </Badge>
                </div>
                <p className="text-sm text-traveling-text/70 flex items-center mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {attraction.address || '주소 정보 없음'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-traveling-purple"
                      onClick={() => openReviewModal(attraction)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-xs">
                        리뷰 {(attraction.reviewCount || 0).toLocaleString()}
                      </span>
                    </Button>
                  </div>
                  <Link to={`/place/${attraction.placeId}`}>
                    <Button
                      size="sm"
                      className="bg-traveling-purple text-white"
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
