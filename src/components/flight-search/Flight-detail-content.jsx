export function FlightDetailContent({ flightId }) {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);

  const flight = flightData.find((f) => f.id === flightId);

  if (!flight) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-traveling-text">항공권을 찾을 수 없습니다</h2>
        <p className="mt-2 text-traveling-text/70">요청하신 항공권 정보를 찾을 수 없습니다.</p>
        <Button className="mt-6 rounded-full btn-flight" onClick={() => navigate("/flight-search")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          항공권 검색으로 돌아가기
        </Button>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = () => {
    navigate("/mypage");
  };

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
    <div className="space-y-6">
      <Button
        variant="outline"
        className="mb-4 border-traveling-text/30 text-traveling-text"
        onClick={() => navigate("/flight-search")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        항공권 검색으로 돌아가기
      </Button>

      <Card className="overflow-hidden bg-white shadow-md">
        <CardHeader className="border-b border-traveling-text/10 bg-traveling-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${flight.color}`}>
                <span className="font-bold text-white">{flight.logo}</span>
              </div>
              <div className="ml-4">
                <CardTitle className="text-xl font-bold text-traveling-text">{flight.airline}</CardTitle>
                <p className="text-sm text-traveling-text/70">
                  {flight.flightNumber} | {flight.aircraft}
                </p>
              </div>
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
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="flight-info">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="flight-info">항공편 정보</TabsTrigger>
              <TabsTrigger value="seat-selection">좌석 선택</TabsTrigger>
              <TabsTrigger value="passenger-info">탑승객 정보</TabsTrigger>
              <TabsTrigger value="payment">결제</TabsTrigger>
            </TabsList>

            <TabsContent value="flight-info" className="space-y-6">
              <div className="rounded-lg bg-traveling-background p-6">
                <h3 className="mb-4 text-lg font-bold text-traveling-text">가는 편</h3>
                <div className="flex flex-col justify-between md:flex-row">
                  <div className="flex items-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-traveling-text">{flight.departure}</div>
                      <div className="text-sm text-traveling-text/70">{flight.from}</div>
                      <div className="mt-1 text-xs text-traveling-text/70">{flight.departureTerminal}</div>
                      <div className="mt-1 text-xs font-medium text-traveling-text">{flight.departureDate}</div>
                    </div>

                    <div className="mx-4 flex flex-1 flex-col items-center">
                      <div className="text-xs text-traveling-text/70">{flight.duration}</div>
                      <div className="relative w-full">
                        <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10" />
                        <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
                      </div>
                      {flight.stopDetails && (
                        <div className="mt-1 text-xs text-traveling-pink">{flight.stopDetails}</div>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold text-traveling-text">{flight.arrival}</div>
                      <div className="text-sm text-traveling-text/70">{flight.to}</div>
                      <div className="mt-1 text-xs text-traveling-text/70">{flight.arrivalTerminal}</div>
                      <div className="mt-1 text-xs font-medium text-traveling-text">{flight.departureDate}</div>
                    </div>
                  </div>
                </div>

                {flight.stops === "1회 경유" && flight.connectionDetails && (
                  <div className="mt-4 rounded-lg bg-traveling-background/50 p-4">
                    <h4 className="mb-2 text-sm font-medium text-traveling-text">경유 정보</h4>
                    <div className="text-sm text-traveling-text/70">
                      <p>
                        <span className="font-medium">공항:</span> {flight.connectionDetails.airport}
                      </p>
                      <p>
                        <span className="font-medium">도착:</span> {flight.connectionDetails.arrivalTime} |{" "}
                        <span className="font-medium">출발:</span> {flight.connectionDetails.departureTime}
                      </p>
                      <p>
                        <span className="font-medium">터미널:</span> {flight.connectionDetails.terminal} |{" "}
                        <span className="font-medium">연결 항공편:</span> {flight.connectionDetails.connectionFlightNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-traveling-background p-6">
      <h3 className="mb-4 text-lg font-bold text-traveling-text">오는 편</h3>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center">
          {/* 출발 */}
          <div className="text-center">
            <div className="text-xl font-bold text-traveling-text">{flight.returnDeparture}</div>
            <div className="text-sm text-traveling-text/70">{flight.to}</div>
            <div className="mt-1 text-xs text-traveling-text/70">{flight.arrivalTerminal}</div>
            <div className="mt-1 text-xs font-medium text-traveling-text">{flight.returnDate}</div>
          </div>

          {/* 경로 아이콘 */}
          <div className="mx-4 flex flex-1 flex-col items-center">
            <div className="text-xs text-traveling-text/70">{flight.returnDuration}</div>
            <div className="relative w-full">
              <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-traveling-text/10"></div>
              <ArrowRight className="relative mx-auto h-4 w-4 text-traveling-text" />
            </div>
          </div>

          {/* 도착 */}
          <div className="text-center">
            <div className="text-xl font-bold text-traveling-text">{flight.returnArrival}</div>
            <div className="text-sm text-traveling-text/70">{flight.from}</div>
            <div className="mt-1 text-xs text-traveling-text/70">{flight.departureTerminal}</div>
            <div className="mt-1 text-xs font-medium text-traveling-text">{flight.returnDate}</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
        {/* 항공편 상세 정보 */}
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">항공편 상세 정보</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <Plane className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">항공기</p>
                <p className="text-traveling-text/70">{flight.aircraft}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">좌석 등급</p>
                <p className="text-traveling-text/70">{flight.cabinClass}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Luggage className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">수하물 허용량</p>
                <p className="text-traveling-text/70">{flight.baggageAllowance}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="mr-2 h-5 w-5 text-traveling-text" />
              <div>
                <p className="font-medium text-traveling-text">여행 일정</p>
                <p className="text-traveling-text/70">
                  {flight.departureDate} - {flight.returnDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 요금 정보 */}
        <div className="rounded-lg bg-traveling-background p-6">
          <h3 className="mb-4 text-lg font-bold text-traveling-text">요금 정보</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-traveling-text/70">성인 1인</span>
              <span className="font-medium text-traveling-text">{formatPrice(flight.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-traveling-text/70">세금 및 수수료</span>
              <span className="font-medium text-traveling-text">{formatPrice(flight.price * 0.1)}</span>
            </div>
            <div className="border-t border-traveling-text/10 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-traveling-text">총 요금</span>
                <span className="text-lg font-bold text-traveling-text">
                  {formatPrice(flight.price + flight.price * 0.1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
  <Button className="rounded-full btn-flight">
    다음: 좌석 선택
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</div>

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
          <div className="mr-2 h-4 w-4 rounded-sm bg-traveling-mint"></div>
          <span>이용 가능</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-sm bg-traveling-pink"></div>
          <span>선택됨</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-sm bg-gray-400"></div>
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


            <TabsContent value="passenger-info" className="space-y-6">
            <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">탑승객 정보</h3>

        {Array.from({ length: passengerCount }, (_, index) => (
          <div
            key={index}
            className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4"
          >
            <h4 className="mb-3 text-md font-medium text-traveling-text">
              탑승객 {index + 1}
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`passenger-${index}-first-name`}>
                  이름 (영문)
                </Label>
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
      </div>

      <div className="flex justify-end">
        <Button className="rounded-full btn-flight">
          다음: 결제
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
            <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">결제 정보</h3>

        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h4 className="mb-3 text-md font-medium text-traveling-text">결제 요약</h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-traveling-text/70">항공권 요금 (성인 {passengerCount}명)</span>
              <span className="font-medium text-traveling-text">{formatPrice(flight.price * passengerCount)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-traveling-text/70">세금 및 수수료</span>
              <span className="font-medium text-traveling-text">{formatPrice(flight.price * passengerCount * 0.1)}</span>
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
                    flight.price * passengerCount +
                    flight.price * passengerCount * 0.1 +
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
              <input type="radio" id="payment-card" name="payment-method" className="h-4 w-4 text-traveling-pink" defaultChecked />
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
              <input type="radio" id="payment-bank" name="payment-method" className="h-4 w-4 text-traveling-pink" />
              <Label htmlFor="payment-bank">계좌이체</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="radio" id="payment-kakao" name="payment-method" className="h-4 w-4 text-traveling-pink" />
              <Label htmlFor="payment-kakao">카카오페이</Label>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-traveling-text/10 bg-white p-4">
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms-agree" className="mt-1 h-4 w-4 text-traveling-pink" />
            <Label htmlFor="terms-agree" className="text-sm">
              본인은 <span className="text-traveling-pink">이용약관</span>과 <span className="text-traveling-pink">개인정보 처리방침</span>에 동의하며,
              위 내용이 사실과 다를 경우 발생하는 불이익에 대한 책임은 본인에게 있음을 확인합니다.
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="rounded-full btn-flight" onClick={handleBooking}>
          예약 완료
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
  );
}
