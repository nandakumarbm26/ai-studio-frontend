"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

function AlertPops({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const [visible, setvisible] = React.useState<boolean>(false);
  React.useEffect(() => {
    setvisible(true);
    setTimeout(() => {
      setvisible(false);
    }, 3000);
    return () => {
      setvisible(false);
    };
  }, []);
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        alertVariants({ variant }),
        className + ` w-[30%] top-10 right-5 ${visible ? "fixed" : "hidden"}`
      )}
      {...props}
    />
  );
}

export type AlertType = {
  id: number;
  type: VariantProps<typeof alertVariants>["variant"];
  title: string;
  description: string;
};

let nextId = 0;

const AlertContext = React.createContext<{
  addAlert: (alert: Omit<AlertType, "id">) => void;
} | null>(null);

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = React.useState<AlertType[]>([]);

  const addAlert = (alert: Omit<AlertType, "id">) => {
    const id = nextId++;
    setAlerts((prev) => [...prev, { id, ...alert }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="fixed top-10 right-5 z-50 space-y-2 w-3/4 md:w-[30%]">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type}
            className={cn(alertVariants({ variant: alert.type }))}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertPops,
  useAlert,
  AlertProvider,
  AlertContext,
};
