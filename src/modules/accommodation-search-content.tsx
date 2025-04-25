"use client"

import { useState } from "react"
import { Calendar, Search, MapPin, Filter, Star, Wifi, Coffee, Utensils, Dumbbell, Bath, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccommodationSearchContent() {
  const [showResults, setShowResults] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [starRating, setStarRating] = useState<string[]>([])
  const [propertyType, setPropertyType] = useState<string[]>([])
  const [facilities, setFacilities] = useState<string[]>([])

  const handleSearch = () => {
    setShowResults(true)
  }

  const toggleStarRating = (rating: string) => {
    if (starRating.includes(rating)) {
      setStarRating(starRating.filter((r) => r !== rating))
    } else {
      setStarRating([...starRating, rating])
    }
  }

  const togglePropertyType = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter((t) => t !== type))
    } else {
      setPropertyType([...propertyType, type])
    }
  }

  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter((f) => f !== facility))
    } else {
      setFacilities([...facilities, facility])
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="destination" className="mb-2 block text-traveling-brown">
              여행지
            </Label>
            <div className="relative">
              <Input
                id="destination"
                placeholder="도시 또는 숙소명"
                className="bg-traveling-background pl-10 border-traveling-brown/30"
              />
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-brown" />
            </div>
          </div>
          <div>
            <Label htmlFor="check-in" className="mb-2 block text-traveling-brown">
              체크인
            </Label>
            <div className="relative">
              <Input id="check-in" type="date" className="bg-traveling-background border-traveling-brown/30" />
              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-brown" />
            </div>
          </div>
          <div>
            <Label htmlFor="check-out" className="mb-2 block text-traveling-brown">
              체크아웃
            </Label>
            <div className="relative">
              <Input id="check-out" type="date" className="bg-traveling-background border-traveling-brown/30" />
              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveling-brown" />
            </div>
          </div>
          <div>
            <Label htmlFor="guests" className="mb-2 block text-traveling-brown">
              인원
            </Label>
            <Select defaultValue="2">
              <SelectTrigger id="guests" className="bg-traveling-background border-traveling-brown/30">
                <SelectValue placeholder="인원 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">성인 1명</SelectItem>
                <SelectItem value="2">성인 2명</SelectItem>
                <SelectItem value="3">성인 3명</SelectItem>
                <SelectItem value="4">성인 4명</SelectItem>
                <SelectItem value="5">성인 5명 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="mt-8 w-full btn-travel" onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          숙소 검색
        </Button>
      </Card>

      {showResults && (
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Card className="bg-white p-4 shadow-md">
              <h2 className="mb-4 flex items-center text-lg font-bold text-traveling-brown">
                <Filter className="mr-2 h-5 w-5" />
                필터
              </h2>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-brown">가격 범위 (1박)</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 500000]}
                    max={500000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-traveling-brown/70">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm text-traveling-brown/70">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-brown">숙소 등급</h3>
                <div className="space-y-2">
                  {["5성급", "4성급", "3성급", "2성급 이하"].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={starRating.includes(rating)}
                        onCheckedChange={() => toggleStarRating(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-traveling-brown/70">
                        {rating}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-brown">숙소 유형</h3>
                <div className="space-y-2">
                  {["호텔", "리조트", "게스트하우스", "아파트", "빌라"].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={propertyType.includes(type)}
                        onCheckedChange={() => togglePropertyType(type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-traveling-brown/70">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium text-traveling-brown">시설</h3>
                <div className="space-y-2">
                  {[
                    { name: "무료 와이파이", icon: <Wifi className="h-4 w-4" /> },
                    { name: "조식 포함", icon: <Coffee className="h-4 w-4" /> },
                    { name: "레스토랑", icon: <Utensils className="h-4 w-4" /> },
                    { name: "피트니스 센터", icon: <Dumbbell className="h-4 w-4" /> },
                    { name: "수영장", icon: <Bath className="h-4 w-4" /> },
                  ].map((facility) => (
                    <div key={facility.name} className="flex items-center">
                      <Checkbox
                        id={`facility-${facility.name}`}
                        checked={facilities.includes(facility.name)}
                        onCheckedChange={() => toggleFacility(facility.name)}
                      />
                      <label
                        htmlFor={`facility-${facility.name}`}
                        className="ml-2 flex items-center text-sm text-traveling-brown/70"
                      >
                        <span className="mr-1 text-traveling-brown">{facility.icon}</span>
                        {facility.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full btn-travel">필터 적용</Button>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-traveling-brown">검색 결과</h2>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px] bg-white border-traveling-brown/30">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="price">가격 낮은순</SelectItem>
                  <SelectItem value="price-desc">가격 높은순</SelectItem>
                  <SelectItem value="rating">평점 높은순</SelectItem>
                  <SelectItem value="distance">중심지와의 거리순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "도쿄 럭셔리 호텔",
                  type: "호텔",
                  rating: 4.8,
                  reviews: 324,
                  location: "도쿄 신주쿠, 중심지에서 0.5km",
                  price: 250000,
                  facilities: ["무료 와이파이", "조식 포함", "수영장"],
                  image: "도쿄",
                  discount: "10% 할인",
                  color: "#e29c67",
                },
                {
                  name: "오사카 비즈니스 호텔",
                  type: "호텔",
                  rating: 4.5,
                  reviews: 256,
                  location: "오사카 난바, 중심지에서 0.3km",
                  price: 180000,
                  facilities: ["무료 와이파이", "레스토랑"],
                  image: "오사카",
                  discount: "",
                  color: "#8a9a7b",
                },
                {
                  name: "교토 전통 료칸",
                  type: "게스트하우스",
                  rating: 4.9,
                  reviews: 189,
                  location: "교토 기온, 중심지에서 1.2km",
                  price: 320000,
                  facilities: ["무료 와이파이", "조식 포함", "온천"],
                  image: "교토",
                  discount: "얼리버드 15% 할인",
                  color: "#f0d9b5",
                },
                {
                  name: "후쿠오카 시티 아파트먼트",
                  type: "아파트",
                  rating: 4.6,
                  reviews: 142,
                  location: "후쿠오카 하카타, 중심지에서 0.8km",
                  price: 150000,
                  facilities: ["무료 와이파이", "주방", "세탁 시설"],
                  image: "후쿠오카",
                  discount: "",
                  color: "#e29c67",
                },
                {
                  name: "삿포로 스키 리조트",
                  type: "리조트",
                  rating: 4.7,
                  reviews: 210,
                  location: "홋카이도 니세코, 스키장에서 0.2km",
                  price: 280000,
                  facilities: ["무료 와이파이", "조식 포함", "스파", "스키 장비 대여"],
                  image: "삿포로",
                  discount: "연박 20% 할인",
                  color: "#8a9a7b",
                },
              ].map((hotel, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-white shadow-md transition-transform hover:scale-[1.01]"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-64 w-full md:h-auto md:w-1/3">
                        <div className="absolute inset-0 bg-traveling-background">
                          <AccommodationIllustration cityName={hotel.image} />
                        </div>
                        {hotel.discount && (
                          <Badge className="absolute left-2 top-2 bg-traveling-orange text-white">
                            {hotel.discount}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 p-0 text-traveling-orange hover:bg-white hover:text-traveling-orange"
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-traveling-brown">{hotel.name}</h3>
                            <Badge className="mt-1 bg-traveling-background text-traveling-brown">{hotel.type}</Badge>
                          </div>
                          <div className="flex items-center rounded-lg bg-traveling-background px-2 py-1">
                            <Star className="mr-1 h-4 w-4 fill-traveling-orange text-traveling-orange" />
                            <span className="font-bold text-traveling-brown">{hotel.rating}</span>
                            <span className="ml-1 text-xs text-traveling-brown/70">({hotel.reviews})</span>
                          </div>
                        </div>

                        <p className="mb-2 flex items-center text-sm text-traveling-brown/70">
                          <MapPin className="mr-1 h-4 w-4 text-traveling-brown" />
                          {hotel.location}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {hotel.facilities.map((facility, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="border-traveling-brown/20 bg-white text-traveling-brown/70"
                            >
                              {facility}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div>
                            <p className="text-sm text-traveling-brown/70">1박 기준</p>
                            <p className="text-xl font-bold text-traveling-brown">{formatPrice(hotel.price)}</p>
                          </div>
                          <Button className="btn-travel">예약하기</Button>
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
                        ? "bg-traveling-beige text-traveling-brown hover:bg-traveling-beige/90"
                        : "border-traveling-brown/30 text-traveling-brown"
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

      {!showResults && (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-traveling-brown">인기 숙소</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "도쿄 센트럴 호텔",
                location: "도쿄, 일본",
                price: "₩180,000~",
                rating: 4.8,
                image: "도쿄",
                color: "#e29c67",
              },
              {
                name: "오사카 리버뷰 호텔",
                location: "오사카, 일본",
                price: "₩150,000~",
                rating: 4.6,
                image: "오사카",
                color: "#8a9a7b",
              },
              {
                name: "방콕 럭셔리 스위트",
                location: "방콕, 태국",
                price: "₩120,000~",
                rating: 4.7,
                image: "방콕",
                color: "#f0d9b5",
              },
              {
                name: "다낭 비치 리조트",
                location: "다낭, 베트남",
                price: "₩130,000~",
                rating: 4.9,
                image: "다낭",
                color: "#e29c67",
              },
            ].map((hotel, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-traveling-background transition-transform hover:scale-105"
              >
                <div className="relative h-40 w-full bg-white">
                  <AccommodationIllustration cityName={hotel.image} />
                  <div className="absolute right-2 top-2 rounded-lg bg-white/80 px-2 py-1">
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3 fill-traveling-orange text-traveling-orange" />
                      <span className="text-sm font-bold">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-medium text-traveling-brown">{hotel.name}</h3>
                  </div>
                  <p className="mb-2 flex items-center text-xs text-traveling-brown/70">
                    <MapPin className="mr-1 h-3 w-3 text-traveling-brown" />
                    {hotel.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-traveling-brown/70">1박 기준</p>
                    <p className="text-lg font-bold" style={{ color: hotel.color }}>
                      {hotel.price}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-traveling-brown">숙소 예약 팁</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-traveling-background p-4">
            <h3 className="mb-2 font-medium text-traveling-brown">얼리버드 할인을 노려보세요</h3>
            <p className="text-sm text-traveling-brown/70">
              많은 호텔들이 일찍 예약하는 고객에게 10-20% 할인을 제공합니다. 여행 계획이 확정되었다면 미리 예약하세요.
            </p>
          </div>
          <div className="rounded-lg bg-traveling-background p-4">
            <h3 className="mb-2 font-medium text-traveling-brown">연박 할인을 확인하세요</h3>
            <p className="text-sm text-traveling-brown/70">
              3박 이상 연박 시 추가 할인을 제공하는 숙소가 많습니다. 장기 여행이라면 연박 할인을 확인해보세요.
            </p>
          </div>
          <div className="rounded-lg bg-traveling-background p-4">
            <h3 className="mb-2 font-medium text-traveling-brown">리뷰를 꼼꼼히 확인하세요</h3>
            <p className="text-sm text-traveling-brown/70">
              이전 투숙객의 리뷰는 실제 숙소 상태를 파악하는 데 큰 도움이 됩니다. 특히 최근 리뷰를 중점적으로
              살펴보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 숙소 일러스트레이션 컴포넌트
function AccommodationIllustration({ cityName }: { cityName: string }) {
  switch (cityName) {
    case "도쿄":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <rect x="40" y="40" width="120" height="90" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <rect x="50" y="50" width="100" height="70" fill="#f8ecd8" />
          <rect x="60" y="60" width="20" height="20" fill="#e29c67" />
          <rect x="90" y="60" width="20" height="20" fill="#e29c67" />
          <rect x="120" y="60" width="20" height="20" fill="#e29c67" />
          <rect x="60" y="90" width="20" height="20" fill="#e29c67" />
          <rect x="90" y="90" width="20" height="20" fill="#e29c67" />
          <rect x="120" y="90" width="20" height="20" fill="#e29c67" />
          <path d="M40,40 L100,10 L160,40" fill="#e29c67" stroke="#4a3f35" strokeWidth="2" />
          <circle cx="100" cy="25" r="8" fill="#f8ecd8" />
        </svg>
      )
    case "오사카":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <rect x="30" y="50" width="140" height="80" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <rect x="40" y="60" width="120" height="60" fill="#f8ecd8" />
          <rect x="50" y="70" width="20" height="15" fill="#8a9a7b" />
          <rect x="80" y="70" width="20" height="15" fill="#8a9a7b" />
          <rect x="110" y="70" width="20" height="15" fill="#8a9a7b" />
          <rect x="50" y="95" width="20" height="15" fill="#8a9a7b" />
          <rect x="80" y="95" width="20" height="15" fill="#8a9a7b" />
          <rect x="110" y="95" width="20" height="15" fill="#8a9a7b" />
          <rect x="30" y="40" width="140" height="10" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="1" />
          <rect x="90" y="20" width="20" height="20" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="1" />
          <path d="M90,20 L100,10 L110,20" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="1" />
        </svg>
      )
    case "교토":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <rect x="50" y="50" width="100" height="80" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <path d="M50,50 L100,30 L150,50" fill="#f0d9b5" stroke="#4a3f35" strokeWidth="2" />
          <rect x="60" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="90" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="120" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="70" y="110" width="60" height="20" fill="#f0d9b5" stroke="#4a3f35" strokeWidth="1" />
          <rect x="85" y="120" width="30" height="10" fill="#f8ecd8" />
          <rect x="40" y="130" width="120" height="10" fill="#4a3f35" />
          <rect x="30" y="140" width="140" height="10" fill="#4a3f35" />
        </svg>
      )
    case "후쿠오카":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <rect x="40" y="40" width="120" height="100" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <rect x="50" y="50" width="30" height="30" fill="#f8ecd8" />
          <rect x="90" y="50" width="30" height="30" fill="#f8ecd8" />
          <rect x="50" y="90" width="30" height="30" fill="#f8ecd8" />
          <rect x="90" y="90" width="30" height="30" fill="#f8ecd8" />
          <rect x="130" y="50" width="20" height="80" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
          <rect x="135" y="60" width="10" height="10" fill="#f8ecd8" />
          <rect x="135" y="80" width="10" height="10" fill="#f8ecd8" />
          <rect x="135" y="100" width="10" height="10" fill="#f8ecd8" />
          <rect x="135" y="120" width="10" height="10" fill="#f8ecd8" />
        </svg>
      )
    case "삿포로":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <path d="M0,150 L50,70 L150,70 L200,150" fill="white" />
          <rect x="60" y="80" width="80" height="70" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <rect x="70" y="90" width="20" height="20" fill="#f8ecd8" />
          <rect x="110" y="90" width="20" height="20" fill="#f8ecd8" />
          <rect x="70" y="120" width="60" height="30" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="1" />
          <rect x="90" y="130" width="20" height="20" fill="#f8ecd8" />
          <path d="M60,80 L100,50 L140,80" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="2" />
          <circle cx="100" cy="65" r="10" fill="#f8ecd8" />
        </svg>
      )
    case "방콕":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <rect x="50" y="50" width="100" height="80" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <path d="M50,50 L100,20 L150,50" fill="#e29  stroke="#4a3f35" strokeWidth="2" />
          <path d="M50,50 L100,20 L150,50" fill="#e29c67" stroke="#4a3f35" strokeWidth="2" />
          <rect x="60" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="90" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="120" y="70" width="20" height="30" fill="#f8ecd8" />
          <rect x="60" y="110" width="80" height="20" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
          <rect x="30" y="130" width="140" height="10" fill="#4a3f35" />
          <path d="M100,20 L110,10 L120,20" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
          <path d="M80,20 L90,10 L100,20" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
        </svg>
      )
    case "다낭":
      return (
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#f8ecd8" />
          <path d="M0,150 L200,150 L200,100 L0,100 Z" fill="#e29c67" />
          <rect x="40" y="60" width="120" height="40" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <rect x="50" y="70" width="20" height="20" fill="#f8ecd8" />
          <rect x="80" y="70" width="20" height="20" fill="#f8ecd8" />
          <rect x="110" y=\"70" width="20" height="20" fill="#f8ecd8" />
          <rect x="30" y="100" width="140" height="10" fill="#4a3f35" />
          <path d="M40,60 L100,40 L160,60" fill="#4a3f35" stroke="#4a3f35" strokeWidth="2" />
          <circle cx="170" cy="40" r="15" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
          <path d="M160,150 Q170,130 180,150" stroke="#8a9a7b" strokeWidth="2" fill="none" />
          <path d="M140,150 Q150,120 160,150" stroke="#8a9a7b" strokeWidth="2" fill="none" />
        </svg>
      )
    default:
      return <div className="flex h-full items-center justify-center">일러스트레이션을 찾을 수 없습니다.</div>
  }
}
