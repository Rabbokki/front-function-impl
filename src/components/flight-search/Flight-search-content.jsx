import React, { useState,useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Calendar, Search, MapPin, Filter, Clock, ArrowRight, Users } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { Badge } from "../../modules/Badge";
import { Input } from "../../modules/Input";
import { Label } from "../../modules/Label";
import { RadioGroup, RadioGroupItem } from "../../modules/Radio-group";
import { Slider } from "../../modules/Slider";
import { Checkbox } from "../../modules/Checkbox";
import { DatePickerWithRange } from "../../modules/Date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../modules/Select";

// 항공권 데이터 (실제로는 API에서 가져올 것)

export function FlightSearchContent() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("roundtrip");
  const [showResults, setShowResults] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [departureTime, setDepartureTime] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [stops, setStops] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const handleSearch = () => {
    setShowResults(true);
  };

  const toggleDepartureTime = (time) => {
    if (departureTime.includes(time)) {
      setDepartureTime(departureTime.filter((t) => t !== time));
    } else {
      setDepartureTime([...departureTime, time]);
    }
  };

  const toggleAirline = (airline) => {
    if (airlines.includes(airline)) {
      setAirlines(airlines.filter((a) => a !== airline));
    } else {
      setAirlines([...airlines, airline]);
    }
  };

  const toggleStops = (stop) => {
    if (stops.includes(stop)) {
      setStops(stops.filter((s) => s !== stop));
    } else {
      setStops([...stops, stop]);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFlightSelect = (flightId) => {
    navigate(`/flight-search/${flightId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-white shadow-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <RadioGroup
              value={tripType}
              onValueChange={setTripType}
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multicity" id="multicity" />
                <Label htmlFor="multicity" className="text-traveling-text">
                  다구간
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="departure" className="mb-2 block text-traveling-text">
                출발지
              </Label>
              <div className="relative">
                <Select defaultValue="ICN">
                  <SelectTrigger
                    id="departure"
                    className="bg-traveling-light-blue pl-10 border-traveling-text/30 text-traveling-text"
                  >
                    <SelectValue placeholder="도시 또는 공항" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ICN">서울 (인천 - ICN)</SelectItem>
                    <SelectItem value="GMP">서울 (김포 - GMP)</SelectItem>
                    <SelectItem value="PUS">부산 (김해 - PUS)</SelectItem>
                    <SelectItem value="CJU">제주 (CJU)</SelectItem>
                    <SelectItem value="TAE">대구 (TAE)</SelectItem>
                  </SelectContent>
                </Select>
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-text z-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="arrival" className="mb-2 block text-traveling-text">
                도착지
              </Label>
              <div className="relative">
                <Select defaultValue="FUK">
                  <SelectTrigger
                    id="arrival"
                    className="bg-traveling-light-blue pl-10 border-traveling-text/30 text-traveling-text"
                  >
                    <SelectValue placeholder="도시 또는 공항" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FUK">후쿠오카 (FUK)</SelectItem>
                    <SelectItem value="NRT">도쿄 (나리타 - NRT)</SelectItem>
                    <SelectItem value="HND">도쿄 (하네다 - HND)</SelectItem>
                    <SelectItem value="KIX">오사카 (KIX)</SelectItem>
                    <SelectItem value="NGO">나고야 (NGO)</SelectItem>
                    <SelectItem value="CTS">삿포로 (CTS)</SelectItem>
                    <SelectItem value="OKA">오키나와 (OKA)</SelectItem>
                    <SelectItem value="BKK">방콕 (BKK)</SelectItem>
                    <SelectItem value="SIN">싱가포르 (SIN)</SelectItem>
                    <SelectItem value="CDG">파리 (CDG)</SelectItem>
                    <SelectItem value="FCO">로마 (FCO)</SelectItem>
                    <SelectItem value="VCE">베니스 (VCE)</SelectItem>
                  </SelectContent>
                </Select>
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-text z-10" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-1">
            <div>
              <Label htmlFor="dates" className="mb-2 block text-traveling-text">
                {tripType === "roundtrip" ? "출발일/귀국일" : "출발일"}
              </Label>
              <DatePickerWithRange
                id="dates"
                date={dateRange}
                onDateChange={(range) => {
                  setDateRange(range || { from: null, to: null });
                }}
                className="bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="passengers" className="mb-2 block text-traveling-text">
                승객
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  id="passengers"
                  className="bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
                >
                  <SelectValue placeholder="승객 수 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">성인 1명</SelectItem>
                  <SelectItem value="2">성인 2명</SelectItem>
                  <SelectItem value="3">성인 3명</SelectItem>
                  <SelectItem value="4">성인 4명</SelectItem>
                  <SelectItem value="5">성인 5명</SelectItem>
                  <SelectItem value="6">성인 6명</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cabin-class" className="mb-2 block text-traveling-text">
                좌석 등급
              </Label>
              <Select defaultValue="economy">
                <SelectTrigger
                  id="cabin-class"
                  className="bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
                >
                  <SelectValue placeholder="좌석 등급 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">일반석</SelectItem>
                  <SelectItem value="premium">프리미엄 일반석</SelectItem>
                  <SelectItem value="business">비즈니스석</SelectItem>
                  <SelectItem value="first">일등석</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="promotion-code" className="mb-2 block text-traveling-text">
                프로모션 코드
              </Label>
              <Input
                id="promotion-code"
                placeholder="코드 입력 (선택사항)"
                className="bg-traveling-light-blue border-traveling-text/30 text-traveling-text"
              />
            </div>
          </div>

          <Button
            className="mt-8 w-full rounded-full btn-flight"
            onClick={handleSearch}
          >
            

            <Search className="mr-2 h-4 w-4" />
            항공권 검색
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <Card className="bg-white p-4 shadow-md">
              <h2 className="mb-4 flex items-center text-lg font-bold text-traveling-text">
                <Filter className="mr-2 h-5 w-5" />
                필터
              </h2>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-text">가격 범위</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 2000000]}
                    max={2000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-traveling-text/70">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm text-traveling-text/70">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-text">출발 시간</h3>
                <div className="space-y-2">
                  {["새벽 (00:00-06:00)", "오전 (06:00-12:00)", "오후 (12:00-18:00)", "저녁 (18:00-24:00)"].map(
                    (time) => (
                      <div key={time} className="flex items-center">
                        <Checkbox
                          id={`time-${time}`}
                          checked={departureTime.includes(time)}
                          onCheckedChange={() => toggleDepartureTime(time)}
                        />
                        <Label htmlFor={`time-${time}`} className="ml-2 text-sm text-traveling-text/70">
                          {time}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-text">항공사</h3>
                <div className="space-y-2">
                  {["대한항공", "아시아나항공", "제주항공", "진에어", "에어서울"].map((airline) => (
                    <div key={airline} className="flex items-center">
                      <Checkbox
                        id={`airline-${airline}`}
                        checked={airlines.includes(airline)}
                        onCheckedChange={() => toggleAirline(airline)}
                      />
                      <Label htmlFor={`airline-${airline}`} className="ml-2 text-sm text-traveling-text/70">
                        {airline}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-text">경유</h3>
                <div className="space-y-2">
                  {["직항", "1회 경유", "2회 이상 경유"].map((stop) => (
                    <div key={stop} className="flex items-center">
                      <Checkbox
                        id={`stop-${stop}`}
                        checked={stops.includes(stop)}
                        onCheckedChange={() => toggleStops(stop)}
                      />
                      <Label htmlFor={`stop-${stop}`} className="ml-2 text-sm text-traveling-text/70">
                        {stop}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full rounded-full btn-flight">
                필터 적용
              </Button>
            </Card>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-traveling-text">검색 결과</h2>
              <Select defaultValue="price">
                <SelectTrigger className="w-[180px] bg-white border-traveling-text/30 text-traveling-text">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">가격 낮은순</SelectItem>
                  <SelectItem value="price-desc">가격 높은순</SelectItem>
                  <SelectItem value="duration">소요시간 짧은순</SelectItem>
                  <SelectItem value="departure">출발시간 빠른순</SelectItem>
                  <SelectItem value="arrival">도착시간 빠른순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {[
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
              ].map((flight) => (
                <Card
                  key={flight.id}
                  className="overflow-hidden bg-white shadow-md transition-transform hover:scale-[1.01]"
                >
                  <CardContent className="p-0">
                    <div className="border-b border-traveling-text/10 bg-traveling-light-blue p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${flight.color}`}
                          >
                            <span className="font-bold text-white">{flight.logo}</span>
                          </div>
                          <span className="ml-3 font-medium text-traveling-text">{flight.airline}</span>
                        </div>
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

                    <div className="p-4">
                      <div className="flex flex-col justify-between md:flex-row">
                        <div className="flex items-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-traveling-text">{flight.departure}</div>
                            <div className="text-sm text-traveling-text/70">{flight.from}</div>
                          </div>

                          <div className="mx-4 flex flex-1 flex-col items-center">
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

                        <div className="mt-4 flex flex-col items-end justify-center md:mt-0">
                          <div className="text-xl font-bold text-traveling-text">{formatPrice(flight.price)}</div>
                          <div className="text-sm text-traveling-text/70">1인당</div>
                          <Button
                            className="mt-2 rounded-full btn-flight"
                            onClick={() => handleFlightSelect(flight.id)}
                          >
                            선택
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-sm text-traveling-text/70">
                          <Users className="mr-1 h-4 w-4 text-traveling-text" />
                          <span>남은 좌석: 8석</span>
                        </div>
                        <div className="flex items-center text-sm text-traveling-text/70">
                          <Clock className="mr-1 h-4 w-4 text-traveling-text" />
                          <span>수하물 20kg 포함</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className={
                      page === 1
                        ? "bg-traveling-mint text-white hover:bg-traveling-mint/90 rounded-full"
                        : "border-traveling-text/30 text-traveling-text rounded-full"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightSearchContent;