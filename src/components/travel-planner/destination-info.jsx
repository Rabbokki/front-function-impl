import { useState } from 'react';
import Image from 'next/image';
import { PlaneIcon, ArrowRight, ExternalLink, Building } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

export function DestinationInfo({ destination }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(4);
  const [currentYear, setCurrentYear] = useState(2025);

  // 도시별 데이터
  const cityData = {
    osaka: {
      name: '오사카',
      nameEn: 'OSAKA',
      country: '일본',
      countryEn: 'Japan',
      flag: '🇯🇵',
      description:
        '일본의 미식과 역사의 중심지. 도톤보리의 눈부신 불빛 아래, 전통적인 타코야키의 오묘한 맛을 즐겨세요. 오사카성에서는 일본의 고대 역사를 체험할 수 있습니다. 유니버설 스튜디오 재팬에서는 화려한 어트랙션을 경험할 수 있으며, 신세계의 츠텐카쿠 타워에서는 도시의 전경을 한 눈에 볼 수 있습니다. 오사카에서는 끊임없는 먹거리 발견이 기다립니다.',
      flightTime: '약 2시간',
      visa: '무비자',
      currency: '엔(JPY)',
      voltage: '110V',
      adapter: '없음',
      image: '/images/destinations/osaka.jpg',
      airport: 'osaa', // 스카이스캐너 공항 코드
    },
    tokyo: {
      name: '도쿄',
      nameEn: 'TOKYO',
      country: '일본',
      countryEn: 'Japan',
      flag: '🇯🇵',
      description:
        '일본의 수도이자 세계 최대 도시 중 하나인 도쿄는 현대적인 기술과 전통이 공존하는 매력적인 도시입니다. 화려한 네온사인의 번화가부터 고즈넉한 사원과 정원까지, 다양한 매력을 지닌 도시입니다.',
      flightTime: '약 2시간 30분',
      visa: '무비자',
      currency: '엔(JPY)',
      voltage: '110V',
      adapter: '없음',
      image: '/images/destinations/tokyo.png',
      airport: 'tyoa', // 스카이스캐너 공항 코드
    },
    fukuoka: {
      name: '후쿠오카',
      nameEn: 'FUKUOKA',
      country: '일본',
      countryEn: 'Japan',
      flag: '🇯🇵',
      description:
        '일본 규슈 지방의 중심 도시인 후쿠오카는 맛있는 음식과 친절한 사람들로 유명합니다. 하카타 라멘과 모츠나베 같은 현지 요리를 즐기고, 아름다운 해변과 역사적인 사원을 방문해보세요.',
      flightTime: '약 1시간 30분',
      visa: '무비자',
      currency: '엔(JPY)',
      voltage: '110V',
      adapter: '없음',
      image: '/images/destinations/fukuoka.png',
      airport: 'fuka', // 스카이스캐너 공항 코드
    },
    jeju: {
      name: '제주',
      nameEn: 'JEJU',
      country: '대한민국',
      flag: '🇰🇷',
      description:
        '한국의 아름다운 섬 제주도는 화산 지형과 독특한 자연 경관으로 유명합니다. 성산일출봉, 한라산, 우도 등 다양한 자연 명소와 함께 제주 특유의 문화와 음식을 경험해보세요.',
      flightTime: '약 1시간',
      visa: '국내',
      currency: '원(KRW)',
      voltage: '220V',
      adapter: '없음',
      image: '/images/destinations/jeju.png',
    },
    paris: {
      name: '파리',
      nameEn: 'PARIS',
      country: '프랑스',
      countryEn: 'France',
      flag: '🇫🇷',
      description:
        '프랑스의 수도 파리는 예술, 패션, 요리, 문화의 중심지로 알려져 있습니다. 에펠탑, 루브르 박물관, 노트르담 대성당 등 세계적으로 유명한 랜드마크들이 있는 로맨틱한 도시입니다.',
      flightTime: '약 12시간',
      visa: '무비자(90일)',
      currency: '유로(EUR)',
      voltage: '230V',
      adapter: '필요',
      image: '/images/destinations/paris.png',
      airport: 'pari', // 스카이스캐너 공항 코드
    },
    rome: {
      name: '로마',
      nameEn: 'ROME',
      country: '이탈리아',
      countryEn: 'Italy',
      flag: '🇮🇹',
      description:
        "이탈리아의 수도 로마는 '영원한 도시'라는 별명을 가진 역사적인 도시입니다. 콜로세움, 바티칸 시국, 트레비 분수 등 고대 로마 제국의 유적과 르네상스 시대의 예술 작품들이 도시 곳곳에 남아있습니다.",
      flightTime: '약 13시간',
      visa: '무비자(90일)',
      currency: '유로(EUR)',
      voltage: '230V',
      adapter: '필요',
      image: '/images/destinations/rome.png',
      airport: 'rome', // 스카이스캐너 공항 코드
    },
    venice: {
      name: '베니스',
      nameEn: 'VENICE',
      country: '이탈리아',
      countryEn: 'Italy',
      flag: '🇮🇹',
      description:
        '이탈리아 북동부에 위치한 베니스는 117개의 작은 섬으로 이루어진 수상 도시입니다. 곤돌라를 타고 운하를 따라 이동하며 산 마르코 광장, 리알토 다리 등 아름다운 건축물과 예술 작품을 감상할 수 있습니다.',
      flightTime: '약 13시간 30분',
      visa: '무비자(90일)',
      currency: '유로(EUR)',
      voltage: '230V',
      adapter: '필요',
      image: '/images/destinations/venice.png',
      airport: 'veni', // 스카이스캐너 공항 코드
    },
    bangkok: {
      name: '방콕',
      nameEn: 'BANGKOK',
      country: '태국',
      countryEn: 'Thailand',
      flag: '🇹🇭',
      description:
        '태국의 수도 방콕은 활기찬 거리 음식, 화려한 사원, 번화한 시장이 특징인 도시입니다. 전통과 현대가 공존하는 이 도시는 동남아시아에서 가장 인기 있는 관광지 중 하나입니다.',
      flightTime: '약 6시간',
      visa: '무비자(90일)',
      currency: '바트(THB)',
      voltage: '220V',
      adapter: '필요',
      image: '/images/destinations/bangkok.png',
      airport: 'bkkt', // 스카이스캐너 공항 코드
    },
    singapore: {
      name: '싱가포르',
      nameEn: 'SINGAPORE',
      country: '싱가포르',
      countryEn: 'Singapore',
      flag: '🇸🇬',
      description:
        '동남아시아의 도시국가 싱가포르는 현대적인 건축물, 다양한 문화, 맛있는 음식으로 유명합니다. 마리나 베이 샌즈, 가든스 바이 더 베이, 센토사 섬 등 다양한 관광 명소를 갖추고 있습니다.',
      flightTime: '약 6시간 30분',
      visa: '무비자(90일)',
      currency: '싱가포르 달러(SGD)',
      voltage: '230V',
      adapter: '필요',
      image: '/images/destinations/singapore.png',
      airport: 'sins', // 스카이스캐너 공항 코드
    },
  };

  const city = cityData[destination] || cityData.osaka;

  // 스카이스캐너 URL 생성 (서울에서 목적지로)
  const skyscannerUrl = `https://www.skyscanner.co.kr/transport/flights/sela/${city.airport}`;

  // 부킹닷컴 URL 생성
  const bookingUrl = `https://www.booking.com/searchresults.ko.html?ss=${encodeURIComponent(
    city.name
  )}`;

  // 달력 생성 함수
  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const days = [];

    // 이전 달의 날짜
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        currentMonth: false,
        month: month - 1,
        year,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, currentMonth: true, month, year });
    }
    for (let i = 1; days.length < 42; i++) {
      days.push({ date: i, currentMonth: false, month: month + 1, year });
    }
    return days;
  };

  // 현재 달의 날짜
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      currentMonth: true,
      month,
      year,
    });
  }

  // 다음 달의 날짜
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
    });
  }

  return days;
}

