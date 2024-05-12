import useAuth from "@/hooks/useAuth";
import AdminServices from "@/services/admin";
import { cn } from "@/utils/class-name";
import { useCallback, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import {
    PiExcludeLight,
    PiCube,
    PiUserCircle,
    PiHashFill,
} from "react-icons/pi";

export type IconType = (props: IconBaseProps) => JSX.Element;

export type TransactionType = {
    icon: IconType;
    title: string;
    amount: string;
    increased: boolean;
    percentage: string;
    iconWrapperFill?: string;
    className?: string;
};

const CardTotalItem = () => {
    const [dataBlog, setDataBlog] = useState<any>();
    const [dataTag, setDataTag] = useState<any>();
    const [dataUser, setDataUser] = useState<any>();
    const [dataCate, setDataCate] = useState<any>();
    const { axiosJWT } = useAuth();

    const fetchDataBlog = useCallback(async () => {
        try {
            const { body } = await AdminServices.getTotalBlog(axiosJWT);
            if (body?.success) {
                setDataBlog(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataBlog]);
    const fetchDataTag = useCallback(async () => {
        try {
            const { body } = await AdminServices.getTotalTag(axiosJWT);
            if (body?.success) {
                setDataTag(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataTag]);
    const fetchDataCate = useCallback(async () => {
        try {
            const { body } = await AdminServices.getTotalCategories(axiosJWT);
            if (body?.success) {
                setDataCate(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataCate]);
    const fetchDataUser = useCallback(async () => {
        try {
            const { body } = await AdminServices.getTotalUser(axiosJWT);
            if (body?.success) {
                setDataUser(body.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [setDataUser]);

    useEffect(() => {
        fetchDataBlog();
        fetchDataUser();
        fetchDataCate();
        fetchDataTag();
    }, [fetchDataTag, fetchDataBlog, fetchDataUser, fetchDataCate]);

    const statData: TransactionType[] = [
        {
            title: "Total Blogs",
            amount: dataBlog?.sumBlog,
            increased: parseFloat(dataBlog?.percentChange) < 0 ? false : true,
            percentage: dataBlog?.percentChange,
            icon: PiExcludeLight,
            iconWrapperFill: "#8A63D2",
        },
        {
            title: "Total Tags",
            amount: dataTag?.sumTag,
            increased: parseFloat(dataTag?.percentChange) < 0 ? false : true,
            percentage: dataTag?.percentChange,
            icon: PiHashFill,
            iconWrapperFill: "#00CEC9",
        },
        {
            title: "Total Groups",
            amount: dataCate?.sumCategory,
            increased: parseFloat(dataCate?.percentChange) < 0 ? false : true,
            percentage: dataCate?.percentChange,
            icon: PiCube,
            iconWrapperFill: "#0070F3",
        },
        {
            title: "Total Users",
            amount: dataUser?.sumUser,
            increased: parseFloat(dataUser?.percentChange) < 0 ? false : true,
            percentage: dataUser?.percentChange,
            icon: PiUserCircle,
            iconWrapperFill: "#F5A623",
        },
    ];

    return (
        <div className="col-span-full grid-cols-4 grid gap-5 ">
            {statData.map((stat: any, index: number) => {
                return (
                    <CardItem
                        key={"transaction-card-" + index}
                        transaction={stat}
                    />
                );
            })}
        </div>
    );
};

export type TransactionCardProps = {
    className?: string;
    transaction: TransactionType;
};

export const CardItem = ({ transaction }: TransactionCardProps) => {
    const { icon, title, amount, iconWrapperFill, increased, percentage } =
        transaction;
    const Icon = icon;
    return (
        <div
            className={cn(
                "w-full rounded-[10px] border border-gray-300 px-6 py-7 @container"
            )}
        >
            <div className="mb-4 flex items-center gap-5">
                <span
                    style={{ backgroundColor: iconWrapperFill }}
                    className={cn(
                        "flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900"
                    )}
                >
                    <Icon className="h-auto w-[30px] text-white" />
                </span>
                <div className="space-y-2">
                    <p className="text-gray-500 ">{title}</p>
                    <p className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-[22px]">
                        {amount}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <div
                    className={cn(
                        "flex items-center gap-1 ",
                        increased ? "text-green-dark" : "text-red-dark"
                    )}
                >
                    <span className="font-medium leading-none">
                        {percentage}%
                    </span>
                </div>
                <span className="truncate text-sm leading-none text-gray-500">
                    {increased ? "Increased" : "Decreased"}&nbsp; last month
                </span>
            </div>
        </div>
    );
};

export default CardTotalItem;
