import React, { useState, useMemo, useEffect,Component } from 'react';
import { Search, MapPin, Star, Plus, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from "../../modules/Button";
import { Input } from "../../modules/Input";
import { Card, CardContent } from "../../modules/Card";
import { Badge } from "../../modules/Badge";
import { Link } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../modules/Tabs";
import MapComponent from '../travel-planner/Map-component';
import { ReviewForm } from '../travel-planner/Review-form';
import { differenceInCalendarDays } from 'date-fns';
import { generateDayKeys, saveToLocalStorage, getFromLocalStorage } from "../../utils";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 p-4">
          지도를 렌더링하는 중 오류가 발생했습니다. 새로고침해 주세요.
        </div>
      );
    }
    return this.props.children;
  }
}

const AttractionSelection = ({ destination, startDate, endDate }) => {
  const [activeDay, setActiveDay] = useState(null);
  const [hoveredAttraction, setHoveredAttraction] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [customAttractions, setCustomAttractions] = useState(
    getFromLocalStorage("travelPlan")?.customAttractions || []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dayKeys = useMemo(() => {
    if (!startDate || !endDate) return [];
    return generateDayKeys(startDate, endDate);
  }, [startDate, endDate]);

  const [selectedAttractions, setSelectedAttractions] = useState(() => {
    // 새 일정 시작 시 selectedAttractions를 빈 배열로 초기화
    const initial = {};
    dayKeys.forEach((key) => {
      initial[key] = [];
    });
    return initial;
  });

  // selectedAttractions 변경 시 localStorage 동기화
  useEffect(() => {
    console.log("Saving selectedAttractions to localStorage:", selectedAttractions);
    saveToLocalStorage("travelPlan", {
      ...getFromLocalStorage("travelPlan"),
      selectedAttractions,
      customAttractions,
      startDate,
      endDate,
      destination: destination.toLowerCase(),
    });
  }, [selectedAttractions, customAttractions, startDate, endDate, destination]);

  // activeDay 설정 및 유효성 검사
  useEffect(() => {
    if (dayKeys.length > 0 && !activeDay) {
      setActiveDay(dayKeys[0]);
    }
    if (activeDay && !dayKeys.includes(activeDay)) {
      setActiveDay(dayKeys[0] || null);
    }
  }, [dayKeys, activeDay]);

  // 컴포넌트 마운트 시 travelPlan.selectedAttractions 초기화
  useEffect(() => {
    // localStorage의 travelPlan에서 selectedAttractions를 빈 객체로 재설정
    saveToLocalStorage("travelPlan", {
      ...getFromLocalStorage("travelPlan"),
      selectedAttractions: dayKeys.reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {}),
      customAttractions,
      startDate,
      endDate,
      destination: destination.toLowerCase(),
    });
  }, [dayKeys, startDate, endDate, destination, customAttractions]);

  if (!startDate || !endDate) {
    return <div className="text-red-600 p-4">여행 날짜가 선택되지 않았습니다. Step 1로 돌아가세요.</div>;
  }
  if (!dayKeys.length || !activeDay) {
    return <div className="text-red-600 p-4">유효한 여행 날짜가 없습니다. Step 1로 돌아가세요.</div>;
  }

  const attractionsData = {
    bangkok: {
      name: "방콕",
      center: { lat: 13.7563, lng: 100.5018 },
      attractions: [
        {
          id: "grand-palace",
          name: "왕궁",
          category: "명소",
          address: "Na Phra Lan Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand",
          rating: 4.7,
          likes: 8765,
          image: "/bangkok-grand-palace.png",
          position: { lat: 13.75, lng: 100.4914 },
          description: "방콕의 대표적인 왕궁",
        },
        {
          id: "wat-arun",
          name: "왓 아룬",
          category: "명소",
          address: "158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok 10600, Thailand",
          rating: 4.6,
          likes: 7654,
          image: "/bangkok-wat-arun.png",
          position: { lat: 13.7437, lng: 100.4888 },
          description: "아름다운 사원",
        },
        {
          id: "chatuchak-market",
          name: "차투착 주말 시장",
          category: "명소",
          address: "Kamphaeng Phet 2 Rd, Chatuchak, Bangkok 10900, Thailand",
          rating: 4.8,
          likes: 6543,
          image: "/bangkok-chatuchak-market.png",
          position: { lat: 13.7999, lng: 100.5502 },
          description: "활기찬 주말 시장",
        },
        {
          id: "wat-pho",
          name: "왓 포",
          category: "명소",
          address: "2 Sanam Chai Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand",
          rating: 4.7,
          likes: 5432,
          image: "/bangkok-wat-pho.png",
          position: { lat: 13.7465, lng: 100.493 },
          description: "거대한 와불상이 있는 사원",
        },
        {
          id: "khao-san-road",
          name: "카오산 로드",
          category: "명소",
          address: "Khao San Road, Talat Yot, Phra Nakhon, Bangkok 10200, Thailand",
          rating: 4.5,
          likes: 4321,
          image: "/bangkok-khao-san-road.png",
          position: { lat: 13.7582, lng: 100.4971 },
          description: "배낭여행자의 거리",
        },
      ],
    },
    fukuoka: {
      name: "후쿠오카",
      center: { lat: 33.5902, lng: 130.4017 },
      attractions: [
        {
          id: "canal-city",
          name: "캐널시티 하카타",
          category: "명소",
          address: "1 Chome-2 Sumiyoshi, Hakata Ward, Fukuoka, 812-0018",
          rating: 4.3,
          likes: 5432,
          image: "/canal-city-hakata-water-show.png",
          position: { lat: 33.5898, lng: 130.4108 },
          description: "대형 쇼핑몰",
        },
        {
          id: "ohori-park",
          name: "오호리 공원",
          category: "명소",
          address: "1 Chome-2 Ohorikoen, Chuo Ward, Fukuoka, 810-0051",
          rating: 4.6,
          likes: 4987,
          image: "/ohori-park-serenity.png",
          position: { lat: 33.5861, lng: 130.3797 },
          description: "평화로운 공원",
        },
        {
          id: "fukuoka-tower",
          name: "후쿠오카 타워",
          category: "명소",
          address: "2 Chome-3-26 Momochihama, Sawara Ward, Fukuoka, 814-0001",
          rating: 4.4,
          likes: 4567,
          image: "/fukuoka-seaside-view.png",
          position: { lat: 33.5944, lng: 130.3514 },
          description: "후쿠오카의 랜드마크",
        },
        {
          id: "dazaifu",
          name: "다자이후 텐만구",
          category: "명소",
          address: "4 Chome-7-1 Saifu, Dazaifu, Fukuoka 818-0117",
          rating: 4.7,
          likes: 5678,
          image: "/dazaifu-plum-blossoms.png",
          position: { lat: 33.5196, lng: 130.5354 },
          description: "학문의 신을 모시는 신사",
        },
        {
          id: "nakasu",
          name: "나카스",
          category: "명소",
          address: "Nakasu, Hakata Ward, Fukuoka, 810-0801",
          rating: 4.2,
          likes: 4321,
          image: "/nakasu-night-lights.png",
          position: { lat: 33.5938, lng: 130.4043 },
          description: "야간 유흥의 중심지",
        },
      ],
    },
    jeju: {
      name: "제주",
      center: { lat: 33.4890, lng: 126.4983 },
      attractions: [
        {
          id: "hallasan",
          name: "한라산",
          category: "명소",
          address: "Hallasan National Park, Jeju Island, South Korea",
          rating: 4.8,
          likes: 7890,
          image: "/images/attractions/hallasan.jpg",
          position: { lat: 33.3617, lng: 126.5292 },
          description: "제주의 대표적인 산",
        },
        {
          id: "seongsan",
          name: "성산일출봉",
          category: "명소",
          address: "Seongsan Ilchulbong, Seogwipo, Jeju, South Korea",
          rating: 4.7,
          likes: 6543,
          image: "/images/attractions/seongsan.jpg",
          position: { lat: 33.4581, lng: 126.9425 },
          description: "아름다운 일출 명소",
        },
        {
          id: "udo",
          name: "우도",
          category: "명소",
          address: "Udo Island, Jeju, South Korea",
          rating: 4.6,
          likes: 5432,
          image: "/images/attractions/udo.jpg",
          position: { lat: 33.5050, lng: 126.9540 },
          description: "작고 아름다운 섬",
        },
        {
          id: "manjanggul",
          name: "만장굴",
          category: "명소",
          address: "Manjanggul Cave, Jeju, South Korea",
          rating: 4.5,
          likes: 4321,
          image: "/images/attractions/manjanggul.jpg",
          position: { lat: 33.5283, lng: 126.7716 },
          description: "화산 동굴 탐험",
        },
        {
          id: "jeju-folk-village",
          name: "제주 민속촌",
          category: "명소",
          address: "Jeju Folk Village, Seogwipo, Jeju, South Korea",
          rating: 4.4,
          likes: 3987,
          image: "/images/attractions/jeju-folk-village.jpg",
          position: { lat: 33.3227, lng: 126.8418 },
          description: "제주의 전통 문화를 체험",
        },
      ],
    },
    osaka: {
      name: "오사카",
      center: { lat: 34.6937, lng: 135.5023 },
      attractions: [
        {
          id: "dotonbori",
          name: "도톤보리",
          category: "명소",
          address: "Dotonbori, Chuo Ward, Osaka, 542-0071",
          rating: 4.7,
          likes: 7196,
          image: "/images/attractions/dotonbori.png",
          position: { lat: 34.6687, lng: 135.5031 },
          description: "오사카의 활기찬 먹거리 거리",
        },
        {
          id: "osaka-castle",
          name: "오사카 성",
          category: "명소",
          address: "1-1 Osakajo, Chuo Ward, Osaka, 540-0002",
          rating: 4.4,
          likes: 6557,
          image: "/images/attractions/osaka-castle.png",
          position: { lat: 34.6873, lng: 135.5262 },
          description: "역사적인 성곽",
        },
        {
          id: "universal-studios",
          name: "유니버설 스튜디오 재팬",
          category: "명소",
          address: "2-chome-1-33 Sakurajima, Konohana Ward, Osaka, 554-0031",
          rating: 4.5,
          likes: 5361,
          image: "/images/attractions/universal-studios.jpg",
          position: { lat: 34.6654, lng: 135.4323 },
          description: "인기 있는 테마파크",
        },
        {
          id: "umeda-wheel",
          name: "우메다 공중정원",
          category: "명소",
          address: "Japan, 〒531-6039 Osaka, Kita Ward, Oyodonaka, 1 Chome−1−88",
          rating: 4.4,
          likes: 4824,
          image: "/images/attractions/umeda-wheel.jpg",
          position: { lat: 34.7052, lng: 135.4957 },
          description: "오사카의 전경을 볼 수 있는 전망대",
        },
        {
          id: "namba",
          name: "난바",
          category: "명소",
          address: "Namba, Chuo Ward, Osaka, 542-0076",
          rating: 4.3,
          likes: 4666,
          image: "/images/attractions/namba.jpg",
          position: { lat: 34.6659, lng: 135.5013 },
          description: "쇼핑과 엔터테인먼트의 중심지",
        },
      ],
    },
    paris: {
      name: "파리",
      center: { lat: 48.8566, lng: 2.3522 },
      attractions: [
        {
          id: "eiffel-tower",
          name: "에펠탑",
          category: "명소",
          address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
          rating: 4.7,
          likes: 9876,
          image: "/paris-eiffel-tower.png",
          position: { lat: 48.8584, lng: 2.2945 },
          description: "파리의 상징",
        },
        {
          id: "louvre-museum",
          name: "루브르 박물관",
          category: "명소",
          address: "Rue de Rivoli, 75001 Paris, France",
          rating: 4.8,
          likes: 8765,
          image: "/paris-louvre-museum.png",
          position: { lat: 48.8606, lng: 2.3376 },
          description: "세계적인 박물관",
        },
        {
          id: "notre-dame",
          name: "노트르담 대성당",
          category: "명소",
          address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
          rating: 4.7,
          likes: 7654,
          image: "/paris-notre-dame.png",
          position: { lat: 48.853, lng: 2.3499 },
          description: "고딕 양식의 대성당",
        },
        {
          id: "arc-de-triomphe",
          name: "개선문",
          category: "명소",
          address: "Place Charles de Gaulle, 75008 Paris, France",
          rating: 4.6,
          likes: 6543,
          image: "/paris-arc-de-triomphe.png",
          position: { lat: 48.8738, lng: 2.295 },
          description: "나폴레옹의 승리를 기념",
        },
        {
          id: "montmartre",
          name: "몽마르트",
          category: "명소",
          address: "Montmartre, 75018 Paris, France",
          rating: 4.5,
          likes: 5432,
          image: "/paris-montmartre.png",
          position: { lat: 48.8867, lng: 2.3431 },
          description: "예술가의 동네",
        },
      ],
    },
    rome: {
      name: "로마",
      center: { lat: 41.9028, lng: 12.4964 },
      attractions: [
        {
          id: "colosseum",
          name: "콜로세움",
          category: "명소",
          address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
          rating: 4.8,
          likes: 9876,
          image: "/rome-colosseum.png",
          position: { lat: 41.8902, lng: 12.4922 },
          description: "고대 로마의 원형 경기장",
        },
        {
          id: "vatican-museums",
          name: "바티칸 박물관",
          category: "명소",
          address: "Viale Vaticano, 00165 Roma RM, Italy",
          rating: 4.7,
          likes: 8765,
          image: "/rome-vatican-museums.png",
          position: { lat: 41.9065, lng: 12.4534 },
          description: "시스티나 성당 포함",
        },
        {
          id: "trevi-fountain",
          name: "트레비 분수",
          category: "명소",
          address: "Piazza di Trevi, 00187 Roma RM, Italy",
          rating: 4.8,
          likes: 7654,
          image: "/rome-trevi-fountain.png",
          position: { lat: 41.9009, lng: 12.4833 },
          description: "동전을 던져 소원을 빌어보세요",
        },
        {
          id: "pantheon",
          name: "판테온",
          category: "명소",
          address: "Piazza della Rotonda, 00186 Roma RM, Italy",
          rating: 4.7,
          likes: 6543,
          image: "/rome-pantheon.png",
          position: { lat: 41.8986, lng: 12.4769 },
          description: "로마의 역사적인 건축물",
        },
        {
          id: "roman-forum",
          name: "로마 포럼",
          category: "명소",
          address: "Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy",
          rating: 4.6,
          likes: 5432,
          image: "/rome-roman-forum.png",
          position: { lat: 41.8925, lng: 12.4853 },
          description: "고대 로마의 중심지",
        },
      ],
    },
    singapore: {
      name: "싱가포르",
      center: { lat: 1.3521, lng: 103.8198 },
      attractions: [
        {
          id: "marina-bay-sands",
          name: "마리나 베이 샌즈",
          category: "명소",
          address: "10 Bayfront Avenue, Singapore 018956",
          rating: 4.8,
          likes: 8765,
          image: "/singapore-marina-bay-sands.png",
          position: { lat: 1.2834, lng: 103.8607 },
          description: "럭셔리 호텔과 전망대",
        },
        {
          id: "gardens-by-the-bay",
          name: "가든스 바이 더 베이",
          category: "명소",
          address: "18 Marina Gardens Drive, Singapore 018953",
          rating: 4.7,
          likes: 7654,
          image: "/singapore-gardens-by-the-bay.png",
          position: { lat: 1.2815, lng: 103.8636 },
          description: "미래적인 정원",
        },
        {
          id: "sentosa-island",
          name: "센토사 섬",
          category: "명소",
          address: "Sentosa Island, Singapore",
          rating: 4.6,
          likes: 6543,
          image: "/singapore-sentosa-island.png",
          position: { lat: 1.2494, lng: 103.8303 },
          description: "해변과 놀이공원",
        },
        {
          id: "universal-studios",
          name: "유니버설 스튜디오 싱가포르",
          category: "명소",
          address: "8 Sentosa Gateway, Singapore 098269",
          rating: 4.7,
          likes: 5432,
          image: "/singapore-universal-studios.png",
          position: { lat: 1.254, lng: 103.8238 },
          description: "테마파크",
        },
        {
          id: "merlion-park",
          name: "머라이언 파크",
          category: "명소",
          address: "1 Fullerton Road, Singapore 049213",
          rating: 4.5,
          likes: 4321,
          image: "/singapore-merlion-park.png",
          position: { lat: 1.2868, lng: 103.8545 },
          description: "싱가포르의 상징",
        },
      ],
    },
    tokyo: {
      name: "도쿄",
      center: { lat: 35.6762, lng: 139.6503 },
      attractions: [
        {
          id: "tokyo-tower",
          name: "도쿄 타워",
          category: "명소",
          address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011",
          rating: 4.6,
          likes: 8234,
          image: "/tokyo-night-lights.png",
          position: { lat: 35.6586, lng: 139.7454 },
          description: "도쿄의 랜드마크",
        },
        {
          id: "shibuya-crossing",
          name: "시부야 스크램블 교차로",
          category: "명소",
          address: "2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043",
          rating: 4.5,
          likes: 7654,
          image: "/shibuya-intersection-bustle.png",
          position: { lat: 35.6595, lng: 139.7004 },
          description: "세계적으로 유명한 교차로",
        },
        {
          id: "meiji-shrine",
          name: "메이지 신궁",
          category: "명소",
          address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557",
          rating: 4.7,
          likes: 6543,
          image: "/meiji-shrine-entrance.png",
          position: { lat: 35.6763, lng: 139.6993 },
          description: "평화로운 신사",
        },
        {
          id: "senso-ji",
          name: "센소지 사원",
          category: "명소",
          address: "2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032",
          rating: 4.6,
          likes: 7123,
          image: "/sensoji-lantern.png",
          position: { lat: 35.7147, lng: 139.7966 },
          description: "도쿄의 오래된 사원",
        },
        {
          id: "tokyo-skytree",
          name: "도쿄 스카이트리",
          category: "명소",
          address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045",
          rating: 4.5,
          likes: 6789,
          image: "/tokyo-skytree-day.png",
          position: { lat: 35.7101, lng: 139.8107 },
          description: "세계에서 가장 높은 타워",
        },
      ],
    },
    venice: {
      name: "베니스",
      center: { lat: 45.4408, lng: 12.3155 },
      attractions: [
        {
          id: "st-marks-square",
          name: "산 마르코 광장",
          category: "명소",
          address: "Piazza San Marco, 30100 Venezia VE, Italy",
          rating: 4.8,
          likes: 8765,
          image: "/venice-st-marks-square.png",
          position: { lat: 45.4341, lng: 12.3388 },
          description: "베니스의 중심 광장",
        },
        {
          id: "rialto-bridge",
          name: "리알토 다리",
          category: "명소",
          address: "Sestiere San Polo, 30125 Venezia VE, Italy",
          rating: 4.7,
          likes: 7654,
          image: "/venice-rialto-bridge.png",
          position: { lat: 45.4381, lng: 12.3358 },
          description: "대운하 위의 유명한 다리",
        },
        {
          id: "doges-palace",
          name: "도지의 궁전",
          category: "명소",
          address: "P.za San Marco, 1, 30124 Venezia VE, Italy",
          rating: 4.7,
          likes: 6543,
          image: "/venice-doges-palace.png",
          position: { lat: 45.4337, lng: 12.3401 },
          description: "베니스의 역사적인 궁전",
        },
        {
          id: "grand-canal",
          name: "대운하",
          category: "명소",
          address: "Grand Canal, Venice, Italy",
          rating: 4.8,
          likes: 5432,
          image: "/venice-grand-canal.png",
          position: { lat: 45.4408, lng: 12.3325 },
          description: "베니스의 주요 운하",
        },
        {
          id: "burano",
          name: "부라노 섬",
          category: "명소",
          address: "Burano, 30142 Venice, Italy",
          rating: 4.6,
          likes: 4321,
          image: "/venice-burano.png",
          position: { lat: 45.4853, lng: 12.4167 },
          description: "화려한 색상의 섬",
        },
      ],
    },
  };

  const cityData = attractionsData[destination.toLowerCase()] || {};
  const allAttractions = [...(cityData.attractions || []), ...customAttractions];
  const filteredAttractions = allAttractions.filter(
    (attraction) =>
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (attraction.address && attraction.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleAttraction = (attractionId) => {
    setSelectedAttractions((prev) => {
      const currentDaySelections = Array.isArray(prev[activeDay]) ? [...prev[activeDay]] : [];
      const updated = currentDaySelections.includes(attractionId)
        ? currentDaySelections.filter((id) => id !== attractionId)
        : [...currentDaySelections, attractionId];
      const newSelections = { ...prev, [activeDay]: updated };
      console.log("Toggled attraction:", { attractionId, activeDay, newSelections });
      return newSelections;
    });
  };

  const addCustomAttraction = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAttraction = {
      id: `custom-${Date.now()}`,
      name: formData.get("name"),
      category: formData.get("category") || "기타",
      address: formData.get("address"),
      rating: 0,
      likes: 0,
      image: "/placeholder.svg",
      position: cityData.center,
      description: formData.get("memo") || "사용자 추가 장소",
    };
    setCustomAttractions((prev) => [...prev, newAttraction]);
    toggleAttraction(newAttraction.id);
    console.log("Added custom attraction:", newAttraction);
    e.target.reset();
  };

  const mapMarkers = filteredAttractions.map((attraction) => ({
    id: attraction.id,
    position: attraction.position,
    title: attraction.name,
    selected:
      (Array.isArray(selectedAttractions[activeDay]) &&
        selectedAttractions[activeDay].includes(attraction.id)) ||
      hoveredAttraction === attraction.id,
  }));

  const isAllDaysSelected = () => {
    return dayKeys.every((day) => Array.isArray(selectedAttractions[day]) && selectedAttractions[day].length > 0);
  };

  const openReviewModal = (attraction) => {
    setSelectedPlace({ name: attraction.name, type: attraction.category });
    setIsReviewModalOpen(true);
  };

  if (!cityData.name) return <div className="text-red-600 p-4">선택된 도시 정보가 없습니다.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">장소 선택</h2>
          <p className="text-center text-sm text-traveling-text/70">
            {cityData.name}에서 방문하고 싶은 장소를 선택해주세요.
          </p>
        </div>

        <div className="sticky top-0 z-10 bg-white py-3 mb-4 border-b">
          <div className="flex space-x-2">
            {dayKeys.map((day, idx) => (
              <Button
                key={day}
                onClick={() => setActiveDay(day)}
                className={
                  activeDay === day
                    ? "bg-traveling-purple text-white"
                    : "border border-traveling-text/30 text-traveling-text"
                }
              >
                {idx + 1}일차
                {Array.isArray(selectedAttractions[day]) && selectedAttractions[day].length > 0 && (
                  <Badge className="ml-2 bg-white text-traveling-purple">
                    {selectedAttractions[day].length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          <p className="mt-2 text-sm text-traveling-text/70">
            현재 선택: {activeDay === dayKeys[0] ? "1일차" : `${dayKeys.indexOf(activeDay) + 1}일차`} 방문 장소
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Tabs defaultValue="attraction-select">
              <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="attraction-select">장소 선택</TabsTrigger>
                <TabsTrigger value="new-attraction">신규 장소 등록</TabsTrigger>
              </TabsList>
              <TabsContent value="attraction-select" className="mt-6">
                <div className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="장소명을 입력하세요"
                      className="bg-traveling-background pl-10 border-traveling-text/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {["추천 장소", "명소", "식당", "카페"].map((label) => (
                    <Button
                      key={label}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-traveling-text/30 text-traveling-text/70 hover:bg-traveling-background"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
                  {filteredAttractions.map((attraction) => (
                    <Card
                      key={attraction.id}
                      className={`overflow-hidden transition-all ${
                        Array.isArray(selectedAttractions[activeDay]) &&
                        selectedAttractions[activeDay].includes(attraction.id)
                          ? "border-2 border-traveling-purple"
                          : "border border-gray-200"
                      }`}
                      onMouseEnter={() => setHoveredAttraction(attraction.id)}
                      onMouseLeave={() => setHoveredAttraction(null)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-40 w-full md:h-auto md:w-1/3">
                          <img
                            src={attraction.image || "/placeholder.svg"}
                            alt={attraction.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="flex-1 flex flex-col p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-traveling-text">{attraction.name}</div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-4 w-4 fill-traveling-yellow text-traveling-yellow" />
                              <span className="font-bold text-traveling-text">{attraction.rating}</span>
                            </div>
                          </div>
                          <Badge className="w-fit mt-1 mb-2 bg-traveling-background text-traveling-text/70">
                            {attraction.category}
                          </Badge>
                          <p className="text-sm text-traveling-text/70 mb-2 flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {attraction.address}
                          </p>
                          <p className="text-sm text-traveling-text/70 mb-2">{attraction.description}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-traveling-text/70">
                              <Star className="h-4 w-4 text-traveling-pink" />
                              <span>{attraction.likes.toLocaleString()}</span>
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
                            <Button
                              variant={
                                Array.isArray(selectedAttractions[activeDay]) &&
                                selectedAttractions[activeDay].includes(attraction.id)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={
                                Array.isArray(selectedAttractions[activeDay]) &&
                                selectedAttractions[activeDay].includes(attraction.id)
                                  ? "bg-traveling-purple text-white hover:bg-traveling-purple/90"
                                  : "border-traveling-purple text-traveling-purple hover:bg-traveling-purple/10"
                              }
                              onClick={() => toggleAttraction(attraction.id)}
                            >
                              {Array.isArray(selectedAttractions[activeDay]) &&
                              selectedAttractions[activeDay].includes(attraction.id)
                                ? "선택됨"
                                : "선택하기"}
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new-attraction" className="mt-6">
                <form onSubmit={addCustomAttraction} className="rounded-lg bg-traveling-background p-6">
                  <div className="mb-6 flex flex-col items-center justify-center">
                    <div className="mb-4 rounded-full bg-traveling-purple/20 p-4">
                      <Plus className="h-8 w-8 text-traveling-purple" />
                    </div>
                    <h3 className="text-lg font-bold text-traveling-text">새로운 장소 추가하기</h3>
                    <p className="text-center text-sm text-traveling-text/70">
                      방문하고 싶은 장소가 목록에 없나요? 직접 추가해보세요!
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Input name="name" placeholder="장소명" className="bg-white border-traveling-text/30" required />
                    <Input name="category" placeholder="카테고리" className="bg-white border-traveling-text/30" />
                    <Input name="address" placeholder="주소" className="bg-white border-traveling-text/30" required />
                    <textarea
                      name="memo"
                      placeholder="메모"
                      className="w-full rounded-md border border-traveling-text/30 bg-white p-2 text-traveling-text"
                      rows={3}
                    ></textarea>
                    <Button type="submit" className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90">
                      장소 추가하기
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          <div className="h-[700px] rounded-lg overflow-hidden">
            <MapComponent
              center={cityData.center}
              markers={mapMarkers}
              onMarkerClick={toggleAttraction}
              height="100%"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-traveling-background/30 rounded-lg">
          <h4 className="font-medium mb-2">선택된 장소 요약</h4>
          <div className="space-y-2">
            {dayKeys.map((day, idx) => (
              <div className="flex justify-between items-center" key={day}>
                <span>{idx + 1}일차:</span>
                <Badge className="bg-traveling-purple/20 text-traveling-purple">
                  {(Array.isArray(selectedAttractions[day]) ? selectedAttractions[day].length : 0)}개 장소
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link to={isAllDaysSelected() ? `/travel-planner/${destination}/step3` : "#"}>
            <Button
              className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
              disabled={!isAllDaysSelected()}
            >
              다음 단계로
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {selectedPlace && isReviewModalOpen && (
          <ReviewForm
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            placeName={selectedPlace.name}
            placeType={selectedPlace.type}
          />
        )}
      </div>
    </div>
  );
};

export default AttractionSelection;