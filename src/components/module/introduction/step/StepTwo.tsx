import { useStepperOne } from ".";
import { Fragment, useCallback, useEffect, useState } from "react";
import FormSummary from "../FormSumary";
import useAuth from "@/hooks/useAuth";
import { Avatar, Button, Loader } from "rizzui";
import toast from "react-hot-toast";
import UserServices from "@/services/user";
import { UserWall } from "@/type/wall";
import { PiPlusBold } from "react-icons/pi";

export default function StepTwo() {
    const { step, gotoNextStep } = useStepperOne();

    const { axiosJWT } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<UserWall[]>([]);
    const [isFollow, setIsFollow] = useState<{ [key: string]: boolean }>({});
    const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>(
        {}
    );

    const [checkFollow, setCheckFollow] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const { body } = await UserServices.getListUserMost(axiosJWT);
            if (body?.success) {
                setData(body.result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [setData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleNextStep = (event: any) => {
        if (checkFollow) gotoNextStep();
        else {
            event.preventDefault();
            toast.error("Must follow least one person");
        }
    };

    const handleFollowUser = async (id: string) => {
        setLoadingRows((prevState) => ({ ...prevState, [id]: true }));
        const { body } = await UserServices.followUser(id, axiosJWT);
        if (body?.success) {
            setCheckFollow(true);
            setIsFollow((prevState) => ({ ...prevState, [id]: true }));
            toast.success(body.message);
            setLoadingRows((prevState) => ({ ...prevState, [id]: false }));
        } else {
            toast.error(body?.message || "Error");
            setLoadingRows((prevState) => ({ ...prevState, [id]: false }));
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center col-span-6">
                <FormSummary
                    className="me-10"
                    title="Suggest prominent members for you to follow"
                    description="Your platform is distinctive and hosts a vibrant community of users. We are excited to delve into the characteristics that make your users stand out. Understanding these traits will enable us to highlight the exceptional qualities of your community to attract new members or partners."
                />
            </div>

            <div className="flex col-span-6">
                <form
                    id={`rhf-${step.toString()}`}
                    onSubmit={handleNextStep}
                    className="flex-grow rounded-lg  bg-gray-0"
                >
                    <div className="p-2 space-y-5 w-full">
                        {isLoading ? (
                            <div className="flex justify-center">
                                <Loader />
                            </div>
                        ) : data && data.length > 0 ? (
                            data.map((item, index) => (
                                <Fragment key={item.name + "-" + index}>
                                    <div className="relative my-0.5 flex items-center border border-dashed rounded-lg px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-200 dark:hover:backdrop-blur-lg">
                                        <span className="inline-flex items-center w-16">
                                            <Avatar
                                                src={item.avatar.url}
                                                name={item.name}
                                                size="lg"
                                                rounded="md"
                                            />
                                        </span>
                                        <div className="flex items-center justify-between ms-3 w-full  gap-0.5">
                                            <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                                                {item.name}
                                            </span>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                handleFollowUser(item._id);
                                            }}
                                            variant={`${
                                                !isFollow[item._id]
                                                    ? "solid"
                                                    : "flat"
                                            }`}
                                            type="button"
                                            isLoading={loadingRows[item._id]}
                                            size="sm"
                                        >
                                            {!isFollow[item._id] ? (
                                                <>
                                                    Follow
                                                    <PiPlusBold className="h-3 w-3 ml-2" />
                                                </>
                                            ) : (
                                                <>Unfollow</>
                                            )}
                                        </Button>
                                    </div>
                                </Fragment>
                            ))
                        ) : null}
                    </div>
                </form>
            </div>
        </>
    );
}
