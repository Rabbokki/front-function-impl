import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Filter, Luggage, Plane, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    color: "bg-blue-500",
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
    color: "bg-blue-400",
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
    color: "bg-orange-500",
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
    color: "bg-green-500",
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
    color: "bg-red-500",
  },
  {
    id: "6",
    airline: "티웨이항공",
    logo: "TW",
    departure: "12:15",
    arrival: "15:30",
    duration: "3시간 15분",
    from: "인천 (ICN)",
    to: "도쿄 (NRT)",
    price: 260000,
    stops: "직항",
    color: "bg-red-400",
  },
  {
    id: "7",
    airline: "에어부산",
    logo: "BX",
    departure: "07:45",
    arrival: "11:00",
    duration: "3시간 15분",
    from: "인천 (ICN)",
    to: "도쿄 (NRT)",
    price: 275000,
    stops: "직항",
    color: "bg-blue-300",
  },
  {
    id: "8",
    airline: "이스타항공",
    logo: "ZE",
    departure: "16:30",
    arrival: "19:45",
    duration: "3시간 15분",
    from: "인천 (ICN)",
    to: "도쿄 (HND)",
    price: 265000,
    stops: "직항",
    color: "bg-yellow-500",
  },
]

// 항공사 목록
const airlines = [
  { id: "KE", name: "대한항공" },
  { id: "OZ", name: "아시아나항공" },
  { id: "7C", name: "제주항공" },
  { id: "LJ", name: "진에어" },
  { id: "RS", name: "에어서울" },
  { id: "TW", name: "티웨이항공" },
  { id: "BX", name: "에어부산" },
  { id: "ZE", name: "이스타항공" },
]

