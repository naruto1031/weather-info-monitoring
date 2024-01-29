import { useState } from "react";

interface FetchOpenAIType {
  answer: string | undefined;
  isAiLoading: boolean;
  fetchOpenAI: (data: string) => Promise<void>;
}

export const useFetchOpenAI = (): FetchOpenAIType => {
  const [answer, setAnswer] = useState<string>();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchOpenAI = async (data: string) => {
    try {
      setIsAiLoading(true);
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: data }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      setAnswer(json.answer);
      setIsAiLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return { answer, isAiLoading, fetchOpenAI}
}