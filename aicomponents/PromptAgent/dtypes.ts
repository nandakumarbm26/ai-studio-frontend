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
type Message = { role: "user" | "assistant"; content: string };

type ExperimentsProps = {
  className: string;
  agents: AgentContext[];
  // @ts-ignore
  setAgentContext: Dispatch<SetStateAction<AgentContext>>;
};
