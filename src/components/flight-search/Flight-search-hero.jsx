import React, { useState, useEffect } from "react";
import axios from "axios";
import { Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Users, MapPin, Plane, Info } from "lucide-react";
import { Button } from "../../modules/Button";
import { Card, CardContent } from "../../modules/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../modules/Tabs";
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

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(null);

  useEffect(() => {
    dispatch(setSearchParams({
      from: "",
      fromLabel: "",
      to: "",
      toLabel: "",
      date: "",
      return: "",
      passengers: 1,
      tripType: "roundtrip"
    }));
    dispatch(clearError());
    setFromQuery("");
    setToQuery("");
    setFromSuggestions([]);
    setToSuggestions([]);
    setAutocompleteError(null);
  }, [dispatch]);

  const fetchSuggestions = async (query, field) => {
    if (query.length < 2) {
      field === "from" ? setFromSuggestions([]) : setToSuggestions([]);
      setAutocompleteError(null);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get("/api/flights/autocomplete", {
        params: { term: query },
      });
      if (response.data.success) {
        const suggestions = response.data.data.map((item) => ({
          label: `${item.detailedName} (${item.iataCode})`,
          value: item.iataCode,
          isAirport: item.subType === "AIRPORT",
        }));
        field === "from" ? setFromSuggestions(suggestions) : setToSuggestions(suggestions);
        setAutocompleteError(null);
      } else {
        field === "from" ? setFromSuggestions([]) : setToSuggestions([]);
        setAutocompleteError("검색 결과가 없습니다. 영문 도시명(예: Paris) 또는 공항 코드(예: CDG)를 입력해주세요.");
      }
    } catch (err) {
      field === "from" ? setFromSuggestions([]) : setToSuggestions([]);
      setAutocompleteError("검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(fromQuery, "from"), 300);
    return () => clearTimeout(timer);
  }, [fromQuery]);

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(toQuery, "to"), 300);
    return () => clearTimeout(timer);
  }, [toQuery]);

  const handleSearch = async () => {
    if (!searchParams.from || !/^[A-Z]{3}$/.test(searchParams.from)) {
      alert("출발지를 드롭다운에서 선택하거나 유효한 공항 코드(예: CDG)를 입력해주세요.");
      return;
    }
    if (!searchParams.to || !/^[A-Z]{3}$/.test(searchParams.to)) {
      alert("도착지를 드롭다운에서 선택하거나 유효한 공항 코드(예: JFK)를 입력해주세요.");
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
      await dispatch(searchFlights({
        origin: searchParams.from,
        destination: searchParams.to,
        departureDate: searchParams.date,
        returnDate: searchParams.return,
        realTime: searchParams.tripType === "roundtrip",
      })).unwrap();
      const query = new URLSearchParams({
        from: encodeURIComponent(`${searchParams.fromLabel || searchParams.from}`),
        to: encodeURIComponent(`${searchParams.toLabel || searchParams.to}`),
        date: searchParams.date,
        return: searchParams.return || "",
        passengers: searchParams.passengers.toString(),
        tripType: searchParams.tripType,
      }).toString();
      console.log('Search query:', query);
      navigate(`/flight-search/results?${query}`);
    } catch (err) {
      const errorMessage = err?.message || "항공편을 찾을 수 없습니다. 다른 경로 또는 날짜를 시도해주세요.";
      alert(`검색 오류: ${errorMessage}`);
    }
  };

  const handleComboboxInput = (field, value) => {
    const iataPattern = /^[A-Z]{3}$/;
    if (iataPattern.test(value)) {
      dispatch(setSearchParams({
        [field]: value,
        [`${field}Label`]: value,
      }));
    } else {
      dispatch(setSearchParams({
        [field]: "",
        [`${field}Label`]: "",
      }));
    }
    field === "from" ? setFromQuery(value) : setToQuery(value);
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
                  {(error || autocompleteError) && (
                    <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
                      {error || autocompleteError}
                      <button
                        onClick={() => {
                          dispatch(clearError());
                          setAutocompleteError(null);
                          fetchSuggestions(fromQuery || toQuery, fromQuery ? "from" : "to");
                        }}
                        className="ml-2 text-sm underline"
                      >
                        재시도
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
                        <Combobox
                          value={searchParams.fromLabel || ""}
                          onChange={(suggestion) => {
                            if (suggestion) {
                              dispatch(setSearchParams({
                                from: suggestion.value,
                                fromLabel: suggestion.label,
                              }));
                            } else {
                              dispatch(setSearchParams({
                                from: "",
                                fromLabel: "",
                              }));
                            }
                          }}
                        >
                          <div className="relative">
                            <Combobox.Input
                              id="departure"
                              className="bg-gray-50 pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              onChange={(e) => handleComboboxInput("from", e.target.value)}
                              placeholder="도시 또는 공항 (예: Paris 또는 CDG)"
                              displayValue={() => searchParams.fromLabel || ""}
                            />
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          </div>
                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {isLoading && (
                              <div className="py-2 px-4 text-gray-500">로딩 중...</div>
                            )}
                            {fromSuggestions.length === 0 && !isLoading && fromQuery.length >= 2 && (
                              <div className="py-2 px-4 text-gray-500">
                                {autocompleteError || "검색 결과 없음"}
                                {autocompleteError && (
                                  <button
                                    onClick={() => fetchSuggestions(fromQuery, "from")}
                                    className="ml-2 text-sm underline"
                                  >
                                    재시도
                                  </button>
                                )}
                              </div>
                            )}
                            {fromSuggestions.map((suggestion) => (
                              <Combobox.Option
                                key={`${suggestion.value}-${suggestion.isAirport ? 'airport' : 'city'}`}
                                value={suggestion}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 px-4 ${
                                    active ? "bg-orange-500 text-white" : "text-gray-900"
                                  }`
                                }
                              >
                                {suggestion.isAirport ? "✈️" : "🏙️"} {suggestion.label}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Combobox>
                        {searchParams.from && !/^[A-Z]{3}$/.test(searchParams.from) && (
                          <span className="text-red-500 text-sm">드롭다운에서 공항을 선택하거나 유효한 공항 코드(예: CDG)를 입력해주세요</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="arrival" className="mb-2 block">
                        도착지
                      </Label>
                      <div className="relative">
                        <Combobox
                          value={searchParams.toLabel || ""}
                          onChange={(suggestion) => {
                            if (suggestion) {
                              dispatch(setSearchParams({
                                to: suggestion.value,
                                toLabel: suggestion.label,
                              }));
                            } else {
                              dispatch(setSearchParams({
                                to: "",
                                toLabel: "",
                              }));
                            }
                          }}
                        >
                          <div className="relative">
                            <Combobox.Input
                              id="arrival"
                              className="bg-gray-50 pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              onChange={(e) => handleComboboxInput("to", e.target.value)}
                              placeholder="도시 또는 공항 (예: New York 또는 JFK)"
                              displayValue={() => searchParams.toLabel || ""}
                            />
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          </div>
                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {isLoading && (
                              <div className="py-2 px-4 text-gray-500">로딩 중...</div>
                            )}
                            {toSuggestions.length === 0 && !isLoading && toQuery.length >= 2 && (
                              <div className="py-2 px-4 text-gray-500">
                                {autocompleteError || "검색 결과 없음"}
                                {autocompleteError && (
                                  <button
                                    onClick={() => fetchSuggestions(toQuery, "to")}
                                    className="ml-2 text-sm underline"
                                  >
                                    재시도
                                  </button>
                                )}
                              </div>
                            )}
                            {toSuggestions.map((suggestion) => (
                              <Combobox.Option
                                key={`${suggestion.value}-${suggestion.isAirport ? 'airport' : 'city'}`}
                                value={suggestion}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 px-4 ${
                                    active ? "bg-orange-500 text-white" : "text-gray-900"
                                  }`
                                }
                              >
                                {suggestion.isAirport ? "✈️" : "🏙️"} {suggestion.label}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Combobox>
                        {searchParams.to && !/^[A-Z]{3}$/.test(searchParams.to) && (
                          <span className="text-red-500 text-sm">드롭다운에서 공항을 선택하거나 유효한 공항 코드(예: JFK)를 입력해주세요</span>
                        )}
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
                          min={new Date().toISOString().split("T")[0]}
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
                          min={searchParams.date || new Date().toISOString().split("T")[0]}
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