const days = generateCalendar(currentYear, currentMonth);
const nextMonthDays = generateCalendar(
  currentMonth === 11 ? currentYear + 1 : currentYear,
  (currentMonth + 1) % 12
);

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const handleDateClick = (year, month, date) => {
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
    date
  ).padStart(2, '0')}`;

  if (selectedDates.length === 0) {
    setSelectedDates([dateString]);
  } else if (selectedDates.length === 1) {
    const firstDate = new Date(selectedDates[0]);
    const secondDate = new Date(dateString);
    const start = firstDate < secondDate ? firstDate : secondDate;
    const end = firstDate < secondDate ? secondDate : firstDate;
    const range = [];
    const cur = new Date(start);
    while (cur <= end) {
      range.push(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }
    setSelectedDates(range);
  } else {
    setSelectedDates([dateString]);
  }
};

const handlePrevMonth = () => {
  if (currentMonth === 0) {
    setCurrentMonth(11);
    setCurrentYear(currentYear - 1);
  } else {
    setCurrentMonth(currentMonth - 1);
  }
};

const handleNextMonth = () => {
  if (currentMonth === 11) {
    setCurrentMonth(0);
    setCurrentYear(currentYear + 1);
  } else {
    setCurrentMonth(currentMonth + 1);
  }
};

const formatDateRange = () => {
  if (selectedDates.length === 0) return '';
  const sorted = [...selectedDates].sort();
  const start = new Date(sorted[0]);
  const end = new Date(sorted[sorted.length - 1]);
  const format = (d) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate()
    ).padStart(2, '0')}`;
  return `${format(start)} - ${format(end)} (${sorted.length}일)`;
};

