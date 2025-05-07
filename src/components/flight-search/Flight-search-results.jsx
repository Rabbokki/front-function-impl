import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, Filter, Luggage, Plane, Users, X } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { Slider } from "../../modules/Slider";
import { Badge } from "../../modules/Badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../modules/Accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../modules/Select";
import { Checkbox } from "../../modules/Checkbox";
import { Label } from "../../modules/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../modules/Tabs";
import axios from "axios";
// 항공사 목록 (API 응답에서 동적으로 가져올 수 있음)
function FilterPanel({
  priceRange,
  setPriceRange,
  selectedAirlines,
  handleAirlineChange,
  departureTime,
  handleDepartureTimeChange,
  resetFilters,
  isMobile,
  setShowFilters,
  airlines,
}) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className={`rounded-lg bg-white p-4 shadow-md ${isMobile ? "mb-4" : "sticky top-4"}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">필터</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-gray-500 hover:bg-gray-100"
            onClick={resetFilters}
          >
            초기화
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 text-gray-500 hover:bg-gray-100"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      {isMobile ? (
        <Tabs defaultValue="price">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-md">
            <TabsTrigger value="price" className="text-sm py-2">가격</TabsTrigger>
            <TabsTrigger value="airline" className="text-sm py-2">항공사</TabsTrigger>
            <TabsTrigger value="departure" className="text-sm py-2">출발 시간</TabsTrigger>
          </TabsList>
          <TabsContent value="price" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <Slider
                defaultValue={[200000, 1000000]}
                min={200000}
                max={1000000}
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
                    className="h-4 w-4 border-gray-300 text-orange-500"
                  />
                  <Label htmlFor={`mobile-airline-${airline.id}`} className="text-sm text-gray-700">
                    {airline.name}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="departure" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "morning", label: "아침 (06:00 - 11:59)" },
                { id: "afternoon", label: "오후 (12:00 - 17:59)" },
                { id: "evening", label: "저녁 (18:00 - 20:59)" },
                { id: "night", label: "심야 (21:00 - 05:59)" },
              ].map((time) => (
                <div key={time.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${time.id}`}
                    checked={departureTime.includes(time.id)}
                    onCheckedChange={() => handleDepartureTimeChange(time.id)}
                    className="h-4 w-4 border-gray-300 text-orange-500"
                  />
                  <Label htmlFor={`mobile-${time.id}`} className="text-sm text-gray-700">
                    {time.label}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Accordion type="multiple" defaultValue={["price", "airline", "departure"]}>
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium text-gray-800">가격</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <Slider
                  defaultValue={[200000, 1000000]}
                  min={200000}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="airline">
            <AccordionTrigger className="text-sm font-medium text-gray-800">항공사</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {airlines.map((airline) => (
                  <div key={airline.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`airline-${airline.id}`}
                      checked={selectedAirlines.includes(airline.id)}
                      onCheckedChange={() => handleAirlineChange(airline.id)}
                      className="h-4 w-4 border-gray-300 text-orange-500"
                    />
                    <Label htmlFor={`airline-${airline.id}`} className="text-sm text-gray-700">
                      {airline.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="departure">
            <AccordionTrigger className="text-sm font-medium text-gray-800">출발 시간</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[
                  { id: "morning", label: "아침 (06:00 - 11:59)" },
                  { id: "afternoon", label: "오후 (12:00 - 17:59)" },
                  { id: "evening", label: "저녁 (18:00 - 20:59)" },
                  { id: "night", label: "심야 (21:00 - 05:59)" },
                ].map((time) => (
                  <div key={time.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={time.id}
                      checked={departureTime.includes(time.id)}
                      onCheckedChange={() => handleDepartureTimeChange(time.id)}
                      className="h-4 w-4 border-gray-300 text-orange-500"
                    />
                    <Label htmlFor={time.id} className="text-sm text-gray-700">
                      {time.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

function FlightCard({ flight, navigate }) {
  const formatPrice = (price, currency) =>
    new Intl.NumberFormat(currency === "KRW" ? "ko-KR" : "en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);

  const departureTime = new Date(flight.departureTime);
  const arrivalTime = new Date(flight.arrivalTime);
  const duration = Math.round((arrivalTime - departureTime) / (1000 * 60));
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <Card className="overflow-hidden bg-white shadow-md">
      <CardContent className="p-0">
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                <span className="font-bold">{flight.carrierCode}</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">{flight.carrier}</h3>
                <p className="text-xs text-gray-500">
                  {flight.departureAirport} → {flight.arrivalAirport}
                </p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">직항</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center justify-between md:justify-start md:gap-12">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {departureTime.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-xs text-gray-500">{flight.departureAirport}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {`${hours}시간 ${minutes ? `${minutes}분` : ""}`}
                </div>
                <div className="relative my-1 w-20 md:w-32">
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
                  <Plane className="relative mx-auto h-3 w-3 rotate-90 text-gray-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {arrivalTime.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-xs text-gray-500">{flight.arrivalAirport}</div>
              </div>
            </div>
            <div className="flex flex-col items-end border-t pt-4 md:border-t-0 md:pt-0">
              <div className="text-lg font-bold text-orange-500">
                {formatPrice(parseFloat(flight.price), flight.currency)}
              </div>
              <Button
                className="mt-2 bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 py-2"
                onClick={() => navigate(`/flight-detail/${flight.id}`)}
              >
                선택하기
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FlightSearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {
    from: decodeURIComponent(searchParams.get("from") || "인천 (ICN)"),
    to: decodeURIComponent(searchParams.get("to") || "도쿄 (NRT)"),
    date: searchParams.get("date") || "2025-02-01",
    return: searchParams.get("return") || "2025-02-08",
    passengers: searchParams.get("passengers") || "1",
    tripType: searchParams.get("tripType") || "roundtrip",
  };

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([200000, 1000000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [departureTime, setDepartureTime] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFlights() {
      // 검색 조건 유효성 검사
      const fromIata = params.from.match(/\(([^)]+)\)/)?.[1];
      const toIata = params.to.match(/\(([^)]+)\)/)?.[1];
      if (!fromIata || !toIata || !params.date) {
        setError("출발지, 도착지, 출발일을 입력해주세요.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/api/flights/search", {
          origin: fromIata,
          destination: toIata,
          departureDate: params.date,
          realTime: true,
        });
        console.log("API response:", response.data); // 디버깅용
        if (response.data.success && response.data.flights) {
          setFlights(response.data.flights);
          setFilteredFlights(response.data.flights);
          // 항공사 목록 동적 생성
          const uniqueAirlines = [
            ...new Set(response.data.flights.map((flight) => ({
              id: flight.carrierCode,
              name: flight.carrier,
            }))),
          ];
          setAirlines(uniqueAirlines);
        } else {
          setError("항공편을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("API error:", err.response?.data); // 디버깅용
        setError("항공편 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchFlights();
  }, [params.from, params.to, params.date]);

  useEffect(() => {
    let filtered = [...flights];

    // 가격 필터 (KRW 기준으로 변환 필요 시 로직 추가)
    filtered = filtered.filter((flight) => {
      const price = parseFloat(flight.price);
      return price >= priceRange[0] / (flight.currency === "EUR" ? 1500 : 1) &&
             price <= priceRange[1] / (flight.currency === "EUR" ? 1500 : 1);
    });

    // 항공사 필터
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) => selectedAirlines.includes(flight.carrierCode));
    }

    // 출발 시간 필터
    if (departureTime.length > 0) {
      filtered = filtered.filter((flight) => {
        const hour = new Date(flight.departureTime).getHours();
        if (departureTime.includes("morning") && hour >= 6 && hour < 12) return true;
        if (departureTime.includes("afternoon") && hour >= 12 && hour < 18) return true;
        if (departureTime.includes("evening") && hour >= 18 && hour < 21) return true;
        if (departureTime.includes("night") && (hour < 6 || hour >= 21)) return true;
        return false;
      });
    }

    // 정렬
    const sorted = [...filtered];
    if (sortBy === "price") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => {
        const durationA = (new Date(a.arrivalTime) - new Date(a.departureTime)) / (1000 * 60);
        const durationB = (new Date(b.arrivalTime) - new Date(b.departureTime)) / (1000 * 60);
        return durationA - durationB;
      });
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
    }

    setFilteredFlights(sorted);
  }, [flights, sortBy, priceRange, selectedAirlines, departureTime]);

  const handleAirlineChange = (airlineId) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineId) ? prev.filter((id) => id !== airlineId) : [...prev, airlineId]
    );
  };

  const handleDepartureTimeChange = (time) => {
    setDepartureTime((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
  };

  const resetFilters = () => {
    setPriceRange([200000, 1000000]);
    setSelectedAirlines([]);
    setDepartureTime([]);
  };

  if (loading) {
    return <div className="flex justify-center py-12 text-gray-600">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md text-center">
        <Luggage className="mb-4 h-12 w-12 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-800">검색 결과가 없습니다</h3>
        <p className="mt-2 text-gray-500">{error}</p>
        <Button
          className="mt-4 bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 py-2"
          onClick={() => navigate("/flight-search")}
        >
          검색 수정하기
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-orange-500 text-white">{params.tripType === "roundtrip" ? "왕복" : "편도"}</Badge>
            <span className="mx-2 text-sm text-gray-500">|</span>
            <span className="text-sm font-medium text-gray-800">
              {params.from} → {params.to}
            </span>
            <span className="mx-2 text-sm text-gray-500">|</span>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {params.date} {params.tripType === "roundtrip" && params.return ? `~ ${params.return}` : ""}
              </span>
            </div>
            <span className="mx-2 text-sm text-gray-500">|</span>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{params.passengers}명</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 rounded-md px-4 py-2"
            onClick={() => navigate("/flight-search")}
          >
            검색 수정
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="hidden md:block">
          <FilterPanel
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedAirlines={selectedAirlines}
            handleAirlineChange={handleAirlineChange}
            departureTime={departureTime}
            handleDepartureTimeChange={handleDepartureTimeChange}
            resetFilters={resetFilters}
            isMobile={false}
            setShowFilters={setShowFilters}
            airlines={airlines}
          />
        </div>
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              필터
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-gray-300 rounded-md px-3 py-2">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-md shadow-md">
                <SelectItem value="price" className="text-sm py-2 px-3 hover:bg-gray-100">가격 낮은순</SelectItem>
                <SelectItem value="duration" className="text-sm py-2 px-3 hover:bg-gray-100">소요시간 짧은순</SelectItem>
                <SelectItem value="departure" className="text-sm py-2 px-3 hover:bg-gray-100">출발시간 빠른순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showFilters && (
            <FilterPanel
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAirlines={selectedAirlines}
              handleAirlineChange={handleAirlineChange}
              departureTime={departureTime}
              handleDepartureTimeChange={handleDepartureTimeChange}
              resetFilters={resetFilters}
              isMobile={true}
              setShowFilters={setShowFilters}
              airlines={airlines}
            />
          )}
          <div className="mb-4 hidden items-center justify-between rounded-lg bg-white p-4 shadow-md md:flex">
            <span className="text-sm font-medium text-gray-800">검색 결과: {filteredFlights.length}개</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-gray-300 rounded-md px-3 py-2">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-md shadow-md">
                <SelectItem value="price" className="text-sm py-2 px-3 hover:bg-gray-100">가격 낮은순</SelectItem>
                <SelectItem value="duration" className="text-sm py-2 px-3 hover:bg-gray-100">소요시간 짧은순</SelectItem>
                <SelectItem value="departure" className="text-sm py-2 px-3 hover:bg-gray-100">출발시간 빠른순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {filteredFlights.length > 0 ? (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} navigate={navigate} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md">
              <Luggage className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-800">검색 결과가 없습니다</h3>
              <p className="mt-2 text-gray-500">다른 검색 조건으로 다시 시도해 보세요.</p>
              <Button
                className="mt-4 bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 py-2"
                onClick={() => navigate("/flight-search")}
              >
                검색 수정하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}