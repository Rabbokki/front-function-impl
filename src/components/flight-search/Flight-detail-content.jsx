import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../modules/Card";
import axios from "axios";
import { Button } from "../../modules/Button";
import { Badge } from "../../modules/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../modules/Tabs";
import { Label } from "../../modules/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../modules/Select";
import { ArrowLeft, ArrowRight, Plane, Users, Luggage, Calendar } from "lucide-react";
import { format, toZonedTime } from "date-fns-tz";
import axiosInstance from "../../api/axiosInstance";

function FlightInfoSection({ flight, formatPrice, isRoundTrip, formattedTimes, setTabValue }) {
  const navigate = useNavigate();
  const parseDuration = (duration) => {
    if (!duration) return { hours: 0, minutes: 0 };
    const durationMatch = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    const hours = parseInt(durationMatch[1] || 0);
    const minutes = parseInt(durationMatch[2] || 0);
    return { hours, minutes };
  };

  const getAirportTimezone = (airportCode, timeZoneField) => {
    if (timeZoneField) return timeZoneField;
    return {
      LHR: "Europe/London",
      CDG: "Europe/Paris",
      ICN: "Asia/Seoul",
      NRT: "Asia/Tokyo",
      HND: "Asia/Tokyo",
      HKG: "Asia/Hong_Kong",
    }[airportCode] || "UTC";
  };

  const parseDate = (dateString) => {
    return new Date(dateString + "Z");
  };

  const outboundDuration = parseDuration(flight.duration);
  const returnDuration = parseDuration(flight.returnDuration);

  const outboundDepartureFormatted = formattedTimes?.departureTimeFormatted || format(
    toZonedTime(parseDate(flight.departureTime), getAirportTimezone(flight.departureAirport, flight.departureTimeZone)),
    "hh:mm a",
    { timeZone: getAirportTimezone(flight.departureAirport, flight.departureTimeZone) }
  );
  const outboundArrivalFormatted = formattedTimes?.arrivalTimeFormatted || format(
    toZonedTime(parseDate(flight.arrivalTime), getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone)),
    "hh:mm a",
    { timeZone: getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone) }
  );
  const returnDepartureFormatted = isRoundTrip && flight.returnDepartureTime
    ? formattedTimes?.returnDepartureTimeFormatted || format(
        toZonedTime(
          parseDate(flight.returnDepartureTime),
          getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone)
        ),
        "hh:mm a",
        { timeZone: getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone) }
      )
    : null;
  const returnArrivalFormatted = isRoundTrip && flight.returnArrivalTime
    ? formattedTimes?.returnArrivalTimeFormatted || format(
        toZonedTime(
          parseDate(flight.returnArrivalTime),
          getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone)
        ),
        "hh:mm a",
        { timeZone: getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone) }
      )
    : null;

  console.log("FlightInfoSection 시간 변환:", {
    outboundDeparture: {
      raw: flight.departureTime,
      formatted: outboundDepartureFormatted,
      timeZone: getAirportTimezone(flight.departureAirport, flight.departureTimeZone),
      airport: flight.departureAirport,
    },
    outboundArrival: {
      raw: flight.arrivalTime,
      formatted: outboundArrivalFormatted,
      timeZone: getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone),
      airport: flight.arrivalAirport,
    },
    returnDeparture: isRoundTrip
      ? {
          raw: flight.returnDepartureTime,
          formatted: returnDepartureFormatted,
          timeZone: getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone),
          airport: flight.returnDepartureAirport,
        }
      : null,
    returnArrival: isRoundTrip
      ? {
          raw: flight.returnArrivalTime,
          formatted: returnArrivalFormatted,
          timeZone: getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone),
          airport: flight.returnArrivalAirport,
        }
      : null,
  });

  const handleNext = () => {
    console.log("FlightInfoSection: 다음 버튼 클릭, 탭 전환 to seat-selection");
    setTabValue("seat-selection");
  };

  return (
    <TabsContent value="flight-info" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">가는 편</h3>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center">
            <div className="text-center">
              <div className="text-xl font-bold text-traveling-text">
                {outboundDepartureFormatted}
              </div>
              <div className="text-sm text-traveling-text/70">{flight.departureAirport}</div>
              <div className="mt-1 text-xs font-medium text-traveling-text">
                {format(
                  toZonedTime(
                    parseDate(flight.departureTime),
                    getAirportTimezone(flight.departureAirport, flight.departureTimeZone)
                  ),
                  "yyyy-MM-dd",
                  { timeZone: getAirportTimezone(flight.departureAirport, flight.departureTimeZone) }
                )}
              </div>
            </div>
            <div className="mx-4 flex flex-1 flex-col items-center">
              <div className="text-xs text-traveling-text/70">
                직항 ({outboundDuration.hours}시간 {outboundDuration.minutes ? `${outboundDuration.minutes}분` : ""})
              </div>
              <div className="relative w-full">
                <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10" />
                <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-traveling-text">
                {outboundArrivalFormatted}
              </div>
              <div className="text-sm text-traveling-text/70">{flight.arrivalAirport}</div>
              <div className="mt-1 text-xs font-medium text-traveling-text">
                {format(
                  toZonedTime(
                    parseDate(flight.arrivalTime),
                    getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone)
                  ),
                  "yyyy-MM-dd",
                  { timeZone: getAirportTimezone(flight.arrivalAirport, flight.arrivalTimeZone) }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRoundTrip && flight.returnDepartureTime && (
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">오는 편</h3>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-traveling-text">
                  {returnDepartureFormatted}
                </div>
                <div className="text-sm text-traveling-text/70">{flight.returnDepartureAirport}</div>
                <div className="mt-1 text-xs font-medium text-traveling-text">
                  {format(
                    toZonedTime(
                      parseDate(flight.returnDepartureTime),
                      getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone)
                    ),
                    "yyyy-MM-dd",
                    { timeZone: getAirportTimezone(flight.returnDepartureAirport, flight.returnDepartureTimeZone) }
                  )}
                </div>
              </div>
              <div className="mx-4 flex flex-1 flex-col items-center">
                <div className="text-xs text-traveling-text/70">
                  직항 ({returnDuration.hours}시간 {returnDuration.minutes ? `${returnDuration.minutes}분` : ""})
                </div>
                <div className="relative w-full">
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10" />
                  <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-traveling-text">
                  {returnArrivalFormatted}
                </div>
                <div className="text-sm text-traveling-text/70">{flight.returnArrivalAirport}</div>
                <div className="mt-1 text-xs font-medium text-traveling-text">
                  {format(
                    toZonedTime(
                      parseDate(flight.returnArrivalTime),
                      getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone)
                    ),
                    "yyyy-MM-dd",
                    { timeZone: getAirportTimezone(flight.returnArrivalAirport, flight.returnArrivalTimeZone) }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">항공편 상세 정보</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <Plane className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">항공사</p>
                <p className="text-traveling-text/70">{flight.carrier}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Plane className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">편명</p>
                <p className="text-traveling-text/70">{flight.flightNumber}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Luggage className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">수하물 허용량</p>
                <p className="text-traveling-text/70">{flight.cabinBaggage || "20kg"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">요금 정보</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-traveling-text/70">성인 1인</span>
              <span className="font-medium text-traveling-text">{formatPrice(parseFloat(flight.price))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-traveling-text/70">세금 및 수수료</span>
              <span className="font-medium text-traveling-text">{formatPrice(parseFloat(flight.price) * 0.1)}</span>
            </div>
            <div className="border-t border-traveling-text/10 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-traveling-text">총 요금</span>
                <span className="text-lg font-bold text-traveling-text">
                  {formatPrice(parseFloat(flight.price) * 1.1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          className="rounded-full border-traveling-text/30 text-traveling-text"
          onClick={() => navigate("/flight-search")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          검색으로 돌아가기
        </Button>
        <Button className="rounded-full btn-flight" onClick={handleNext}>
          다음: 좌석 선택
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </TabsContent>
  );
}

function SeatSelection({ passengerCount, selectedSeats, setPassengerCount, setSelectedSeats, setTabValue }) {
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < passengerCount) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleNext = () => {
    if (selectedSeats.length < passengerCount) {
      alert(`탑승객 ${passengerCount}명 모두를 위한 좌석을 선택해주세요. 현재 ${selectedSeats.length}석 선택됨.`);
      return;
    }
    console.log("SeatSelection: 다음 버튼 클릭, 탭 전환 to passenger-info");
    setTabValue("passenger-info");
  };

  const handlePrevious = () => {
    console.log("SeatSelection: 이전 버튼 클릭, 탭 전환 to flight-info");
    setTabValue("flight-info");
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
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full border-traveling-text/30 text-traveling-text"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전: 항공편 정보
          </Button>
          <Button className="rounded-full btn-flight" onClick={handleNext}>
            다음: 탑승객 정보
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

function PassengerInfo({ passengerCount, setTabValue }) {
  const [passengers, setPassengers] = useState(
    Array.from({ length: passengerCount }, () => ({
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      nationality: "",
      passport: "",
    }))
  );
  const [contact, setContact] = useState({ email: "", phone: "" });

  useEffect(() => {
    setPassengers(
      Array.from({ length: passengerCount }, (_, index) => passengers[index] || {
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        nationality: "",
        passport: "",
      })
    );
  }, [passengerCount]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassengerInfo = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.firstName || !p.lastName || !p.birthDate || !p.gender || !p.nationality || !p.passport) {
        alert(`탑승객 ${i + 1}의 모든 필수 정보를 입력해주세요.`);
        return false;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p.birthDate)) {
        alert(`탑승객 ${i + 1}의 생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)`);
        return false;
      }
    }
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    if (!contact.phone || !/^\+?\d{10,15}$/.test(contact.phone.replace(/-/g, ""))) {
      alert("유효한 연락처를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validatePassengerInfo()) return;
    console.log("PassengerInfo: 다음 버튼 클릭, 탭 전환 to payment");
    setTabValue("payment");
  };

  const handlePrevious = () => {
    console.log("PassengerInfo: 이전 버튼 클릭, 탭 전환 to seat-selection");
    setTabValue("seat-selection");
  };

  return (
    <TabsContent value="passenger-info" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">탑승객 정보</h3>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
            <h4 className="mb-3 text-md font-medium text-traveling-text">탑승객 {index + 1}</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-first-name`}>이름 (영문)</Label>
                <input
                  id={`passenger-${index}-first-name`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="예: GILDONG"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-last-name`}>성 (영문)</Label>
                <input
                  id={`passenger-${index}-last-name`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="예: HONG"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-birth`}>생년월일</Label>
                <input
                  id={`passenger-${index}-birth`}
                  className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                  placeholder="생년월일 8자리 (예: 2000-12-31)"
                  value={passenger.birthDate}
                  onChange={(e) => handlePassengerChange(index, "birthDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-gender`}>성별</Label>
                <Select
                  value={passenger.gender}
                  onValueChange={(value) => handlePassengerChange(index, "gender", value)}
                >
                  <SelectTrigger id={`passenger-${index}-gender`} className="w-full">
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="z-[1000] bg-white">
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-nationality`}>국적</Label>
                <Select
                  value={passenger.nationality}
                  onValueChange={(value) => handlePassengerChange(index, "nationality", value)}
                >
                  <SelectTrigger id={`passenger-${index}-nationality`} className="w-full">
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="z-[1000] bg-white">
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
                  value={passenger.passport}
                  onChange={(e) => handlePassengerChange(index, "passport", e.target.value)}
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
                value={contact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">연락처</Label>
              <input
                id="contact-phone"
                className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                placeholder="연락처를 입력하세요"
                type="tel"
                value={contact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full border-traveling-text/30 text-traveling-text"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전: 좌석 선택
          </Button>
          <Button className="rounded-full btn-flight" onClick={handleNext}>
            다음: 결제
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

function PaymentInfo({ flight, passengerCount, selectedSeats, formatPrice, handleBooking, setTabValue }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const validatePayment = () => {
    if (!termsAgreed) {
      alert("이용약관과 개인정보 처리방침에 동의해주세요.");
      return false;
    }
    if (paymentMethod === "card") {
      if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number.replace(/-/g, ""))) {
        alert("유효한 카드 번호를 입력해주세요.");
        return false;
      }
      if (!cardDetails.name) {
        alert("카드 소유자 이름을 입력해주세요.");
        return false;
      }
      if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        alert("유효한 유효 기간을 입력해주세요 (MM/YY).");
        return false;
      }
      if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
        alert("유효한 CVV 코드를 입력해주세요.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validatePayment()) return;
    console.log("PaymentInfo: 예약 완료 버튼 클릭, 예약 처리");
    handleBooking();
  };

  const handlePrevious = () => {
    console.log("PaymentInfo: 이전 버튼 클릭, 탭 전환 to passenger-info");
    setTabValue("passenger-info");
  };

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
          <h3 className="mb-3 text-md font-medium text-traveling-text">결제 수단</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-card"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <Label htmlFor="payment-card">신용/체크카드</Label>
            </div>
            {paymentMethod === "card" && (
              <div className="rounded-lg border border-traveling-text/10 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">카드 번호</Label>
                    <input
                      id="card-number"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="0000-0000-0000-0000"
                      value={cardDetails.number}
                      onChange={(e) => handleCardChange("number", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">카드 소유자 이름</Label>
                    <input
                      id="card-name"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="카드에 표시된 이름"
                      value={cardDetails.name}
                      onChange={(e) => handleCardChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">유효 기간</Label>
                    <input
                      id="card-expiry"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardChange("expiry", e.target.value)}
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
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardChange("cvv", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-bank"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <Label htmlFor="payment-bank">계좌이체</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-kakao"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "kakao"}
                onChange={() => setPaymentMethod("kakao")}
              />
              <Label htmlFor="payment-kakao">카카오페이</Label>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-traveling-text/10 bg-white p-4">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms-agree"
              className="mt-1 h-4 w-4 text-traveling-pink"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
            />
            <Label htmlFor="terms-agree" className="text-sm">
              본인은 <span className="text-traveling-pink">이용약관</span>과{" "}
              <span className="text-traveling-pink">개인정보 처리방침</span>에 동의하며, 위 내용이 사실과 다를 경우
              발생하는 불이익에 대한 책임은 본인에게 있음을 확인합니다.
            </Label>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full border-traveling-text/30 text-traveling-text"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전: 탑승객 정보
          </Button>
          <Button className="rounded-full btn-flight" onClick={handleNext}>
            예약 완료
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

export default function FlightDetailContent({ flightId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [tabValue, setTabValue] = useState("flight-info");

  useEffect(() => {
    console.log("FlightDetailContent 마운트", {
      flightId,
      location: location.pathname,
    });

    async function fetchFlight(id) {
      if (!id || isNaN(parseInt(id))) {
        console.error("유효하지 않은 flightId:", id);
        setError(
          `유효하지 않은 항공편 ID입니다. URL 파라미터를 확인하세요: ${location.pathname}`
        );
        setLoading(false);
        return;
      }

      try {
        console.log("API 요청 시작: GET /api/flights/detail/by-travel-flight/", id);
        const response = await axios.get(`http://localhost:8080/api/flights/detail/by-travel-flight/${id}`, {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
        });
        console.log("API 응답 수신:", response.data);

        if (response.data && response.data.success && response.data.data) {
          const flightInfo = response.data.data;
          const normalizedFlight = {
            ...flightInfo,
            departureAirport: flightInfo.departureAirport?.trim().toUpperCase(),
            arrivalAirport: flightInfo.arrivalAirport?.trim().toUpperCase(),
            returnDepartureAirport: flightInfo.returnDepartureAirport?.trim().toUpperCase(),
            returnArrivalAirport: flightInfo.returnArrivalAirport?.trim().toUpperCase(),
          };
          setFlight(normalizedFlight);
          setIsRoundTrip(!!flightInfo.returnDepartureTime);
          console.log("항공편 데이터 설정 완료:", normalizedFlight);
        } else {
          console.warn("항공편 데이터가 비어 있거나 유효하지 않음:", response.data);
          setError("항공편 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("API 요청 실패:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        let errorMessage = "항공편 정보를 가져오는 데 실패했습니다.";
        if (err.response?.status === 404) {
          errorMessage = `항공편을 찾을 수 없습니다: ID = ${id}`;
        } else if (err.response?.status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
        } else if (err.code === "ECONNREFUSED") {
          errorMessage = "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.";
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
        console.log("로딩 상태 해제, 현재 상태:", { loading: false, error, flight });
      }
    }

    fetchFlight(flightId);
  }, [flightId, location.pathname]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = () => {
    console.log("예약 완료:", { flight, selectedSeats, passengerCount });
    navigate("/mypage");
  };

  if (loading) {
    return <div className="flex justify-center py-12">로딩 중...</div>;
  }

  if (error || !flight) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-traveling-text">항공권을 찾을 수 없습니다</h2>
        <p className="mt-2 text-traveling-text/70">{error || "요청하신 항공권 정보를 찾을 수 없습니다."}</p>
        <Button className="mt-6 rounded-full btn-flight" onClick={() => navigate("/flight-search")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          항공권 검색으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="flight-info">항공편 정보</TabsTrigger>
              <TabsTrigger value="seat-selection">좌석 선택</TabsTrigger>
              <TabsTrigger value="passenger-info">탑승객 정보</TabsTrigger>
              <TabsTrigger value="payment">결제</TabsTrigger>
            </TabsList>
            <FlightInfoSection
              flight={flight}
              formatPrice={formatPrice}
              isRoundTrip={isRoundTrip}
              formattedTimes={location.state}
              setTabValue={setTabValue}
            />
            <SeatSelection
              passengerCount={passengerCount}
              selectedSeats={selectedSeats}
              setPassengerCount={setPassengerCount}
              setSelectedSeats={setSelectedSeats}
              setTabValue={setTabValue}
            />
            <PassengerInfo
              passengerCount={passengerCount}
              setTabValue={setTabValue}
            />
            <PaymentInfo
              flight={flight}
              passengerCount={passengerCount}
              selectedSeats={selectedSeats}
              formatPrice={formatPrice}
              handleBooking={handleBooking}
              setTabValue={setTabValue}
            />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}