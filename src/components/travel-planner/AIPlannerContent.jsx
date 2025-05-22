// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../../modules/Card";
// import { Button } from "../../modules/Button";
// import { Textarea } from "../../modules/Textarea";
// import { Slider } from "../../modules/Slider";

// export function AIPlannerContent({ destination }) {
//   const [preferences, setPreferences] = useState("");
//   const [budget, setBudget] = useState([50]);
//   const [pace, setPace] = useState([50]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const navigate = useNavigate();

//   const cityData = {
//     osaka: { name: "오사카", nameEn: "OSAKA", country: "일본" },
//     tokyo: { name: "도쿄", nameEn: "TOKYO", country: "일본" },
//     fukuoka: { name: "후쿠오카", nameEn: "FUKUOKA", country: "일본" },
//     paris: { name: "파리", nameEn: "PARIS", country: "프랑스" },
//     rome: { name: "로마", nameEn: "ROME", country: "이탈리아" },
//     venice: { name: "베니스", nameEn: "VENICE", country: "이탈리아" },
//     bangkok: { name: "방콕", nameEn: "BANGKOK", country: "태국" },
//     singapore: { name: "싱가포르", nameEn: "SINGAPORE", country: "싱가포르" },
//   };

//   const cleanedDestination = destination?.toLowerCase().trim();
//   const city = cityData[cleanedDestination] || cityData.osaka;

//   const handleGenerateItinerary = async () => {
//     setIsGenerating(true);
//     try {
//       const startDate = localStorage.getItem("startDate");
//       const endDate = localStorage.getItem("endDate");
//       const jwtToken = localStorage.getItem("jwtToken");

//       if (!startDate || !endDate) {
//         throw new Error("출발 날짜 또는 종료 날짜가 설정되지 않았습니다.");
//       }
//       if (!jwtToken) {
//         throw new Error("로그인이 필요합니다. JWT 토큰이 없습니다.");
//       }

//       const requestData = {
//         destination: cleanedDestination,
//         preferences,
//         budget: budget[0],
//         pace: pace[0],
//         start_date: startDate,
//         end_date: endDate,
//       };
//       console.log("Request Data:", requestData);

