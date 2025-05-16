//==========================================================================================================
// AI 일정만들기까지 되는 버전
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Plane,
//   Hotel,
//   Coffee,
//   Utensils,
//   Camera,
//   X,
//   Edit,
//   Check,
//   Map,
// } from "lucide-react";
// import { Button } from "../../modules/Button";
// import { Card, CardContent } from "../../modules/Card";
// import { FlightModal } from "./flight-modal";
// import MapComponent from "../travel-planner/Map-component";
// import { differenceInCalendarDays } from "date-fns";
// import axios from "axios";
// import axiosInstance from "../../api/axiosInstance";
// import { useNavigate,useLocation } from "react-router-dom";

// function ItineraryGeneration({ destination, isAiMode = false, startDate, endDate }) {
//   const [selectedDay, setSelectedDay] = useState(1);
//   const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGenerated, setIsGenerated] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isInitialized = useRef(false);
//   const [itinerary, setItinerary] = useState({});
//   const dayCount =
//     startDate && endDate
//       ? differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
//       : 3;

//   const dayKeys = Array.from({ length: dayCount }, (_, i) => i + 1);

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
//     itinerary[selectedDay]?.places
//       ?.filter((place) => place.position)
//       .map((place) => ({
//         id: place.id,
//         position: place.position,
//         title: place.name,
//         selected: false,
//       })) || [];

//   const placePositions = {
//     "도쿄 스카이트리": { lat: 35.7101, lng: 139.8107 },
//     "센소지 사원": { lat: 35.7148, lng: 139.7967 },
//     "메이지 신궁": { lat: 35.6764, lng: 139.6993 },
//     "하라주쿠 쇼핑": { lat: 35.6702, lng: 139.7025 },
//     "시부야 스크램블 교차로": { lat: 35.6595, lng: 139.7005 },
//     "도쿄 디즈니랜드": { lat: 35.6329, lng: 139.8804 },
//     "우에노 공원": { lat: 35.7156, lng: 139.7745 },
//     "아키하바라": { lat: 35.6984, lng: 139.7730 },
//     "오다이바": { lat: 35.619, lng: 139.7765 },
//     "팀랩 보더리스": { lat: 35.6195, lng: 139.7908 },
//   };

//   useEffect(() => {
//     if (isInitialized.current || isGenerated) return;

//     isInitialized.current = true;
//     setIsLoading(true);

//     setTimeout(() => {
//       if (isAiMode && location.state?.itinerary) {
//         const aiItinerary = {};
//         location.state.itinerary.forEach((dayData, index) => {
//           const day = index + 1;
//           aiItinerary[day] = {
//             places: dayData.activities.map((activity, idx) => ({
//               id: `a${day}-${idx}`,
//               name: activity.activity,
//               type: activity.time === "lunch" || activity.time === "evening" ? "restaurant" : "attraction",
//               time: activity.time.charAt(0).toUpperCase() + activity.time.slice(1),
//               description: activity.description,
//               position: placePositions[activity.activity] || null,
//             })),
//             accommodation: {
//               id: `h${day}`,
//               name: "AI 추천 호텔",
//               description: "AI가 추천한 편리한 위치의 호텔입니다.",
//             },
//           };
//         });
//         setItinerary(aiItinerary);
//       } else if (destination === "tokyo") {
//         const dummyItinerary = isAiMode
//           ? {
//               1: {
//                 places: [
//                   {
//                     id: "a1",
//                     name: "도쿄 스카이트리",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
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
//                     position: { lat: 35.6329, lng: 139.8804 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h2",
//                   name: "도쿄 베이 호텔",
//                   description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
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
//                   description: "신주쿠에 위치한 고지라 테마 호텔입니다.",
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
//                   description: "신주쿠에 위치한 고지라 테마 호텔입니다.",
//                 },
//               },
//             }
//           : {
//               1: {
//                 places: [
//                   {
//                     id: "a1",
//                     name: "도쿄 스카이트리",
//                     type: "attraction",
//                     time: "10:00",
//                     description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요.",
//                     position: { lat: 35.7101, lng: 139.8107 },
//                   },
//                   {
//                     id: "a2",
//                     name: "센소지 사원",
//                     type: "attraction",
//                     time: "14:00",
//                     description: "도쿄에서 가장 오래된 사원인 센소지를 방문하세요.",
//                     position: { lat: 35.7148, lng: 139.7967 },
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
//                     position: { lat: 35.6764, lng: 139.6993 },
//                   },
//                   {
//                     id: "a5",
//                     name: "시부야 스크램블 교차로",
//                     type: "attraction",
//                     time: "15:00",
//                     description: "세계에서 가장 분주한 횡단보도 중 하나입니다.",
//                     position: { lat: 35.6595, lng: 139.7005 },
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
//                     position: { lat: 35.6329, lng: 139.8804 },
//                   },
//                 ],
//                 accommodation: {
//                   id: "h2",
//                   name: "도쿄 베이 호텔",
//                   description: "디즈니랜드와 가까운 위치에 있는 테마 호텔입니다.",
//                 },
//               },
//             };

