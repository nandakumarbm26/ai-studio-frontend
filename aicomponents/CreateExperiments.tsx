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
import React from "react";

function CreateExperiments({ className }: { className: string }) {
  return (
    <Card className={"w-full " + className}>
      <CardHeader>
        <CardTitle>Create AI Agent</CardTitle>
        <CardDescription>
          Configure your AI agent to fine-tune the responses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="instruction">Instruction Context</Label>
            <Textarea
              id="instruction"
              placeholder="You are a helpful assistant. Always provide concise, professional answers."
            />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="prompt">Prompt Context</Label>
            <Textarea id="prompt" placeholder="How do I reset my password?" />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="expect">Expected Output</Label>
            <Textarea id="expect" placeholder="Settings -> Profile ..." />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="outformat">Output Format</Label>
            <Textarea
              id="outformat"
              placeholder={
                "[Introduction]\n[Step-by-step Instructions]\n[Additional Notes]"
              }
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button>Create/Edit</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

export default CreateExperiments;
