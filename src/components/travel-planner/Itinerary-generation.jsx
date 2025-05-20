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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getFromLocalStorage } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const attractionData = {
  'eiffel-tower': {
    name: 'Eiffel Tower',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    category: 'Landmark',
    description: 'Iconic iron lattice tower on the Champ de Mars in Paris.',
    latitude: 48.8584,
    longitude: 2.2945,
    time: '10:00'
  },
  'arc-de-triomphe': {
    name: 'Arc de Triomphe',
    address: 'Place Charles de Gaulle, 75008 Paris, France',
    category: 'Monument',
    description: 'Monumental archway in Paris honoring victories of Napoleon.',
    latitude: 48.8738,
    longitude: 2.2950,
    time: '14:00'
  },
  'notre-dame': {
    name: 'Notre-Dame Cathedral',
    address: '6 Parvis Notre-Dame, 75004 Paris, France',
    category: 'Cathedral',
    description: 'Historic Catholic cathedral known for its French Gothic architecture.',
    latitude: 48.8530,
    longitude: 2.3499,
    time: '09:00'
  },
  'louvre-museum': {
    name: 'Louvre Museum',
    address: '75001 Paris, France',
    category: 'Museum',
    description: 'World’s largest art museum and a historic monument in Paris.',
    latitude: 48.8606,
    longitude: 2.3376,
    time: '11:00'
  },
  'shibuya-crossing': {
    name: 'Shibuya Crossing',
    address: 'Shibuya, Tokyo, Japan',
    category: 'Landmark',
    description: 'Famous pedestrian crossing in Tokyo.',
    latitude: 35.6595,
    longitude: 139.7005,
    time: '10:00'
  },
  'tokyo-tower': {
    name: 'Tokyo Tower',
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan',
    category: 'Monument',
    description: 'Iconic observation and communications tower.',
    latitude: 35.6586,
    longitude: 139.7454,
    time: '14:00'
  },
  'senso-ji': {
    name: 'Senso-ji Temple',
    address: '2 Chome-3-1 Asakusa, Taito City, Tokyo, Japan',
    category: 'Temple',
    description: 'Tokyo’s oldest temple and a popular tourist attraction.',
    latitude: 35.7148,
    longitude: 139.7967,
    time: '09:00'
  }
};

const hotelData = {
  'hotel1': {
    name: 'Hotel Paris',
    address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    description: 'Luxury hotel in the heart of Paris.',
    latitude: 48.8709,
    longitude: 2.3077,
    checkInDate: '2025-05-24T14:00:00',
    checkOutDate: '2025-05-26T12:00:00'
  },
  'tokyo-hotel1': {
    name: 'Hotel Tokyo',
    address: '1 Chome-1-1 Marunouchi, Chiyoda City, Tokyo, Japan',
    description: 'Luxury hotel in the heart of Tokyo.',
    latitude: 35.6812,
    longitude: 139.7656,
    checkInDate: '2025-05-22T14:00:00',
    checkOutDate: '2025-05-24T12:00:00'
  }
};

