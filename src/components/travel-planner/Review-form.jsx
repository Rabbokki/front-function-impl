import { useState, useEffect } from 'react';
import { Star, Upload, X, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../modules/Button';
import { Input } from '../../modules/Input';
import { Textarea } from '../../modules/Textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
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
  const [userData, setUserData] = useState({ id: null, nickname: '' });
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    console.log('AccessToken:', accessToken); // 디버깅 로그
    if (!accessToken) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      onClose();
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log('User from sessionStorage:', user); // 디버깅 로그
    if (!user || !user.id) {
      toast.error('사용자 정보가 없습니다. 다시 로그인해 주세요.');
      navigate('/login');
      onClose();
      return;
    }

    setUserData({
      id: user.id,
      nickname: user.nickname || 'Anonymous',
    });
  }, [isOpen, navigate, onClose]);

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
    if (!userData.id) {
      toast.error('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }
    if (!review.trim()) {
      toast.error('리뷰 내용을 입력해주세요.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const payload = {
        placeId,
        placeName,
        accountId: userData.id,
        nickname: userData.nickname,
        rating,
        content: review,
      };
      console.log('Submitting review with payload:', payload); // 디버깅 로그
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access_Token': accessToken,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('🎉 리뷰가 등록되었습니다!');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Review submission error:', errorData); // 디버깅 로그
        toast.error(`😢 리뷰 등록에 실패했습니다: ${errorData.message || '알 수 없는 오류'}`);
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
          <DialogDescription>
            {placeName}에 대한 리뷰를 작성하여 다른 여행자와 경험을 공유하세요.
          </DialogDescription>
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