export function FlightSearchResults({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; return?: string; passengers?: string }
}) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState("price")
  const [filteredFlights, setFilteredFlights] = useState(flightData)
  const [priceRange, setPriceRange] = useState([200000, 400000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // 필터 적용
  useEffect(() => {
    let filtered = [...flightData]

    // 가격 필터
    filtered = filtered.filter((flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1])

    // 항공사 필터
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedAirlines.includes(airlines.find((a) => a.name === flight.airline)?.id || ""),
      )
    }

    // 출발 시간 필터
    if (departureTime.length > 0) {
      filtered = filtered.filter((flight) => {
        const hour = Number.parseInt(flight.departure.split(":")[0])
        if (departureTime.includes("morning") && hour >= 6 && hour < 12) return true
        if (departureTime.includes("afternoon") && hour >= 12 && hour < 18) return true
        if (departureTime.includes("evening") && hour >= 18) return true
        if (departureTime.includes("night") && (hour < 6 || hour >= 21)) return true
        return departureTime.length === 0
      })
    }

    // 정렬
    const sorted = [...filtered]
    if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => {
        const durationA = Number.parseInt(a.duration.split("시간")[0])
        const durationB = Number.parseInt(b.duration.split("시간")[0])
        return durationA - durationB
      })
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => {
        const hourA = Number.parseInt(a.departure.split(":")[0])
        const minA = Number.parseInt(a.departure.split(":")[1])
        const hourB = Number.parseInt(b.departure.split(":")[0])
        const minB = Number.parseInt(b.departure.split(":")[1])
        return hourA * 60 + minA - (hourB * 60 + minB)
      })
    }

    setFilteredFlights(sorted)
  }, [sortBy, priceRange, selectedAirlines, departureTime])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAirlineChange = (airlineId: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineId) ? prev.filter((id) => id !== airlineId) : [...prev, airlineId],
    )
  }

  const handleDepartureTimeChange = (time: string) => {
    setDepartureTime((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const resetFilters = () => {
    setPriceRange([200000, 400000])
    setSelectedAirlines([])
    setDepartureTime([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 조건 요약 */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Badge className="bg-orange-500">왕복</Badge>
              <span className="mx-2 text-sm text-gray-500">|</span>
              <span className="text-sm font-medium">
                {searchParams.from || "인천 (ICN)"} → {searchParams.to || "도쿄 (NRT)"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="mx-2 text-sm text-gray-500">|</span>
              <Calendar className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {searchParams.date || "2023-06-15"} ~ {searchParams.return || "2023-06-22"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="mx-2 text-sm text-gray-500">|</span>
              <Users className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm">{searchParams.passengers || "1"}명</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={() => router.push("/flight-search")}
          >
            검색 수정
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* 필터 사이드바 (데스크톱) */}
        <div className="hidden md:block">
          <div className="sticky top-4 rounded-lg bg-white p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">필터</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500" onClick={resetFilters}>
                초기화
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={["price", "airline", "departure"]}>
              <AccordionItem value="price">
                <AccordionTrigger>가격</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">{formatPrice(priceRange[0])}</span>
                      <span className="text-sm">{formatPrice(priceRange[1])}</span>
                    </div>
                    <Slider
                      defaultValue={[200000, 400000]}
                      min={200000}
                      max={400000}
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="airline">
                <AccordionTrigger>항공사</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {airlines.map((airline) => (
                      <div key={airline.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`airline-${airline.id}`}
                          checked={selectedAirlines.includes(airline.id)}
                          onCheckedChange={() => handleAirlineChange(airline.id)}
                        />
                        <Label htmlFor={`airline-${airline.id}`} className="text-sm font-normal">
                          {airline.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="departure">
                <AccordionTrigger>출발 시간</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="morning"
                        checked={departureTime.includes("morning")}
                        onCheckedChange={() => handleDepartureTimeChange("morning")}
                      />
                      <Label htmlFor="morning" className="text-sm font-normal">
                        아침 (06:00 - 11:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="afternoon"
                        checked={departureTime.includes("afternoon")}
                        onCheckedChange={() => handleDepartureTimeChange("afternoon")}
                      />
                      <Label htmlFor="afternoon" className="text-sm font-normal">
                        오후 (12:00 - 17:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="evening"
                        checked={departureTime.includes("evening")}
                        onCheckedChange={() => handleDepartureTimeChange("evening")}
                      />
                      <Label htmlFor="evening" className="text-sm font-normal">
                        저녁 (18:00 - 20:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="night"
                        checked={departureTime.includes("night")}
                        onCheckedChange={() => handleDepartureTimeChange("night")}
                      />
                      <Label htmlFor="night" className="text-sm font-normal">
                        심야 (21:00 - 05:59)
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="md:col-span-3">
          {/* 모바일 필터 버튼 */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              필터
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">가격 낮은순</SelectItem>
                <SelectItem value="duration">소요시간 짧은순</SelectItem>
                <SelectItem value="departure">출발시간 빠른순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 모바일 필터 패널 */}
          {showFilters && (
            <div className="mb-4 rounded-lg bg-white p-4 shadow-md md:hidden">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">필터</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500" onClick={resetFilters}>
                    초기화
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 p-0 text-gray-500"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="price">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="price">가격</TabsTrigger>
                  <TabsTrigger value="airline">항공사</TabsTrigger>
                  <TabsTrigger value="departure">출발 시간</TabsTrigger>
                </TabsList>
                <TabsContent value="price" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">{formatPrice(priceRange[0])}</span>
                      <span className="text-sm">{formatPrice(priceRange[1])}</span>
                    </div>
                    <Slider
                      defaultValue={[200000, 400000]}
                      min={200000}
                      max={400000}
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="airline" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {airlines.map((airline) => (
                      <div key={airline.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-airline-${airline.id}`}
                          checked={selectedAirlines.includes(airline.id)}
                          onCheckedChange={() => handleAirlineChange(airline.id)}
                        />
                        <Label htmlFor={`mobile-airline-${airline.id}`} className="text-sm font-normal">
                          {airline.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="departure" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-morning"
                        checked={departureTime.includes("morning")}
                        onCheckedChange={() => handleDepartureTimeChange("morning")}
                      />
                      <Label htmlFor="mobile-morning" className="text-sm font-normal">
                        아침 (06:00 - 11:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-afternoon"
                        checked={departureTime.includes("afternoon")}
                        onCheckedChange={() => handleDepartureTimeChange("afternoon")}
                      />
                      <Label htmlFor="mobile-afternoon" className="text-sm font-normal">
                        오후 (12:00 - 17:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-evening"
                        checked={departureTime.includes("evening")}
                        onCheckedChange={() => handleDepartureTimeChange("evening")}
                      />
                      <Label htmlFor="mobile-evening" className="text-sm font-normal">
                        저녁 (18:00 - 20:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-night"
                        checked={departureTime.includes("night")}
                        onCheckedChange={() => handleDepartureTimeChange("night")}
                      />
                      <Label htmlFor="mobile-night" className="text-sm font-normal">
                        심야 (21:00 - 05:59)
                      </Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* 정렬 옵션 (데스크톱) */}
          <div className="mb-4 hidden items-center justify-between rounded-lg bg-white p-4 shadow-md md:flex">
            <div className="flex items-center">
              <span className="text-sm font-medium">검색 결과: {filteredFlights.length}개</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">가격 낮은순</SelectItem>
                <SelectItem value="duration">소요시간 짧은순</SelectItem>
                <SelectItem value="departure">출발시간 빠른순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 항공권 목록 */}
          {filteredFlights.length > 0 ? (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden bg-white shadow-md">
                  <CardContent className="p-0">
                    <div className="border-b border-gray-100 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${flight.color} text-white`}
                          >
                            <span className="font-bold">{flight.logo}</span>
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">{flight.airline}</h3>
                            <p className="text-xs text-gray-500">
                              {flight.from.split(" ")[0]} → {flight.to.split(" ")[0]}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            flight.stops === "직항"
                              ? "bg-green-500"
                              : flight.stops === "1회 경유"
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                        >
                          {flight.stops}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex flex-1 items-center justify-between md:justify-start md:gap-12">
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.departure}</div>
                            <div className="text-xs text-gray-500">
                              {flight.from.split(" ")[1].replace(/[()]/g, "")}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              {flight.duration}
                            </div>
                            <div className="relative my-1 w-20 md:w-32">
                              <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
                              <Plane className="relative mx-auto h-3 w-3 rotate-90 text-gray-400" />
                            </div>
                            {flight.stopDetails && <div className="text-xs text-orange-500">{flight.stopDetails}</div>}
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.arrival}</div>
                            <div className="text-xs text-gray-500">{flight.to.split(" ")[1].replace(/[()]/g, "")}</div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end border-t pt-4 md:border-t-0 md:pt-0">
                          <div className="text-lg font-bold text-orange-500">{formatPrice(flight.price)}</div>
                          <Button
                            className="mt-2 bg-orange-500 hover:bg-orange-600"
                            onClick={() => router.push(`/flight-search/${flight.id}`)}
                          >
                            선택하기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md">
              <Luggage className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium">검색 결과가 없습니다</h3>
              <p className="mt-2 text-gray-500">다른 검색 조건으로 다시 시도해 보세요.</p>
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/flight-search")}>
                검색 수정하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
