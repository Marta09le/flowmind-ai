export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24">
      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#d7d7d7_1px,transparent_1px),linear-gradient(to_bottom,#d7d7d7_1px,transparent_1px)]
          bg-[size:40px_40px]
          opacity-70
        "
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">

        <span className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
          AI Daily Planner
        </span>

        <h1 className="mt-8 text-center text-6xl font-black tracking-tight text-neutral-900 md:text-7xl">
          FlowMind AI
        </h1>

        <h2 className="mt-6 text-center text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl">
          Empty your mind.
          <br />
          We'll organize it.
        </h2>

        <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-neutral-600">
          Dump your thoughts, tasks and ideas into one place.
          <br />
          FlowMind AI transforms them into a structured action plan in seconds.
        </p>

      </div>
    </section>
  );
}