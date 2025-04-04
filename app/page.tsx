import AppNavbar from "@/aicomponents/app-navbar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-[92vh]">
      <AppNavbar />
      <div className="flex w-full h-full">
        <Card className="w-1/6 rounded-none drop-shadow-none shadow-none justify-between">
          <CardHeader>
            <CardTitle>Experiments</CardTitle>
            <CardDescription>
              History of Prompt Engineering experiments.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 h-full">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Support AI</div>
                <div className="text-xs">{Date().split("", 15)}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <CardAction>
              <Button>Create New</Button>
            </CardAction>
          </CardFooter>
        </Card>

        {/* <Card className="w-1/2">
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
                <Textarea
                  id="prompt"
                  placeholder="How do I reset my password?"
                />
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
        </Card> */}
        <Card className="w-5/6 rounded-none drop-shadow-none shadow-none justify-between">
          <CardHeader>
            <CardTitle>Support AI</CardTitle>
            <CardDescription>
              Configure your AI agent to fine-tune the responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
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
                <Textarea
                  id="prompt"
                  placeholder="How do I reset my password?"
                />
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
          <CardFooter className="flex justify-between">
            <CardAction>
              <Button>Create/Edit</Button>
            </CardAction>
            <div className="text-xs text-right">
              Last Updated <br />
              Fri Apr 04 2025
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
