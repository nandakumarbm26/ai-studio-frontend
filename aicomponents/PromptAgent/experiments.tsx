import { useAlert } from "@/components/ui/alert";
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
import { apiClient } from "@/lib/api";
import { AGENT_BY_ID, LIST_AGENTS } from "@/lib/queries";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

function Experiments({ className, agents, setAgentContext }: ExperimentsProps) {
  useEffect(() => {
    handleAgentChange(1);
  }, []);
  const { addAlert } = useAlert();
  const handleAgentChange = async (id: number) => {
    try {
      const data = await apiClient(`/api/v1/gql`, "POST", AGENT_BY_ID(id));
      if (data.error || undefined) {
        addAlert({
          type: "destructive", // "default", "warning", "success", etc.
          title: "No agent found",
          description: "",
        });
      } else {
        const chatContext = data.data.agentById;

        const trainerPrompts: Message[] = JSON.parse(
          chatContext.trainingPrompts
        );
        const agentconfig: AgentContext = {
          ...chatContext,
          promptTrainers: trainerPrompts,
        };

        setAgentContext(agentconfig);
      }
    } catch (error) {
      addAlert({
        type: "destructive", // "default", "warning", "success", etc.
        title: "Failed to load agent context:",
        description: "",
      });
    }
  };
  return (
    <Card
      className={
        "w-full rounded-none drop-shadow-none shadow-none justify-between " +
        className
      }
    >
      <CardHeader>
        <CardTitle>Experiments</CardTitle>
        <CardDescription>
          History of Prompt Engineering experiments.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  flex-col gap-2 h-[80vh] overflow-y-scroll hide-scrollbar ">
        {agents.map((d: any, i: number) => {
          return (
            <div
              className="flex items-center justify-between p-2 rounded-sm hover:bg-gray-100 group transition-all duration-200 cursor-pointer"
              key={i}
              onClick={() => handleAgentChange(d.id)}
            >
              <div>
                <div className="font-semibold">{d.agentName}</div>
                <div className="text-xs text-gray-600">{d.description}</div>
              </div>
              <ChevronRight className="transition-transform group-hover:scale-120" />
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="">
        <CardAction>
          <Button>Create New</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

export default Experiments;