//         Object.values(dummyItinerary).forEach((day) => {
//           day.places.forEach((place) => {
//             if (!place.position && placePositions[place.name]) {
//               place.position = placePositions[place.name];
//             }
//           });
//         });
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
//   }, [destination, isAiMode, isGenerated, startDate, endDate, location.state]);

//   const removePlaceFromItinerary = (day, placeId) => {
//     setItinerary((prev) => {
//       const updatedDay = { ...prev[day] };
//       updatedDay.places = updatedDay.places.filter((place) => place.id !== placeId);
//       return { ...prev, [day]: updatedDay };
//     });
//   };

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
//     try {
//       const startDate = localStorage.getItem('startDate');
//       const endDate = localStorage.getItem('endDate');

//       // 날짜 검증
//       const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//       if (!startDate || !endDate || !dateRegex.test(startDate) || !dateRegex.test(endDate)) {
//         console.error('Invalid or missing start_date/end_date in localStorage');
//         alert('여행 시작일 또는 종료일이 올바르지 않습니다. 다시 설정해주세요.');
//         return;
//       }

//       // itinerary를 배열로 변환
//       const formattedItinerary = Object.keys(itinerary).map((day) => ({
//         day: `day${day}`,
//         activities: itinerary[day].places.map((place) => ({
//           activity: place.name,
//           time: place.time.toLowerCase(),
//           description: place.description,
//         })),
//         accommodation: itinerary[day].accommodation ? {
//           name: itinerary[day].accommodation.name,
//           description: itinerary[day].accommodation.description,
//         } : null,
//       }));

//       // itinerary 검증
//       if (!formattedItinerary || formattedItinerary.length === 0) {
//         console.error('Formatted itinerary is empty or invalid');
//         alert('여행 일정 데이터가 없습니다.');
//         return;
//       }

//       const planData = {
//         destination: destination,
//         start_date: startDate,
//         end_date: endDate,
//         itinerary: formattedItinerary,
//         planType: isAiMode ? 'AI' : 'MY' // AI 모드 여부에 따라 planType 설정
//       };

//       console.log('Sending planData:', JSON.stringify(planData, null, 2));
//       const response = await axiosInstance.post('/api/aiplan/save', planData);
//       console.log('일정 저장 성공:', response.data);
//       alert('여행 일정이 성공적으로 저장되었습니다!');
//       navigate('/mypage');
//     } catch (error) {
//       console.error('일정 저장 실패:', error.response?.data || error.message);
//       alert('일정 저장에 실패했습니다. 다시 시도해주세요.');
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
//                 variant={selectedDay === day ? "default" : "outline"}
//                 className={`${selectedDay === day ? "bg-traveling-purple text-white" : "bg-white"}`}
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
//                               onClick={() => removePlaceFromItinerary(selectedDay, place.id)}
//                               className="h-8 w-8 p-0"
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           )}
//                         </div>

//                         <p className="mt-2 text-sm text-gray-600">
//                           {place.description}
//                         </p>

