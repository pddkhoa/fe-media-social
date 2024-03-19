import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupHeader from "@/components/module/group/GroupHeader";
import GroupList from "@/components/module/group/GroupList";
import ClientServices from "@/services/client";
import { Category } from "@/type/category";
import { useCallback, useEffect, useState } from "react";
import { PiFireFill } from "react-icons/pi";
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
    const [limit, setLimit] = useState(false);
    const [dataGroup, setDataGroup] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await ClientServices.getCategoriesByUser(page);
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
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            >
                <Link to={"/group/create"}>
                    <Button variant="outline" size="sm" className="flex gap-3">
                        Add Group <PiFireFill className="h-4 w-4" />
                    </Button>
                </Link>
            </PageHeader>
            <GroupHeader
                title="My Groups"
                layout={layout}
                setLayout={setLayout}
            />
            <GroupList
                layout={layout}
                listCate={dataGroup}
                loader={isLoading}
                handleLoadMore={handleLoadMore}
                limit={limit}
            />
        </>
    );
};

export default PageMyGroup;
