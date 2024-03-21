import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupDetails from "@/components/module/group/GroupList";
import GroupHeader from "@/components/module/group/GroupHeader";
import { useCallback, useEffect, useState } from "react";
import ClientServices from "@/services/client";
import { Category } from "@/type/category";
import { useDispatch } from "react-redux";
import { getAllCategories } from "@/store/categorySlice";

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
    const [dataGroup, setDataGroup] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await ClientServices.getAllCategories(page);
                if (body?.success) {
                    setIsLoading(false);
                    setDataGroup((prevData) =>
                        page === 1
                            ? [...body.result]
                            : [...prevData, ...body.result]
                    );
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        },
        [setDataGroup]
    );

    useEffect(() => {
        fetchData(currentPage);
        dispatch(getAllCategories(dataGroup));
    }, [fetchData, currentPage]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader
                title="All Groups"
                layout={layout}
                setLayout={setLayout}
            />
            <GroupDetails
                layout={layout}
                listCate={dataGroup}
                loader={isLoading}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default PageGroup;
