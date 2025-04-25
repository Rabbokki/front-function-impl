import { useState } from "react"
import { Calendar, Plane, Building, Search, MapPin, Star } from "lucide-react"
import { Button } from "./Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Input } from "./Input"
import { Label } from "./Label"
import { RadioGroup, RadioGroupItem } from "./Radio-group"
import { Card, CardContent } from "./Card"

export function FlightAccommodationContent() {
  const [tripType, setTripType] = useState("roundtrip")

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <Tabs defaultValue="flight" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 bg-[#e7f5ff]">
          <TabsTrigger value="flight" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            <Plane className="mr-2 h-4 w-4" />
            항공권
          </TabsTrigger>
          <TabsTrigger
            value="accommodation"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            <Building className="mr-2 h-4 w-4" />
            숙소
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flight">
          <div className="mb-6">
            <RadioGroup defaultValue="roundtrip" className="flex space-x-4" onValueChange={setTripType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundtrip" id="roundtrip" />
                <Label htmlFor="roundtrip">왕복</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oneway" id="oneway" />
                <Label htmlFor="oneway">편도</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multicity" id="multicity" />
                <Label htmlFor="multicity">다구간</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="departure" className="mb-2 block">
                출발지
              </Label>
              <div className="relative">
                <Input id="departure" placeholder="도시 또는 공항" className="bg-[#f8f9fa] pl-10" />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="arrival" className="mb-2 block">
                도착지
              </Label>
              <div className="relative">
                <Input id="arrival" placeholder="도시 또는 공항" className="bg-[#f8f9fa] pl-10" />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="departure-date" className="mb-2 block">
                출발일
              </Label>
              <div className="relative">
                <Input id="departure-date" type="date" className="bg-[#f8f9fa]" />
                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            {tripType === "roundtrip" && (
              <div>
                <Label htmlFor="return-date" className="mb-2 block">
                  귀국일
                </Label>
                <div className="relative">
                  <Input id="return-date" type="date" className="bg-[#f8f9fa]" />
                  <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <Label htmlFor="adults" className="mb-2 block">
                성인
              </Label>
              <Input id="adults" type="number" defaultValue="1" min="1" className="bg-[#f8f9fa]" />
            </div>
            <div>
              <Label htmlFor="children" className="mb-2 block">
                소아
              </Label>
              <Input id="children" type="number" defaultValue="0" min="0" className="bg-[#f8f9fa]" />
            </div>
            <div>
              <Label htmlFor="infants" className="mb-2 block">
                유아
              </Label>
              <Input id="infants" type="number" defaultValue="0" min="0" className="bg-[#f8f9fa]" />
            </div>
          </div>

          <Button className="mt-8 w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
            <Search className="mr-2 h-4 w-4" />
            항공권 검색
          </Button>
        </TabsContent>

        <TabsContent value="accommodation">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="location" className="mb-2 block">
                여행지
              </Label>
              <div className="relative">
                <Input id="location" placeholder="도시 또는 숙소명" className="bg-[#f8f9fa] pl-10" />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="guests" className="mb-2 block">
                인원
              </Label>
              <Input id="guests" type="number" defaultValue="2" min="1" className="bg-[#f8f9fa]" />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="check-in" className="mb-2 block">
                체크인
              </Label>
              <div className="relative">
                <Input id="check-in" type="date" className="bg-[#f8f9fa]" />
                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="check-out" className="mb-2 block">
                체크아웃
              </Label>
              <div className="relative">
                <Input id="check-out" type="date" className="bg-[#f8f9fa]" />
                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
          </div>

          <Button className="mt-8 w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
            <Search className="mr-2 h-4 w-4" />
            숙소 검색
          </Button>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-[#1e3a8a]">인기 여행지 특가</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { city: "도쿄", price: "₩250,000~", flag: "🇯🇵", color: "#ff6b6b" },
            { city: "파리", price: "₩850,000~", flag: "🇫🇷", color: "#4dabf7" },
            { city: "로마", price: "₩780,000~", flag: "🇮🇹", color: "#51cf66" },
            { city: "방콕", price: "₩350,000~", flag: "🇹🇭", color: "#ffd43b" },
          ].map((item, index) => (
            <Card key={index} className="overflow-hidden bg-[#f8f9fa] transition-transform hover:scale-105">
              <div className="relative h-40 w-full bg-[#e7f5ff]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-20 w-20">
                    {index === 0 && (
                      <>
                        <path d="M50,80 L30,40 L70,40 Z" fill="#ff6b6b" />
                        <rect x="45" y="20" width="10" height="20" fill="#ff6b6b" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <path d="M50,20 L60,50 L40,50 Z" fill="#4dabf7" />
                        <rect x="45" y="50" width="10" height="30" fill="#4dabf7" />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <circle cx="50" cy="50" r="30" fill="#51cf66" />
                        <circle cx="50" cy="50" r="20" fill="white" />
                        <path d="M30,50 L70,50 M50,30 L50,70" stroke="#51cf66" strokeWidth="5" />
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <path d="M50,20 L65,40 L60,65 L40,65 L35,40 Z" fill="#ffd43b" />
                        <path d="M40,65 L60,65 L55,80 L45,80 Z" fill="#ffd43b" />
                      </>
                    )}
                  </svg>
                </div>
                <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-sm font-bold">
                  {item.flag}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-[#1e3a8a]">{item.city}</h3>
                <div className="mt-1 flex items-center text-sm text-[#495057]">
                  <Star className="mr-1 h-3 w-3 fill-[#ffd43b] text-[#ffd43b]" />
                  <Star className="mr-1 h-3 w-3 fill-[#ffd43b] text-[#ffd43b]" />
                  <Star className="mr-1 h-3 w-3 fill-[#ffd43b] text-[#ffd43b]" />
                  <Star className="mr-1 h-3 w-3 fill-[#ffd43b] text-[#ffd43b]" />
                  <Star className="mr-1 h-3 w-3 fill-[#dee2e6] text-[#dee2e6]" />
                  <span className="ml-1">4.0</span>
                </div>
                <p className="mt-2 text-sm text-[#495057]">왕복 최저가</p>
                <p className="mt-1 text-lg font-bold" style={{ color: item.color }}>
                  {item.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}