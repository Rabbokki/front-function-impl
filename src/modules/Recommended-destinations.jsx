import React from 'react'
import { Link } from 'react-router-dom';

export function RecommendedDestinations() {
  const destinations = [
    {
      name: "도쿄",
      country: "일본",
      flag: "🇯🇵",
      color: "#e29c67",
    },
    {
      name: "파리",
      country: "프랑스",
      flag: "🇫🇷",
      color: "#8a9a7b",
    },
    {
      name: "로마",
      country: "이탈리아",
      flag: "🇮🇹",
      color: "#f0d9b5",
    },
    {
      name: "방콕",
      country: "태국",
      flag: "🇹🇭",
      color: "#e29c67",
    },
  ];

  return (
    <section className="bg-traveling-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex justify-center">
          <div className="relative h-64 w-full max-w-4xl">
            <svg viewBox="0 0 800 200" className="h-full w-full">
              {/* (Your SVG content) */}
            </svg>
          </div>
        </div>

        <h2 className="mb-10 text-center text-3xl font-bold text-traveling-brown">추천 여행지</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <Link
              to={`/destination/${destination.name}`}
              key={destination.name}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
            >
              <div className="relative h-48 w-full overflow-hidden bg-traveling-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  {index === 0 && (
                    <svg viewBox="0 0 200 150" className="h-full w-full">
                      {/* 도쿄 타워 일러스트 */}
                    </svg>
                  )}

                  {index === 1 && (
                    <svg viewBox="0 0 200 150" className="h-full w-full">
                      {/* 에펠탑 일러스트 */}
                    </svg>
                  )}

                  {index === 2 && (
                    <svg viewBox="0 0 200 150" className="h-full w-full">
                      {/* 콜로세움 일러스트 */}
                    </svg>
                  )}

                  {index === 3 && (
                    <svg viewBox="0 0 200 150" className="h-full w-full">
                      {/* 방콕 사원 일러스트 */}
                    </svg>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-traveling-brown">{destination.name}</h3>
                  <span className="text-xl">{destination.flag}</span>
                </div>
                <p className="text-traveling-brown">{destination.country}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-traveling-brown">추천</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
