import { DatePicker } from "@/components/ui/DatePicker";
import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { useCallback, useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
} from "recharts";
import { Title } from "rizzui";

type DataType = {
    name: string;
    Profit: number;
};

//

const ChartAccess = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const { axiosJWT } = useAuth();
    const [dataChart, setDataChart] = useState<any>();

    const month = startDate.getMonth() + 1;

    const data: DataType[] =
        dataChart &&
        Object.entries(dataChart?.accessByDay).map(([name, Profit]) => ({
            name,
            Profit,
        }));

    const fetchData = useCallback(async () => {
        try {
            const { body } = await AdminServices.getAccessMonth(
                month.toString(),
                axiosJWT
            );
            if (body?.success) {
                setDataChart(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataChart, month]);

    useEffect(() => {
        fetchData();
    }, [fetchData, startDate]);

    const formatYAxisTick = (value: number): string => {
        if (value >= 1000) {
            return `$${value / 1000}k`;
        }
        return value.toString();
    };

    return (
        <div className="col-span-full border p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <Title as="h4" className="font-medium">
                    Access in a month
                </Title>

                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    dateFormat="MMM, yyyy"
                    placeholderText="Select Month"
                    showMonthYearPicker
                    popperClassName="w-56"
                    popperPlacement="bottom-end"
                    inputProps={{
                        inputClassName:
                            "p-2 h-auto [&_input]:text-ellipsis cursor-pointer",
                    }}
                    className="w-36 cursor-pointer"
                />
            </div>

            <div className="h-[400px]">
                {" "}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            left: -10,
                            right: 15,
                            bottom: 25,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#10b981"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ffffff"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="0 0"
                            strokeOpacity={0.435}
                            vertical={false}
                        />
                        <XAxis
                            axisLine={false}
                            dataKey="name"
                            tickMargin={10}
                            tickLine={false}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 50]}
                            tickFormatter={formatYAxisTick}
                        />
                        {/* <Tooltip content={<CustomTooltip />} cursor={false} /> */}
                        <Area
                            strokeWidth={2}
                            type="monotone"
                            dataKey="Profit"
                            stroke="#10b981"
                            fill="url(#colorGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartAccess;
