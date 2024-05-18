import PostCard from "@/components/module/post/PostCard";
import { SkeletonCateList, SkeletonPost } from "@/components/ui/SkeletonLoader";
import { Post } from "@/type/post";
import { FC } from "react";
import { Empty } from "rizzui";

type ListDraftProps = {
    data: Post[];
    layout: string;
    loader?: boolean;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListDraft: FC<ListDraftProps> = ({
    data,
    layout,
    loader,
    setIsDelete,
}) => {
    return (
        <div className="mx-auto mt-10  w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
            {layout !== "grid" ? (
                <>
                    <div className="flex flex-col gap-5">
                        {loader ? (
                            <>
                                <SkeletonCateList />
                                <SkeletonCateList />
                                <SkeletonCateList />
                            </>
                        ) : data && data.length > 0 ? (
                            data.map((item) => (
                                <>
                                    <div key={item._id}>
                                        <div>Grid Blog</div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <Empty
                                text="Not Found Draft"
                                textClassName="mt-2"
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                        {loader ? (
                            <>
                                <SkeletonPost />
                                <SkeletonPost />
                                <SkeletonPost />
                            </>
                        ) : data && data?.length > 0 ? (
                            data?.map((item) => (
                                <div key={item._id} className="col-span-1 ">
                                    <PostCard
                                        data={item}
                                        setIsDelete={setIsDelete}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3">
                                <Empty
                                    text="Not Found Draft"
                                    textClassName="mt-2"
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListDraft;
