import { FC } from "react";
import GroupCard from "./GroupCard";
import { Category } from "@/type/category";
import { Button, Empty } from "rizzui";
import { SkeletonCate } from "@/components/ui/SkeletonLoader";
import { PiArrowsClockwiseFill } from "react-icons/pi";

type GroupListProps = {
    layout?: string;
    listCate: Category[];
    loader?: boolean;
    handleLoadMore: () => void;
    totalPage: number | undefined;
    currentPage: number;
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    searchText?: string;
    isCreate?: boolean;
};

const GroupList: FC<GroupListProps> = ({
    listCate,
    loader,
    handleLoadMore,
    totalPage,
    currentPage,
    setIsActive,
    searchText,
    isCreate,
}) => {
    return (
        <div className="mx-auto mt-10  w-full max-w-[85rem] @2xl:mt-7 @6xl:mt-0">
            <>
                {searchText ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                        {loader ? (
                            <>
                                <SkeletonCate />
                                <SkeletonCate />
                                <SkeletonCate />
                            </>
                        ) : listCate && listCate?.length > 0 ? (
                            listCate?.map((item) => (
                                <div key={item._id} className="col-span-1 ">
                                    <GroupCard
                                        data={item}
                                        setIsActive={setIsActive}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3">
                                <Empty
                                    text="Not Found Group"
                                    textClassName="mt-2"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 ">
                            {listCate && listCate?.length > 0 ? (
                                listCate?.map((item) => (
                                    <div key={item._id} className="col-span-1 ">
                                        <GroupCard
                                            data={item}
                                            setIsActive={setIsActive}
                                            isCreate={isCreate}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3">
                                    <Empty
                                        text="Not Found Group"
                                        textClassName="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            {totalPage && currentPage < totalPage ? (
                                <div className="mt-8 flex justify-center">
                                    <Button
                                        variant="text"
                                        size="lg"
                                        isLoading={loader}
                                        className="flex items-center"
                                        onClick={() => handleLoadMore()}
                                    >
                                        <PiArrowsClockwiseFill className="text-xl" />
                                        <span className="ms-2">Load More</span>
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </>
        </div>
    );
};

export default GroupList;
