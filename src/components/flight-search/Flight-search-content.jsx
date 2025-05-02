import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Users, Luggage } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../modules/Tabs";
import { Badge } from "../../modules/Badge";
import { Input } from "../../modules/Input";
import { Label } from "../../modules/Label";
import { RadioGroup, RadioGroupItem } from "../../modules/Radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../../modules/Popover";
import { DateRangePicker } from "../../modules/DateRangePicker";

// 항공권 데이터 (실제로는 API에서 가져올 것)
const flightData = [
  {
    id: "1",
    airline: "대한항공",
    logo: "KE",
    departure: "06:30",
    arrival: "09:45",
    duration: "3시간 15분",
    from: "인천 (ICN)",
    to: "도쿄 (NRT)",
    price: 350000,
    stops: "직항",
    color: "bg-traveling-pink",
  },
  {
    id: "2",
    airline: "아시아나항공",
    logo: "OZ",
    departure: "10:20",
    arrival: "13:30",
    duration: "3시간 10분",
    from: "인천 (ICN)",
    to: "도쿄 (HND)",
    price: 320000,
    stops: "직항",
    color: "bg-traveling-mint",
  },
  {
    id: "3",
    airline: "제주항공",
    logo: "7C",
    departure: "14:45",
    arrival: "18:10",
    duration: "3시간 25분",
    from: "인천 (ICN)",
    to: "도쿄 (NRT)",
    price: 280000,
    stops: "직항",
    color: "bg-traveling-mint",
  },
  {
    id: "4",
    airline: "진에어",
    logo: "LJ",
    departure: "08:15",
    arrival: "13:40",
    duration: "5시간 25분",
    from: "인천 (ICN)",
    to: "도쿄 (NRT)",
    price: 250000,
    stops: "1회 경유",
    stopDetails: "오사카 (KIX) - 1시간 30분 대기",
    color: "bg-traveling-light-yellow",
  },
  {
    id: "5",
    airline: "에어서울",
    logo: "RS",
    departure: "19:30",
    arrival: "22:45",
    duration: "3시간 15분",
    from: "인천 (ICN)",
    to: "도쿄 (HND)",
    price: 290000,
    stops: "직항",
    color: "bg-traveling-pink",
  },
  {
    id: "6",
    airline: "대한항공",
    logo: "KE",
    departure: "08:45",
    arrival: "10:05",
    duration: "1시간 20분",
    from: "인천 (ICN)",
    to: "후쿠오카 (FUK)",
    price: 280000,
    stops: "직항",
    color: "bg-traveling-pink",
  },
  {
    id: "7",
    airline: "아시아나항공",
    logo: "OZ",
    departure: "13:30",
    arrival: "14:50",
    duration: "1시간 20분",
    from: "인천 (ICN)",
    to: "후쿠오카 (FUK)",
    price: 265000,
    stops: "직항",
    color: "bg-traveling-mint",
  },
  {
    id: "8",
    airline: "제주항공",
    logo: "7C",
    departure: "19:15",
    arrival: "20:35",
    duration: "1시간 20분",
    from: "인천 (ICN)",
    to: "후쿠오카 (FUK)",
    price: 210000,
    stops: "직항",
    color: "bg-traveling-light-yellow",
  },
]

// 인기 목적지 데이터
const popularDestinations = [
  { name: "도쿄", code: "TYO", country: "일본", price: 280000 },
  { name: "오사카", code: "OSA", country: "일본", price: 250000 },
  { name: "후쿠오카", code: "FUK", country: "일본", price: 210000 },
  { name: "방콕", code: "BKK", country: "태국", price: 320000 },
  { name: "싱가포르", code: "SIN", country: "싱가포르", price: 450000 },
  { name: "파리", code: "PAR", country: "프랑스", price: 950000 },
]

