import { useState } from 'react';
import { Star, Upload, X, Hash } from 'lucide-react';
import { Button } from '../../modules/Button';
import { Input } from '../../modules/Input';
import { Textarea } from '../../modules/Textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../modules/Dialog';

export function ReviewForm({
  isOpen,
  onClose,
  placeName = '로딩 중',
  placeType = '카테고리 없음',
  placeId, 
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleRatingClick = (value) => setRating(value);
  const handleRatingHover = (value) => setHoverRating(value);
  const handleRatingLeave = () => setHoverRating(0);

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleAddPhoto = () => {
    const dummyPhotos = [
      '/tokyo-skytree-day.png',
      '/tokyo-skytree-observation-deck.png',
      '/tokyo-night-panorama.png',
    ];
    if (photos.length < 3) {
      setPhotos([...photos, dummyPhotos[photos.length]]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

const handleSubmit = async () => {
  try {
    // ✅ 1. 로그인된 유저 정보 가져오기
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const accountId = user.id;
    const nickname = user.nickname;

    // ✅ 2. 서버로 리뷰 전송
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placeId,
        accountId,
        rating,
        content: review,
        nickname, 
      }),
    });

    if (response.ok) {
      alert('리뷰가 등록되었습니다!');
      onClose();
    } else {
      alert('리뷰 등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
  }
};



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white text-black shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle>리뷰 작성하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">{placeName}</h3>
            <p className="text-sm text-gray-500">{placeType}</p>
          </div>

          {/* 별점 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">별점</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`h-8 w-8 cursor-pointer ${
                    (hoverRating || rating) >= value
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => handleRatingHover(value)}
                  onMouseLeave={handleRatingLeave}
                />
              ))}
            </div>
          </div>

          {/* 한줄 요약 */}
          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium">
              한줄 요약
            </label>
            <Input
              id="summary"
              placeholder="방문 경험을 한 줄로 요약해주세요"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* 상세 리뷰 */}
          <div className="space-y-2">
            <label htmlFor="review" className="text-sm font-medium">
              상세 리뷰
            </label>
            <Textarea
              id="review"
              placeholder="방문한 장소에 대한 상세한 경험을 공유해주세요"
              className="min-h-[120px]"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          {/* 해시태그 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">해시태그</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {hashtags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center rounded-full bg-traveling-purple/10 px-3 py-1 text-sm"
                >
                  <Hash className="mr-1 h-3 w-3 text-traveling-purple" />
                  <span className="text-traveling-purple">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHashtag(tag)}
                    className="ml-1 text-traveling-purple hover:text-traveling-purple/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="해시태그 입력 (예: 야경명소, 가족여행)"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHashtag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddHashtag}
                className="shrink-0"
              >
                추가
              </Button>
            </div>
          </div>

          {/* 사진 업로드 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">사진 첨부 (최대 3장)</label>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative h-24 rounded-md overflow-hidden"
                >
                  <img
                    src={photo || '/placeholder.svg'}
                    alt={`업로드한 사진 ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {photos.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-traveling-purple"
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSubmit} className="bg-traveling-purple">
            리뷰 등록하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
