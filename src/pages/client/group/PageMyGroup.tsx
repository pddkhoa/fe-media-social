import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupHeader from "@/components/module/group/GroupHeader";
import GroupList from "@/components/module/group/GroupList";
import CategoriesServices from "@/services/categories";
import {
    getCategoriesByUser,
    getLoadmoreCategoriesByUser,
} from "@/store/categorySlice";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { PiFireFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "rizzui";

const pageHeader = {
    title: "Groups",
    breadcrumb: [
        {
            href: "/group",
            name: "Groups",
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
    const listCate = useSelector(
        (state: RootState) => state.category.myCategories
    );

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await CategoriesServices.getCategoriesByUser(
                    page
                );
                if (body?.success) {
                    setIsLoading(false);
                    if (page === 1) {
                        dispatch(getCategoriesByUser(body?.result?.categories));
                    } else {
                        dispatch(
                            getLoadmoreCategoriesByUser(
                                body?.result?.categories
                            )
                        );
                    }
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
        setIsActive(false);
        fetchData(currentPage);
    }, [fetchData, currentPage, isActive]);

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
                listCate={listCate}
                loader={isLoading}
                totalPage={totalPage}
                currentPage={currentPage}
                handleLoadMore={handleLoadMore}
                setIsActive={setIsActive}
            />
        </>
    );
};

export default PageMyGroup;
