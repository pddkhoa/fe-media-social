import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupHeader from "@/components/module/group/GroupHeader";
import GroupList from "@/components/module/group/GroupList";
import ClientServices from "@/services/client";
import { getCateogiesByUser } from "@/store/categorySlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { PiFireFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "rizzui";

const pageHeader = {
  title: "Groups",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/group/my",
      name: "My Groups",
    },
  ],
};
const PageMyGroup = () => {
  const [layout, setLayout] = useState<string>("grid");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const listCate = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { body } = await ClientServices.getCategoriesByUser();
        if (body?.success) {
          setIsLoading(false);
          dispatch(getCateogiesByUser(body?.result));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader breadcrumb={pageHeader.breadcrumb} title={pageHeader.title}>
        <Link to={"/group/create"}>
          <Button variant="outline" size="sm" className="flex gap-3">
            Add Group <PiFireFill className="h-4 w-4" />
          </Button>
        </Link>
      </PageHeader>
      <GroupHeader title="My Groups" layout={layout} setLayout={setLayout} />
      <GroupList layout={layout} listCate={listCate} loader={isLoading} />
    </>
  );
};

export default PageMyGroup;
