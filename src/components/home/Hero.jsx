export function Hero() {
  return (
    <section className="relative py-16 sky-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-8 h-[400px] w-full max-w-5xl">
            {/* 세계 지도 일러스트 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="600" height="300" viewBox="0 0 600 300" className="h-full w-full">
                <path
                  d="M100,150 C150,120 200,100 250,120 C300,140 350,130 400,150 C450,170 500,160 550,140"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="30"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 도쿄 타워 */}
            <div className="absolute left-[100px] top-[150px]">
              <svg width="80" height="120" viewBox="0 0 80 120" className="h-full w-full">
                <path
                  d="M40,100 L25,30 L55,30 Z"
                  fill="#ff9a9e"
                  stroke="#ff9a9e"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M32,30 L28,15 L52,15 L48,30"
                  fill="#ff9a9e"
                  stroke="#ff9a9e"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="38" y="5" width="4" height="10" fill="#ff9a9e" />
                <rect x="35" y="40" width="10" height="5" fill="#a78bfa" />
                <rect x="35" y="50" width="10" height="5" fill="#a78bfa" />
                <rect x="35" y="60" width="10" height="5" fill="#a78bfa" />
              </svg>
            </div>

            {/* 일본 사원 */}
            <div className="absolute left-[160px] top-[170px]">
              <svg width="60" height="80" viewBox="0 0 60 80" className="h-full w-full">
                <path
                  d="M10,60 L10,40 L50,40 L50,60"
                  fill="#a78bfa"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M5,40 L30,20 L55,40" fill="#a78bfa" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
                <path d="M15,60 L15,45 L25,45 L25,60" fill="#fce7f3" stroke="#a78bfa" strokeWidth="1" />
                <path d="M35,60 L35,45 L45,45 L45,60" fill="#fce7f3" stroke="#a78bfa" strokeWidth="1" />
              </svg>
            </div>

            {/* 중국 사원 */}
            <div className="absolute left-[220px] top-[150px]">
              <svg width="60" height="80" viewBox="0 0 60 80" className="h-full w-full">
                <rect x="10" y="40" width="40" height="30" fill="#fcd34d" rx="2" />
                <path d="M5,40 L30,25 L55,40" fill="#fcd34d" stroke="#fcd34d" strokeWidth="2" strokeLinejoin="round" />
                <rect x="20" y="50" width="20" height="20" fill="#fef3c7" rx="2" />
                <rect x="25" y="15" width="10" height="10" fill="#fcd34d" />
              </svg>
            </div>

            {/* 비행기 */}
            <div className="absolute left-[300px] top-[100px] plane-animation">
              <svg width="120" height="80" viewBox="0 0 120 80" className="h-full w-full">
                <path
                  d="M100,40 L80,25 L30,25 L20,15 L30,25 L20,35 L30,35 L80,55 L100,40"
                  fill="#a78bfa"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="40" cy="40" r="3" fill="#4338ca" />
                <circle cx="50" cy="40" r="3" fill="#4338ca" />
                <circle cx="60" cy="40" r="3" fill="#4338ca" />
                <circle cx="70" cy="40" r="3" fill="#4338ca" />
                <circle cx="80" cy="40" r="3" fill="#4338ca" />
                <path
                  d="M20,40 C30,35 40,30 50,35 C60,40 70,35 80,40"
                  fill="none"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 콜로세움 */}
            <div className="absolute right-[180px] top-[160px]">
              <svg width="100" height="80" viewBox="0 0 100 80" className="h-full w-full">
                <path
                  d="M10,60 L10,30 L90,30 L90,60"
                  fill="#a78bfa"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M20,30 L20,20 L80,20 L80,30"
                  fill="#a78bfa"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M30,20 Q50,5 70,20" fill="none" stroke="#4338ca" strokeWidth="2" />
                <path d="M20,40 L80,40" stroke="#4338ca" strokeWidth="1" />
                <path d="M20,50 L80,50" stroke="#4338ca" strokeWidth="1" />
                <path d="M30,30 L30,60" stroke="#4338ca" strokeWidth="1" />
                <path d="M50,30 L50,60" stroke="#4338ca" strokeWidth="1" />
                <path d="M70,30 L70,60" stroke="#4338ca" strokeWidth="1" />
              </svg>
            </div>

            {/* 에펠탑 */}
            <div className="absolute right-[100px] top-[140px]">
              <svg width="80" height="120" viewBox="0 0 80 120" className="h-full w-full">
                <path
                  d="M40,100 L20,30 L60,30 Z"
                  fill="#a78bfa"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M30,30 L25,15 L55,15 L50,30"
                  fill="#a78bfa"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="38" y="5" width="4" height="10" fill="#a78bfa" />
                <path d="M30,50 L50,50" stroke="#4338ca" strokeWidth="1" />
                <path d="M25,70 L55,70" stroke="#4338ca" strokeWidth="1" />
              </svg>
            </div>

            {/* 구름들 */}
            <div className="absolute left-[50px] top-[50px]">
              <svg width="100" height="60" viewBox="0 0 100 60" className="h-full w-full">
                <ellipse cx="30" cy="30" rx="20" ry="15" fill="white" />
                <ellipse cx="50" cy="30" rx="25" ry="20" fill="white" />
                <ellipse cx="75" cy="30" rx="20" ry="15" fill="white" />
              </svg>
            </div>

            <div className="absolute right-[80px] top-[70px]">
              <svg width="100" height="60" viewBox="0 0 100 60" className="h-full w-full">
                <ellipse cx="30" cy="30" rx="20" ry="15" fill="white" />
                <ellipse cx="50" cy="30" rx="25" ry="20" fill="white" />
                <ellipse cx="75" cy="30" rx="20" ry="15" fill="white" />
              </svg>
            </div>

            {/* 나무들 */}
            <div className="absolute left-[30px] bottom-[20px]">
              <svg width="40" height="60" viewBox="0 0 40 60" className="h-full w-full">
                <rect x="18" y="30" width="4" height="20" fill="#6ee7b7" />
                <circle cx="20" cy="20" r="15" fill="#6ee7b7" />
              </svg>
            </div>

             <div className="absolute right-[40px] bottom-[20px]">
              <svg width="40" height="60" viewBox="0 0 40 60" className="h-full w-full">
                <rect x="18" y="30" width="4" height="20" fill="#6ee7b7" />
                <circle cx="20" cy="20" r="15" fill="#6ee7b7" />
              </svg>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h1 className="mb-4 text-5xl font-bold text-traveling-text">세상 모든 여행을 한눈에</h1>
            <p className="mb-6 text-3xl text-traveling-pink">트래블링과 함께 떠나보세요!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
