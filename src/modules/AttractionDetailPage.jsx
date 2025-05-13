import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Star, MapPin, Globe, Phone, Clock, Camera, MessageSquare } from 'lucide-react';
import { Button } from '../modules/Button';
import { Badge } from '../modules/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../modules/Tabs';

function AttractionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [tab, setTab] = useState('intro');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('allPlaces')) || [];
    const found = stored[parseInt(id)];
    setPlace(found);
  }, [id]);

  if (!place) {
    return <p className="text-center mt-10">명소 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <img
        src={place.image || '/placeholder.svg'}
        alt={place.name}
        className="w-full h-[300px] object-cover rounded-xl"
      />

      <div className="mt-6 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{place.name}</h2>
            <Badge className="bg-gray-200 text-gray-700 mt-1">{place.category || '관광지'}</Badge>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-yellow-400 h-5 w-5" />
            <span className="font-semibold">{place.rating ?? 'N/A'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{place.address}</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" />{place.phone || '전화번호 없음'}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{place.hours || '운영 시간 정보 없음'}</div>
          <div className="flex items-center gap-2"><Globe className="h-4 w-4" />
            <a href={place.website || '#'} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              웹사이트 방문
            </a>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button>+ 여행에 추가</Button>
          <Button variant="outline"><MessageSquare className="h-4 w-4 mr-1" /> 리뷰 작성</Button>
          <Button variant="ghost">공유</Button>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-10">
          <TabsList className="flex border-b border-gray-200 mb-4">
            <TabsTrigger value="intro" className="px-4 py-2">상세 정보</TabsTrigger>
            <TabsTrigger value="photos" className="px-4 py-2">사진</TabsTrigger>
            <TabsTrigger value="reviews" className="px-4 py-2">리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="intro">
            <h3 className="text-lg font-semibold mb-2">소개</h3>
            <p className="text-gray-700 leading-relaxed">
              {place.description || '이 명소에 대한 소개 글이 없습니다.'}
            </p>
          </TabsContent>

          <TabsContent value="photos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[place.image, place.image, place.image].map((img, i) => (
                <img
                  key={i}
                  src={img || '/placeholder.svg'}
                  alt={`photo-${i}`}
                  className="rounded-xl object-cover h-48 w-full"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <h3 className="text-lg font-semibold mb-2">리뷰</h3>
            <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={() => navigate(-1)}>← 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetailPage;
