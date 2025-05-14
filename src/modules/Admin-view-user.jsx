import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '../hooks/reducer/admin/adminThunk';

import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';

import { Camera } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './Dialog';

export function AdminViewUser({ isOpen, onClose, user, onUserUpdated }) {
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const clearAllInput = () => {
    setName('');
    setNickname('');
    setBio('');
    setProfileImage(null);
    setPreviewUrl(null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm(`정말 ${user.name}의 디태일 수정 하겠습니가?`)) return;

    const formData = new FormData();

    const dto = {
      name: name || user.name,
      nickname: nickname || user.nickname,
      bio: bio || user.bio,
    }
    formData.append('dto', new  Blob([JSON.stringify(dto)], { type: "application/json" }))

    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const result = await dispatch(updateUser({ accountId: user.id, formData })).unwrap();
      alert('유저 수정되었습니다!');
      if (onUserUpdated) onUserUpdated();
      clearAllInput();
      onClose();
    } catch (error) {
      console.error('유저 처리 실패:', error);
      alert('유저 처리 실패: ' + error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white text-black shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle>유저 디태일</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="mb-1">
            <h3 className="text-lg font-medium">{user.name}의 피로필 디태일</h3>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="relative h-28 w-28">
            <div className="rounded-full border-4 border-[#4dabf7] bg-[#e7f5ff] overflow-hidden h-full w-full">
              <img
                src={previewUrl || user.imgUrl || "/placeholder.svg"}
                alt="프로필 미리보기"
                className="h-full w-full object-cover"
              />
              <label htmlFor="profileImageUpload">
                <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#4dabf7] hover:bg-[#339af0] cursor-pointer shadow-md">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </label>
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <p className="text-sm text-[#495057]">프로필 이미지를 선택하세요</p>
        </div>

        {/* 이름 */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              이름
            </label>
            <Input
              id="name"
              placeholder={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="placeholder:text-gray-400 placeholder:opacity-80"
            />
          </div>

        {/* 닉내임 */}
          <div className="space-y-2">
            <label htmlFor="nickname" className="text-sm font-medium">
              닉내임
            </label>
            <Input
              id="nickname"
              placeholder={user.nickname}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="placeholder:text-gray-400 placeholder:opacity-80"
            />
          </div>

        {/* 바이오 */}
        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            바이오
          </label>
          <Textarea
            id="bio"
            placeholder={user.bio}
            className="min-h-[120px] placeholder:text-gray-400 placeholder:opacity-80"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSubmit} className="bg-traveling-purple">
            수정하기
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}