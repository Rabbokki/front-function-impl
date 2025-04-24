"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TravelPlannerHome() {
  const [searchQuery, setSearchQuery] = useState("")

  // 다양한 나라의 도시들 추가
  const destinations = [
    // 일본
    {
      id: "osaka",
      name: "OSAKA",
      nameKr: "일본 오사카",
      country: "Japan",
      image: "/images/destinations/osaka.jpg",
      isNew: true,
    },
    {
      id: "tokyo",
      name: "TOKYO",
      nameKr: "일본 도쿄",
      country: "Japan",
      image: "/images/destinations/tokyo.png",
      isNew: true,
    },
    {
      id: "fukuoka",
      name: "FUKUOKA",
      nameKr: "일본 후쿠오카",
      country: "Japan",
      image: "/images/destinations/fukuoka.png",
      isNew: true,
    },
    // 프랑스
    {
      id: "paris",
      name: "PARIS",
      nameKr: "프랑스 파리",
      country: "France",
      image: "/images/destinations/paris.png",
      isNew: true,
    },
    // 이탈리아
    {
      id: "rome",
      name: "ROME",
      nameKr: "이탈리아 로마",
      country: "Italy",
      image: "/images/destinations/rome.png",
      isNew: true,
    },
    {
      id: "venice",
      name: "VENICE",
      nameKr: "이탈리아 베니스",
      country: "Italy",
      image: "/images/destinations/venice.png",
      isNew: false,
    },
    // 태국
    {
      id: "bangkok",
      name: "BANGKOK",
      nameKr: "태국 방콕",
      country: "Thailand",
      image: "/images/destinations/bangkok.png",
      isNew: true,
    },
    // 싱가포르
    {
      id: "singapore",
      name: "SINGAPORE",
      nameKr: "싱가포르",
      country: "Singapore",
      image: "/images/destinations/singapore.png",
      isNew: false,
    },
  ]

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.nameKr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-traveling-text">어디로 여행을 떠나시나요?</h2>

        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="국가명이나 도시명으로 검색해보세요."
              className="bg-traveling-background pl-10 border-traveling-text/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDestinations.map((destination) => (
            <Link key={destination.id} href={`/travel-planner/${destination.id}/step1`}>
              <Card className="overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  {destination.isNew && <Badge className="absolute right-2 top-2 bg-red-500 text-white">NEW</Badge>}
                  <Badge className="absolute left-2 top-2 bg-traveling-purple/80 text-white">
                    {destination.country}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-traveling-text">{destination.name}</h3>
                    <p className="text-sm text-traveling-text/70">{destination.nameKr}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
