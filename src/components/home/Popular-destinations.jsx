import { Link } from "react-router-dom"

export function PopularDestinations() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* 도쿄 */}
          <Link href="/destination/도쿄" className="city-card tokyo-card">
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-12 overflow-hidden rounded border border-gray-200">
                <div className="h-full w-full bg-white flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-traveling-pink"></div>
                </div>
              </div>
            </div>
            <div className="mb-6 mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <path
                  d="M40,100 L40,40 L80,40 Z"
                  fill="#ff9a9e"
                  stroke="#ff9a9e"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="20" y="70" width="30" height="30" fill="#a78bfa" rx="2" />
                <rect x="25" y="75" width="20" height="20" fill="#fce7f3" rx="2" />
                <path
                  d="M50,40 L45,20 L75,20 L70,40"
                  fill="#ff9a9e"
                  stroke="#ff9a9e"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="58" y="10" width="4" height="10" fill="#ff9a9e" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-traveling-text">도쿄</h3>
          </Link>

          {/* 파리 */}
          <Link href="/destination/파리" className="city-card paris-card">
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-12 overflow-hidden rounded border border-gray-200">
                <div className="flex h-full">
                  <div className="h-full w-1/3 bg-traveling-blue"></div>
                  <div className="h-full w-1/3 bg-white"></div>
                  <div className="h-full w-1/3 bg-traveling-pink"></div>
                </div>
              </div>
            </div>
            <div className="mb-6 mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <path
                  d="M60,100 L30,40 L90,40 Z"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M40,40 L35,25 L85,25 L80,40"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M45,25 L40,10 L80,10 L75,25"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="58" y="5" width="4" height="5" fill="#fcd34d" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-traveling-text">파리</h3>
          </Link>

          {/* 로마 */}
          <Link href="/destination/로마" className="city-card rome-card">
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-12 overflow-hidden rounded border border-gray-200">
                <div className="flex h-full">
                  <div className="h-full w-1/3 bg-traveling-green"></div>
                  <div className="h-full w-1/3 bg-white"></div>
                  <div className="h-full w-1/3 bg-traveling-pink"></div>
                </div>
              </div>
            </div>
            <div className="mb-6 mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <path
                  d="M20,100 L20,60 L100,60 L100,100"
                  fill="#a78bfa"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M30,60 L30,40 L90,40 L90,60"
                  fill="#a78bfa"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M40,40 Q60,20 80,40" fill="none" stroke="#a78bfa" strokeWidth="2" />
                <path d="M40,70 L80,70" stroke="white" strokeWidth="1" />
                <path d="M40,80 L80,80" stroke="white" strokeWidth="1" />
                <path d="M40,90 L80,90" stroke="white" strokeWidth="1" />
                <path d="M50,60 L50,100" stroke="white" strokeWidth="1" />
                <path d="M70,60 L70,100" stroke="white" strokeWidth="1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-traveling-text">로마</h3>
          </Link>

          {/* 방콕 */}
          <Link href="/destination/방콕" className="city-card bangkok-card">
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-12 overflow-hidden rounded border border-gray-200">
                <div className="flex flex-col h-full">
                  <div className="h-1/3 w-full bg-traveling-pink"></div>
                  <div className="h-1/3 w-full bg-traveling-blue"></div>
                  <div className="h-1/3 w-full bg-white"></div>
                </div>
              </div>
            </div>
            <div className="mb-6 mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <path
                  d="M60,100 L30,60 L90,60 Z"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M60,60 L40,40 L80,40 Z"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M60,40 L50,20 L70,20 Z"
                  fill="#fcd34d"
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="55" y="10" width="10" height="10" fill="#fcd34d" rx="2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-traveling-text">방콕</h3>
          </Link>
        </div>
      </div>
    </section>
  )
}