function ItineraryGeneration({ isAiMode: propIsAiMode = false }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isInitialized = useRef(false);
  const [itinerary, setItinerary] = useState({});

  // location.state 또는 localStorage에서 데이터 가져오기
  const { itinerary: stateItinerary, destination: stateDestination, startDate: stateStartDate, endDate: stateEndDate, plannerType: statePlannerType } = location.state || {};
  const travelPlan = getFromLocalStorage("travelPlan") || {};
  const { selectedAttractions, selectedHotels, selectedTransportation, customAttractions = [] } = travelPlan;

  // destination, startDate, endDate, plannerType 설정
  const destination = stateDestination || travelPlan.destination || "rome";
  const startDate = stateStartDate || travelPlan.startDate;
  const endDate = stateEndDate || travelPlan.endDate;
  const plannerType = statePlannerType || travelPlan.plannerType || "manual";
  // isAiMode를 plannerType에 따라 명확히 설정
  const isAiMode = plannerType === "ai";
  console.log("isAiMode:", isAiMode, "plannerType:", plannerType);

  const generateDayKeys = (start, end) => {
    if (!start || !end) {
      console.warn("startDate or endDate is missing");
      return [];
    }
    const days = differenceInCalendarDays(new Date(end), new Date(start)) + 1;
    return Array.from({ length: days }, (_, i) =>
      format(new Date(new Date(start).setDate(new Date(start).getDate() + i)), "yyyy-MM-dd")
    );
  };

  const dayKeys = generateDayKeys(startDate, endDate);

  const cityNames = {
    bangkok: "방콕",
    fukuoka: "후쿠오카",
    jeju: "제주",
    osaka: "오사카",
    paris: "파리",
    rome: "로마",
    singapore: "싱가포르",
    tokyo: "도쿄",
    venice: "베니스",
  };

  const cityCoords = {
    bangkok: { lat: 13.7563, lng: 100.5018 },
    fukuoka: { lat: 33.5902, lng: 130.4017 },
    jeju: { lat: 33.4890, lng: 126.4983 },
    osaka: { lat: 34.6937, lng: 135.5023 },
    paris: { lat: 48.8566, lng: 2.3522 },
    rome: { lat: 41.9028, lng: 12.4964 },
    singapore: { lat: 1.3521, lng: 103.8198 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    venice: { lat: 45.4408, lng: 12.3155 },
  };

  const countryMap = {
    bangkok: "태국",
    fukuoka: "일본",
    jeju: "한국",
    osaka: "일본",
    paris: "프랑스",
    rome: "이탈리아",
    singapore: "싱가포르",
    tokyo: "일본",
    venice: "이탈리아",
  };

  const mapCenter = cityCoords[destination?.toLowerCase()] || { lat: 0, lng: 0 };

  const attractionsData = {
    bangkok: {
      attractions: [
        {
          id: "grand-palace",
          name: "왕궁",
          position: { lat: 13.75, lng: 100.4914 },
          description: "방콕의 대표적인 왕궁",
          address: "Na Phra Lan Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand",
        },
        {
          id: "wat-arun",
          name: "왓 아룬",
          position: { lat: 13.7437, lng: 100.4888 },
          description: "아름다운 사원",
          address: "158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok 10600, Thailand",
        },
        {
          id: "chatuchak-market",
          name: "차투착 주말 시장",
          position: { lat: 13.7999, lng: 100.5502 },
          description: "활기찬 주말 시장",
          address: "Kamphaeng Phet 2 Rd, Chatuchak, Bangkok 10900, Thailand",
        },
        {
          id: "wat-pho",
          name: "왓 포",
          position: { lat: 13.7465, lng: 100.493 },
          description: "거대한 와불상이 있는 사원",
          address: "2 Sanam Chai Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand",
        },
        {
          id: "khao-san-road",
          name: "카오산 로드",
          position: { lat: 13.7582, lng: 100.4971 },
          description: "배낭여행자의 거리",
          address: "Khao San Road, Talat Yot, Phra Nakhon, Bangkok 10200, Thailand",
        },
      ],
    },
    fukuoka: {
      attractions: [
        {
          id: "canal-city",
          name: "캐널시티 하카타",
          position: { lat: 33.5898, lng: 130.4108 },
          description: "대형 쇼핑몰",
          address: "1 Chome-2 Sumiyoshi, Hakata Ward, Fukuoka, 812-0018",
        },
        {
          id: "ohori-park",
          name: "오호리 공원",
          position: { lat: 33.5861, lng: 130.3797 },
          description: "평화로운 공원",
          address: "1 Chome-2 Ohorikoen, Chuo Ward, Fukuoka, 810-0051",
        },
        {
          id: "fukuoka-tower",
          name: "후쿠오카 타워",
          position: { lat: 33.5944, lng: 130.3514 },
          description: "후쿠오카의 랜드마크",
          address: "2 Chome-3-26 Momochihama, Sawara Ward, Fukuoka, 814-0001",
        },
        {
          id: "dazaifu",
          name: "다자이후 텐만구",
          position: { lat: 33.5196, lng: 130.5354 },
          description: "학문의 신을 모시는 신사",
          address: "4 Chome-7-1 Saifu, Dazaifu, Fukuoka 818-0117",
        },
        {
          id: "nakasu",
          name: "나카스",
          position: { lat: 33.5938, lng: 130.4043 },
          description: "야간 유흥의 중심지",
          address: "Nakasu, Hakata Ward, Fukuoka, 810-0801",
        },
      ],
    },
    jeju: {
      attractions: [
        {
          id: "hallasan",
          name: "한라산",
          position: { lat: 33.3617, lng: 126.5292 },
          description: "제주의 대표적인 산",
          address: "Hallasan National Park, Jeju Island, South Korea",
        },
        {
          id: "seongsan",
          name: "성산일출봉",
          position: { lat: 33.4581, lng: 126.9425 },
          description: "아름다운 일출 명소",
          address: "Seongsan Ilchulbong, Seogwipo, Jeju, South Korea",
        },
        {
          id: "udo",
          name: "우도",
          position: { lat: 33.5050, lng: 126.9540 },
          description: "작고 아름다운 섬",
          address: "Udo Island, Jeju, South Korea",
        },
        {
          id: "manjanggul",
          name: "만장굴",
          position: { lat: 33.5283, lng: 126.7716 },
          description: "화산 동굴 탐험",
          address: "Manjanggul Cave, Jeju, South Korea",
        },
        {
          id: "jeju-folk-village",
          name: "제주 민속촌",
          position: { lat: 33.3227, lng: 126.8418 },
          description: "제주의 전통 문화를 체험",
          address: "Jeju Folk Village, Seogwipo, Jeju, South Korea",
        },
      ],
    },
    osaka: {
      attractions: [
        {
          id: "dotonbori",
          name: "도톤보리",
          position: { lat: 34.6687, lng: 135.5031 },
          description: "오사카의 활기찬 먹거리 거리",
          address: "Dotonbori, Chuo Ward, Osaka, 542-0071",
        },
        {
          id: "osaka-castle",
          name: "오사카 성",
          position: { lat: 34.6873, lng: 135.5262 },
          description: "역사적인 성곽",
          address: "1-1 Osakajo, Chuo Ward, Osaka, 540-0002",
        },
        {
          id: "universal-studios",
          name: "유니버설 스튜디오 재팬",
          position: { lat: 34.6654, lng: 135.4323 },
          description: "인기 있는 테마파크",
          address: "2-chome-1-33 Sakurajima, Konohana Ward, Osaka, 554-0031",
        },
        {
          id: "umeda-wheel",
          name: "우메다 공중정원",
          position: { lat: 34.7052, lng: 135.4957 },
          description: "오사카의 전경을 볼 수 있는 전망대",
          address: "Japan, 〒531-6039 Osaka, Kita Ward, Oyodonaka, 1 Chome−1−88",
        },
        {
          id: "namba",
          name: "난바",
          position: { lat: 34.6659, lng: 135.5013 },
          description: "쇼핑과 엔터테인먼트의 중심지",
          address: "Namba, Chuo Ward, Osaka, 542-0076",
        },
      ],
    },
    paris: {
      attractions: [
        {
          id: "eiffel-tower",
          name: "에펠탑",
          position: { lat: 48.8584, lng: 2.2945 },
          description: "파리의 상징",
          address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        },
        {
          id: "louvre-museum",
          name: "루브르 박물관",
          position: { lat: 48.8606, lng: 2.3376 },
          description: "세계적인 박물관",
          address: "Rue de Rivoli, 75001 Paris, France",
        },
        {
          id: "notre-dame",
          name: "노트르담 대성당",
          position: { lat: 48.853, lng: 2.3499 },
          description: "고딕 양식의 대성당",
          address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
        },
        {
          id: "arc-de-triomphe",
          name: "개선문",
          position: { lat: 48.8738, lng: 2.295 },
          description: "나폴레옹의 승리를 기념",
          address: "Place Charles de Gaulle, 75008 Paris, France",
        },
        {
          id: "montmartre",
          name: "몽마르트",
          position: { lat: 48.8867, lng: 2.3431 },
          description: "예술가의 동네",
          address: "Montmartre, 75018 Paris, France",
        },
      ],
    },
    rome: {
      attractions: [
        {
          id: "colosseum",
          name: "콜로세움",
          position: { lat: 41.8902, lng: 12.4922 },
          description: "고대 로마의 원형 경기장",
          address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
        },
        {
          id: "vatican-museums",
          name: "바티칸 박물관",
          position: { lat: 41.9065, lng: 12.4534 },
          description: "시스티나 성당 포함",
          address: "Viale Vaticano, 00165 Roma RM, Italy",
        },
        {
          id: "trevi-fountain",
          name: "트레비 분수",
          position: { lat: 41.9009, lng: 12.4833 },
          description: "동전 to throw your coin and make a wish",
          address: "Piazza di Trevi, 00187 Roma RM, Italy",
        },
        {
          id: "pantheon",
          name: "판테온",
          position: { lat: 41.8986, lng: 12.4769 },
          description: "로마의 역사적인 건축물",
          address: "Piazza della Rotonda, 00186 Roma RM, Italy",
        },
        {
          id: "roman-forum",
          name: "로마 포럼",
          position: { lat: 41.8925, lng: 12.4853 },
          description: "고대 로마의 중심지",
          address: "Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy",
        },
      ],
    },
    singapore: {
      attractions: [
        {
          id: "marina-bay-sands",
          name: "마리나 베이 샌즈",
          position: { lat: 1.2834, lng: 103.8607 },
          description: "럭셔리 호텔과 전망대",
          address: "10 Bayfront Avenue, Singapore 018956",
        },
        {
          id: "gardens-by-the-bay",
          name: "가든스 바이 더 베이",
          position: { lat: 1.2815, lng: 103.8636 },
          description: "미래적인 정원",
          address: "18 Marina Gardens Drive, Singapore 018953",
        },
        {
          id: "sentosa-island",
          name: "센토사 섬",
          position: { lat: 1.2494, lng: 103.8303 },
          description: "해변과 놀이공원",
          address: "Sentosa Island, Singapore",
        },
        {
          id: "universal-studios",
          name: "유니버설 스튜디오 싱가포르",
          position: { lat: 1.254, lng: 103.8238 },
          description: "테마파크",
          address: "8 Sentosa Gateway, Singapore 098269",
        },
        {
          id: "merlion-park",
          name: "머라이언 파크",
          position: { lat: 1.2868, lng: 103.8545 },
          description: "싱가포르의 상징",
          address: "1 Fullerton Road, Singapore 049213",
        },
      ],
    },
    tokyo: {
      attractions: [
        {
          id: "tokyo-tower",
          name: "도쿄 타워",
          position: { lat: 35.6586, lng: 139.7454 },
          description: "도쿄의 랜드마크",
          address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011",
        },
        {
          id: "shibuya-crossing",
          name: "시부야 스크램블 교차로",
          position: { lat: 35.6595, lng: 139.7004 },
          description: "세계적으로 유명한 교차로",
          address: "2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043",
        },
        {
          id: "meiji-shrine",
          name: "메이지 신궁",
          position: { lat: 35.6763, lng: 139.6993 },
          description: "평화로운 신사",
          address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557",
        },
        {
          id: "senso-ji",
          name: "센소지 사원",
          position: { lat: 35.7147, lng: 139.7966 },
          description: "도쿄의 오래된 사원",
          address: "2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032",
        },
        {
          id: "tokyo-skytree",
          name: "도쿄 스카이트리",
          position: { lat: 35.7101, lng: 139.8107 },
          description: "세계에서 가장 높은 타워",
          address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045",
        },
      ],
    },
    venice: {
      attractions: [
        {
          id: "st-marks-square",
          name: "산 마르코 광장",
          position: { lat: 45.4341, lng: 12.3388 },
          description: "베니스의 중심 광장",
          address: "Piazza San Marco, 30100 Venezia VE, Italy",
        },
        {
          id: "rialto-bridge",
          name: "리알토 다리",
          position: { lat: 45.4381, lng: 12.3358 },
          description: "대운하 위의 유명한 다리",
          address: "Sestiere San Polo, 30125 Venezia VE, Italy",
        },
        {
          id: "doges-palace",
          name: "도지의 궁전",
          position: { lat: 45.4337, lng: 12.3401 },
          description: "베니스의 역사적인 궁전",
          address: "P.za San Marco, 1, 30124 Venezia VE, Italy",
        },
        {
          id: "grand-canal",
          name: "대운하",
          position: { lat: 45.4408, lng: 12.3325 },
          description: "베니스의 주요 운하",
          address: "Grand Canal, Venice, Italy",
        },
        {
          id: "burano",
          name: "부라노 섬",
          position: { lat: 45.4853, lng: 12.4167 },
          description: "화려한 색상의 섬",
          address: "Burano, 30142 Venice, Italy",
        },
      ],
    },
  };

  const hotelsData = {
    bangkok: [
      { id: "hotel1", name: "방콕 호텔 A", position: { lat: 13.756, lng: 100.502 } },
      { id: "hotel2", name: "방콕 호텔 B", position: { lat: 13.757, lng: 100.503 } },
    ],
    fukuoka: [
      { id: "hotel1", name: "후쿠오카 호텔 A", position: { lat: 33.59, lng: 130.402 } },
      { id: "hotel2", name: "후쿠오카 호텔 B", position: { lat: 33.591, lng: 130.403 } },
    ],
    jeju: [
      { id: "hotel1", name: "제주 호텔 A", position: { lat: 33.4895, lng: 126.4985 } },
      { id: "hotel2", name: "제주 호텔 B", position: { lat: 33.4900, lng: 126.4990 } },
    ],
    osaka: [
      { id: "hotel1", name: "오사카 호텔 A", position: { lat: 34.694, lng: 135.503 } },
      { id: "hotel2", name: "오사카 호텔 B", position: { lat: 34.695, lng: 135.504 } },
    ],
    paris: [
      { id: "hotel1", name: "파리 호텔 A", position: { lat: 48.857, lng: 2.353 } },
      { id: "hotel2", name: "파리 호텔 B", position: { lat: 48.858, lng: 2.354 } },
    ],
    rome: [
      { id: "hotel1", name: "로마 호텔 A", position: { lat: 41.903, lng: 12.497 } },
      { id: "hotel2", name: "로마 호텔 B", position: { lat: 41.904, lng: 12.498 } },
    ],
    singapore: [
      { id: "hotel1", name: "싱가포르 호텔 A", position: { lat: 1.353, lng: 103.82 } },
      { id: "hotel2", name: "싱가포르 호텔 B", position: { lat: 1.354, lng: 103.821 } },
    ],
    tokyo: [
      { id: "tokyo-hotel1", name: "도쿄 호텔 A", position: { lat: 35.677, lng: 139.651 } },
      { id: "hotel2", name: "도쿄 호텔 B", position: { lat: 35.678, lng: 139.652 } },
    ],
    venice: [
      { id: "hotel1", name: "베니스 호텔 A", position: { lat: 45.441, lng: 12.316 } },
      { id: "hotel2", name: "베니스 호텔 B", position: { lat: 45.442, lng: 12.317 } },
    ],
  };

  useEffect(() => {
    console.log("Itinerary-generation useEffect:", { startDate, endDate, destination, isAiMode, plannerType, selectedAttractions, selectedHotels, selectedTransportation });

    // 입력값 유효성 검사
    if (!destination || !startDate || !endDate) {
      console.error("Missing required data:", { destination, startDate, endDate });
      setErrorMessage("필수 정보(목적지 또는 날짜)가 누락되었습니다. Step 1부터 다시 시작해 주세요.");
      toast.error("필수 정보가 누락되었습니다.");
      navigate(`/travel-planner/${destination || 'rome'}/step1`);
      setIsLoading(false);
      return;
    }

    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;

    const initializeItinerary = async () => {
      setIsLoading(true);
      try {
        let newItinerary = {};

        if (isAiMode) {
          // localStorage에서 aiItinerary 확인
          const aiItinerary = stateItinerary || JSON.parse(localStorage.getItem("aiItinerary") || "[]");
          console.log("Retrieved aiItinerary from localStorage:", aiItinerary);

          if (aiItinerary.length > 0) {
            // aiItinerary를 사용하여 일정 구성
            aiItinerary.forEach((dayData, index) => {
              const date = dayKeys[index];
              if (!date) return;

              newItinerary[date] = [
                // 호텔 추가 (기본값)
                {
                  id: selectedHotels?.[`day${index + 1}`] || "hotel1",
                  time: "14:00",
                  type: "hotel",
                  name: hotelData[selectedHotels?.[`day${index + 1}`]]?.name || "로마 호텔 A",
                  address: hotelData[selectedHotels?.[`day${index + 1}`]]?.address || "로마 호텔 주소",
                  description: hotelData[selectedHotels?.[`day${index + 1}`]]?.description || "기본 호텔",
                  position: {
                    lat: hotelData[selectedHotels?.[`day${index + 1}`]]?.latitude || mapCenter.lat,
                    lng: hotelData[selectedHotels?.[`day${index + 1}`]]?.longitude || mapCenter.lng,
                  },
                },
                // 활동 추가
                ...dayData.activities.map((act, idx) => {
                  const attr = attractionsData[destination.toLowerCase()]?.attractions.find(
                    (a) => a.name === act.activity
                  ) || {
                    id: `${act.activity}-${index}-${idx}`,
                    name: act.activity,
                    address: act.address || "주소 정보 없음",
                    description: act.description || "활동에 대한 설명이 없습니다.",
                    position: mapCenter,
                  };
                  return {
                    id: attr.id,
                    time: act.time === "morning" ? "09:00" : act.time === "afternoon" ? "14:00" : act.time === "evening" ? "18:00" : act.time || "10:00",
                    type: "attraction",
                    name: attr.name,
                    address: attr.address,
                    description: attr.description,
                    position: attr.position,
                  };
                }),
                // 식사 추가
                {
                  id: `breakfast-${date}`,
                  time: "08:00",
                  type: "meal",
                  name: "호텔 조식",
                  address: "호텔 내",
                  description: "호텔에서 제공하는 아침 식사",
                  position: mapCenter,
                },
                {
                  id: `lunch-${date}`,
                  time: "12:00",
                  type: "meal",
                  name: "점심 식사",
                  address: "미정",
                  description: "현지 레스토랑에서 식사",
                  position: mapCenter,
                },
                {
                  id: `dinner-${date}`,
                  time: "18:00",
                  type: "meal",
                  name: "저녁 식사",
                  address: "미정",
                  description: "현지 레스토랑에서 식사",
                  position: mapCenter,
                },
              ];
            });
          } else {
            // localStorage에 aiItinerary가 없으면 서버 호출
            try {
              const response = await axiosInstance.get(`/api/travel-plans/ai/${destination.toLowerCase()}`, {
                params: {
                  start_date: startDate,
                  end_date: endDate,
                },
              });
              console.log("AI itinerary from server:", response.data);
              if (!response.data || response.data.length === 0) {
                throw new Error("AI 일정 데이터가 없습니다.");
              }
              newItinerary = response.data.reduce((acc, item) => {
                const date = item.date;
                if (!acc[date]) acc[date] = [];
                acc[date].push({
                  id: item.id,
                  time: item.time,
                  type: item.type,
                  name: item.name,
                  address: item.address,
                  description: item.description,
                  position: { lat: item.latitude, lng: item.longitude },
                });
                return acc;
              }, {});
            } catch (serverError) {
              console.error("Server API call failed:", serverError);
              throw new Error("AI 일정 데이터를 가져오지 못했습니다. 저장된 일정이 없습니다.");
            }
          }
        } else {
          // 수동 모드: selectedAttractions, selectedHotels, selectedTransportation 사용
          if (!selectedAttractions || !selectedHotels || !selectedTransportation) {
            throw new Error("선택된 명소, 숙소, 또는 교통 수단 데이터가 없습니다.");
          }

          dayKeys.forEach((date, index) => {
            const day = `day${index + 1}`;
            newItinerary[date] = [];

            // 호텔 추가
            const hotelId = selectedHotels[day];
            if (hotelId && hotelData[hotelId]) {
              newItinerary[date].push({
                id: hotelId,
                time: "14:00",
                type: "hotel",
                name: hotelData[hotelId].name,
                address: hotelData[hotelId].address,
                description: hotelData[hotelId].description,
                position: {
                  lat: hotelData[hotelId].latitude,
                  lng: hotelData[hotelId].longitude,
                },
              });
            }

            // 명소 추가
            const attractions = selectedAttractions[day] || [];
            attractions.forEach((attractionId) => {
              const attraction =
                attractionData[attractionId] ||
                attractionsData[destination.toLowerCase()]?.attractions.find(
                  (a) => a.id === attractionId
                ) ||
                customAttractions.find((a) => a.id === attractionId);
              if (attraction) {
                newItinerary[date].push({
                  id: attractionId,
                  time: attraction.time || "10:00",
                  type: "attraction",
                  name: attraction.name,
                  address: attraction.address,
                  description: attraction.description,
                  position: {
                    lat: attraction.latitude || attraction.position?.lat || mapCenter.lat,
                    lng: attraction.longitude || attraction.position?.lng || mapCenter.lng,
                  },
                });
              }
            });

            // 기본 식사 및 휴식 추가
            newItinerary[date].push(
              {
                id: `breakfast-${date}`,
                time: "08:00",
                type: "meal",
                name: "호텔 조식",
                address: "호텔 내",
                description: "호텔에서 제공하는 아침 식사",
                position: mapCenter,
              },
              {
                id: `lunch-${date}`,
                time: "12:00",
                type: "meal",
                name: "점심 식사",
                address: "미정",
                description: "현지 레스토랑에서 식사",
                position: mapCenter,
              },
              {
                id: `dinner-${date}`,
                time: "18:00",
                type: "meal",
                name: "저녁 식사",
                address: "미정",
                description: "현지 레스토랑에서 식사",
                position: mapCenter,
              }
            );
          });
        }

        console.log("Generated itinerary:", newItinerary);
        setItinerary(newItinerary);
      } catch (error) {
        console.error("일정 생성 실패:", error);
        setErrorMessage(
          isAiMode
            ? `AI 일정 생성에 실패했습니다: ${error.message}`
            : "수동 일정 생성에 실패했습니다. 선택된 데이터를 확인해주세요."
        );
        toast.error(
          isAiMode
            ? `AI 일정 생성에 실패했습니다: ${error.message}`
            : "수동 일정 생성에 실패했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeItinerary();
  }, [startDate, endDate, destination, isAiMode, plannerType, dayKeys, selectedAttractions, selectedHotels, selectedTransportation, customAttractions, navigate, stateItinerary]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    console.log('Saving itinerary:', { itinerary, plannerType, destination, startDate, endDate });

    try {
      if (isAiMode) {
        // AI 일정 저장
        const aiPlanRequest = {
          destination: destination.toLowerCase(),
          start_date: startDate,
          end_date: endDate,
          planType: "AI",
          itinerary: Object.keys(itinerary).map((date) => ({
            date,
            activities: itinerary[date].map((item) => ({
              id: item.id,
              time: item.time,
              type: item.type,
              name: item.name,
              address: item.address,
              description: item.description,
              latitude: item.position.lat,
              longitude: item.position.lng,
            })),
          })),
          userId: localStorage.getItem("userId") || "default_user",
        };
        console.log("Saving AI itinerary:", aiPlanRequest);
        const response = await axiosInstance.post("/api/aiplan/save", aiPlanRequest);
        console.log("AI itinerary saved:", response.data);
        toast.success("AI 일정이 저장되었습니다!");
        navigate("/mypage");
      } else {
        // 수동 일정 저장
        const places = [];
        const accommodations = [];
        const transportations = [];

        dayKeys.forEach((date, index) => {
          const dayKey = `day${index + 1}`;
          // 명소
          const attractions = selectedAttractions[dayKey] || [];
          attractions.forEach((attractionId) => {
            const attraction =
              attractionData[attractionId] ||
              attractionsData[destination.toLowerCase()]?.attractions.find(
                (a) => a.id === attractionId
              ) ||
              customAttractions.find((a) => a.id === attractionId);
            if (attraction) {
              places.push({
                name: attraction.name,
                address: attraction.address,
                day: (index + 1).toString(),
                category: attraction.category || "Attraction",
                description: attraction.description,
                latitude: attraction.latitude || attraction.position?.lat,
                longitude: attraction.longitude || attraction.position?.lng,
                time: attraction.time || "10:00",
              });
            }
          });

          // 숙소
          const hotelId = selectedHotels[dayKey];
          const hotel =
            hotelData[hotelId] ||
            hotelsData[destination.toLowerCase()]?.find((h) => h.id === hotelId);
          if (hotel) {
            accommodations.push({
              name: hotel.name,
              address: hotel.address,
              day: (index + 1).toString(),
              description: hotel.description || "Hotel",
              latitude: hotel.latitude || hotel.position?.lat,
              longitude: hotel.longitude || hotel.position?.lng,
              checkInDate: hotel.checkInDate || startDate + "T14:00:00",
              checkOutDate: hotel.checkOutDate || endDate + "T12:00:00",
            });
          }

          // 교통 수단
          if (selectedTransportation) {
            transportations.push({
              type: selectedTransportation,
              day: (index + 1).toString(),
            });
          }
        });

        const travelPlanRequest = {
          city: destination.toLowerCase(),
          country: countryMap[destination.toLowerCase()] || "알 수 없음",
          start_date: startDate,
          end_date: endDate,
          plan_type: "MY",
          places,
          accommodations,
          transportations,
          travelPlanId: localStorage.getItem("travelPlanId") || null,
          a_id: localStorage.getItem("accountId") || null,
        };

        console.log("Saving manual itinerary:", travelPlanRequest);
        const response = await axiosInstance.post("/api/travel-plans", travelPlanRequest);
        console.log("Manual itinerary saved:", response.data);
        toast.success("수동 일정이 저장되었습니다!");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("일정 저장 실패:", error);
      toast.error("일정 저장에 실패했습니다: " + (error.response?.data?.message || error.message));
    }
  };

  const handleFlightSelect = () => {
    setIsFlightModalOpen(true);
  };

  const handleDayChange = (dayIndex) => {
    setSelectedDay(dayIndex + 1);
  };

  const currentDayKey = dayKeys[selectedDay - 1];
  const currentItinerary = itinerary[currentDayKey] || [];
  const currentAttractions = currentItinerary.filter((item) => item.type === "attraction") || [];
  const currentHotel = currentItinerary.find((item) => item.type === "hotel") || {
    id: "hotel1",
    name: "호텔 정보 없음",
    position: mapCenter,
  };
  const currentMeals = currentItinerary.filter((item) => item.type === "meal") || [];

  const mapMarkers = [
    ...currentAttractions.map((attr, idx) => ({
      id: attr.id || `attr-${idx}`,
      position: attr.position || mapCenter,
      title: attr.name,
      selected: true,
    })),
    {
      id: currentHotel.id,
      position: currentHotel.position || mapCenter,
      title: currentHotel.name,
      selected: true,
    },
  ];

  if (isLoading) {
    return <div className="p-4 text-traveling-text">일정을 준비 중입니다...</div>;
  }

  if (errorMessage) {
    return (
      <div className="p-4 text-red-600">
        {errorMessage}
        <Button
          className="mt-4 bg-traveling-purple text-white hover:bg-traveling-purple/90"
          onClick={() => {
            setErrorMessage("");
            isInitialized.current = false;
          }}
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
            {cityNames[destination?.toLowerCase()] || "여행지"} 여행 일정
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            {startDate} ~ {endDate} ({dayKeys.length}일)
          </p>
        </div>

        <div className="sticky top-0 z-10 bg-white py-3 mb-4 border-b">
          <div className="flex space-x-2 overflow-x-auto">
            {dayKeys.map((day, idx) => (
              <Button
                key={day}
                onClick={() => handleDayChange(idx)}
                className={
                  selectedDay === idx + 1
                    ? "bg-traveling-purple text-white"
                    : "border border-traveling-text/30 text-traveling-text"
                }
              >
                {idx + 1}일차
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-traveling-text">{selectedDay}일차 일정</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEditToggle}
                    className="text-traveling-purple"
                  >
                    {isEditing ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "완료" : "편집"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Plane className="h-6 w-6 text-traveling-purple" />
                    <div>
                      <p className="font-medium text-traveling-text">
                        {selectedDay === 1 ? "왕복 항공편" : "항공편 없음"}
                      </p>
                      <p className="text-sm text-traveling-text/70">
                        {selectedDay === 1
                          ? "항공편을 선택하려면 아래 버튼을 클릭하세요"
                          : "추가 이동 없음"}
                      </p>
                      {selectedDay === 1 && (
                        <Button
                          size="sm"
                          className="mt-2 bg-traveling-purple text-white hover:bg-traveling-purple/90"
                          onClick={handleFlightSelect}
                        >
                          항공편 선택
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Hotel className="h-6 w-6 text-traveling-purple" />
                    <div>
                      <p className="font-medium text-traveling-text">{currentHotel.name}</p>
                      <p className="text-sm text-traveling-text/70">숙소 확인 완료</p>
                    </div>
                  </div>

                  {currentMeals.map((meal, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {meal.type === "meal" && meal.name.includes("아침") ? (
                        <Coffee className="h-6 w-6 text-traveling-purple" />
                      ) : (
                        <Utensils className="h-6 w-6 text-traveling-purple" />
                      )}
                      <div>
                        <p className="font-medium text-traveling-text">
                          {meal.time} {meal.name}
                        </p>
                        <p className="text-sm text-traveling-text/70">{meal.description}</p>
                      </div>
                    </div>
                  ))}

                  {currentAttractions.map((attr, idx) => (
                    <div key={attr.id || idx} className="flex items-start gap-3">
                      <Camera className="h-6 w-6 text-traveling-purple" />
                      <div>
                        <p className="font-medium text-traveling-text">{attr.name}</p>
                        <p className="text-sm text-traveling-text/70">{attr.description}</p>
                        <p className="text-sm text-traveling-text/70">{attr.address}</p>
                        {attr.time && (
                          <p className="text-sm text-traveling-text/70">시간: {attr.time}</p>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => {
                            setItinerary((prev) => ({
                              ...prev,
                              [currentDayKey]: prev[currentDayKey].filter(
                                (a) => a.id !== attr.id
                              ),
                            }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapComponent
              center={mapCenter}
              markers={mapMarkers}
              height="100%"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            className="border-traveling-purple text-traveling-purple hover:bg-traveling-purple/10"
            onClick={() => navigate(`/travel-planner/${destination}/step2`)}
          >
            이전 단계
          </Button>
          <Button
            className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
            onClick={handleSaveChanges}
            disabled={isEditing}
          >
            일정 저장
          </Button>
        </div>
      </Card>

      {isFlightModalOpen && (
        <FlightModal
          isOpen={isFlightModalOpen}
          onClose={() => setIsFlightModalOpen(false)}
          destination={destination}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
}

export default ItineraryGeneration;