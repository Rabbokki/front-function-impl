import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TransportationSelection({ destination }) {
  const [selectedTransportation, setSelectedTransportation] = useState(null);

  // 도시별 데이터
  const cityData = {
    osaka: {
      name: '오사카',
      nameEn: 'OSAKA',
    },
    tokyo: {
      name: '도쿄',
      nameEn: 'TOKYO',
    },
    fukuoka: {
      name: '후쿠오카',
      nameEn: 'FUKUOKA',
    },
    jeju: {
      name: '제주',
      nameEn: 'JEJU',
    },
  };

  const city = cityData[destination];

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-2 text-center text-2xl font-bold text-traveling-text">
            이동수단 선택
          </h2>
          <p className="text-center text-sm text-traveling-text/70">
            여행 시 이용하실 이동수단을 선택해주세요.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="mb-8 rounded-lg bg-traveling-background p-6">
            <h3 className="mb-4 text-center text-lg font-medium text-traveling-text">
              버스나 지하철, 기차 등을 이용
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-6 transition-all ${
                  selectedTransportation === 'public'
                    ? 'border-traveling-purple bg-traveling-purple/10'
                    : 'border-gray-200 bg-white hover:border-traveling-purple/50'
                }`}
                onClick={() => setSelectedTransportation('public')}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 6v6" />
                    <path d="M16 6v6" />
                    <path d="M3 10h18" />
                    <path d="M7 14h10" />
                    <path d="M7 18h10" />
                    <rect width="18" height="16" x="3" y="4" rx="2" />
                  </svg>
                </div>
                <span className="font-medium text-traveling-text">
                  대중교통
                </span>
              </div>

              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-6 transition-all ${
                  selectedTransportation === 'car'
                    ? 'border-traveling-purple bg-traveling-purple/10'
                    : 'border-gray-200 bg-white hover:border-traveling-purple/50'
                }`}
                onClick={() => setSelectedTransportation('car')}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <span className="font-medium text-gray-400">승용차</span>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                className="border-traveling-text/30 text-traveling-text hover:bg-traveling-background"
              >
                단기
              </Button>
              <Button className="bg-traveling-purple text-white hover:bg-traveling-purple/90">
                일정생성
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={
              selectedTransportation
                ? `/travel-planner/${destination}/step5`
                : '#'
            }
          >
            <Button
              className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
              disabled={!selectedTransportation}
            >
              다음 단계로
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
