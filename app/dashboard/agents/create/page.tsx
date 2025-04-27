"use client";
import AppNavbar from "@/aicomponents/UIComponents/app-navbar";
// import EditExperiments from "@/aicomponents/PromptAgent/EditExperiments";
// import { useEffect } from "react";
// import { apiClient, getCookie } from "@/lib/api";
// import { AxiosHeaders } from "axios";
// import { LIST_AGENTS, REFRESH_TOKEN } from "@/lib/queries";
import { AuthProvider } from "@/aicomponents/UIComponents/AuthUI";

export default function Home() {
  return (
    <main className="w-full h-[92vh]">
      <AuthProvider>
        <AppNavbar />

        {/* <div className="flex w-full h-full">
          <EditExperiments
            className=""
            agentContext={undefined}
            loading={false}
            action="create"
          />
        </div> */}
      </AuthProvider>
    </main>
  );
}
