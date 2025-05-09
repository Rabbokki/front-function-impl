import React from "react";

/**
 * Slider 컴포넌트 - Radix 없이 React 기본 요소로 구성
 *
 * @param {Array<number>} value - 현재 슬라이더 값 배열 (예: [50])
 * @param {Function} onValueChange - 값이 바뀔 때 호출되는 함수
 * @param {number} min - 최소값 (기본: 0)
 * @param {number} max - 최대값 (기본: 100)
 * @param {number} step - 증분 단위 (기본: 1)
 * @param {string} className - 커스텀 클래스
 */
export function Slider({
  value = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}) {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    onValueChange([newValue]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 rounded-lg bg-gray-300 cursor-pointer ${className}`}
      style={{
        accentColor: "#f97316", // Tailwind orange-500 유사색상
      }}
    />
  );
}
