import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Star, ExternalLink, Calendar, Phone, Globe, Info } from "lucide-react";
import { Dialog, DialogContent } from "./Dialog";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Separator } from "./Separator";
import { AddToTripModal } from "./Add-to-trip-modal";
import { DirectionsModal } from "./Directions-modal";

// 장소 유형에 따른 이미지 및 색상 정의
const placeTypeConfig = {
  명소: {
    image: "/bustling-cityscape.png",
    color: "#ff6b6b",
  },
  맛집: {
    image: "/vibrant-pasta-dish.png",
    color: "#ffd43b",
  },
  숙소: {
    image: "/luxury-hotel-suite.png",
    color: "#4dabf7",
  },
  쇼핑: {
    image: "/bustling-mall-interior.png",
    color: "#51cf66",
  },
  자연: {
    image: "/mountain-valley-vista.png",
    color: "#20c997",
  },
  문화: {
    image: "/ancient-city-ruins.png",
    color: "#9775fa",
  },
};

// 상세 정보 데이터 타입 정의
export interface SavedPlaceDetail {
  id: number;
  title: string;
  type: string;
  location: string;
  address: string;
  savedDate: string;
  color: string;
  description: string;
  rating: number;
  openingHours?: string;
  contact?: string;
  website?: string;
  tags?: string[];
  priceRange?: string;
  images?: string[];
}

interface SavedPlaceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  place: SavedPlaceDetail | null;
}

export function SavedPlaceDetail({ isOpen, onClose, place }: SavedPlaceDetailProps) {
  const [isAddToTripModalOpen, setIsAddToTripModalOpen] = useState(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  if (!place) return null;

  const placeConfig = placeTypeConfig[place.type] || {
    image: "/bustling-city-intersection.png",
    color: "#adb5bd",
  };

  const handleAddToTrip = () => {
    setIsAddToTripModalOpen(true);
  };

  const handleGetDirections = () => {
    setIsDirectionsModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative h-64 w-full">
            <Image
              src={place.images?.[0] || placeConfig.image}
              alt={place.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <Badge
                className="mb-2"
                style={{
                  backgroundColor: place.color,
                  color: "#fff",
                }}
              >
                {place.type}
              </Badge>
              <h2 className="text-2xl font-bold text-white">{place.title}</h2>
              <div className="flex items-center mt-1 text-white/90">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{place.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(place.rating)
                        ? "fill-[#ffd43b] text-[#ffd43b]"
                        : i < place.rating
                        ? "fill-[#ffd43b] text-[#ffd43b] stroke-[#ffd43b]"
                        : "text-[#dee2e6]"
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium">{place.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-sm text-[#495057]">
                <Calendar className="h-4 w-4 mr-1 text-[#4dabf7]" />
                <span>저장일: {place.savedDate}</span>
              </div>
            </div>

            <p className="text-[#495057] mb-6">{place.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-[#4dabf7] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#1e3a8a]">주소</h4>
                    <p className="text-sm text-[#495057]">{place.address}</p>
                  </div>
                </div>

                {place.openingHours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-[#4dabf7] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1e3a8a]">영업시간</h4>
                      <p className="text-sm text-[#495057]">{place.openingHours}</p>
                    </div>
                  </div>
                )}

                {place.priceRange && (
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-[#4dabf7] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1e3a8a]">가격대</h4>
                      <p className="text-sm text-[#495057]">{place.priceRange}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {place.contact && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 text-[#4dabf7] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1e3a8a]">연락처</h4>
                      <p className="text-sm text-[#495057]">{place.contact}</p>
                    </div>
                  </div>
                )}

                {place.website && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 mr-2 text-[#4dabf7] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1e3a8a]">웹사이트</h4>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#4dabf7] hover:underline flex items-center"
                      >
                        {place.website.replace(/^https?:\/\//, "")}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {place.tags && place.tags.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="mb-6">
                  <h4 className="font-medium text-[#1e3a8a] mb-2">태그</h4>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, index) => (
                      <Badge key={index} className="bg-[#e7f5ff] text-[#4dabf7]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {place.images && place.images.length > 1 && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium text-[#1e3a8a] mb-3">사진</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {place.images.slice(1).map((image, index) => (
                      <div key={index} className="relative h-24 rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${place.title} 이미지 ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  className="border-[#4dabf7] text-[#4dabf7] hover:bg-[#e7f5ff]"
                  onClick={handleAddToTrip}
                >
                  여행에 추가
                </Button>
                <Button className="bg-[#4dabf7] hover:bg-[#339af0]" onClick={handleGetDirections}>
                  길찾기
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 여행에 추가 모달 */}
      <AddToTripModal
        isOpen={isAddToTripModalOpen}
        onClose={() => setIsAddToTripModalOpen(false)}
        placeName={place.title}
        placeType={place.type}
        placeLocation={place.location}
      />

      {/* 길찾기 모달 */}
      <DirectionsModal
        isOpen={isDirectionsModalOpen}
        onClose={() => setIsDirectionsModalOpen(false)}
        destination={{
          name: place.title,
          address: place.address,
          location: place.location,
        }}
      />
    </>
  );
}
