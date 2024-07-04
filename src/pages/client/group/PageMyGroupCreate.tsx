import PageHeader from "@/components/breadcrumb/PageHeader";
import GroupHeader from "@/components/module/group/GroupHeader";
import GroupList from "@/components/module/group/GroupList";
import useAuth from "@/hooks/useAuth";
import CategoriesServices from "@/services/categories";
import {
    getCategoriesCreated,
    getLoadmoreCategoriesByCreate,
} from "@/store/categorySlice";
import { RootState } from "@/store/store";
import { Category } from "@/type/category";
import { useState, useCallback, useEffect } from "react";
import { PiFireFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "rizzui";

const pageHeader = {
    title: "Groups Created",
    breadcrumb: [
        {
            href: "/group",
            name: "Groups",
        },
        {
            href: "/group/my-created",
            name: "Groups Created",
        },
    ],
};

const PageMyGroupCreate = () => {
    const { axiosJWT } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>();
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();
    const listCate = useSelector(
        (state: RootState) => state.category.listCategoriesCreate
    );

    const fetchData = useCallback(
        async (page: number) => {
            try {
                setIsLoading(true);
                const { body } = await CategoriesServices.getCategoriesByCreate(
                    page,
                    axiosJWT
                );
                if (body?.success) {
                    setIsLoading(false);
                    if (page === 1) {
                        dispatch(
                            getCategoriesCreated(body?.result?.categories)
                        );
                    } else {
                        dispatch(
                            getLoadmoreCategoriesByCreate(
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
            >
                <Link to={"/group/create"}>
                    <Button variant="outline" size="sm" className="flex gap-3">
                        Add Group <PiFireFill className="h-4 w-4" />
                    </Button>
                </Link>
            </PageHeader>
            <GroupHeader title="Groups Created" setSearchText={setSearchText} />
            <GroupList
                listCate={menuItemsFiltered}
                loader={isLoading}
                totalPage={totalPage}
                currentPage={currentPage}
                handleLoadMore={handleLoadMore}
                setIsActive={setIsActive}
                isCreate={true}
            />
        </>
    );
};

export default PageMyGroupCreate;
