"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizonalIcon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { AxiosHeaders } from "axios";

function ChatUISkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Assistant Message */}
      <div className="self-start bg-gray-100 p-3 rounded-xl max-w-[80%]">
        <Skeleton className="h-4 w-[220px] mb-2" />
        <Skeleton className="h-4 w-[180px]" />
      </div>

      {/* User Message */}
      <div className="self-end bg-blue-100 p-3 rounded-xl max-w-[80%]">
        <Skeleton className="h-4 w-[200px]" />
      </div>

      {/* Assistant Message */}
      <div className="self-start bg-gray-100 p-3 rounded-xl max-w-[80%]">
        <Skeleton className="h-4 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px] mt-2" />
      </div>
    </div>
  );
}

function ChatUI({
  className,
  agentContext,
  loading,
}: {
  className: string;
  agentContext: AgentContext | undefined;
  loading: boolean;
}) {
  const [chat, setChat] = useState<Message[]>([
    { role: "assistant", content: "Hello, How can I help you Today" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const el = document.getElementById("chat-container");
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt-exp-input") as string;

    if (!prompt?.trim()) return;

    const newChat: Message[] = [...chat, { role: "user", content: prompt }];

    e.currentTarget.reset(); // Clear input
    try {
      const reqHeaders = new AxiosHeaders();
      reqHeaders.set("Content-Type", "application/json");
      const data = await apiClient(
        "/api/v1/chat/",
        "POST",

        {
          messages: [...newChat],
          filters: { id: agentContext?.id },
        },
        "json",
        reqHeaders
      );

      setChat([...newChat, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error("Chat request failed:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <Card
      className={`w-full max-w-6xl h-full mx-auto flex flex-col justify-between rounded-none shadow-none ${className}`}
    >
      {loading ? (
        <ChatUISkeleton />
      ) : (
        <>
          <CardHeader>
            <CardTitle>{agentContext?.agentName}</CardTitle>
            <CardDescription>
              {agentContext?.description}
              <br />
              Experiment with your AI agent and test its responses.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 w-full overflow-y-auto">
            <div className="flex flex-col gap-2">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`border-2 rounded-xl px-4 py-1 max-w-[80%] break-words ${
                    msg.role === "user"
                      ? "self-end bg-blue-100"
                      : "self-start bg-gray-200"
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="w-full">
            <form className="w-full flex" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Type your prompt..."
                className="w-full rounded-r-none"
                id="prompt-exp-input"
                name="prompt-exp-input"
                autoComplete="off"
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="rounded-l-none"
              >
                <SendHorizonalIcon />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default ChatUI;
