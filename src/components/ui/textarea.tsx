import * as React from "react";

import { cn } from "@/lib/utils";

// Remove or modify this line:
// interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// If you need to extend the interface with additional properties, do it like this:
// interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   // Add your custom properties here
//   customProp?: string;
// }

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
