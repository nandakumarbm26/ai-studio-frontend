"use client";
import AppNavbar from "@/aicomponents/UIComponents/app-navbar";
import ChatUI from "@/aicomponents/PromptAgent/ChatUI";

import EditExperiments from "@/aicomponents/PromptAgent/EditExperiments";
import Experiments from "@/aicomponents/PromptAgent/experiments";
import { useEffect, useState } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default function Home() {
  const [agentContext, setAgentContext] = useState<AgentContext>();
  const [agents, setAgents] = useState<AgentContext[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initChat = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/v1/agents?s=id,agentName,description,updatedDate`
        );
        const data = await res.json();
        console.log(data);
        if (data?.length) {
          setAgents(data);
        } else {
          console.error("No agents found");
        }
      } catch (error) {
        console.error("Failed to load agent context:", error);
      }
      setLoading(false);
    };

    initChat();
  }, []);
  return (
    <main className="w-full h-[92vh]">
      <AppNavbar />
      <div className="flex w-full h-full">
        <Experiments
          setAgentContext={setAgentContext}
          agents={agents}
          className="w-1/6"
        />

        <EditExperiments
          loading={loading}
          agentContext={agentContext}
          className="w-2/6"
        />

        <ChatUI
          loading={loading}
          agentContext={agentContext}
          className="w-3/6"
        />
      </div>
    </main>
  );
}
