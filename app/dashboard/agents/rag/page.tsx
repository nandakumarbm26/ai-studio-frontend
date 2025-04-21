"use client";
import AppNavbar from "@/aicomponents/UIComponents/app-navbar";
import ChatUI from "@/aicomponents/PromptAgent/ChatUI";

import EditExperiments from "@/aicomponents/PromptAgent/EditExperiments";
import Experiments from "@/aicomponents/PromptAgent/experiments";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { BlobUploader } from "@/aicomponents/PromptAgent/BlobHandler";

export default function Home() {
  const [agentContext, setAgentContext] = useState<AgentContext>();
  const [agents, setAgents] = useState<AgentContext[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const initChat = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await apiClient(
  //         `/api/v1/agents?s=id,agentName,description,updatedDate`
  //       );
  //       if (data?.length) {
  //         setAgents(data);
  //       } else {
  //         console.error("No agents found");
  //       }
  //     } catch (error) {
  //       console.error("Failed to load agent context:", error);
  //     }
  //     setLoading(false);
  //   };

  //   initChat();
  // }, []);
  return (
    <main className="w-full h-[92vh]">
      <AppNavbar />
      <div className="flex w-full h-full">
        {/* <Experiments
          setAgentContext={setAgentContext}
          agents={agents}
          className="w-1/6"
        /> */}
        <BlobUploader className="w-full" title="" description="" />
        {/* <EditExperiments
          loading={loading}
          agentContext={agentContext}
          className="w-2/6"
        />

        <ChatUI
          loading={loading}
          agentContext={agentContext}
          className="w-3/6"
        /> */}
      </div>
    </main>
  );
}
