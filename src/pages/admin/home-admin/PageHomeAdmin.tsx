import CardTotal from "@/components/card/CardTotal";
import ChartBlog from "@/components/charts/ChartBlog";
import { cn } from "@/utils/class-name";

const PageHomeAdmin = () => {
  return (
    <div
      className={cn(
        "mt-2 flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7"
      )}
    >
      <CardTotal />

      <div className="grid grid-cols-12 ">
        <ChartBlog className="col-span-5" />
      </div>
    </div>
  );
};

export default PageHomeAdmin;
