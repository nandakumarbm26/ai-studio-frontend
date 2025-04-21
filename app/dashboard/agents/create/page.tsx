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

  return (
    <main className="w-full h-[92vh]">
      <AppNavbar />
      <div className="flex w-full h-full">
        <EditExperiments
          className=""
          agentContext={undefined}
          loading={false}
          action="create"
        />
      </div>
    </main>
  );
}
