import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0  border border-gray-200 bg-transparent px-2.5 py-3.5 read-only:p-2.5 disabled:p-2.5 read-only:focus:border-gray-200 text-sm text-gray-800 font-mono transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 disabled:pointer-events-none disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-red-gray-900 disabled:opacity-50 aria-invalid:border-red-600 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
