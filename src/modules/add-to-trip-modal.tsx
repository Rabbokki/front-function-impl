"use client"

import { useState } from "react"
import { Calendar, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface AddToTripModalProps {
  isOpen: boolean
  onClose: () => void
  placeName: string
  placeType: string
  placeLocation: string
}

export function AddToTripModal({ isOpen, onClose, placeName, placeType, placeLocation }: AddToTripModalProps) {
  const [activeTab, setActiveTab] = useState("existing")
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null)
  const [isAddingToDay, setIsAddingToDay] = useState(false)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
  const [newTripData, setNewTripData] = useState({
    title: "",
    date: { from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 3)) },
    description: "",
  })

  // 데모용 여행 데이터
  const myTrips = [
    {
      id: 1,
      title: "도쿄 3박 4일",
      date: "2025.05.15 - 2025.05.18",
      status: "예정",
      image: "도쿄",
      color: "#ff6b6b",
      days: 4,
    },
    {
      id: 2,
      title: "제주도 가족여행",
      date: "2025.03.10 - 2025.03.13",
      status: "예정",
      image: "제주도",
      color: "#51cf66",
      days: 4,
    },
    {
      id: 3,
      title: "방콕 5일",
      date: "2024.12.24 - 2024.12.28",
      status: "예정",
      image: "방콕",
      color: "#ffd43b",
      days: 5,
    },
  ]

  const handleSelectTrip = (tripId: number) => {
    setSelectedTripId(tripId)
    setIsAddingToDay(true)
  }

  const handleSelectDay = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex)
  }

  const handleAddToTrip = () => {
    if (activeTab === "existing" && selectedTripId !== null && selectedDayIndex !== null) {
      // 기존 여행에 장소 추가 로직
      const tripName = myTrips.find((trip) => trip.id === selectedTripId)?.title || "여행"
      toast({
        title: "장소가 추가되었습니다",
        description: `${placeName}이(가) ${tripName}의 ${selectedDayIndex + 1}일차에 추가되었습니다.`,
      })
      onClose()
    } else if (activeTab === "new" && newTripData.title) {
      // 새 여행 생성 및 장소 추가 로직
      toast({
        title: "새 여행이 생성되었습니다",
        description: `${newTripData.title} 여행이 생성되었고 ${placeName}이(가) 추가되었습니다.`,
      })
      onClose()
    }
  }

  const handleNewTripChange = (field: string, value: any) => {
    setNewTripData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#1e3a8a]">여행에 추가하기</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <div className="mb-4 rounded-md bg-[#e7f5ff] p-3">
            <h3 className="font-medium text-[#1e3a8a]">{placeName}</h3>
            <div className="mt-1 flex items-center text-sm text-[#495057]">
              <Badge
                className={`mr-2 ${
                  placeType === "명소" ? "bg-[#ff6b6b]" : placeType === "맛집" ? "bg-[#ffd43b]" : "bg-[#4dabf7]"
                } text-white`}
              >
                {placeType}
              </Badge>
              <span>{placeLocation}</span>
            </div>
          </div>

          <Tabs defaultValue="existing" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#e7f5ff]">
              <TabsTrigger value="existing" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
                기존 여행에 추가
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
                새 여행 만들기
              </TabsTrigger>
            </TabsList>

            <TabsContent value="existing">
              {!isAddingToDay ? (
                <div className="space-y-3">
                  <p className="text-sm text-[#495057]">추가할 여행을 선택하세요:</p>
                  {myTrips.map((trip) => (
                    <Card
                      key={trip.id}
                      className={`cursor-pointer overflow-hidden transition-all hover:bg-[#e7f5ff]/50 ${
                        selectedTripId === trip.id ? "border-[#4dabf7] bg-[#e7f5ff]/30" : "bg-[#f8f9fa]"
                      }`}
                      onClick={() => handleSelectTrip(trip.id)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium text-[#1e3a8a]">{trip.title}</h3>
                          <div className="mt-1 flex items-center text-sm text-[#495057]">
                            <Calendar className="mr-1 h-3 w-3 text-[#4dabf7]" />
                            <span>{trip.date}</span>
                          </div>
                        </div>
                        <Badge className={`${trip.status === "예정" ? "bg-[#4dabf7]" : "bg-[#adb5bd]"} text-white`}>
                          {trip.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#1e3a8a]">
                      {myTrips.find((trip) => trip.id === selectedTripId)?.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-[#495057]"
                      onClick={() => {
                        setIsAddingToDay(false)
                        setSelectedTripId(null)
                      }}
                    >
                      다른 여행 선택
                    </Button>
                  </div>

                  <p className="text-sm text-[#495057]">추가할 일차를 선택하세요:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: myTrips.find((trip) => trip.id === selectedTripId)?.days || 0 }, (_, i) => (
                      <Card
                        key={i}
                        className={`cursor-pointer overflow-hidden transition-all hover:bg-[#e7f5ff]/50 ${
                          selectedDayIndex === i ? "border-[#4dabf7] bg-[#e7f5ff]/30" : "bg-[#f8f9fa]"
                        }`}
                        onClick={() => handleSelectDay(i)}
                      >
                        <CardContent className="flex items-center justify-center p-4">
                          <div className="text-center">
                            <h4 className="font-medium text-[#1e3a8a]">{i + 1}일차</h4>
                            {selectedDayIndex === i && <Check className="mx-auto mt-1 h-4 w-4 text-[#4dabf7]" />}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="new">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trip-title" className="text-[#1e3a8a]">
                    여행 제목
                  </Label>
                  <Input
                    id="trip-title"
                    placeholder="예: 도쿄 3박 4일"
                    value={newTripData.title}
                    onChange={(e) => handleNewTripChange("title", e.target.value)}
                    className="bg-[#f8f9fa]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trip-date" className="text-[#1e3a8a]">
                    여행 기간
                  </Label>
                  <DatePickerWithRange
                    date={newTripData.date}
                    onDateChange={(date) => handleNewTripChange("date", date)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trip-description" className="text-[#1e3a8a]">
                    여행 설명 (선택사항)
                  </Label>
                  <Textarea
                    id="trip-description"
                    placeholder="여행에 대한 간단한 설명을 입력하세요"
                    value={newTripData.description}
                    onChange={(e) => handleNewTripChange("description", e.target.value)}
                    className="min-h-[80px] bg-[#f8f9fa]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            className="bg-[#4dabf7] hover:bg-[#339af0]"
            onClick={handleAddToTrip}
            disabled={
              (activeTab === "existing" && (selectedTripId === null || selectedDayIndex === null)) ||
              (activeTab === "new" && !newTripData.title)
            }
          >
            {activeTab === "existing" ? "여행에 추가" : "새 여행 만들기"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
