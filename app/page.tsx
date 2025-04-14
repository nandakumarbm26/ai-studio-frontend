import Footer from "@/aicomponents/UIComponents/app-footer";
import { Navbar } from "@/aicomponents/UIComponents/app-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground ">
      <Navbar />
      <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-[15%] md:py-24">
        <section className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl flex items-end">
                A
                <motion.div
                  animate={{
                    y: [0, -5, 0], // vertical float up and down
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    className="w-full h-10 object-contain object-center inline"
                    src="/assets/logo/astraphLogo.png"
                    alt="Astraph.AI"
                    width={400}
                    height={100}
                  />
                </motion.div>
                traph.AI
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl">
              Lightning-fast intelligence. Build, train, and deploy AI models
              with blazing speed and clarity.
            </p>
            <div className="mt-6">
              <Button size="lg">Get Started</Button>
            </div>
          </motion.div>
        </section>

        <Separator className="my-16" />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6"
        >
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                Model Training Engine
              </h2>
              <p className="text-sm text-muted-foreground">
                Train state-of-the-art models using a simplified, scalable, and
                optimized training pipeline.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                RAG & Prompt Orchestration
              </h2>
              <p className="text-sm text-muted-foreground">
                Integrate Retrieval-Augmented Generation and manage prompts
                seamlessly with our orchestration layer.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                API & Deployment Tools
              </h2>
              <p className="text-sm text-muted-foreground">
                Serve models via fast APIs, auto-scale on demand, and integrate
                easily into your ecosystem.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <Separator className="my-16" />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Why Astraph.AI?</h2>
          <p className="text-muted-foreground mb-6">
            We combine lightning-speed compute, elegant interfaces, and
            full-stack flexibility to empower your AI journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline">Low-latency Inference</Badge>
            <Badge variant="outline">Custom Training Pipelines</Badge>
            <Badge variant="outline">RAG-enabled Apps</Badge>
            <Badge variant="outline">No-code & Pro-code UI</Badge>
            <Badge variant="outline">Team Collaboration Tools</Badge>
          </div>
        </motion.section>

        <section className="max-w-6xl mx-auto py-16" id="usecases">
          <h2 className="text-2xl font-bold text-center mb-6">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Enterprise Chatbots
                </h3>
                <p className="text-muted-foreground text-sm">
                  Build LLM-driven bots with custom data pipelines and knowledge
                  integration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Generative Q&A</h3>
                <p className="text-muted-foreground text-sm">
                  Train and deploy scalable GenAI Q&A models with RAG and prompt
                  templates.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Data Intelligence Agents
                </h3>
                <p className="text-muted-foreground text-sm">
                  Build agents to parse, summarize, and reason over
                  structured/unstructured data.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="bg-muted py-16">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
            <p className="text-muted-foreground mb-8">
              Powered by modern, production-grade technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">PyTorch</Badge>
              <Badge variant="outline">LangChain</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">Framer Motion</Badge>
              <Badge variant="outline">Shadcn/UI</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
              <Badge variant="outline">Azure/GCP</Badge>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold mb-6">What Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <p className="italic text-muted-foreground">
                  “Astraph.AI let us deploy custom GPT models 3x faster with
                  zero ops overhead.”
                </p>
                <div className="mt-4 font-semibold">
                  — Aarya, GenAI Platform Lead
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="italic text-muted-foreground">
                  “The most intuitive RAG orchestration we’ve used. And the UI?
                  🔥”
                </p>
                <div className="mt-4 font-semibold">— Ravi, AI Researcher</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
