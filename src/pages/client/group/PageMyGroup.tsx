import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupHeader from "@/components/module/group/GroupHeader";
import GroupList from "@/components/module/group/GroupList";
import useAuth from "@/hooks/useAuth";
import CategoriesServices from "@/services/categories";
import {
    getCategoriesByUser,
    getLoadmoreCategoriesByUser,
} from "@/store/categorySlice";
import { RootState } from "@/store/store";
import { Category } from "@/type/category";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const { axiosJWT } = useAuth();
    const [layout, setLayout] = useState<string>("grid");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();
    const listCate = useSelector(
        (state: RootState) => state.category.myCategories
    );

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } =
                    await CategoriesServices.getCategoriesByUserJoin(
                        page,
                        axiosJWT
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

    let menuItemsFiltered = listCate;
    if (searchText.length > 0) {
        menuItemsFiltered = listCate?.filter((item: Category) => {
            const label = item?.name;
            return (
                label?.toLowerCase().match(searchText.toLowerCase()) && label
            );
        });
    }

    return (
        <>
            <PageHeader
                breadcrumb={pageHeader.breadcrumb}
                title={pageHeader.title}
            ></PageHeader>
            <GroupHeader
                title="My Groups"
                layout={layout}
                setLayout={setLayout}
                setSearchText={setSearchText}
            />
            <GroupList
                layout={layout}
                listCate={menuItemsFiltered}
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
