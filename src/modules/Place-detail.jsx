import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  MessageSquare,
  Plus,
  Navigation,
  Share2,
  ThumbsUp,
} from 'lucide-react';

import { Card, CardContent } from '../modules/Card';
import { Button } from '../modules/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../modules/Tabs';
import { ReviewForm } from '../components/travel-planner/Review-form';
import { AddToTripModal } from '../modules/Add-to-trip-modal';
import { DirectionsModal } from '../modules/Directions-modal';

function PlaceDetail() {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAddToTripModalOpen, setIsAddToTripModalOpen] = useState(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/data/places.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === placeId);
        setPlace(found);
      });
  }, [placeId]);

  if (!place)
    return <div className="p-6">해당 명소 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-screen-lg mx-auto px-2 space-y-6">
        {/* 상단 이미지 카드 */}
        <Card>
          <CardContent className="p-0">
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img
                src={place.image || '/placeholder.svg'}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{place.name}</h1>
                  <p className="text-gray-500">{place.category}</p>
                </div>
                <div className="mt-2 flex items-center sm:mt-0">
                  <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{place.rating}</span>
                  <span className="ml-1 text-gray-500">
                    ({place.reviews?.length || 0})
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-traveling-purple" />
                  <span>{place.address}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-traveling-purple" />
                  <span>{place.openingHours}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 text-traveling-purple" />
                  <span>{place.phone}</span>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-2 h-5 w-5 text-traveling-purple" />
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    웹사이트 방문
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddToTripModalOpen(true)}
                >
                  <Plus className="mr-1 h-4 w-4" /> 여행에 추가
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDirectionsModalOpen(true)}
                >
                  <Navigation className="mr-1 h-4 w-4" /> 길찾기
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <MessageSquare className="mr-1 h-4 w-4" /> 리뷰 작성
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-1 h-4 w-4" /> 공유
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상세 정보 / 사진 / 리뷰 */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">상세 정보</TabsTrigger>
                <TabsTrigger value="photos">사진</TabsTrigger>
                <TabsTrigger value="reviews">리뷰</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4">
                <h3 className="mb-2 text-lg font-medium">소개</h3>
                <p className="text-gray-700">{place.description}</p>
              </TabsContent>

              <TabsContent value="photos" className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {place.images?.map((image, i) => (
                    <div
                      key={i}
                      className="relative h-48 overflow-hidden rounded-md"
                    >
                      <img
                        src={image}
                        alt={`place image ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium">
                    리뷰 ({place.reviews?.length || 0})
                  </h3>
                  <Button
                    size="sm"
                    className="bg-traveling-purple"
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    리뷰 작성
                  </Button>
                </div>

                <div className="space-y-4">
                  {place.reviews?.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 h-8 w-8 rounded-full bg-traveling-purple/20 text-center leading-8">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-xs text-gray-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="font-medium">{review.summary}</p>
                          <p className="mt-1 text-gray-700">{review.content}</p>
                        </div>

                        {review.photos?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {review.photos.map((photo, i) => (
                              <div
                                key={i}
                                className="relative h-20 w-20 overflow-hidden rounded-md"
                              >
                                <img
                                  src={photo}
                                  alt={`리뷰 사진 ${i + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {review.hashtags?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {review.hashtags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-traveling-purple/10 px-2 py-1 text-xs text-traveling-purple"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-gray-500 hover:text-traveling-purple"
                          >
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            도움돼요 ({review.helpful})
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 모달들 */}
        <ReviewForm
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          placeName={place.name}
          placeType={place.category}
        />
        <AddToTripModal
          isOpen={isAddToTripModalOpen}
          onClose={() => setIsAddToTripModalOpen(false)}
          placeName={place.name}
        />
        <DirectionsModal
          isOpen={isDirectionsModalOpen}
          onClose={() => setIsDirectionsModalOpen(false)}
          destination={place.name}
          address={place.address}
        />
      </div>
    </div>
  );
}

export default PlaceDetail;
