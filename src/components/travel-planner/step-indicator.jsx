import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StepIndicator({ currentStep, destination }) {
  const steps = [
    {
      number: 1,
      title: '날짜 확인',
      path: `/travel-planner/${destination}/step1`,
    },
    {
      number: 2,
      title: '장소 선택',
      path: `/travel-planner/${destination}/step2`,
    },
    {
      number: 3,
      title: '숙소 선택',
      path: `/travel-planner/${destination}/step3`,
    },
    {
      number: 4,
      title: '이동수단 선택',
      path: `/travel-planner/${destination}/step4`,
    },
    {
      number: 5,
      title: '일정 생성',
      path: `/travel-planner/${destination}/step5`,
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-1 flex-col items-center">
            <Link
              href={currentStep >= step.number ? step.path : '#'}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full text-white',
                currentStep > step.number
                  ? 'bg-traveling-green cursor-pointer'
                  : currentStep === step.number
                  ? 'bg-traveling-purple cursor-default'
                  : 'bg-gray-300 cursor-not-allowed'
              )}
            >
              {step.number}
            </Link>
            <span
              className={cn(
                'mt-2 text-center text-sm',
                currentStep === step.number
                  ? 'font-bold text-traveling-purple'
                  : 'text-gray-500'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-5">
        <div className="absolute left-0 top-0 h-1 w-full bg-gray-200"></div>
        <div
          className="absolute left-0 top-0 h-1 bg-traveling-purple transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
