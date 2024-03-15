import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupDetails from "@/components/module/group/GroupList";
import GroupHeader from "@/components/module/group/GroupHeader";
import { useEffect, useState } from "react";
import { PiFireFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Button } from "rizzui";
import ClientServices from "@/services/client";
import { useDispatch, useSelector } from "react-redux";
import { getAllCateogies } from "@/store/categorySlice";
import { RootState } from "@/store/store";

const pageHeader = {
  title: "Groups",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/group",
      name: "Groups",
    },
  ],
};

const PageGroup = () => {
  const [layout, setLayout] = useState<string>("grid");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const listCate = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { body } = await ClientServices.getAllCategories();
        if (body?.success) {
          setIsLoading(false);
          dispatch(getAllCateogies(body?.result));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title}>
        <Link to={"/group/create"}>
          <Button variant="outline" size="sm" className="flex gap-3">
            Add Group <PiFireFill className="h-4 w-4" />
          </Button>
        </Link>
      </PageHeader>
      <GroupHeader title="All Groups" layout={layout} setLayout={setLayout} />
      <GroupDetails layout={layout} listCate={listCate} loader={isLoading} />
    </div>
  );
};

export default PageGroup;