//                         {index < itinerary[selectedDay]?.places.length - 1 && (
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
//             <Button className="bg-traveling-purple" onClick={handleSavePlan}>
//               여행 일정 저장하기
//             </Button>
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
import { differenceInCalendarDays, format } from "date-fns";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { getFromLocalStorage } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItineraryGeneration({ destination, isAiMode = false, startDate: propStartDate, endDate: propEndDate, plannerType }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isInitialized = useRef(false);
  const [itinerary, setItinerary] = useState({});

  // localStorage에서 travelPlan 가져오기
  const travelPlan = getFromLocalStorage("travelPlan") || {};
  const { startDate: localStartDate, endDate: localEndDate, selectedAttractions, selectedHotels, selectedTransportation } = travelPlan;

  // prop과 localStorage 우선순위: localStorage > prop
  const startDate = localStartDate || propStartDate;
  const endDate = localEndDate || propEndDate;

  // dayKeys 생성
  const generateDayKeys = (start, end) => {
    if (!start || !end) {
      console.warn("startDate or endDate is missing, using default day keys");
      return ["day1", "day2", "day3"];
    }
    const days = differenceInCalendarDays(new Date(end), new Date(start)) + 1;
    return Array.from({ length: days }, (_, i) =>
      format(new Date(new Date(start).setDate(new Date(start).getDate() + i)), "yyyy-MM-dd")
    );
  };

  const dayCount = startDate && endDate
    ? differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
    : 3;
  const dayKeys = generateDayKeys(startDate, endDate);

  const cityNames = {
    osaka: "오사카",
    tokyo: "도쿄",
    fukuoka: "후쿠오카",
    jeju: "제주",
    bangkok: "방콕",
    singapore: "싱가포르",
    paris: "파리",
    rome: "로마",
    venice: "베니스",
  };

  const cityCoords = {
    osaka: { lat: 34.6937, lng: 135.5023 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    fukuoka: { lat: 33.5904, lng: 130.4017 },
    jeju: { lat: 33.4890, lng: 126.4983 },
    bangkok: { lat: 13.7563, lng: 100.5018 },
    singapore: { lat: 1.3521, lng: 103.8198 },
    paris: { lat: 48.8566, lng: 2.3522 },
    rome: { lat: 41.9028, lng: 12.4964 },
    venice: { lat: 45.4408, lng: 12.3155 },
  };

  const countryMap = {
    osaka: "일본",
    tokyo: "일본",
    fukuoka: "일본",
    jeju: "한국",
    bangkok: "태국",
    singapore: "싱가포르",
    paris: "프랑스",
    rome: "이탈리아",
    venice: "이탈리아",
  };

  const mapCenter = cityCoords[destination?.toLowerCase()] || { lat: 0, lng: 0 };

  const attractionsData = {
    osaka: {
      attractions: [
        { id: "attraction1", name: "도톤보리", position: { lat: 34.6687, lng: 135.5013 }, description: "오사카의 활기찬 먹거리 거리", address: "Dotonbori, Chuo Ward, Osaka" },
        { id: "attraction2", name: "오사카 성", position: { lat: 34.6853, lng: 135.5256 }, description: "역사적인 성곽", address: "1-1 Osakajo, Chuo Ward, Osaka" },
      ],
    },
    jeju: {
      attractions: [
        { id: "attraction1", name: "한라산", position: { lat: 33.3617, lng: 126.5292 }, description: "제주의 대표적인 산", address: "Hallasan, Jeju Island" },
        { id: "attraction2", name: "성산일출봉", position: { lat: 33.4581, lng: 126.9425 }, description: "아름다운 일출 명소", address: "Seongsan Ilchulbong, Seogwipo, Jeju" },
      ],
    },
    tokyo: {
      attractions: [
        { id: "attraction1", name: "시부야 스크램블 교차로", position: { lat: 35.6595, lng: 139.7005 }, description: "도쿄의 상징적인 교차로", address: "Shibuya Crossing, Shibuya, Tokyo" },
        { id: "attraction2", name: "도쿄 타워", position: { lat: 35.6586, lng: 139.7454 }, description: "도쿄의 랜드마크", address: "4 Chome-2-8 Shibakoen, Minato, Tokyo" },
        { id: "tokyo-tower", name: "도쿄 타워", position: { lat: 35.6586, lng: 139.7454 }, description: "도쿄의 랜드마크", address: "4 Chome-2-8 Shibakoen, Minato, Tokyo" },
        { id: "attraction3", name: "도쿄 스카이트리", position: { lat: 35.7101, lng: 139.8107 }, description: "도쿄의 랜드마크인 스카이트리에서 도시 전체를 조망해보세요", address: "1 Chome-1-2 Oshiage, Sumida, Tokyo" },
        { id: "attraction4", name: "센소지 사원", position: { lat: 35.7148, lng: 139.7967 }, description: "도쿄에서 가장 오래된 사원", address: "2 Chome-3-1 Asakusa, Taito, Tokyo" },
        { id: "attraction5", name: "메이지 신궁", position: { lat: 35.6764, lng: 139.6993 }, description: "도심 속 울창한 숲으로 둘러싸인 신성한 신사", address: "1-1 Yoyogikamizonocho, Shibuya, Tokyo" },
        { id: "attraction6", name: "하라주쿠 쇼핑", position: { lat: 35.6702, lng: 139.7025 }, description: "일본 청소년 문화의 중심지", address: "Harajuku, Shibuya, Tokyo" },
        { id: "attraction7", name: "도쿄 디즈니랜드", position: { lat: 35.6329, lng: 139.8804 }, description: "세계적으로 유명한 테마파크", address: "1-1 Maihama, Urayasu, Chiba" },
        { id: "attraction8", name: "우에노 공원", position: { lat: 35.7156, lng: 139.7745 }, description: "아름다운 공원과 박물관", address: "Uenokoen, Taito, Tokyo" },
        { id: "attraction9", name: "아키하바라", position: { lat: 35.6984, lng: 139.7730 }, description: "전자제품과 애니메이션의 중심지", address: "Akihabara, Chiyoda, Tokyo" },
        { id: "attraction10", name: "오다이바", position: { lat: 35.6190, lng: 139.7765 }, description: "도쿄 베이의 인공 섬", address: "Odaiba, Minato, Tokyo" },
        { id: "attraction11", name: "팀랩 보더리스", position: { lat: 35.6195, lng: 139.7908 }, description: "디지털 아트 뮤지엄", address: "1-3-8 Aomi, Koto, Tokyo" },
      ],
    },
    fukuoka: {
      attractions: [
        { id: "attraction1", name: "오호리 공원", position: { lat: 33.5861, lng: 130.3896 }, description: "평화로운 공원", address: "Ohori Park, Chuo Ward, Fukuoka" },
        { id: "attraction2", name: "캐널시티 하카타", position: { lat: 33.5898, lng: 130.4108 }, description: "대형 쇼핑몰", address: "Canal City Hakata, Hakata Ward, Fukuoka" },
      ],
    },
    bangkok: {
      attractions: [
        { id: "attraction1", name: "왓 아룬", position: { lat: 13.7442, lng: 100.4889 }, description: "아름다운 사원", address: "158 Thanon Wang Doem, Bangkok Yai, Bangkok" },
        { id: "attraction2", name: "그랜드 팰리스", position: { lat: 13.7500, lng: 100.4927 }, description: "왕궁", address: "Na Phra Lan Rd, Phra Nakhon, Bangkok" },
        { id: "grand-palace", name: "그랜드 팰리스", position: { lat: 13.7500, lng: 100.4927 }, description: "방콕의 대표적인 왕궁", address: "Na Phra Lan Rd, Phra Nakhon, Bangkok" },
      ],
    },
    singapore: {
      attractions: [
        { id: "attraction1", name: "마리나 베이 샌즈", position: { lat: 1.2834, lng: 103.8607 }, description: "럭셔리 호텔", address: "10 Bayfront Ave, Singapore" },
        { id: "attraction2", name: "가든스 바이 더 베이", position: { lat: 1.2816, lng: 103.8636 }, description: "미래적인 정원", address: "18 Marina Gardens Dr, Singapore" },
      ],
    },
    paris: {
      attractions: [
        { id: "attraction1", name: "에펠탑", position: { lat: 48.8584, lng: 2.2945 }, description: "파리의 상징", address: "Champ de Mars, 5 Avenue Anatole France, Paris" },
        { id: "attraction2", name: "루브르 박물관", position: { lat: 48.8606, lng: 2.3376 }, description: "세계적인 박물관", address: "75001 Paris, France" },
      ],
    },
    rome: {
      attractions: [
        { id: "attraction1", name: "콜로세움", position: { lat: 41.8902, lng: 12.4922 }, description: "고대 로마의 원형 경기장", address: "Piazza del Colosseo, 1, Rome" },
        { id: "attraction2", name: "판테온", position: { lat: 41.8986, lng: 12.4769 }, description: "로마의 역사적인 건축물", address: "Piazza della Rotonda, Rome" },
      ],
    },
    venice: {
      attractions: [
        { id: "attraction1", name: "산 마르코 광장", position: { lat: 45.4340, lng: 12.3388 }, description: "베니스의 중심 광장", address: "Piazza San Marco, Venice" },
        { id: "attraction2", name: "리알토 다리", position: { lat: 45.4380, lng: 12.3359 }, description: "유명한 다리", address: "Rialto Bridge, Venice" },
      ],
    },
  };

  const hotelsData = {
    osaka: {
      hotels: [
        { id: "hotel1", name: "호텔 오사카 센트럴", description: "도심에 위치한 편리한 호텔", lat: 34.6937, lng: 135.5023, address: "Chuo Ward, Osaka" },
        { id: "hotel2", name: "스위소텔 난카이 오사카", description: "난바 근처의 고급 호텔", lat: 34.6667, lng: 135.5016, address: "Namba, Chuo Ward, Osaka" },
      ],
    },
    jeju: {
      hotels: [
        { id: "hotel1", name: "제주 신라호텔", description: "럭셔리 리조트", lat: 33.2478, lng: 126.4081, address: "Seogwipo, Jeju" },
        { id: "hotel2", name: "롯데 호텔 제주", description: "가족 친화적인 호텔", lat: 33.2486, lng: 126.4102, address: "Seogwipo, Jeju" },
      ],
    },
    tokyo: {
      hotels: [
        { id: "hotel1", name: "시타디네스 신주쿠", description: "신주쿠역 근처 호텔", lat: 35.6906, lng: 139.6995, address: "1 Chome-28-13 Shinjuku, Tokyo" },
        { id: "hotel2", name: "도쿄 베이 호텔", description: "디즈니랜드 근처 테마 호텔", lat: 35.6255, lng: 139.8790, address: "Maihama, Urayasu, Chiba" },
        { id: "hotel3", name: "고지라 그레이서리 호텔", description: "신주쿠에 위치한 고지라 테마 호텔", lat: 35.6940, lng: 139.7040, address: "Kabukicho, Shinjuku, Tokyo" },
      ],
    },
    fukuoka: {
      hotels: [
        { id: "hotel1", name: "호텔 후쿠오카 센트럴", description: "도심에 위치한 호텔", lat: 33.5904, lng: 130.4017, address: "Chuo Ward, Fukuoka" },
        { id: "hotel2", name: "힐튼 후쿠오카", description: "고급 호텔", lat: 33.5920, lng: 130.4050, address: "Hakata Ward, Fukuoka" },
      ],
    },
    bangkok: {
      hotels: [
        { id: "hotel1", name: "방콕 센트럴 호텔", description: "도심에 위치한 호텔", lat: 13.7563, lng: 100.5018, address: "Sukhumvit Rd, Bangkok" },
        { id: "hotel2", name: "샹그릴라 방콕", description: "강변 럭셔리 호텔", lat: 13.7234, lng: 100.5140, address: "89 Soi Wat Suan Plu, Bangkok" },
      ],
    },
    singapore: {
      hotels: [
        { id: "hotel1", name: "마리나 베이 샌즈", description: "아이코닉한 럭셔리 호텔", lat: 1.2834, lng: 103.8607, address: "10 Bayfront Ave, Singapore" },
        { id: "hotel2", name: "래플스 호텔", description: "역사적인 호텔", lat: 1.2948, lng: 103.8540, address: "1 Beach Rd, Singapore" },
      ],
    },
    paris: {
      hotels: [
        { id: "hotel1", name: "파리 센트럴 호텔", description: "도심에 위치한 호텔", lat: 48.8566, lng: 2.3522, address: "1st Arrondissement, Paris" },
        { id: "hotel2", name: "샹그릴라 파리", description: "고급 호텔", lat: 48.8637, lng: 2.2935, address: "10 Avenue d'Iéna, Paris" },
      ],
    },
    rome: {
      hotels: [
        { id: "hotel1", name: "로마 센트럴 호텔", description: "도심에 위치한 호텔", lat: 41.9028, lng: 12.4964, address: "Via del Corso, Rome" },
        { id: "hotel2", name: "호텔 에덴", description: "럭셔리 호텔", lat: 41.9050, lng: 12.4870, address: "Via Ludovisi, Rome" },
      ],
    },
    venice: {
      hotels: [
        { id: "hotel1", name: "베니스 센트럴 호텔", description: "운하 근처 호텔", lat: 45.4408, lng: 12.3155, address: "San Marco, Venice" },
        { id: "hotel2", name: "다니엘리 호텔", description: "역사적인 럭셔리 호텔", lat: 45.4339, lng: 12.3410, address: "Riva degli Schiavoni, Venice" },
      ],
    },
  };

  const mapMarkers = itinerary[selectedDay]?.places
    ?.filter((place) => place.position)
    .map((place) => ({
      id: place.id,
      position: place.position,
      title: place.name,
      selected: false,
    })) || [];

  useEffect(() => {
    if (isInitialized.current || isGenerated) return;

    isInitialized.current = true;
    setIsLoading(true);

    setTimeout(() => {
      console.log("Travel Plan Data:", travelPlan);
      if (isAiMode && location.state?.itinerary) {
        console.log("AI Mode: Processing itinerary from location.state", location.state.itinerary);
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
              position: attractionsData[destination?.toLowerCase()]?.attractions.find(a => a.name === activity.activity)?.position || null,
            })),
            accommodation: dayData.accommodation || {
              id: `h${day}`,
              name: "AI 추천 호텔",
              description: "AI가 추천한 편리한 위치의 호텔입니다.",
            },
          };
        });
        setItinerary(aiItinerary);
      } else {
        if (!startDate || !endDate || !selectedAttractions || !selectedHotels) {
          console.error("Manual Mode: Missing required data", { startDate, endDate, selectedAttractions, selectedHotels });
          setErrorMessage("여행 데이터가 누락되었습니다. Step 1부터 다시 시작해주세요.");
          setIsLoading(false);
          return;
        }

        console.log("Manual Mode: Processing selectedAttractions", selectedAttractions);
        console.log("Day Keys:", dayKeys);

        const manualItinerary = {};
        let hasInvalidAttraction = false;

        dayKeys.forEach((dayKey, index) => {
          const day = index + 1;
          // selectedAttractions 키를 day1, day2, day3로 매핑
          const legacyDayKey = `day${day}`;
          const attractions = Array.isArray(selectedAttractions[dayKey])
            ? selectedAttractions[dayKey]
            : Array.isArray(selectedAttractions[legacyDayKey])
              ? selectedAttractions[legacyDayKey]
              : [];
          const hotelId = selectedHotels[dayKey] || selectedHotels[legacyDayKey] || "hotel1";
          const hotel = hotelsData[destination?.toLowerCase()]?.hotels.find(h => h.id === hotelId) || {
            id: `h${day}`,
            name: "기본 호텔",
            description: "도심에 위치한 호텔",
            lat: 0.0,
            lng: 0.0,
            address: "Unknown Address",
          };

          console.log(`Day ${day} (Key: ${dayKey}, Legacy Key: ${legacyDayKey}): Attractions`, attractions);
          console.log(`Available attractions for ${destination}:`, attractionsData[destination?.toLowerCase()]?.attractions);

          const places = attractions.map((attractionId, idx) => {
            const normalizedAttractionId = typeof attractionId === 'string' ? attractionId.trim().toLowerCase() : attractionId;
            const attraction = attractionsData[destination?.toLowerCase()]?.attractions.find(
              a => a.id.trim().toLowerCase() === normalizedAttractionId || a.name.trim().toLowerCase() === normalizedAttractionId
            );
            const timeSlots = ["10:00", "12:30", "14:30", "16:00"];

            if (!attraction) {
              console.warn(`Attraction not found for ID: ${attractionId} in destination: ${destination}`);
              hasInvalidAttraction = true;
              return {
                id: `a${day}-${idx}`,
                name: `알 수 없는 장소 (ID: ${attractionId})`,
                type: "attraction",
                time: timeSlots[idx % timeSlots.length],
                description: "선택된 장소에 대한 정보가 없습니다.",
                position: null,
                address: "Unknown Address",
              };
            }

            return {
              id: `a${day}-${idx}`,
              name: attraction.name,
              type: "attraction",
              time: timeSlots[idx % timeSlots.length],
              description: attraction.description,
              position: attraction.position,
              address: attraction.address || attraction.name,
            };
          });

          // 장소가 없으면 기본 장소 추가 (임시)
          if (places.length === 0 && attractionsData[destination?.toLowerCase()]?.attractions[0]) {
            const defaultAttraction = attractionsData[destination?.toLowerCase()].attractions[0];
            places.push({
              id: `a${day}-0`,
              name: defaultAttraction.name,
              type: "attraction",
              time: "10:00",
              description: defaultAttraction.description,
              position: defaultAttraction.position,
              address: defaultAttraction.address || defaultAttraction.name,
            });
            console.log(`Added default attraction for Day ${day}:`, defaultAttraction);
          }

          manualItinerary[day] = {
            places,
            accommodation: hotel,
          };
        });

        if (hasInvalidAttraction) {
          setErrorMessage("일부 장소를 매핑하지 못했습니다. 선택한 장소를 다시 확인해주세요.");
        }

        console.log("Generated Manual Itinerary:", manualItinerary);
        setItinerary(manualItinerary);
      }

      setIsLoading(false);
      setIsGenerated(true);
    }, 1500);
  }, [isAiMode, destination, location.state, startDate, endDate, selectedAttractions, selectedHotels, isGenerated]);

  const removePlaceFromItinerary = (day, placeId) => {
    setItinerary((prev) => {
      const updatedDay = { ...prev[day] };
      updatedDay.places = updatedDay.places.filter((place) => place.id !== placeId);
      return { ...prev, [day]: updatedDay };
    });
  };

  const changeAccommodation = (day) => {
    const accommodations = hotelsData[destination?.toLowerCase()]?.hotels || [
      { id: "h1", name: "시티 센터 호텔", description: "도심에 위치한 편리한 호텔입니다.", lat: 0.0, lng: 0.0, address: "Unknown Address" },
    ];

    const currentId = itinerary[day]?.accommodation?.id;
    const newAccommodation = accommodations.find((acc) => acc.id !== currentId) || accommodations[0];

    setItinerary((prev) => {
      const updatedDay = { ...prev[day] };
      updatedDay.accommodation = newAccommodation;
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleSaveManualPlan = async () => {
    try {
      if (!startDate || !endDate) {
        toast.error("여행 시작일 또는 종료일이 올바르지 않습니다. 다시 설정해주세요.");
        return;
      }

      const places = [];
      const accommodations = [];
      const transportations = [];

      Object.keys(itinerary).forEach((day) => {
        const dayKey = `day${day}`;
        itinerary[day].places.forEach((place) => {
          places.push({
            day: dayKey,
            name: place.name,
            category: place.type,
            description: place.description,
            time: place.time,
            latitude: place.position?.lat || 0.0,
            longitude: place.position?.lng || 0.0,
            address: place.address || place.name,
          });
        });

        if (itinerary[day].accommodation) {
          accommodations.push({
            day: dayKey,
            name: itinerary[day].accommodation.name,
            description: itinerary[day].accommodation.description,
            latitude: itinerary[day].accommodation.lat || 0.0,
            longitude: itinerary[day].accommodation.lng || 0.0,
            address: itinerary[day].accommodation.address || itinerary[day].accommodation.name,
          });
        }

        if (selectedTransportation?.[dayKeys[day - 1]]) {
          transportations.push({
            day: dayKey,
            type: selectedTransportation[dayKeys[day - 1]].toUpperCase(),
          });
        }
      });

      if (places.length === 0) {
        toast.error("여행 일정에 장소가 없습니다. Step 2에서 장소를 추가해주세요.");
        return;
      }

      const planData = {
        city: destination,
        country: countryMap[destination?.toLowerCase()] || "Unknown",
        start_date: startDate,
        end_date: endDate,
        places,
        accommodations,
        transportations,
      };

      console.log("Saving Manual Plan Data:", JSON.stringify(planData, null, 2));

      const response = await axiosInstance.post("/api/travel-plans", planData);
      if (response.data === "여행 계획 저장 성공") {
        toast.success("여행 일정이 성공적으로 저장되었습니다!");
        localStorage.setItem("travelPlan", JSON.stringify({ ...travelPlan, ...planData }));
        navigate("/mypage");
      } else {
        throw new Error("서버에서 예상치 못한 응답: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("일정 저장 실패:", error.response?.data || error.message);
      toast.error(`일정 저장에 실패했습니다: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleSavePlan = async () => {
    if (isAiMode) {
      try {
        if (!startDate || !endDate) {
          toast.error("여행 시작일 또는 종료일이 올바르지 않습니다. 다시 설정해주세요.");
          return;
        }

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

        if (!formattedItinerary || formattedItinerary.length === 0) {
          toast.error("여행 일정 데이터가 없습니다.");
          return;
        }

        const planData = {
          destination,
          start_date: startDate,
          end_date: endDate,
          itinerary: formattedItinerary,
          planType: "AI",
        };

        const response = await axiosInstance.post("/api/aiplan/save", planData);
        toast.success("AI 여행 일정이 성공적으로 저장되었습니다!");
        navigate("/mypage");
      } catch (error) {
        console.error("AI 일정 저장 실패:", error.response?.data || error.message);
        toast.error(`AI 일정 저장에 실패했습니다: ${error.response?.data?.message || error.message}`);
      }
    } else {
      await handleSaveManualPlan();
    }
  };

  const isSaveDisabled = Object.keys(itinerary).every((day) => itinerary[day].places.length === 0);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-traveling-purple border-t-transparent"></div>
        <span className="ml-3 text-lg">일정을 생성하는 중입니다...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="text-red-600 p-4 bg-red-100 rounded-lg">
          {errorMessage}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">
          {isAiMode ? "AI 추천 일정" : "나의 여행 일정"}: {cityNames[destination?.toLowerCase()] || destination}
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
        {dayKeys.map((day, index) => (
          <Button
            key={day}
            variant={selectedDay === index + 1 ? "default" : "outline"}
            className={`${selectedDay === index + 1 ? "bg-traveling-purple text-white" : "bg-white"}`}
            onClick={() => setSelectedDay(index + 1)}
          >
            {index + 1}일차
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
                이 날의 일정이 비어있습니다. Step 2에서 장소를 추가해주세요.
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
        <Button
          className="bg-traveling-purple"
          onClick={handleSavePlan}
          disabled={isSaveDisabled}
        >
          여행 일정 저장하기
        </Button>
      </div>

      <FlightModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
      />
    </div>
  );
}

export default ItineraryGeneration;