import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X } from 'lucide-react';
import { Button } from '../modules/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../modules/Card';
import { Input } from '../modules/Input';
import { Label } from '../modules/Label';
import { Textarea } from '../modules/Textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../modules/Avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../modules/Select';
import { Separator } from '../modules/Separator';
import { toast } from '../hooks/Use-toast';
import axiosInstance from '../api/axiosInstance';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function ProfileEditContent() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    nickname: '',
    email: '',
    bio: '',
    gender: '',
    birthday: '',
    imgUrl: '',
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/accounts/mypage');
        setProfileData({
          nickname: res.data.nickname,
          email: res.data.email,
          bio: res.data.bio || '',
          gender: res.data.gender || '',
          birthday: res.data.birthday || '',
          imgUrl: res.data.imgUrl || '',
        });
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };
    fetchUserInfo();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, imgUrl: previewUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageDelete = () => {
    setSelectedImageFile(null);
    setProfileData((prev) => ({ ...prev, imgUrl: '' }));
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    const updateData = {
      nickname: profileData.nickname,
      bio: profileData.bio,
      gender: profileData.gender,
      birthday: profileData.birthday,
      imgUrl: profileData.imgUrl,
    };

    const jsonBlob = new Blob([JSON.stringify(updateData)], {
      type: 'application/json',
    });

    formData.append('request', jsonBlob);

    if (selectedImageFile) {
      formData.append('profileImage', selectedImageFile);
    } else if (!profileData.imgUrl) {
      updateData.imgUrl = '';
    }

    try {
      await axiosInstance.put('/api/accounts/mypage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast({
        title: '프로필이 저장되었습니다.',
        description: '변경사항이 성공적으로 적용되었습니다.',
      });

      setTimeout(() => navigate('/mypage', { replace: true }), 1500);
    } catch (err) {
      console.error('프로필 저장 실패:', err);
      toast({
        title: '저장 실패',
        description: '프로필 저장 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#1e3a8a]">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-[#4dabf7] cursor-pointer" onClick={triggerFileInput}>
                <AvatarImage src={profileData.imgUrl || '/placeholder.svg'} alt="프로필 이미지" />
                <AvatarFallback className="bg-[#e7f5ff] text-[#1e3a8a] text-2xl">여행자</AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full bg-[#4dabf7] p-2 text-white hover:bg-[#339af0]"
                onClick={triggerFileInput}
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-medium text-[#1e3a8a]">프로필 이미지</h3>
              <p className="text-sm text-[#495057]">
                JPG, PNG 또는 GIF 형식의 이미지를 업로드하세요. <br />
                최대 파일 크기: 5MB
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button variant="outline" size="sm" className="border-[#4dabf7] text-[#1c7ed6]" onClick={triggerFileInput}>
                  이미지 업로드
                </Button>
                <Button variant="outline" size="sm" className="border-[#ff6b6b] text-[#ff6b6b]" onClick={handleImageDelete}>
                  <X className="mr-1 h-3 w-3" />
                  삭제
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* 프로필 입력 필드 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-[#1e3a8a]">닉네임</Label>
              <Input id="nickname" name="nickname" value={profileData.nickname} onChange={handleProfileChange} className="bg-[#e7f5ff]/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1e3a8a]">이메일</Label>
              <Input id="email" name="email" value={profileData.email} onChange={handleProfileChange} className="bg-[#e7f5ff]/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="text-[#1e3a8a]">자기소개</Label>
              <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleProfileChange} className="min-h-[100px] bg-[#e7f5ff]/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[#1e3a8a]">성별</Label>
              <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                <SelectTrigger id="gender" className="bg-[#e7f5ff]/30">
                  <SelectValue placeholder="성별 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="남성">남성</SelectItem>
                  <SelectItem value="여성">여성</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                  <SelectItem value="비공개">비공개</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-[#1e3a8a]">생년월일</Label>
              <DatePicker
                id="birthday"
                selected={profileData.birthday ? new Date(profileData.birthday) : null}
                onChange={(date) =>
                  setProfileData({
                    ...profileData,
                    birthday: date ? date.toISOString().split('T')[0] : '',
                  })
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="생년월일을 선택하세요"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full rounded-md border border-[#cbd5e1] bg-[#e7f5ff]/30 p-2 outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" className="border-[#adb5bd] text-[#495057]" onClick={() => navigate('/mypage')}>
          취소
        </Button>
        <Button className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]" onClick={handleSaveProfile}>
          저장하기
        </Button>
      </div>
    </div>
  );
}
