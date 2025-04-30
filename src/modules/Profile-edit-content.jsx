import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Camera, Save, X } from "lucide-react"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Input } from "./Input"
import { Label } from "./Label"
import { Textarea } from "./Textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Badge } from "./Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"
import { Separator } from "./Separator"
import { toast } from "../hooks/Use-toast"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../modules/Card';
import { Input } from '../../modules/Input';
import { Label } from '../../modules/Label';
import { Textarea } from '../../modules/Textarea';
import { Button } from '../../modules/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../modules/Avatar';

export function ProfileEditContent({ userInfo }) {
  return (
    <Card className="bg-[#f8f9fa]">
      <CardHeader>
        <CardTitle className="text-xl text-[#1e3a8a]">프로필 정보</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="nickname" className="text-[#1e3a8a]">
            닉네임
          </Label>
          <Input
            id="nickname"
            value={userInfo.nickname}
            readOnly
            className="bg-[#e7f5ff]/30"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="email" className="text-[#1e3a8a]">
            이메일
          </Label>
          <Input
            id="email"
            value={userInfo.email}
            readOnly
            className="bg-[#e7f5ff]/30"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="bio" className="text-[#1e3a8a]">
            자기소개
          </Label>
          <Textarea
            id="bio"
            defaultValue="여행 좋아하는 30대 직장인입니다. 맛집 탐방과 사진 찍는 것을 좋아해요."
            className="min-h-[100px] bg-[#e7f5ff]/30"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="profile-image" className="text-[#1e3a8a]">
            프로필 이미지
          </Label>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-[#4dabf7]">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="프로필 이미지"
              />
              <AvatarFallback className="bg-[#e7f5ff] text-[#1e3a8a]">
                여행자
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
            >
              이미지 변경
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 bg-[#e7f5ff]/30 p-4">
        <Button
          variant="outline"
          className="border-[#adb5bd] text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
        >
          취소
        </Button>
        <Button className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
          저장하기
        </Button>
      </CardFooter>
    </Card>
  );
}


  const [preferences, setPreferences] = useState([
    { id: 1, name: "맛집", selected: true },
    { id: 2, name: "자연", selected: true },
    { id: 3, name: "문화", selected: true },
    { id: 4, name: "쇼핑", selected: false },
    { id: 5, name: "휴양", selected: true },
    { id: 6, name: "모험", selected: false },
    { id: 7, name: "사진", selected: true },
    { id: 8, name: "역사", selected: false },
    { id: 9, name: "축제", selected: false },
    { id: 10, name: "예술", selected: false },
    { id: 11, name: "스포츠", selected: false },
    { id: 12, name: "야경", selected: true },
    { id: 13, name: "로컬체험", selected: false },
    { id: 14, name: "럭셔리", selected: false },
    { id: 15, name: "가성비", selected: true },
  ])

  const [travelStyles, setTravelStyles] = useState({
    pace: "보통",
    planning: "계획형",
    budget: "중간",
    accommodation: "호텔",
    transportation: "대중교통",
  })

  const [visitedCountries, setVisitedCountries] = useState([
    { id: 1, name: "일본", visited: true },
    { id: 2, name: "중국", visited: false },
    { id: 3, name: "태국", visited: true },
    { id: 4, name: "베트남", visited: true },
    { id: 5, name: "싱가포르", visited: false },
    { id: 6, name: "미국", visited: true },
    { id: 7, name: "프랑스", visited: false },
    { id: 8, name: "이탈리아", visited: false },
    { id: 9, name: "영국", visited: false },
    { id: 10, name: "호주", visited: false },
  ])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePreference = (id) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    )
  }

  const toggleVisitedCountry = (id) => {
    setVisitedCountries((prev) =>
      prev.map((country) =>
        country.id === id ? { ...country, visited: !country.visited } : country
      )
    )
  }

  const handleStyleChange = (key, value) => {
    setTravelStyles((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveProfile = () => {
    toast({
      title: "프로필이 저장되었습니다.",
      description: "변경사항이 성공적으로 적용되었습니다.",
    })

    setTimeout(() => {
      navigate.push("/mypage")
    }, 1500)
  }

  const handleImageChange = () => {
    toast({
      title: "이미지 업로드",
      description: "프로필 이미지가 업로드되었습니다.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#1e3a8a]">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-[#4dabf7]">
                <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt="프로필 이미지" />
                <AvatarFallback className="bg-[#e7f5ff] text-[#1e3a8a] text-2xl">여행자</AvatarFallback>
              </Avatar>
              <button
                className="absolute bottom-0 right-0 rounded-full bg-[#4dabf7] p-2 text-white hover:bg-[#339af0]"
                onClick={handleImageChange}
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
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#4dabf7] text-[#1c7ed6] hover:bg-[#e7f5ff]"
                  onClick={handleImageChange}
                >
                  이미지 업로드
                </Button>
                <Button variant="outline" size="sm" className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#fff5f5]">
                  <X className="mr-1 h-3 w-3" />
                  삭제
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-[#1e3a8a]">
                닉네임
              </Label>
              <Input
                id="nickname"
                name="nickname"
                value={profileData.nickname}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1e3a8a]">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="text-[#1e3a8a]">
                자기소개
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                className="min-h-[100px] bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[#1e3a8a]">
                성별
              </Label>
              <Select
                value={profileData.gender}
                onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}
              >
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
              <Label htmlFor="birthYear" className="text-[#1e3a8a]">
                생년월일
              </Label>
              <Input
                id="birthYear"
                name="birthYear"
                value={profileData.birthYear}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-[#1e3a8a]">
                직업
              </Label>
              <Input
                id="occupation"
                name="occupation"
                value={profileData.occupation}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-[#1e3a8a]">
                웹사이트
              </Label>
              <Input
                id="website"
                name="website"
                value={profileData.website}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-[#1e3a8a]">
                인스타그램
              </Label>
              <Input
                id="instagram"
                name="instagram"
                value={profileData.instagram}
                onChange={handleProfileChange}
                className="bg-[#e7f5ff]/30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="default" onClick={handleSaveProfile} className="mt-4 bg-[#1e3a8a] text-white hover:bg-[#4dabf7]">
        프로필 저장
      </Button>
    </div>
  )

