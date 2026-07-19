const doodles = [
  { src: "/doodles/doodle-spiral.svg", className: "top-8 left-[3%] w-14 rotate-[8deg]" },
  { src: "/doodles/doodle-wavy-line.svg", className: "top-6 right-[4%] w-20 -rotate-6" },
  { src: "/doodles/doodle-squiggle-underline.svg", className: "top-[520px] left-[2%] w-24 rotate-2" },
  { src: "/doodles/doodle-scribble-circle.svg", className: "top-[300px] right-[3%] w-16 rotate-[-4deg]" },
  { src: "/doodles/doodle-curvy-arrow.svg", className: "bottom-40 left-[3%] w-20 rotate-12" },
  { src: "/doodles/doodle-zigzag.svg", className: "bottom-20 right-[4%] w-24 -rotate-3" },
  { src: "/doodles/doodle-heart.svg", className: "top-[600px] right-[6%] w-12 -rotate-6" },
  { src: "/doodles/doodle-dots.svg", className: "bottom-60 right-[10%] w-16 -rotate-3" },
];

export default function Doodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70">
      {doodles.map((d) => (
        <img
          key={d.src}
          src={d.src}
          alt=""
          className={`absolute ${d.className}`}
        />
      ))}
    </div>
  );
}