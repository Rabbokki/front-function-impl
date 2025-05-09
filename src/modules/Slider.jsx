import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/Utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-traveling-light-blue">
      <SliderPrimitive.Range className="absolute h-full bg-traveling-mint" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-traveling-mint bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traveling-text focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

Slider.displayName = "Slider";

export { Slider };
// =======

// /**
//  * Slider 컴포넌트 - Radix 없이 React 기본 요소로 구성
//  *
//  * @param {Array<number>} value - 현재 슬라이더 값 배열 (예: [50])
//  * @param {Function} onValueChange - 값이 바뀔 때 호출되는 함수
//  * @param {number} min - 최소값 (기본: 0)
//  * @param {number} max - 최대값 (기본: 100)
//  * @param {number} step - 증분 단위 (기본: 1)
//  * @param {string} className - 커스텀 클래스
//  */
// export function Slider({
//   value = [50],
//   onValueChange,
//   min = 0,
//   max = 100,
//   step = 1,
//   className = "",
// }) {
//   const handleChange = (e) => {
//     const newValue = Number(e.target.value);
//     onValueChange([newValue]);
//   };

//   return (
//     <input
//       type="range"
//       min={min}
//       max={max}
//       step={step}
//       value={value[0]}
//       onChange={handleChange}
//       className={`w-full h-2 rounded-lg bg-gray-300 cursor-pointer ${className}`}
//       style={{
//         accentColor: "#f97316", // Tailwind orange-500 유사색상
//       }}
//     />
//   );
// }
