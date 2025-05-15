import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Hotel,
  Coffee,
  Utensils,
  Camera,
  X,
  Edit,
  Check,
  Map,
} from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { FlightModal } from "./flight-modal";
import MapComponent from "../travel-planner/Map-component";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate,useLocation } from "react-router-dom";

function ItineraryGeneration({ destination, isAiMode = false, startDate, endDate }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isInitialized = useRef(false);
  const [itinerary, setItinerary] = useState({});
  const dayCount =
    startDate && endDate
      ? differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
      : 3;

  const dayKeys = Array.from({ length: dayCount }, (_, i) => i + 1);

  const cityNames = {
    osaka: "오사카",
    tokyo: "도쿄",
    fukuoka: "후쿠오카",
    paris: "파리",
    rome: "로마",
    venice: "베니스",
    bangkok: "방콕",
    singapore: "싱가포르",
  };

  const cityCoords = {
    osaka: { lat: 34.6937, lng: 135.5023 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    fukuoka: { lat: 33.5904, lng: 130.4017 },
    paris: { lat: 48.8566, lng: 2.3522 },
    rome: { lat: 41.9028, lng: 12.4964 },
    venice: { lat: 45.4408, lng: 12.3155 },
    bangkok: { lat: 13.7563, lng: 100.5018 },
    singapore: { lat: 1.3521, lng: 103.8198 },
  };
  const mapCenter = cityCoords[destination?.toLowerCase()] || { lat: 0, lng: 0 };

  const mapMarkers =
    itinerary[selectedDay]?.places
      ?.filter((place) => place.position)
      .map((place) => ({
        id: place.id,
        position: place.position,
        title: place.name,
        selected: false,
      })) || [];

  const placePositions = {
    "도쿄 스카이트리": { lat: 35.7101, lng: 139.8107 },
    "센소지 사원": { lat: 35.7148, lng: 139.7967 },
    "메이지 신궁": { lat: 35.6764, lng: 139.6993 },
    "하라주쿠 쇼핑": { lat: 35.6702, lng: 139.7025 },
    "시부야 스크램블 교차로": { lat: 35.6595, lng: 139.7005 },
    "도쿄 디즈니랜드": { lat: 35.6329, lng: 139.8804 },
    "우에노 공원": { lat: 35.7156, lng: 139.7745 },
    "아키하바라": { lat: 35.6984, lng: 139.7730 },
    "오다이바": { lat: 35.619, lng: 139.7765 },
    "팀랩 보더리스": { lat: 35.6195, lng: 139.7908 },
  };

  useEffect(() => {
    if (isInitialized.current || isGenerated) return;

    isInitialized.current = true;
    setIsLoading(true);

    setTimeout(() => {
      if (isAiMode && location.state?.itinerary) {
        const aiItinerary = {};
        location.state.itinerary.forEach((dayData, index) => {
          const day = index + 1;
          aiItinerary[day] = {
            places: dayData.activities.map((activity, idx) => ({
              id: `a${day}-${idx}`,
              name: activity.activity,
              type: activity.time === "lunch" || activity.time === "evening" ? "restaurant" : "attraction",
              time: activity.time.charAt(0).toUpperCase() + activity.time.slice(1),
              description: activity.description,
              position: placePositions[activity.activity] || null,
            })),
            accommodation: {
              id: `h${day}`,
              name: "AI 추천 호텔",
              description: "AI가 추천한 편리한 위치의 호텔입니다.",
            },
          };
        });
        setItinerary(aiItinerary);
      } else if (destination === "tokyo") {
        const dummyItinerary = isAiMode
          ? {
              1: {
                places: [
                  {
                    id: "a1",
                    name: "도쿄 스카이트리",
                    type: "attraction",
                    time: "10:00",
                    description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
                    position: { lat: 35.7101, lng: 139.8107 },
                  },
                  {
                    id: "r1",
                    name: "스시 긴자",
                    type: "restaurant",
                    time: "12:30",
                    description: "현지인들에게도 인기 있는 스시 레스토랑에서 신선한 해산물을 즐겨보세요.",
                    position: { lat: 35.6717, lng: 139.7650 },
                  },
                  {
                    id: "a2",
                    name: "센소지 사원",
                    type: "attraction",
                    time: "14:30",
                    description: "도쿄에서 가장 오래된 사원인 센소지를 방문하여 일본 전통 문화를 체험해보세요.",
                    position: { lat: 35.7148, lng: 139.7967 },
                  },
                  {
                    id: "c1",
                    name: "아사쿠사 카페",
                    type: "cafe",
                    time: "16:00",
                    description: "전통적인 일본 디저트와 함께 차를 즐길 수 있는 카페입니다.",
                    position: { lat: 35.7112, lng: 139.7943 },
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
                },
              },
              2: {
                places: [
                  {
                    id: "a3",
                    name: "메이지 신궁",
                    type: "attraction",
                    time: "09:30",
                    description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다.",
                    position: { lat: 35.6764, lng: 139.6993 },
                  },
                  {
                    id: "a4",
                    name: "하라주쿠 쇼핑",
                    type: "attraction",
                    time: "11:30",
                    description: "일본 청소년 문화의 중심지인 하라주쿠에서 독특한 패션과 상점들을 구경해보세요.",
                    position: { lat: 35.6702, lng: 139.7025 },
                  },
                  {
                    id: "r2",
                    name: "이치란 라멘",
                    type: "restaurant",
                    time: "13:00",
                    description: "개인 부스에서 맛보는 유명한 돈코츠 라멘 체인점입니다.",
                    position: { lat: 35.6938, lng: 139.7034 },
                  },
                  {
                    id: "a5",
                    name: "시부야 스크램블 교차로",
                    type: "attraction",
                    time: "15:00",
                    description: "세계에서 가장 분주한 횡단보도 중 하나인 시부야 스크램블 교차로를 경험해보세요.",
                    position: { lat: 35.6595, lng: 139.7005 },
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
                },
              },
              3: {
                places: [
                  {
                    id: "a6",
                    name: "도쿄 디즈니랜드",
                    type: "attraction",
                    time: "09:00",
                    description: "하루 종일 즐길 수 있는 세계적으로 유명한 테마파크입니다.",
                    position: { lat: 35.6329, lng: 139.8804 },
                  },
                ],
                accommodation: {
                  id: "h2",
                  name: "도쿄 베이 호텔",
                  description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
                },
              },
              4: {
                places: [
                  {
                    id: "a7",
                    name: "우에노 공원",
                    type: "attraction",
                    time: "10:00",
                    description: "아름다운 공원과 여러 박물관이 있는 문화 공간입니다.",
                    position: { lat: 35.7156, lng: 139.7745 },
                  },
                  {
                    id: "r3",
                    name: "우동 레스토랑",
                    type: "restaurant",
                    time: "12:30",
                    description: "전통적인 일본 우동을 맛볼 수 있는 현지인들이 사랑하는 식당입니다.",
                    position: { lat: 35.7185, lng: 139.7736 },
                  },
                  {
                    id: "a8",
                    name: "아키하바라",
                    type: "attraction",
                    time: "14:00",
                    description: "전자제품과 애니메이션의 중심지인 아키하바라에서 일본 오타쿠 문화를 경험해보세요.",
                    position: { lat: 35.6984, lng: 139.773 },
                  },
                  {
                    id: "c2",
                    name: "메이드 카페",
                    type: "cafe",
                    time: "16:30",
                    description: "아키하바라의 유명한 테마 카페에서 독특한 경험을 해보세요.",
                    position: { lat: 35.6995, lng: 139.7722 },
                  },
                ],
                accommodation: {
                  id: "h3",
                  name: "고지라 그레이서리 호텔",
                  description: "신주쿠에 위치한 고지라 테마 호텔입니다.",
                },
              },
              5: {
                places: [
                  {
                    id: "a9",
                    name: "오다이바",
                    type: "attraction",
                    time: "10:00",
                    description: "도쿄 베이에 위치한 인공 섬으로, 쇼핑몰, 엔터테인먼트 시설, 자유의 여신상 복제품 등이 있습니다.",
                    position: { lat: 35.619, lng: 139.7765 },
                  },
                  {
                    id: "r4",
                    name: "해산물 뷔페",
                    type: "restaurant",
                    time: "13:00",
                    description: "오다이바에 위치한 고급 해산물 뷔페에서 다양한 일본 요리를 즐겨보세요.",
                    position: { lat: 35.6201, lng: 139.7767 },
                  },
                  {
                    id: "a10",
                    name: "팀랩 보더리스",
                    type: "attraction",
                    time: "15:00",
                    description: "디지털 아트 뮤지엄에서 몰입형 예술 경험을 해보세요.",
                    position: { lat: 35.6195, lng: 139.7908 },
                  },
                ],
                accommodation: {
                  id: "h3",
                  name: "고지라 그레이서리 호텔",
                  description: "신주쿠에 위치한 고지라 테마 호텔입니다.",
                },
              },
            }
          : {
              1: {
                places: [
                  {
                    id: "a1",
                    name: "도쿄 스카이트리",
                    type: "attraction",
                    time: "10:00",
                    description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
                    position: { lat: 35.7101, lng: 139.8107 },
                  },
                  {
                    id: "a2",
                    name: "센소지 사원",
                    type: "attraction",
                    time: "14:00",
                    description: "도쿄에서 가장 오래된 사원인 센소지를 방문하세요.",
                    position: { lat: 35.7148, lng: 139.7967 },
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
                },
              },
              2: {
                places: [
                  {
                    id: "a3",
                    name: "메이지 신궁",
                    type: "attraction",
                    time: "09:30",
                    description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다.",
                    position: { lat: 35.6764, lng: 139.6993 },
                  },
                  {
                    id: "a5",
                    name: "시부야 스크램블 교차로",
                    type: "attraction",
                    time: "15:00",
                    description: "세계에서 가장 분주한 횡단보도 중 하나입니다.",
                    position: { lat: 35.6595, lng: 139.7005 },
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
                },
              },
              3: {
                places: [
                  {
                    id: "a6",
                    name: "도쿄 디즈니랜드",
                    type: "attraction",
                    time: "09:00",
                    description: "하루 종일 즐길 수 있는 세계적으로 유명한 테마파크입니다.",
                    position: { lat: 35.6329, lng: 139.8804 },
                  },
                ],
                accommodation: {
                  id: "h2",
                  name: "도쿄 베이 호텔",
                  description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
                },
              },
            };

        Object.values(dummyItinerary).forEach((day) => {
          day.places.forEach((place) => {
            if (!place.position && placePositions[place.name]) {
              place.position = placePositions[place.name];
            }
          });
        });
        setItinerary(dummyItinerary);
      } else {
        const basicItinerary = {};
        for (let i = 1; i <= dayCount; i++) {
          basicItinerary[i] = {
            places: [
              {
                id: `a${i}`,
                name: `${cityNames[destination] || destination} 주요 관광지 ${i}`,
                type: "attraction",
                time: "10:00",
                description: "이 도시의 대표 관광지입니다.",
                position: placePositions[`${cityNames[destination] || destination} 주요 관광지 ${i}`] || null,
              },
            ],
            accommodation: {
              id: `h${i}`,
              name: "시티 센터 호텔",
              description: "도심에 위치한 편리한 호텔입니다.",
            },
          };
        }
        setItinerary(basicItinerary);
      }

      setIsLoading(false);
      setIsGenerated(true);
    }, 1500);
  }, [destination, isAiMode, isGenerated, startDate, endDate, location.state]);

  const removePlaceFromItinerary = (day, placeId) => {
    setItinerary((prev) => {
      const updatedDay = { ...prev[day] };
      updatedDay.places = updatedDay.places.filter((place) => place.id !== placeId);
      return { ...prev, [day]: updatedDay };
    });
  };

  const changeAccommodation = (day) => {
    const accommodations = [
      {
        id: "h1",
        name: "시티 센터 호텔",
        description: "도심에 위치한 편리한 호텔입니다.",
      },
      {
        id: "h2",
        name: "리조트 호텔",
        description: "휴양지에 위치한 고급 호텔입니다.",
      },
      {
        id: "h3",
        name: "부티크 호텔",
        description: "독특한 디자인의 부티크 호텔입니다.",
      },
    ];

    const currentId = itinerary[day]?.accommodation?.id;
    const newAccommodation =
      accommodations.find((acc) => acc.id !== currentId) || accommodations[0];

    setItinerary((prev) => {
      const updatedDay = { ...prev[day] };
      updatedDay.accommodation = newAccommodation;
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleSavePlan = async () => {
    try {
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');

      // 날짜 검증
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!startDate || !endDate || !dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        console.error('Invalid or missing start_date/end_date in localStorage');
        alert('여행 시작일 또는 종료일이 올바르지 않습니다. 다시 설정해주세요.');
        return;
      }

      // itinerary를 배열로 변환
      const formattedItinerary = Object.keys(itinerary).map((day) => ({
        day: `day${day}`,
        activities: itinerary[day].places.map((place) => ({
          activity: place.name,
          time: place.time.toLowerCase(),
          description: place.description,
        })),
        accommodation: itinerary[day].accommodation ? {
          name: itinerary[day].accommodation.name,
          description: itinerary[day].accommodation.description,
        } : null,
      }));

      // itinerary 검증
      if (!formattedItinerary || formattedItinerary.length === 0) {
        console.error('Formatted itinerary is empty or invalid');
        alert('여행 일정 데이터가 없습니다.');
        return;
      }

      const planData = {
        destination: destination,
        start_date: startDate,
        end_date: endDate,
        itinerary: formattedItinerary,
        planType: isAiMode ? 'AI' : 'MY' // AI 모드 여부에 따라 planType 설정
      };

      console.log('Sending planData:', JSON.stringify(planData, null, 2));
      const response = await axiosInstance.post('/api/aiplan/save', planData);
      console.log('일정 저장 성공:', response.data);
      alert('여행 일정이 성공적으로 저장되었습니다!');
      navigate('/mypage');
    } catch (error) {
      console.error('일정 저장 실패:', error.response?.data || error.message);
      alert('일정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-traveling-purple border-t-transparent"></div>
          <span className="ml-3 text-lg">일정을 생성하는 중입니다...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {isAiMode ? "AI 추천 일정" : "나의 여행 일정"}:{" "}
              {cityNames[destination] || destination}
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    <span>완료</span>
                  </>
                ) : (
                  <>
                    <Edit className="mr-1 h-4 w-4" />
                    <span>일정 수정</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFlightModalOpen(true)}
              >
                <Plane className="mr-1 h-4 w-4" />
                <span>항공편 추가</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {dayKeys.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className={`${selectedDay === day ? "bg-traveling-purple text-white" : "bg-white"}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}일차
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">지도</h4>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
                <MapComponent center={mapCenter} height="400px" markers={mapMarkers} />
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardContent className="p-4">
                <h4 className="font-medium mb-4">{selectedDay}일차 일정</h4>

                {itinerary[selectedDay]?.places.length === 0 ? (
                  <p className="text-center text-gray-500">
                    이 날의 일정이 비어있습니다.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {itinerary[selectedDay]?.places.map((place, index) => (
                      <div key={place.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-traveling-purple/10">
                              {place.type === "attraction" && (
                                <Camera className="h-4 w-4 text-traveling-purple" />
                              )}
                              {place.type === "restaurant" && (
                                <Utensils className="h-4 w-4 text-traveling-purple" />
                              )}
                              {place.type === "cafe" && (
                                <Coffee className="h-4 w-4 text-traveling-purple" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{place.name}</p>
                                <span className="ml-2 text-xs text-gray-500">
                                  {place.time}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {place.type === "attraction" && "관광지"}
                                {place.type === "restaurant" && "식당"}
                                {place.type === "cafe" && "카페"}
                              </p>
                            </div>
                          </div>

                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePlaceFromItinerary(selectedDay, place.id)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {place.description}
                        </p>

                        {index < itinerary[selectedDay]?.places.length - 1 && (
                          <div className="mt-2 flex items-center">
                            <div className="ml-4 h-6 border-l-2 border-dashed border-gray-300"></div>
                          </div>
                        )}
                      </div>
                    ))}

                    {itinerary[selectedDay]?.accommodation && (
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-traveling-purple/10">
                              <Hotel className="h-4 w-4 text-traveling-purple" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {itinerary[selectedDay].accommodation.name}
                              </p>
                              <p className="text-xs text-gray-500">숙소</p>
                            </div>
                          </div>

                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => changeAccommodation(selectedDay)}
                              className="h-8 p-2"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              <span className="text-xs">변경</span>
                            </Button>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {itinerary[selectedDay].accommodation.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button className="bg-traveling-purple" onClick={handleSavePlan}>
              여행 일정 저장하기
            </Button>
          </div>
        </>
      )}

      <FlightModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
      />
    </div>
  );
}

export default ItineraryGeneration;



// function ItineraryGeneration({ destination, isAiMode = false, startDate, endDate }) {
//   const [selectedDay, setSelectedDay] = useState(1);
//   const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGenerated, setIsGenerated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("시작 날: ", startDate)
//     console.log("끝 날: ", endDate)
//   }, [])

//   const isInitialized = useRef(false);
//   const [itinerary, setItinerary] = useState({});
//   const dayCount =
//   startDate && endDate
//     ? differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
//     : 3;

// const dayKeys = Array.from({ length: dayCount }, (_, i) => i + 1); // [1, 2, 3, ...]


//   const cityNames = {
//     osaka: "오사카",
//     tokyo: "도쿄",
//     fukuoka: "후쿠오카",
//     paris: "파리",
//     rome: "로마",
//     venice: "베니스",
//     bangkok: "방콕",
//     singapore: "싱가포르",
//   };

//   const cityCoords = {
//     osaka: { lat: 34.6937, lng: 135.5023 },
//     tokyo: { lat: 35.6762, lng: 139.6503 },
//     fukuoka: { lat: 33.5904, lng: 130.4017 },
//     paris: { lat: 48.8566, lng: 2.3522 },
//     rome: { lat: 41.9028, lng: 12.4964 },
//     venice: { lat: 45.4408, lng: 12.3155 },
//     bangkok: { lat: 13.7563, lng: 100.5018 },
//     singapore: { lat: 1.3521, lng: 103.8198 },
//   };
//   const mapCenter = cityCoords[destination?.toLowerCase()] || { lat: 0, lng: 0 };

//   const mapMarkers =
//   itinerary[selectedDay]?.places
//     ?.filter((place) => place.position) // 좌표가 있는 곳만
//     .map((place) => ({
//       id: place.id,
//       position: place.position,
//       title: place.name,
//       selected: false,
//     })) || [];

//     console.log("mapMarkers", mapMarkers);
//     console.log("selectedDay", selectedDay);
//     console.log("itinerary", itinerary);
//     console.log("itinerary[selectedDay]?.places", itinerary[selectedDay]?.places);
//     console.log("itinerary", JSON.stringify(itinerary, null, 2));
//     console.log("selectedDay exists?", itinerary[selectedDay] !== undefined);
//     itinerary[selectedDay]?.places?.forEach((p) => {
//       console.log(p.name, p.position);
//     });
    





//     const placePositions = {
//       "도쿄 스카이트리": { lat: 35.7101, lng: 139.8107 },
//       "센소지 사원": { lat: 35.7148, lng: 139.7967 },
//       "메이지 신궁": { lat: 35.6764, lng: 139.6993 },
//       "하라주쿠 쇼핑": { lat: 35.6702, lng: 139.7025 },
//       "시부야 스크램블 교차로": { lat: 35.6595, lng: 139.7005 },
//       "도쿄 디즈니랜드": { lat: 35.6329, lng: 139.8804 },
//       "우에노 공원": { lat: 35.7156, lng: 139.7745 },
//       "아키하바라": { lat: 35.6984, lng: 139.7730 },
//       "오다이바": { lat: 35.619, lng: 139.7765 },
//       "팀랩 보더리스": { lat: 35.6195, lng: 139.7908 }
//     };


//   useEffect(() => {
//     if (isInitialized.current || isGenerated) return;

//     isInitialized.current = true;
//     setIsLoading(true);

//     setTimeout(() => {
//       if (destination === "tokyo") {
//         const dummyItinerary = isAiMode
//           ? {
//                // AI 모드 일정 (더 상세한 일정)
//                1: {
//                 places: [
//                   {
//                     id: "a1",
//                     name: "도쿄 스카이트리",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요. 맑은 날에는 후지산도 보입니다.",
//                     position: { lat: 35.7101, lng: 139.8107 },
//                   },
//                   {
//                     id: "r1",
//                     name: "스시 긴자",
//                     type: "restaurant",
//                     time: "12:30",
//                     description: "현지인들에게도 인기 있는 스시 레스토랑에서 신선한 해산물을 즐겨보세요.",
//                     position: { lat: 35.6717, lng: 139.7650 },
//                   },
//                   {
//                     id: "a2",
//                     name: "센소지 사원",
//                     type: "attraction",
//                     time: "14:30",
//                     description: "도쿄에서 가장 오래된 사원인 센소지를 방문하여 일본 전통 문화를 체험해보세요.",
//                     position: { lat: 35.7148, lng: 139.7967 },
//                   },
//                   {
//                     id: "c1",
//                     name: "아사쿠사 카페",
//                     type: "cafe",
//                     time: "16:00",
//                     description: "전통적인 일본 디저트와 함께 차를 즐길 수 있는 카페입니다.",
//                     position: { lat: 35.7112, lng: 139.7943 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h1",
//                   name: "시타디네스 신주쿠",
//                   description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다. 깨끗하고 현대적인 객실을 제공합니다.",
//                 },
//               },
//               2: {
//                 places: [
//                   {
//                     id: "a3",
//                     name: "메이지 신궁",
//                     type: "attraction",
//                     time: "09:30",
//                     description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다. 평화로운 산책을 즐겨보세요.",
//                     position: { lat: 35.6764, lng: 139.6993 },
//                   },
//                   {
//                     id: "a4",
//                     name: "하라주쿠 쇼핑",
//                     type: "attraction",
//                     time: "11:30",
//                     description: "일본 청소년 문화의 중심지인 하라주쿠에서 독특한 패션과 상점들을 구경해보세요.",
//                     position: { lat: 35.6702, lng: 139.7025 },
//                   },
//                   {
//                     id: "r2",
//                     name: "이치란 라멘",
//                     type: "restaurant",
//                     time: "13:00",
//                     description: "개인 부스에서 맛보는 유명한 돈코츠 라멘 체인점입니다.",
//                     position: { lat: 35.6938, lng: 139.7034 },
//                   },
//                   {
//                     id: "a5",
//                     name: "시부야 스크램블 교차로",
//                     type: "attraction",
//                     time: "15:00",
//                     description: "세계에서 가장 분주한 횡단보도 중 하나인 시부야 스크램블 교차로를 경험해보세요.",
//                     position: { lat: 35.6595, lng: 139.7005 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h1",
//                   name: "시타디네스 신주쿠",
//                   description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다. 깨끗하고 현대적인 객실을 제공합니다.",
//                 },
//               },
//               2: {
//                 places: [
//                   {
//                     id: "a3",
//                     name: "메이지 신궁",
//                     type: "attraction",
//                     time: "09:30",
//                     description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다. 평화로운 산책을 즐겨보세요.",
//                     position: { lat: 35.6764, lng: 139.6993 },
//                   },
//                   {
//                     id: "a4",
//                     name: "하라주쿠 쇼핑",
//                     type: "attraction",
//                     time: "11:30",
//                     description: "일본 청소년 문화의 중심지인 하라주쿠에서 독특한 패션과 상점들을 구경해보세요.",
//                     position: { lat: 35.6702, lng: 139.7025 },
//                   },
//                   {
//                     id: "r2",
//                     name: "이치란 라멘",
//                     type: "restaurant",
//                     time: "13:00",
//                     description: "개인 부스에서 맛보는 유명한 돈코츠 라멘 체인점입니다.",
//                     position: { lat: 35.6938, lng: 139.7034 },
//                   },
//                   {
//                     id: "a5",
//                     name: "시부야 스크램블 교차로",
//                     type: "attraction",
//                     time: "15:00",
//                     description: "세계에서 가장 분주한 횡단보도 중 하나인 시부야 스크램블 교차로를 경험해보세요.",
//                     position: { lat: 35.6595, lng: 139.7005 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h1",
//                   name: "시타디네스 신주쿠",
//                   description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다. 깨끗하고 현대적인 객실을 제공합니다.",
//                 },
//               },
//               3: {
//                 places: [
//                   {
//                     id: "a6",
//                     name: "도쿄 디즈니랜드",
//                     type: "attraction",
//                     time: "09:00",
//                     description: "하루 종일 즐길 수 있는 세계적으로 유명한 테마파크입니다.",
//                     position: { lat: 35.6329, lng: 139.8804 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h2",
//                   name: "도쿄 베이 호텔",
//                   description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다. 디즈니 캐릭터들로 꾸며진 객실을 제공합니다.",
//                 },
//               },
//               4: {
//                 places: [
//                   {
//                     id: "a7",
//                     name: "우에노 공원",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "아름다운 공원과 여러 박물관이 있는 문화 공간입니다.",
//                     position: { lat: 35.7156, lng: 139.7745 },
//                   },
//                   {
//                     id: "r3",
//                     name: "우동 레스토랑",
//                     type: "restaurant",
//                     time: "12:30",
//                     description: "전통적인 일본 우동을 맛볼 수 있는 현지인들이 사랑하는 식당입니다.",
//                     position: { lat: 35.7185, lng: 139.7736 },
//                   },
//                   {
//                     id: "a8",
//                     name: "아키하바라",
//                     type: "attraction",
//                     time: "14:00",
//                     description: "전자제품과 애니메이션의 중심지인 아키하바라에서 일본 오타쿠 문화를 경험해보세요.",
//                     position: { lat: 35.6984, lng: 139.773 },
//                   },
//                   {
//                     id: "c2",
//                     name: "메이드 카페",
//                     type: "cafe",
//                     time: "16:30",
//                     description: "아키하바라의 유명한 테마 카페에서 독특한 경험을 해보세요.",
//                     position: { lat: 35.6995, lng: 139.7722 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h3",
//                   name: "고지라 그레이서리 호텔",
//                   description: "신주쿠에 위치한 고지라 테마 호텔입니다. 객실에서 고지라 조형물을 볼 수 있습니다.",
//                 },
//               },
//               5: {
//                 places: [
//                   {
//                     id: "a9",
//                     name: "오다이바",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "도쿄 베이에 위치한 인공 섬으로, 쇼핑몰, 엔터테인먼트 시설, 자유의 여신상 복제품 등이 있습니다.",
//                     position: { lat: 35.619, lng: 139.7765 },
//                   },
//                   {
//                     id: "r4",
//                     name: "해산물 뷔페",
//                     type: "restaurant",
//                     time: "13:00",
//                     description: "오다이바에 위치한 고급 해산물 뷔페에서 다양한 일본 요리를 즐겨보세요.",
//                     position: { lat: 35.6201, lng: 139.7767 },
//                   },
//                   {
//                     id: "a10",
//                     name: "팀랩 보더리스",
//                     type: "attraction",
//                     time: "15:00",
//                     description: "디지털 아트 뮤지엄에서 몰입형 예술 경험을 해보세요.",
//                     position: { lat: 35.6195, lng: 139.7908 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h3",
//                   name: "고지라 그레이서리 호텔",
//                   description: "신주쿠에 위치한 고지라 테마 호텔입니다. 객실에서 고지라 조형물을 볼 수 있습니다.",
//                 },
//               },
//             }
//           : {
//               // 일반 모드 일정 (기본 일정)
//               1: {
//                 places: [
//                   {
//                     id: "a1",
//                     name: "도쿄 스카이트리",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
//                   },
//                   {
//                     id: "a2",
//                     name: "센소지 사원",
//                     type: "attraction",
//                     time: "14:00",
//                     description: "도쿄에서 가장 오래된 사원인 센소지를 방문하세요.",
//                   },
//                 ],
//                 accommodation: {
//                   id: "h1",
//                   name: "시타디네스 신주쿠",
//                   description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
//                 },
//               },
//               2: {
//                 places: [
//                   {
//                     id: "a3",
//                     name: "메이지 신궁",
//                     type: "attraction",
//                     time: "09:30",
//                     description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다.",
//                   },
//                   {
//                     id: "a5",
//                     name: "시부야 스크램블 교차로",
//                     type: "attraction",
//                     time: "15:00",
//                     description: "세계에서 가장 분주한 횡단보도 중 하나입니다.",
//                   },
//                 ],
//                 accommodation: {
//                   id: "h1",
//                   name: "시타디네스 신주쿠",
//                   description: "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다.",
//                 },
//               },
//               3: {
//                 places: [
//                   {
//                     id: "a6",
//                     name: "도쿄 디즈니랜드",
//                     type: "attraction",
//                     time: "09:00",
//                     description: "하루 종일 즐길 수 있는 세계적으로 유명한 테마파크입니다.",
//                   },
//                 ],
//                 accommodation: {
//                   id: "h2",
//                   name: "도쿄 베이 호텔",
//                   description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
//                 },
//               },
//             };

//             Object.values(dummyItinerary).forEach((day) => {
//               day.places.forEach((place) => {
//                 if (!place.position && placePositions[place.name]) {
//                   place.position = placePositions[place.name];
//                 }
//               });
//             });
//         setItinerary(dummyItinerary);
//       } else {
//         const basicItinerary = {};
//         for (let i = 1; i <= dayCount; i++) {
//           basicItinerary[i] = {
//             places: [
//               {
//                 id: `a${i}`,
//                 name: `${cityNames[destination] || destination} 주요 관광지 ${i}`,
//                 type: "attraction",
//                 time: "10:00",
//                 description: "이 도시의 대표 관광지입니다.",
//                 position: placePositions[`${cityNames[destination] || destination} 주요 관광지 ${i}`] || null,
//               },
//             ],
//             accommodation: {
//               id: `h${i}`,
//               name: "시티 센터 호텔",
//               description: "도심에 위치한 편리한 호텔입니다.",
//             },
//           };
//         }
//         setItinerary(basicItinerary);
//       }

//       setIsLoading(false);
//       setIsGenerated(true);
//     }, 1500);
//   }, [destination, isAiMode, isGenerated, startDate, endDate]);

// const removePlaceFromItinerary = (day, placeId) => {
//   setItinerary((prev) => {
//     const updatedDay = { ...prev[day] };
//     updatedDay.places = updatedDay.places.filter((place) => place.id !== placeId);
//     return { ...prev, [day]: updatedDay };
//   });
// };

        
//   const changeAccommodation = (day) => {
//     const accommodations = [
//       {
//         id: "h1",
//         name: "시티 센터 호텔",
//         description: "도심에 위치한 편리한 호텔입니다.",
//       },
//       {
//         id: "h2",
//         name: "리조트 호텔",
//         description: "휴양지에 위치한 고급 호텔입니다.",
//       },
//       {
//         id: "h3",
//         name: "부티크 호텔",
//         description: "독특한 디자인의 부티크 호텔입니다.",
//       },
//     ];

//     const currentId = itinerary[day]?.accommodation?.id;
//     const newAccommodation =
//       accommodations.find((acc) => acc.id !== currentId) || accommodations[0];

//     setItinerary((prev) => {
//       const updatedDay = { ...prev[day] };
//       updatedDay.accommodation = newAccommodation;
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const handleSavePlan = async () => {
//     const accountId = localStorage.getItem("accountId");
//     const country = "Japan"; // 필요에 따라 destination 매핑 가능
//     const city = destination;
  
//     const places = [];
//     const accommodations = [];
  
//     Object.entries(itinerary).forEach(([day, data]) => {
//       data.places.forEach((place) => {
//         places.push({
//           day: `day${day}`,
//           name: place.name,
//           category: place.type,
//           description: place.description,
//           time: place.time,
//           lat: place.position?.lat || 0,
//           lng: place.position?.lng || 0,
//         });
//       });
  
//       if (data.accommodation) {
//         accommodations.push({
//           day: `day${day}`,
//           name: data.accommodation.name,
//           description: data.accommodation.description,
//           lat: 0,
//           lng: 0,
//         });
//       }
//     });
  
//     const planData = {
//       accountId: Number(accountId),
//       startDate,
//       endDate,
//       country,
//       city,
//       transportation: "대중교통", // 나중에 수정 가능
//       places,
//       accommodations,
//     };
  
//     try {
//       await axios.post("http://localhost:8080/api/travel-plans", planData);
//       alert("여행 일정이 저장되었습니다!");
//       navigate("/mypage");
//     } catch (error) {
//       console.error("저장 실패", error);
//       alert("저장 중 오류 발생");
//     }
//   };
  
//   return (
//     <div className="space-y-6">
//       {isLoading ? (
//         <div className="flex h-64 items-center justify-center">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-traveling-purple border-t-transparent"></div>
//           <span className="ml-3 text-lg">일정을 생성하는 중입니다...</span>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-bold">
//               {isAiMode ? "AI 추천 일정" : "나의 여행 일정"}:{" "}
//               {cityNames[destination] || destination}
//             </h3>
//             <div className="flex space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsEditing(!isEditing)}
//               >
//                 {isEditing ? (
//                   <>
//                     <Check className="mr-1 h-4 w-4" />
//                     <span>완료</span>
//                   </>
//                 ) : (
//                   <>
//                     <Edit className="mr-1 h-4 w-4" />
//                     <span>일정 수정</span>
//                   </>
//                 )}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsFlightModalOpen(true)}
//               >
//                 <Plane className="mr-1 h-4 w-4" />
//                 <span>항공편 추가</span>
//               </Button>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {dayKeys.map((day) => (
//               <Button
//                 key={day}
//                 variant={
//                   selectedDay === day ? "default" : "outline"}
//                 className={`${
//                   selectedDay === day
//                     ? "bg-traveling-purple text-white"
//                     : "bg-white"
//                 }`}
//                 onClick={() => setSelectedDay(day)}
//               >
//                 {day}일차
//               </Button>
//             ))}
//           </div>

//           <div className="grid gap-6 md:grid-cols-5">
//             <Card className="md:col-span-2">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium">지도</h4>
//                   <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                     <Map className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <MapComponent center={mapCenter} height="400px" markers={mapMarkers} />

//               </CardContent>
//             </Card>

//             <Card className="md:col-span-3">
//               <CardContent className="p-4">
//                 <h4 className="font-medium mb-4">{selectedDay}일차 일정</h4>

//                 {itinerary[selectedDay]?.places.length === 0 ? (
//                   <p className="text-center text-gray-500">
//                     이 날의 일정이 비어있습니다.
//                   </p>
//                 ) : (
//                   <div className="space-y-4">
//                     {itinerary[selectedDay]?.places.map((place, index) => (
//                       <div key={place.id} className="rounded-lg border p-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-traveling-purple/10">
//                               {place.type === "attraction" && (
//                                 <Camera className="h-4 w-4 text-traveling-purple" />
//                               )}
//                               {place.type === "restaurant" && (
//                                 <Utensils className="h-4 w-4 text-traveling-purple" />
//                               )}
//                               {place.type === "cafe" && (
//                                 <Coffee className="h-4 w-4 text-traveling-purple" />
//                               )}
//                             </div>
//                             <div>
//                               <div className="flex items-center">
//                                 <p className="font-medium">{place.name}</p>
//                                 <span className="ml-2 text-xs text-gray-500">
//                                   {place.time}
//                                 </span>
//                               </div>
//                               <p className="text-xs text-gray-500">
//                                 {place.type === "attraction" && "관광지"}
//                                 {place.type === "restaurant" && "식당"}
//                                 {place.type === "cafe" && "카페"}
//                               </p>
//                             </div>
//                           </div>

//                           {isEditing && (
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 removePlaceFromItinerary(selectedDay, place.id)
//                               }
//                               className="h-8 w-8 p-0"
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           )}
//                         </div>

//                         <p className="mt-2 text-sm text-gray-600">
//                           {place.description}
//                         </p>

//                         {index <
//                           itinerary[selectedDay]?.places.length - 1 && (
//                           <div className="mt-2 flex items-center">
//                             <div className="ml-4 h-6 border-l-2 border-dashed border-gray-300"></div>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     {itinerary[selectedDay]?.accommodation && (
//                       <div className="rounded-lg border p-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-traveling-purple/10">
//                               <Hotel className="h-4 w-4 text-traveling-purple" />
//                             </div>
//                             <div>
//                               <p className="font-medium">
//                                 {itinerary[selectedDay].accommodation.name}
//                               </p>
//                               <p className="text-xs text-gray-500">숙소</p>
//                             </div>
//                           </div>

//                           {isEditing && (
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => changeAccommodation(selectedDay)}
//                               className="h-8 p-2"
//                             >
//                               <Edit className="h-4 w-4 mr-1" />
//                               <span className="text-xs">변경</span>
//                             </Button>
//                           )}
//                         </div>

//                         <p className="mt-2 text-sm text-gray-600">
//                           {itinerary[selectedDay].accommodation.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           <div className="flex justify-end">
//             <Button className="bg-traveling-purple" onClick={handleSavePlan}>여행 일정 저장하기</Button>
//           </div>
//         </>
//       )}

//       <FlightModal
//         isOpen={isFlightModalOpen}
//         onClose={() => setIsFlightModalOpen(false)}
//       />
//     </div>
//   );
// }

// export default ItineraryGeneration;
