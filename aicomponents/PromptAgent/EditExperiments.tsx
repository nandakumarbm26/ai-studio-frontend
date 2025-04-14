"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { InfoTooltip } from "../General/InfoToolTip";
import { Input } from "@/components/ui/input";
import EditExperimentsSkeleton from "./LoadingSkeletons/EditExperimentsSkeleton";

function CreatePromptTrainer({
  index = null,
  setEdit,
  userPromptTrainers,
  setUserPromptTrainers,
}: PromptTrainerProps & {
  userPromptTrainers: PromptTrainer[];
  setUserPromptTrainers: Dispatch<SetStateAction<PromptTrainer[]>>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt")?.toString().trim() || "";
    const target = formData.get("target")?.toString().trim() || "";

    if (!prompt || !target) {
      alert("Prompt and Target cannot be empty");
      return;
    }

    if (index !== null && index !== undefined) {
      const upt = structuredClone(userPromptTrainers);
      upt[index] = {
        userPrompt: prompt,
        expectedResponse: target,
      };
      setUserPromptTrainers(upt);
      setEdit?.(false);
    } else {
      setUserPromptTrainers((prev) => [
        ...prev,
        { expectedResponse: target, userPrompt: prompt },
      ]);
    }

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="flex flex-col items-start space-y-1 mb-4">
        <Label className="text-xs text-gray-600" htmlFor="prompt">
          User Prompt
        </Label>
        <Textarea
          id="prompt"
          name="prompt"
          required
          defaultValue={
            index !== null && index !== undefined
              ? userPromptTrainers[index].userPrompt
              : ""
          }
          placeholder="How do I reset my password?"
        />
      </div>

      <div className="flex flex-col items-start space-y-1 mb-4">
        <Label className="text-xs text-gray-600" htmlFor="target">
          Target Output
        </Label>
        <Textarea
          id="target"
          name="target"
          required
          defaultValue={
            index !== null && index !== undefined
              ? userPromptTrainers[index].expectedResponse
              : ""
          }
          placeholder="Settings → Profile → Reset Password"
        />
      </div>
      <Button variant="outline" type="submit">
        {index !== null ? "Update" : "Add"}
      </Button>
    </form>
  );
}

