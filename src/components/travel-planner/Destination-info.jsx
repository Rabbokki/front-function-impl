import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Brain } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card } from "../../modules/Card";

const cityData = {
  osaka: {
    name: "오사카",
    nameEn: "OSAKA",
    country: "일본",
    flag: "🇯🇵",
    airport: "osaa",
  },
  tokyo: {
    name: "도쿄",
    nameEn: "TOKYO",
    country: "일본",
    flag: "🇯🇵",
    airport: "tyoa",
  },
  fukuoka: {
    name: "후쿠오카",
    nameEn: "FUKUOKA",
    country: "일본",
    flag: "🇯🇵",
    airport: "fuka",
  },
  jeju: {
    name: "제주",
    nameEn: "JEJU",
    country: "대한민국",
    flag: "🇰🇷",
    airport: "jeju",
  },
  paris: {
    name: "파리",
    nameEn: "PARIS",
    country: "프랑스",
    flag: "🇫🇷",
    airport: "pari",
  },
  rome: {
    name: "로마",
    nameEn: "ROME",
    country: "이탈리아",
    flag: "🇮🇹",
    airport: "rome",
  },
  venice: {
    name: "베니스",
    nameEn: "VENICE",
    country: "이탈리아",
    flag: "🇮🇹",
    airport: "veni",
  },
  bangkok: {
    name: "방콕",
    nameEn: "BANGKOK",
    country: "태국",
    flag: "🇹🇭",
    airport: "bkkt",
  },
  singapore: {
    name: "싱가포르",
    nameEn: "SINGAPORE",
    country: "싱가포르",
    flag: "🇸🇬",
    airport: "sins",
  },
};

export function DestinationInfo({ destination }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(4); // May
  const [currentYear, setCurrentYear] = useState(2025);
  const [plannerType, setPlannerType] = useState("manual");

  const city = cityData[destination] || cityData["osaka"];
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

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
    while (days.length < 42) {
      days.push({ date: days.length - daysInMonth - firstDay + 1, currentMonth: false, month: month + 1, year });
    }
    return days;
  };

  const handleDateClick = (year, month, date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    if (selectedDates.length <= 1) {
      setSelectedDates([dateStr]);
    } else {
      const first = new Date(selectedDates[0]);
      const second = new Date(dateStr);
      const start = first < second ? first : second;
      const end = first < second ? second : first;
      const range = [];
      let cur = new Date(start);
      while (cur <= end) {
        range.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
      }
      setSelectedDates(range);
    }
  };

  const formatDateRange = () => {
    if (!selectedDates.length) return "";
    const sorted = [...selectedDates].sort();
    const start = new Date(sorted[0]);
    const end = new Date(sorted[sorted.length - 1]);
    const format = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    return `${format(start)} - ${format(end)} (${sorted.length}일)`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Button
            className={`flex h-24 flex-col items-center justify-center gap-2 text-lg ${
              plannerType === "manual" ? "bg-traveling-purple text-white" : "bg-traveling-background text-traveling-text hover:bg-traveling-purple/20"
            }`}
            onClick={() => setPlannerType("manual")}
          >
            <Calendar className="h-6 w-6" />
            나의 여행 만들기
          </Button>
          <Button
            className={`flex h-24 flex-col items-center justify-center gap-2 text-lg ${
              plannerType === "ai" ? "bg-traveling-purple text-white" : "bg-traveling-background text-traveling-text hover:bg-traveling-purple/20"
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
            {[generateCalendar(currentYear, currentMonth), generateCalendar(currentMonth === 11 ? currentYear + 1 : currentYear, (currentMonth + 1) % 12)].map((monthDays, i) => (
              <div key={i}>
                <div className="mb-4 flex items-center justify-between">
                  <button onClick={i === 0 ? () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1)) : undefined}>
                    &lt;
                  </button>
                  <h3 className="text-lg font-bold text-traveling-text">
                    {i === 0 ? currentYear : currentMonth === 11 ? currentYear + 1 : currentYear}년 {months[(currentMonth + i) % 12]}
                  </h3>
                  <button onClick={i === 0 ? () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1)) : undefined}>
                    &gt;
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {weekdays.map((day, idx) => (
                    <div key={idx} className="text-center font-medium text-sm text-traveling-text">{day}</div>
                  ))}
                  {monthDays.map((day, idx) => {
                    const dateStr = `${day.year}-${String(day.month + 1).padStart(2, "0")}-${String(day.date).padStart(2, "0")}`;
                    const isSelected = selectedDates.includes(dateStr);
                    return (
                      <div key={idx} className="text-center">
                        <button
                          onClick={() => day.currentMonth && handleDateClick(day.year, day.month, day.date)}
                          className={`h-8 w-8 rounded-full ${isSelected ? "bg-traveling-purple text-white" : ""}`}
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
            <Link
              to={
                selectedDates.length > 0
                  ? `/travel-planner/${destination}/${plannerType === "manual" ? "step2" : "ai-planner"}`
                  : "#"
              }
            >
              <Button className="bg-traveling-purple text-white" disabled={selectedDates.length === 0}>
                다음 단계로
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