//       const response = await fetch("http://localhost:8080/api/aiplan/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${jwtToken}`,
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`일정 생성에 실패했습니다: ${errorData.message || response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("Response Data:", data);
//       setIsGenerating(false);

//       navigate(`/travel-planner/${cleanedDestination}/step5?ai=true`, {
//         state: { itinerary: data.itinerary, destination: cleanedDestination },
//       });
//     } catch (error) {
//       console.error("일정 생성 오류:", error);
//       setIsGenerating(false);
//       alert(`일정 생성 중 오류가 발생했습니다: ${error.message}`);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card className="bg-white p-6 shadow-md">
//         <div className="mb-6">
//           <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
//             AI 추천 {city.name} 여행 일정 만들기
//           </h2>
//           <p className="text-center text-sm text-traveling-text/70">
//             여행 선호도를 입력하면 AI가 최적의 여행 일정을 추천해드립니다.
//           </p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-2">
//           <div>
//             <div className="mb-6">
//               <h3 className="mb-2 text-lg font-medium text-traveling-text">여행 선호도</h3>
//               <Textarea
//                 placeholder="예: 역사 유적지를 좋아하고, 자연 경관을 즐깁니다."
//                 className="min-h-[150px] bg-traveling-background border-traveling-text/30"
//                 value={preferences}
//                 onChange={(e) => setPreferences(e.target.value)}
//               />
//             </div>

//             <div className="mb-6">
//               <h3 className="mb-2 text-lg font-medium text-traveling-text">예산 수준</h3>
//               <div className="px-2">
//                 <Slider value={budget} onValueChange={setBudget} max={100} step={1} className="mb-2" />
//                 <div className="flex justify-between text-sm text-traveling-text/70">
//                   <span>저예산</span>
//                   <span>중간</span>
//                   <span>고예산</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="mb-2 text-lg font-medium text-traveling-text">여행 페이스</h3>
//               <div className="px-2">
//                 <Slider value={pace} onValueChange={setPace} max={100} step={1} className="mb-2" />
//                 <div className="flex justify-between text-sm text-traveling-text/70">
//                   <span>여유롭게</span>
//                   <span>균형있게</span>
//                   <span>바쁘게</span>
//                 </div>
//               </div>
//             </div>

//             <Button
//               className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90"
//               onClick={handleGenerateItinerary}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "일정 생성 중..." : "AI 일정 생성하기"}
//             </Button>
//           </div>

//           <div className="rounded-lg bg-traveling-background/30 p-6">
//             <h3 className="mb-4 text-lg font-medium text-traveling-text">AI 추천 일정 예시</h3>
//             <div className="space-y-4">
//               {[1, 2, 3].map((day) => (
//                 <div key={day} className="rounded-lg bg-white p-4 shadow-sm">
//                   <h4 className="font-medium text-traveling-purple">{day}일차</h4>
//                   <ul className="mt-2 space-y-2 text-sm">
//                     {day === 1 && (
//                       <>
//                         <li>• 오전: 도착 및 호텔 체크인</li>
//                         <li>• 점심: 현지 유명 레스토랑</li>
//                         <li>• 오후: 주요 관광지 방문</li>
//                         <li>• 저녁: 현지 야시장 탐방</li>
//                       </>
//                     )}
//                     {day === 2 && (
//                       <>
//                         <li>• 오전: 역사 유적지 탐방</li>
//                         <li>• 점심: 현지 전통 음식 체험</li>
//                         <li>• 오후: 쇼핑 및 휴식</li>
//                         <li>• 저녁: 현지 문화 공연 관람</li>
//                       </>
//                     )}
//                     {day === 3 && (
//                       <>
//                         <li>• 오전: 자연 경관 탐방</li>
//                         <li>• 점심: 피크닉</li>
//                         <li>• 오후: 현지 체험 활동</li>
//                         <li>• 저녁: 특별한 저녁 식사</li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//             <p className="mt-4 text-xs text-traveling-text/70">
//               * 위 일정은 예시이며, 실제 생성되는 일정은 입력한 선호도에 따라 달라집니다.
//             </p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }


import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Card } from "../../modules/Card";
import { Button } from "../../modules/Button";
import { Textarea } from "../../modules/Textarea";
import { Slider } from "../../modules/Slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";

export function AIPlannerContent({ destination }) {
  const [preferences, setPreferences] = useState("");
  const [budget, setBudget] = useState([50]);
  const [pace, setPace] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const { destination: paramDestination } = useParams();

  const cityData = {
    osaka: { name: "오사카", nameEn: "OSAKA", country: "일본" },
    tokyo: { name: "도쿄", nameEn: "TOKYO", country: "일본" },
    fukuoka: { name: "후쿠오카", nameEn: "FUKUOKA", country: "일본" },
    paris: { name: "파리", nameEn: "PARIS", country: "프랑스" },
    rome: { name: "로마", nameEn: "ROME", country: "이탈리아" },
    venice: { name: "베니스", nameEn: "VENICE", country: "이탈리아" },
    bangkok: { name: "방콕", nameEn: "BANGKOK", country: "태국" },
    singapore: { name: "싱가포르", nameEn: "SINGAPORE", country: "싱가포르" },
  };

  const cleanedDestination = (paramDestination || destination)?.toLowerCase().trim() || "osaka";
  const city = cityData[cleanedDestination] || cityData.osaka;

  useEffect(() => {
    const travelPlan = JSON.parse(localStorage.getItem("travelPlan") || "{}");
    const storedStartDate = travelPlan.startDate || localStorage.getItem("startDate");
    const storedEndDate = travelPlan.endDate || localStorage.getItem("endDate");
    console.log("Stored travelPlan:", travelPlan);
    console.log("Stored dates:", { storedStartDate, storedEndDate });

    if (storedStartDate && storedEndDate) {
      setStartDate(storedStartDate);
      setEndDate(storedEndDate);
    } else {
      console.warn("No travel dates found in localStorage.");
      toast.warn("여행 날짜가 설정되지 않았습니다. Step 1로 이동합니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate(`/travel-planner/${cleanedDestination}/step1`);
    }
  }, [cleanedDestination, navigate]);

  const handleGenerateItinerary = async () => {
    console.log("handleGenerateItinerary called with:", {
      startDate,
      endDate,
      cleanedDestination,
      preferences,
      budget,
      pace,
    });
    setIsGenerating(true);

    try {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId") || "default_user";

      if (!startDate || !endDate) {
        throw new Error("출발 날짜 또는 종료 날짜가 설정되지 않았습니다.");
      }
      if (!cleanedDestination) {
        throw new Error("목적지가 설정되지 않았습니다.");
      }
      if (!accessToken) {
        navigate("/login");
        throw new Error("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      }

      const requestData = {
        destination: cleanedDestination,
        preferences: preferences || "일반적인 관광",
        budget: budget[0],
        pace: pace[0],
        start_date: startDate,
        end_date: endDate,
        planType: "AI",
        userId: userId,
      };
      console.log("Sending request to /api/aiplan/generate:", JSON.stringify(requestData, null, 2));

      const response = await axiosInstance.post("/api/aiplan/generate", requestData);

      console.log("Received response from /api/aiplan/generate:", JSON.stringify(response.data, null, 2));

      const aiItinerary = response.data.itinerary || [];
      if (!aiItinerary.length) {
        throw new Error("AI 일정 데이터가 비어 있습니다.");
      }

      localStorage.setItem("aiItinerary", JSON.stringify(aiItinerary));
      console.log("aiItinerary saved to localStorage:", aiItinerary);

      // travelPlan 업데이트
      const travelPlan = JSON.parse(localStorage.getItem("travelPlan") || "{}");
      const updatedTravelPlan = {
        ...travelPlan,
        destination: cleanedDestination,
        startDate,
        endDate,
        plannerType: "ai",
      };
      localStorage.setItem("travelPlan", JSON.stringify(updatedTravelPlan));
      console.log("Updated travelPlan in localStorage:", updatedTravelPlan);

      setIsGenerating(false);
      navigate(`/travel-planner/${cleanedDestination}/step5`, {
        state: {
          itinerary: aiItinerary,
          destination: cleanedDestination,
          startDate,
          endDate,
          plannerType: "ai",
        },
      });
    } catch (error) {
      console.error("일정 생성 오류:", error.message, error.stack);
      setIsGenerating(false);
      const errorMessage = error.response?.data?.message || error.message || "일정 생성에 실패했습니다.";
      toast.error(`일정 생성 중 오류: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
            AI 추천 {city.name} 여행 일정 만들기
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            여행 선호도를 입력하면 AI가 최적의 여행 일정을 추천해드립니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-traveling-text">여행 선호도</h3>
              <Textarea
                placeholder="예: 역사 유적지를 좋아하고, 자연 경관을 즐깁니다."
                className="min-h-[150px] bg-traveling-background border-traveling-text/30"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-traveling-text">예산 수준</h3>
              <div className="px-2">
                <Slider value={budget} onValueChange={setBudget} max={100} step={1} className="mb-2" />
                <div className="flex justify-between text-sm text-traveling-text/70">
                  <span>저예산</span>
                  <span>중간</span>
                  <span>고예산</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-traveling-text">여행 페이스</h3>
              <div className="px-2">
                <Slider value={pace} onValueChange={setPace} max={100} step={1} className="mb-2" />
                <div className="flex justify-between text-sm text-traveling-text/70">
                  <span>여유롭게</span>
                  <span>균형있게</span>
                  <span>바쁘게</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90"
              onClick={handleGenerateItinerary}
              disabled={isGenerating || !startDate || !endDate || !cleanedDestination}
            >
              {isGenerating ? "일정 생성 중..." : "AI 일정 생성하기"}
            </Button>
          </div>

          <div className="rounded-lg bg-traveling-background/30 p-6">
            <h3 className="mb-4 text-lg font-medium text-traveling-text">AI 추천 일정 예시</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((day) => (
                <div key={day} className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="font-medium text-traveling-purple">{day}일차</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    {day === 1 && (
                      <>
                        <li>• 오전: 도착 및 호텔 체크인</li>
                        <li>• 점심: 현지 유명 레스토랑</li>
                        <li>• 오후: 주요 관광지 방문</li>
                        <li>• 저녁: 현지 야시장 탐방</li>
                      </>
                    )}
                    {day === 2 && (
                      <>
                        <li>• 오전: 역사 유적지 탐방</li>
                        <li>• 점심: 현지 전통 음식 체험</li>
                        <li>• 오후: 쇼핑 및 휴식</li>
                        <li>• 저녁: 현지 문화 공연 관람</li>
                      </>
                    )}
                    {day === 3 && (
                      <>
                        <li>• 오전: 자연 경관 탐방</li>
                        <li>• 점심: 피크닉</li>
                        <li>• 오후: 현지 체험 활동</li>
                        <li>• 저녁: 특별한 저녁 식사</li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-traveling-text/70">
              * 위 일정은 예시이며, 실제 생성되는 일정은 입력한 선호도에 따라 달라집니다.
            </p>
          </div>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
}