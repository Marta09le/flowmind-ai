import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";

type Props = {
  tasks: {
    high: string[];
    medium: string[];
    low: string[];
  };
};

export default function ResultSection({ tasks }: Props) {
  const totalTasks =
    tasks.high.length + tasks.medium.length + tasks.low.length;

  return (
    <section
      id="results"
      className="mx-auto mt-24 w-full max-w-6xl px-6 pb-32"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
          Today's Plan
        </h2>

        <p className="mt-3 text-neutral-500">
          {totalTasks === 0
            ? "Your organized tasks will appear here."
            : `${totalTasks} task${totalTasks > 1 ? "s" : ""} organized by AI`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* High Priority */}
        <Card className="rounded-3xl border-neutral-200 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="mb-5 flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-red-500" />

            <h3 className="text-lg font-semibold text-neutral-900">
              Focus First
            </h3>

          </div>

          {tasks.high.length === 0 ? (
            <div className="py-10 text-center text-neutral-400">
              <p>No high priority tasks.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {tasks.high.map((task, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3"
                >
                  <Circle className="mt-1 h-3 w-3 fill-red-500 text-red-500" />

                  <span className="text-[15px] leading-6 text-neutral-700">
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </Card>

        {/* Medium Priority */}
        <Card className="rounded-3xl border-neutral-200 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="mb-5 flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-amber-500" />

            <h3 className="text-lg font-semibold text-neutral-900">
              Important
            </h3>

          </div>

          {tasks.medium.length === 0 ? (
            <div className="py-10 text-center text-neutral-400">
              <p>No medium priority tasks.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {tasks.medium.map((task, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3"
                >
                  <Circle className="mt-1 h-3 w-3 fill-amber-500 text-amber-500" />

                  <span className="text-[15px] leading-6 text-neutral-700">
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </Card>

        {/* Low Priority */}
        <Card className="rounded-3xl border-neutral-200 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="mb-5 flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-500" />

            <h3 className="text-lg font-semibold text-neutral-900">
              Later
            </h3>

          </div>

          {tasks.low.length === 0 ? (
            <div className="py-10 text-center text-neutral-400">
              <p>No low priority tasks.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {tasks.low.map((task, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3"
                >
                  <Circle className="mt-1 h-3 w-3 fill-green-500 text-green-500" />

                  <span className="text-[15px] leading-6 text-neutral-700">
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </Card>

      </div>
    </section>
  );
}