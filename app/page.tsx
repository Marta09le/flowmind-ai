"use client";

import { useState } from "react";

import Hero from "./components/Hero";
import BrainDump from "./components/planner/BrainDump";
import ResultSection from "./components/planner/ResultSection";
import Doodles from "./components/Doodles";

export default function Home() {
  const [tasks, setTasks] = useState({
    high: [] as string[],
    medium: [] as string[],
    low: [] as string[],
  });

  return (
    <main className="relative min-h-screen bg-[#FAFAF7]">
      <Doodles />

      <Hero />

      <BrainDump setTasks={setTasks} />

      <ResultSection tasks={tasks} />
    </main>
  );
}