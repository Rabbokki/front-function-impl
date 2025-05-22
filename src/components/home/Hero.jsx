export function Hero() {
  return (
    <section className="relative w-full py-8 sky-bg">
      <div className="mt-8 text-center px-4">
        <h1 className="mb-2 text-5xl font-bold text-[#1e3a8a] tracking-tight">
          세상 모든 여행을 한눈에
        </h1>
        <p className="text-2xl text-[#ff6b81] font-semibold">
          트래블링과 함께 떠나보세요!
        </p>
      </div>

      {/* Responsive crop container */}
      <div
        className="relative w-full overflow-hidden border-traveling-pink"
        style={{ aspectRatio: '1 / 1' }}
      >
        <img
          src="/world.png"
          alt="Hero Banner"
          className="w-full h-auto object-cover animate-spin-slow"
        />

        <img
          src="/plane.png"
          alt="Flying Plane"
          className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-[99%] animate-fly"
          style={{ width: '12%' }}
        />
      </div>
    </section>
  );
}
