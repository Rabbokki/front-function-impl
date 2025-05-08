import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Brain, Loader2 } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card } from "../../modules/Card";
import { Textarea } from "../../modules/Textarea";
import { Slider } from "../../modules/Slider";

export function AIPlannerContent() {
  const { destination } = useParams();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState("");
  const [budget, setBudget] = useState([50]);
  const [pace, setPace] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const city = cityData[destination] || cityData.osaka;

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      navigate(`/travel-planner/${destination}/step5`);
    }, 3000);
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
                placeholder="여행 스타일, 관심사, 음식 취향 등을 자유롭게 입력해주세요."
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
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  일정 생성 중...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  AI 일정 생성하기
                </>
              )}
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
    </div>
  );
}