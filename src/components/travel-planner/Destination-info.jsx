import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { ArrowRight, Calendar, Brain } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card } from "../../modules/Card";
import { saveToLocalStorage,getFromLocalStorage } from "../../utils";
import axiosInstance from "../../api/axiosInstance";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 도시별 데이터
const cityData = {
  bangkok: {
    name: "방콕",
    nameEn: "BANGKOK",
    country: "태국",
    countryEn: "Thailand",
    flag: "🇹🇭",
    description:
      "태국의 수도 방콕은 활기찬 거리 음식, 화려한 사원, 번화한 시장이 특징인 도시입니다. 전통과 현대가 공존하는 이 도시는 동남아시아에서 가장 인기 있는 관광지 중 하나입니다.",
    flightTime: "약 6시간",
    visa: "무비자(90일)",
    currency: "바트(THB)",
    voltage: "220V",
    adapter: "필요",
    image: "/images/destinations/bangkok.png",
    airport: "bkkt",
  },
  fukuoka: {
    name: "후쿠오카",
    nameEn: "FUKUOKA",
    country: "일본",
    countryEn: "Japan",
    flag: "🇯🇵",
    description:
      "일본 규슈 지방의 중심 도시인 후쿠오카는 맛있는 음식과 친절한 사람들로 유명합니다. 하카타 라멘과 모츠나베 같은 현지 요리를 즐기고, 아름다운 해변과 역사적인 사원을 방문해보세요.",
    flightTime: "약 1시간 30분",
    visa: "무비자",
    currency: "엔(JPY)",
    voltage: "110V",
    adapter: "없음",
    image: "/images/destinations/fukuoka.png",
    airport: "fuka",
  },
  jeju: {
    name: "제주",
    nameEn: "JEJU",
    country: "대한민국",
    countryEn: "South Korea",
    flag: "🇰🇷",
    description:
      "한국의 아름다운 섬 제주도는 화산 지형과 독특한 자연 경관으로 유명합니다. 성산일출봉, 한라산, 우도 등 다양한 자연 명소와 함께 제주 특유의 문화와 음식을 경험해보세요.",
    flightTime: "약 1시간",
    visa: "국내",
    currency: "원(KRW)",
    voltage: "220V",
    adapter: "없음",
    image: "/images/destinations/jeju.png",
    airport: "jeja",
  },
  osaka: {
    name: "오사카",
    nameEn: "OSAKA",
    country: "일본",
    countryEn: "Japan",
    flag: "🇯🇵",
    description:
      "일본의 미식과 역사의 중심지. 도톤보리의 눈부신 불빛 아래, 전통적인 타코야키의 오묘한 맛을 즐겨세요. 오사카성에서는 일본의 고대 역사를 체험할 수 있습니다. 유니버설 스튜디오 재팬에서는 화려한 어트랙션을 경험할 수 있으며, 신세계의 츠텐카쿠 타워에서는 도시의 전경을 한 눈에 볼 수 있습니다. 오사카에서는 끊임없는 먹거리 발견이 기다립니다.",
    flightTime: "약 2시간",
    visa: "무비자",
    currency: "엔(JPY)",
    voltage: "110V",
    adapter: "없음",
    image: "/images/destinations/osaka.jpg",
    airport: "osaa",
  },
  paris: {
    name: "파리",
    nameEn: "PARIS",
    country: "프랑스",
    countryEn: "France",
    flag: "🇫🇷",
    description:
      "프랑스의 수도 파리는 예술, 패션, 요리, 문화의 중심지로 알려져 있습니다. 에펠탑, 루브르 박물관, 노트르담 대성당 등 세계적으로 유명한 랜드마크들이 있는 로맨틱한 도시입니다.",
    flightTime: "약 12시간",
    visa: "무비자(90일)",
    currency: "유로(EUR)",
    voltage: "230V",
    adapter: "필요",
    image: "/images/destinations/paris.png",
    airport: "pari",
  },
  rome: {
    name: "로마",
    nameEn: "ROME",
    country: "이탈리아",
    countryEn: "Italy",
    flag: "🇮🇹",
    description:
      "이탈리아의 수도 로마는 '영원한 도시'라는 별명을 가진 역사적인 도시입니다. 콜로세움, 바티칸 시국, 트레비 분수 등 고대 로마 제국의 유적과 르네상스 시대의 예술 작품들이 도시 곳곳에 남아있습니다.",
    flightTime: "약 13시간",
    visa: "무비자(90일)",
    currency: "유로(EUR)",
    voltage: "230V",
    adapter: "필요",
    image: "/images/destinations/rome.png",
    airport: "rome",
  },
  singapore: {
    name: "싱가포르",
    nameEn: "SINGAPORE",
    country: "싱가포르",
    countryEn: "Singapore",
    flag: "🇸🇬",
    description:
      "동남아시아의 도시국가 싱가포르는 현대적인 건축물, 다양한 문화, 맛있는 음식으로 유명합니다. 마리나 베이 샌즈, 가든스 바이 더 베이, 센토사 섬 등 다양한 관광 명소를 갖추고 있습니다.",
    flightTime: "약 6시간 30분",
    visa: "무비자(90일)",
    currency: "싱가포르 달러(SGD)",
    voltage: "230V",
    adapter: "필요",
    image: "/images/destinations/singapore.png",
    airport: "sins",
  },
  tokyo: {
    name: "도쿄",
    nameEn: "TOKYO",
    country: "일본",
    countryEn: "Japan",
    flag: "🇯🇵",
    description:
      "일본의 수도이자 세계 최대 도시 중 하나인 도쿄는 현대적인 기술과 전통이 공존하는 매력적인 도시입니다. 화려한 네온사인의 번화가부터 고즈넉한 사원과 정원까지, 다양한 매력을 지닌 도시입니다.",
    flightTime: "약 2시간 30분",
    visa: "무비자",
    currency: "엔(JPY)",
    voltage: "110V",
    adapter: "없음",
    image: "/images/destinations/tokyo.png",
    airport: "tyoa",
  },
  venice: {
    name: "베니스",
    nameEn: "VENICE",
    country: "이탈리아",
    countryEn: "Italy",
    flag: "🇮🇹",
    description:
      "이탈리아 북동부에 위치한 베니스는 117개의 작은 섬으로 이루어진 수상 도시입니다. 곤돌라를 타고 운하를 따라 이동하며 산 마르코 광장, 리알토 다리 등 아름다운 건축물과 예술 작품을 감상할 수 있습니다.",
    flightTime: "약 13시간 30분",
    visa: "무비자(90일)",
    currency: "유로(EUR)",
    voltage: "230V",
    adapter: "필요",
    image: "/images/destinations/venice.png",
    airport: "veni",
  },
};

