"use client";
import AppNavbar from "@/aicomponents/app-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, SendHorizonalIcon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [chat, setChat] = useState([
    { role: "assistant", content: "Hello, How can I help you" },
  ]);
  return (
    <main className="w-full h-[92vh]">
      <AppNavbar />
      <div className="flex w-full h-full">
        <Card className="w-1/6 rounded-none drop-shadow-none shadow-none justify-between">
          <CardHeader>
            <CardTitle>Experiments</CardTitle>
            <CardDescription>
              History of Prompt Engineering experiments.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 h-full">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <CardAction>
              <Button>Create New</Button>
            </CardAction>
          </CardFooter>
        </Card>

        {/* <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Create AI Agent</CardTitle>
            <CardDescription>
              Configure your AI agent to fine-tune the responses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="instruction">Instruction Context</Label>
                <Textarea
                  id="instruction"
                  placeholder="You are a helpful assistant. Always provide concise, professional answers."
                />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="prompt">Prompt Context</Label>
                <Textarea
                  id="prompt"
                  placeholder="How do I reset my password?"
                />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="expect">Expected Output</Label>
                <Textarea id="expect" placeholder="Settings -> Profile ..." />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="outformat">Output Format</Label>
                <Textarea
                  id="outformat"
                  placeholder={
                    "[Introduction]\n[Step-by-step Instructions]\n[Additional Notes]"
                  }
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button>Create/Edit</Button>
            </CardAction>
          </CardFooter>
        </Card> */}
        <Card className="w-2/6 rounded-none drop-shadow-none shadow-none justify-between">
          <CardHeader>
            <CardTitle>Support AI</CardTitle>
            <CardDescription>
              Configure your AI agent to fine-tune the responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="instruction">Instruction Context</Label>
                <Textarea
                  id="instruction"
                  placeholder="You are a helpful assistant. Always provide concise, professional answers."
                />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="prompt">Prompt Context</Label>
                <Textarea
                  id="prompt"
                  placeholder="How do I reset my password?"
                />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="expect">Expected Output</Label>
                <Textarea id="expect" placeholder="Settings -> Profile ..." />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="outformat">Output Format</Label>
                <Textarea
                  id="outformat"
                  placeholder={
                    "[Introduction]\n[Step-by-step Instructions]\n[Additional Notes]"
                  }
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardAction>
              <Button>Create/Edit</Button>
            </CardAction>
            <div className="text-xs text-right">
              Last Updated <br />
              Fri Apr 04 2025
            </div>
          </CardFooter>
        </Card>
        <Card className="w-3/6 max-w-4xl h-full mx-auto rounded-none drop-shadow-none shadow-none flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Support AI</CardTitle>
            <CardDescription>
              Experiment your AI agent to test the responses.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 w-full overflow-y-auto">
            <div className="flex flex-col gap-2">
              {chat.map((c, i) => {
                if (["assistant", "user"].includes(c.role)) {
                  return (
                    <div
                      className={`border-2 rounded-xl px-4 py-1 max-w-[80%] break-words ${
                        c.role === "user"
                          ? "self-end bg-blue-100"
                          : "self-start bg-gray-200"
                      }`}
                      key={i}
                    >
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {c.content}
                      </Markdown>
                    </div>
                  );
                }
              })}
            </div>
          </CardContent>

          <CardFooter className="flex w-full">
            <form
              className="w-full flex"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const prompt = formData.get("prompt-exp-input");
                const localchat = [...chat];

                if (typeof prompt === "string" && prompt.trim() !== "") {
                  const userPrompt = { role: "user", content: prompt };
                  localchat.push(userPrompt);
                  fetch("http://localhost:8000/api/v1/chat/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      messages: localchat,
                    }),
                  })
                    .then(async (d) => {
                      const data = await d.json();
                      localchat.push({
                        role: "assistant",
                        content: data.response,
                      });
                      setChat([...localchat]);
                    })
                    .catch((e) => console.log(e));
                  e.currentTarget.reset(); // Clear the input field
                }
              }}
            >
              <Input
                type="text"
                placeholder="prompt..."
                className="w-full rounded-r-none"
                id="prompt-exp-input"
                name="prompt-exp-input"
              />
              <Button type="submit" className="rounded-l-none">
                <SendHorizonalIcon />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
