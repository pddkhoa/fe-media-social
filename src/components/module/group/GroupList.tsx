import { FC } from "react";
import GroupCard from "./GroupCard";
import GroupGrid from "./GroupGrid";
import { Category } from "@/type/category";
import { Empty } from "rizzui";
import { SkeletonCate, SkeletonCateList } from "@/components/ui/SkeletonLoader";

type GroupListProps = {
  layout: string;
  listCate: Category[];
  loader?: boolean;
};

const GroupList: FC<GroupListProps> = ({ layout, listCate, loader }) => {
  return (
    <div className="mx-auto mt-10  w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
      {layout !== "grid" ? (
        <div className="flex flex-col gap-5">
          {loader ? (
            <>
              <SkeletonCateList />
              <SkeletonCateList />
              <SkeletonCateList />
            </>
          ) : listCate && listCate.length > 0 ? (
            listCate.map((item) => (
              <div key={item._id}>
                <GroupGrid data={item} />
              </div>
            ))
          ) : (
            <Empty text="Not Found Group" textClassName="mt-2" />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 ">
          {loader ? (
            <>
              <SkeletonCate />
              <SkeletonCate />
              <SkeletonCate />
            </>
          ) : listCate && listCate.length > 0 ? (
            listCate.map((item) => (
              <div key={item._id} className="col-span-1 ">
                <GroupCard data={item} />
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <Empty text="Not Found Group" textClassName="mt-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupList;