export function FlightSearchContent() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    from: "인천 (ICN)",
    to: "",
    tripType: "roundtrip",
    passengers: 1,
    cabinClass: "economy",
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [sortBy, setSortBy] = useState("price")
  const [filteredFlights, setFilteredFlights] = useState(flightData)

  const handleSearch = () => {
    // 실제로는 API 호출을 통해 검색 결과를 가져올 것
    const filtered = flightData.filter((flight) => {
      if (searchParams.to && !flight.to.toLowerCase().includes(searchParams.to.toLowerCase())) {
        return false
      }
      return true
    })
    setFilteredFlights(filtered)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    const sorted = [...filteredFlights]
    if (value === "price") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (value === "duration") {
      sorted.sort((a, b) => a.duration.localeCompare(b.duration))
    } else if (value === "departure") {
      sorted.sort((a, b) => a.departure.localeCompare(b.departure))
    }
    setFilteredFlights(sorted)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-white shadow-md">
        <CardContent className="p-6">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="flights" className="text-traveling-text">
                항공권
              </TabsTrigger>
              <TabsTrigger value="hotels" className="text-traveling-text">
                호텔
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="from" className="mb-2 block text-traveling-text">
                    출발지
                  </Label>
                  <Input
                    id="from"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                    className="bg-traveling-light-blue border-traveling-text/30"
                    placeholder="출발 공항"
                  />
                </div>
                <div>
                  <Label htmlFor="to" className="mb-2 block text-traveling-text">
                    도착지
                  </Label>
                  <Input
                    id="to"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                    className="bg-traveling-light-blue border-traveling-text/30"
                    placeholder="도착 공항"
                  />
                </div>
                <div>
                  <Label htmlFor="dates" className="mb-2 block text-traveling-text">
                    날짜
                  </Label>
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    className="bg-traveling-light-blue border-traveling-text/30"
                  />
                </div>
                <div>
                  <Label htmlFor="passengers" className="mb-2 block text-traveling-text">
                    탑승객 및 좌석 등급
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        {searchParams.passengers}명, {searchParams.cabinClass === "economy" ? "일반석" : "비즈니스석"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="passenger-count" className="text-traveling-text">
                            탑승객 수
                          </Label>
                          <div className="mt-2 flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                              onClick={() =>
                                setSearchParams({
                                  ...searchParams,
                                  passengers: Math.max(1, searchParams.passengers - 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <span className="mx-4 w-4 text-center text-traveling-text">{searchParams.passengers}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                              onClick={() =>
                                setSearchParams({
                                  ...searchParams,
                                  passengers: Math.min(9, searchParams.passengers + 1),
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-traveling-text">좌석 등급</Label>
                          <RadioGroup
                            value={searchParams.cabinClass}
                            onValueChange={(value) => setSearchParams({ ...searchParams, cabinClass: value })}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="economy" id="economy" />
                              <Label htmlFor="economy" className="text-traveling-text">
                                일반석
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="business" />
                              <Label htmlFor="business" className="text-traveling-text">
                                비즈니스석
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <RadioGroup
                  value={searchParams.tripType}
                  onValueChange={(value) => setSearchParams({ ...searchParams, tripType: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundtrip" id="roundtrip" />
                    <Label htmlFor="roundtrip" className="text-traveling-text">
                      왕복
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneway" id="oneway" />
                    <Label htmlFor="oneway" className="text-traveling-text">
                      편도
                    </Label>
                  </div>
                </RadioGroup>

                <Button className="rounded-full btn-flight" onClick={handleSearch}>
                  항공권 검색
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="hotels" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="hotel-destination" className="mb-2 block text-traveling-text">
                    목적지
                  </Label>
                  <Input
                    id="hotel-destination"
                    className="bg-traveling-light-blue border-traveling-text/30"
                    placeholder="도시, 지역, 호텔명"
                  />
                </div>
                <div>
                  <Label htmlFor="hotel-dates" className="mb-2 block text-traveling-text">
                    체크인/체크아웃
                  </Label>
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    className="bg-traveling-light-blue border-traveling-text/30"
                  />
                </div>
                <div>
                  <Label htmlFor="hotel-guests" className="mb-2 block text-traveling-text">
                    객실 및 인원
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        객실 1개, 성인 2명
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-traveling-text">객실 수</Label>
                          <div className="mt-2 flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              -
                            </Button>
                            <span className="mx-4 w-4 text-center text-traveling-text">1</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-traveling-text">성인</Label>
                          <div className="mt-2 flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              -
                            </Button>
                            <span className="mx-4 w-4 text-center text-traveling-text">2</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-traveling-text">어린이</Label>
                          <div className="mt-2 flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              -
                            </Button>
                            <span className="mx-4 w-4 text-center text-traveling-text">0</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0 text-traveling-text"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-end">
                  <Button className="w-full rounded-full btn-flight">호텔 검색</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-traveling-text">검색 결과</h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort" className="text-sm text-traveling-text">
                정렬:
              </Label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-md border border-traveling-text/30 bg-traveling-light-blue px-2 py-1 text-sm text-traveling-text"
              >
                <option value="price">가격 낮은순</option>
                <option value="duration">소요시간 짧은순</option>
                <option value="departure">출발시간 빠른순</option>
              </select>
            </div>
          </div>

          {filteredFlights.length > 0 ? (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden bg-white shadow-md">
                  <CardContent className="p-0">
                    <div className="flex flex-col p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${flight.color} text-white`}
                        >
                          <span className="font-bold">{flight.logo}</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-traveling-text">{flight.airline}</h3>
                          <Badge
                            className={`${
                              flight.stops === "직항"
                                ? "bg-traveling-mint"
                                : flight.stops === "1회 경유"
                                  ? "bg-traveling-pink"
                                  : "bg-red-500"
                            } text-white`}
                          >
                            {flight.stops}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-center justify-center space-x-4 md:mt-0">
                        <div className="text-center">
                          <div className="text-lg font-bold text-traveling-text">{flight.departure}</div>
                          <div className="text-sm text-traveling-text/70">{flight.from}</div>
                        </div>

                        <div className="flex flex-1 flex-col items-center">
                          <div className="text-xs text-traveling-text/70">{flight.duration}</div>
                          <div className="relative w-full">
                            <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10"></div>
                            <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
                          </div>
                          {flight.stopDetails && (
                            <div className="mt-1 text-xs text-traveling-pink">{flight.stopDetails}</div>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold text-traveling-text">{flight.arrival}</div>
                          <div className="text-sm text-traveling-text/70">{flight.to}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-end md:mt-0">
                        <div className="text-lg font-bold text-traveling-text">{formatPrice(flight.price)}</div>
                        <Button
                          className="mt-2 rounded-full btn-flight"
                          onClick={() => router.push(`/flight-search/${flight.id}`)}
                        >
                          선택하기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-traveling-light-blue p-8 text-center">
              <Luggage className="mb-4 h-12 w-12 text-traveling-text/50" />
              <h3 className="text-lg font-medium text-traveling-text">검색 결과가 없습니다</h3>
              <p className="mt-2 text-traveling-text/70">다른 날짜나 목적지로 검색해 보세요.</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-traveling-text">인기 목적지</h2>
          <div className="space-y-4">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden bg-white shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-traveling-text">{destination.name}</h3>
                      <p className="text-sm text-traveling-text/70">{destination.country}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-traveling-text/70">최저가</div>
                      <div className="font-bold text-traveling-text">{formatPrice(destination.price)}</div>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="mt-2 p-0 text-traveling-mint"
                    onClick={() => {
                      setSearchParams({ ...searchParams, to: destination.name })
                      handleSearch()
                    }}
                  >
                    항공권 보기 <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-traveling-light-blue p-4">
            <h3 className="mb-2 font-medium text-traveling-text">여행 팁</h3>
            <ul className="space-y-2 text-sm text-traveling-text/70">
              <li className="flex items-start">
                <Calendar className="mr-2 h-4 w-4 text-traveling-mint" />
                <span>주중에 예약하면 보통 더 저렴합니다.</span>
              </li>
              <li className="flex items-start">
                <Luggage className="mr-2 h-4 w-4 text-traveling-mint" />
                <span>수하물 규정을 미리 확인하세요.</span>
              </li>
              <li className="flex items-start">
                <Users className="mr-2 h-4 w-4 text-traveling-mint" />
                <span>단체 예약은 할인 혜택이 있을 수 있습니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightSearchContent;