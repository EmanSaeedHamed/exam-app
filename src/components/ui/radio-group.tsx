"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/shared/lib/utils/progress-bar.util"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
  className={cn(
    "relative inline-flex items-center justify-center",
    
    "size-5 shrink-0", // حجم الدائرة الكبيرة
    
    "rounded-full border border-gray-400 bg-white",

    "data-[state=checked]:border-blue-600",

    className
  )}
  {...props}
>
  <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
    {/* 👇 النقطة الصغيرة */}
    <span className="size-3 rounded-full bg-blue-600" />
  </RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>

  )
}

export { RadioGroup, RadioGroupItem }