return (
  <div className="space-y-6">
    <Card className="bg-white p-6 shadow-md">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-lg md:h-full">
          <Image
            src={city.image || '/placeholder.svg'}
            alt={city.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-2 flex items-center">
              <span className="mr-2 rounded bg-traveling-purple/20 px-2 py-1 text-xs font-medium text-traveling-purple">
                {city.country}
              </span>
            </div>
            <h1 className="mb-1 text-3xl font-bold text-traveling-text">
              {city.name}
            </h1>
            <h2 className="mb-4 text-sm font-medium text-traveling-text/70">
              {city.nameEn}
            </h2>
            <p className="mb-6 text-traveling-text/80">{city.description}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-traveling-text">
              빠른 예약
            </h3>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button
                className="flex items-center justify-center bg-traveling-purple text-white hover:bg-traveling-purple/90"
                onClick={() => window.open(skyscannerUrl, '_blank')}
              >
                <PlaneIcon className="mr-2 h-4 w-4" />
                항공권 검색
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button
                className="flex items-center justify-center bg-traveling-blue text-white hover:bg-traveling-blue/90"
                onClick={() => window.open(bookingUrl, '_blank')}
              >
                <Building className="mr-2 h-4 w-4" />
                숙소 검색
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">* 외부 사이트로 연결됩니다</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-traveling-text">
          여행 기간이 어떻게 되시나요?
        </h2>
        <p className="mb-4 text-center text-sm text-traveling-text/70">
          * 여행 일자는 최대 10일까지 선택 가능합니다.
        </p>
        <p className="mb-6 text-center text-sm text-traveling-text/70">
          현재 여행 기간:{' '}
          {formatDateRange() ||
            '(여행지 도착 날짜, 여행지 출발 날짜)로 입력해 주세요.'}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 첫 번째 달력 */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="text-traveling-text hover:text-traveling-purple"
              >
                &lt;
              </button>
              <h3 className="text-lg font-bold text-traveling-text">
                {currentYear}년 {months[currentMonth]}
              </h3>
              <button
                onClick={handleNextMonth}
                className="text-traveling-text hover:text-traveling-purple"
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 text-center text-sm font-medium ${
                    index === 0
                      ? 'text-red-500'
                      : index === 6
                      ? 'text-blue-500'
                      : 'text-traveling-text'
                  }`}
                >
                  {day}
                </div>
              ))}

              {days.map((day, index) => {
                const dateString = `${day.year}-${String(
                  day.month + 1
                ).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
                const isSelected = selectedDates.includes(dateString);
                const isToday =
                  new Date().toISOString().split('T')[0] === dateString;

                return (
                  <div
                    key={index}
                    className={`p-2 text-center ${
                      !day.currentMonth
                        ? 'text-gray-300'
                        : index % 7 === 0
                        ? 'text-red-500'
                        : index % 7 === 6
                        ? 'text-blue-500'
                        : 'text-traveling-text'
                    }`}
                  >
                    <button
                      onClick={() =>
                        day.currentMonth &&
                        handleDateClick(day.year, day.month, day.date)
                      }
                      className={`h-8 w-8 rounded-full ${
                        isSelected
                          ? 'bg-traveling-purple text-white'
                          : isToday
                          ? 'border border-traveling-purple'
                          : ''
                      }`}
                      disabled={!day.currentMonth}
                    >
                      {day.date}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 두 번째 달력 */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <button className="invisible">&lt;</button>
              <h3 className="text-lg font-bold text-traveling-text">
                {currentMonth === 11 ? currentYear + 1 : currentYear}년{' '}
                {months[(currentMonth + 1) % 12]}
              </h3>
              <button className="invisible">&gt;</button>
            </div>

            <div className="grid grid-cols-7">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 text-center text-sm font-medium ${
                    index === 0
                      ? 'text-red-500'
                      : index === 6
                      ? 'text-blue-500'
                      : 'text-traveling-text'
                  }`}
                >
                  {day}
                </div>
              ))}

              {nextMonthDays.map((day, index) => {
                const dateString = `${day.year}-${String(
                  day.month + 1
                ).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
                const isSelected = selectedDates.includes(dateString);
                const isToday =
                  new Date().toISOString().split('T')[0] === dateString;

                return (
                  <div
                    key={index}
                    className={`p-2 text-center ${
                      !day.currentMonth
                        ? 'text-gray-300'
                        : index % 7 === 0
                        ? 'text-red-500'
                        : index % 7 === 6
                        ? 'text-blue-500'
                        : 'text-traveling-text'
                    }`}
                  >
                    <button
                      onClick={() =>
                        day.currentMonth &&
                        handleDateClick(day.year, day.month, day.date)
                      }
                      className={`h-8 w-8 rounded-full ${
                        isSelected
                          ? 'bg-traveling-purple text-white'
                          : isToday
                          ? 'border border-traveling-purple'
                          : ''
                      }`}
                      disabled={!day.currentMonth}
                    >
                      {day.date}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={
              selectedDates.length > 0
                ? `/travel-planner/${destination}/step2`
                : '#'
            }
          >
            <Button
              className="bg-traveling-purple text-white hover:bg-traveling-purple/90"
              disabled={selectedDates.length === 0}
            >
              다음 단계로
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  </div>
);
