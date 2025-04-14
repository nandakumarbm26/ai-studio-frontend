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
import { ChevronRight } from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

function Experiments({ className, agents, setAgentContext }: ExperimentsProps) {
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
              className="flex items-center justify-between p-2 rounded-sm hover:bg-gray-100 group transition-all duration-200"
              key={i}
              onClick={async () => {
                console.log(d.id);
                try {
                  const res = await fetch(
                    `${API_BASE}/api/v1/agents?id=${d.id}`
                  );
                  const data = await res.json();
                  if (data?.length) {
                    const chatContext = data[0];

                    const trainerPrompts: Message[] = JSON.parse(
                      chatContext.trainingPrompts
                    );
                    const agentconfig: AgentContext = {
                      ...chatContext,
                      promptTrainers: trainerPrompts,
                    };

                    setAgentContext(agentconfig);
                    console.log(agentconfig);
                  } else {
                    console.error("No agent found");
                  }
                } catch (error) {
                  console.error("Failed to load agent context:", error);
                }
              }}
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
