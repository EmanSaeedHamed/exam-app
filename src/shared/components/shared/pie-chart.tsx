"use client"
import { Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
type Props = {
  correct: number;
  incorrect: number;
};
export default function ChartPieDonut({correct, incorrect}:Props) {
const chartData = [
  { browser: "correct", visitors: correct, fill: "rgba(0, 188, 125, 1)" },
  { browser: "Incorrect", visitors: incorrect, fill: "rgba(239, 68, 68, 1)" },
]

const chartConfig = {
  visitors: {
    label: "answers",
  },
  chrome: {
    label: "correct",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Incorrect",
    color: "var(--chart-2)"
},

  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


  return <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              outerRadius={100}
            />
          </PieChart>
        </ChartContainer>
}


