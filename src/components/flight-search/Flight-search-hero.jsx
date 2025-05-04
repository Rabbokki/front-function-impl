import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Users, MapPin, Plane, Info } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../modules/Tabs";
import { Input } from "../../modules/Input";
import { Label } from "../../modules/Label";
import { RadioGroup, RadioGroupItem } from "../../modules/Radio-group";
import { Badge } from "../../modules/Badge";
import { setSearchParams, clearError } from "../../hooks/reducer/flight/flightSlice";
import { searchFlights } from "../../hooks/reducer/flight/flightThunk";

const FlightSearchHero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchParams, loading, error } = useSelector((state) => state.flight);

  const handleSearch = async () => {
    // 입력 유효성 검사
    if (!searchParams.from) {
      alert("출발지를 입력해주세요.");
      return;
    }
    if (!searchParams.to) {
      alert("도착지를 입력해주세요.");
      return;
    }
    if (!searchParams.date) {
      alert("출발일을 입력해주세요.");
      return;
    }
    if (searchParams.tripType === "roundtrip" && !searchParams.return) {
      alert("왕복 여행의 경우 귀국일을 입력해주세요.");
      return;
    }

    try {
      await dispatch(searchFlights(searchParams)).unwrap();
      const query = new URLSearchParams({
        from: encodeURIComponent(searchParams.from),
        to: encodeURIComponent(searchParams.to),
        date: searchParams.date,
        return: searchParams.return,
        passengers: searchParams.passengers.toString(),
        tripType: searchParams.tripType,
      }).toString();
      navigate(`/flight-search/results?${query}`);
    } catch (err) {
      alert(`검색 중 오류가 발생했습니다: ${err}`);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 h-[500px] w-full overflow-hidden">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="항공기 배경"
          className="h-full w-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <div className="mx-auto mt-12 max-w-4xl">
          <Card className="overflow-hidden border-none bg-white/90 shadow-lg backdrop-blur-sm">
            <CardContent className="p-0">
              <Tabs defaultValue="flight" className="w-full">
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <TabsList className="grid w-auto grid-cols-2 rounded-full bg-gray-100 p-1">
                    <TabsTrigger
                      value="flight"
                      className="rounded-full px-6 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      항공
                    </TabsTrigger>
                    <TabsTrigger
                      value="fund"
                      className="rounded-full px-6 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      편도
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center">
                    <Badge variant="outline" className="flex items-center gap-1 rounded-full border-gray-300 px-3 py-1">
                      <Info className="h-3 w-3" />
                      <span className="text-xs">직항만 검색</span>
                    </Badge>
                  </div>
                </div>
                <TabsContent value="flight" className="p-6">
                  {error && (
                    <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
                      {error}
                      <button
                        onClick={() => dispatch(clearError())}
                        className="ml-2 text-sm underline"
                      >
                        닫기
                      </button>
                    </div>
                  )}
                  <div className="mb-6">
                    <RadioGroup
                      defaultValue="roundtrip"
                      className="flex space-x-4"
                      onValueChange={(value) => dispatch(setSearchParams({ tripType: value }))}
                    >
                      {[
                        { id: "roundtrip", label: "왕복" },
                        { id: "oneway", label: "편도" },
                        { id: "multicity", label: "다구간" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={item.id} id={item.id} />
                          <Label htmlFor={item.id}>{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="departure" className="mb-2 block">
                        출발지
                      </Label>
                      <div className="relative">
                      <Input
                        id="departure"
                        value={searchParams.from}
                        onChange={(e) => dispatch(setSearchParams({ from: e.target.value }))}
                        className="bg-gray-50 pl-10"
                        placeholder="도시 또는 공항 (예: 서울 SEL)"
                      />
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="arrival" className="mb-2 block">
                        도착지
                      </Label>
                      <div className="relative">
                        <Input
                          id="arrival"
                          value={searchParams.to}
                          onChange={(e) => dispatch(setSearchParams({ to: e.target.value }))}
                          className="bg-gray-50 pl-10"
                          placeholder="도시 또는 공항"
                        />
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="departure-date" className="mb-2 block">
                        출발일
                      </Label>
                      <div className="relative">
                        <Input
                          id="departure-date"
                          type="date"
                          value={searchParams.date}
                          onChange={(e) => dispatch(setSearchParams({ date: e.target.value }))}
                          className="bg-gray-50"
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="return-date" className="mb-2 block">
                        귀국일
                      </Label>
                      <div className="relative">
                        <Input
                          id="return-date"
                          type="date"
                          value={searchParams.return}
                          onChange={(e) => dispatch(setSearchParams({ return: e.target.value }))}
                          className="bg-gray-50"
                          disabled={searchParams.tripType === "oneway"}
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="passengers" className="mb-2 block">
                      탑승객
                    </Label>
                    <div className="relative">
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        value={searchParams.passengers}
                        onChange={(e) =>
                          dispatch(setSearchParams({ passengers: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-50 pl-10"
                      />
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-orange-500 py-6 text-lg font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                  >
                    {loading ? "검색 중..." : "검색"}
                  </Button>
                </TabsContent>
                <TabsContent value="fund" className="p-6">
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <Plane className="mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="text-lg font-medium">펀드 서비스 준비 중</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      더 나은 서비스를 위해 준비 중입니다. 조금만 기다려주세요.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchHero;