function EditExperiments({
  className,
  agentContext,
  loading = false,
}: {
  className: string;
  agentContext: AgentContext | undefined;
  loading: boolean;
}) {
  const [userPromptTrainers, setUserPromptTrainers] = useState<PromptTrainer[]>(
    []
  );
  loading;
  const [agentConfiguration, setAgentConfiguration] =
    useState<AgentConfiguration>({
      behavior: "",
      template: "",
      agentName: "",
      description: "",
    });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function updateAgentConfiguration(key: string, val: string) {
    setAgentConfiguration((prev) => ({
      ...prev,
      [key]: val,
    }));
  }
  useEffect(() => {
    setAgentConfiguration({
      behavior: agentContext?.system || "",
      template: agentContext?.responseTemplate || "",
      agentName: agentContext?.agentName || "",
      description: agentContext?.description || "",
    });
    setUserPromptTrainers(agentContext?.promptTrainers || []);
  }, [agentContext]);

  return (
    <Card
      className={
        "w-full rounded-none drop-shadow-none hide-scrollbar shadow-none overflow-y-scroll justify-between " +
        className
      }
    >
      {loading ? (
        <EditExperimentsSkeleton />
      ) : (
        <>
          <CardHeader>
            <CardTitle>{agentContext?.agentName}</CardTitle>
            <CardDescription>
              {agentContext?.description}
              <br />
              Configure your AI agent to fine-tune the responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[70vh] overflow-y-scroll hide-scrollbar">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="behavior">
                  Agent Name{" "}
                  <InfoTooltip
                    info={
                      'Describe how the AI should respond to users.\nExample: "You are a helpful support agent. Always be concise, polite, and solution-oriented."'
                    }
                  />
                </Label>
                <Input
                  onChange={(e) => {
                    updateAgentConfiguration(
                      e.currentTarget.name,
                      e.target.value
                    );
                  }}
                  id="agent-name"
                  name="agentName"
                  placeholder="CodeWiz.."
                  value={agentConfiguration.agentName}
                />
                <Label htmlFor="behavior">
                  Description{" "}
                  <InfoTooltip
                    info={
                      'Describe how the AI should respond to users.\nExample: "You are a helpful support agent. Always be concise, polite, and solution-oriented."'
                    }
                  />
                </Label>
                <Textarea
                  onChange={(e) => {
                    updateAgentConfiguration(
                      e.currentTarget.name,
                      e.target.value
                    );
                    console.log(agentConfiguration);
                  }}
                  id="agent-description"
                  name="description"
                  placeholder="CodeWiz.."
                  value={agentConfiguration.description}
                />
              </div>
              <Separator orientation="horizontal" />
              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="behavior">
                  Agent Behavior Instructions{" "}
                  <InfoTooltip
                    info={
                      'Describe how the AI should respond to users.\nExample: "You are a helpful support agent. Always be concise, polite, and solution-oriented."'
                    }
                  />
                </Label>
                <Textarea
                  onChange={(e) => {
                    updateAgentConfiguration(
                      e.currentTarget.name,
                      e.target.value
                    );
                  }}
                  id="behavior"
                  name="behavior"
                  value={agentConfiguration.behavior}
                  placeholder="You are a helpful assistant. Always provide concise, professional answers."
                />
              </div>
              <Separator orientation="horizontal" />
              <div>
                <div className="">
                  Train Agent{" "}
                  <InfoTooltip
                    info={
                      "Add examples to fine-tune your AI agent's responses.\nProvide a user question and the ideal AI answer to guide behavior."
                    }
                  />
                </div>
                {userPromptTrainers.map((d, i) => (
                  <div className="w-full" key={i}>
                    {editIndex === i ? (
                      <CreatePromptTrainer
                        index={i}
                        setEdit={() => setEditIndex(null)}
                        userPromptTrainers={userPromptTrainers}
                        setUserPromptTrainers={setUserPromptTrainers}
                      />
                    ) : (
                      <div className="w-full flex flex-col gap-2 border-1 p-2 my-2 relative bg-gray-100 rounded-sm">
                        <div className="flex flex-col items-start">
                          <div className="text-xs text-gray-600">
                            User Prompt
                          </div>
                          <div className="text-base text-gray-600">
                            {d.expectedResponse}
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-xs text-gray-600">
                            Target Output
                          </div>
                          <div className="text-base">{d.userPrompt}</div>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setEditIndex(i)}
                          className="absolute right-0"
                        >
                          <Edit />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {editIndex === null && (
                  <CreatePromptTrainer
                    userPromptTrainers={userPromptTrainers}
                    setUserPromptTrainers={setUserPromptTrainers}
                  />
                )}
              </div>
              <Separator orientation="horizontal" />

              <div className="flex flex-col items-start space-y-2">
                <Label htmlFor="template">
                  Response Template{" "}
                  <InfoTooltip
                    info={
                      "Use placeholders like [Introduction], [Steps], [Notes] to guide the format.\nExample: [Greeting]\n[Answer]\n[Contact Info if needed]"
                    }
                  />
                </Label>
                <Textarea
                  onChange={(e) => {
                    updateAgentConfiguration(
                      e.currentTarget.name,
                      e.target.value
                    );
                  }}
                  name="template"
                  id="template"
                  value={agentConfiguration.template}
                  placeholder="[Introduction]\n[Step-by-step Instructions]\n[Additional Notes]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardAction>
              <Button
                onClick={() => {
                  const reqHeaders = new Headers();
                  reqHeaders.append("Content-Type", "application/json");

                  const body = JSON.stringify({
                    agentName: agentConfiguration.agentName,
                    description: agentConfiguration.description,
                    system: agentConfiguration.behavior,
                    responseTemplate: agentConfiguration.template,
                    trainingPrompts: userPromptTrainers,
                  });

                  fetch("http://127.0.0.1:8000/api/v1/agents", {
                    method: "POST",
                    headers: reqHeaders,
                    body,
                    redirect: "follow",
                  })
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                }}
              >
                Edit
              </Button>
            </CardAction>
            <div className="text-xs text-right">
              Last Updated <br />
              Fri Apr 04 2025
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default EditExperiments;
