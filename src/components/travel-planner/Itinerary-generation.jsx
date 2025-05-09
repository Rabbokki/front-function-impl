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

function ItineraryGeneration({ destination, isAiMode = false }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);

  const isInitialized = useRef(false);

  const [itinerary, setItinerary] = useState({});

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

  useEffect(() => {
    if (isInitialized.current || isGenerated) return;

    isInitialized.current = true;
    setIsLoading(true);

    setTimeout(() => {
      if (destination === "tokyo") {
        const dummyItinerary = isAiMode
          ? {
               // AI 모드 일정 (더 상세한 일정)
               1: {
                places: [
                  {
                    id: "a1",
                    name: "도쿄 스카이트리",
                    type: "attraction",
                    time: "10:00",
                    description:
                      "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요. 맑은 날에는 후지산도 보입니다.",
                  },
                  {
                    id: "r1",
                    name: "스시 긴자",
                    type: "restaurant",
                    time: "12:30",
                    description: "현지인들에게도 인기 있는 스시 레스토랑에서 신선한 해산물을 즐겨보세요.",
                  },
                  {
                    id: "a2",
                    name: "센소지 사원",
                    type: "attraction",
                    time: "14:30",
                    description: "도쿄에서 가장 오래된 사원인 센소지를 방문하여 일본 전통 문화를 체험해보세요.",
                  },
                  {
                    id: "c1",
                    name: "아사쿠사 카페",
                    type: "cafe",
                    time: "16:00",
                    description: "전통적인 일본 디저트와 함께 차를 즐길 수 있는 카페입니다.",
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description:
                    "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다. 깨끗하고 현대적인 객실을 제공합니다.",
                },
              },
              2: {
                places: [
                  {
                    id: "a3",
                    name: "메이지 신궁",
                    type: "attraction",
                    time: "09:30",
                    description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사입니다. 평화로운 산책을 즐겨보세요.",
                  },
                  {
                    id: "a4",
                    name: "하라주쿠 쇼핑",
                    type: "attraction",
                    time: "11:30",
                    description: "일본 청소년 문화의 중심지인 하라주쿠에서 독특한 패션과 상점들을 구경해보세요.",
                  },
                  {
                    id: "r2",
                    name: "이치란 라멘",
                    type: "restaurant",
                    time: "13:00",
                    description: "개인 부스에서 맛보는 유명한 돈코츠 라멘 체인점입니다.",
                  },
                  {
                    id: "a5",
                    name: "시부야 스크램블 교차로",
                    type: "attraction",
                    time: "15:00",
                    description: "세계에서 가장 분주한 횡단보도 중 하나인 시부야 스크램블 교차로를 경험해보세요.",
                  },
                ],
                accommodation: {
                  id: "h1",
                  name: "시타디네스 신주쿠",
                  description:
                    "신주쿠역에서 도보 5분 거리에 위치한 편리한 호텔입니다. 깨끗하고 현대적인 객실을 제공합니다.",
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
                  },
                ],
                accommodation: {
                  id: "h2",
                  name: "도쿄 베이 호텔",
                  description:
                    "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다. 디즈니 캐릭터들로 꾸며진 객실을 제공합니다.",
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
                  },
                  {
                    id: "r3",
                    name: "우동 레스토랑",
                    type: "restaurant",
                    time: "12:30",
                    description: "전통적인 일본 우동을 맛볼 수 있는 현지인들이 사랑하는 식당입니다.",
                  },
                  {
                    id: "a8",
                    name: "아키하바라",
                    type: "attraction",
                    time: "14:00",
                    description: "전자제품과 애니메이션의 중심지인 아키하바라에서 일본 오타쿠 문화를 경험해보세요.",
                  },
                  {
                    id: "c2",
                    name: "메이드 카페",
                    type: "cafe",
                    time: "16:30",
                    description: "아키하바라의 유명한 테마 카페에서 독특한 경험을 해보세요.",
                  },
                ],
                accommodation: {
                  id: "h3",
                  name: "고지라 그레이서리 호텔",
                  description: "신주쿠에 위치한 고지라 테마 호텔입니다. 객실에서 고지라 조형물을 볼 수 있습니다.",
                },
              },
              5: {
                places: [
                  {
                    id: "a9",
                    name: "오다이바",
                    type: "attraction",
                    time: "10:00",
                    description:
                      "도쿄 베이에 위치한 인공 섬으로, 쇼핑몰, 엔터테인먼트 시설, 자유의 여신상 복제품 등이 있습니다.",
                  },
                  {
                    id: "r4",
                    name: "해산물 뷔페",
                    type: "restaurant",
                    time: "13:00",
                    description: "오다이바에 위치한 고급 해산물 뷔페에서 다양한 일본 요리를 즐겨보세요.",
                  },
                  {
                    id: "a10",
                    name: "팀랩 보더리스",
                    type: "attraction",
                    time: "15:00",
                    description: "디지털 아트 뮤지엄에서 몰입형 예술 경험을 해보세요.",
                  },
                ],
                accommodation: {
                  id: "h3",
                  name: "고지라 그레이서리 호텔",
                  description: "신주쿠에 위치한 고지라 테마 호텔입니다. 객실에서 고지라 조형물을 볼 수 있습니다.",
                },
              },
            }
          : {
              // 일반 모드 일정 (기본 일정)
              1: {
                places: [
                  {
                    id: "a1",
                    name: "도쿄 스카이트리",
                    type: "attraction",
                    time: "10:00",
                    description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
                  },
                  {
                    id: "a2",
                    name: "센소지 사원",
                    type: "attraction",
                    time: "14:00",
                    description: "도쿄에서 가장 오래된 사원인 센소지를 방문하세요.",
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
                  },
                  {
                    id: "a5",
                    name: "시부야 스크램블 교차로",
                    type: "attraction",
                    time: "15:00",
                    description: "세계에서 가장 분주한 횡단보도 중 하나입니다.",
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
                  },
                ],
                accommodation: {
                  id: "h2",
                  name: "도쿄 베이 호텔",
                  description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
                },
              },
            }
        setItinerary(dummyItinerary);
      } else {
        const basicItinerary = {
          1: {
            places: [
              {
                id: "a1",
                name: `${cityNames[destination] || destination} 주요 관광지 1`,
                type: "attraction",
                time: "10:00",
                description: "이 도시의 주요 관광 명소입니다.",
              },
              {
                id: "r1",
                name: "현지 레스토랑",
                type: "restaurant",
                time: "13:00",
                description: "현지 음식을 맛볼 수 있는 인기 레스토랑입니다.",
              },
            ],
            accommodation: {
              id: "h1",
              name: "시티 센터 호텔",
              description: "도심에 위치한 편리한 호텔입니다.",
            },
          },
          2: {
            places: [
              {
                id: "a2",
                name: `${cityNames[destination] || destination} 주요 관광지 2`,
                type: "attraction",
                time: "09:30",
                description: "이 도시의 또 다른 주요 관광 명소입니다.",
              },
              {
                id: "c1",
                name: "로컬 카페",
                type: "cafe",
                time: "15:00",
                description: "현지인들이 즐겨찾는 카페입니다.",
              },
            ],
            accommodation: {
              id: "h1",
              name: "시티 센터 호텔",
              description: "도심에 위치한 편리한 호텔입니다.",
            },
          },
          3: {
            places: [
              {
                id: "a3",
                name: `${cityNames[destination] || destination} 주요 관광지 3`,
                type: "attraction",
                time: "10:00",
                description: "이 도시의 또 다른 주요 관광 명소입니다.",
              },
            ],
            accommodation: {
              id: "h2",
              name: "리조트 호텔",
              description: "휴양지에 위치한 고급 호텔입니다.",
            },
          },
        }
        setItinerary(basicItinerary);
      }

      setIsLoading(false);
      setIsGenerated(true);
    }, 1500);
  }, [destination, isAiMode, isGenerated]);

  const removePlaceFromItinerary = (day, placeId) => {
    setItinerary((prev) => {
      const updatedDay = { ...prev[day] };
      updatedDay.places = updatedDay.places.filter(
        (place) => place.id !== placeId
      );
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
            {Object.keys(itinerary).map((day) => (
              <Button
                key={day}
                variant={
                  selectedDay === Number.parseInt(day) ? "default" : "outline"
                }
                className={`${
                  selectedDay === Number.parseInt(day)
                    ? "bg-traveling-purple text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedDay(Number.parseInt(day))}
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
                <div className="relative h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">
                    지도 영역 (실제 구현 시 Google Maps 등 연동)
                  </p>
                </div>
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
                              onClick={() =>
                                removePlaceFromItinerary(selectedDay, place.id)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {place.description}
                        </p>

                        {index <
                          itinerary[selectedDay]?.places.length - 1 && (
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
            <Button className="bg-traveling-purple">여행 일정 저장하기</Button>
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
