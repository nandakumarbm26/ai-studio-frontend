"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function EditExperimentsSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={`w-full rounded-none drop-shadow-none shadow-none overflow-y-scroll justify-between ${className}`}
    >
      <CardHeader>
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="h-[70vh] overflow-y-scroll hide-scrollbar">
        <div className="flex flex-col gap-5">
          {/* Agent Name & Description */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>

          <Separator orientation="horizontal" />

          {/* Behavior Instructions */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>

          <Separator orientation="horizontal" />

          {/* Trainer Prompts */}
          <div>
            <Skeleton className="h-4 w-1/3 mb-3" />
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="w-full flex flex-col gap-2 border-1 p-2 my-2 bg-gray-100 rounded-sm"
              >
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/6 mt-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
            <Skeleton className="h-10 w-full mt-2" />
          </div>

          <Separator orientation="horizontal" />

          {/* Response Template */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-4 w-28" />
      </CardFooter>
    </Card>
  );
}

export default EditExperimentsSkeleton;
