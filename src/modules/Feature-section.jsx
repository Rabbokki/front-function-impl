// FeatureSection.jsx
import React from "react";
import { Plane, Calendar, MessageSquare } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="bg-traveling-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg bg-traveling-orange/10 p-6 text-center shadow-md transition-transform hover:scale-105">
            <div className="mb-4 rounded-full bg-traveling-orange p-4">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-traveling-brown">항공권 & 숙소</h3>
            <p className="text-traveling-brown">한 번에 검색하고 예약하세요</p>

            <div className="mt-4 h-32 w-full">
              <svg viewBox="0 0 200 100" className="h-full w-full">
                <rect x="20" y="40" width="160" height="40" rx="5" fill="#e29c67" stroke="#4a3f35" strokeWidth="2" />
                <rect x="30" y="50" width="60" height="20" rx="2" fill="white" stroke="#4a3f35" strokeWidth="1" />
                <rect x="100" y="50" width="70" height="20" rx="2" fill="white" stroke="#4a3f35" strokeWidth="1" />
                <circle cx="40" cy="60" r="5" fill="#e29c67" />
                <path d="M50,60 L70,60" stroke="#4a3f35" strokeWidth="2" />
                <circle cx="110" cy="60" r="5" fill="#e29c67" />
                <path d="M120,60 L150,60" stroke="#4a3f35" strokeWidth="2" />
                <path d="M180,40 L190,30 L190,50 L180,40" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-traveling-beige/30 p-6 text-center shadow-md transition-transform hover:scale-105">
            <div className="mb-4 rounded-full bg-traveling-beige p-4">
              <Calendar className="h-8 w-8 text-traveling-brown" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-traveling-brown">나만의 일정 만들기</h3>
            <p className="text-traveling-brown">AI 추천으로 쉽게 계획하세요</p>

            <div className="mt-4 h-32 w-full">
              <svg viewBox="0 0 200 100" className="h-full w-full">
                <rect x="40" y="20" width="120" height="70" rx="5" fill="white" stroke="#4a3f35" strokeWidth="2" />
                <rect x="50" y="30" width="100" height="15" rx="2" fill="#f0d9b5" />
                <circle cx="60" cy="37" r="5" fill="#e29c67" />
                <path d="M70,37 L120,37" stroke="#4a3f35" strokeWidth="2" />
                <rect x="50" y="50" width="100" height="15" rx="2" fill="#f0d9b5" />
                <circle cx="60" cy="57" r="5" fill="#e29c67" />
                <path d="M70,57 L120,57" stroke="#4a3f35" strokeWidth="2" />
                <rect x="50" y="70" width="100" height="15" rx="2" fill="#f0d9b5" />
                <circle cx="60" cy="77" r="5" fill="#e29c67" />
                <path d="M70,77 L120,77" stroke="#4a3f35" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-traveling-green/10 p-6 text-center shadow-md transition-transform hover:scale-105">
            <div className="mb-4 rounded-full bg-traveling-green p-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-traveling-brown">여행 커뮤니티</h3>
            <p className="text-traveling-brown">꿀팁과 경험을 공유하세요</p>

            <div className="mt-4 h-32 w-full">
              <svg viewBox="0 0 200 100" className="h-full w-full">
                <rect x="30" y="20" width="60" height="40" rx="5" fill="#e29c67" stroke="#4a3f35" strokeWidth="1" />
                <rect x="35" y="25" width="50" height="30" rx="3" fill="white" />
                <circle cx="45" cy="40" r="5" fill="#e29c67" />
                <path d="M55,40 L75,40" stroke="#4a3f35" strokeWidth="2" />
                <rect x="110" y="40" width="60" height="40" rx="5" fill="#8a9a7b" stroke="#4a3f35" strokeWidth="1" />
                <rect x="115" y="45" width="50" height="30" rx="3" fill="white" />
                <circle cx="125" cy="60" r="5" fill="#8a9a7b" />
                <path d="M135,60 L155,60" stroke="#4a3f35" strokeWidth="2" />
                <path d="M95,40 L105,50 L95,60" fill="#4a3f35" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
