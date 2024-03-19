import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupDetails from "@/components/module/group/GroupList";
import GroupHeader from "@/components/module/group/GroupHeader";
import { useCallback, useEffect, useState } from "react";
import ClientServices from "@/services/client";
import { Category } from "@/type/category";

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
    const [limit, setLimit] = useState(false);
    const [dataGroup, setDataGroup] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await ClientServices.getAllCategories(page);
                if (body?.success) {
                    if (body?.result === null) {
                        setLimit(true);
                    } else {
                        setIsLoading(false);
                        setDataGroup((prevData) =>
                            page === 1
                                ? [...body.result]
                                : [...prevData, ...body.result]
                        );
                    }
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
                limit={limit}
            />
        </div>
    );
};

export default PageGroup;