export function DestinationInfo({ destination }) {
  const [selectedDates, setSelectedDates] = useState(getFromLocalStorage("travelPlan")?.selectedDates || []);
  const [currentMonth, setCurrentMonth] = useState(4);
  const [currentYear, setCurrentYear] = useState(2025);
  const [plannerType, setPlannerType] = useState(getFromLocalStorage("travelPlan")?.plannerType || "manual");
  const [selectedAttractions, setSelectedAttractions] = useState(getFromLocalStorage("travelPlan")?.selectedAttractions || {});
  const [selectedHotels, setSelectedHotels] = useState(getFromLocalStorage("travelPlan")?.selectedHotels || {});
  const [selectedTransportation, setSelectedTransportation] = useState(
    getFromLocalStorage("travelPlan")?.selectedTransportation || "car"
  );

  const defaultCityKey = "osaka";
  const city = cityData[destination] ?? cityData[defaultCityKey];
  const navigate = useNavigate();

  // localStorage 동기화
  useEffect(() => {
    if (!city) return;

    const travelPlan = {
      destination: destination.toLowerCase(),
      selectedDates,
      startDate: selectedDates.length > 0 ? selectedDates[0] : null,
      endDate: selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : null,
      plannerType,
      selectedAttractions,
      selectedHotels,
      selectedTransportation,
    };
    console.log("Saving travelPlan to localStorage:", travelPlan);
    saveToLocalStorage("travelPlan", travelPlan);
  }, [selectedDates, plannerType, selectedAttractions, selectedHotels, selectedTransportation, destination, city]);

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, currentMonth: false, month: month - 1, year });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, currentMonth: true, month, year });
    }
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: i, currentMonth: false, month: month + 1, year: month === 11 ? year + 1 : year });
    }
    return days;
  };

  const days = generateCalendar(currentYear, currentMonth);
  const nextMonthDays = generateCalendar(currentMonth === 11 ? currentYear + 1 : currentYear, (currentMonth + 1) % 12);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const handleDateClick = (year, month, date) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    if (selectedDates.length === 0) {
      setSelectedDates([dateString]);
    } else if (selectedDates.length === 1) {
      const first = new Date(selectedDates[0]);
      const second = new Date(dateString);
      const start = first < second ? first : second;
      const end = first < second ? second : first;
      const range = [];
      const cur = new Date(start);
      while (cur <= end) {
        range.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
      }
      setSelectedDates(range);
    } else {
      setSelectedDates([dateString]);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDateRange = () => {
    if (selectedDates.length === 0) return "";
    const sorted = [...selectedDates].sort();
    const start = new Date(sorted[0]);
    const end = new Date(sorted[sorted.length - 1]);
    const format = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    return `${format(start)} - ${format(end)} (${sorted.length}일)`;
  };

  const handleNext = async () => {
    console.log('handleNext called with:', { selectedDates, plannerType, destination });

    // 입력 검증
    if (!destination) {
      toast.error('목적지를 선택해 주세요.');
      return;
    }
    if (!selectedDates || selectedDates.length === 0) {
      toast.error('여행 날짜를 선택해 주세요.');
      return;
    }

    const sorted = [...selectedDates].sort();
    const startDate = sorted[0];
    const endDate = sorted[sorted.length - 1];

    console.log('startDate:', startDate, 'endDate:', endDate);
    if (!startDate || !endDate) {
      toast.error('시작 날짜 또는 종료 날짜가 유효하지 않습니다.');
      return;
    }

    // 날짜 포맷 (YYYY-MM-DD)
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

    // travelPlan 객체 생성
    const travelPlan = {
      destination: destination.toLowerCase(),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      plannerType,
      selectedAttractions,
      selectedHotels,
      selectedTransportation,
    };

    // localStorage에 저장
    localStorage.setItem('travelPlan', JSON.stringify(travelPlan));
    localStorage.setItem('startDate', formattedStartDate);
    localStorage.setItem('endDate', formattedEndDate);
    localStorage.setItem('destination', destination);
    localStorage.setItem('plannerType', plannerType);

    console.log("Saving travelPlan to localStorage:", travelPlan);

    try {
      if (plannerType === 'ai') {
        // AI 플래너로 이동
        navigate(`/travel-planner/${destination}/ai-planner`);
      } else {
        // 수동 일정: travel_plans에 기본 정보 저장
        const travelPlanRequest = {
          city: destination.toLowerCase(),
          country: getCountryByDestination(destination),
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          plan_type: 'MY',
        };
        console.log('Sending travel plan request:', JSON.stringify(travelPlanRequest, null, 2));
        const response = await axiosInstance.post('/api/travel-plans', travelPlanRequest);
        console.log('Travel plan response:', JSON.stringify(response.data, null, 2));
        localStorage.setItem('travelPlanId', response.data.id);
        toast.success('여행 계획이 저장되었습니다!');
        navigate(`/travel-planner/${destination}/step2`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        '여행 계획 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.';
      toast.error(errorMessage);
      console.error('handleNext error:', JSON.stringify(error.response?.data || error, null, 2));
    }
  };

  const getCountryByDestination = (destination) => {
    const countryMap = {
      jeju: "한국",
      bangkok: "태국",
      fukuoka: "일본",
      osaka: "일본",
      paris: "프랑스",
      rome: "이탈리아",
      singapore: "싱가포르",
      tokyo: "일본",
      venice: "이탈리아",
    };
    return countryMap[destination.toLowerCase()] || "알 수 없음";
  };

  if (!city) {
    return (
      <div className="text-red-600 font-bold p-4">
        유효하지 않은 여행지입니다. 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Button
            className={`flex h-24 flex-col items-center justify-center gap-2 text-lg ${
              plannerType === "manual"
                ? "bg-traveling-purple text-white"
                : "bg-traveling-background text-traveling-text hover:bg-traveling-purple/20"
            }`}
            onClick={() => setPlannerType("manual")}
          >
            <Calendar className="h-6 w-6" />
            나의 여행 만들기
          </Button>
          <Button
            className={`flex h-24 flex-col items-center justify-center gap-2 text-lg ${
              plannerType === "ai"
                ? "bg-traveling-purple text-white"
                : "bg-traveling-background text-traveling-text hover:bg-traveling-purple/20"
            }`}
            onClick={() => setPlannerType("ai")}
          >
            <Brain className="h-6 w-6" />
            AI 추천 일정 만들기
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-traveling-text">
            {city.name} 여행 기간은 어떻게 되시나요?
          </h2>
          <p className="mb-6 text-center text-sm text-traveling-text/70">
            현재 여행 기간: {formatDateRange() || "(여행지 도착 날짜, 여행지 출발 날짜)로 입력해 주세요."}
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {[days, nextMonthDays].map((monthDays, i) => (
              <div key={i}>
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={i === 0 ? handlePrevMonth : undefined}
                    className={i === 1 ? "invisible" : "text-traveling-text hover:text-traveling-purple"}
                  >
                    &lt;
                  </button>
                  <h3 className="text-lg font-bold text-traveling-text">
                    {i === 0 ? currentYear : currentMonth === 11 ? currentYear + 1 : currentYear}년{" "}
                    {months[(currentMonth + i) % 12]}
                  </h3>
                  <button
                    onClick={i === 0 ? handleNextMonth : undefined}
                    className={i === 1 ? "invisible" : "text-traveling-text hover:text-traveling-purple"}
                  >
                    &gt;
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {weekdays.map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-2 text-center text-sm font-medium ${
                        idx === 0
                          ? "text-red-500"
                          : idx === 6
                          ? "text-blue-500"
                          : "text-traveling-text"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                  {monthDays.map((day, idx) => {
                    const dateStr = `${day.year}-${String(day.month + 1).padStart(2, "0")}-${String(
                      day.date
                    ).padStart(2, "0")}`;
                    const isSelected = selectedDates.includes(dateStr);
                    const isToday = new Date().toISOString().split("T")[0] === dateStr;
                    return (
                      <div
                        key={idx}
                        className={`p-2 text-center ${
                          !day.currentMonth
                            ? "text-gray-300"
                            : idx % 7 === 0
                            ? "text-red-500"
                            : idx % 7 === 6
                            ? "text-blue-500"
                            : "text-traveling-text"
                        }`}
                      >
                        <button
                          onClick={() => day.currentMonth && handleDateClick(day.year, day.month, day.date)}
                          className={`h-8 w-8 rounded-full ${
                            isSelected
                              ? "bg-traveling-purple text-white"
                              : isToday
                              ? "border border-traveling-purple"
                              : ""
                          }`}
                          disabled={!day.currentMonth}
                        >
                          {day.date}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
              disabled={selectedDates.length === 0}
              onClick={handleNext}
            >
              다음 단계로
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}