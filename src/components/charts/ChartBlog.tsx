import { cn } from "@/utils/class-name";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from "recharts";
import { Title } from "rizzui";

const data = [
  { name: "Available:", value: 20, color: "#3872FA" },
  { name: "In Maintenance:", value: 18, color: "#eab308" },
  { name: "On the Move:", value: 35, color: "#10b981" },
];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" className="text-[10px]">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function ChartBlog({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  return (
    <div className={cn("flex flex-col gap-5 border-0 p-0 lg:p-0", className)}>
      <div className="grid items-start rounded-lg border border-gray-300 p-5 grid-cols-12 lg:p-7 ">
        <div className="col-span-8">
          <Title
            as="h3"
            className="col-span-full mb-8 text-base font-semibold sm:text-lg"
          >
            Fleet Status
          </Title>
          <div className="mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={5}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center font-semibold text-gray-800">
            Fleet Efficacy
          </p>
        </div>
        <div className="col-span-4 mt-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-start">
                <span
                  className="me-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Title as="h5" className=" text-sm font-medium">
                  {item.name}
                </Title>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0">
            <div className="flex items-center justify-start">
              <span
                className="me-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: "red" }}
              />
              <Title as="h5" className=" text-sm font-medium">
                Total Fleet:
              </Title>
            </div>
            <span>73</span>
          </div>
        </div>
      </div>
    </div>
  );
}
