"use client";
import AppNavbar from "@/aicomponents/UIComponents/app-navbar";
import ChatUI from "@/aicomponents/PromptAgent/ChatUI";

import EditExperiments from "@/aicomponents/PromptAgent/EditExperiments";
import Experiments from "@/aicomponents/PromptAgent/experiments";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { AuthProvider } from "@/aicomponents/UIComponents/AuthUI";
import { LIST_AGENTS } from "@/lib/queries";
import { useAlert } from "@/components/ui/alert";

export default function Home() {
  const [agentContext, setAgentContext] = useState<AgentContext>();
  const [agents, setAgents] = useState<AgentContext[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { addAlert } = useAlert();
  useEffect(() => {
    const initChat = async () => {
      setLoading(true);
      try {
        const data = await apiClient(
          `/api/v1/gql`,
          "POST",
          LIST_AGENTS(0, "", "createdDate")
        );
        if (data.data.listAgentsBeta.items?.length) {
          setAgents(data.data.listAgentsBeta.items);
        } else {
          addAlert({
            type: "destructive", // "default", "warning", "success", etc.
            title: "No agent found",
            description: "",
          });
        }
      } catch {
        addAlert({
          type: "destructive", // "default", "warning", "success", etc.
          title: "Failed to load agent context:",
          description: "",
        });
      }
      setLoading(false);
    };

    initChat();
  }, []);
  return (
    <main className="w-full h-[92vh]">
      <AuthProvider>
        <AppNavbar />
        <div className="flex w-full h-full">
          <Experiments
            setAgentContext={setAgentContext}
            agents={agents}
            className="w-1/6"
          />

          <EditExperiments
            action="edit"
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
      </AuthProvider>
    </main>
  );
}
