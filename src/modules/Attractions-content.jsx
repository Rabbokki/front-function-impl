import { useState } from "react";
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, MessageSquare } from "lucide-react";
import { Button } from "../modules/Button";
import { Input } from "../modules/Input";
import { Card, CardContent } from "../modules/Card";
import { Badge } from "../modules/Badge";
import { ReviewForm } from "./travel-planner/review-form";

function AttractionsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const attractionsData = [
    {
      id: "tokyo-tower",
      name: "도쿄 타워",
      city: "도쿄",
      cityId: "tokyo",
      category: "명소",
      address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011",
      rating: 4.6,
      likes: 8234,
      image: "/tokyo-night-lights.png",
    },
    {
      id: "shibuya-crossing",
      name: "시부야 스크램블 교차로",
      city: "도쿄",
      cityId: "tokyo",
      category: "명소",
      address: "2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043",
      rating: 4.5,
      likes: 7654,
      image: "/shibuya-intersection-bustle.png",
    },
    {
      id: "dotonbori",
      name: "도톤보리",
      city: "오사카",
      cityId: "osaka",
      category: "명소",
      address: "Dotonbori, Chuo Ward, Osaka, 542-0071",
      rating: 4.7,
      likes: 7196,
      image: "/images/attractions/dotonbori.png",
    },
    {
      id: "osaka-castle",
      name: "오사카 성",
      city: "오사카",
      cityId: "osaka",
      category: "명소",
      address: "1-1 Osakajo, Chuo Ward, Osaka, 540-0002",
      rating: 4.4,
      likes: 6557,
      image: "/images/attractions/osaka-castle.png",
    },
    {
      id: "canal-city",
      name: "캐널시티 하카타",
      city: "후쿠오카",
      cityId: "fukuoka",
      category: "명소",
      address: "1 Chome-2 Sumiyoshi, Hakata Ward, Fukuoka, 812-0018",
      rating: 4.3,
      likes: 5432,
      image: "/canal-city-hakata-water-show.png",
    },
    {
      id: "eiffel-tower",
      name: "에펠탑",
      city: "파리",
      cityId: "paris",
      category: "명소",
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      rating: 4.7,
      likes: 9876,
      image: "/paris-eiffel-tower.png",
    },
    {
      id: "colosseum",
      name: "콜로세움",
      city: "로마",
      cityId: "rome",
      category: "명소",
      address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
      rating: 4.8,
      likes: 9876,
      image: "/rome-colosseum.png",
    },
    {
      id: "st-marks-square",
      name: "산 마르코 광장",
      city: "베니스",
      cityId: "venice",
      category: "명소",
      address: "Piazza San Marco, 30100 Venezia VE, Italy",
      rating: 4.8,
      likes: 8765,
      image: "/venice-st-marks-square.png",
    },
  ];

  const cities = [
    { id: "all", name: "전체" },
    { id: "tokyo", name: "도쿄" },
    { id: "osaka", name: "오사카" },
    { id: "fukuoka", name: "후쿠오카" },
    { id: "paris", name: "파리" },
    { id: "rome", name: "로마" },
    { id: "venice", name: "베니스" },
  ];

  const filteredAttractions = attractionsData.filter(
    (attraction) =>
      (selectedCity === "all" || attraction.cityId === selectedCity) &&
      (attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openReviewModal = (attraction) => {
    setSelectedPlace({
      name: attraction.name,
      type: attraction.category,
    });
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">추천 명소</h2>
          <p className="text-center text-sm text-traveling-text/70">인기 있는 여행지의 추천 명소들을 확인해보세요.</p>
        </div>

        <div className="mb-6">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="명소 이름, 도시 등을 검색하세요"
              className="bg-traveling-background pl-10 border-traveling-text/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {cities.map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? "default" : "outline"}
                size="sm"
                className={
                  selectedCity === city.id
                    ? "bg-traveling-purple text-white"
                    : "border-traveling-text/30 text-traveling-text/70 hover:bg-traveling-background"
                }
                onClick={() => setSelectedCity(city.id)}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((attraction) => (
            <Card key={attraction.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <img
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="font-bold text-traveling-text">{attraction.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-traveling-yellow text-traveling-yellow" />
                    <span className="font-bold text-traveling-text">{attraction.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-2">
                  <Badge className="bg-traveling-background text-traveling-text/70">{attraction.category}</Badge>
                  <Badge className="bg-traveling-pink/20 text-traveling-pink">{attraction.city}</Badge>
                </div>

                <p className="mb-4 flex items-center text-sm text-traveling-text/70">
                  <MapPin className="mr-1 h-4 w-4 text-traveling-text/70" />
                  {attraction.address}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm text-traveling-text/70">
                      <Star className="mr-1 h-4 w-4 text-traveling-pink" />
                      <span>{attraction.likes.toLocaleString()}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-traveling-purple"
                      onClick={() => openReviewModal(attraction)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-xs">리뷰</span>
                    </Button>
                  </div>
                  <Link href={`/place/${attraction.id}`}>
                    <Button size="sm" className="bg-traveling-purple text-white hover:bg-traveling-purple/90">
                      상세보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {selectedPlace && (
        <ReviewForm
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          placeName={selectedPlace.name}
          placeType={selectedPlace.type}
        />
      )}
    </div>
  );
}

export default AttractionsContent;