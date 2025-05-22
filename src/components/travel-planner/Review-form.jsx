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
import { toast } from 'react-toastify';

export function ReviewForm({
  isOpen,
  onClose,
  placeName,
  placeType,
  placeId,
  onSuccess,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [photos, setPhotos] = useState([]);
  const [images, setImages] = useState([]); 


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
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const accountId = user.id;
    const nickname = user.nickname;

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeId,
        placeName,
        accountId,
        nickname,
        rating,
        content: review,
      }),
    });

    if (response.ok) {
      toast.success('🎉 리뷰가 등록되었습니다!');
      if (onSuccess) onSuccess();
      onClose();
    } else {
      toast.error('😢 리뷰 등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    toast.error('🚨 서버 오류가 발생했습니다.');
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
