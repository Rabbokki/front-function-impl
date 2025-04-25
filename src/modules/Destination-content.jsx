import { useState } from "react"
import { MapPin, Calendar, Star, Clock, Utensils, Info, Plane, Hotel, Sun } from "lucide-react"
import { Button } from "./Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Card, CardContent, CardFooter, CardHeader } from "./Card"
import { Badge } from "./Badge"

// 도시별 데이터
const cityData = {
  도쿄: {
    country: "일본",
    flag: "🇯🇵",
    color: "#ff6b6b",
    description:
      "일본의 수도이자 세계 최대 도시 중 하나인 도쿄는 현대적인 기술과 전통이 공존하는 매력적인 도시입니다. 화려한 네온사인의 번화가부터 고즈넉한 사원과 정원까지, 다양한 매력을 지닌 도시입니다.",
    bestSeason: "3월-5월(벚꽃), 9월-11월(단풍)",
    currency: "엔(JPY)",
    language: "일본어",
    timeZone: "UTC+9",
    attractions: [
      {
        name: "도쿄 스카이트리",
        rating: 4.5,
        description: "높이 634m의 전파탑으로, 전망대에서 도쿄 전경을 감상할 수 있습니다.",
      },
      {
        name: "아사쿠사 센소지",
        rating: 4.7,
        description: "도쿄에서 가장 오래된 사원으로, 나카미세 거리와 함께 방문하기 좋습니다.",
      },
      {
        name: "시부야 스크램블 교차로",
        rating: 4.3,
        description: "세계에서 가장 분주한 횡단보도 중 하나로, 도쿄의 상징적인 장소입니다.",
      },
      {
        name: "메이지 신궁",
        rating: 4.6,
        description: "도심 속 울창한 숲으로 둘러싸인 신사로, 휴식과 산책을 즐기기 좋습니다.",
      },
    ],
    foods: [
      { name: "스시", rating: 4.8, description: "신선한 해산물을 사용한 일본의 대표적인 음식입니다." },
      { name: "라멘", rating: 4.7, description: "다양한 스타일의 라멘을 맛볼 수 있으며, 각 지역마다 특색이 있습니다." },
      { name: "덴푸라", rating: 4.5, description: "해산물과 채소를 바삭하게 튀긴 요리로, 소스에 찍어 먹습니다." },
      {
        name: "타코야키",
        rating: 4.4,
        description: "문어 조각이 들어간 둥근 모양의 간식으로, 길거리 음식으로 인기가 있습니다.",
      },
    ],
    tips: [
      "대중교통이 매우 발달되어 있어 지하철과 JR선을 이용하면 편리합니다.",
      "스이카(Suica) 또는 파스모(PASMO) 교통카드를 구입하면 편리하게 이용할 수 있습니다.",
      "봄(3-5월)과 가을(9-11월)이 여행하기 가장 좋은 시기입니다.",
      "음식점에서는 팁을 주지 않는 문화입니다.",
      "공중화장실이 깨끗하고 많이 있어 편리합니다.",
    ],
    itinerary: [
      {
        day: "1일차",
        activities: [
          { time: "09:00", activity: "아사쿠사 센소지 방문" },
          { time: "12:00", activity: "아사쿠사에서 점심 식사" },
          { time: "14:00", activity: "도쿄 스카이트리 관람" },
          { time: "17:00", activity: "아키하바라 전자상가 쇼핑" },
          { time: "19:00", activity: "저녁 식사 및 자유 시간" },
        ],
      },
      {
        day: "2일차",
        activities: [
          { time: "10:00", activity: "메이지 신궁 방문" },
          { time: "12:30", activity: "하라주쿠에서 점심 식사" },
          { time: "14:00", activity: "다케시타 거리 쇼핑" },
          { time: "16:00", activity: "시부야 스크램블 교차로 및 하치코 동상" },
          { time: "18:00", activity: "시부야에서 저녁 식사" },
        ],
      },
      {
        day: "3일차",
        activities: [
          { time: "09:00", activity: "우에노 공원 산책" },
          { time: "11:00", activity: "도쿄 국립 박물관 관람" },
          { time: "13:00", activity: "우에노에서 점심 식사" },
          { time: "15:00", activity: "긴자 쇼핑 거리 방문" },
          { time: "18:00", activity: "츠키지 주변에서 저녁 식사" },
        ],
      },
    ],
  },
  파리: {
    country: "프랑스",
    flag: "🇫🇷",
    color: "#4dabf7",
    description:
      "프랑스의 수도 파리는 예술, 패션, 요리, 문화의 중심지로 알려져 있습니다. 에펠탑, 루브르 박물관, 노트르담 대성당 등 세계적으로 유명한 랜드마크들이 있는 로맨틱한 도시입니다.",
    bestSeason: "4월-6월, 9월-10월",
    currency: "유로(EUR)",
    language: "프랑스어",
    timeZone: "UTC+1(여름 UTC+2)",
    attractions: [
      {
        name: "에펠탑",
        rating: 4.6,
        description: "파리의 상징적인 랜드마크로, 도시의 전경을 감상할 수 있는 전망대가 있습니다.",
      },
      {
        name: "루브르 박물관",
        rating: 4.8,
        description: "세계 최대 규모의 미술관 중 하나로, 모나리자 등 유명 작품들이 전시되어 있습니다.",
      },
      {
        name: "개선문",
        rating: 4.5,
        description: "샹젤리제 거리의 끝에 위치한 기념물로, 파리의 역사적 중요성을 상징합니다.",
      },
      {
        name: "노트르담 대성당",
        rating: 4.7,
        description: "고딕 양식의 대표적인 건축물로, 파리의 역사적 중심에 위치해 있습니다.",
      },
    ],
    foods: [
      { name: "크로와상", rating: 4.7, description: "버터가 듬뿍 들어간 프랑스의 대표적인 베이커리 제품입니다." },
      { name: "에스카르고", rating: 4.3, description: "달팽이를 마늘 버터로 조리한 프랑스의 전통 요리입니다." },
      {
        name: "뵈프 부르기뇽",
        rating: 4.6,
        description: "레드 와인으로 조리한 소고기 스튜로, 풍부한 맛이 특징입니다.",
      },
      { name: "마카롱", rating: 4.8, description: "다양한 색상과 맛의 아몬드 쿠키로, 파리의 대표적인 디저트입니다." },
    ],
    tips: [
      "파리 패스(Paris Pass)를 구입하면 주요 관광지 입장과 대중교통 이용이 편리합니다.",
      "지하철(메트로)이 잘 발달되어 있어 이동이 편리합니다.",
      "식당에서는 보통 10% 정도의 팁이 적절합니다.",
      "주요 관광지는 미리 온라인으로 티켓을 예약하는 것이 좋습니다.",
      "영어가 통하는 곳도 있지만, 간단한 프랑스어 인사말을 알아두면 좋습니다.",
    ],
    itinerary: [
      {
        day: "1일차",
        activities: [
          { time: "09:00", activity: "에펠탑 방문" },
          { time: "12:00", activity: "세느강 주변에서 점심 식사" },
          { time: "14:00", activity: "세느강 크루즈 투어" },
          { time: "16:30", activity: "샹젤리제 거리 산책" },
          { time: "19:00", activity: "저녁 식사 및 자유 시간" },
        ],
      },
      {
        day: "2일차",
        activities: [
          { time: "09:30", activity: "루브르 박물관 관람" },
          { time: "13:00", activity: "튈르리 정원에서 점심 식사" },
          { time: "14:30", activity: "오르세 미술관 방문" },
          { time: "17:00", activity: "몽마르트 언덕 산책" },
          { time: "19:30", activity: "몽마르트에서 저녁 식사" },
        ],
      },
      {
        day: "3일차",
        activities: [
          { time: "10:00", activity: "노트르담 대성당 방문" },
          { time: "11:30", activity: "생 미셸 거리 산책" },
          { time: "13:00", activity: "라틴 지구에서 점심 식사" },
          { time: "15:00", activity: "개선문 및 샹젤리제 쇼핑" },
          { time: "18:30", activity: "파리 시내에서 저녁 식사" },
        ],
      },
    ],
  },
  로마: {
    country: "이탈리아",
    flag: "🇮🇹",
    color: "#51cf66",
    description:
      "이탈리아의 수도 로마는 '영원한 도시'라는 별명을 가진 역사적인 도시입니다. 콜로세움, 바티칸 시국, 트레비 분수 등 고대 로마 제국의 유적과 르네상스 시대의 예술 작품들이 도시 곳곳에 남아있습니다.",
    bestSeason: "4월-6월, 9월-10월",
    currency: "유로(EUR)",
    language: "이탈리아어",
    timeZone: "UTC+1(여름 UTC+2)",
    attractions: [
      {
        name: "콜로세움",
        rating: 4.7,
        description: "고대 로마의 원형 경기장으로, 로마 제국의 웅장함을 보여주는 상징적인 건축물입니다.",
      },
      {
        name: "바티칸 박물관",
        rating: 4.8,
        description: "미켈란젤로의 시스티나 성당 천장화 등 세계적인 예술 작품들을 소장하고 있습니다.",
      },
      {
        name: "트레비 분수",
        rating: 4.6,
        description: "로마에서 가장 유명한 분수로, 동전을 던지면 로마에 다시 올 수 있다는 전설이 있습니다.",
      },
      {
        name: "판테온",
        rating: 4.7,
        description: "고대 로마 시대의 신전으로, 완벽하게 보존된 돔형 천장이 특징입니다.",
      },
    ],
    foods: [
      {
        name: "파스타 카르보나라",
        rating: 4.8,
        description: "로마의 대표적인 파스타 요리로, 계란, 치즈, 베이컨으로 만듭니다.",
      },
      {
        name: "피자",
        rating: 4.7,
        description: "이탈리아의 대표 음식으로, 로마에서는 얇고 바삭한 스타일의 피자를 즐길 수 있습니다.",
      },
      { name: "젤라토", rating: 4.9, description: "이탈리아식 아이스크림으로, 다양한 맛과 풍부한 질감이 특징입니다." },
      { name: "수플리", rating: 4.5, description: "라이스 볼에 모짜렐라 치즈를 넣고 튀긴 로마의 전통 간식입니다." },
    ],
    tips: [
      "주요 관광지는 미리 온라인으로 티켓을 예약하는 것이 좋습니다.",
      "로마는 걸어서 관광하기 좋지만, 대중교통도 잘 발달되어 있습니다.",
      "여름에는 매우 더울 수 있으니 물을 충분히 마시고 자외선 차단제를 바르세요.",
      "식당에서는 보통 10% 정도의 팁이 적절합니다.",
      "바티칸 시국 방문 시 복장에 주의해야 합니다(어깨와 무릎이 가려져야 함).",
    ],
    itinerary: [
      {
        day: "1일차",
        activities: [
          { time: "09:00", activity: "콜로세움 및 포로 로마노 방문" },
          { time: "13:00", activity: "로마 시내에서 점심 식사" },
          { time: "15:00", activity: "팔라티노 언덕 탐험" },
          { time: "17:30", activity: "베네치아 광장 방문" },
          { time: "19:30", activity: "트라스테베레 지역에서 저녁 식사" },
        ],
      },
      {
        day: "2일차",
        activities: [
          { time: "08:30", activity: "바티칸 박물관 및 시스티나 성당 관람" },
          { time: "12:00", activity: "성 베드로 대성당 방문" },
          { time: "13:30", activity: "바티칸 주변에서 점심 식사" },
          { time: "15:30", activity: "카스텔 산탄젤로 방문" },
          { time: "18:00", activity: "나보나 광장에서 저녁 식사" },
        ],
      },
      {
        day: "3일차",
        activities: [
          { time: "09:30", activity: "판테온 방문" },
          { time: "11:00", activity: "트레비 분수 방문" },
          { time: "12:30", activity: "스페인 계단 주변에서 점심 식사" },
          { time: "14:30", activity: "보르게세 미술관 관람" },
          { time: "18:00", activity: "로마 시내에서 저녁 식사" },
        ],
      },
    ],
  },
  방콕: {
    country: "태국",
    flag: "🇹🇭",
    color: "#ffd43b",
    description:
      "태국의 수도 방콕은 활기찬 거리 음식, 화려한 사원, 번화한 시장이 특징인 도시입니다. 전통과 현대가 공존하는 이 도시는 동남아시아에서 가장 인기 있는 관광지 중 하나입니다.",
    bestSeason: "11월-2월",
    currency: "바트(THB)",
    language: "태국어",
    timeZone: "UTC+7",
    attractions: [
      {
        name: "왕궁",
        rating: 4.7,
        description: "태국 왕실의 공식 거주지로, 에메랄드 불상이 있는 왓 프라깨우가 함께 있습니다.",
      },
      {
        name: "왓 아룬",
        rating: 4.6,
        description: "새벽 사원이라고도 불리며, 차오프라야 강변에 위치한 아름다운 사원입니다.",
      },
      {
        name: "차투착 주말 시장",
        rating: 4.8,
        description: "세계 최대 규모의 주말 시장으로, 다양한 상품과 음식을 판매합니다.",
      },
      { name: "왓 포", rating: 4.7, description: "방콕에서 가장 오래된 사원 중 하나로, 거대한 와불상이 있습니다." },
    ],
    foods: [
      {
        name: "팟타이",
        rating: 4.7,
        description: "태국의 대표적인 볶음 쌀국수 요리로, 새우, 두부, 콩나물 등이 들어갑니다.",
      },
      {
        name: "똠얌꿍",
        rating: 4.8,
        description: "새우와 레몬그라스, 고추 등으로 만든 매콤하고 신맛이 나는 수프입니다.",
      },
      {
        name: "그린 커리",
        rating: 4.6,
        description: "코코넛 밀크와 그린 커리 페이스트로 만든 매콤하고 부드러운 커리입니다.",
      },
      {
        name: "망고 스티키 라이스",
        rating: 4.9,
        description: "달콤한 망고와 찹쌀밥을 코코넛 밀크와 함께 먹는 태국의 대표적인 디저트입니다.",
      },
    ],
    tips: [
      "방콕은 매우 더울 수 있으니 물을 충분히 마시고 자외선 차단제를 바르세요.",
      "사원 방문 시 복장에 주의해야 합니다(어깨와 무릎이 가려져야 함).",
      "택시 이용 시 미터기 사용을 요청하세요.",
      "길거리 음식은 맛있지만, 위생에 주의하세요.",
      "태국 왕실에 대한 존중을 표현하는 것이 중요합니다.",
    ],
    itinerary: [
      {
        day: "1일차",
        activities: [
          { time: "09:00", activity: "왕궁 및 왓 프라깨우 방문" },
          { time: "12:30", activity: "근처 레스토랑에서 점심 식사" },
          { time: "14:00", activity: "왓 포 방문" },
          { time: "16:30", activity: "차오프라야 강변 산책" },
          { time: "19:00", activity: "강변 레스토랑에서 저녁 식사" },
        ],
      },
      {
        day: "2일차",
        activities: [
          { time: "08:00", activity: "담넌 사두악 수상 시장 투어" },
          { time: "12:00", activity: "현지 식당에서 점심 식사" },
          { time: "14:30", activity: "왓 아룬 방문" },
          { time: "16:30", activity: "짐 톰슨의 집 방문" },
          { time: "19:00", activity: "시암 지역에서 저녁 식사 및 쇼핑" },
        ],
      },
      {
        day: "3일차",
        activities: [
          { time: "09:00", activity: "차투착 주말 시장 방문(주말인 경우)" },
          { time: "12:30", activity: "시장에서 점심 식사" },
          { time: "14:30", activity: "룸피니 공원 산책" },
          { time: "16:30", activity: "아시아티크 더 리버프론트 방문" },
          { time: "19:00", activity: "아시아티크에서 저녁 식사 및 쇼핑" },
        ],
      },
    ],
  },
}

