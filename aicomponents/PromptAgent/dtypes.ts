// import { Dispatch, SetStateAction } from "react";

type PromptTrainer = {
  expectedResponse: string;
  userPrompt: string;
};

type AgentConfiguration = {
  behavior: string;
  template: string;
  agentName: string;
  description: string;
  id?: number | null;
};
type PromptTrainerProps = {
  index?: number | null;
  // @ts-ignore
  setEdit?: Dispatch<SetStateAction<boolean>>;
};

interface AgentContext {
  promptTrainers: PromptTrainer[];
  id: number;
  system: string;
  responseTemplate: string;
  agentName: string;
  description: string;
}

type Content = {
  type: "TEXT" | "IMAGE_URL";
  text?: string;
  imageUrl?: string;
};
type Message = {
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string | { text?: Content; image?: Content };
};

type ExperimentsProps = {
  className: string;
  agents: AgentContext[];
  // @ts-ignore
  setAgentContext: Dispatch<SetStateAction<AgentContext>>;
};
