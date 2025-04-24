import { useState } from 'react';
import { Clock, MapPin, ArrowRight, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ItineraryGeneration({ destination }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true); // 데모를 위해 true로 설정

  // 도시별 데이터
  const cityData = {
    osaka: {
      name: '오사카',
      nameEn: 'OSAKA',
      dates: '2025.04.23(수) - 2025.04.26(토)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-04-23(수)',
          places: [
            {
              time: '19:28-19:28',
              name: '오사카 국제공항',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Osaka International Airport terminal',
            },
            {
              time: '19:52-19:52',
              name: '호텔 한큐 리스메이아 오사카',
              category: '숙소',
              image: '/images/hotels/hotel1.jpg',
            },
            {
              time: '20:00-22:00',
              name: '우메다 공중정원',
              category: '명소',
              image: '/images/attractions/umeda-wheel.jpg',
            },
            {
              time: '22:06-22:06',
              name: '호텔 한큐 리스메이아 오사카',
              category: '숙소',
              image: '/images/hotels/hotel1.jpg',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-04-24(목)',
          places: [
            {
              time: '19:29-19:29',
              name: '호텔 한큐 리스메이아 오사카',
              category: '숙소',
              image: '/images/hotels/hotel1.jpg',
            },
            {
              time: '20:00-22:00',
              name: '유니버설 스튜디오 재팬',
              category: '명소',
              image: '/images/attractions/universal-studios.jpg',
            },
            {
              time: '22:53-22:53',
              name: 'BON콘드 難波日本橋',
              category: '숙소',
              image: '/images/hotels/hotel2.jpg',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-04-25(금)',
          places: [
            {
              time: '19:55-19:55',
              name: 'BON콘드 難波日本橋',
              category: '숙소',
              image: '/images/hotels/hotel2.jpg',
            },
            {
              time: '20:00-22:00',
              name: '도톤보리',
              category: '명소',
              image: '/images/attractions/dotonbori.png',
            },
            {
              time: '22:05-22:05',
              name: 'BON콘드 難波日本橋',
              category: '숙소',
              image: '/images/hotels/hotel2.jpg',
            },
          ],
        },
      ],
    },
    tokyo: {
      name: '도쿄',
      nameEn: 'TOKYO',
      dates: '2025.05.15(목) - 2025.05.18(일)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-05-15(목)',
          places: [
            {
              time: '14:30-14:30',
              name: '도쿄 국제공항',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Tokyo International Airport terminal',
            },
            {
              time: '16:00-16:00',
              name: '호텔 그레이서리 신주쿠',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=Hotel Gracery Shinjuku entrance',
            },
            {
              time: '17:00-19:00',
              name: '시부야 스크램블 교차로',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Shibuya Crossing with crowds of people',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-05-16(금)',
          places: [
            {
              time: '09:00-11:00',
              name: '메이지 신궁',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Meiji Shrine traditional Japanese architecture',
            },
            {
              time: '12:00-14:00',
              name: '도쿄 타워',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Tokyo Tower at night with city lights',
            },
            {
              time: '15:00-17:00',
              name: '센소지 사원',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Senso-ji Temple with red lantern',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-05-17(토)',
          places: [
            {
              time: '10:00-14:00',
              name: '도쿄 스카이트리',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Tokyo Skytree tall tower',
            },
            {
              time: '15:00-17:00',
              name: '아키하바라',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Akihabara electric town with neon signs',
            },
          ],
        },
      ],
    },
    fukuoka: {
      name: '후쿠오카',
      nameEn: 'FUKUOKA',
      dates: '2025.06.10(화) - 2025.06.13(금)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-06-10(화)',
          places: [
            {
              time: '13:30-13:30',
              name: '후쿠오카 공항',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Fukuoka Airport terminal',
            },
            {
              time: '15:00-15:00',
              name: 'JR 규슈 호텔 블로섬 하카타 중앙',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=JR Kyushu Hotel Blossom Hakata Central entrance',
            },
            {
              time: '16:00-18:00',
              name: '캐널시티 하카타',
              category: '명소',
              image: '/canal-city-hakata-water-show.png',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-06-11(수)',
          places: [
            {
              time: '09:00-11:00',
              name: '오호리 공원',
              category: '명소',
              image: '/ohori-park-serenity.png',
            },
            {
              time: '12:00-14:00',
              name: '후쿠오카 타워',
              category: '명소',
              image: '/fukuoka-seaside-view.png',
            },
            {
              time: '15:00-17:00',
              name: '나카스',
              category: '명소',
              image: '/nakasu-night-lights.png',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-06-12(목)',
          places: [
            {
              time: '10:00-16:00',
              name: '다자이후 텐만구',
              category: '명소',
              image: '/dazaifu-plum-blossoms.png',
            },
          ],
        },
      ],
    },
    paris: {
      name: '파리',
      nameEn: 'PARIS',
      dates: '2025.07.15(화) - 2025.07.18(금)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-07-15(화)',
          places: [
            {
              time: '13:30-13:30',
              name: '샤를 드골 공항',
              category: '공항',
              image:
                '/placeholder.svg?height=100&width=150&query=Charles de Gaulle Airport Paris terminal',
            },
            {
              time: '15:00-15:00',
              name: '호텔 플라자 아테네 파리',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=Hotel Plaza Athenee Paris entrance',
            },
            {
              time: '16:00-18:00',
              name: '에펠탑',
              category: '명소',
              image: '/paris-eiffel-tower.png',
            },
            {
              time: '19:00-21:00',
              name: '세느강 크루즈',
              category: '액티비티',
              image:
                '/placeholder.svg?height=100&width=150&query=Seine River Cruise Paris at night',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-07-16(수)',
          places: [
            {
              time: '09:00-12:00',
              name: '루브르 박물관',
              category: '명소',
              image: '/paris-louvre-museum.png',
            },
            {
              time: '13:00-14:00',
              name: '튈르리 정원',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Tuileries Garden Paris with flowers',
            },
            {
              time: '15:00-17:00',
              name: '개선문',
              category: '명소',
              image: '/paris-arc-de-triomphe.png',
            },
            {
              time: '18:00-20:00',
              name: '샹젤리제 거리',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Champs Elysees Paris shopping street',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-07-17(목)',
          places: [
            {
              time: '09:00-11:00',
              name: '노트르담 대성당',
              category: '명소',
              image: '/paris-notre-dame.png',
            },
            {
              time: '12:00-14:00',
              name: '몽마르트',
              category: '명소',
              image: '/paris-montmartre.png',
            },
            {
              time: '15:00-17:00',
              name: '사크레쾨르 대성당',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Sacre Coeur Basilica Paris white dome',
            },
          ],
        },
      ],
    },
    rome: {
      name: '로마',
      nameEn: 'ROME',
      dates: '2025.08.10(일) - 2025.08.13(수)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-08-10(일)',
          places: [
            {
              time: '14:00-14:00',
              name: '레오나르도 다 빈치 국제공항',
              category: '공항',
              image:
                '/placeholder.svg?height=100&width=150&query=Leonardo da Vinci International Airport Rome terminal',
            },
            {
              time: '16:00-16:00',
              name: '호텔 하슬러 로마',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=Hotel Hassler Roma entrance',
            },
            {
              time: '17:00-19:00',
              name: '트레비 분수',
              category: '명소',
              image: '/rome-trevi-fountain.png',
            },
            {
              time: '20:00-22:00',
              name: '나보나 광장',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Piazza Navona Rome with fountains at night',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-08-11(월)',
          places: [
            {
              time: '09:00-12:00',
              name: '콜로세움',
              category: '명소',
              image: '/rome-colosseum.png',
            },
            {
              time: '13:00-15:00',
              name: '로마 포럼',
              category: '명소',
              image: '/rome-roman-forum.png',
            },
            {
              time: '16:00-18:00',
              name: '판테온',
              category: '명소',
              image: '/rome-pantheon.png',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-08-12(화)',
          places: [
            {
              time: '09:00-13:00',
              name: '바티칸 박물관',
              category: '명소',
              image: '/rome-vatican-museums.png',
            },
            {
              time: '14:00-16:00',
              name: '성 베드로 대성당',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=St Peters Basilica Vatican City interior',
            },
            {
              time: '17:00-19:00',
              name: '스페인 계단',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Spanish Steps Rome with flowers',
            },
          ],
        },
      ],
    },
    venice: {
      name: '베니스',
      nameEn: 'VENICE',
      dates: '2025.09.05(금) - 2025.09.08(월)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-09-05(금)',
          places: [
            {
              time: '13:00-13:00',
              name: '마르코 폴로 국제공항',
              category: '공항',
              image:
                '/placeholder.svg?height=100&width=150&query=Marco Polo International Airport Venice terminal',
            },
            {
              time: '15:00-15:00',
              name: '그리티 팰리스 베니스',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=Gritti Palace Venice entrance',
            },
            {
              time: '16:00-18:00',
              name: '산 마르코 광장',
              category: '명소',
              image: '/venice-st-marks-square.png',
            },
            {
              time: '19:00-21:00',
              name: '곤돌라 투어',
              category: '액티비티',
              image:
                '/placeholder.svg?height=100&width=150&query=Gondola tour Venice at sunset',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-09-06(토)',
          places: [
            {
              time: '09:00-11:00',
              name: '산 마르코 대성당',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=St Marks Basilica Venice interior',
            },
            {
              time: '12:00-14:00',
              name: '도지의 궁전',
              category: '명소',
              image: '/venice-doges-palace.png',
            },
            {
              time: '15:00-17:00',
              name: '리알토 다리',
              category: '명소',
              image: '/venice-rialto-bridge.png',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-09-07(일)',
          places: [
            {
              time: '09:00-14:00',
              name: '부라노 섬',
              category: '명소',
              image: '/venice-burano.png',
            },
            {
              time: '15:00-17:00',
              name: '대운하 투어',
              category: '액티비티',
              image: '/venice-grand-canal.png',
            },
          ],
        },
      ],
    },
    bangkok: {
      name: '방콕',
      nameEn: 'BANGKOK',
      dates: '2025.10.10(금) - 2025.10.13(월)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-10-10(금)',
          places: [
            {
              time: '12:00-12:00',
              name: '수완나품 국제공항',
              category: '공항',
              image:
                '/placeholder.svg?height=100&width=150&query=Suvarnabhumi Airport Bangkok terminal',
            },
            {
              time: '14:00-14:00',
              name: '만다린 오리엔탈 방콕',
              category: '숙소',
              image:
                '/placeholder.svg?height=100&width=150&query=Mandarin Oriental Bangkok entrance',
            },
            {
              time: '16:00-18:00',
              name: '왕궁',
              category: '명소',
              image: '/bangkok-grand-palace.png',
            },
            {
              time: '19:00-21:00',
              name: '차오프라야 강 디너 크루즈',
              category: '액티비티',
              image:
                '/placeholder.svg?height=100&width=150&query=Chao Phraya River Dinner Cruise Bangkok at night',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-10-11(토)',
          places: [
            {
              time: '09:00-11:00',
              name: '왓 포',
              category: '명소',
              image: '/bangkok-wat-pho.png',
            },
            {
              time: '12:00-14:00',
              name: '왓 아룬',
              category: '명소',
              image: '/bangkok-wat-arun.png',
            },
            {
              time: '15:00-18:00',
              name: '차투착 주말 시장',
              category: '명소',
              image: '/bangkok-chatuchak-market.png',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-10-12(일)',
          places: [
            {
              time: '09:00-12:00',
              name: '담넌 사두악 수상시장',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Damnoen Saduak Floating Market Bangkok colorful boats',
            },
            {
              time: '14:00-16:00',
              name: '짐 톰슨의 집',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Jim Thompson House Bangkok traditional architecture',
            },
            {
              time: '18:00-20:00',
              name: '카오산 로드',
              category: '명소',
              image: '/bangkok-khao-san-road.png',
            },
          ],
        },
      ],
    },
    singapore: {
      name: '싱가포르',
      nameEn: 'SINGAPORE',
      dates: '2025.11.15(토) - 2025.11.18(화)',
      itinerary: [
        {
          day: '1일차',
          date: '2025-11-15(토)',
          places: [
            {
              time: '13:00-13:00',
              name: '창이 국제공항',
              category: '공항',
              image:
                '/placeholder.svg?height=100&width=150&query=Changi Airport Singapore terminal',
            },
            {
              time: '15:00-15:00',
              name: '마리나 베이 샌즈',
              category: '숙소',
              image: '/singapore-marina-bay-sands.png',
            },
            {
              time: '17:00-19:00',
              name: '가든스 바이 더 베이',
              category: '명소',
              image: '/singapore-gardens-by-the-bay.png',
            },
            {
              time: '20:00-21:00',
              name: '마리나 베이 샌즈 라이트 쇼',
              category: '액티비티',
              image:
                '/placeholder.svg?height=100&width=150&query=Marina Bay Sands Light Show Singapore at night',
            },
          ],
        },
        {
          day: '2일차',
          date: '2025-11-16(일)',
          places: [
            {
              time: '09:00-14:00',
              name: '센토사 섬',
              category: '명소',
              image: '/singapore-sentosa-island.png',
            },
            {
              time: '15:00-18:00',
              name: '유니버설 스튜디오 싱가포르',
              category: '명소',
              image: '/singapore-universal-studios.png',
            },
          ],
        },
        {
          day: '3일차',
          date: '2025-11-17(월)',
          places: [
            {
              time: '09:00-11:00',
              name: '머라이언 파크',
              category: '명소',
              image: '/singapore-merlion-park.png',
            },
            {
              time: '12:00-14:00',
              name: '차이나타운',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Chinatown Singapore colorful buildings',
            },
            {
              time: '15:00-17:00',
              name: '오차드 로드',
              category: '명소',
              image:
                '/placeholder.svg?height=100&width=150&query=Orchard Road Singapore shopping district',
            },
          ],
        },
      ],
    },
  };

  const city = cityData[destination];

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
            일정 생성
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            {city.name} 여행 일정이 생성되었습니다.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-traveling-text">
              {city.name}
            </h3>
            <p className="text-sm text-traveling-text/70">{city.dates}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-traveling-text/30 text-traveling-text"
            >
              <Download className="mr-2 h-4 w-4" />
              저장
            </Button>
            <Button
              variant="outline"
              className="border-traveling-text/30 text-traveling-text"
            >
              <Share2 className="mr-2 h-4 w-4" />
              공유
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-traveling-purple/20"></div>

          <div className="space-y-8">
            {city.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                <div className="mb-4 flex items-center">
                  <div className="absolute -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-traveling-purple text-white">
                    {dayIndex + 1}
                  </div>
                  <div className="ml-12">
                    <h3 className="text-lg font-bold text-traveling-text">
                      {day.day}
                    </h3>
                    <p className="text-sm text-traveling-text/70">{day.date}</p>
                  </div>
                </div>

                <div className="ml-12 space-y-4">
                  {day.places.map((place, placeIndex) => (
                    <Card
                      key={placeIndex}
                      className="overflow-hidden border border-traveling-text/10"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-24 w-full md:h-auto md:w-1/5">
                          <Image
                            src={place.image || '/placeholder.svg'}
                            alt={place.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="flex flex-1 flex-col p-4">
                          <div className="mb-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-traveling-text">
                                {place.name}
                              </h4>
                              <div className="flex items-center text-sm text-traveling-text/70">
                                <Clock className="mr-1 h-4 w-4" />
                                {place.time}
                              </div>
                            </div>
                            <p className="flex items-center text-sm text-traveling-text/70">
                              <MapPin className="mr-1 h-4 w-4" />
                              {place.category}
                            </p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/">
            <Button className="bg-traveling-purple text-white hover:bg-traveling-purple/90">
              완료
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