export function DestinationContent({ cityName }) {
  const [activeTab, setActiveTab] = useState("overview")
  const city = cityData[cityName]

  if (!city) {
    return <div>도시 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <div className="flex items-center">
              <h1 className="text-4xl font-bold text-[#1e3a8a]">{cityName}</h1>
              <span className="ml-2 text-3xl">{city.flag}</span>
              <Badge className="ml-3 bg-[#e7f5ff] text-[#1c7ed6]">{city.country}</Badge>
            </div>
            <p className="mt-2 text-[#495057]">{city.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
              <Plane className="mr-2 h-4 w-4" />
              항공권 검색
            </Button>
            <Button className="bg-[#4dabf7] text-white hover:bg-[#339af0]">
              <Hotel className="mr-2 h-4 w-4" />
              숙소 검색
            </Button>
          </div>
        </div>

        <div className="mb-8 h-64 w-full overflow-hidden rounded-lg bg-[#e7f5ff]">
          <CityIllustration cityName={cityName} />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-[#e7f5ff] p-4">
            <div className="mb-2 flex items-center">
              <Sun className="mr-2 h-4 w-4 text-[#ffd43b]" />
              <span className="font-medium text-[#1e3a8a]">최적 여행 시기</span>
            </div>
            <p className="text-sm text-[#495057]">{city.bestSeason}</p>
          </div>
          <div className="rounded-lg bg-[#e7f5ff] p-4">
            <div className="mb-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-[#ff6b6b]" />
              <span className="font-medium text-[#1e3a8a]">시간대</span>
            </div>
            <p className="text-sm text-[#495057]">{city.timeZone}</p>
          </div>
          <div className="rounded-lg bg-[#e7f5ff] p-4">
            <div className="mb-2 flex items-center">
              <Info className="mr-2 h-4 w-4 text-[#4dabf7]" />
              <span className="font-medium text-[#1e3a8a]">언어</span>
            </div>
            <p className="text-sm text-[#495057]">{city.language}</p>
          </div>
          <div className="rounded-lg bg-[#e7f5ff] p-4">
            <div className="mb-2 flex items-center">
              <span className="mr-2 font-bold text-[#51cf66]">$</span>
              <span className="font-medium text-[#1e3a8a]">통화</span>
            </div>
            <p className="text-sm text-[#495057]">{city.currency}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-4 bg-[#e7f5ff]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
              개요
            </TabsTrigger>
            <TabsTrigger
              value="attractions"
              className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
            >
              명소
            </TabsTrigger>
            <TabsTrigger value="foods" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
              음식
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
              추천 일정
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-[#1e3a8a]">여행 팁</h2>
                <ul className="space-y-2">
                  {city.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-[#4dabf7]">•</span>
                      <span className="text-[#495057]">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-[#1e3a8a]">추천 명소</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {city.attractions.slice(0, 2).map((attraction, index) => (
                    <Card key={index} className="overflow-hidden bg-[#f8f9fa]">
                      <div className="h-40 bg-[#e7f5ff]">
                        <AttractionIllustration cityName={cityName} index={index} />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium text-[#1e3a8a]">{attraction.name}</h3>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-[#ffd43b] text-[#ffd43b]" />
                            <span className="text-sm font-medium">{attraction.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#495057]">{attraction.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-[#1e3a8a]">추천 음식</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {city.foods.slice(0, 2).map((food, index) => (
                    <Card key={index} className="overflow-hidden bg-[#f8f9fa]">
                      <div className="h-40 bg-[#e7f5ff]">
                        <FoodIllustration cityName={cityName} index={index} />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium text-[#1e3a8a]">{food.name}</h3>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-[#ffd43b] text-[#ffd43b]" />
                            <span className="text-sm font-medium">{food.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#495057]">{food.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attractions">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {city.attractions.map((attraction, index) => (
                <Card key={index} className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105">
                  <div className="h-48 bg-[#e7f5ff]">
                    <AttractionIllustration cityName={cityName} index={index} />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-[#1e3a8a]">{attraction.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-[#ffd43b] text-[#ffd43b]" />
                        <span className="text-sm font-medium">{attraction.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#495057]">{attraction.description}</p>
                  </CardContent>
                  <CardFooter className="bg-[#e7f5ff]/30 p-4">
                    <Button className="w-full bg-[#4dabf7] text-white hover:bg-[#339af0]">
                      <MapPin className="mr-2 h-4 w-4" />
                      지도에서 보기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="foods">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {city.foods.map((food, index) => (
                <Card key={index} className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105">
                  <div className="h-48 bg-[#e7f5ff]">
                    <FoodIllustration cityName={cityName} index={index} />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-[#1e3a8a]">{food.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-[#ffd43b] text-[#ffd43b]" />
                        <span className="text-sm font-medium">{food.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#495057]">{food.description}</p>
                  </CardContent>
                  <CardFooter className="bg-[#e7f5ff]/30 p-4">
                    <Button className="w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
                      <Utensils className="mr-2 h-4 w-4" />
                      맛집 찾기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
            <div className="space-y-6">
              {city.itinerary.map((day, dayIndex) => (
                <Card key={dayIndex} className="bg-[#f8f9fa]">
                  <CardHeader className="bg-[#e7f5ff] pb-2 pt-4">
                    <h3 className="text-lg font-bold text-[#1e3a8a]">{day.day}</h3>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start">
                          <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5ff] text-[#4dabf7]">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-[#1e3a8a]">{activity.time}</div>
                            <div className="text-[#495057]">{activity.activity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button className="w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
                <Calendar className="mr-2 h-4 w-4" />이 일정으로 여행 계획 만들기
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// 도시별 일러스트레이션 컴포넌트
function CityIllustration({ cityName }) {
  switch (cityName) {
    case "도쿄":
      return (
        <svg viewBox="0 0 800 400" className="h-full w-full">
          {/* 배경 */}
          <rect x="0" y="0" width="800" height="400" fill="#e7f5ff" />
          <path d="M0,250 L800,250" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,300 L800,300" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,350 L800,350" stroke="#c5f6fa" strokeWidth="1" />

          {/* 구름 */}
          <circle cx="100" cy="80" r="30" fill="white" />
          <circle cx="130" cy="70" r="35" fill="white" />
          <circle cx="160" cy="80" r="30" fill="white" />

          <circle cx="600" cy="100" r="25" fill="white" />
          <circle cx="630" cy="90" r="30" fill="white" />
          <circle cx="660" cy="100" r="25" fill="white" />

          {/* 후지산 */}
          <path d="M400,380 L200,150 L600,150 Z" fill="white" />
          <path d="M400,380 L250,180 L550,180 Z" fill="#adb5bd" />

          {/* 도쿄 타워 */}
          <path d="M650,380 L680,380 L665,200 Z" fill="#ff6b6b" />
          <path d="M658,200 L672,200 L665,150 Z" fill="#ff6b6b" />
          <rect x="663" y="130" width="4" height="20" fill="#ff6b6b" />

          {/* 스카이트리 */}
          <path d="M150,380 L170,380 L160,180 Z" fill="#4dabf7" />
          <path d="M155,180 L165,180 L160,120 Z" fill="#4dabf7" />
          <rect x="158" y="100" width="4" height="20" fill="#4dabf7" />

          {/* 빌딩들 */}
          <rect x="250" y="280" width="60" height="100" fill="#adb5bd" />
          <rect x="255" y="290" width="10" height="15" fill="#e7f5ff" />
          <rect x="275" y="290" width="10" height="15" fill="#e7f5ff" />
          <rect x="295" y="290" width="10" height="15" fill="#e7f5ff" />
          <rect x="255" y="320" width="10" height="15" fill="#e7f5ff" />
          <rect x="275" y="320" width="10" height="15" fill="#e7f5ff" />
          <rect x="295" y="320" width="10" height="15" fill="#e7f5ff" />
          <rect x="255" y="350" width="10" height="15" fill="#e7f5ff" />
          <rect x="275" y="350" width="10" height="15" fill="#e7f5ff" />
          <rect x="295" y="350" width="10" height="15" fill="#e7f5ff" />

          <rect x="330" y="250" width="80" height="130" fill="#adb5bd" />
          <rect x="340" y="260" width="15" height="20" fill="#e7f5ff" />
          <rect x="370" y="260" width="15" height="20" fill="#e7f5ff" />
          <rect x="340" y="290" width="15" height="20" fill="#e7f5ff" />
          <rect x="370" y="290" width="15" height="20" fill="#e7f5ff" />
          <rect x="340" y="320" width="15" height="20" fill="#e7f5ff" />
          <rect x="370" y="320" width="15" height="20" fill="#e7f5ff" />
          <rect x="340" y="350" width="15" height="20" fill="#e7f5ff" />
          <rect x="370" y="350" width="15" height="20" fill="#e7f5ff" />

          <rect x="430" y="300" width="100" height="80" fill="#adb5bd" />
          <rect x="440" y="310" width="20" height="25" fill="#e7f5ff" />
          <rect x="470" y="310" width="20" height="25" fill="#e7f5ff" />
          <rect x="500" y="310" width="20" height="25" fill="#e7f5ff" />
          <rect x="440" y="345" width="20" height="25" fill="#e7f5ff" />
          <rect x="470" y="345" width="20" height="25" fill="#e7f5ff" />
          <rect x="500" y="345" width="20" height="25" fill="#e7f5ff" />

          <rect x="550" y="320" width="70" height="60" fill="#adb5bd" />
          <rect x="560" y="330" width="15" height="15" fill="#e7f5ff" />
          <rect x="585" y="330" width="15" height="15" fill="#e7f5ff" />
          <rect x="560" y="355" width="15" height="15" fill="#e7f5ff" />
          <rect x="585" y="355" width="15" height="15" fill="#e7f5ff" />
        </svg>
      )
    case "파리":
      return (
        <svg viewBox="0 0 800 400" className="h-full w-full">
          {/* 배경 */}
          <rect x="0" y="0" width="800" height="400" fill="#e7f5ff" />
          <path d="M0,250 L800,250" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,300 L800,300" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,350 L800,350" stroke="#c5f6fa" strokeWidth="1" />

          {/* 구름 */}
          <circle cx="100" cy="80" r="30" fill="white" />
          <circle cx="130" cy="70" r="35" fill="white" />
          <circle cx="160" cy="80" r="30" fill="white" />

          <circle cx="600" cy="100" r="25" fill="white" />
          <circle cx="630" cy="90" r="30" fill="white" />
          <circle cx="660" cy="100" r="25" fill="white" />

          {/* 에펠탑 */}
          <path d="M400,380 L350,250 L450,250 Z" fill="#4dabf7" />
          <path d="M380,250 L370,200 L430,200 L420,250 Z" fill="#4dabf7" />
          <path d="M375,200 L365,150 L435,150 L425,200 Z" fill="#4dabf7" />
          <rect x="395" y="100" width="10" height="50" fill="#4dabf7" />

          {/* 개선문 */}
          <rect x="600" y="300" width="80" height="80" fill="#adb5bd" />
          <path d="M600,300 Q640,250 680,300" fill="#adb5bd" />
          <rect x="630" y="320" width="20" height="60" fill="#e7f5ff" />

          {/* 노트르담 */}
          <rect x="150" y="300" width="100" height="80" fill="#adb5bd" />
          <path d="M150,300 L200,250 L250,300" fill="#adb5bd" />
          <rect x="190" y="300" width="20" height="40" fill="#e7f5ff" />
          <circle cx="200" cy="280" r="15" fill="#e7f5ff" />

          {/* 루브르 */}
          <rect x="300" y="320" width="120" height="60" fill="#adb5bd" />
          <path d="M360,320 L360,280 L380,260 L400,280 L400,320" fill="#adb5bd" />
          <rect x="320" y="340" width="20" height="20" fill="#e7f5ff" />
          <rect x="360" y="340" width="20" height="20" fill="#e7f5ff" />
          <rect x="400" y="340" width="20" height="20" fill="#e7f5ff" />
          <path d="M360,280 L380,260 L400,280" fill="#e7f5ff" />

          {/* 세느강 */}
          <path d="M0,330 Q200,350 400,330 Q600,310 800,330" fill="#4dabf7" fillOpacity="0.3" />
        </svg>
      )
    case "로마":
      return (
        <svg viewBox="0 0 800 400" className="h-full w-full">
          {/* 배경 */}
          <rect x="0" y="0" width="800" height="400" fill="#e7f5ff" />
          <path d="M0,250 L800,250" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,300 L800,300" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,350 L800,350" stroke="#c5f6fa" strokeWidth="1" />

          {/* 구름 */}
          <circle cx="100" cy="80" r="30" fill="white" />
          <circle cx="130" cy="70" r="35" fill="white" />
          <circle cx="160" cy="80" r="30" fill="white" />

          <circle cx="600" cy="100" r="25" fill="white" />
          <circle cx="630" cy="90" r="30" fill="white" />
          <circle cx="660" cy="100" r="25" fill="white" />

          {/* 콜로세움 */}
          <ellipse cx="400" cy="320" rx="120" ry="60" fill="#51cf66" />
          <ellipse cx="400" cy="320" rx="100" ry="50" fill="#e7f5ff" />
          <ellipse cx="400" cy="320" rx="80" ry="40" fill="#51cf66" />

          {/* 아치들 */}
          <path d="M350,290 Q360,270 370,290" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M380,290 Q390,270 400,290" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M410,290 Q420,270 430,290" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M440,290 Q450,270 460,290" stroke="#adb5bd" strokeWidth="3" fill="none" />

          <path d="M340,310 Q350,290 360,310" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M370,310 Q380,290 390,310" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M400,310 Q410,290 420,310" stroke="#adb5bd" strokeWidth="3" fill="none" />
          <path d="M430,310 Q440,290 450,310" stroke="#adb5bd" strokeWidth="3" fill="none" />

          {/* 바티칸 성 베드로 대성당 */}
          <rect x="150" y="300" width="100" height="80" fill="#adb5bd" />
          <path d="M150,300 L200,250 L250,300" fill="#adb5bd" />
          <circle cx="200" cy="270" r="20" fill="#e7f5ff" />

          {/* 트레비 분수 */}
          <rect x="600" y="320" width="80" height="60" fill="#adb5bd" />
          <path d="M600,320 Q640,280 680,320" fill="#adb5bd" />
          <path d="M620,350 Q640,320 660,350" fill="#4dabf7" fillOpacity="0.5" />
          <path d="M630,350 Q640,330 650,350" fill="#4dabf7" fillOpacity="0.5" />

          {/* 로마의 소나무 */}
          <rect x="50" y="320" width="10" height="60" fill="#adb5bd" />
          <ellipse cx="55" cy="300" rx="30" ry="40" fill="#51cf66" />

          <rect x="700" y="330" width="10" height="50" fill="#adb5bd" />
          <ellipse cx="705" cy="310" rx="25" ry="35" fill="#51cf66" />
        </svg>
      )
    case "방콕":
      return (
        <svg viewBox="0 0 800 400" className="h-full w-full">
          {/* 배경 */}
          <rect x="0" y="0" width="800" height="400" fill="#e7f5ff" />
          <path d="M0,250 L800,250" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,300 L800,300" stroke="#c5f6fa" strokeWidth="1" />
          <path d="M0,350 L800,350" stroke="#c5f6fa" strokeWidth="1" />

          {/* 구름 */}
          <circle cx="100" cy="80" r="30" fill="white" />
          <circle cx="130" cy="70" r="35" fill="white" />
          <circle cx="160" cy="80" r="30" fill="white" />

          <circle cx="600" cy="100" r="25" fill="white" />
          <circle cx="630" cy="90" r="30" fill="white" />
          <circle cx="660" cy="100" r="25" fill="white" />

          {/* 왓 아룬 */}
          <path d="M400,380 L320,200 L480,200 Z" fill="#ffd43b" />
          <path d="M400,200 L360,120 L440,120 Z" fill="#ff922b" />
          <path d="M400,120 L380,70 L420,70 Z" fill="#ffd43b" />
          <rect x="395" y="70" width="10" height="50" fill="#ff922b" />
          <circle cx="400" cy="60" r="10" fill="#ffd43b" />

          {/* 왕궁 */}
          <rect x="150" y="300" width="120" height="80" fill="#adb5bd" />
          <path d="M150,300 L210,250 L270,300" fill="#ff922b" />
          <rect x="180" y="330" width="20" height="50" fill="#e7f5ff" />
          <rect x="220" y="330" width="20" height="50" fill="#e7f5ff" />
          <path d="M150,300 L170,280 L190,300" fill="#ffd43b" />
          <path d="M190,300 L210,280 L230,300" fill="#ffd43b" />
          <path d="M230,300 L250,280 L270,300" fill="#ffd43b" />

          {/* 차오프라야 강 */}
          <path d="M0,330 Q200,350 400,330 Q600,310 800,330" fill="#4dabf7" fillOpacity="0.3" />

          {/* 롱테일 보트 */}
          <path d="M500,320 L550,320 L560,330 L490,330 Z" fill="#ff922b" />
          <rect x="520" y="310" width="10" height="10" fill="#adb5bd" />
          <path d="M560,325 L580,325" stroke="#adb5bd" strokeWidth="2" />

          {/* 야자수 */}
          <rect x="650" y="320" width="10" height="60" fill="#adb5bd" />
          <path d="M630,320 Q650,290 670,320" fill="#51cf66" />
          <path d="M620,310 Q650,280 680,310" fill="#51cf66" />
          <path d="M610,300 Q650,270 690,300" fill="#51cf66" />

          <rect x="720" y="330" width="10" height="50" fill="#adb5bd" />
          <path d="M700,330 Q720,300 740,330" fill="#51cf66" />
          <path d="M690,320 Q720,290 750,320" fill="#51cf66" />
          <path d="M680,310 Q720,280 760,310" fill="#51cf66" />
        </svg>
      )
    default:
      return <div className="flex h-full items-center justify-center">일러스트레이션을 찾을 수 없습니다.</div>
  }
}

// 명소 일러스트레이션 컴포넌트
function AttractionIllustration({ cityName, index }) {
  if (cityName === "도쿄") {
    const attractions = [
      // 도쿄 스카이트리
      <svg key="skytree" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <path d="M100,140 L90,40 L110,40 Z" fill="#4dabf7" />
        <path d="M95,40 L90,20 L110,20 L105,40 Z" fill="#4dabf7" />
        <rect x="98" y="10" width="4" height="10" fill="#4dabf7" />
        <circle cx="100" cy="8" r="3" fill="#4dabf7" />
        <rect x="85" y="140" width="30" height="10" fill="#adb5bd" />
      </svg>,
      // 아사쿠사 센소지
      <svg key="sensoji" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="70" y="60" width="60" height="90" fill="#ff6b6b" />
        <rect x="80" y="80" width="40" height="70" fill="#e7f5ff" />
        <path d="M70,60 L100,30 L130,60" fill="#ff6b6b" />
        <rect x="95" y="120" width="10" height="30" fill="#adb5bd" />
        <rect x="60" y="150" width="80" height="10" fill="#adb5bd" />
      </svg>,
      // 시부야 스크램블 교차로
      <svg key="shibuya" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="0" y="100" width="200" height="50" fill="#adb5bd" />
        <path d="M0,100 L50,100 L70,80 L130,80 L150,100 L200,100" fill="none" stroke="white" strokeWidth="2" />
        <path d="M100,50 L100,150" fill="none" stroke="white" strokeWidth="2" />
        <rect x="20" y="60" width="30" height="40" fill="#adb5bd" />
        <rect x="25" y="65" width="5" height="5" fill="#ffd43b" />
        <rect x="35" y="65" width="5" height="5" fill="#ffd43b" />
        <rect x="25" y="75" width="5" height="5" fill="#ffd43b" />
        <rect x="35" y="75" width="5" height="5" fill="#ffd43b" />
        <rect x="150" y="50" width="40" height="50" fill="#adb5bd" />
        <rect x="155" y="55" width="7" height="7" fill="#ffd43b" />
        <rect x="170" y="55" width="7" height="7" fill="#ffd43b" />
        <rect x="155" y="70" width="7" height="7" fill="#ffd43b" />
        <rect x="170" y="70" width="7" height="7" fill="#ffd43b" />
      </svg>,
      // 메이지 신궁
      <svg key="meiji" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="60" y="70" width="80" height="80" fill="#adb5bd" />
        <path d="M60,70 L100,40 L140,70" fill="#adb5bd" />
        <rect x="90" y="110" width="20" height="40" fill="#e7f5ff" />
        <rect x="50" y="70" width="100" height="5" fill="#51cf66" />
        <rect x="50" y="150" width="100" height="5" fill="#51cf66" />
        <rect x="40" y="60" width="10" height="100" fill="#51cf66" />
        <rect x="150" y="60" width="10" height="100" fill="#51cf66" />
      </svg>,
    ]
    return attractions[index % attractions.length]
  } else if (cityName === "파리") {
    const attractions = [
      // 에펠탑
      <svg key="eiffel" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <path d="M100,140 L70,60 L130,60 Z" fill="#4dabf7" />
        <path d="M85,60 L80,40 L120,40 L115,60 Z" fill="#4dabf7" />
        <path d="M85,40 L80,20 L120,20 L115,40 Z" fill="#4dabf7" />
        <rect x="95" y="10" width="10" height="10" fill="#4dabf7" />
        <rect x="80" y="140" width="40" height="10" fill="#adb5bd" />
      </svg>,
      // 루브르 박물관
      <svg key="louvre" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="80" width="120" height="70" fill="#adb5bd" />
        <path d="M100,40 L70,80 L130,80 Z" fill="#adb5bd" />
        <rect x="60" y="100" width="20" height="30" fill="#e7f5ff" />
        <rect x="90" y="100" width="20" height="30" fill="#e7f5ff" />
        <rect x="120" y="100" width="20" height="30" fill="#e7f5ff" />
        <path d="M100,40 L100,80" fill="none" stroke="#e7f5ff" strokeWidth="2" />
      </svg>,
      // 개선문
      <svg key="arc" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="60" y="60" width="80" height="90" fill="#adb5bd" />
        <path d="M60,60 Q100,20 140,60" fill="#adb5bd" />
        <rect x="90" y="100" width="20" height="50" fill="#e7f5ff" />
        <path d="M60,60 L60,150 M140,60 L140,150" fill="none" stroke="#e7f5ff" strokeWidth="2" />
        <rect x="50" y="150" width="100" height="10" fill="#adb5bd" />
      </svg>,
      // 노트르담 대성당
      <svg key="notredam" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="50" y="70" width="100" height="80" fill="#adb5bd" />
        <path d="M50,70 L100,30 L150,70" fill="#adb5bd" />
        <rect x="90" y="110" width="20" height="40" fill="#e7f5ff" />
        <circle cx="100" cy="60" r="15" fill="#e7f5ff" />
        <rect x="70" y="80" width="15" height="25" fill="#e7f5ff" />
        <rect x="115" y="80" width="15" height="25" fill="#e7f5ff" />
      </svg>,
    ]
    return attractions[index % attractions.length]
  } else if (cityName === "로마") {
    const attractions = [
      // 콜로세움
      <svg key="colosseum" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <ellipse cx="100" cy="90" rx="60" ry="40" fill="#51cf66" />
        <ellipse cx="100" cy="90" rx="50" ry="30" fill="#e7f5ff" />
        <ellipse cx="100" cy="90" rx="40" ry="20" fill="#51cf66" />
        <path d="M70,80 Q80,70 90,80" stroke="#adb5bd" strokeWidth="2" fill="none" />
        <path d="M100,80 Q110,70 120,80" stroke="#adb5bd" strokeWidth="2" fill="none" />
        <path d="M130,80 Q140,70 150,80" stroke="#adb5bd" strokeWidth="2" fill="none" />
        <path d="M60,90 Q70,80 80,90" stroke="#adb5bd" strokeWidth="2" fill="none" />
        <path d="M90,90 Q100,80 110,90" stroke="#adb5bd" strokeWidth="2" fill="none" />
        <path d="M120,90 Q130,80 140,90" stroke="#adb5bd" strokeWidth="2" fill="none" />
      </svg>,
      // 바티칸 박물관
      <svg key="vatican" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="50" width="120" height="100" fill="#adb5bd" />
        <rect x="50" y="70" width="20" height="30" fill="#e7f5ff" />
        <rect x="90" y="70" width="20" height="30" fill="#e7f5ff" />
        <rect x="130" y="70" width="20" height="30" fill="#e7f5ff" />
        <rect x="50" y="110" width="20" height="30" fill="#e7f5ff" />
        <rect x="90" y="110" width="20" height="30" fill="#e7f5ff" />
        <rect x="130" y="110" width="20" height="30" fill="#e7f5ff" />
        <path d="M40,50 L100,20 L160,50" fill="#adb5bd" />
        <circle cx="100" cy="40" r="10" fill="#e7f5ff" />
      </svg>,
      // 트레비 분수
      <svg key="trevi" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="60" width="120" height="90" fill="#adb5bd" />
        <path d="M40,60 Q100,30 160,60" fill="#adb5bd" />
        <rect x="60" y="80" width="20" height="40" fill="#e7f5ff" />
        <rect x="90" y="80" width="20" height="40" fill="#e7f5ff" />
        <rect x="120" y="80" width="20" height="40" fill="#e7f5ff" />
        <path d="M70,130 Q100,100 130,130" fill="#4dabf7" fillOpacity="0.5" />
        <path d="M80,130 Q100,110 120,130" fill="#4dabf7" fillOpacity="0.5" />
        <path d="M90,130 Q100,120 110,130" fill="#4dabf7" fillOpacity="0.5" />
      </svg>,
      // 판테온
      <svg key="pantheon" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="50" y="80" width="100" height="70" fill="#adb5bd" />
        <path d="M50,80 Q100,30 150,80" fill="#adb5bd" />
        <rect x="90" y="120" width="20" height="30" fill="#e7f5ff" />
        <circle cx="100" cy="60" r="15" fill="#e7f5ff" />
        <rect x="40" y="80" width="10" height="70" fill="#adb5bd" />
        <rect x="150" y="80" width="10" height="70" fill="#adb5bd" />
      </svg>,
    ]
    return attractions[index % attractions.length]
  } else if (cityName === "방콕") {
    const attractions = [
      // 왕궁
      <svg key="palace" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="70" width="120" height="80" fill="#adb5bd" />
        <path d="M40,70 L100,40 L160,70" fill="#ffd43b" />
        <rect x="70" y="100" width="20" height="50" fill="#e7f5ff" />
        <rect x="110" y="100" width="20" height="50" fill="#e7f5ff" />
        <path d="M40,70 L60,50 L80,70" fill="#ff922b" />
        <path d="M80,70 L100,50 L120,70" fill="#ff922b" />
        <path d="M120,70 L140,50 L160,70" fill="#ff922b" />
      </svg>,
      // 왓 아룬
      <svg key="watarun" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <path d="M100,140 L60,70 L140,70 Z" fill="#ffd43b" />
        <path d="M100,70 L80,40 L120,40 Z" fill="#ff922b" />
        <path d="M100,40 L90,20 L110,20 Z" fill="#ffd43b" />
        <rect x="97" y="20" width="6" height="20" fill="#ff922b" />
        <circle cx="100" cy="15" r="5" fill="#ffd43b" />
        <rect x="50" y="140" width="100" height="10" fill="#adb5bd" />
      </svg>,
      // 차투착 주말 시장
      <svg key="chatuchak" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="30" y="70" width="30" height="30" fill="#ffd43b" />
        <rect x="70" y="70" width="30" height="30" fill="#ff922b" />
        <rect x="110" y="70" width="30" height="30" fill="#ffd43b" />
        <rect x="150" y="70" width="30" height="30" fill="#ff922b" />
        <rect x="30" y="110" width="30" height="30" fill="#ff922b" />
        <rect x="70" y="110" width="30" height="30" fill="#ffd43b" />
        <rect x="110" y="110" width="30" height="30" fill="#ff922b" />
        <rect x="150" y="110" width="30" height="30" fill="#ffd43b" />
        <rect x="20" y="60" width="170" height="10" fill="#adb5bd" />
        <rect x="20" y="100" width="170" height="10" fill="#adb5bd" />
        <rect x="20" y="140" width="170" height="10" fill="#adb5bd" />
        <rect x="20" y="60" width="10" height="90" fill="#adb5bd" />
        <rect x="180" y="60" width="10" height="90" fill="#adb5bd" />
      </svg>,
      // 왓 포
      <svg key="watpho" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="90" width="120" height="40" fill="#adb5bd" />
        <path d="M40,90 L100,60 L160,90" fill="#ffd43b" />
        <ellipse cx="100" cy="110" rx="40" ry="10" fill="#ff922b" />
        <path d="M60,110 Q100,90 140,110" fill="#ffd43b" />
        <rect x="30" y="130" width="140" height="10" fill="#adb5bd" />
      </svg>,
    ]
    return attractions[index % attractions.length]
  } else {
    return <div className="flex h-full items-center justify-center">일러스트레이션을 찾을 수 없습니다.</div>
  }
}

// 음식 일러스트레이션 컴포넌트
function FoodIllustration({ cityName, index }) {
  if (cityName === "도쿄") {
    const foods = [
      // 스시
      <svg key="sushi" viewBox="0 0 200 150" className="h-full w-full">
        <rect x="0" y="0" width="200" height="150" fill="#e7f5ff" />
        <rect x="40" y="60" width="120" height="30" fill="#ff6b6b" />
        <rect x="40" y="90" width="120" height="20" fill="white" />
        <ellipse cx="70" cy="75" rx="15" ry="10" fill="#ff922b" />
        <ellipse cx="110" cy="75" rx="15" ry="10" fill="#51cf66" />
        <ellipse cx="150" cy="75" rx="15" ry="10" fill="#ff6b6b" />
        <rect x="50" y="110" width="100" height="5" fill="#adb5bd" />
        </svg> ];

return <>{foods[index % foods.length]}</>;
}

return (
  <div className="flex h-full items-center justify-center text-sm text-gray-500">
    도시 일러스트 없음
  </div>
);
};