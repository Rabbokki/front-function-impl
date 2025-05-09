import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../modules/Card";
import axios from "axios";
import { Button } from "../../modules/Button";
import { Badge } from "../../modules/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../modules/Tabs";
import { Label } from "../../modules/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../modules/Select";
import { ArrowLeft, ArrowRight, Plane, Users, Luggage, Calendar } from "lucide-react";

// 더미 데이터 (DB 테스트 데이터와 동기화)
const mockFlights = [
  {
    id: "FL123",
    carrier: "대한항공",
    carrierCode: "KE",
    price: "250000",
    currency: "KRW",
    departureTime: "2025-06-01T08:00:00",
    arrivalTime: "2025-06-01T10:30:00",
    departureAirport: "ICN",
    arrivalAirport: "NRT",
    duration: "PT2H30M",
    flightNumber: "KE123",
    cabinBaggage: "Weight: 20kg",
    numberOfBookableSeats: 50,
  },
];

function FlightInfoSection({ flight, formatPrice }) {
  const parseDuration = (duration) => {
    console.log("Parsing duration:", duration); // 디버깅
    if (!duration) return "N/A";
    const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    return `${hours}시간${minutes ? ` ${minutes}분` : ""}`;
  };

  const getTimeZone = (airportCode) => {
    const timeZones = {
      JFK: "America/New_York",
      CDG: "Europe/Paris",
      ICN: "Asia/Seoul",
      NRT: "Asia/Tokyo",
    };
    return timeZones[airportCode] || "UTC";
  };

  const parseFlightTime = (time, airportCode) => {
    try {
      const date = new Date(time);
      if (isNaN(date.getTime())) {
        console.error(`Invalid date format: ${time} for airport ${airportCode}`);
        return "N/A";
      }
      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: getTimeZone(airportCode),
      });
    } catch (error) {
      console.error(`Error parsing time: ${time}, error: ${error.message}`);
      return "N/A";
    }
  };

  console.log("FlightInfoSection flight data:", flight); // 디버깅

  return (
    <TabsContent value="flight-info" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">가는 편</h3>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center">
            <div className="text-center">
              <div className="text-xl font-bold text-traveling-text">
                {parseFlightTime(flight.departureTime, flight.departureAirport)}
              </div>
              <div className="text-sm text-traveling-text/70">{flight.departureAirport}</div>
              <div className="mt-1 text-xs font-medium text-traveling-text">
                {new Date(flight.departureTime).toLocaleDateString("ko-KR")}
              </div>
            </div>
            <div className="mx-4 flex flex-1 flex-col items-center">
              <div className="text-xs text-traveling-text/70">직항 ({parseDuration(flight.duration)})</div>
              <div className="relative w-full">
                <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10" />
                <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-traveling-text">
                {parseFlightTime(flight.arrivalTime, flight.arrivalAirport)}
              </div>
              <div className="text-sm text-traveling-text/70">{flight.arrivalAirport}</div>
              <div className="mt-1 text-xs font-medium text-traveling-text">
                {new Date(flight.arrivalTime).toLocaleDateString("ko-KR")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {flight.returnDepartureTime && (
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">오는 편</h3>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-traveling-text">
                  {parseFlightTime(flight.returnDepartureTime, flight.returnDepartureAirport)}
                </div>
                <div className="text-sm text-traveling-text/70">{flight.returnDepartureAirport}</div>
                <div className="mt-1 text-xs font-medium text-traveling-text">
                  {new Date(flight.returnDepartureTime).toLocaleDateString("ko-KR")}
                </div>
              </div>
              <div className="mx-4 flex flex-1 flex-col items-center">
                <div className="text-xs text-traveling-text/70">직항 ({parseDuration(flight.returnDuration)})</div>
                <div className="relative w-full">
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10" />
                  <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-traveling-text">
                  {parseFlightTime(flight.returnArrivalTime, flight.returnArrivalAirport)}
                </div>
                <div className="text-sm text-traveling-text/70">{flight.returnArrivalAirport}</div>
                <div className="mt-1 text-xs font-medium text-traveling-text">
                  {new Date(flight.returnArrivalTime).toLocaleDateString("ko-KR")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </TabsContent>
  );
}

function SeatSelection({ passengerCount, selectedSeats, setPassengerCount, setSelectedSeats }) {
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < passengerCount) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  return (
    <TabsContent value="seat-selection" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">좌석 선택</h3>
        <p className="mb-4 text-sm text-traveling-text/70">
          탑승객 {passengerCount}명을 위한 좌석을 선택해주세요. 현재 {selectedSeats.length}개 선택됨.
        </p>
        <div className="mb-6">
          <Label htmlFor="passenger-count" className="mb-2 block text-traveling-text">
            탑승객 수
          </Label>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
              disabled={passengerCount <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{passengerCount}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPassengerCount(passengerCount + 1)}
              disabled={passengerCount >= 9}
            >
              +
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-4 flex justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-sm bg-traveling-mint" />
              <span>이용 가능</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-sm bg-traveling-pink" />
              <span>선택됨</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-sm bg-gray-400" />
              <span>이용 불가</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8 flex justify-center">
                <div className="w-32 rounded-t-lg bg-gray-300 p-2 text-center text-sm font-medium">조종석</div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {["A", "B", "C", "", "D", "E", "F"].map((col, colIndex) => (
                  <div key={`header-${colIndex}`} className="text-center text-sm font-medium">
                    {col}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, rowIndex) => {
                  const row = rowIndex + 1;
                  return (
                    <React.Fragment key={`row-${row}`}>
                      {["A", "B", "C", "", "D", "E", "F"].map((col, colIndex) => {
                        if (colIndex === 3) {
                          return (
                            <div key={`row-${row}-aisle`} className="flex items-center justify-center">
                              {row}
                            </div>
                          );
                        }
                        const seat = `${row}${col}`;
                        const isSelected = selectedSeats.includes(seat);
                        const isDisabled = Math.random() > 0.7;
                        return (
                          <div
                            key={`seat-${seat}`}
                            className={`flex h-8 w-full cursor-pointer items-center justify-center rounded-sm text-xs ${
                              isDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : isSelected
                                ? "bg-traveling-pink text-white"
                                : "bg-traveling-mint text-white hover:bg-traveling-pink/70"
                            }`}
                            onClick={() => !isDisabled && handleSeatSelection(seat)}
                          >
                            {seat}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-full btn-flight">
            다음: 탑승객 정보
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

function PassengerInfo({ passengerCount }) {
  return (
    <TabsContent value="passenger-info" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">탑승객 정보</h3>
        {Array.from({ length: passengerCount }, (_, index) => (
          <div key={index} className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
            <h4 className="mb-3 text-md font-medium text-traveling-text">탑승객 {index + 1}</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-first-name`}>이름 (영문)</Label>
                <input
                  id={`passenger-${index}-first-name`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="예: GILDONG"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-last-name`}>성 (영문)</Label>
                <input
                  id={`passenger-${index}-last-name`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="예: HONG"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-birth`}>생년월일</Label>
                <input
                  id={`passenger-${index}-birth`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-gender`}>성별</Label>
                <Select>
                  <SelectTrigger id={`passenger-${index}-gender`}>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-nationality`}>국적</Label>
                <Select>
                  <SelectTrigger id={`passenger-${index}-nationality`}>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KR">대한민국</SelectItem>
                    <SelectItem value="JP">일본</SelectItem>
                    <SelectItem value="US">미국</SelectItem>
                    <SelectItem value="CN">중국</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-passport`}>여권번호</Label>
                <input
                  id={`passenger-${index}-passport`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="여권번호를 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 rounded-lg bg-traveling-background/50 p-4">
          <h4 className="mb-2 text-sm font-medium text-traveling-text">연락처 정보</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-email">이메일</Label>
              <input
                id="contact-email"
                className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                placeholder="이메일 주소를 입력하세요"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">연락처</Label>
              <input
                id="contact-phone"
                className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                placeholder="연락처를 입력하세요"
                type="tel"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-full btn-flight">
            다음: 결제
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

function PaymentInfo({ flight, passengerCount, selectedSeats, formatPrice, handleBooking }) {
  return (
    <TabsContent value="payment" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">결제 정보</h3>
        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h4 className="mb-3 text-md font-medium text-traveling-text">결제 요약</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-traveling-text/70">항공권 요금 (성인 {passengerCount}명)</span>
              <span className="font-medium text-traveling-text">
                {formatPrice(parseFloat(flight.price) * passengerCount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-traveling-text/70">세금 및 수수료</span>
              <span className="font-medium text-traveling-text">
                {formatPrice(parseFloat(flight.price) * passengerCount * 0.1)}
              </span>
            </div>
            {selectedSeats.length > 0 && (
              <div className="flex justify-between">
                <span className="text-traveling-text/70">좌석 선택 ({selectedSeats.length}석)</span>
                <span className="font-medium text-traveling-text">{formatPrice(selectedSeats.length * 20000)}</span>
              </div>
            )}
            <div className="border-t border-traveling-text/10 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-traveling-text">총 결제 금액</span>
                <span className="text-lg font-bold text-traveling-text">
                  {formatPrice(
                    parseFloat(flight.price) * passengerCount +
                      parseFloat(flight.price) * passengerCount * 0.1 +
                      selectedSeats.length * 20000
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h4 className="mb-3 text-md font-medium text-traveling-text">결제 수단</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-card"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                defaultChecked
              />
              <Label htmlFor="payment-card">신용/체크카드</Label>
            </div>
            <div className="rounded-lg border border-traveling-text/10 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="card-number">카드 번호</Label>
                  <input
                    id="card-number"
                    className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                    placeholder="0000-0000-0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">카드 소유자 이름</Label>
                  <input
                    id="card-name"
                    className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                    placeholder="카드에 표시된 이름"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">유효 기간</Label>
                  <input
                    id="card-expiry"
                    className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvv">보안 코드 (CVV)</Label>
                  <input
                    id="card-cvv"
                    className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                    placeholder="000"
                    type="password"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-bank"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
              />
              <Label htmlFor="payment-bank">계좌이체</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-kakao"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
              />
              <Label htmlFor="payment-kakao">카카오페이</Label>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-traveling-text/10 bg-white p-4">
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms-agree" className="mt-1 h-4 w-4 text-traveling-pink" />
            <Label htmlFor="terms-agree" className="text-sm">
              본인은 <span className="text-traveling-pink">이용약관</span>과{" "}
              <span className="text-traveling-pink">개인정보 처리방침</span>에 동의하며, 위 내용이 사실과 다를 경우
              발생하는 불이익에 대한 책임은 본인에게 있음을 확인합니다.
            </Label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="rounded-full btn-flight" onClick={handleBooking}>
            예약 완료
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

export default function FlightDetailContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFlight() {
      try {
        const response = await axios.get(`http://localhost:8080/api/flights/detail/by-travel-flight/${id}`, {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        });
        console.log("API 응답:", JSON.stringify(response.data, null, 2));
        if (response.data.success && response.data.data) {
          setFlight(response.data.data); // Redux 상태 참조 제거
          setError(null);
        } else {
          throw new Error("항공편 데이터가 없습니다.");
        }
      } catch (err) {
        console.error("API 오류:", err.message, err.response?.data);
        setError(`항공편 정보를 가져오는 데 실패했습니다. (TravelFlight ID: ${id})`);
      } finally {
        setLoading(false);
      }
    }
    fetchFlight();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: flight?.currency || "KRW",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = () => {
    console.log("예약 데이터:", {
      flightId: flight?.id,
      passengerCount,
      selectedSeats,
    });
    navigate("/mypage");
  };

  if (loading) {
    return <div className="flex justify-center py-12">로딩 중...</div>;
  }

  if (error || !flight) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-traveling-text">항공권을 찾을 수 없습니다</h2>
        <p className="mt-2 text-traveling-text/70">{error}</p>
        <p className="mt-2 text-sm text-red-500">TravelFlight ID: {id}</p>
        <Button className="mt-6 rounded-full btn-flight" onClick={() => navigate("/flight-search")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          항공권 검색으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button
        variant="outline"
        className="mb-4 border-traveling-text-black/30 text-black"
        onClick={() => navigate("/flight-search")}
      >
        <ArrowLeft className="mr-2 h-4 w-4 text-black" />
        항공권 검색으로 돌아가기
      </Button>
      <Card className="overflow-hidden bg-white shadow-md">
        <CardHeader className="border-b border-traveling-text/10 bg-traveling-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-traveling-mint">
                <span className="font-bold text-white">{flight.carrierCode}</span>
              </div>
              <div className="ml-4">
                <CardTitle className="text-xl font-bold text-traveling-text">{flight.carrier}</CardTitle>
                <p className="text-sm text-traveling-text/70">직항</p>
              </div>
            </div>
            <Badge className="bg-traveling-mint text-white">직항</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="flight-info">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="flight-info">항공편 정보</TabsTrigger>
              <TabsTrigger value="seat-selection">좌석 선택</TabsTrigger>
              <TabsTrigger value="passenger-info">탑승객 정보</TabsTrigger>
              <TabsTrigger value="payment">결제</TabsTrigger>
            </TabsList>
            <FlightInfoSection flight={flight} formatPrice={formatPrice} />
            <SeatSelection
              passengerCount={passengerCount}
              selectedSeats={selectedSeats}
              setPassengerCount={setPassengerCount}
              setSelectedSeats={setSelectedSeats}
            />
            <PassengerInfo passengerCount={passengerCount} />
            <PaymentInfo
              flight={flight}
              passengerCount={passengerCount}
              selectedSeats={selectedSeats}
              formatPrice={formatPrice}
              handleBooking={handleBooking}
            />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}