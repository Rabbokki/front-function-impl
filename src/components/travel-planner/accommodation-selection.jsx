import React, { useState } from 'react';
import { Search, MapPin, Star, ArrowRight, Heart } from 'lucide-react';
import { Button } from '../../modules/Button';
import { Input } from '../../modules/Input';
import { Card } from '../../modules/Card';
import { Badge } from '../../modules/Badge';
import MapComponent from './map-component';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AccommodationSelection({ destination }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedHotels, setSelectedHotels] = useState({
    day1: '',
    day2: '',
    day3: '',
  });

  const [activeDay, setActiveDay] = useState('day1');
  const [hoveredHotel, setHoveredHotel] = useState(null);
  const [starRating, setStarRating] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  // 도시별 호텔 데이터
  const hotelsData = {
    osaka: {
      name: '오사카',
      center: { lat: 34.6937, lng: 135.5023 },
      hotels: [
        {
          id: 'hotel1',
          name: '호텔 한큐 리스메이아 오사카',
          type: '호텔',
          rating: 4.8,
          reviews: 1387,
          location: '1-1 Ofukacho, Kita Ward, Osaka, 530-0011',
          price: 250000,
          facilities: ['무료 와이파이', '조식 포함', '수영장'],
          image: '/images/hotels/hotel1.jpg',
          discount: '10% 할인',
          position: { lat: 34.7033, lng: 135.4984 },
        },
        {
          id: 'hotel2',
          name: 'BON 콘드 難波日本橋',
          type: '콘도미니엄',
          rating: 4.3,
          reviews: 314,
          location: '1-chome-8-17 Nipponbashi, Chuo Ward, Osaka, 542-0073',
          price: 180000,
          facilities: ['무료 와이파이', '주방'],
          image: '/images/hotels/hotel2.jpg',
          discount: '',
          position: { lat: 34.6641, lng: 135.5066 },
        },
        {
          id: 'hotel3',
          name: '콘래드 오사카',
          type: '호텔',
          rating: 4.5,
          reviews: 270,
          location: '3-chome-2-4 Nakanoshima, Kita Ward, Osaka, 530-0005',
          price: 320000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '피트니스 센터'],
          image: '/images/hotels/hotel3.jpg',
          discount: '얼리버드 15% 할인',
          position: { lat: 34.6936, lng: 135.5023 },
        },
        {
          id: 'hotel4',
          name: '소테츠 그랜드프레사 오사카난바',
          type: '호텔',
          rating: 3.9,
          reviews: 205,
          location: '1-chome-1-13 Nipponbashi, Chuo Ward, Osaka, 542-0073',
          price: 150000,
          facilities: ['무료 와이파이'],
          image: '/osaka-hotel-modern.png',
          discount: '',
          position: { lat: 34.6633, lng: 135.5055 },
        },
        {
          id: 'hotel5',
          name: 'APA 호텔 & 리조트 오사카 우메다',
          type: '호텔',
          rating: 4.0,
          reviews: 185,
          location: '2-chome-8-32 Sonezaki, Kita Ward, Osaka, 530-0057',
          price: 170000,
          facilities: ['무료 와이파이', '레스토랑'],
          image: '/apa-hotel-osaka-poolside.png',
          discount: '연박 20% 할인',
          position: { lat: 34.7025, lng: 135.4989 },
        },
      ],
    },
    tokyo: {
      name: '도쿄',
      center: { lat: 35.6762, lng: 139.6503 },
      hotels: [
        {
          id: 'hotel1',
          name: '도쿄 메트로폴리탄 호텔',
          type: '호텔',
          rating: 4.7,
          reviews: 1245,
          location: '6 Chome-6-1 Nishishinjuku, Shinjuku City, Tokyo 160-0023',
          price: 280000,
          facilities: ['무료 와이파이', '조식 포함', '수영장'],
          image: '/tokyo-hotel-luxury-suite.png',
          discount: '10% 할인',
          position: { lat: 35.6895, lng: 139.6917 },
        },
        {
          id: 'hotel2',
          name: '시타딘 센트럴 신주쿠 도쿄',
          type: '레지던스',
          rating: 4.5,
          reviews: 876,
          location: '3 Chome-14-1 Shinjuku, Shinjuku City, Tokyo 160-0022',
          price: 220000,
          facilities: ['무료 와이파이', '주방', '세탁 시설'],
          image: '/citadines-shinjuku-exterior.png',
          discount: '',
          position: { lat: 35.6912, lng: 139.7091 },
        },
        {
          id: 'hotel3',
          name: '호텔 그레이서리 신주쿠',
          type: '호텔',
          rating: 4.3,
          reviews: 654,
          location: '1 Chome-19-1 Kabukicho, Shinjuku City, Tokyo 160-0021',
          price: 190000,
          facilities: ['무료 와이파이', '레스토랑'],
          image: '/godzilla-gracery-night.png',
          discount: '얼리버드 10% 할인',
          position: { lat: 35.6941, lng: 139.7015 },
        },
        {
          id: 'hotel4',
          name: '호텔 릴랙스 도쿄',
          type: '호텔',
          rating: 4.0,
          reviews: 432,
          location: '5 Chome-5-13 Ueno, Taito City, Tokyo 110-0005',
          price: 150000,
          facilities: ['무료 와이파이'],
          image: '/tokyo-hotel-comfort.png',
          discount: '',
          position: { lat: 35.7125, lng: 139.7774 },
        },
        {
          id: 'hotel5',
          name: '미츠이 가든 호텔 긴자 프리미어',
          type: '호텔',
          rating: 4.6,
          reviews: 987,
          location: '8 Chome-13-1 Ginza, Chuo City, Tokyo 104-0061',
          price: 310000,
          facilities: ['무료 와이파이', '조식 포함', '피트니스 센터'],
          image: '/ginza-premier-city-view.png',
          discount: '연박 15% 할인',
          position: { lat: 35.6694, lng: 139.7649 },
        },
      ],
    },
    fukuoka: {
      name: '후쿠오카',
      center: { lat: 33.5902, lng: 130.4017 },
      hotels: [
        {
          id: 'hotel1',
          name: '그랜드 하얏트 후쿠오카',
          type: '호텔',
          rating: 4.7,
          reviews: 876,
          location: '1 Chome-2-82 Sumiyoshi, Hakata Ward, Fukuoka, 812-0018',
          price: 270000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '피트니스 센터'],
          image: '/grand-hyatt-fukuoka-suite.png',
          discount: '10% 할인',
          position: { lat: 33.5898, lng: 130.4108 },
        },
        {
          id: 'hotel2',
          name: 'JR 규슈 호텔 블로섬 하카타 중앙',
          type: '호텔',
          rating: 4.4,
          reviews: 654,
          location:
            '4 Chome-1-1 Hakataekichuogai, Hakata Ward, Fukuoka, 812-0012',
          price: 180000,
          facilities: ['무료 와이파이', '레스토랑'],
          image: '/hakata-central-modern-room.png',
          discount: '',
          position: { lat: 33.5903, lng: 130.4208 },
        },
        {
          id: 'hotel3',
          name: '리치몬드 호텔 후쿠오카 텐진',
          type: '호텔',
          rating: 4.3,
          reviews: 543,
          location: '2 Chome-8-27 Tenjin, Chuo Ward, Fukuoka, 810-0001',
          price: 160000,
          facilities: ['무료 와이파이', '조식 포함'],
          image: '/richmond-fukuoka-tenjin-comfortable-room.png',
          discount: '얼리버드 5% 할인',
          position: { lat: 33.5917, lng: 130.3984 },
        },
        {
          id: 'hotel4',
          name: '호텔 니코 후쿠오카',
          type: '호텔',
          rating: 4.6,
          reviews: 765,
          location:
            '2 Chome-18-25 Hakata Ekimae, Hakata Ward, Fukuoka, 812-0011',
          price: 230000,
          facilities: ['무료 와이파이', '조식 포함', '피트니스 센터'],
          image: '/nikko-fukuoka-elegant-suite.png',
          discount: '연박 10% 할인',
          position: { lat: 33.5896, lng: 130.4183 },
        },
        {
          id: 'hotel5',
          name: '하카타 그린 호텔 아넥스',
          type: '호텔',
          rating: 4.0,
          reviews: 432,
          location: '4 Chome-8-31 Hakataekimae, Hakata Ward, Fukuoka, 812-0011',
          price: 120000,
          facilities: ['무료 와이파이'],
          image: '/hakata-green-annex-simple-room.png',
          discount: '',
          position: { lat: 33.5889, lng: 130.4201 },
        },
      ],
    },
    paris: {
      name: '파리',
      center: { lat: 48.8566, lng: 2.3522 },
      hotels: [
        {
          id: 'hotel1',
          name: '호텔 플라자 아테네 파리',
          type: '호텔',
          rating: 4.8,
          reviews: 1245,
          location: '25 Avenue Montaigne, 75008 Paris, France',
          price: 450000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '스파'],
          image: '/opulent-paris-suite.png',
          discount: '10% 할인',
          position: { lat: 48.8661, lng: 2.3031 },
        },
        {
          id: 'hotel2',
          name: '르 메르디앙 에투알',
          type: '호텔',
          rating: 4.6,
          reviews: 987,
          location: '81 Boulevard Gouvion Saint-Cyr, 75017 Paris, France',
          price: 320000,
          facilities: ['무료 와이파이', '조식 포함', '피트니스 센터'],
          image: '/paris-etoile-guest-room.png',
          discount: '',
          position: { lat: 48.8794, lng: 2.2812 },
        },
        {
          id: 'hotel3',
          name: '시타딘 생제르맹데프레 파리',
          type: '레지던스',
          rating: 4.5,
          reviews: 765,
          location: '53 Ter Quai des Grands Augustins, 75006 Paris, France',
          price: 280000,
          facilities: ['무료 와이파이', '주방', '세탁 시설'],
          image: '/citadines-saint-germain-des-pres-apartment-interior.png',
          discount: '얼리버드 15% 할인',
          position: { lat: 48.8561, lng: 2.3417 },
        },
        {
          id: 'hotel4',
          name: '이비스 파리 투르 에펠',
          type: '호텔',
          rating: 4.2,
          reviews: 654,
          location: '2 Rue Cambronne, 75015 Paris, France',
          price: 180000,
          facilities: ['무료 와이파이', '레스토랑'],
          image: '/ibis-eiffel-view.png',
          discount: '',
          position: { lat: 48.8471, lng: 2.3003 },
        },
        {
          id: 'hotel5',
          name: '호텔 몰리토르 파리',
          type: '호텔',
          rating: 4.7,
          reviews: 543,
          location: '13 Rue Nungesser et Coli, 75016 Paris, France',
          price: 380000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '스파'],
          image: '/molitor-rooftop-pool.png',
          discount: '연박 10% 할인',
          position: { lat: 48.8451, lng: 2.2529 },
        },
      ],
    },
    rome: {
      name: '로마',
      center: { lat: 41.9028, lng: 12.4964 },
      hotels: [
        {
          id: 'hotel1',
          name: '호텔 하슬러 로마',
          type: '호텔',
          rating: 4.8,
          reviews: 1234,
          location: 'Piazza Trinità dei Monti, 6, 00187 Roma RM, Italy',
          price: 420000,
          facilities: ['무료 와이파이', '조식 포함', '레스토랑', '스파'],
          image: '/hassler-city-view.png',
          discount: '10% 할인',
          position: { lat: 41.9057, lng: 12.4842 },
        },
        {
          id: 'hotel2',
          name: '로마 카발리에리 호텔',
          type: '호텔',
          rating: 4.7,
          reviews: 987,
          location: 'Via Alberto Cadlolo, 101, 00136 Roma RM, Italy',
          price: 380000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '피트니스 센터'],
          image: '/rome-cavalieri-pool-view.png',
          discount: '얼리버드 15% 할인',
          position: { lat: 41.9178, lng: 12.4474 },
        },
        {
          id: 'hotel3',
          name: '호텔 아르테미데',
          type: '호텔',
          rating: 4.6,
          reviews: 876,
          location: 'Via Nazionale, 22, 00184 Roma RM, Italy',
          price: 250000,
          facilities: ['무료 와이파이', '조식 포함', '스파'],
          image: '/artemide-rome-elegant-room.png',
          discount: '',
          position: { lat: 41.9008, lng: 12.493 },
        },
        {
          id: 'hotel4',
          name: '인 & 아웃 로마',
          type: '게스트하우스',
          rating: 4.4,
          reviews: 654,
          location: 'Via degli Scipioni, 135, 00192 Roma RM, Italy',
          price: 150000,
          facilities: ['무료 와이파이', '공용 주방'],
          image: '/rome-guesthouse-room.png',
          discount: '',
          position: { lat: 41.9082, lng: 12.4584 },
        },
        {
          id: 'hotel5',
          name: '호텔 인디고 로마',
          type: '호텔',
          rating: 4.5,
          reviews: 765,
          location: 'Via Giulia, 62, 00186 Roma RM, Italy',
          price: 280000,
          facilities: ['무료 와이파이', '조식 포함', '레스토랑'],
          image: '/hotel-indigo-rome-modern-room.png',
          discount: '연박 10% 할인',
          position: { lat: 41.8967, lng: 12.4702 },
        },
      ],
    },
    venice: {
      name: '베니스',
      center: { lat: 45.4408, lng: 12.3155 },
      hotels: [
        {
          id: 'hotel1',
          name: '그리티 팰리스 베니스',
          type: '호텔',
          rating: 4.8,
          reviews: 987,
          location: 'Campo Santa Maria del Giglio, 30124 Venezia VE, Italy',
          price: 450000,
          facilities: ['무료 와이파이', '조식 포함', '레스토랑', '운하 전망'],
          image: '/gritti-canal-luxury.png',
          discount: '10% 할인',
          position: { lat: 45.4312, lng: 12.3347 },
        },
        {
          id: 'hotel2',
          name: '호텔 다니엘리',
          type: '호텔',
          rating: 4.7,
          reviews: 876,
          location: 'Riva degli Schiavoni, 4196, 30122 Venezia VE, Italy',
          price: 420000,
          facilities: ['무료 와이파이', '조식 포함', '레스토랑', '바다 전망'],
          image: '/hotel-danieli-historic-elegance.png',
          discount: '얼리버드 15% 할인',
          position: { lat: 45.4338, lng: 12.3424 },
        },
        {
          id: 'hotel3',
          name: '호텔 아이 레알리',
          type: '호텔',
          rating: 4.6,
          reviews: 765,
          location: 'Campo della Fava, 5527, 30122 Venezia VE, Italy',
          price: 280000,
          facilities: ['무료 와이파이', '조식 포함'],
          image: '/hotel-ai-reali-elegant-suite.png',
          discount: '',
          position: { lat: 45.4379, lng: 12.3371 },
        },
        {
          id: 'hotel4',
          name: '제네레이터 베니스',
          type: '호스텔',
          rating: 4.3,
          reviews: 654,
          location: 'Fondamenta Zitelle, 86, 30133 Venezia VE, Italy',
          price: 120000,
          facilities: ['무료 와이파이', '공용 주방', '바'],
          image:
            '/placeholder.svg?height=300&width=400&query=Generator Venice hostel modern room',
          discount: '',
          position: { lat: 45.4259, lng: 12.3312 },
        },
        {
          id: 'hotel5',
          name: '팔라조 벤드라민',
          type: '호텔',
          rating: 4.5,
          reviews: 543,
          location: 'Calle Larga XXII Marzo, 2403, 30124 Venezia VE, Italy',
          price: 350000,
          facilities: ['무료 와이파이', '조식 포함', '운하 전망'],
          image:
            '/placeholder.svg?height=300&width=400&query=Palazzo Vendramin Venice historic room with canal view',
          discount: '연박 10% 할인',
          position: { lat: 45.4323, lng: 12.3351 },
        },
      ],
    },
    bangkok: {
      name: '방콕',
      center: { lat: 13.7563, lng: 100.5018 },
      hotels: [
        {
          id: 'hotel1',
          name: '만다린 오리엔탈 방콕',
          type: '호텔',
          rating: 4.9,
          reviews: 1234,
          location: '48 Oriental Avenue, Bang Rak, Bangkok 10500, Thailand',
          price: 380000,
          facilities: [
            '무료 와이파이',
            '조식 포함',
            '수영장',
            '스파',
            '강변 전망',
          ],
          image:
            '/placeholder.svg?height=300&width=400&query=Mandarin Oriental Bangkok luxury room with river view',
          discount: '10% 할인',
          position: { lat: 13.7262, lng: 100.5131 },
        },
        {
          id: 'hotel2',
          name: '소 소피텔 방콕',
          type: '호텔',
          rating: 4.7,
          reviews: 987,
          location: '2 North Sathorn Road, Bangrak, Bangkok 10500, Thailand',
          price: 320000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '피트니스 센터'],
          image:
            '/placeholder.svg?height=300&width=400&query=SO Sofitel Bangkok modern room with city view',
          discount: '얼리버드 15% 할인',
          position: { lat: 13.7262, lng: 100.5282 },
        },
        {
          id: 'hotel3',
          name: '센타라 그랜드 앳 센트럴 월드',
          type: '호텔',
          rating: 4.6,
          reviews: 876,
          location: '999/99 Rama 1 Road, Pathumwan, Bangkok 10330, Thailand',
          price: 250000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '피트니스 센터'],
          image:
            '/placeholder.svg?height=300&width=400&query=Centara Grand at Central World Bangkok hotel room',
          discount: '',
          position: { lat: 13.7466, lng: 100.5392 },
        },
        {
          id: 'hotel4',
          name: '이비스 방콕 시암',
          type: '호텔',
          rating: 4.3,
          reviews: 765,
          location: '927 Rama 1 Road, Pathumwan, Bangkok 10330, Thailand',
          price: 120000,
          facilities: ['무료 와이파이', '레스토랑'],
          image:
            '/placeholder.svg?height=300&width=400&query=Ibis Bangkok Siam modern room',
          discount: '',
          position: { lat: 13.7456, lng: 100.5331 },
        },
        {
          id: 'hotel5',
          name: '르부아 앳 스테이트 타워',
          type: '호텔',
          rating: 4.8,
          reviews: 654,
          location: '1055/111 Silom Road, Bangrak, Bangkok 10500, Thailand',
          price: 350000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '스카이 바'],
          image:
            '/placeholder.svg?height=300&width=400&query=Lebua at State Tower Bangkok luxury suite with city view',
          discount: '연박 10% 할인',
          position: { lat: 13.7218, lng: 100.5147 },
        },
      ],
    },
    singapore: {
      name: '싱가포르',
      center: { lat: 1.3521, lng: 103.8198 },
      hotels: [
        {
          id: 'hotel1',
          name: '마리나 베이 샌즈',
          type: '호텔',
          rating: 4.8,
          reviews: 1543,
          location: '10 Bayfront Avenue, Singapore 018956',
          price: 450000,
          facilities: [
            '무료 와이파이',
            '조식 포함',
            '수영장',
            '카지노',
            '루프탑 전망대',
          ],
          image:
            '/placeholder.svg?height=300&width=400&query=Marina Bay Sands Singapore luxury room with city view',
          discount: '10% 할인',
          position: { lat: 1.2834, lng: 103.8607 },
        },
        {
          id: 'hotel2',
          name: '풀러턴 호텔 싱가포르',
          type: '호텔',
          rating: 4.7,
          reviews: 1234,
          location: '1 Fullerton Square, Singapore 049178',
          price: 380000,
          facilities: ['무료 와이파이', '조식 포함', '수영장', '스파'],
          image:
            '/placeholder.svg?height=300&width=400&query=Fullerton Hotel Singapore colonial style room',
          discount: '얼리버드 15% 할인',
          position: { lat: 1.2857, lng: 103.8529 },
        },
        {
          id: 'hotel3',
          name: '라플즈 호텔 싱가포르',
          type: '호텔',
          rating: 4.9,
          reviews: 987,
          location: '1 Beach Road, Singapore 189673',
          price: 420000,
          facilities: [
            '무료 와이파이',
            '조식 포함',
            '수영장',
            '스파',
            '역사적 건물',
          ],
          image:
            '/placeholder.svg?height=300&width=400&query=Raffles Hotel Singapore historic suite',
          discount: '',
          position: { lat: 1.2949, lng: 103.8543 },
        },
        {
          id: 'hotel4',
          name: '호텔 젠 오차드 게이트웨이',
          type: '호텔',
          rating: 4.4,
          reviews: 876,
          location: '277 Orchard Road, Singapore 238858',
          price: 180000,
          facilities: ['무료 와이파이', '수영장'],
          image:
            '/placeholder.svg?height=300&width=400&query=Hotel Jen Orchardgateway Singapore modern room',
          discount: '',
          position: { lat: 1.3002, lng: 103.8399 },
        },
        {
          id: 'hotel5',
          name: '카펠라 싱가포르',
          type: '리조트',
          rating: 4.8,
          reviews: 765,
          location: '1 The Knolls, Sentosa Island, Singapore 098297',
          price: 480000,
          facilities: [
            '무료 와이파이',
            '조식 포함',
            '수영장',
            '스파',
            '해변 접근성',
          ],
          image:
            '/placeholder.svg?height=300&width=400&query=Capella Singapore resort villa with sea view',
          discount: '연박 10% 할인',
          position: { lat: 1.2492, lng: 103.8294 },
        },
      ],
    },
  };

  const cityData = hotelsData[destination];
  const filteredHotels = cityData.hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStarRating = (rating) => {
    setStarRating((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const togglePropertyType = (type) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter((t) => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  const toggleFacility = (facility) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter((f) => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 호텔 선택 토글 함수 수정
  const toggleHotel = (hotelId, day) => {
    setSelectedHotels((prev) => ({
      ...prev,
      [day]: prev[day] === hotelId ? '' : hotelId,
    }));
  };

  // 전체 날짜에 동일한 호텔 선택 함수 추가
  const selectHotelForAllDays = (hotelId) => {
    setSelectedHotels({
      day1: hotelId,
      day2: hotelId,
      day3: hotelId,
    });
  };

  // 다음 단계로 넘어가기 전 유효성 검사 함수
  const isAllDaysSelected = () =>
    Object.values(selectedHotels).every((hotel) => hotel !== '');

  // 지도에 표시할 마커 생성 부분 수정
  const mapMarkers = filteredHotels.map((hotel) => ({
    id: hotel.id,
    position: hotel.position,
    title: hotel.name,
    selected:
      selectedHotels[activeDay] === hotel.id || hoveredHotel === hotel.id,
  }));

  const handleNext = () => {
    if (isAllDaysSelected()) {
      navigate(`/planner/${destination}/step4`);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white p-4 shadow-md">
        <div className="mb-4">
          <h2 className="mb-1 text-center text-2xl font-bold text-traveling-text">
            숙소 선택
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            {cityData.name}에서 머무를 숙소를 선택해주세요.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-1">
            {/* 요일 선택 탭과 검색창을 같은 컬럼에 배치 */}
            <div className="mb-3 bg-white rounded-lg">
              <div className="flex space-x-2 mb-2">
                <Button
                  variant={activeDay === 'day1' ? 'default' : 'outline'}
                  className={
                    activeDay === 'day1'
                      ? 'bg-traveling-purple text-white'
                      : 'border-traveling-text/30 text-traveling-text'
                  }
                  onClick={() => setActiveDay('day1')}
                >
                  1일차
                  {selectedHotels.day1 && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>
                <Button
                  variant={activeDay === 'day2' ? 'default' : 'outline'}
                  className={
                    activeDay === 'day2'
                      ? 'bg-traveling-purple text-white'
                      : 'border-traveling-text/30 text-traveling-text'
                  }
                  onClick={() => setActiveDay('day2')}
                >
                  2일차
                  {selectedHotels.day2 && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>
                <Button
                  variant={activeDay === 'day3' ? 'default' : 'outline'}
                  className={
                    activeDay === 'day3'
                      ? 'bg-traveling-purple text-white'
                      : 'border-traveling-text/30 text-traveling-text'
                  }
                  onClick={() => setActiveDay('day3')}
                >
                  3일차
                  {selectedHotels.day3 && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>
              </div>
              <div className="text-sm text-traveling-text/70 mb-3">
                <p>
                  현재 선택:{' '}
                  {activeDay === 'day1'
                    ? '1일차'
                    : activeDay === 'day2'
                    ? '2일차'
                    : '3일차'}{' '}
                  숙소
                </p>
              </div>

              {/* 검색창을 여기로 이동 */}
              <div className="relative w-full mb-3">
                <Input
                  type="text"
                  placeholder="숙소명 검색"
                  className="bg-traveling-background pl-10 border-traveling-text/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-text/50" />
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
              {filteredHotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className={`overflow-hidden transition-all ${
                    selectedHotels[activeDay] === hotel.id
                      ? 'border-2 border-traveling-purple'
                      : 'border border-gray-200'
                  }`}
                  onClick={() => toggleHotel(hotel.id, activeDay)}
                  onMouseEnter={() => setHoveredHotel(hotel.id)}
                  onMouseLeave={() => setHoveredHotel(null)}
                >
                  {/* 카드 내용은 그대로 유지 */}
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 w-full md:h-auto md:w-1/3">
                      <img
                        src={hotel.image || '/placeholder.svg'}
                        alt={hotel.name}
                        className="object-cover w-full h-full"
                      />

                      {hotel.discount && (
                        <Badge className="absolute left-2 top-2 bg-traveling-pink text-white">
                          {hotel.discount}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 p-0 text-traveling-pink hover:bg-white hover:text-traveling-pink"
                        onClick={(e) => {
                          e.stopPropagation();
                          // 찜하기 기능
                        }}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      {/* 기존 내용 유지 */}
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-traveling-text">
                            {hotel.name}
                          </h3>
                          <Badge className="mt-1 bg-traveling-background text-traveling-text/70">
                            {hotel.type}
                          </Badge>
                        </div>
                        <div className="flex items-center rounded-lg bg-traveling-background px-2 py-1">
                          <Star className="mr-1 h-4 w-4 fill-traveling-yellow text-traveling-yellow" />
                          <span className="font-bold text-traveling-text">
                            {hotel.rating}
                          </span>
                          <span className="ml-1 text-xs text-traveling-text/70">
                            ({hotel.reviews})
                          </span>
                        </div>
                      </div>

                      <p className="mb-2 flex items-center text-sm text-traveling-text/70">
                        <MapPin className="mr-1 h-4 w-4 text-traveling-text/70" />
                        {hotel.location}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {hotel.facilities.map((facility, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-traveling-text/20 bg-white text-traveling-text/70"
                          >
                            {facility}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          <p className="text-sm text-traveling-text/70">
                            1박 기준
                          </p>
                          <p className="text-xl font-bold text-traveling-text">
                            {formatPrice(hotel.price)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            className={
                              selectedHotels[activeDay] === hotel.id
                                ? 'bg-traveling-purple text-white hover:bg-traveling-purple/90'
                                : 'bg-traveling-background text-traveling-text hover:bg-traveling-background/80'
                            }
                          >
                            {selectedHotels[activeDay] === hotel.id
                              ? '선택됨'
                              : '선택하기'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-traveling-purple text-traveling-purple hover:bg-traveling-purple/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectHotelForAllDays(hotel.id);
                            }}
                          >
                            모든 날짜에 적용
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 다음 단계로 버튼 부분 수정 */}
            <div className="mt-8 flex justify-end">
              <Link
                to={isAllDaysSelected() ? `/planner/${destination}/step4` : '#'}
              >
                <Button
                  className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
                  disabled={!isAllDaysSelected()}
                >
                  다음 단계로
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* 선택된 숙소 요약 정보 추가 */}
            {Object.values(selectedHotels).some((hotel) => hotel !== '') && (
              <div className="mt-4 p-4 bg-traveling-background/30 rounded-lg">
                <h3 className="font-medium text-traveling-text mb-2">
                  선택된 숙소 정보
                </h3>
                <div className="space-y-2">
                  {Object.entries(selectedHotels).map(([day, hotelId]) => {
                    if (!hotelId) return null;
                    const hotel = cityData.hotels.find((h) => h.id === hotelId);
                    if (!hotel) return null;

                    return (
                      <div
                        key={day}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            {day === 'day1'
                              ? '1일차'
                              : day === 'day2'
                              ? '2일차'
                              : '3일차'}
                            :
                          </span>
                          <span>{hotel.name}</span>
                        </div>
                        <Badge className="bg-traveling-purple/20 text-traveling-purple">
                          {formatPrice(hotel.price)}
                        </Badge>
                      </div>
                    );
                  })}

                  {isAllDaysSelected() && (
                    <div className="mt-2 pt-2 border-t border-traveling-text/10 flex justify-between">
                      <span className="font-medium">총 금액:</span>
                      <span className="font-bold text-traveling-purple">
                        {formatPrice(
                          Object.values(selectedHotels)
                            .map((hotelId) => {
                              const hotel = cityData.hotels.find(
                                (h) => h.id === hotelId
                              );
                              return hotel ? hotel.price : 0;
                            })
                            .reduce((sum, price) => sum + price, 0)
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {/* 지도 영역 - 더 크게 표시 */}
            <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
              <MapComponent
                center={cityData.center}
                markers={mapMarkers}
                onMarkerClick={(hotelId) => toggleHotel(hotelId, activeDay)}
                height="100%"
                zoom={14}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
