"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Brain, Sparkles, Loader2, X, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Web Speech API не має офіційних TS-типів, тому описуємо мінімально необхідне самі.
// Це надійніше за `any` в купі місць і не ламається при апдейті lib.dom.
interface SpeechRecognitionResultEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      length: number;
      [index: number]: { transcript: string };
    };
  };
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

type Props = {
  setTasks: React.Dispatch<
    React.SetStateAction<{
      high: string[];
      medium: string[];
      low: string[];
    }>
  >;
};

export default function BrainDump({ setTasks }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const baseTextRef = useRef(""); // текст, що вже був до початку поточної фрази

  useEffect(() => {
    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "uk-UA";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (final) {
        baseTextRef.current = (baseTextRef.current + " " + final).trim();
      }

      setText((baseTextRef.current + " " + interim).trim());
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      baseTextRef.current = text;
      recognition.start();
      setIsListening(true);
    }
  };

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze.");
      }

      const data = await response.json();

      setTasks(data);

      document.getElementById("results")?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-12 w-full max-w-3xl px-6">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-neutral-100 p-2">
            <Brain className="h-5 w-5 text-neutral-700" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Brain Dump
            </h2>

            <p className="text-sm text-neutral-500">
              Write everything that's on your mind.
            </p>
          </div>
        </div>

        <div className="relative">
          <Textarea
            value={text}
            maxLength={5000}
            onChange={(e) => setText(e.target.value)}
            placeholder="Finish my diploma, prepare for interview, buy groceries..."
            className="min-h-[220px] resize-none rounded-2xl border-neutral-200 bg-neutral-50 text-base shadow-none focus-visible:ring-2 focus-visible:ring-black"
          />

          {speechSupported && (
            <motion.button
              type="button"
              onClick={toggleListening}
              whileTap={{ scale: 0.92 }}
              animate={
                isListening
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={
                isListening
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {isListening ? (
                <Mic className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </motion.button>
          )}

          <AnimatePresence>
            {isListening && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 right-16 flex items-center gap-1.5 text-xs font-medium text-red-500"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                Слухаю...
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
          <span>Write freely. AI will organize everything.</span>

          <span>{text.length} / 5000</span>
        </div>

        <div className="mt-6 flex gap-3">

          <Button
            onClick={analyzeText}
            disabled={loading}
            className="h-14 flex-1 rounded-2xl bg-black text-base font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Organizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Organize My Day
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setText("");
              baseTextRef.current = "";
            }}
            disabled={loading}
            className="h-14 w-14 rounded-2xl"
          >
            <X className="h-5 w-5" />
          </Button>

        </div>
      </div>
    </section>
  );
}