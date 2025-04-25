import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog"
import { Button } from "./Button"
import { Tabs, TabsList, TabsTrigger } from "./Tabs"
import { Input } from "./Input"
import { Label } from "./Label"
import { MapPin, Navigation, Car, Train, FootprintsIcon as Walk, Clock, ArrowRight } from "lucide-react"

export function DirectionsModal({ isOpen, onClose, destination }) {
  const [transportMode, setTransportMode] = useState("transit")
  const [startLocation, setStartLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [directions, setDirections] = useState(null)

  // 현재 위치 가져오기
  useEffect(() => {
    if (isOpen) {
      setStartLocation("현재 위치")
      // 실제 구현에서는 geolocation API를 사용하여 현재 위치를 가져올 수 있습니다
    }
  }, [isOpen])

  // 길찾기 실행 함수
  const handleGetDirections = () => {
    setIsLoading(true)

    // 실제 구현에서는 지도 API를 사용하여 경로를 가져옵니다
    // 여기서는 데모 데이터를 사용합니다
    setTimeout(() => {
      const demoDirections = {
        transit: {
          duration: "1시간 15분",
          distance: "12.5km",
          steps: [
            { mode: "walk", instruction: "도보로 신주쿠역까지 이동", duration: "5분" },
            { mode: "train", instruction: "JR 야마노테선 타고 도쿄역까지 이동", duration: "25분" },
            { mode: "train", instruction: "도쿄 메트로 히비야선 타고 아사쿠사역까지 이동", duration: "20분" },
            { mode: "walk", instruction: "도보로 도쿄 스카이트리까지 이동", duration: "15분" },
          ],
        },
        driving: {
          duration: "45분",
          distance: "14.2km",
          steps: [
            { mode: "car", instruction: "신주쿠도리를 따라 동쪽으로 이동", duration: "10분" },
            { mode: "car", instruction: "수미다강을 건너 스카이트리 방향으로 이동", duration: "20분" },
            { mode: "car", instruction: "스카이트리 주차장에 도착", duration: "15분" },
          ],
        },
        walking: {
          duration: "2시간 30분",
          distance: "10.8km",
          steps: [
            { mode: "walk", instruction: "신주쿠에서 우에노 방향으로 이동", duration: "1시간 10분" },
            { mode: "walk", instruction: "우에노 공원을 지나 아사쿠사 방향으로 이동", duration: "50분" },
            { mode: "walk", instruction: "아사쿠사에서 스카이트리 방향으로 이동", duration: "30분" },
          ],
        },
      }

      setDirections(demoDirections[transportMode])
      setIsLoading(false)
    }, 1000)
  }

  // 교통수단 아이콘 매핑
  const transportIcons = {
    walk: <Walk className="h-4 w-4" />,
    train: <Train className="h-4 w-4" />,
    car: <Car className="h-4 w-4" />,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#1e3a8a]">길찾기</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <div className="mb-4 rounded-md bg-[#e7f5ff] p-3">
            <h3 className="font-medium text-[#1e3a8a]">{destination.name}</h3>
            <div className="mt-1 flex items-center text-sm text-[#495057]">
              <MapPin className="mr-1 h-3 w-3 text-[#4dabf7]" />
              <span>{destination.address}</span>
            </div>
          </div>

          <div className="mb-4 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="start-location" className="text-[#1e3a8a]">
                출발지
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
                <Input
                  id="start-location"
                  placeholder="현재 위치 또는 출발지 입력"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="bg-[#f8f9fa] pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-location" className="text-[#1e3a8a]">
                도착지
              </Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff6b6b]" />
                <Input id="end-location" value={destination.address} readOnly className="bg-[#f8f9fa] pl-10" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="transit" className="w-full" onValueChange={setTransportMode}>
            <TabsList className="mb-4 grid w-full grid-cols-3 bg-[#e7f5ff]">
              <TabsTrigger value="transit" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
                <Train className="mr-2 h-4 w-4" />
                대중교통
              </TabsTrigger>
              <TabsTrigger value="driving" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
                <Car className="mr-2 h-4 w-4" />
                자동차
              </TabsTrigger>
              <TabsTrigger value="walking" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
                <Walk className="mr-2 h-4 w-4" />
                도보
              </TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <Button
                className="w-full bg-[#4dabf7] hover:bg-[#339af0]"
                onClick={handleGetDirections}
                disabled={isLoading}
              >
                {isLoading ? "경로 검색 중..." : "경로 검색"}
              </Button>
            </div>

            {directions && (
              <div className="rounded-md border border-[#e7f5ff] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-[#4dabf7]" />
                    <span className="font-medium text-[#1e3a8a]">{directions.duration}</span>
                  </div>
                  <span className="text-sm text-[#495057]">총 거리: {directions.distance}</span>
                </div>

                <div className="space-y-3">
                  {directions.steps.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5ff]">
                        {transportIcons[step.mode]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#1e3a8a]">{step.instruction}</span>
                          <span className="text-sm text-[#495057]">{step.duration}</span>
                        </div>
                        {index < directions.steps.length - 1 && (
                          <div className="ml-4 mt-1 flex items-center text-[#adb5bd]">
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Tabs>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}