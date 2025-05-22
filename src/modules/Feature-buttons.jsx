// FeatureButtons.jsx
import React from "react";
import Link from "next/link";

const FeatureButtons = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/flight-accommodation"
            className="rounded-full bg-traveling-green px-10 py-4 text-center font-medium text-white transition-transform hover:scale-105"
          >
            항공/숙소
          </Link>
          <Link
            href="/travel-planner"
            className="rounded-full bg-traveling-coral px-10 py-4 text-center font-medium text-white transition-transform hover:scale-105"
          >
            여행 만들기
          </Link>
          <Link
            href="/community"
            className="rounded-full bg-traveling-beige px-10 py-4 text-center font-medium text-traveling-text transition-transform hover:scale-105"
          >
            커뮤니티
          </Link>
          <Link
            href="/mypage"
            className="rounded-full bg-traveling-green px-10 py-4 text-center font-medium text-white transition-transform hover:scale-105"
          >
            마이페이지
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureButtons;
