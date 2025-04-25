"use client";
import AppNavbar from "@/aicomponents/UIComponents/app-navbar";
import EditExperiments from "@/aicomponents/PromptAgent/EditExperiments";
import { useEffect } from "react";
import { apiClient } from "@/lib/api";
import { AxiosHeaders } from "axios";
import { LIST_AGENTS } from "@/lib/queries";
import { AuthProvider } from "@/aicomponents/UIComponents/AuthUI";

export default function Home() {
  return (
    <main className="w-full h-[92vh]">
      <AuthProvider>
        <AppNavbar />
        <div
          onClick={() => {
            const reqHeaders = new AxiosHeaders();
            reqHeaders.set("Content-Type", "application/json");
            reqHeaders.set(
              "Authorization",
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvaGZvZUBleGFtcGxlLmNvbSIsImV4cCI6MTc0NTUxOTg2M30.drPVf50OwlHqlyX5O6txau3Yeitcuys96K8jiHfskvc"
            );
            apiClient(
              "/api/v1/gql",
              "POST",

              {
                query: LIST_AGENTS(0, "SQL"),
              },
              "json",
              reqHeaders
            )
              .then((res) => console.log(res))

              .catch((err) => console.log(err));
          }}
        >
          Button
        </div>
        <div className="flex w-full h-full">
          <EditExperiments
            className=""
            agentContext={undefined}
            loading={false}
            action="create"
          />
        </div>
      </AuthProvider>
    </main>
  );
}
