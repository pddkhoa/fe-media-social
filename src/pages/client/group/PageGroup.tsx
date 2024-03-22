import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupDetails from "@/components/module/group/GroupList";
import GroupHeader from "@/components/module/group/GroupHeader";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getLoadmoreCategories } from "@/store/categorySlice";
import CategoriesServices from "@/services/categories";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const dispatch = useDispatch();
    const listCate = useSelector(
        (state: RootState) => state.category.categories
    );

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await CategoriesServices.getAllCategories(
                    page
                );
                if (body?.success) {
                    if (page === 1) {
                        dispatch(getAllCategories(body?.result?.categories));
                    } else {
                        dispatch(
                            getLoadmoreCategories(body?.result?.categories)
                        );
                    }
                    setIsLoading(false);
                    setTotalPage(body?.result?.size);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        },
        [dispatch]
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
                listCate={listCate}
                totalPage={totalPage}
                currentPage={currentPage}
                loader={isLoading}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default PageGroup;
