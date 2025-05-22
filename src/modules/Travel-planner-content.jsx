import { useState } from "react"
import { Calendar, Plus, MapPin, Clock, Sparkles, PenLine } from "lucide-react"
import { Button } from "./Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Input } from "./Input"
import { Label } from "./Label"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Textarea } from "./Textarea"

export function TravelPlannerContent() {
  const [days, setDays] = useState(3)

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 bg-[#e7f5ff]">
          <TabsTrigger value="manual" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            직접 일정 만들기
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            AI 일정 추천
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="trip-name" className="mb-2 block">
                여행 이름
              </Label>
              <div className="relative">
                <Input id="trip-name" placeholder="예: 도쿄 3박 4일 여행" className="bg-[#f8f9fa] pl-10" />
                <PenLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="destination" className="mb-2 block">
                여행지
              </Label>
              <div className="relative">
                <Input id="destination" placeholder="예: 도쿄, 일본" className="bg-[#f8f9fa] pl-10" />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="start-date" className="mb-2 block">
                시작일
              </Label>
              <div className="relative">
                <Input id="start-date" type="date" className="bg-[#f8f9fa]" />
                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="end-date" className="mb-2 block">
                종료일
              </Label>
              <div className="relative">
                <Input id="end-date" type="date" className="bg-[#f8f9fa]" />
                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-[#1e3a8a]">일정 계획</h2>

            {Array.from({ length: days }).map((_, index) => (
              <Card key={index} className="mb-6 bg-[#f8f9fa]">
                <CardHeader className="bg-[#e7f5ff] pb-2 pt-4">
                  <CardTitle className="text-lg text-[#1e3a8a]">DAY {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {Array.from({ length: 3 }).map((_, placeIndex) => (
                    <div key={placeIndex} className="mb-4 rounded-lg border border-[#e7f5ff] p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-[#4dabf7]" />
                          <Input
                            placeholder="시간"
                            className="w-24 border-none bg-transparent p-0 text-sm"
                            defaultValue={`${10 + placeIndex}:00`}
                          />
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#4dabf7]">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-[#4dabf7]" />
                        <Input
                          placeholder="장소 이름"
                          className="border-none bg-transparent p-0"
                          defaultValue={
                            placeIndex === 0 ? "아사쿠사 센소지" : placeIndex === 1 ? "스카이트리" : "우에노 공원"
                          }
                        />
                      </div>
                      <Textarea
                        placeholder="메모"
                        className="mt-2 min-h-[60px] border-none bg-[#e7f5ff]/50 text-sm"
                        defaultValue={
                          placeIndex === 0
                            ? "도쿄에서 가장 오래된 사원, 나카미세 거리 구경하기"
                            : placeIndex === 1
                              ? "전망대에서 도쿄 시내 전경 감상"
                              : "공원 산책 및 주변 박물관 방문"
                        }
                      />
                    </div>
                  ))}

                  <Button variant="outline" className="mt-2 w-full border-dashed border-[#4dabf7] text-[#4dabf7]">
                    <Plus className="mr-2 h-4 w-4" />
                    일정 추가
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="mb-8 w-full border-dashed border-[#4dabf7] text-[#4dabf7]"
              onClick={() => setDays(days + 1)}
            >
              <Plus className="mr-2 h-4 w-4" />
              DAY {days + 1} 추가
            </Button>

            <Button className="w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">여행 일정 저장하기</Button>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="ai-destination" className="mb-2 block">
                여행지
              </Label>
              <div className="relative">
                <Input id="ai-destination" placeholder="예: 도쿄, 일본" className="bg-[#f8f9fa] pl-10" />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4dabf7]" />
              </div>
            </div>
            <div>
              <Label htmlFor="ai-days" className="mb-2 block">
                여행 일수
              </Label>
              <Input id="ai-days" type="number" defaultValue="3" min="1" max="14" className="bg-[#f8f9fa]" />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="travel-style" className="mb-2 block">
              여행 스타일
            </Label>
            <div className="flex flex-wrap gap-2">
              {["관광", "맛집", "쇼핑", "자연", "예술/문화", "휴식", "액티비티", "로컬 체험"].map((style) => (
                <Button
                  key={style}
                  variant="outline"
                  className="rounded-full border-[#4dabf7] bg-white hover:bg-[#e7f5ff]"
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="preferences" className="mb-2 block">
              추가 선호사항
            </Label>
            <Textarea
              id="preferences"
              placeholder="예: 대중교통 이용, 가족 여행, 저예산 여행, 특별한 요청사항 등"
              className="min-h-[100px] bg-[#f8f9fa]"
            />
          </div>

          <Button className="w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
            <Sparkles className="mr-2 h-4 w-4" />
            AI 일정 생성하기
          </Button>

          <div className="mt-12 rounded-lg bg-[#e7f5ff] p-6">
            <div className="mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-[#4dabf7]" />
              <h2 className="text-xl font-bold text-[#1e3a8a]">AI 추천 일정 예시</h2>
            </div>

            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 text-lg font-medium text-[#1e3a8a]">도쿄 3일 여행 일정</h3>
              <p className="mb-4 text-sm text-[#495057]">관광, 맛집, 쇼핑 중심의 일정입니다.</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#1e3a8a]">DAY 1: 도쿄 동부 탐험</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex">
                      <span className="mr-2 font-medium">09:00</span>
                      <span>아사쿠사 센소지 방문 및 나카미세 거리 구경</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">12:00</span>
                      <span>아사쿠사에서 현지 라멘 맛집 점심</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">14:00</span>
                      <span>스카이트리 전망대에서 도쿄 시내 전경 감상</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">17:00</span>
                      <span>아키하바라 전자상가 쇼핑</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">19:00</span>
                      <span>아키하바라 메이드 카페 체험</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#1e3a8a]">DAY 2: 시부야 & 하라주쿠</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex">
                      <span className="mr-2 font-medium">10:00</span>
                      <span>시부야 스크램블 교차로 & 하치코 동상</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">12:00</span>
                      <span>시부야 109에서 쇼핑</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">14:00</span>
                      <span>하라주쿠 타케시타 거리 탐험</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">16:00</span>
                      <span>메이지 신궁 방문</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">19:00</span>
                      <span>오모테산도 힐스에서 저녁 식사</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#1e3a8a]">DAY 3: 도쿄 서부</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex">
                      <span className="mr-2 font-medium">09:00</span>
                      <span>신주쿠 교엔 정원 산책</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">11:00</span>
                      <span>도쿄 도청 전망대 방문</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">13:00</span>
                      <span>신주쿠에서 점심 식사</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">15:00</span>
                      <span>신주쿠 쇼핑</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2 font-medium">18:00</span>
                      <span>신주쿠 골든가이에서 이자카야 체험</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="mt-6 w-full bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]">
                이 일정으로 저장하기
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}