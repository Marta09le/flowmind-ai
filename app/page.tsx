"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import BrainDump from "./components/planner/BrainDump";
import ResultSection from "./components/planner/ResultSection";
import Doodles from "./components/Doodles";

type Tasks = {
  high: string[];
  medium: string[];
  low: string[];
};

const TASKS_STORAGE_KEY = "flowmind-tasks";
const DONE_STORAGE_KEY = "flowmind-done-ids";

export default function Home() {
  const [tasks, setTasksState] = useState<Tasks>({
    high: [],
    medium: [],
    low: [],
  });
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      const savedDone = localStorage.getItem(DONE_STORAGE_KEY);

      if (savedTasks) {
        setTasksState(JSON.parse(savedTasks));
      }
      if (savedDone) {
        setDoneIds(new Set(JSON.parse(savedDone)));
      }
    } catch (error) {
      console.error("Failed to load saved plan:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        DONE_STORAGE_KEY,
        JSON.stringify(Array.from(doneIds))
      );
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }, [doneIds, hydrated]);

  const handleNewTasks = (newTasks: Tasks) => {
    setTasksState(newTasks);
    setDoneIds(new Set());
  };

  const toggleTask = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="relative min-h-screen bg-[#FAFAF7]">
      <Doodles />

      <Hero />

      <BrainDump setTasks={handleNewTasks} />

      <ResultSection
        tasks={tasks}
        doneIds={doneIds}
        onToggleTask={toggleTask}
      />
    </main>
  );
}