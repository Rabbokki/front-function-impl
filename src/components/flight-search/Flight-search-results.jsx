import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, Filter, Luggage, Plane, Users, X,ArrowRight } from "lucide-react";
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
import { format, toZonedTime } from 'date-fns-tz';

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
                min={200000}
                max={5000000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>
          </TabsContent>
          <TabsContent value="airline" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {airlines.map((airline, index) => (
                <div key={`${airline.id}-${index}`} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-airline-${airline.id}-${index}`}
                    checked={selectedAirlines.includes(airline.id)}
                    onCheckedChange={() => handleAirlineChange(airline.id)}
                    className="h-4 w-4 border-gray-300 text-orange-500"
                  />
                  <Label htmlFor={`mobile-airline-${airline.id}-${index}`} className="text-sm text-gray-700">
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
                  min={200000}
                  max={5000000}
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
                {airlines.map((airline, index) => (
                  <div key={`${airline.id}-${index}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`airline-${airline.id}-${index}`}
                      checked={selectedAirlines.includes(airline.id)}
                      onCheckedChange={() => handleAirlineChange(airline.id)}
                      className="h-4 w-4 border-gray-300 text-orange-500"
                    />
                    <Label htmlFor={`airline-${airline.id}-${index}`} className="text-sm text-gray-700">
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

function FlightCard({ flight, navigate, isRoundTrip }) {
  const formatPrice = (price, currency) => {
    const basePrice = parseFloat(price);
    const krwPrice =
      currency === "USD" ? basePrice * 1300 : currency === "EUR" ? basePrice * 1500 : basePrice;
    const formattedBase = new Intl.NumberFormat(currency === "KRW" ? "ko-KR" : "en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(basePrice);
    const formattedKrw = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(krwPrice);
    return `${formattedBase} (약 ${formattedKrw})`;
  };

  const parseDuration = (duration) => {
    if (!duration) return { hours: 0, minutes: 0, totalMinutes: 0 };
    const durationMatch = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    const hours = parseInt(durationMatch[1] || 0);
    const minutes = parseInt(durationMatch[2] || 0);
    const totalMinutes = hours * 60 + minutes;
    return { hours, minutes, totalMinutes };
  };

  const getAirportTimezone = (airportCode, timeZoneField) => {
    if (timeZoneField) return timeZoneField;
    return {
      LHR: "Europe/London",
      CDG: "Europe/Paris",
      ICN: "Asia/Seoul",
    }[airportCode] || "UTC";
  };

  const parseDate = (dateString) => {
    return new Date(dateString + "Z");
  };

  // 출발 여정
  const departureTimeFormatted = format(
    toZonedTime(
      parseDate(flight.departureTime),
      getAirportTimezone(flight.departureAirport, flight.departureTimeZone)
    ),
    "hh:mm a",
    { timeZone: getAirportTimezone(flight.departureAirport, flight.departureTimeZone) }
  );
  const arrivalTimeFormatted = format(
    toZonedTime(
      parseDate(flight.arrivalTime),
      getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone)
    ),
    "hh:mm a",
    { timeZone: getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone) }
  );
  const outboundDuration = parseDuration(flight.duration);

  // 귀국 여정
  let returnDuration = { hours: 0, minutes: 0, totalMinutes: 0 };
  let returnDepartureTimeFormatted = null;
  let returnArrivalTimeFormatted = null;
  let hasReturn = isRoundTrip && flight.returnDepartureTime && flight.returnArrivalTime;
  if (hasReturn) {
    returnDepartureTimeFormatted = format(
      toZonedTime(
        parseDate(flight.returnDepartureTime),
        getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone)
      ),
      "hh:mm a",
      { timeZone: getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone) }
    );
    returnArrivalTimeFormatted = format(
      toZonedTime(
        parseDate(flight.returnArrivalTime),
        getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone)
      ),
      "hh:mm a",
      { timeZone: getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone) }
    );
    returnDuration = parseDuration(flight.returnDuration);
  }

  // 비행 시간 검증
  if (outboundDuration.totalMinutes < 60) {
    console.warn(`항공편 ${flight.id} 출발 비행 시간 비현실적: ${outboundDuration.totalMinutes}분`);
  }
  if (hasReturn && returnDuration.totalMinutes < 60) {
    console.warn(`항공편 ${flight.id} 귀국 비행 시간 비현실적: ${returnDuration.totalMinutes}분`);
  }

  console.log("FlightCard 시간 변환:", {
    outboundDeparture: {
      raw: flight.departureTime,
      formatted: departureTimeFormatted,
      timeZone: getAirportTimezone(flight.departureAirport, flight.departureTimeZone),
      airport: flight.departureAirport,
    },
    outboundArrival: {
      raw: flight.arrivalTime,
      formatted: arrivalTimeFormatted,
      timeZone: getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone),
      airport: flight.arrivalAirport,
    },
    returnDeparture: hasReturn
      ? {
          raw: flight.returnDepartureTime,
          formatted: returnDepartureTimeFormatted,
          timeZone: getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone),
          airport: flight.returnDepartureAirport,
        }
      : null,
    returnArrival: hasReturn
      ? {
          raw: flight.returnArrivalTime,
          formatted: returnArrivalTimeFormatted,
          timeZone: getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone),
          airport: flight.returnArrivalAirport,
        }
      : null,
  });

  console.log("FlightCard 데이터:", {
    id: flight.id,
    travelFlightId: flight.travelFlightId,
    carrier: flight.carrier,
    departureAirport: flight.departureAirport,
    arrivalAirport: flight.arrivalAirport,
    departureTime: flight.departureTime,
    arrivalTime: flight.arrivalTime,
    returnDepartureTime: flight.returnDepartureTime,
    returnArrivalTime: flight.returnArrivalTime,
    price: flight.price,
    currency: flight.currency,
  });

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
                  {hasReturn && ` / ${flight.returnDepartureAirport} → ${flight.returnArrivalAirport}`}
                </p>
              </div>
            </div>
            <Badge
              className={
                outboundDuration.totalMinutes < 60 || (hasReturn && returnDuration.totalMinutes < 60)
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }
            >
              {outboundDuration.totalMinutes < 60 || (hasReturn && returnDuration.totalMinutes < 60)
                ? "비행 시간 오류"
                : "직항"}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center justify-between md:justify-start md:gap-12">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{departureTimeFormatted}</div>
                <div className="text-xs text-gray-500">{flight.departureAirport}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {`${outboundDuration.hours}시간 ${outboundDuration.minutes ? `${outboundDuration.minutes}분` : ""}`}
                </div>
                <div className="relative my-1 w-20 md:w-32">
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
                  <Plane className="relative mx-auto h-3 w-3 rotate-90 text-gray-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{arrivalTimeFormatted}</div>
                <div className="text-xs text-gray-500">{flight.arrivalAirport}</div>
              </div>
            </div>
            <div className="flex flex-col items-end border-t pt-4 md:border-t-0 md:pt-0">
              <div className="text-lg font-bold text-orange-500">{formatPrice(parseFloat(flight.price), flight.currency)}</div>
              <Button
                className="mt-2 bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 py-2"
                onClick={() => {
                  console.log("선택한 항공편:", { id: flight.id, travelFlightId: flight.travelFlightId });
                  navigate(`/flight-detail/${flight.travelFlightId}`, {
                    state: {
                      departureTimeFormatted,
                      arrivalTimeFormatted,
                      returnDepartureTimeFormatted,
                      returnArrivalTimeFormatted,
                      isRoundTrip,
                    },
                  });
                }}
              >
                선택하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          {hasReturn && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700">귀국 여정</h4>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-1 items-center justify-between md:justify-start md:gap-12">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{returnDepartureTimeFormatted}</div>
                    <div className="text-xs text-gray-500">{flight.returnDepartureAirport}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {`${returnDuration.hours}시간 ${returnDuration.minutes ? `${returnDuration.minutes}분` : ""}`}
                    </div>
                    <div className="relative my-1 w-20 md:w-32">
                      <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
                      <Plane className="relative mx-auto h-3 w-3 rotate-90 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{returnArrivalTimeFormatted}</div>
                    <div className="text-xs text-gray-500">{flight.returnArrivalAirport}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isRoundTrip && !hasReturn && (
            <div className="text-sm text-orange-500 mt-2">
              경고: 귀국 여정 데이터가 누락되었습니다. 출발 여정만 표시됩니다.
            </div>
          )}
          {outboundDuration.totalMinutes < 60 && (
            <div className="text-sm text-red-500 mt-2">
              경고: 출발 비행 시간({outboundDuration.hours}시간 {outboundDuration.minutes}분)이 비현실적일 수 있습니다.
            </div>
          )}
          {hasReturn && returnDuration.totalMinutes < 60 && (
            <div className="text-sm text-red-500 mt-2">
              경고: 귀국 비행 시간({returnDuration.hours}시간 {returnDuration.minutes}분)이 비현실적일 수 있습니다.
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">데이터 소스: Amadeus API 실시간 데이터</div>
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
    to: decodeURIComponent(searchParams.get("to") || "파리 (CDG)"),
    date: searchParams.get("date") || "2025-05-13",
    return: searchParams.get("return") || null,
    passengers: searchParams.get("passengers") || "1",
    tripType: searchParams.get("tripType") || "roundtrip",
  };

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([200000, 5000000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [departureTime, setDepartureTime] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    async function fetchFlights() {
      const fromIata = params.from.match(/\(([^)]+)\)/)?.[1];
      const toIata = params.to.match(/\(([^)]+)\)/)?.[1];
      if (!fromIata || !toIata || !params.date) {
        setError("출발지, 도착지, 출발일을 입력해주세요.");
        setLoading(false);
        return;
      }

      try {
        console.log("API 요청 데이터:", {
          origin: fromIata,
          destination: toIata,
          departureDate: params.date,
          returnDate: params.tripType === "roundtrip" ? params.return : null,
          realTime: true,
        });
        const response = await axios.post(
          "http://localhost:8080/api/flights/search",
          {
            origin: fromIata,
            destination: toIata,
            departureDate: params.date,
            returnDate: params.tripType === "roundtrip" ? params.return : null,
            realTime: true,
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          }
        );
        console.log("API 응답 전체:", JSON.stringify(response.data, null, 2));
        console.log(
          "API 응답 항공편 상세:",
          response.data.flights?.map((flight) => ({
            id: flight.id,
            travelFlightId: flight.travelFlightId,
            carrier: flight.carrier,
            departureAirport: flight.departureAirport,
            arrivalAirport: flight.arrivalAirport,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            returnDepartureTime: flight.returnDepartureTime || "N/A",
            returnArrivalTime: flight.returnArrivalTime || "N/A",
            price: flight.price,
            currency: flight.currency,
            duration: flight.duration || "N/A",
            returnDuration: flight.returnDuration || "N/A",
          }))
        );

        if (!response.data) {
          throw new Error("API 응답 데이터가 없습니다.");
        }

        if (response.data.success && Array.isArray(response.data.flights)) {
          const processedFlights = response.data.flights.map((flight) => ({
            ...flight,
            travelFlightId: flight.travelFlightId || flight.id,
            arrivalAirport: flight.arrivalAirport?.trim().toUpperCase(),
            departureAirport: flight.departureAirport?.trim().toUpperCase(),
            returnArrivalAirport: flight.returnArrivalAirport?.trim().toUpperCase(),
            returnDepartureAirport: flight.returnDepartureAirport?.trim().toUpperCase(),
          }));
          console.log("처리된 항공편 수:", processedFlights.length);

          if (processedFlights.length === 0) {
            setError("검색 조건에 맞는 항공편을 찾을 수 없습니다. 다른 조건을 시도해주세요.");
            setFlights([]);
            setFilteredFlights([]);
          } else {
            if (params.tripType === "roundtrip") {
              const hasReturnData = processedFlights.some(
                (flight) => flight.returnDepartureTime && flight.returnArrivalTime
              );
              if (!hasReturnData) {
                console.warn("왕복 요청이지만 귀국 여정 데이터 누락");
                setWarning("귀국 여정 데이터가 누락되었습니다. 출발 여정만 표시됩니다.");
              }
            }
            const prices = processedFlights.map((flight) => {
              const exchangeRate = flight.currency === "USD" ? 1300 : flight.currency === "EUR" ? 1500 : 1;
              return parseFloat(flight.price) * exchangeRate;
            });
            const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices) / 10000) * 10000 : 200000;
            const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices) / 10000) * 10000 : 5000000;
            setPriceRange([Math.max(200000, minPrice), Math.min(5000000, maxPrice)]);
            setFlights(processedFlights);
            setFilteredFlights(processedFlights);
            const uniqueAirlines = Object.values(
              processedFlights.reduce((acc, flight) => {
                acc[flight.carrierCode] = {
                  id: flight.carrierCode,
                  name: flight.carrier,
                };
                return acc;
              }, {})
            );
            console.log("고유 항공사:", uniqueAirlines);
            setAirlines(uniqueAirlines);
          }
        } else {
          setError("항공편을 찾을 수 없습니다. API 응답 형식이 올바르지 않습니다.");
          setFlights([]);
          setFilteredFlights([]);
        }
      } catch (err) {
        console.error("API 오류:", err.message, err.response?.data);
        let errorMessage = "항공편 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.";
        if (err.response?.status === 400) {
          errorMessage = "잘못된 요청입니다. 검색 조건을 확인해주세요.";
        } else if (err.response?.status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
        }
        setError(errorMessage);
        setFlights([]);
        setFilteredFlights([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFlights();
  }, [params.from, params.to, params.date, params.return, params.tripType]);

  useEffect(() => {
    if (flights.length === 0) {
      setFilteredFlights([]);
      setError("검색된 항공편이 없습니다. 검색 조건을 변경해주세요.");
      return;
    }

    let filtered = [...flights];

    console.log("필터 상태:", { selectedAirlines, departureTime, priceRange });
    filtered = filtered.filter((flight) => {
      const exchangeRate = flight.currency === "USD" ? 1300 : flight.currency === "EUR" ? 1500 : 1;
      const price = parseFloat(flight.price) * exchangeRate;
      console.log(`항공편 ${flight.id} 가격: ${flight.price} ${flight.currency} -> ${price} KRW`);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    console.log("가격 필터 후 항공편 수:", filtered.length);

    if (filtered.length === 0 && flights.length > 0) {
      setError(
        `선택한 가격 범위(${new Intl.NumberFormat("ko-KR").format(priceRange[0])}원 ~ ${new Intl.NumberFormat(
          "ko-KR"
        ).format(priceRange[1])}원)에 맞는 항공편이 없습니다. 가격 필터를 조정해 보세요.`
      );
      setFilteredFlights([]);
      return;
    }

    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) => selectedAirlines.includes(flight.carrierCode));
      console.log("항공사 필터 후 항공편 수:", filtered.length);
      if (filtered.length === 0) {
        setError("선택한 항공사에 맞는 항공편이 없습니다. 항공사 필터를 조정해 보세요.");
        setFilteredFlights([]);
        return;
      }
    }

    if (departureTime.length > 0) {
      filtered = filtered.filter((flight) => {
        const hour = toZonedTime(
          new Date(flight.departureTime + "Z"),
          getAirportTimezone(flight.departureAirport, flight.departureTimeZone)
        ).getHours();
        if (departureTime.includes("morning") && hour >= 6 && hour < 12) return true;
        if (departureTime.includes("afternoon") && hour >= 12 && hour < 18) return true;
        if (departureTime.includes("evening") && hour >= 18 && hour < 21) return true;
        if (departureTime.includes("night") && (hour < 6 || hour >= 21)) return true;
        return false;
      });
      console.log("출발 시간 필터 후 항공편 수:", filtered.length);
      if (filtered.length === 0) {
        setError("선택한 출발 시간에 맞는 항공편이 없습니다. 출발 시간 필터를 조정해 보세요.");
        setFilteredFlights([]);
        return;
      }
    }

    const sorted = [...filtered];
    if (sortBy === "price") {
      sorted.sort((a, b) => {
        const exchangeRateA = a.currency === "USD" ? 1300 : a.currency === "EUR" ? 1500 : 1;
        const exchangeRateB = b.currency === "USD" ? 1300 : b.currency === "EUR" ? 1500 : 1;
        return parseFloat(a.price) * exchangeRateA - parseFloat(b.price) * exchangeRateB;
      });
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => {
        const durationA = a.duration
          ? parseDuration(a.duration).totalMinutes
          : (new Date(a.arrivalTime) - new Date(a.departureTime)) / (1000 * 60);
        const durationB = b.duration
          ? parseDuration(b.duration).totalMinutes
          : (new Date(b.arrivalTime) - new Date(b.departureTime)) / (1000 * 60);
        return durationA - durationB;
      });
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
    }

    function parseDuration(duration) {
      if (!duration) return { totalMinutes: 0 };
      const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
      const hours = parseInt(match[1] || 0);
      const minutes = parseInt(match[2] || 0);
      return { totalMinutes: hours * 60 + minutes };
    }

    function getAirportTimezone(airportCode, timeZoneField) {
      if (timeZoneField) return timeZoneField;
      return {
        LHR: "Europe/London",
        CDG: "Europe/Paris",
        ICN: "Asia/Seoul",
      }[airportCode] || "UTC";
    }

    console.log("렌더링할 항공편:", sorted);
    setFilteredFlights(sorted);
    if (sorted.length === 0 && (selectedAirlines.length > 0 || departureTime.length > 0)) {
      setError("선택한 항공사 또는 출발 시간에 맞는 항공편이 없습니다. 필터를 조정해 보세요.");
    } else {
      setError(null);
    }
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
    setPriceRange([200000, 5000000]);
    setSelectedAirlines([]);
    setDepartureTime([]);
  };

  if (loading) {
    return <div className="flex justify-center py-12 text-gray-600">로딩 중...</div>;
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
        {warning && <div className="mt-4 text-sm text-orange-500">{warning}</div>}
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
                <SelectItem value="price" className="text-sm py-2 px-3 hover:bg-gray-100">
                  가격 낮은순
                </SelectItem>
                <SelectItem value="duration" className="text-sm py-2 px-3 hover:bg-gray-100">
                  소요시간 짧은순
                </SelectItem>
                <SelectItem value="departure" className="text-sm py-2 px-3 hover:bg-gray-100">
                  출발시간 빠른순
                </SelectItem>
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
                <SelectItem value="price" className="text-sm py-2 px-3 hover:bg-gray-100">
                  가격 낮은순
                </SelectItem>
                <SelectItem value="duration" className="text-sm py-2 px-3 hover:bg-gray-100">
                  소요시간 짧은순
                </SelectItem>
                <SelectItem value="departure" className="text-sm py-2 px-3 hover:bg-gray-100">
                  출발시간 빠른순
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {filteredFlights.length > 0 ? (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id || `${flight.carrierCode}-${flight.departureTime}-${flight.arrivalTime}-${flight.price}`}
                  flight={flight}
                  navigate={navigate}
                  isRoundTrip={params.tripType === "roundtrip"}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md">
              <Luggage className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-800">검색 결과가 없습니다</h3>
              <p className="mt-2 text-gray-500">{error || "항공편을 찾을 수 없습니다. 검색 조건을 확인해주세요."}</p>
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