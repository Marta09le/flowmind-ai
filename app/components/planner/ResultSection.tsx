"use client";

import { Card } from "@/components/ui/card";
import { Circle, CheckCircle2, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  tasks: {
    high: string[];
    medium: string[];
    low: string[];
  };
  doneIds: Set<string>;
  onToggleTask: (id: string) => void;
};

function TaskColumn({
  title,
  colorClass,
  dotClass,
  tasks,
  groupKey,
  doneIds,
  onToggle,
  emptyLabel,
}: {
  title: string;
  colorClass: string;
  dotClass: string;
  tasks: string[];
  groupKey: string;
  doneIds: Set<string>;
  onToggle: (id: string) => void;
  emptyLabel: string;
}) {
  return (
    <Card className="rounded-3xl border-neutral-200 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${dotClass}`} />
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      </div>

      {tasks.length === 0 ? (
        <div className="py-10 text-center text-neutral-400">
          <p>{emptyLabel}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task, index) => {
            const id = `${groupKey}-${index}`;
            const isDone = doneIds.has(id);

            return (
              <motion.li
                key={id}
                layout
                className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3"
              >
                <button
                  type="button"
                  onClick={() => onToggle(id)}
                  className="mt-0.5 flex-shrink-0"
                  aria-label={isDone ? "Mark as not done" : "Mark as done"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDone ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${colorClass}`} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="not-done"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Circle
                          className={`h-4 w-4 ${dotClass.replace("bg-", "fill-")} ${colorClass}`}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <span
                  className={`text-[15px] leading-6 transition-all duration-200 ${
                    isDone
                      ? "text-neutral-400 line-through"
                      : "text-neutral-700"
                  }`}
                >
                  {task}
                </span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

// Легкий "конфеті" ефект — розлітаються емодзі при завершенні плану
function CelebrationBurst() {
  const particles = ["🎉", "✨", "🎊", "⭐", "🎈"];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {particles.map((emoji, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const distance = 60;

        return (
          <motion.span
            key={index}
            className="absolute text-2xl"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance - 20,
              opacity: [0, 1, 1, 0],
              scale: 1,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function ResultSection({ tasks, doneIds, onToggleTask }: Props) {
  const totalTasks =
    tasks.high.length + tasks.medium.length + tasks.low.length;
  const doneCount = doneIds.size;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((doneCount / totalTasks) * 100);
  const isAllDone = totalTasks > 0 && doneCount === totalTasks;

  return (
    <section
      id="results"
      className="mx-auto mt-24 w-full max-w-6xl px-6 pb-32"
    >
      <div className="relative mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
          Today's Plan
        </h2>

        <AnimatePresence mode="wait">
          {isAllDone ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative mt-3 flex items-center justify-center gap-2"
            >
              <CelebrationBurst />

              <PartyPopper className="h-5 w-5 text-amber-500" />

              <p className="text-lg font-semibold text-neutral-900">
                Все зроблено! Гарного вечора 🎉
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="progress"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-neutral-500"
            >
              {totalTasks === 0
                ? "Your organized tasks will appear here."
                : `${doneCount} з ${totalTasks} виконано`}
            </motion.p>
          )}
        </AnimatePresence>

        {totalTasks > 0 && (
          <div className="mx-auto mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200">
            <motion.div
              className={`h-full rounded-full ${isAllDone ? "bg-amber-500" : "bg-black"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TaskColumn
          title="Focus First"
          colorClass="text-red-500"
          dotClass="bg-red-500"
          tasks={tasks.high}
          groupKey="high"
          doneIds={doneIds}
          onToggle={onToggleTask}
          emptyLabel="No high priority tasks."
        />

        <TaskColumn
          title="Important"
          colorClass="text-amber-500"
          dotClass="bg-amber-500"
          tasks={tasks.medium}
          groupKey="medium"
          doneIds={doneIds}
          onToggle={onToggleTask}
          emptyLabel="No medium priority tasks."
        />

        <TaskColumn
          title="Later"
          colorClass="text-green-500"
          dotClass="bg-green-500"
          tasks={tasks.low}
          groupKey="low"
          doneIds={doneIds}
          onToggle={onToggleTask}
          emptyLabel="No low priority tasks."
        />
      </div>
    </section>
  );
}