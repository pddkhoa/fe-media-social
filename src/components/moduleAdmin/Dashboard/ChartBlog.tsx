import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Bar,
} from "recharts";
import { cn } from "rizzui";
import ButtonGroupAction from "./ButtonGroup";
import { useCallback, useEffect, useState } from "react";
import AdminServices from "@/services/admin";
import useAuth from "@/hooks/useAuth";

function RoundedTopBar({
    x,
    y,
    width,
    height,
    fillOpacity,
    className,
    cornerRadius = 6,
}: any) {
    const roundedHeight = Math.max(cornerRadius, height);
    const path = `
    M${x},${y + roundedHeight}
    L${x},${y + cornerRadius}
    Q${x},${y} ${x + cornerRadius},${y}
    L${x + width - cornerRadius},${y}
    Q${x + width},${y} ${x + width},${y + cornerRadius}
    L${x + width},${y + roundedHeight}
    Z
  `;
    return (
        <path
            d={path}
            fillOpacity={fillOpacity}
            className={cn("fill-[#d4dcfa] dark:fill-[#7c88b2]", className)}
        />
    );
}

const filterOptions = ["Month", "Year"];
function CustomYAxisTick({ x, y, payload, prefix, postfix }: any) {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                className="fill-gray-500"
            >
                {prefix && prefix}
                {payload.value.toLocaleString()}
                {postfix && postfix}
            </text>
        </g>
    );
}

const ChartBlog = () => {
    const [dataChart, setDataChart] = useState<any>();
    const [type, setType] = useState<string>("Month");
    const { axiosJWT } = useAuth();

    const fetchData = useCallback(async () => {
        try {
            const { body } =
                type === "Month"
                    ? await AdminServices.getChartBlogMonth(axiosJWT)
                    : await AdminServices.getChartBlogYear(axiosJWT);
            if (body?.success) {
                setDataChart(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataChart, type]);

    useEffect(() => {
        fetchData();
    }, [fetchData, type]);

    function handleFilterBy(data: string) {
        setType(data);
    }

    const data: any[] =
        dataChart &&
        Object.entries(dataChart).map(([time, Profit]) => ({
            time,
            Profit,
        }));

    return (
        <div className={cn("h-[420px] w-full pt-9 flex flex-col")}>
            <ButtonGroupAction
                options={filterOptions}
                defaultActive="Month"
                onChange={(data) => handleFilterBy(data)}
                className="ml-auto"
            />
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500  [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
                >
                    <defs>
                        <linearGradient
                            id="analyticsArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#F0F1FF"
                                className=" [stop-opacity:0.2]"
                            />
                            <stop
                                offset="95%"
                                stopColor="#8200E9"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={<CustomYAxisTick />}
                    />
                    {/* <Tooltip content={<CustomTooltip />} /> */}

                    <Bar
                        dataKey="Profit"
                        fill="#E8E9FF"
                        shape={<RoundedTopBar />}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartBlog;
